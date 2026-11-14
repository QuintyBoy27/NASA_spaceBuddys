// Curated interpretive text; mission facts are linked beside each exhibit.
const artifactContext = {
 eagle: { engineering: 'Two stages divided the work: the descent engine slowed the landing, while a separate ascent stage carried the crew back to lunar orbit.', ending: 'The lower stage was intentionally left as a launch platform. Bringing it back would have required extra propellant and hardware.', legacy: 'A surviving record of the first crewed lunar landing, connecting spacecraft design with the samples and observations returned to Earth.' },
 rover: { engineering: 'Four independently powered wheels, wire-mesh tires and a folding chassis made an electric vehicle practical on the Moon. Two non-rechargeable batteries supplied power.', ending: 'The rover was designed for surface travel, with no return vehicle. After the final traverse, it remained at its parking site.', legacy: 'Apollo 15 astronauts drove 27.8 km. Mobility extended their geological fieldwork beyond what walking alone allowed.', source: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html' },
 alsep: { engineering: 'A central station relayed measurements from instruments deployed around the landing site. Heat-flow probes and seismic sensors investigated the Moon below the surface.', ending: 'Unlike discarded landing hardware, these instruments were left to keep working. The Apollo experiment network was shut down in 1977.', legacy: 'The measurements preserved a long scientific record after the astronauts departed, helping researchers study lunar heat and structure.' },
 shield: { engineering: 'A protective heat shield absorbed the effects of atmospheric entry. Once its job was complete, it separated so the next landing stages could operate.', ending: 'Separation was a planned part of descent. The shield fell to the surface, where Opportunity later photographed the remains.', legacy: 'The shield enabled the rover to reach rocks that recorded ancient watery conditions. Its remains also offered evidence of how entry hardware survived.' },
 backshell: { engineering: 'The backshell connected the spacecraft to a supersonic parachute. A rocket-powered descent stage completed the landing after separation.', ending: 'The parachute and backshell were released before touchdown. They were delivery hardware, rather than equipment intended to travel with the rover.', legacy: 'Ingenuity’s aerial images let engineers inspect the landing debris from a new angle and compare its condition with expectations.' },
 ingenuity: { engineering: 'Counter-rotating blades generated lift in the thin Martian atmosphere. Onboard navigation allowed flight without a pilot controlling every movement from Earth.', ending: 'Rotor damage after the landing of flight 72 ended flying operations in January 2024. This was a retired explorer, rather than deliberately discarded landing hardware.', legacy: 'A demonstration planned for five flights completed 72. It established powered, controlled flight on another planet and demonstrated aerial scouting.', source: 'https://science.nasa.gov/resource/the-legacy-of-ingenuity-the-frontier-of-extraterrestrial-flight/' }
};

Object.assign(artifactContext, {"surveyor":{"engineering":"A television camera observed the ground as a remotely commanded sampler dug and tested the soil.","ending":"Contact ended in May 1967. Most of the lander stayed on the Moon, while Apollo 12 recovered selected components in 1969.","legacy":"A bridge from robotic reconnaissance to human exploration, and a rare chance to examine hardware after exposure on another world."},"viking":{"engineering":"A robotic arm delivered soil to onboard experiments. Radioisotope generators supplied electrical power independently of sunlight.","ending":"A faulty command interrupted communications in November 1982. Attempts to regain contact did not succeed.","legacy":"Viking established a long record of surface observations and showed why searching for life requires multiple lines of evidence."},"pathfinder":{"engineering":"Airbags surrounded the lander during touchdown. Sojourner then drove away to investigate nearby rocks.","ending":"The final data transmission arrived in September 1997. The lander and rover remain on Mars.","legacy":"A technology demonstration became a scientific field trip and helped establish mobile exploration as a practical tool."},"insight":{"engineering":"A robotic arm deployed a seismometer and heat-flow probe. The mission studied the planet’s interior through several complementary investigations; not every instrument met its original goal.","ending":"Dust accumulation reduced solar power and the mission ended in 2022. The lander remains at its landing site.","legacy":"Measurements from a single stationary explorer opened a new way to investigate the deep interior of Mars."}});

function installAtlas() {
  const route = location.hash.slice(1) || 'home';
  if (route.startsWith('exhibit/')) {
    const record = exhibits.find(e => e.id === route.slice(8));
    if (!record) return;
    const context = artifactContext[record.id];
    const section = document.createElement('div');
    section.className = 'interpretation';
    section.innerHTML = `<div class="eyebrow">From engineering to legacy</div><h3>Why this object matters</h3>${record.finalOutcome?`<p class="caption"><a href="${record.finalOutcome.source}" target="_blank" rel="noopener">Final-outcome evidence ↗</a></p>`:''}${[['How it worked',context.engineering],['Its final chapter',record.finalOutcome?.text||context.ending],['What it left us',context.legacy]].map(([title,text])=>`<details open><summary>${title}</summary><p>${text}</p></details>`).join('')}<p class="caption">${missionReferences(record)}</p>${context.source?`<p class="caption"><a href="${context.source}" target="_blank" rel="noopener">Supporting NASA mission record ↗</a></p>`:''}`;
    if(record.id==='alsep') section.insertAdjacentHTML('beforeend','<h3>A connection across worlds</h3><p>Lunar seismic experiments and Mars’s InSight mission share a question: what can vibrations reveal about a planet’s interior? Explore how a later mission carried that kind of investigation to Mars.</p><a class="button" href="https://science.nasa.gov/mission/insight/" target="_blank" rel="noopener">Meet InSight at NASA ↗</a>');
    main.querySelector('.split').after(section);
    return;
  }
  if (!['home','atlas','sources','about'].includes(route)) return;
  if (route === 'sources') {
    const desk = document.createElement('div'); desk.className='panel';
    desk.innerHTML='<h3>NASA data in this museum</h3><p>The NSSDCA Lunar Roving Vehicle record supplies the engineering details and Apollo 15 driving distance used here. Exhibit photographs and mission records provide the evidence for each story. The surface explorer groups artifacts by named landing region; it is a schematic, not a georeferenced map.</p><a class="button" href="https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html" target="_blank" rel="noopener">Open the NSSDCA rover record ↗</a>';
    main.querySelector('section > p').after(desk); return;
  }
  if (route === 'about') {
    main.querySelector('section').insertAdjacentHTML('beforeend','<h3>Creative tools & credits</h3><p>Code and educational text were developed with AI assistance and reviewed against linked NASA resources. The surface explorer and impact sequence are simplified illustrations made with code. Photographs in this museum are NASA archival imagery; each exhibit carries its credit. This project is independent and is not endorsed by NASA.</p>');return;
  }
  const section = document.createElement('section');
  section.className='surface-explorer';
  section.innerHTML=`<div class="atlas-heading"><div><div class="eyebrow">The surface archive / 01</div><h2>Far away.<br>Still part of our story.</h2><p>Choose a world, then select an artifact. Discover why a machine’s final resting place can be the beginning of another story.</p></div><div class="world-switch" role="group" aria-label="Choose a world"><button data-world="Moon" aria-pressed="true">01 / Moon</button><button data-world="Mars" aria-pressed="false">02 / Mars</button></div></div><div class="atlas-layout"><div class="planet-stage" data-planet="Moon"><div class="planet-grid" aria-hidden="true"></div><div class="planet-label" aria-hidden="true">SURFACE ARCHIVE</div><div class="artifact-pins" role="group" aria-label="Artifacts on the selected world"></div><p class="map-caption">Illustrated navigation · Sites arranged for readability, not geographic position</p></div><article class="atlas-detail" aria-live="polite"></article></div><div class="atlas-guide"><span>01 Choose a world</span><span>02 Select an artifact</span><span>03 Read its evidence</span></div><div class="panel"><h3>“Left behind” doesn’t always mean the same thing.</h3><p>A heat shield separates by design. A rover parks after its work is done. A scientific station can keep measuring long after people leave. A damaged aircraft can end its travels unexpectedly. These objects tell different stories, and their status matters.</p><a class="button" href="#challenge">Test your space detective skills →</a></div>`;
  if (route==='atlas') { main.replaceChildren(section); document.title='Surface explorer — After the Mission'; }
  else main.querySelector('.cinema').after(section);
  function select(record) {
    section.querySelectorAll('[data-pin]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.pin===record.id)));
    section.querySelector('.atlas-detail').innerHTML=`${museumImage(record)}<div class="atlas-detail-copy"><div class="eyebrow">${record.world} / ${record.year}</div><h3>${record.name}</h3><p>${record.hook}</p><dl><dt>Site</dt><dd>${record.place}</dd><dt>Hardware status</dt><dd>${record.status}</dd><dt>${record.dateLabel}</dt><dd>${record.date}</dd></dl><a class="button primary" href="#exhibit/${record.id}">Discover the full story ↗</a><p class="caption">Image · ${record.credit}</p></div>`;
  }
  function world(name) {
    const records=exhibits.filter(e=>e.world===name);
    section.querySelector('.planet-stage').dataset.planet=name;
    section.querySelectorAll('[data-world]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.world===name)));
    const pins=section.querySelector('.artifact-pins');
    pins.innerHTML=records.map((record,i)=>`<button data-pin="${record.id}" style="--pin:${i}" aria-pressed="${i===0}"><span aria-hidden="true">0${i+1}</span>${record.name}<small>${record.place}</small></button>`).join('');
    pins.querySelectorAll('button').forEach(button=>button.onclick=()=>select(records.find(record=>record.id===button.dataset.pin)));
    pins.onkeydown=event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;const buttons=[...pins.querySelectorAll('button')];const index=buttons.indexOf(document.activeElement);if(index<0)return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowDown'?1:buttons.length-1))%buttons.length;buttons[next].focus();buttons[next].click();};
    select(records[0]);
  }
  section.querySelectorAll('[data-world]').forEach(button=>button.onclick=()=>world(button.dataset.world));
  world('Moon');
}

function installResearchDirectory() {
  if (location.hash !== '#sources') return;
  const directory = document.createElement('div');
  directory.className = 'resource-directory';
  directory.innerHTML = '<h2>Continue your research</h2><p>Seventeen supplied resources with access limitations recorded. These are curated mission summaries and research pathways, rather than live data feeds.</p>' + ['Moon & archives','Mars missions','Beyond Moon & Mars','Research tools'].map(group => `<details open><summary>${group}</summary>${researchResources.filter(resource=>resource.group===group).map(resource=>`<div class="source"><h3><a href="${resource.url}" target="_blank" rel="noopener">${resource.title} ↗</a></h3><p>${resource.description}</p><span class="caption">${resource.status} · Checked 14 November 2026</span></div>`).join('')}</details>`).join('');
  main.querySelector('section').append(directory);
}
