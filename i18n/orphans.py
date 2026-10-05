import sys
from html.parser import HTMLParser
class P(HTMLParser):
    def __init__(s): super().__init__(); s.st=[]; s.skip=0; s.inbody=False
    def handle_starttag(s,t,a):
        if t=='body': s.inbody=True
        if t in('script','style','svg'): s.skip+=1
        if t in('br','img','meta','link','input'): return
        s.st.append((t,dict(a)))
    def handle_endtag(s,t):
        if t in('script','style','svg'): s.skip-=1
        for i in range(len(s.st)-1,-1,-1):
            if s.st[i][0]==t: del s.st[i:]; break
    def handle_data(s,d):
        if not s.inbody or s.skip or not d.strip(): return
        if any('data-i18n' in a for _,a in s.st): return
        print(repr(d.strip()[:60]), [t for t,_ in s.st[-3:]])
P().feed(open(sys.argv[1]).read())
