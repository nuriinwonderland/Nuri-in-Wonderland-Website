#!/bin/sh
# Builds dist/: exactly what goes online (drag this folder into Netlify).
set -e
cd "$(dirname "$0")"
node i18n/build.js >/dev/null
rm -rf dist && mkdir -p dist/i18n
cp index.html coral-red.html legal.html gracias.html dist/
cp i18n/strings.js i18n/runtime.js dist/i18n/
cp -R assets dist/assets
find dist -name '.DS_Store' -delete
# old cover versions, no longer used
rm -f dist/assets/img/coral-red-B2uZo2RB.jpg dist/assets/img/paperback.png dist/assets/img/coral-red-402.jpg

# Netlify: clean URLs + redirects from the old site's addresses
cat > dist/_redirects <<'R'
/aviso-legal            /legal#aviso-legal   301
/politica-privacidad    /legal#privacidad    301
/politica-cookies       /legal#cookies       301
/coral-red              /coral-red.html      200
/legal                  /legal.html          200
/gracias                /gracias.html        200
R

cat > dist/_headers <<'H'
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/i18n/*
  Cache-Control: public, max-age=3600
/gracias*
  X-Robots-Tag: noindex, nofollow
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
H
echo "dist/ listo:"; du -sh dist; find dist -type f | sed 's#^dist/##' | sort | sed 's#^#  #' | head -80
