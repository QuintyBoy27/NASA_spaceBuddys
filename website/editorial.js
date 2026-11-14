let stopEditorial = () => {};

function installEditorial() {
  stopEditorial();
  const moonSection = main.querySelector('.hero');
  if (!moonSection) return;
  moonSection.classList.add('moon-chapter');
  const oldTitle = moonSection.querySelector('h1');
  const moonTitle = document.createElement('h2');
  moonTitle.textContent = 'Your next discovery is on the surface.';
  oldTitle.replaceWith(moonTitle);
  moonSection.querySelector('.eyebrow').textContent = 'Explore the Moon';
  moonSection.querySelector('.lead').textContent = 'Drag the globe, discover landing sites, visit a far-side explorer, or find a crater. Every marker connects a place with a story.';

  const scenes = [
    {id:'backshell',tag:'Mars · Jezero Crater',title:'Built for a moment.',emphasis:'Remembered for a lifetime.',text:'A parachute on red sand. A landing that opened a new chapter. Explore the hardware that made the journey possible.'},
    {id:'eagle',tag:'Moon · Sea of Tranquility',title:'They came home.',emphasis:'Part of the journey stayed.',text:'At Tranquility Base, the descent stage still marks the place where Apollo 11 touched another world.'},
    {id:'ingenuity',tag:'Mars · Valinor Hills',title:'Seventy-two flights.',emphasis:'A new way to explore.',text:'Meet the small helicopter that gave Mars exploration a different perspective.'}
  ];
  const opening = document.createElement('section');
  opening.className = 'cinema';
  opening.setAttribute('aria-label','Featured museum stories');
  opening.innerHTML = `<div class="cinema-images" aria-hidden="true">${scenes.map((s,i)=>`<img ${i===0?`src="images/${s.id}.jpg" fetchpriority="high"`:`data-src="images/${s.id}.jpg"`} class="${i===0?'active':''}" alt="" decoding="async">`).join('')}</div><div class="cinema-shade"></div><div class="cinema-copy"><p class="eyebrow" id="scene-tag"></p><h1><span id="scene-title"></span><em id="scene-emphasis"></em></h1><p id="scene-description"></p><a class="button primary" id="scene-link">Explore the story ↗</a></div><div class="cinema-bottom"><div class="scene-tabs" aria-label="Choose a featured story">${scenes.map((s,i)=>`<button data-scene="${i}" aria-pressed="${i===0}">${exhibits.find(e=>e.id===s.id).name}</button>`).join('')}</div><button id="scene-play" aria-pressed="false">Play stories ▷</button></div><span class="cinema-credit"></span>`;
  moonSection.before(opening);
  let current = 0;
  let timer;
  let playing = false;
  let visible = true;
  let copyAnimation;
  let focusTimer;
  function selectScene(index) {
    current = index;
    const scene = scenes[index];
    const record = exhibits.find(e=>e.id===scene.id);
    opening.querySelector('#scene-tag').textContent = scene.tag;
    opening.querySelector('#scene-title').textContent = scene.title;
    opening.querySelector('#scene-emphasis').textContent = scene.emphasis;
    opening.querySelector('#scene-description').textContent = scene.text;
    opening.querySelector('#scene-link').href = '#exhibit/' + scene.id;
    opening.querySelector('.cinema-credit').textContent = 'Archival image · ' + record.credit;
    opening.querySelectorAll('.cinema-images img').forEach((image,i)=>{if(i===index && !image.getAttribute('src'))image.src=image.dataset.src;image.classList.toggle('active',i===index)});
    opening.querySelectorAll('[data-scene]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    copyAnimation?.cancel();
    if (!motionPreference.matches && opening.querySelector('.cinema-copy').animate) copyAnimation=opening.querySelector('.cinema-copy').animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'ease-out'});
  }
  function schedule() {
    clearInterval(timer);
    if (opening.isConnected && playing && visible && !document.hidden && !opening.matches(':focus-within')) timer = setInterval(()=>selectScene((current+1)%scenes.length),8000);
  }
  function setPlaying(value) {
    playing=value;
    opening.querySelector('#scene-play').textContent = playing ? 'Pause stories Ⅱ' : 'Play stories ▷';
    opening.querySelector('#scene-play').setAttribute('aria-pressed',String(playing));
    schedule();
  }
  opening.querySelectorAll('[data-scene]').forEach(button=>button.onclick=()=>{setPlaying(false);selectScene(Number(button.dataset.scene));});
  opening.querySelector('#scene-play').onclick=()=>setPlaying(!playing);
  opening.addEventListener('focusin',()=>clearInterval(timer));
  opening.addEventListener('focusout',()=>{clearTimeout(focusTimer);focusTimer=setTimeout(schedule,0)});
  document.addEventListener('visibilitychange',schedule);
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();}) : null;
  observer?.observe(opening);
  stopEditorial=()=>{playing=false;clearTimeout(focusTimer);copyAnimation?.cancel();clearInterval(timer);observer?.disconnect();document.removeEventListener('visibilitychange',schedule);};
  selectScene(0);
  installSpotlight(moonSection);
  // The archive already presents every artifact; omit the repeated card gallery.
  [...main.children].find(node=>node.querySelector('.grid'))?.remove();
}

function installSpotlight(after) {
  const gallery=document.createElement('section');
  gallery.className='spotlight-section';
  gallery.innerHTML=`<div class="editorial-heading"><div class="eyebrow">Inside the collection</div><h2>${exhibits.length} objects.<br><em>Extraordinary journeys.</em></h2><p>Choose an artifact to bring its story into focus.</p></div><div class="spotlight"><div id="spotlight-preview"></div><div class="spotlight-list" aria-label="Artifact previews">${exhibits.map((e,i)=>`<button data-artifact="${i}" aria-pressed="${i===0}"><span>${e.name}</span><small>${e.world} · ${e.year}</small><b aria-hidden="true">↗</b></button>`).join('')}</div></div><div class="archive-header"><h3>Through the archive</h3><div><button id="archive-prev" aria-label="Previous archive images">←</button><button id="archive-next" aria-label="Next archive images">→</button></div></div><div class="archive-rail" tabindex="0" aria-label="Scrollable NASA image gallery">${exhibits.map(e=>`<a href="#exhibit/${e.id}">${museumImage(e)}<span>${e.name} ↗</span></a>`).join('')}</div><p class="caption">NASA archival imagery · Individual image credits and scientific sources in each exhibit.</p>`;
  after.after(gallery);
  function select(index) {
    const e=exhibits[index];
    const preview=gallery.querySelector('#spotlight-preview');
    preview.innerHTML=`${museumImage(e)}<div><p class="eyebrow">${e.mission}</p><h3>${e.hook}</h3><p>${e.status} · ${e.place}</p><a class="button" href="#exhibit/${e.id}">Enter the exhibit →</a></div>`;
    gallery.querySelectorAll('[data-artifact]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    preview.getAnimations?.().forEach(animation=>animation.cancel());
    if(!motionPreference.matches && preview.animate) preview.animate([{opacity:.35},{opacity:1}],{duration:400});
  }
  gallery.querySelectorAll('[data-artifact]').forEach(button=>button.onclick=()=>select(Number(button.dataset.artifact)));
  const rail=gallery.querySelector('.archive-rail');
  function move(direction){rail.scrollBy({left:direction*rail.clientWidth*.8,behavior:motionPreference.matches?'instant':'smooth'});}
  gallery.querySelector('#archive-prev').onclick=()=>move(-1);
  gallery.querySelector('#archive-next').onclick=()=>move(1);
  select(0);
}
