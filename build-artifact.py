# Builds the artifact versions of the pages. The artifact host adds its own <html>/<head>/<body>
# wrapper, and each page is its own artifact, so links between pages point at the artifact URLs.
import re, sys
MAIN = 'https://claude.ai/artifact/JAGxE69rdX8HPSszyezPEC'
CORAL = 'https://claude.ai/artifact/FZLupwh3JdDXsyPcFB67xH'
LEGAL = 'https://claude.ai/artifact/34rs1WMHK6DDLEDvhRxWaU'

GF = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Barlow+Condensed:wght@600;700;800&display=swap" rel="stylesheet">'

def strip(s):
    s = re.sub(r'(i18n/(?:strings|runtime)\.js)\?v=\d+', r'\1', s)  # artifact files are versioned by the host
    # The artifact viewer only allows stylesheets from Google Fonts; the real site self-hosts them
    s = s.replace('<link rel="stylesheet" href="assets/fonts/fonts.css">', GF)
    s = re.sub(r'<!doctype html>\s*', '', s, flags=re.I)
    s = re.sub(r'</?html[^>]*>\s*', '', s)
    s = re.sub(r'</?head>\s*', '', s)
    s = re.sub(r'</?body>\s*', '', s)
    s = re.sub(r'<meta charset[^>]*>\s*', '', s)
    s = re.sub(r'<meta name="viewport"[^>]*>\s*', '', s)
    return s

def target(v):  # artifact links open outside the frame
    return v + '" target="_blank" rel="noopener'

main = strip(open('index.html', encoding='utf-8').read())
main = main.replace('href="/coral-red"', 'href="' + target(CORAL) + '"').replace("buy:'/coral-red'", "buy:'" + CORAL + "'")
open('artifact.html', 'w', encoding='utf-8').write(main)

coral = strip(open('coral-red.html', encoding='utf-8').read())
coral = coral.replace('href="index.html#libros"', 'href="' + target(MAIN + '#libros') + '"').replace('href="index.html"', 'href="' + target(MAIN) + '"')
open('coral-red-artifact.html', 'w', encoding='utf-8').write(coral)
legal = strip(open('legal.html', encoding='utf-8').read())
legal = legal.replace('href="index.html"', 'href="' + target(MAIN) + '"')
open('legal-artifact.html', 'w', encoding='utf-8').write(legal)
for name in ('artifact.html', 'coral-red-artifact.html'):
    t = open(name, encoding='utf-8').read()
    t = re.sub(r'href="legal\.html#([a-z-]+)"', lambda m: 'href="' + target(LEGAL + '#' + m.group(1)) + '"', t)
    open(name, 'w', encoding='utf-8').write(t)
print('ok')
