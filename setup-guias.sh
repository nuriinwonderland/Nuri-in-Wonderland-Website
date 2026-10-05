#!/bin/sh
# Puesta en marcha de la descarga de las guías (una sola vez).
# Ejecútalo en la Terminal:  sh "ruta/a/nuri-web/setup-guias.sh"
set -e
cd "$(dirname "$0")"
PROJECT=ivnctyxjllacihehhjcb
SCIFI="$HOME/Documents/SCIFI - GUIA DEFINITIVA 2026.pdf"
FANTASIA="$HOME/Documents/FANTASIA - GUIA DEFINITIVA 2026.pdf"

step() { printf "\n\033[1;36m▸ %s\033[0m\n" "$1"; }

step "1/6 · Comprobando la herramienta de Supabase"
if ! command -v supabase >/dev/null 2>&1; then
  if command -v brew >/dev/null 2>&1; then brew install supabase/tap/supabase
  else echo "Instala Homebrew (https://brew.sh) y vuelve a ejecutar este script."; exit 1; fi
fi

step "2/6 · Inicia sesión en Supabase (se abrirá el navegador)"
supabase login
supabase link --project-ref "$PROJECT"

step "3/6 · Clave de Stripe"
echo "Pega tu clave restringida de Stripe (rk_live_...). No se verá al escribirla y no se guarda en ningún archivo."
stty -echo; read KEY; stty echo; echo
case "$KEY" in rk_live_*|sk_live_*|rk_test_*|sk_test_*) ;; *) echo "Eso no parece una clave de Stripe."; exit 1;; esac
supabase secrets set STRIPE_SECRET_KEY="$KEY" >/dev/null && echo "Guardada en Supabase."
unset KEY

step "4/6 · Publicando la función de descarga"
supabase functions deploy guide-download

step "5/6 · Subiendo los PDF al espacio privado 'guias'"
echo "Si aún no existe: Supabase → Storage → New bucket → nombre: guias → 'Public bucket' DESACTIVADO."
printf "Pulsa Intro cuando el bucket exista... "; read _
supabase storage cp "$SCIFI"    ss:///guias/scifi-2026.pdf    --experimental --linked
supabase storage cp "$FANTASIA" ss:///guias/fantasia-2026.pdf --experimental --linked

step "6/6 · Prueba"
ANON=$(sed -n "s/.*const SB_KEY = '\([^']*\)'.*/\1/p" gracias.html)
R=$(curl -s -X POST "https://$PROJECT.supabase.co/functions/v1/guide-download" \
  -H "apikey: $ANON" -H "Authorization: Bearer $ANON" -H "Content-Type: application/json" \
  -H "Origin: https://www.nuriinwonderland.com" -d '{"session_id":"cs_test_prueba"}')
echo "Respuesta de la función: $R"
case "$R" in *server*|*error*) echo "✔ La función está publicada y responde (el error es normal: la compra de prueba no existe).";; esac
echo "\nListo. Falta configurar los 3 enlaces de pago en Stripe (ver GUIAS-STRIPE.md, paso 4) y hacer una compra de prueba."
