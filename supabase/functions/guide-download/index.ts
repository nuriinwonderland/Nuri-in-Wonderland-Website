// Supabase Edge Function: guide-download
// Verifies a Stripe Checkout Session and returns short-lived download links
// for the guides that were bought. Called from gracias.html?session_id=cs_...
//
// Secrets (supabase secrets set ...):
//   STRIPE_SECRET_KEY   sk_live_... (restricted key with read access to Checkout Sessions + Products is enough)
//   ALLOWED_ORIGINS     optional, comma separated (defaults to the two nuriinwonderland.com origins)
// Each Stripe product can carry metadata  guias = scifi | fantasia | scifi,fantasia
// (without it, the product name is used: "...Ciencia Ficción...", "...Fantasía...", "Pack...")
// PDFs live in the PRIVATE storage bucket "guias".

import Stripe from "npm:stripe@16.12.0";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

const FILES: Record<string, { path: string; name: string }> = {
  scifi: { path: "scifi-2026.pdf", name: "Guia digital de Recomendaciones de Ciencia Ficcion 2026 - Nuri in Wonderland.pdf" },
  fantasia: { path: "fantasia-2026.pdf", name: "Guia digital de Recomendaciones de Fantasia 2026 - Nuri in Wonderland.pdf" },
};
const LINK_TTL_SECONDS = 60 * 60;       // each download link works for 1 hour
const PURCHASE_TTL_DAYS = 30;           // the thank-you page keeps working for 30 days after paying
const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") ?? "https://www.nuriinwonderland.com,https://nuriinwonderland.com,https://creative-selkie-e2447a.netlify.app")
  .split(",").map((o) => o.trim());

Deno.serve(async (req) => {
  const origin = req.headers.get("origin") ?? "";
  const cors = {
    "Access-Control-Allow-Origin": ALLOWED.includes(origin) ? origin : ALLOWED[0],
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "method" }, 405);

  try {
    const { session_id } = await req.json().catch(() => ({}));
    if (typeof session_id !== "string" || !/^cs_(live|test)_[A-Za-z0-9]+$/.test(session_id)) {
      return json({ error: "missing_session" }, 400);
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items.data.price.product"] });
    if (session.payment_status !== "paid") return json({ error: "not_paid" }, 402);
    if (Date.now() / 1000 - session.created > PURCHASE_TTL_DAYS * 86400) return json({ error: "expired" }, 410);

    // Which guides were bought: product metadata "guias" first, product name as a fallback
    const guides = new Set<string>();
    for (const item of session.line_items?.data ?? []) {
      const product = item.price?.product as Stripe.Product | undefined;
      const tagged = String(product?.metadata?.guias ?? "").split(",").map((g) => g.trim()).filter((g) => g in FILES);
      if (tagged.length) { tagged.forEach((g) => guides.add(g)); continue; }
      const name = `${product?.name ?? ""} ${item.description ?? ""}`.toLowerCase();
      const pack = /pack|bundle|dos gu|ambas|las 2/.test(name);
      if (pack || /ficci|sci-?fi/.test(name)) guides.add("scifi");
      if (pack || /fantas/.test(name)) guides.add("fantasia");
    }
    if (!guides.size) return json({ error: "no_guides" }, 404);

    const files = [];
    for (const id of guides) {
      const f = FILES[id];
      const { data, error } = await supabase.storage.from("guias").createSignedUrl(f.path, LINK_TTL_SECONDS, { download: f.name });
      if (error) throw error;
      files.push({ id, url: data.signedUrl });
    }
    // Whether the buyer ticked the checkout box waiving the right of withdrawal (shown back as confirmation)
    const waiver = session.consent?.terms_of_service === "accepted";
    return json({ files, waiver });
  } catch (err) {
    console.error(err);
    return json({ error: "server" }, 500);
  }
});
