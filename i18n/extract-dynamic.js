// Pulls the Spanish data objects out of index.html's script so they can be translated.
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));
const grab = (start, end) => js.slice(js.indexOf(start), js.indexOf(end, js.indexOf(start)));
const code = [
  grab("const IMG =", "document.getElementById('shelf')"),
  grab("const RAW_THEMES = [", "document.getElementById('specials')"),
].join('\n') + '\n;({BOOKS, RAW_THEMES, SPECIALS, LIFELINES})';
const {BOOKS, RAW_THEMES, SPECIALS, LIFELINES} = eval(code);
const T = n => RAW_THEMES.find(t => t.name === n).cards;
const cards = {
  ia: T('IA y conciencia'), colonizacion: T('Colonización espacial'), genetica: T('Manipulación genética'),
  tiempo: [...T('Viajes en el tiempo'), ...T('Realidades alternativas')], contacto: T('Contacto alienígena')
};
const out = {
  books: Object.fromEntries(Object.entries(BOOKS).map(([k, b]) => [k, {kicker: b.kicker, body: b.body}])),
  themeNames: {ia:'Inteligencia artificial y conciencia', colonizacion:'Colonización espacial y vida en otros mundos', genetica:'Manipulación genética y evolución humana', tiempo:'Viajes en el tiempo y simulaciones', contacto:'Contacto con otras civilizaciones'},
  cards,
  specials: SPECIALS.map(({n, p, note}) => ({n, p, note})),
  lifelines: LIFELINES.map(({n, p}) => ({n, p})),
  ui: {
    readSynopsis:'Leer sinopsis', reserve:'Resérvalo ya', newBadge:'NUEVO', today:'hoy', yesterday:'ayer', daysAgo:'hace {n} días',
    done:'✓ Hecho', missions:'{n} misiones completadas', live:'En directo · ', lastSignal:'Última señal ', fallbackData:'Datos del 25 sept 2026',
    flip:'Dar la vuelta', drawAnother:'Robar otra carta', ifYouLiked:'Si te gustó esta pregunta:', specialCard:'Carta especial',
    guidesThanks:'¡Gracias por suscribirte! Ya puedes descargar las guías.', openMenu:'Abrir menú', closeMenu:'Cerrar menú',
    watchOn:'Ver en YouTube:', bookAria:'leer sinopsis', flipCardAria:'Dar la vuelta a la carta', language:'Idioma'
  },
  coral: {
    paperOut:'¡Ya disponible en papel!', paperChip:'Ya disponible',
    paperText:'La edición en papel ya está disponible. Te dejo el aviso por si quieres recibir las novedades.'
  }
};
fs.writeFileSync('i18n/dynamic.es.json', JSON.stringify(out, null, 1));
console.log(Object.keys(out.cards).map(k => k + ':' + out.cards[k].length).join(' '));
