const STORE_KEY = 'passport:lastdata';
const STORE_KEY_LIST = 'passport:dailylist';

let dailyList = [];

/* ---------- Бетон класси профиллари ---------- */
const GRADES = {
  V30: {
    klass: 'В30 (М400);&nbsp;&nbsp;&nbsp;Rт = 294 кгс/см² (28,9 Мпа)',
    otpusk: 'В30 (Мр);&nbsp; В30;&nbsp; Rот = 75-80%',
    frost: 'F 200-F 300'
  },
  V22_5: {
    klass: 'В22,5 (М300);&nbsp;&nbsp;&nbsp;Rт = 294 кгс/см² (28,9 Мпа)',
    otpusk: 'В22,5 (Мр);&nbsp; В22,5;&nbsp; Rот = 70-75%',
    frost: 'F 150-F 200'
  },
  V15: {
    klass: 'В15 (М200);&nbsp;&nbsp;&nbsp;Rт = 294 кгс/см² (28,9 Мпа)',
    otpusk: 'В15 (Мр);&nbsp; В15;&nbsp; Rот = 60-70%',
    frost: 'F 150'
  }
};
const STANDARD = "O'zDSt 3025-2015, ГОСТ 12004-81";

/* ---------- Маҳсулотлар базаси (номи, класси, арматураси) ---------- */
const PRODUCTS = [
  { name: 'Ф5-АМ', grade: 'V30', steel: 'А500 Ø25, Ø22, Ø18, Ø12, Ø8.' },
  { name: 'Ф5-Амк', grade: 'V30', steel: 'А500 Ø25, Ø22, Ø18, Ø12, Ø8.' },
  { name: 'Ф4-АМ', grade: 'V30', steel: 'А500 Ø25, Ø20, Ø12.' },
  { name: 'Ф4-Амк', grade: 'V30', steel: 'А500 Ø25, Ø20, Ø12.' },
  { name: 'Ф3-АМ', grade: 'V30', steel: 'А500 Ø22, Ø20, Ø12.' },
  { name: 'Ф3-Амк', grade: 'V30', steel: 'А500 Ø25, Ø20, Ø12.' },
  { name: 'Ф5-4', grade: 'V30', steel: 'А500 Ø22, Ø20, Ø12, Ø6,5.' },
  { name: 'Ф5-2', grade: 'V30', steel: 'А500 Ø22, Ø20, Ø12, Ø6,5.' },
  { name: 'Ф4-2', grade: 'V30', steel: 'А500 Ø22, Ø20, Ø12, Ø6,5.' },
  { name: 'Ф3-2', grade: 'V30', steel: 'А500 Ø22, Ø20, Ø12, Ø8, Ø6,5.' },
  { name: 'Ф2-2', grade: 'V30', steel: 'А500 Ø16, Ø8, Ø6,5.' },
  { name: 'Ф2-А', grade: 'V30', steel: 'А500 Ø25, Ø20, Ø16, Ø12, Ø6,5.' },
  { name: 'Св-10,5', grade: 'V30', steel: 'А500 Ø14, Ø8.' },
  { name: 'Св-9,5', grade: 'V30', steel: 'А500 Ø14, Ø8, Ø6,5.' },
  { name: 'Ф5-Усу(250)', grade: 'V30', steel: 'A(240) Ø12, Ø18; А(500) Ø28, Ø14.' },
  { name: 'лоток Л12-8/2', grade: 'V22_5', steel: ' А(500) Ø12, Ø8.' },
  { name: 'лоток Л12-8', grade: 'V22_5', steel: ' А(500) Ø12, Ø8.' },
  { name: 'Фк4-05', grade: 'V22_5', steel: 'А500 Ø20, Ø16, Ø12, Ø6,5.' },
  { name: 'Ф4-05', grade: 'V22_5', steel: 'А500 Ø20, Ø16, Ø12, Ø6,5.' },
  { name: 'Фк3-05', grade: 'V22_5', steel: 'А500 Ø20, Ø16, Ø8, Ø6,5.' },
  { name: 'Ф3-05', grade: 'V22_5', steel: 'А500 Ø20, Ø16, Ø8, Ø6,5.' },
  { name: 'Па3-1', grade: 'V22_5', steel: 'А500 Ø20, Ø18, Ø8, Ø6,5.' },
  { name: 'Па3-2', grade: 'V22_5', steel: 'А500 Ø22, Ø20, Ø12, Ø8, Ø6,5.' },
  { name: 'Ар-5', grade: 'V22_5', steel: 'А500 Ø16, Ø12, Ø6,5.' },
  { name: 'Р1-А', grade: 'V22_5', steel: 'А500 Ø12, Ø6,5.' },
  { name: 'Лк-20.5', grade: 'V22_5', steel: 'А500 Ø8, Ø6,5.' },
  { name: 'УСО-3А', grade: 'V22_5', steel: 'А500 Ø18; A(240) Ø6,5.' },
  { name: 'УСО-4А', grade: 'V22_5', steel: 'А500 Ø18, Ø6,5.' },
  { name: 'Пл-10.5', grade: 'V22_5', steel: 'А500 Ø6,5.' },
  { name: 'Пл-10.5 (2)', grade: 'V22_5', steel: 'А500 Ø6,5.' },
  { name: 'УСО-1А', grade: 'V15', steel: 'А500 Ø18, Ø12.' },
  { name: 'УСО-2А', grade: 'V15', steel: 'А500 Ø18, Ø12.' },
  { name: 'УСО-5А', grade: 'V15', steel: 'А500 Ø18, Ø12.' },
  { name: 'ЛЖ-1,6', grade: 'V15', steel: 'А500 Ø16.' },
  { name: 'ЛЖ-2,8', grade: 'V15', steel: 'А500 Ø16.' },
  { name: 'УБ-1', grade: 'V15', steel: 'А500 Ø16.' },
];

let copyMode = 2;

function setCopyMode(n){
  copyMode = n;
  document.querySelectorAll('.copy-toggle-btn').forEach(btn=>{
    btn.classList.toggle('active', Number(btn.dataset.copies) === n);
  });
}

function buildProductSelect(){
  const sel = document.getElementById('f_product');
  sel.innerHTML = '';
  PRODUCTS.forEach((p, idx)=>{
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = p.name;
    sel.appendChild(opt);
  });
}

function findProduct(name){
  return PRODUCTS.find(p => p.name === name);
}

function onProductChange(){
  const idx = document.getElementById('f_product').value;
  const p = PRODUCTS[idx];
  renderPreview(p);
}

function renderPreview(p){
  const box = document.getElementById('productPreview');
  if(!p){ box.innerHTML = ''; return; }
  const g = GRADES[p.grade];
  box.innerHTML = `
    <div class="preview-line"><b>5.</b> ${g.klass}</div>
    <div class="preview-line"><b>6.</b> ${g.otpusk} ; Rф = ______</div>
    <div class="preview-line"><b>7.</b> ${esc(p.steel)}</div>
    <div class="preview-line"><b>8.</b> ${g.frost}</div>
    <div class="preview-line"><b>9.</b> ${STANDARD}</div>
  `;
}

function esc(str){
  if(!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatDateForPrint(isoStr){
  if(!isoStr) return '';
  const parts = isoStr.split('-');
  if(parts.length !== 3) return isoStr;
  const [y, m, d] = parts;
  return `${d}.${m}.${y}`;
}
function todayISO(){
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}`;
}

function gatherFormData(){
  const idx = document.getElementById('f_product').value;
  const p = PRODUCTS[idx];
  return {
    productIdx: idx,
    product: p,
    partiya: g('f_partiya'),
    soni: g('f_soni'),
    date: g('f_date'),
    copies: copyMode
  };
}
function g(id){ const el=document.getElementById(id); return el ? el.value : ''; }
function s(id,v){ const el=document.getElementById(id); if(el) el.value = v || ''; }

/* Агар фойдаланувчи фақат рақам киритса (масалан "6"), охирига автоматик
   " шт" қўшиб чиқаради. Агар ўзи бошқа сўз ёзган бўлса (масалан "6 дона"),
   тегмайди — ёзилганидек чиқади. */
function formatSoni(raw){
  if(!raw) return '';
  const trimmed = String(raw).trim();
  if(/^\d+([.,]\d+)?$/.test(trimmed)){
    return trimmed + ' шт';
  }
  return trimmed;
}

function renderCopyHTML(data){
  const p = data.product;
  const g = GRADES[p.grade];
  return `
    <div class="p-head">
      <img src="logo.jpg" class="p-logo">
      <div class="p-maker">
        Изготовитель:&nbsp; <b>АО «Узкишлокэлекткурилиш».</b><br>
        <b>ООО «ЭКМ».</b>
      </div>
    </div>
    <h3 class="p-title">Паспорт качества</h3>
    <p class="p-subtitle">на железобетонные изделия</p>
    <div class="p-items">
      <div class="p-line">1. Наименование и марка изделий: <b class="u">${esc(p.name)}</b></div>
      <div class="p-line">2. Номер партии: <b class="u">${esc(data.partiya)}</b></div>
      <div class="p-line">3. Число изделий в партии: <b class="u">${esc(formatSoni(data.soni))}</b></div>
      <div class="p-line">4. Дата изготовления изделий: <b class="u">${esc(formatDateForPrint(data.date))}</b></div>
      <div class="p-line">5. Проектный класс бетона по прочности и требуемая прочность бетона в проектном</div>
      <div class="p-line">возрасте: <b class="u">${g.klass}</b></div>
      <div class="p-line">6. Отпускная и (или) передаточная прочность бетона (нормируемая, требуемая, <b>фактическая</b>)</div>
      <div class="p-line"><b>${g.otpusk} ;&nbsp; Rф =</b> ______________ <b>кгс/см²</b>______________________</div>
      <div class="p-line">7. Марка стали закладного изделия и выпусков арматуры <b class="u">${esc(p.steel)}</b></div>
      <div class="p-line">8. Марка бетона по морозостойкости: <b class="u">${g.frost}</b></div>
      <div class="p-line">9. Обозначение стандарта: <b class="u">${STANDARD}</b></div>
      <div class="p-note"><b>Примечание: перевозка, складирование и хранение изделий получателем должны<br>производиться согласно ГОСТ и ШНК (КМК).</b></div>
    </div>
    <div class="p-sig"><span><b>Инженер ОТК в/и:</b></span><span><b>Мелибоев.Л</b></span></div>
  `;
}

/* ---------- Кунлик рўйхат (бир нечта маҳсулот — биттa PDF, ҳар бири ўз варағида) ---------- */

function addToList(){
  const data = gatherFormData();
  if(!data.product){ return; }
  dailyList.push(data);
  renderListUI();
  saveList();
  // партия/сони ни тозалаймиз, лекин маҳсулот ва санани сақлаб қоламиз —
  // кейинги ёзувни тезроқ киритиш учун
  s('f_partiya','');
  s('f_soni','');
}

function removeFromList(idx){
  dailyList.splice(idx,1);
  renderListUI();
  saveList();
}

function renderListUI(){
  const box = document.getElementById('listBox');
  const countEl = document.getElementById('listCount');
  countEl.textContent = dailyList.length ? `(${dailyList.length} та)` : '';
  if(!dailyList.length){
    box.innerHTML = '<p class="list-empty">Рўйхат бўш.</p>';
    return;
  }
  box.innerHTML = dailyList.map((d, idx)=>`
    <div class="list-row">
      <div class="list-row-main">
        <b>${esc(d.product.name)}</b>
        <span class="list-row-sub">партия ${esc(d.partiya||'—')} · ${esc(formatSoni(d.soni)||'—')} · ${esc(formatDateForPrint(d.date)||'—')} · ${d.copies===1?'1 нусха':'2 нусха'}</span>
      </div>
      <button type="button" class="list-row-del" onclick="removeFromList(${idx})">✕</button>
    </div>
  `).join('');
}

async function saveList(){
  try{ await window.storage.set(STORE_KEY_LIST, JSON.stringify(dailyList), false); }catch(e){}
}
async function loadList(){
  try{
    const res = await window.storage.get(STORE_KEY_LIST, false);
    if(res && res.value){
      const arr = JSON.parse(res.value);
      if(Array.isArray(arr)){
        dailyList = arr.filter(d => d && d.product);
      }
    }
  }catch(e){}
  renderListUI();
}

function openChoiceModal(){
  document.getElementById('choiceModal').classList.add('open');
}
function closeChoiceModal(){
  document.getElementById('choiceModal').classList.remove('open');
}

async function doPrint(mode){
  closeChoiceModal();

  // Агар рўйхатга ҳеч нарса қўшилмаган бўлса, форманинг ўзидаги маълумотни
  // биттa ёзув сифатида ишлатамиз (эски, оддий режим).
  const entries = dailyList.length ? dailyList.slice() : [gatherFormData()];
  if(!entries[0] || !entries[0].product){ return; }

  const sheetEl = document.getElementById('printSheet');
  sheetEl.innerHTML = entries.map((data)=>{
    const html = renderCopyHTML(data);
    const singleClass = data.copies === 1 ? ' single' : '';
    const copyB = data.copies === 1 ? '' : `<div class="copy">${html}</div>`;
    return `<div class="sheet${singleClass}"><div class="copy">${html}</div>${copyB}</div>`;
  }).join('');

  try{
    await window.storage.set(STORE_KEY, JSON.stringify(entries[entries.length-1]), false);
  }catch(e){}

  const btn = document.getElementById('pdfBtn');
  const oldText = btn.textContent;
  btn.textContent = '⏳ Тайёрланмоқда...';
  btn.disabled = true;

  const wrapEl = document.getElementById('printSheetWrap');
  const firstPartiya = entries[0].partiya;
  const filename = entries.length > 1
    ? 'pasport_' + (entries[0].date || todayISO()) + '.pdf'
    : 'pasport' + (firstPartiya ? '_' + firstPartiya.replace(/[^\w-]+/g,'') : '') + '.pdf';

  wrapEl.classList.add('capturing');
  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  // ЧЕГАРА ЧИЗИҚЛАРИ МУАММОСИНИНГ ТЎЛИҚ ЕЧими:
  // 1) scrollX:0, scrollY:0 — бизнинг #printSheet элементи "position:fixed"
  //    билан ҳамма вақт (0,0) нуқтада турибди, шунинг учун ҳақиқий саҳифа
  //    қаерга скролл қилинганини ҳисобга олиш КЕРАК ЭМАС (аввалги уриниш
  //    "-window.scrollX/-window.scrollY"ни қўшгани сабабли, агар фойдаланувчи
  //    формани пастга скролл қилиб тугмани босса, шунча пиксел юқориси
  //    "кесилиб" кетарди — худди сиз кўрган ҳолат).
  // 2) windowWidth/windowHeight — варакнинг ўз scrollWidth/Height'идан БИР ОЗ
  //    КАТТАРОҚ (буфер билан) берилади, чунки html2canvas ичкарида озгина
  //    жой (масалан, виртуал скроллбар учун) талаб қилади; айнан шу ерга
  //    тиқилиб қолган рақам (буфер йўқ) четдаги чизиқни кесиб қўярди.
  //    document.documentElement.scrollHeight ишлатиш ХАТО — у "fixed"
  //    элементларни ҳисобга олмайди (шунинг учун варакнинг пасти "кесилиб",
  //    ўрнига бўш жой қолиб кетди).
  const opt = {
    margin: [5,5,5,5],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      scrollX: 0,
      scrollY: 8,
      // windowWidth: sheetEl.scrollWidth + 60,
      // windowHeight: sheetEl.scrollHeight + 60
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all'] }
  };

  try{
    const pdfBlob = await html2pdf().set(opt).from(sheetEl).outputPdf('blob');
    const pdfFile = new File([pdfBlob], filename, { type: 'application/pdf' });

    const wantsShare = mode === 'share';
    if (wantsShare && navigator.share && (!navigator.canShare || navigator.canShare({ files: [pdfFile] }))) {
      await navigator.share({
        files: [pdfFile],
        title: filename,
        text: 'Паспорт качества PDF'
      });
    } else {
      const blobUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    }
  }catch(e){
    if (e && e.name !== 'AbortError') {
      console.error('PDF error:', e);
      alert('PDF тайёрлашда хатолик юз берди. Қайта уриниб кўринг.');
    }
  }finally{
    wrapEl.classList.remove('capturing');
    btn.textContent = oldText;
    btn.disabled = false;
  }
}

function resetForm(){
  s('f_partiya','');
  s('f_soni','');
  s('f_date', todayISO());
  setCopyMode(2);
  document.getElementById('f_product').selectedIndex = 0;
  onProductChange();
}

function clearList(){
  dailyList = [];
  renderListUI();
  saveList();
}

async function loadLast(){
  buildProductSelect();
  s('f_date', todayISO());
  try{
    const res = await window.storage.get(STORE_KEY, false);
    if(res && res.value){
      const data = JSON.parse(res.value);
      if(data.productIdx != null) document.getElementById('f_product').value = data.productIdx;
      s('f_partiya', data.partiya);
      s('f_soni', data.soni);
      s('f_date', data.date || todayISO());
      setCopyMode(data.copies === 1 ? 1 : 2);
    }
  }catch(e){}
  onProductChange();
  await loadList();
}

loadLast();
