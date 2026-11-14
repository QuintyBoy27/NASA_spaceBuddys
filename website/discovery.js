// Discovery tools use existing, sourced exhibit records.
let discoveryObserver;
function installDiscoveries() {
  discoveryObserver?.disconnect();
  installNotebook();
  const hero = main.querySelector('.hero');
  if (!hero) return;
  const section = document.createElement('section');
  section.className = 'discovery';
  section.innerHTML = `<div class="eyebrow">The discovery room</div><h2>Follow the hardware.<br>Find the connection.</h2><p>Travel through the collection, compare two objects, or let the museum choose your next discovery.</p><div class="discovery-tabs" role="tablist" aria-label="Discovery tools"><button role="tab" id="tab-time" aria-controls="discovery-content" aria-selected="true" tabindex="0">Time explorer</button><button role="tab" id="tab-compare" aria-controls="discovery-content" aria-selected="false" tabindex="-1">Compare artifacts</button></div><div id="discovery-content" role="tabpanel" aria-labelledby="tab-time"></div><div class="discovery-bottom"><button id="surprise">Choose my next discovery ↗</button><span>Every destination opens a NASA-backed exhibit.</span></div>`;
  hero.after(section);
  const tabs = [...section.querySelectorAll('[role=tab]')];
  function selectTab(tab) {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    const content = section.querySelector('#discovery-content');
    content.setAttribute('aria-labelledby', tab.id);
    if (tab.id === 'tab-time') installTimeExplorer(content);
    else installComparison(content);
  }
  tabs.forEach((tab,index) => {
    tab.onclick = () => selectTab(tab);
    tab.onkeydown = event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[1-index];
      next.focus(); selectTab(next);
    };
  });
  selectTab(tabs[0]);
  section.querySelector('#surprise').onclick = () => {
    const unseen = exhibits.filter(exhibit => !visited.includes(exhibit.id));
    const pool = unseen.length ? unseen : exhibits;
    location.hash = 'exhibit/' + pool[Math.floor(Math.random()*pool.length)].id;
  };
  // Pause decorative rotation whenever it is outside the viewport.
  const moon = hero.querySelector('.moon-disc');
  if (moon && 'IntersectionObserver' in window) {
    discoveryObserver = new IntersectionObserver(entries => {
      moon.classList.toggle('offscreen', !entries[0].isIntersecting);
    });
    discoveryObserver.observe(moon);
  }
}

function installTimeExplorer(container) {
  container.innerHTML = `<div class="time-controls"><label for="mission-time">Move through the collection</label><input id="mission-time" type="range" min="0" max="${exhibits.length-1}" value="0" step="1"><output for="mission-time" id="time-label"></output></div><div id="time-story"></div><p class="caption">Steps follow exhibit dates, with equal spacing between stops. Ingenuity’s date marks its final flight.</p>`;
  const slider = container.querySelector('input');
  function show() {
    const e = exhibits[Number(slider.value)];
    container.querySelector('output').textContent = e.year;
    slider.setAttribute('aria-valuetext', e.year + ', ' + e.name);
    const story = container.querySelector('#time-story');
    story.innerHTML = `<div class="time-photo"><img src="images/${e.image || e.id}.jpg" alt="${e.image ? e.evidence : e.name+', NASA archive'}"><span>${e.year}</span></div><div class="time-copy"><div class="eyebrow">${e.world} · ${e.mission}</div><h3>${e.name}</h3><p>${e.hook}</p><p class="caption">${e.dateLabel} · ${e.date}</p><p>${e.story}</p><a class="button primary" href="#exhibit/${e.id}">Visit this moment →</a></div>`;
    if (!motionPreference.matches) story.animate([{opacity:.5},{opacity:1}], {duration:220});
  }
  slider.oninput = show;
  show();
}

function installComparison(container) {
  const options = exhibits.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
  container.innerHTML = `<div class="compare-selectors"><label>First artifact<select id="compare-first">${options}</select></label><label>Second artifact<select id="compare-second">${options}</select></label></div><div id="comparison" class="comparison"></div>`;
  const first = container.querySelector('#compare-first');
  const second = container.querySelector('#compare-second');
  first.value = exhibits[0].id;
  second.value = 'backshell';
  function compare() {
    const selected = [first.value,second.value].map(id => exhibits.find(e => e.id === id));
    container.querySelector('#comparison').innerHTML = selected.map(e => `<article><img src="images/${e.image || e.id}.jpg" alt="${e.image ? e.evidence : e.name+', NASA archive'}"><div class="meta">${e.world} · ${e.year}</div><h3>${e.name}</h3>${missionFacts(e)}<dl><dt>Where it stayed</dt><dd>${e.place}</dd><dt>What happened</dt><dd>${e.status}</dd><dt>The science it enabled</dt><dd>${e.science}</dd></dl><a class="button" href="#exhibit/${e.id}">Inspect evidence →</a></article>`).join('');
  }
  first.onchange = compare; second.onchange = compare; compare();
}

function installNotebook() {
  const note = main.querySelector('#note');
  if (!note) return;
  const key = 'museum-note-' + location.hash.slice(9);
  const status = document.createElement('p');
  status.className = 'caption';
  status.setAttribute('role','status');
  const oldCaption = main.querySelector('#download').nextElementSibling;
  oldCaption.replaceWith(status);
  try { note.value = localStorage.getItem(key) || ''; status.textContent = 'Notes are saved in this browser. Download a copy to keep or share.'; }
  catch { status.textContent = 'Download your note to keep it after leaving this page.'; }
  let savedMessage = false;
  note.oninput = () => {
    try {
      localStorage.setItem(key,note.value);
      if (!savedMessage) { status.textContent = 'Saved in this browser. You can also download a copy.'; savedMessage = true; }
    } catch { status.textContent = 'Browser storage is unavailable. Download your note to keep it.'; }
  };
}
