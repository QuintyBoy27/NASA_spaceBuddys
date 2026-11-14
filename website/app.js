const main = document.querySelector('main');
let filter = 'All';
let query = '';
let answers = {};
let visited = [];
try { visited = JSON.parse(localStorage.getItem('museum-visits') || '[]'); } catch {}
if (!Array.isArray(visited)) visited = [];
visited = [...new Set(visited.filter(id=>exhibits.some(e=>e.id===id)))];
const card = e => `<a class="card" href="#exhibit/${e.id}">${museumImage(e,{loading:'lazy'})}<div class="meta">${e.world} · ${e.mission} · ${e.year}</div><h3>${e.name} ↗</h3><p>${e.hook}</p></a>`;
const intro = (tag,title,description) => `<div class="eyebrow">${tag}</div><h2>${title}</h2><p>${description}</p>`;
function collection() {
 main.innerHTML = `<section>${intro('The collection','Every object has a second story.','Explore the machines left on two worlds. Follow their journey from working hardware to a record of exploration.')}<div class="filters"><input id="search" aria-label="Search artifacts" placeholder="Search a mission, object or place…"><button id="clear-filters" type="button">Clear filters</button><select id="world" aria-label="Filter by world"><option>All</option><option>Moon</option><option>Mars</option></select></div><p id="count" aria-live="polite"></p><div id="cards" class="grid"></div></section>`;
 document.querySelector('#search').value=query;
 document.querySelector('#world').value=filter;
 document.querySelector('#search').oninput=e=>{query=e.target.value; updateCards()};
 document.querySelector('#world').onchange=e=>{filter=e.target.value; updateCards()};
 document.querySelector('#clear-filters').onclick=()=>{query='';filter='All';document.querySelector('#search').value='';document.querySelector('#world').value='All';updateCards();document.querySelector('#search').focus()};
 updateCards();
}
function updateCards(){
 const normalizeSearch=value=>String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const result=exhibits.filter(e=>(filter==='All'||e.world===filter)&&normalizeSearch([e.name,e.world,e.mission,e.place,e.story,e.science,...(e.aliases||[]),...(e.instruments||[]).map(i=>i.name+' '+i.purpose),...e.facts.flat()].map(text=>window.MuseumI18n?.searchText(text)||text).join(' ')).includes(normalizeSearch(query.trim())));
 document.querySelector('#cards').innerHTML=result.map(card).join('')||'<p class="empty">No exhibits found. Try another word or choose All worlds.</p>';
 document.querySelector('#count').textContent=result.length+' of '+exhibits.length+' exhibits';
}
function exhibit(id){
 const e=exhibits.find(e=>e.id===id);
 if(!e){main.innerHTML='<section><h2>Exhibit unavailable</h2><a class="button" href="#collection">Return to collection</a></section>';return}
 if(!visited.includes(id)){visited.push(id);try{localStorage.setItem('museum-visits',JSON.stringify(visited))}catch{}}
 const next=exhibits[(exhibits.indexOf(e)+1)%exhibits.length];
 let caption=e.evidence;
 if(id==='rover'&&!e.imageMeta)caption='Orbital context image of the Apollo 15 landing region, with traverse routes. The rover itself is too small to identify in this overview.';
 main.innerHTML=`<section><a href="#collection">← All exhibits</a><div class="meta">${e.world} / ${e.mission}</div><h2>${e.name}</h2><div class="split"><div>${museumImage(e,{className:'evidence',loading:'eager'})}<p class="caption">${caption}<br>Image credit · ${e.credit}${e.imageMeta?` · ${e.imageMeta.type}<br><a href="${e.imageMeta.source}" target="_blank" rel="noopener">Image record ↗</a>`:''}</p><a class="button" href="${e.imageMeta?.original || 'images/'+(e.image||e.id)+'.jpg'}" target="_blank" rel="noopener">${e.imageMeta?.original?'NASA original image':'Open full image'} ↗</a></div><div><div class="eyebrow">${e.hook}</div><div class="facts"><div><small>${e.dateLabel}</small><time datetime="${e.date}">${e.date.length===4?e.date:new Date(e.date+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}</time></div><div><small>Site</small>${e.place}</div><div><small>Hardware status</small>${e.status}</div></div>${missionFacts(e)}<p class="caption">${missionReferences(e)}</p><h3>Built for exploration</h3><p>${e.story}</p><h3>What it discovered or enabled</h3><p>${e.science}</p><div class="source"><a href="${e.source}" target="_blank" rel="noopener">Read the NASA record ↗</a>${e.extra?`<p><a href="${e.extra}" target="_blank" rel="noopener">ALSEP termination report ↗</a></p>`:''}</div></div></div><div class="panel"><h3>Look closer</h3><p>${id==='ingenuity'?'The helicopter is small in this landscape. How does the distance of the camera change what you can confidently say about its condition?':'Find a detail in the photograph that supports the story. What would you need another image or mission record to confirm?'}</p><label for="note">Your observation</label><p><textarea id="note" rows="3" style="width:100%;padding:15px;font:inherit;background:#0b1010;color:#ecebe3" placeholder="Write an observation for your field notes…"></textarea></p><button id="download">Download this field note</button><p class="caption">Your text stays in this page until you download it or leave.</p></div><a class="button primary" href="#exhibit/${next.id}">Next exhibit · ${next.name} →</a></section>`;
 document.querySelector('#download').onclick=()=>download('field-note.txt',(window.MuseumI18n?.translate(e.name)||e.name)+'\n\n'+(window.MuseumI18n?.translate('Your observation')||'Observation')+'\n'+document.querySelector('#note').value+'\n\nNASA\n'+e.source);
}
function download(name,text){const u=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
const questions=[
 {q:"What makes Surveyor 3 unusual in this collection?",options:["It returned itself to Earth","Apollo 12 astronauts recovered selected parts","It flew over Mars"],correct:1,why:"Most of Surveyor 3 remained on the Moon, but astronauts brought selected components home for study.",id:"surveyor"},
 {q:"What protected Pathfinder during touchdown?",options:["A system of airbags","An ocean landing","A lunar launchpad"],correct:0,why:"Airbags cushioned its arrival after a parachute helped slow the descent.",id:"pathfinder"},
 {q:"Why did InSight not need to drive to study deep inside Mars?",options:["It could see through rocks","Seismic measurements revealed clues about the interior","It drilled to the core"],correct:1,why:"Vibrations traveling through the planet carry information about its internal structure.",id:"insight"},
 {q:"Which statement best describes the objects in this museum?",options:["They all failed","They stayed behind for different reasons","They are all still operating"],correct:1,why:"Some separated by design, some completed their work, and others were retired after damage.",id:"shield"},
 {q:"Why did Ingenuity matter for future exploration?",options:["It demonstrated powered flight on Mars","It brought samples to Earth","It carried astronauts"],correct:0,why:"Its 72 flights demonstrated aerial exploration in a thin atmosphere.",id:"ingenuity"},
 {q:'Which object became a launch platform for the astronauts’ departure?',options:['Eagle’s descent stage','Opportunity’s heat shield','Ingenuity'],correct:0,why:'Eagle’s upper stage lifted off from the lower stage, which stayed on the Moon.',id:'eagle'},
 {q:'Why were instruments left operating after Apollo 17 departed?',options:['To guide a parachute','To keep measuring the lunar environment','To refuel a rover'],correct:1,why:'The station continued collecting measurements after the crew returned to Earth.',id:'alsep'},
 {q:'What made Ingenuity’s photographs of the landing gear valuable?',options:['They showed an ocean','They proved the parachute could fly again','They let engineers inspect hardware after landing'],correct:2,why:'Aerial photographs documented the backshell and parachute after impact.',id:'backshell'}
];
function challenge(){
 main.innerHTML=`<section>${intro('Field challenge','Can you read the evidence?','Visit the exhibits, then connect the hardware to its purpose. Each answer includes an explanation.')}<p>You have opened ${visited.filter(id=>exhibits.some(e=>e.id===id)).length} of ${exhibits.length} exhibits.</p><progress max="${exhibits.length}" value="${visited.length}" aria-label="Exhibits opened"></progress>${questions.map((q,i)=>`<div class="panel"><h3>${q.q}</h3>${q.options.map((o,j)=>`<button class="choice" data-q="${i}" data-a="${j}" aria-pressed="${answers[i]===j}">${answers[i]===j?'● ':'○ '}${o}</button>`).join('')}${answers[i]!==undefined?`<p class="feedback" role="status">${answers[i]===q.correct?'Correct.':'Try again.'} ${q.why}</p><a href="#exhibit/${q.id}">Revisit the evidence →</a>`:''}</div>`).join('')}<p>${questions.filter((q,i)=>answers[i]===q.correct).length} of ${questions.length} answers correct</p><button id="reset">Try the challenge again</button></section>`;
 main.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const y=scrollY;answers[b.dataset.q]=Number(b.dataset.a);challenge();ensurePageHeading();document.querySelector('[data-q="'+b.dataset.q+'"][data-a="'+b.dataset.a+'"]')?.focus({preventScroll:true});scrollTo(0,y)});
 document.querySelector('#reset').onclick=()=>{answers={};challenge();ensurePageHeading();main.querySelector('h1')?.focus()};
}
function render(){
 stopTimeline();
 stopEditorial();
 document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
 const route=location.hash.slice(1)||'home';
 if(route.startsWith('exhibit/'))exhibit(route.slice(8));
 else if(route==='atlas')main.replaceChildren();
 else if(route==='collection')collection();
 else if(route==='challenge')challenge();
 else if(route==='timeline')renderTimeline();
 else if(route==='sources')main.innerHTML=`<section>${intro('Research desk','Follow the evidence.','Exhibit text is an educational paraphrase of NASA records. Photographs are historical observations. Image captions identify orbital context and enhanced color where applicable.')} ${exhibits.map(e=>`<div class="source"><h3>${e.name}</h3><p>${e.evidence}</p>${missionFacts(e)}<p>${missionReferences(e)}</p><a href="${e.source}" target="_blank" rel="noopener">${e.sourceName} ↗</a><p class="caption">Image credit · ${e.credit}</p>${e.extra?`<a href="${e.extra}" target="_blank" rel="noopener">Supporting mission report ↗</a>`:''}</div>`).join('')}<div class="source"><h3>Challenge brief</h3><p>The 2026 official challenge title was found in the Space Apps index. The full official page returned an error during preparation. The detailed objectives were cross-checked against the published local-event reproduction.</p><a href="https://www.spaceappschallenge.org/2026/challenges/abandoned-but-not-forgotten-storytelling-about-nasas-discarded-equipment-on-the-moon-and-mars/">Official challenge ↗</a><p><a href="https://hackathlone.com/challenges/nasas-discarded-equipment-storytelling">Local-event reproduction ↗</a></p></div></section>`;
 else if(route==='about')main.innerHTML=`<section>${intro('About this museum','Built for curious explorers.','After the Mission connects real hardware on the Moon and Mars with the exploration it enabled. It is an independent educational project prepared for NASA Space Apps 2026.')}<h3>Continue building with ChatGPT</h3><p>Keep the entire project folder. Ask ChatGPT to edit the museum and attach the project ZIP in a new chat. Exhibit wording lives in exhibits.js, appearance in style.css, and interactions in app.js. Save a copy before editing, then refresh the browser to see changes.</p><h3>How to open it</h3><p>Extract the ZIP, open the website folder, and double-click index.html. Images and activities work locally. Internet access is needed only for external NASA links. The museum’s images and fonts work locally.</p><h3>Reading the collection</h3><p>Hardware has several different histories here. Some parts were deliberately released, some were parked after use, and some completed long scientific missions. Each exhibit records that distinction. This is a curated collection of ${exhibits.length} objects and systems.</p></section>`;
 else if(route!=='home')main.innerHTML='<section><h2>That destination is outside the collection.</h2><p>Choose an exhibit or return to the museum entrance.</p><a class="button primary" href="#home">Return home →</a></section>';
 else main.innerHTML=`<section class="hero"><img src="images/moon.jpg" alt="Clementine mosaic of the Moon’s near side"><div class="hero-copy"><div class="eyebrow">A museum beyond Earth</div><h1>The mission ended.<br>The story stayed.</h1><p class="lead">On the Moon and Mars, our machines still hold the stories of how we got there. Come meet the things we left behind.</p><div class="actions"><a class="button primary" href="#collection">Enter the museum ↗</a><a class="button" href="#exhibit/eagle">Start with Apollo 11 →</a></div></div></section><div class="strip"><span>${String(exhibits.length).padStart(2,'0')} EXHIBITS</span><span>${String(new Set(exhibits.map(e=>e.world)).size).padStart(2,'0')} WORLDS</span><span>NASA ARCHIVES · REAL HARDWARE</span></div><section>${intro('Across two worlds','A journey worth remembering.','A launchpad. A set of wheels. A parachute on red sand. Every object helped open a new chapter in exploration.')}<div class="grid">${exhibits.slice(0,3).map(card).join('')}</div><div class="panel"><div class="eyebrow">Become a space detective</div><h3>What can an object tell us?</h3><p>Read the mission, inspect the photograph, then test the connections in the field challenge.</p><a class="button" href="#challenge">Take the challenge →</a></div></section>`;
 enhanceMuseum(); installDiscoveries(); installEditorial(); installAtlas(); installResearchDirectory(); installMissionStory();
 if(route!=='home')ensurePageHeading();
 main.tabIndex=-1;
 main.querySelectorAll('img').forEach(image=>{image.decoding='async';if(!image.closest('.cinema, .timeline-feature')&&!image.classList.contains('evidence'))image.loading='lazy';});
 document.querySelectorAll('nav a').forEach(link=>{if(link.hash==='#'+route || (route.startsWith('exhibit/') && link.hash==='#collection'))link.setAttribute('aria-current','page');else link.removeAttribute('aria-current')});
 window.updateMissionGuideContext?.();
 document.title='After the Mission — '+(route.startsWith('exhibit/')?(exhibits.find(e=>e.id===route.slice(8))?.name||'Exhibit'):route.charAt(0).toUpperCase()+route.slice(1));
}
addEventListener('hashchange',()=>{render();main.focus({preventScroll:true});scrollTo(0,0);applyMuseumAction()});render();






let pendingMuseumAction=null;
function applyMuseumAction() {
  if(!pendingMuseumAction)return;
  const action=pendingMuseumAction;pendingMuseumAction=null;
  if(action.tool==='collection') {
    if(['Moon','Mars','All'].includes(action.world))filter=action.world;
    query='';collection();ensurePageHeading();
  } else if(action.tool==='moon') {
    const globe=main.querySelector('.lunar-globe');globe?.scrollIntoView({behavior:motionPreference.matches?'instant':'smooth',block:'start'});if(action.site)globe?.querySelector(`[data-lunar-site="${action.site}"]`)?.click();globe?.querySelector('canvas')?.focus({preventScroll:true});
  } else if(action.tool==='terrain') {
    const lesson=main.querySelector('.terrain-lesson');if(lesson){lesson.open=true;lesson.scrollIntoView({behavior:motionPreference.matches?'instant':'smooth',block:'start'});lesson.querySelector('summary')?.focus({preventScroll:true});}
  } else if(action.tool==='atlas') {
    main.querySelector(`[data-world="${action.world==='Mars'?'Mars':'Moon'}"]`)?.click();
  } else {
    const tab=main.querySelector(action.tool==='compare'?'#tab-compare':action.tool==='archive'?'#tab-archive':'#tab-lab');
    tab?.click();
    if(action.tool==='science'&&action.experiment){const index=scienceExperiments.findIndex(story=>story.id===action.experiment);if(index>=0)main.querySelector(`[data-experiment="${index}"]`)?.click();}
    if(action.tool==='compare'){for(const [selector,id] of [['#compare-first',action.first],['#compare-second',action.second]]){const select=main.querySelector(selector);if(select&&exhibits.some(record=>record.id===id))select.value=id;}main.querySelector('#compare-first')?.onchange();}
    const content=main.querySelector('#discovery-content');
    content?.scrollIntoView({behavior:motionPreference.matches?'instant':'smooth',block:'start'});
    tab?.focus({preventScroll:true});
  }
}
addEventListener('museum-action',event=>{
  const action=event.detail;
  if(!action||!['collection','atlas','compare','science','archive','terrain','moon'].includes(action.tool))return;
  pendingMuseumAction={tool:action.tool,world:action.world,site:typeof action.site==='string'&&moonSites.some(site=>site.id===action.site)?action.site:null,experiment:scienceExperiments.some(story=>story.id===action.experiment)?action.experiment:null,first:action.first,second:action.second};
  const route=action.tool==='collection'?'#collection':['atlas','terrain'].includes(action.tool)?'#atlas':'#home';
  if(location.hash===route || (!location.hash && route==='#home'))applyMuseumAction();
  else location.hash=route;
});

// One delegated handler survives route changes without accumulating listeners.
addEventListener('click',event=>{const button=event.target.closest?.('[data-museum-tool]');if(!button)return;dispatchEvent(new CustomEvent('museum-action',{detail:{tool:button.dataset.museumTool,site:button.dataset.museumSite,experiment:button.dataset.museumExperiment,first:button.dataset.museumFirst,second:button.dataset.museumSecond}}));});
