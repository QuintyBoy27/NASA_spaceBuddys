// NASA SVS global texture, centered at 0° longitude. Independent canvas renderer.
const moonCoordinateSource='https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_artifact_impacts.html';
const moonSites=[
 {id:'apollo11',name:'Apollo 11 · Tranquility Base',lat:.67416,lon:23.47314,kind:'Landing sites',year:'1969',description:'The first crewed lunar landing. Eagle’s descent stage remains here.',exhibit:'eagle'},
 {id:'apollo12',name:'Apollo 12 & Surveyor 3 region',lat:-3.0128,lon:-23.4219,kind:'Landing sites',year:'1969 / 1967',description:'Apollo 12 landed close to Surveyor 3. This grouped marker uses the Apollo 12 descent-stage location; it is not Surveyor 3’s precise position.',exhibit:'surveyor'},
 {id:'apollo14',name:'Apollo 14 · Fra Mauro',lat:-3.64589,lon:-17.47194,kind:'Landing sites',year:'1971',description:'Apollo 14’s descent-stage landing site in the Fra Mauro region.'},
 {id:'apollo15',name:'Apollo 15 · Hadley–Apennine',lat:26.13239,lon:3.63330,kind:'Landing sites',year:'1971',description:'The descent-stage landing site is shown as regional context for the Apollo 15 rover. The pin is not the rover’s final parking position.',exhibit:'rover'},
 {id:'apollo16',name:'Apollo 16 · Descartes',lat:-8.9734,lon:15.5011,kind:'Landing sites',year:'1972',description:'Apollo 16’s descent-stage landing site in the lunar highlands.'},
 {id:'apollo17',name:'Apollo 17 · Taurus–Littrow',lat:20.1911,lon:30.7723,kind:'Landing sites',year:'1972',description:'The descent-stage landing site provides regional context for the experiment station. The pin is not the exact ALSEP instrument location.',exhibit:'alsep'},
 {id:'lunokhod',name:'Lunokhod 1 rover',lat:38.3150,lon:-35.0081,kind:'Robotic explorers',year:'1970 arrival',description:'A robotic rover location in NASA’s lunar artifact inventory. The rover is separate from the Luna 17 landing platform.'},
 {id:'change4',name:'Chang’e 4 · Far-side landing',lat:-45.4561,lon:177.5885,kind:'Robotic explorers',year:'2019',description:'The Chang’e 4 lander location on the lunar far side. This marker is not the current position of the Yutu 2 rover.'},
 {id:'tycho',name:'Tycho crater',lat:-43.30,lon:-11.22,kind:'Landmarks',year:'Impact crater',description:'A prominent lunar impact crater. The marker indicates its catalogued center, not its boundary.',source:'https://planetarynames.wr.usgs.gov/Feature/6163'}
];
function projectMoonPoint(lat,lon,centerLat,centerLon){
 const rad=Math.PI/180,p=lat*rad,d=(lon-centerLon)*rad,c=centerLat*rad;
 return {x:Math.cos(p)*Math.sin(d),y:Math.sin(p)*Math.cos(c)-Math.cos(p)*Math.cos(d)*Math.sin(c),z:Math.sin(p)*Math.sin(c)+Math.cos(p)*Math.cos(d)*Math.cos(c)};
}
let stopMoonGlobe=()=>{};
function mountMoonGlobe(hero){
 stopMoonGlobe();
 hero.querySelector(':scope > img')?.remove();
 const host=document.createElement('div');host.className='moon-explorer lunar-globe';
 host.innerHTML=`<div class="globe-topline"><span class="eyebrow">Lunar field atlas</span><span>09 destinations / 02 hemispheres</span></div><div class="moon-viewport"><canvas width="520" height="460" tabindex="0" role="img" aria-label="Interactive Moon globe. Drag to rotate. Arrow keys rotate, plus and minus zoom. Use the site list to explore locations." aria-describedby="globe-help"></canvas><div class="moon-markers" aria-label="Visible lunar locations"></div><span class="moon-north" aria-hidden="true">N ↑</span></div><div class="globe-tools" role="group" aria-label="Moon view controls"><button data-view="near">Near side</button><button data-view="far">Far side</button><button id="globe-out" aria-label="Zoom out">−</button><button id="globe-in" aria-label="Zoom in">+</button><button id="globe-play" aria-pressed="false">Rotate</button><button id="globe-reset">Reset</button></div><p id="globe-help" class="caption">Drag to explore · Arrow keys rotate · + / − zoom · Choose a numbered marker or a site below. Touch: one finger rotates; page scrolling works outside the globe.</p><p id="globe-status" class="caption" role="status">Loading the NASA global mosaic…</p><div class="globe-filters"><label>Find a place<input id="moon-site-search" type="search" placeholder="Apollo, rover, crater…"></label><label>Show<select id="moon-site-kind"><option>All locations</option><option>Landing sites</option><option>Robotic explorers</option><option>Landmarks</option></select></label></div><div class="moon-site-list" role="group" aria-label="Searchable lunar destinations"></div><article class="moon-site-card" aria-live="polite"></article><p class="caption">Geographic markers on a spherical globe · North-positive latitude, east-positive longitude (−180°…180°). Positions are rounded source coordinates, not navigation-grade fixes. Markers are enlarged and may overlap.</p><p class="caption">Texture: NASA/GSFC/Arizona State University · <a href="https://svs.gsfc.nasa.gov/4720/" target="_blank" rel="noopener">NASA CGI Moon Kit ↗</a>. Appearance-optimized mosaic with filled polar gaps; no elevation mesh, live lighting, or detailed surface tiles.</p><button class="button" id="globe-impact">Explore the giant impact basin story ↗</button>`;
 hero.append(host);
 const canvas=host.querySelector('canvas'),ctx=canvas.getContext?.('2d');
 const image=new Image();let ready=false,disposed=false;
 let lat=8,lon=0,zoom=1,playing=false,visible=true,frame=0,timer=0,last=0,drag=null;
 let chosen=moonSites[0],subset=moonSites.slice();
 const status=host.querySelector('#globe-status'),markers=host.querySelector('.moon-markers');
 const siteButtons=new Map();
 moonSites.forEach((site,i)=>{const button=document.createElement('button');button.type='button';button.className='moon-map-pin';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',site.name);button.title=site.name;button.onclick=()=>select(site);markers.append(button);siteButtons.set(site.id,button);});
 function pause(){clearTimeout(timer);timer=0;playing=false;host.querySelector('#globe-play').textContent='Rotate';host.querySelector('#globe-play').setAttribute('aria-pressed','false');cancelAnimationFrame(frame);frame=0;}
 function request(){clearTimeout(timer);timer=0;if(!disposed&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
 function clampView(){lat=Math.max(-85,Math.min(85,lat));lon=((lon+540)%360)-180;zoom=Math.max(1,Math.min(2.5,zoom));}
 function textureTriangle(a,b,c){
   const u0=a.u*image.width,v0=a.v*image.height,u1=b.u*image.width,v1=b.v*image.height,u2=c.u*image.width,v2=c.v*image.height;
   const den=u0*(v1-v2)+u1*(v2-v0)+u2*(v0-v1);if(Math.abs(den)<.001)return;
   const A=(a.sx*(v1-v2)+b.sx*(v2-v0)+c.sx*(v0-v1))/den,B=(a.sy*(v1-v2)+b.sy*(v2-v0)+c.sy*(v0-v1))/den;
   const C=(a.sx*(u2-u1)+b.sx*(u0-u2)+c.sx*(u1-u0))/den,D=(a.sy*(u2-u1)+b.sy*(u0-u2)+c.sy*(u1-u0))/den;
   const E=(a.sx*(u1*v2-u2*v1)+b.sx*(u2*v0-u0*v2)+c.sx*(u0*v1-u1*v0))/den,F=(a.sy*(u1*v2-u2*v1)+b.sy*(u2*v0-u0*v2)+c.sy*(u0*v1-u1*v0))/den;
   ctx.save();ctx.beginPath();const mx=(a.sx+b.sx+c.sx)/3,my=(a.sy+b.sy+c.sy)/3;[a,b,c].forEach((p,i)=>{const dx=p.sx-mx,dy=p.sy-my,l=Math.hypot(dx,dy)||1;ctx[i?'lineTo':'moveTo'](p.sx+dx/l*.4,p.sy+dy/l*.4);});ctx.closePath();ctx.clip();ctx.transform(A,B,C,D,E,F);ctx.drawImage(image,0,0);ctx.restore();
 }
 function draw(time=0){
   frame=0;if(disposed||!visible||document.hidden)return;
   if(playing&&time-last>=80){lon+=.35;clampView();last=time;}
   host.querySelector('#globe-in').disabled=zoom>=2.5;host.querySelector('#globe-out').disabled=zoom<=1;
   const w=520,h=460,r=190*zoom;
   if(ctx){ctx.clearRect(0,0,w,h);ctx.save();ctx.beginPath();ctx.arc(w/2,h/2,r,0,Math.PI*2);ctx.clip();ctx.fillStyle='#5d605c';ctx.fillRect(0,0,w,h);
     if(ready){const rows=24,cols=48,vertices=[];for(let y=0;y<=rows;y++){const row=[];for(let x=0;x<=cols;x++){const p=projectMoonPoint(90-y/rows*180,x/cols*360-180,lat,lon);row.push({...p,sx:w/2+p.x*r,sy:h/2-p.y*r,u:x/cols,v:y/rows});}vertices.push(row);}for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const a=vertices[y][x],b=vertices[y][x+1],c=vertices[y+1][x],d=vertices[y+1][x+1];if(a.z>0&&b.z>0&&c.z>0)textureTriangle(a,b,c);if(b.z>0&&d.z>0&&c.z>0)textureTriangle(b,d,c);}}
     const shade=ctx.createRadialGradient(205,180,60,260,230,r);shade.addColorStop(0,'#0000');shade.addColorStop(.75,'#0001');shade.addColorStop(1,'#0009');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);ctx.restore();
   }
   moonSites.forEach(site=>{const p=projectMoonPoint(site.lat,site.lon,lat,lon),x=w/2+p.x*r,y=h/2-p.y*r,button=siteButtons.get(site.id);button.hidden=!subset.includes(site)||p.z<.08||x<10||x>w-10||y<10||y>h-10;button.style.left=x/w*100+'%';button.style.top=y/h*100+'%';button.setAttribute('aria-pressed',String(site===chosen));});
   if(playing){timer=setTimeout(()=>{timer=0;request();},80);}
 }
 function renderList(){const q=host.querySelector('#moon-site-search').value.trim().toLowerCase(),kind=host.querySelector('#moon-site-kind').value;subset=moonSites.filter(site=>(kind==='All locations'||site.kind===kind)&&(site.name+' '+site.description).toLowerCase().includes(q));host.querySelector('.moon-site-list').innerHTML=subset.map(site=>`<button data-lunar-site="${site.id}" aria-pressed="${site===chosen}"><span>${String(moonSites.indexOf(site)+1).padStart(2,'0')}</span>${site.name}</button>`).join('')||'<p>No locations match. Clear the search or choose All locations.</p>';host.querySelectorAll('[data-lunar-site]').forEach(button=>button.onclick=()=>select(moonSites.find(site=>site.id===button.dataset.lunarSite)));request();}
 function select(site){pause();chosen=site;lat=site.lat;lon=site.lon;clampView();host.querySelector('.moon-site-card').innerHTML=`<div class="eyebrow">${site.kind} / ${site.year}</div><h3>${site.name}</h3><p>${site.description}</p><p class="lunar-coordinates">${Math.abs(site.lat).toFixed(4)}° ${site.lat<0?'S':'N'} · ${Math.abs(site.lon).toFixed(4)}° ${site.lon<0?'W':'E'}</p><div class="actions">${site.exhibit?`<a class="button primary" href="#exhibit/${site.exhibit}">Open museum exhibit ↗</a>`:''}<a class="button" href="${site.source||moonCoordinateSource}" target="_blank" rel="noopener">Location source ↗</a></div>`;renderList();}
 function move(dx,dy){pause();lon+=dx;lat+=dy;clampView();request();}
 canvas.addEventListener('pointerdown',event=>{pause();drag={id:event.pointerId,x:event.clientX,y:event.clientY,lon,lat};canvas.setPointerCapture?.(event.pointerId);});
 canvas.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const rect=canvas.getBoundingClientRect();lon=drag.lon-(event.clientX-drag.x)*180/rect.width/zoom;lat=drag.lat+(event.clientY-drag.y)*140/rect.height/zoom;clampView();request();});
 const release=()=>{drag=null;};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
 canvas.addEventListener('keydown',event=>{const actions={ArrowLeft:()=>move(-12,0),ArrowRight:()=>move(12,0),ArrowUp:()=>move(0,10),ArrowDown:()=>move(0,-10),'+':()=>magnify(.2),'=':()=>magnify(.2),'-':()=>magnify(-.2),Home:reset};if(actions[event.key]){event.preventDefault();actions[event.key]();}});
 canvas.addEventListener('wheel',event=>{if(document.activeElement!==canvas)return;event.preventDefault();magnify(event.deltaY<0?.15:-.15);},{passive:false});
 function magnify(amount){pause();zoom+=amount;clampView();request();}
 function reset(){pause();lat=8;lon=0;zoom=1;request();}
 host.querySelector('#globe-in').onclick=()=>magnify(.25);host.querySelector('#globe-out').onclick=()=>magnify(-.25);host.querySelector('#globe-reset').onclick=reset;
 host.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{pause();lat=0;lon=button.dataset.view==='far'?180:0;request();});
 host.querySelector('#globe-play').onclick=()=>{if(playing){pause();request();}else{playing=true;host.querySelector('#globe-play').textContent='Pause';host.querySelector('#globe-play').setAttribute('aria-pressed','true');request();}};
 host.querySelector('#moon-site-search').oninput=renderList;host.querySelector('#moon-site-kind').onchange=renderList;host.querySelector('#globe-impact').onclick=()=>openMoonStory('impact');
 const visibility=()=>{clearTimeout(timer);timer=0;cancelAnimationFrame(frame);frame=0;if(!document.hidden)request();};document.addEventListener('visibilitychange',visibility);
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();}):null;observer?.observe(host);
 const motionChange=()=>{if(motionPreference.matches){pause();request();}};motionPreference.addEventListener?.('change',motionChange);
 image.onload=()=>{ready=true;status.textContent=ctx?'Global mosaic ready · choose a site to center it. Zoom is limited by the local 2048 × 1024 texture.':'Canvas rendering is unavailable. Use the site list below.';request();};image.onerror=()=>{status.textContent='The global texture could not load. Geographic markers and the searchable site list remain available.';request();};image.src='images/moon-globe.jpg';
 if(!ctx)status.textContent='Canvas rendering is unavailable. Use the searchable site list to explore all locations.';
 select(chosen);
 stopMoonGlobe=()=>{disposed=true;playing=false;clearTimeout(timer);timer=0;cancelAnimationFrame(frame);observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motionPreference.removeEventListener?.('change',motionChange);image.onload=null;image.onerror=null;};
}
