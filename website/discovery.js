// Discovery tools use existing, sourced exhibit records.
let discoveryObserver;
function installDiscoveries() {
  discoveryObserver?.disconnect();
  installNotebook();
  const hero = main.querySelector('.hero');
  if (!hero) return;
  const section = document.createElement('section');
  section.className = 'discovery';
  section.innerHTML = `<div class="eyebrow">The discovery room</div><h2>Follow the hardware.<br>Find the connection.</h2><p>Travel through the collection, compare two objects, or let the museum choose your next discovery.</p><div class="discovery-tabs" role="tablist" aria-label="Discovery tools"><button role="tab" id="tab-time" aria-controls="discovery-content" aria-selected="true" tabindex="0">Time explorer</button><button role="tab" id="tab-compare" aria-controls="discovery-content" aria-selected="false" tabindex="-1">Compare artifacts</button><button role="tab" id="tab-lab" aria-controls="discovery-content" aria-selected="false" tabindex="-1">Science in motion</button><button role="tab" id="tab-archive" aria-controls="discovery-content" aria-selected="false" tabindex="-1">Data afterlife</button></div><div id="discovery-content" role="tabpanel" aria-labelledby="tab-time"></div><div class="discovery-bottom"><button id="surprise">Choose my next discovery ↗</button><span>Every destination opens a NASA-backed exhibit.</span></div>`;
  hero.after(section);
  const tabs = [...section.querySelectorAll('[role=tab]')];
  function selectTab(tab) {
    tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
    const content = section.querySelector('#discovery-content');
    content.setAttribute('aria-labelledby', tab.id);
    if (tab.id === 'tab-time') installTimeExplorer(content);
    else if(tab.id === 'tab-compare') installComparison(content);
    else if(tab.id==='tab-archive')installDataAfterlife(content);
    else installScienceLab(content);
  }
  tabs.forEach((tab,index) => {
    tab.onclick = () => selectTab(tab);
    tab.onkeydown = event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs.at(-1) : tabs[(index+(event.key==='ArrowRight'?1:tabs.length-1))%tabs.length];
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
    story.innerHTML = `<div class="time-photo">${museumImage(e)}<span>${e.year}</span></div><div class="time-copy"><div class="eyebrow">${e.world} · ${e.mission}</div><h3>${e.name}</h3><p>${e.hook}</p><p class="caption">${e.dateLabel} · ${e.date}</p><p>${e.story}</p><a class="button primary" href="#exhibit/${e.id}">Visit this moment →</a></div>`;
    story.getAnimations?.().forEach(animation=>animation.cancel());
    if (!motionPreference.matches && story.animate) story.animate([{opacity:.5},{opacity:1}], {duration:220});
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
    container.querySelector('#comparison').innerHTML = selected.map(e => `<article>${museumImage(e)}<div class="meta">${e.world} · ${e.year}</div><h3>${e.name}</h3>${missionFacts(e)}<dl><dt>Where it stayed</dt><dd>${e.place}</dd><dt>What happened</dt><dd>${e.status}</dd><dt>The science it enabled</dt><dd>${e.science}</dd></dl><p class="caption">${missionReferences(e)}</p><a class="button" href="#exhibit/${e.id}">Inspect evidence →</a></article>`).join('');
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

// Interactive explanatory diagrams. These are illustrations, not telemetry.
function installScienceLab(container) {
  const experiments = [
    {title:'Bounce into a new era',tag:'Pathfinder / landing engineering',id:'pathfinder',kind:'bounce',steps:['Protected descent','Cushioned impact','Ready to explore'],text:['A parachute slowed the spacecraft before airbag-protected touchdown.','Inflated airbags cushioned repeated bounces. This diagram simplifies the real trajectory.','Once settled, the lander opened and Sojourner could explore nearby rocks.']},
    {title:'Listen below the surface',tag:'InSight / planetary interiors',id:'insight',kind:'seismic',steps:['A disturbance','Waves travel','Read the interior'],text:['A quake or impact sends vibrations through the planet.','Wave paths and speeds depend on the materials they travel through. The rings here are schematic.','Scientists interpret seismic measurements to investigate internal structure. This is not a recorded marsquake.']},
    {title:'A delivery system lets go',tag:'Mars 2020 / landing sequence',id:'backshell',kind:'separation',steps:['Slow the descent','Separate the backshell','Finish the landing'],text:['The parachute and backshell protected the spacecraft during part of its descent.','The rover and rocket-powered descent stage separated from the parachute and backshell.','The powered descent system completed delivery. The backshell and parachute remained on Mars. This diagram is a simplified sequence, not an engineering simulation.']},
    {title:'Five planned. Seventy-two flown.',tag:'Ingenuity / technology to exploration',id:'ingenuity',kind:'flight',steps:['Demonstrate','Keep exploring','A lasting legacy'],text:['Ingenuity was planned for no more than five test flights.','It continued flying and helped scout terrain for the rover team.','It completed 72 flights before rotor damage ended flying operations in January 2024.']}
  ];
  container.innerHTML=`<div class="lab-selector" role="group" aria-label="Choose a science story">${experiments.map((e,i)=>`<button data-experiment="${i}" aria-pressed="${i===0}">${e.id==='pathfinder'?'Airbag landing':e.id==='insight'?'Inside Mars':e.id==='backshell'?'Letting go':'Beyond the plan'}</button>`).join('')}</div><div class="science-lab"><div class="lab-visual" aria-hidden="true"><div class="lab-orbit"></div><div class="lab-wave wave-one"></div><div class="lab-wave wave-two"></div><div class="lab-machine"><span></span></div><div class="lab-shell"></div><div class="lab-ground"></div><div class="lab-scan"></div></div><div class="lab-copy"><div class="eyebrow" id="lab-tag"></div><h3 id="lab-title"></h3><div class="lab-steps" role="group" aria-label="Story stage"></div><label class="lab-scrub">Explore the sequence<input id="lab-scrubber" type="range" min="0" max="2" step="1" value="0"><output id="lab-step-label"></output></label><p id="lab-explanation" aria-live="polite"></p><div id="lab-metrics"></div><p class="caption" id="lab-source"></p><a class="button" id="lab-link">Open the mission exhibit ↗</a><p class="caption">Interactive illustration · Motion, scale and timing simplified · No live NASA telemetry</p></div></div>`;
  let selected=0;
  function stage(index) {
    const experiment=experiments[selected];
    const visual=container.querySelector('.lab-visual');
    visual.dataset.kind=experiment.kind;visual.dataset.stage=String(index);
    container.querySelector('#lab-explanation').textContent=experiment.text[index];
    const scrubber=container.querySelector('#lab-scrubber');scrubber.value=String(index);scrubber.setAttribute('aria-valuetext',experiment.steps[index]);
    container.querySelector('#lab-step-label').textContent=(index+1)+' / '+experiment.steps[index];
    container.querySelectorAll('[data-lab-stage]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.labStage)===index)));
  }
  function choose(index) {
    selected=index;const e=experiments[index];
    container.querySelector('#lab-tag').textContent=e.tag;
    container.querySelector('#lab-title').textContent=e.title;
    container.querySelector('#lab-link').href='#exhibit/'+e.id;
    container.querySelector('.lab-steps').innerHTML=e.steps.map((name,i)=>`<button data-lab-stage="${i}" aria-pressed="${i===0}">${i+1} / ${name}</button>`).join('');
    container.querySelectorAll('[data-lab-stage]').forEach(button=>button.onclick=()=>stage(Number(button.dataset.labStage)));
    container.querySelectorAll('[data-experiment]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.experiment)===index)));
    const record=exhibits.find(record=>record.id===e.id);
    container.querySelector('#lab-source').innerHTML=record?missionReferences(record):'';
    container.querySelector('#lab-metrics').innerHTML=e.kind==='flight'?'<div class="flight-bars"><p>Same unit: number of flights</p><div><span>Planned: 5</span><i style="--bar:6.944%"></i></div><div><span>Completed: 72</span><i style="--bar:100%"></i></div><p class="caption">Bars share a linear scale from 0 to 72 flights. The completed count was 14.4 times the original planned maximum.</p></div>':'';
    stage(0);
  }
  container.querySelectorAll('[data-experiment]').forEach(button=>button.onclick=()=>choose(Number(button.dataset.experiment)));
  container.querySelector('#lab-scrubber').oninput=event=>stage(Number(event.target.value));
  choose(0);
}

function installDataAfterlife(container) {
  container.innerHTML=`<div class="eyebrow">Beyond the hardware · CSA archive methods</div><h3>The machine stops. The record can keep speaking.</h3><p>Alouette/ISIS ionograms record radio echoes from Earth’s ionosphere. Recovering their meaning requires extracting both measurements and metadata. This small reception-facility table is actual repository metadata—not ionogram readings.</p><div class="recovery-steps" role="group" aria-label="Explore archive recovery"><button data-recovery="0" aria-pressed="true">1 / Preserve</button><button data-recovery="1" aria-pressed="false">2 / Recover</button><button data-recovery="2" aria-pressed="false">3 / Check</button></div><p id="recovery-explanation" class="panel" aria-live="polite"></p><label for="facility-search">Find a reception-facility label</label><div class="filters"><input id="facility-search" type="search" placeholder="Try Ottawa, Australia or Alaska"><button id="facility-clear">Clear</button></div><p id="facility-count" role="status"></p><div class="facility-table"><table><caption>Source labels preserved verbatim, including spelling and historical place names. Rows compare labels only; they do not establish station identity, coverage or present-day borders.</caption><thead><tr><th scope="col">Alouette 1 label</th><th scope="col">ISIS label</th></tr></thead><tbody></tbody></table></div><p class="caption">Source: CSA Alouette/ISIS repository · ${csaReceptionFacilities.length} rows · Snapshot 14 November 2026 · <a href="https://github.com/asc-csa/Alouette_ISIS_extract/blob/${csaResources[0].revision}/documentation/reception_facilities.csv" target="_blank" rel="noopener">Pinned CSV source ↗</a> · <a href="data/csa-reception-facilities.csv" download>Download original CSV</a> · <a href="licenses/CSA-Alouette-LICENSE.txt" target="_blank" rel="noopener">Copyright & permission notice</a></p><p>Like lunar experiment records, these archived observations can remain useful after the spacecraft’s working life. Keeping a source, a unit, a date and a processing history is part of preserving the science.</p><div class="actions"><a class="button" href="#exhibit/alsep">Return to lunar experiments ↗</a><a class="button" href="#atlas">Explore how terrain becomes a point cloud ↗</a></div>`;
  const explanations=['Start with the original scan and its provenance. A preserved picture is evidence, but its scientific meaning also depends on the recording system.','Extract the trace and surrounding metadata separately. The CSA code includes grid calibration, metadata translation and error-detection steps.','Inspect inconsistent labels and processing errors before drawing conclusions. A spelling difference in this table is not proof that two facilities are different.'];
  const show=index=>{container.querySelector('#recovery-explanation').textContent=explanations[index];container.querySelectorAll('[data-recovery]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.recovery)===index)));};
  container.querySelectorAll('[data-recovery]').forEach(button=>button.onclick=()=>show(Number(button.dataset.recovery)));
  const input=container.querySelector('#facility-search');
  const search=()=>{const q=input.value.trim().toLowerCase();const rows=csaReceptionFacilities.filter(row=>(row.alouette+' '+row.isis).toLowerCase().includes(q));container.querySelector('tbody').innerHTML=rows.map(row=>`<tr><td>${escapeMuseumText(row.alouette)}</td><td>${escapeMuseumText(row.isis)}</td></tr>`).join('')||'<tr><td colspan="2">No matching labels. Try another spelling or clear the search.</td></tr>';container.querySelector('#facility-count').textContent=rows.length+' of '+csaReceptionFacilities.length+' metadata rows';};
  input.oninput=search;container.querySelector('#facility-clear').onclick=()=>{input.value='';search();input.focus();};show(0);search();
}
