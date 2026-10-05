// Strings for the paid guides section (added after the main translation pass)
const arrow = ' <span class="arrow" aria-hidden="true">→</span>';
const T = {
  g01:{es:'<i></i>Guías de lectura · PDF', en:'<i></i>Reading guides · PDF', ca:'<i></i>Guies de lectura · PDF', pt:'<i></i>Guias de leitura · PDF', de:'<i></i>Leseguides · PDF', fr:'<i></i>Guides de lecture · PDF'},
  g02:{es:'Edición 2026. Elige una o llévate las dos.', en:'2026 edition. Pick one or get both.', ca:'Edició 2026. Tria’n una o emporta-te-les totes dues.', pt:'Edição 2026. Escolhe uma ou leva as duas.', de:'Ausgabe 2026. Wähl einen aus oder nimm beide.', fr:'Édition 2026. Choisis-en un ou prends les deux.'},
  g03:{es:'14 subgéneros y 52 lecturas recomendadas para explorar el futuro, el espacio y lo que nos hace humanos.', en:'14 subgenres and 52 recommended reads to explore the future, space and what makes us human.', ca:'14 subgèneres i 52 lectures recomanades per explorar el futur, l’espai i allò que ens fa humans.', pt:'14 subgéneros e 52 leituras recomendadas para explorar o futuro, o espaço e o que nos torna humanos.', de:'14 Subgenres und 52 Leseempfehlungen, um die Zukunft, den Weltraum und das zu erkunden, was uns menschlich macht.', fr:'14 sous-genres et 52 lectures recommandées pour explorer le futur, l’espace et ce qui nous rend humains.'},
  g04:{es:'12 subgéneros y 51 lecturas recomendadas para encontrar tu próxima aventura.', en:'12 subgenres and 51 recommended reads to find your next adventure.', ca:'12 subgèneres i 51 lectures recomanades per trobar la teva propera aventura.', pt:'12 subgéneros e 51 leituras recomendadas para encontrares a tua próxima aventura.', de:'12 Subgenres und 51 Leseempfehlungen für dein nächstes Abenteuer.', fr:'12 sous-genres et 51 lectures recommandées pour trouver ta prochaine aventure.'},
  g05:{es:'PDF · Edición 2026', en:'PDF · 2026 edition', ca:'PDF · Edició 2026', pt:'PDF · Edição 2026', de:'PDF · Ausgabe 2026', fr:'PDF · Édition 2026'},
  g06:{es:'Comprar'+arrow, en:'Buy'+arrow, ca:'Comprar'+arrow, pt:'Comprar'+arrow, de:'Kaufen'+arrow, fr:'Acheter'+arrow},
  g07:{es:'Pack: las dos guías', en:'Bundle: both guides', ca:'Pack: les dues guies', pt:'Pack: as duas guias', de:'Paket: beide Guides', fr:'Pack : les deux guides'},
  g08:{es:'Ciencia ficción + Fantasía', en:'Science fiction + Fantasy', ca:'Ciència-ficció + Fantasia', pt:'Ficção científica + Fantasia', de:'Science-Fiction + Fantasy', fr:'Science-fiction + Fantasy'},
  g09:{es:'Ahorras 0,98 €', en:'You save €0.98', ca:'Estalvies 0,98 €', pt:'Poupas 0,98 €', de:'Du sparst 0,98 €', fr:'Tu économises 0,98 €'},
  g10:{es:'Comprar el pack'+arrow, en:'Buy the bundle'+arrow, ca:'Comprar el pack'+arrow, pt:'Comprar o pack'+arrow, de:'Paket kaufen'+arrow, fr:'Acheter le pack'+arrow},
  g11:{es:'Pago seguro con Stripe. Al terminar la compra podrás descargar los PDF al momento.', en:'Secure payment with Stripe. As soon as you’ve paid, you can download the PDFs.', ca:'Pagament segur amb Stripe. En acabar la compra podràs descarregar els PDF a l’instant.', pt:'Pagamento seguro com Stripe. Ao concluir a compra podes descarregar os PDF de imediato.', de:'Sichere Zahlung mit Stripe. Direkt nach dem Kauf kannst du die PDFs herunterladen.', fr:'Paiement sécurisé avec Stripe. Dès l’achat terminé, tu peux télécharger les PDF.'},
  g12:{es:'2,99 €', en:'€2.99', ca:'2,99 €', pt:'2,99 €', de:'2,99 €', fr:'2,99 €'},
  g13:{es:'5 €', en:'€5', ca:'5 €', pt:'5 €', de:'5 €', fr:'5 €'},
  g14:{es:'5,98 €', en:'€5.98', ca:'5,98 €', pt:'5,98 €', de:'5,98 €', fr:'5,98 €'},
};
// the second guide card reuses the same strings
T.g05b = T.g05; T.g06b = T.g06; T.g12b = T.g12;

// Thank-you page (gracias.html)
const MAIL = '<a href="mailto:nuriinwonderland@gmail.com">nuriinwonderland@gmail.com</a>';
Object.assign(T, {
  t01:{es:'<i></i>Pago completado', en:'<i></i>Payment complete', ca:'<i></i>Pagament completat', pt:'<i></i>Pagamento concluído', de:'<i></i>Zahlung abgeschlossen', fr:'<i></i>Paiement effectué'},
  t02:{es:'¡Gracias por tu compra!', en:'Thank you for your purchase!', ca:'Gràcies per la teva compra!', pt:'Obrigada pela tua compra!', de:'Danke für deinen Kauf!', fr:'Merci pour ton achat !'},
  t03:{es:'Aquí tienes tus guías. Puedes volver a esta página durante 30 días para descargarlas otra vez: guárdala en favoritos.', en:'Here are your guides. You can come back to this page for 30 days to download them again, so bookmark it.', ca:'Aquí tens les teves guies. Pots tornar a aquesta pàgina durant 30 dies per descarregar-les de nou: desa-la a les adreces d’interès.', pt:'Aqui tens as tuas guias. Podes voltar a esta página durante 30 dias para as descarregar outra vez: guarda-a nos favoritos.', de:'Hier sind deine Guides. Du kannst 30 Tage lang auf diese Seite zurückkommen, um sie erneut herunterzuladen – speichere sie am besten als Lesezeichen.', fr:'Voici tes guides. Tu peux revenir sur cette page pendant 30 jours pour les télécharger à nouveau : ajoute-la à tes favoris.'},
  t04:{es:'Descargar PDF', en:'Download PDF', ca:'Descarregar PDF', pt:'Descarregar PDF', de:'PDF herunterladen', fr:'Télécharger le PDF'},
  t05:{es:'Preparando tu descarga…', en:'Preparing your download…', ca:'Preparant la teva descàrrega…', pt:'A preparar a tua transferência…', de:'Dein Download wird vorbereitet…', fr:'Préparation de ton téléchargement…'},
  t06:{es:'No he podido verificar tu compra. Si has pagado, escríbeme a '+MAIL+' con el correo de tu recibo y te envío las guías.', en:'I couldn’t verify your purchase. If you’ve paid, email me at '+MAIL+' with the address on your receipt and I’ll send you the guides.', ca:'No he pogut verificar la teva compra. Si has pagat, escriu-me a '+MAIL+' amb el correu del teu rebut i t’envio les guies.', pt:'Não consegui verificar a tua compra. Se já pagaste, escreve-me para '+MAIL+' com o e-mail do teu recibo e envio-te as guias.', de:'Ich konnte deinen Kauf nicht bestätigen. Wenn du bezahlt hast, schreib mir an '+MAIL+' mit der E-Mail-Adresse von deinem Beleg, dann schicke ich dir die Guides.', fr:'Je n’ai pas pu vérifier ton achat. Si tu as payé, écris-moi à '+MAIL+' avec l’adresse de ton reçu et je t’envoie les guides.'},
  t07:{es:'Esta página se abre automáticamente después de comprar una guía.', en:'This page opens automatically after you buy a guide.', ca:'Aquesta pàgina s’obre automàticament després de comprar una guia.', pt:'Esta página abre automaticamente depois de comprares uma guia.', de:'Diese Seite öffnet sich automatisch, nachdem du einen Guide gekauft hast.', fr:'Cette page s’ouvre automatiquement après l’achat d’un guide.'},
  t08:{es:'Volver al inicio', en:'Back to home', ca:'Tornar a l’inici', pt:'Voltar ao início', de:'Zur Startseite', fr:'Retour à l’accueil'},
  t09:{es:'El enlace de esta compra ha caducado (30 días). Escríbeme a '+MAIL+' y te vuelvo a enviar las guías.', en:'The link for this purchase has expired (30 days). Email me at '+MAIL+' and I’ll send you the guides again.', ca:'L’enllaç d’aquesta compra ha caducat (30 dies). Escriu-me a '+MAIL+' i et torno a enviar les guies.', pt:'O link desta compra expirou (30 dias). Escreve-me para '+MAIL+' e volto a enviar-te as guias.', de:'Der Link zu diesem Kauf ist abgelaufen (30 Tage). Schreib mir an '+MAIL+', dann schicke ich dir die Guides noch einmal.', fr:'Le lien de cet achat a expiré (30 jours). Écris-moi à '+MAIL+' et je te renvoie les guides.'},
  t10:{es:'¿Algún problema? Escríbeme a '+MAIL+' con el correo de tu recibo.', en:'Any problems? Email me at '+MAIL+' with the address on your receipt.', ca:'Algun problema? Escriu-me a '+MAIL+' amb el correu del teu rebut.', pt:'Algum problema? Escreve-me para '+MAIL+' com o e-mail do teu recibo.', de:'Probleme? Schreib mir an '+MAIL+' mit der E-Mail-Adresse von deinem Beleg.', fr:'Un souci ? Écris-moi à '+MAIL+' avec l’adresse de ton reçu.'},
});

// Right-of-withdrawal confirmation on the download page + technical info next to the buy buttons
Object.assign(T, {
  t11:{es:'Confirmación: antes de pagar solicitaste que el suministro del contenido digital comenzara inmediatamente y reconociste que, una vez iniciada la descarga, pierdes tu derecho de desistimiento.',
       en:'Confirmation: before paying, you requested that the supply of the digital content begin immediately and acknowledged that, once the download has started, you lose your right of withdrawal.',
       ca:'Confirmació: abans de pagar vas sol·licitar que el subministrament del contingut digital comencés immediatament i vas reconèixer que, un cop iniciada la descàrrega, perds el teu dret de desistiment.',
       pt:'Confirmação: antes de pagar, pediste que o fornecimento do conteúdo digital começasse imediatamente e reconheceste que, uma vez iniciada a transferência, perdes o teu direito de livre resolução.',
       de:'Bestätigung: Vor der Zahlung hast du verlangt, dass die Bereitstellung der digitalen Inhalte sofort beginnt, und bestätigt, dass du mit Beginn des Downloads dein Widerrufsrecht verlierst.',
       fr:'Confirmation : avant de payer, tu as demandé que la fourniture du contenu numérique commence immédiatement et reconnu qu’une fois le téléchargement commencé, tu perds ton droit de rétractation.'},
  g15:{es:'Formato PDF, sin DRM. Se abre en cualquier ordenador, tableta, móvil o lector compatible con una aplicación de PDF.',
       en:'PDF format, DRM-free. Opens on any computer, tablet, phone or compatible e-reader with a PDF app.',
       ca:'Format PDF, sense DRM. S’obre en qualsevol ordinador, tauleta, mòbil o lector compatible amb una aplicació de PDF.',
       pt:'Formato PDF, sem DRM. Abre em qualquer computador, tablet, telemóvel ou leitor compatível com uma aplicação de PDF.',
       de:'PDF-Format, ohne DRM. Lässt sich auf jedem Computer, Tablet, Smartphone oder kompatiblen E-Reader mit einer PDF-App öffnen.',
       fr:'Format PDF, sans DRM. S’ouvre sur tout ordinateur, tablette, téléphone ou liseuse compatible avec une application PDF.'},
});
module.exports = T;
