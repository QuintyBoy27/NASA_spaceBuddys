// Progressive museum interactions. All motion respects the visitor's preference.
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let tourActive = false;
let revealObserver;

function enhanceMuseum() {
  installMoonExplorer();
  revealObserver?.disconnect();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (!motionPreference.matches) {
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
  const hero = main.querySelector('.hero');
  if (!hero) return;
  hero.querySelector(':scope > img')?.remove();
  const explorer = document.createElement('div');
  explorer.className = 'moon-explorer';
  explorer.innerHTML = `<div class="moon-orbit"><button class="moon-disc" aria-label="Explore the Moon’s giant impact basin"><img src="images/moon.jpg" alt="NASA Clementine near-side mosaic, artistically rotated"></button></div><div class="moon-controls"><button data-moon="impact">◉ Giant impact basin</button><button data-moon="apollo">⌖ Apollo 11 landing site</button><button id="moon-pause" aria-pressed="false">Pause rotation</button></div><p class="caption">Click the Moon to explore · Illustrated navigation<br>Near-side mosaic · NASA/JPL/USGS · Rotation is a visual effect</p>`;
  hero.append(explorer);
  const disc = explorer.querySelector('.moon-disc');
  const pause = explorer.querySelector('#moon-pause');
  let paused = motionPreference.matches;
  const update = () => {
    disc.classList.toggle('paused', paused);
    pause.textContent = paused ? 'Resume rotation' : 'Pause rotation';
    pause.setAttribute('aria-pressed', String(paused));
  };
  update();
  pause.onclick = () => { paused = !paused; update(); };
  disc.onclick = () => { paused = true; update(); openMoonStory('impact'); };
  explorer.querySelectorAll('[data-moon]').forEach(button => {
    button.onclick = () => { paused = true; update(); openMoonStory(button.dataset.moon); };
  });
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
  dialog.querySelector('.caption').textContent = photo.parentElement.querySelector('.caption').textContent;
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
  document.body.append(dialog);
  dialog.showModal();
}

 document.addEventListener("visibilitychange",()=>document.body.classList.toggle("page-hidden",document.hidden));
