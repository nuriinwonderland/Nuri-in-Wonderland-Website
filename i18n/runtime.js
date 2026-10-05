/* Language runtime shared by index.html and coral-red.html.
   Strings live in i18n/strings.js (window.I18N[lang]); static elements carry data-i18n keys. */
(() => {
  const LANGS = [['es', 'Español'], ['en', 'English'], ['ca', 'Català'], ['pt', 'Português'], ['de', 'Deutsch'], ['fr', 'Français']];
  const LOCALES = {es:'es-ES', en:'en-GB', ca:'ca-ES', pt:'pt-PT', de:'de-DE', fr:'fr-FR'};
  const I18N = window.I18N || {es:{}};
  const get = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
  const pick = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  let lang = get('nw:lang') || (navigator.language || 'es').slice(0, 2).toLowerCase();
  if (!I18N[lang]) lang = 'es';
  const subs = [];

  const t = (path, vars) => {
    let v = pick(I18N[lang], path);
    if (v == null) v = pick(I18N.es, path);
    if (typeof v === 'string' && vars) v = v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
    return v;
  };
  const applyStatic = () => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t('static.' + el.dataset.i18n);
      if (v != null && el.innerHTML !== v) el.innerHTML = v;
    });
    document.querySelectorAll('.lang-current').forEach(el => { el.textContent = lang.toUpperCase(); });
    document.querySelectorAll('.lang-menu [data-lang]').forEach(b => b.setAttribute('aria-checked', b.dataset.lang === lang));
  };
  const setLang = (l) => {
    if (!I18N[l] || l === lang) return;
    lang = l; set('nw:lang', l);
    applyStatic(); subs.forEach(fn => fn(lang));
  };

  // Language picker: a small popover anchored to its button (scales from the top-right corner)
  const mount = (host) => {
    host.innerHTML = `<button class="lang-btn" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Idioma / Language">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9M12 3C9.5 5.7 8.2 8.7 8.2 12s1.3 6.3 3.8 9"/></svg>
        <span class="lang-current">${lang.toUpperCase()}</span></button>
      <div class="lang-menu" role="menu">${LANGS.map(([c, n]) => `<button type="button" role="menuitemradio" data-lang="${c}" aria-checked="${c === lang}"><span class="code">${c.toUpperCase()}</span>${n}<svg class="tick" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 5"/></svg></button>`).join('')}</div>`;
    const btn = host.querySelector('.lang-btn');
    const open = (v) => { host.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); open(!host.classList.contains('open')); });
    host.querySelector('.lang-menu').addEventListener('click', (e) => {
      const b = e.target.closest('[data-lang]'); if (!b) return;
      setLang(b.dataset.lang); open(false); btn.focus();
    });
    document.addEventListener('click', (e) => { if (!host.contains(e.target)) open(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });
  };

  window.NW = {
    get lang() { return lang; },
    get locale() { return LOCALES[lang]; },
    t, setLang, mount,
    onChange: (fn) => subs.push(fn),
    apply: applyStatic,
  };
})();
