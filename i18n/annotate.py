# Marks every translatable text element with data-i18n="<prefix><n>" and dumps the Spanish source.
# A translatable element has its own text and only inline descendants; the outermost one wins.
import sys, json, re
from html.parser import HTMLParser

INLINE = {'span', 'strong', 'b', 'i', 'em', 'br', 'small', 'sup'}
import sys as _s
if len(_s.argv) > 4: INLINE |= set(_s.argv[4].split(','))
VOID = {'br', 'img', 'meta', 'link', 'input', 'hr', 'source'}
SKIP = {'script', 'style', 'title', 'head', 'svg'}

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.stack = []; self.found = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        if self.skip or tag in SKIP:
            if tag in SKIP and tag not in VOID: self.skip += 1
            if self.stack: self.stack[-1]['block'] = True
            return
        if self.stack and tag not in INLINE: self.stack[-1]['block'] = True
        if tag in VOID: return
        self.stack.append({'tag': tag, 'pos': self.getpos(), 'start_text': self.get_starttag_text(), 'text': False, 'block': False, 'attrs': dict(attrs), 'kids': []})
    def handle_endtag(self, tag):
        if tag in SKIP and self.skip:
            self.skip -= 1; return
        if self.skip or tag in VOID or not any(e['tag'] == tag for e in self.stack): return
        while self.stack:
            el = self.stack.pop()
            if el['tag'] == tag: break
        ok = el['text'] and not el['block'] and 'data-i18n' not in el['attrs'] and 'data-noi18n' not in el['attrs']
        if ok:
            el['kids'] = []  # outermost wins: drop inner candidates
            chosen = [el]
        else:
            chosen = el['kids']
        if self.stack:
            if el['block']: self.stack[-1]['block'] = True
            if el['text'] and not ok: pass
            if el['text'] and ok: self.stack[-1]['text'] = self.stack[-1]['text'] or False
            # a child with text makes the parent "contain text" only through inline children
            if el['tag'] in INLINE and el['text']: self.stack[-1]['text'] = True
            self.stack[-1]['kids'].extend(chosen)
        else:
            self.found.extend(chosen)
    def handle_data(self, data):
        if self.skip or not self.stack: return
        if data.strip(): self.stack[-1]['text'] = True
    handle_entityref = lambda self, n: self.handle_data('x')
    handle_charref = lambda self, n: self.handle_data('x')

src_path, prefix = sys.argv[1], sys.argv[2]
src = open(src_path, encoding='utf-8').read()
body_start = src.index('<body>')
p = P(); p.feed(src[body_start:]); p.close()
# collect remaining open stack kids
for el in p.stack: p.found.extend(el['kids'])
lines = src.splitlines(keepends=True); offs = [0]
for l in lines: offs.append(offs[-1] + len(l))
def absoff(pos): return offs[pos[0] - 1] + pos[1]
base_line = src[:body_start].count('\n')
items = []
for el in p.found:
    ln, col = el['pos']
    if ln == 1: o = body_start + col
    else: o = offs[base_line + ln - 1] + col
    assert src[o:o + len(el['start_text'])] == el['start_text'], (el['start_text'], src[o:o+60])
    items.append((o, el))
items.sort(key=lambda x: x[0])
out = src; shift = 0; es = {}
for n, (o, el) in enumerate(items):
    key = f'{prefix}{n:03d}'
    st = el['start_text']; ins = st[:-1].rstrip('/') + f' data-i18n="{key}"' + ('/>' if st.endswith('/>') else '>')
    oo = o + shift
    out = out[:oo] + ins + out[oo + len(st):]; shift += len(ins) - len(st)
    # inner html
    start = oo + len(ins)
    depth, i = 1, start
    tagre = re.compile(r'<(/?)(' + el['tag'] + r')\b[^>]*>')
    for m in tagre.finditer(out, start):
        depth += -1 if m.group(1) else 1
        if depth == 0: es[key] = out[start:m.start()].strip(); break
open(src_path, 'w', encoding='utf-8').write(out)
json.dump(es, open(sys.argv[3], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(es))
