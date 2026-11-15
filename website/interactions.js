// Progressive museum interactions. All motion respects the visitor's preference.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let tourActive = false;
let revealObserver;

function enhanceMuseum() {
  installMoonExplorer();
  if(!location.hash.startsWith('#exhibit/'))tourActive=false;
  revealObserver?.disconnect();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (!motionPreference.matches && typeof main.animate==='function' && 'IntersectionObserver' in window) {
    main.animate([{opacity: 0, transform: 'translateY(10px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 400, easing: 'ease-out'});
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate([{opacity: 0, transform: 'translateY(20px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 550, easing: 'ease-out'});
        revealObserver.unobserve(entry.target);
      });
    }, {threshold: .12});
    main.querySelectorAll('.card, .panel, .timeline a').forEach(element => revealObserver.observe(element));
  }
  const heroActions = main.querySelector('.hero .actions');
  if (heroActions) {
    const start = document.createElement('button');
    start.textContent = 'Take a guided tour →';
    start.onclick = () => { tourActive = true; location.hash = 'exhibit/' + exhibits[0].id; };
    heroActions.append(start);
  }
  const photo = main.querySelector('.evidence');
  if (photo) {
    const inspect = document.createElement('button');
    inspect.className = 'inspect-button';
    inspect.textContent = '⊕ Inspect photograph';
    inspect.onclick = () => openImageViewer(photo);
    photo.after(inspect);
    const exhibitIndex = exhibits.findIndex(e => location.hash === '#exhibit/' + e.id);
    if (tourActive && exhibitIndex >= 0) showTour(exhibitIndex);
  }
}

function installMoonExplorer() {
  stopMoonGlobe();
  const hero=main.querySelector('.hero');
  if(hero)mountMoonGlobe(hero);
}

function openMoonStory(topic) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog moon-story';
  dialog.setAttribute('aria-labelledby', 'moon-story-title');
  const impact = topic === 'impact';
  dialog.innerHTML = `<div class="viewer-header"><span class="eyebrow">${impact ? 'Lunar geology · Far side' : 'Human exploration · Near side'}</span><button id="moon-close">Close ×</button></div><h2 id="moon-story-title">${impact ? 'A scar larger than a country.' : 'Tranquility Base.'}</h2>${impact ? `<p>The South Pole–Aitken basin is the Moon’s largest impact feature. NASA describes it as roughly 2,600 kilometers across and more than 8 kilometers deep. It lies mainly on the far side, beyond the view in our landing-page mosaic.</p><div class="impact-scene" aria-hidden="true"><div class="impactor"></div><div class="impact-ground"></div><div class="impact-ring"></div></div><p class="caption">Illustration of impact formation · scale and timing are simplified</p><div class="impact-steps"><button data-step="0" aria-pressed="true">1 · Collision</button><button data-step="1" aria-pressed="false">2 · Excavation</button><button data-step="2" aria-pressed="false">3 · A lasting basin</button></div><p id="impact-explanation" aria-live="polite">A huge incoming body struck the Moon, transferring energy into the surface.</p><a class="button" href="https://science.nasa.gov/moon/lunar-craters/what-is-the-south-pole-aitken-basin/" target="_blank" rel="noopener">Explore NASA’s basin story ↗</a><p class="caption"><a href="https://science.nasa.gov/image-detail/20100409/" target="_blank" rel="noopener">NASA topographic map and dimensions ↗</a></p>` : `<img class="base-photo" src="images/eagle.jpg" alt="NASA orbital image of the Apollo 11 landing site"><p>Tranquility Base is the historic Apollo 11 landing site in the Sea of Tranquility. Armstrong and Aldrin visited in 1969. Eagle’s lower stage remained on the surface when the astronauts lifted off.</p><p>Today, orbital photographs preserve a view of the descent stage and the paths the astronauts took. Explore the exhibit to see what this hardware made possible.</p><p class="caption">Historic landing site · Image credit NASA/GSFC/Arizona State University</p><a class="button primary" id="visit-eagle" href="#exhibit/eagle">Explore Eagle’s story →</a>`}`;
  dialog.querySelector('#moon-close').onclick = () => dialog.close();
  dialog.querySelector('#visit-eagle')?.addEventListener('click', () => dialog.close());
  const explanations = [
    'A huge incoming body struck the Moon, transferring energy into the surface.',
    'The impact excavated deep material and melted rock. Ejected debris spread beyond the developing basin.',
    'The surface settled into a vast depression. Scientists study its exposed materials to investigate the Moon’s interior and early history.'
  ];
  dialog.querySelectorAll('[data-step]').forEach(button => {
    button.onclick = () => {
      dialog.querySelectorAll('[data-step]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      dialog.querySelector('#impact-explanation').textContent = explanations[Number(button.dataset.step)];
      dialog.querySelector('.impact-scene').dataset.stage = button.dataset.step;
    };
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialog.remove(), {once: true});
  prepareMuseumDialog(dialog);
  document.body.append(dialog);
  dialog.showModal();
}

function showTour(index) {
  const bar = document.createElement('aside');
  bar.className = 'tour-bar';
  bar.setAttribute('aria-label', 'Guided tour');
  bar.innerHTML = `<div><span class="eyebrow">Guided tour · ${index + 1} of ${exhibits.length}</span><p>${exhibits[index].hook}</p></div><div class="tour-controls"><button id="tour-back" ${index === 0 ? 'disabled' : ''}>← Previous</button><button id="tour-next" class="primary">${index === exhibits.length - 1 ? 'Finish with the challenge' : 'Next exhibit →'}</button><button id="tour-exit">Exit tour</button></div>`;
  main.querySelector('section').prepend(bar);
  bar.querySelector('#tour-back').onclick = () => { location.hash = 'exhibit/' + exhibits[index - 1].id; };
  bar.querySelector('#tour-next').onclick = () => {
    if (index === exhibits.length - 1) { tourActive = false; location.hash = 'challenge'; }
    else location.hash = 'exhibit/' + exhibits[index + 1].id;
  };
  bar.querySelector('#tour-exit').onclick = () => { tourActive = false; bar.remove(); };
}

function openImageViewer(photo) {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-labelledby', 'viewer-title');
  dialog.innerHTML = `<div class="viewer-header"><h3 id="viewer-title">Inspect the evidence</h3><button id="close-viewer" aria-label="Close image viewer">Close ×</button></div><div class="viewer-stage"><img alt=""></div><div class="viewer-tools"><label for="image-zoom">Zoom</label><input id="image-zoom" type="range" min="100" max="300" step="10" value="100"><output id="zoom-value" for="image-zoom">100%</output><button id="reset-viewer">Reset view</button></div><p class="caption"></p>`;
  const image = dialog.querySelector('img');
  image.src = photo.src;
  image.alt = photo.alt;
  // Retain the caption's line boundaries when moving it into the viewer.
  // textContent alone joins words on opposite sides of a <br> together.
  const caption=photo.parentElement.querySelector('.caption').cloneNode(true);
  caption.querySelectorAll('br').forEach(line=>line.replaceWith(document.createTextNode('\n')));
  dialog.querySelector('.caption').textContent = caption.textContent;
  const stage = dialog.querySelector('.viewer-stage');
  const zoom = dialog.querySelector('input');
  zoom.oninput = () => {
    image.style.width = zoom.value + '%';
    image.style.maxHeight = zoom.value === '100' ? '60vh' : 'none';
    dialog.querySelector('output').value = zoom.value + '%';
  };
  dialog.querySelector('#reset-viewer').onclick = () => { zoom.value = '100'; zoom.oninput(); stage.scrollTo(0, 0); };
  dialog.querySelector('#close-viewer').onclick = () => dialog.close();
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialog.remove(), {once: true});
  prepareMuseumDialog(dialog);
  document.body.append(dialog);
  dialog.showModal();
}

 document.addEventListener("visibilitychange",()=>document.body.classList.toggle("page-hidden",document.hidden));

// Shared rendering keeps image metadata and explanatory records consistent.
function escapeMuseumText(value) {
  return String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function museumImage(record, options={}) {
  const dimensions={eagle:[1000,562],rover:[952,952],alsep:[1280,960],shield:[1280,727],backshell:[1280,1193],ingenuity:[1200,567],moon:[1280,1280],mars:[1280,1280]};
  const meta=record.imageMeta||{};
  const image=record.image||record.id;
  const [width,height]=dimensions[image]||[1280,960];
  const alt=meta.alt||record.evidence||record.name;
  const srcset=meta.small?` srcset="${escapeMuseumText(meta.small)} 640w, images/${escapeMuseumText(image)}.jpg ${meta.width||width}w" sizes="(max-width:750px) 90vw, 45vw"`:'';
  return `<img src="images/${escapeMuseumText(image)}.jpg" alt="${escapeMuseumText(alt)}" width="${meta.width||width}" height="${meta.height||height}" class="${escapeMuseumText(options.className||'')}" loading="${options.loading||'lazy'}" decoding="async"${options.priority?' fetchpriority="high"':''}${srcset}>`;
}
function ensurePageHeading() {
  if(main.querySelector('h1'))return;
  const heading=main.querySelector('h2');
  if(!heading)return;
  const title=document.createElement('h1');title.className='page-title';title.tabIndex=-1;
  title.innerHTML=heading.innerHTML;heading.replaceWith(title);
}
function installMissionStory() {
  const id=location.hash.startsWith('#exhibit/')?location.hash.slice(9):null;
  const record=exhibits.find(e=>e.id===id);
  if(!record)return;
  const part=document.createElement('div');part.className='mission-story';
  const sourceLink=(url,label='NASA evidence ↗')=>`<a href="${escapeMuseumText(url)}" target="_blank" rel="noopener">${label}</a>`;
  part.innerHTML=`${record.discovery?`<div class="discovery-finding"><div class="eyebrow">A discovery to remember</div><p>${escapeMuseumText(record.discovery.text)}</p>${sourceLink(record.discovery.source)}</div>`:''}${record.events?.length?`<div class="eyebrow">From first launch to final chapter</div><h3>A mission in moments</h3><ol class="mission-events">${record.events.map(event=>`<li><time datetime="${event.date}">${escapeMuseumText(event.date)}</time><div><h4>${escapeMuseumText(event.label)}</h4><p>${escapeMuseumText(event.detail)}</p>${sourceLink(event.source)}</div></li>`).join('')}</ol>`:''}${record.instruments?.length?`<details class="instrument-notes"><summary>Inside the engineering · instruments & systems</summary><dl>${record.instruments.map(instrument=>`<dt>${escapeMuseumText(instrument.name)}</dt><dd>${escapeMuseumText(instrument.purpose)} ${sourceLink(instrument.source)}</dd>`).join('')}</dl></details>`:''}${record.glossary?.length?`<details class="instrument-notes"><summary>Space words, explained</summary><dl>${record.glossary.map(term=>`<dt>${escapeMuseumText(term.term)}</dt><dd>${escapeMuseumText(term.definition)} ${sourceLink(term.source)}</dd>`).join('')}</dl></details>`:''}${record.related?.length?`<div class="related-missions"><div class="eyebrow">Follow the connection</div><h3>Another object, a shared question.</h3><div class="actions">${record.related.map(id=>exhibits.find(e=>e.id===id)).filter(Boolean).map(e=>`<a class="button" href="#exhibit/${e.id}">${e.name} ↗</a>`).join('')}</div></div>`:''}`;
  const nextSteps=document.createElement('div');nextSteps.className='panel next-discovery';
  const lunar=typeof moonSites!=='undefined'?moonSites.find(site=>site.exhibit===record.id):null;
  const science=typeof scienceExperiments!=='undefined'?scienceExperiments.find(story=>story.id===record.id):null;
  nextSteps.innerHTML='<div class="eyebrow">Continue your field trip</div><h3>Connect the place, the machine and the evidence.</h3><div class="actions">'+(lunar?`<button data-museum-tool="moon" data-museum-site="${lunar.id}">Find this region on the Moon ↗</button>`:'')+(science?`<button data-museum-tool="science" data-museum-experiment="${science.id}">Explore its engineering in motion ↗</button>`:'')+`<button data-museum-tool="compare" data-museum-first="${record.id}" data-museum-second="${record.related?.[0]||exhibits[0].id}">Compare a related artifact ↗</button><a class="button" href="#challenge">Try the field challenge ↗</a></div>`;
  part.append(nextSteps);
  main.querySelector('.interpretation')?.after(part);
}
// Native dialog handles Escape and focus trapping; explicitly return to the opener.
function prepareMuseumDialog(dialog) {
  const opener=document.activeElement;
  dialog.addEventListener('close',()=>{if(opener?.isConnected)opener.focus({preventScroll:true});},{once:true});
}
