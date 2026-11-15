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
// Precompute immutable world coordinates; view changes need only four trig calls.
const moonMesh=Array.from({length:25},(_,y)=>Array.from({length:49},(_,x)=>{const p=(90-y/24*180)*Math.PI/180,l=(x/48*360-180)*Math.PI/180;return {x:Math.cos(p)*Math.sin(l),y:Math.sin(p),z:Math.cos(p)*Math.cos(l),u:x/48,v:y/24};}));
function rotateMoonVertex(p,centerLat,centerLon){const a=centerLat*Math.PI/180,b=centerLon*Math.PI/180;const x=p.x*Math.cos(b)-p.z*Math.sin(b),depth=p.x*Math.sin(b)+p.z*Math.cos(b);return {...p,x,y:p.y*Math.cos(a)-depth*Math.sin(a),z:p.y*Math.sin(a)+depth*Math.cos(a)};}
function projectMoonMesh(lat,lon,r=190,w=520,h=460){const a=lat*Math.PI/180,b=lon*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);return moonMesh.map(row=>row.map(p=>{const x=p.x*cb-p.z*sb,depth=p.x*sb+p.z*cb,y=p.y*ca-depth*sa,z=p.y*sa+depth*ca;return {...p,x,y,z,sx:w/2+x*r,sy:h/2-y*r};}));}
function clipMoonTriangle(vertices){const result=[];const edge=.00001;for(let i=0;i<vertices.length;i++){const a=vertices[i],b=vertices[(i+1)%vertices.length],inside=a.z>=edge;if(inside)result.push(a);if(inside!==(b.z>=edge)){const t=(edge-a.z)/(b.z-a.z),p={};for(const key of ['x','y','z','u','v','sx','sy'])p[key]=a[key]+(b[key]-a[key])*t;result.push(p);}}return result;}
function moonPinchZoom(initialZoom,initialDistance,currentDistance){return Math.max(1,Math.min(2.5,initialZoom*currentDistance/Math.max(1,initialDistance)));}
// Shared by the lunar explorer and the atlas. Rotation is decorative, not real time.
function advanceGlobeLongitude(lon,elapsed){return ((lon+Math.min(100,Math.max(0,elapsed))*.003+180)%360+360)%360-180;}
function paintGlobeTriangle(ctx,image,a,b,c){
 const u0=a.u*image.width,v0=a.v*image.height,u1=b.u*image.width,v1=b.v*image.height,u2=c.u*image.width,v2=c.v*image.height;
 const den=u0*(v1-v2)+u1*(v2-v0)+u2*(v0-v1);if(Math.abs(den)<.001)return;
 const A=(a.sx*(v1-v2)+b.sx*(v2-v0)+c.sx*(v0-v1))/den,B=(a.sy*(v1-v2)+b.sy*(v2-v0)+c.sy*(v0-v1))/den;
 const C=(a.sx*(u2-u1)+b.sx*(u0-u2)+c.sx*(u1-u0))/den,D=(a.sy*(u2-u1)+b.sy*(u0-u2)+c.sy*(u1-u0))/den;
 const E=(a.sx*(u1*v2-u2*v1)+b.sx*(u2*v0-u0*v2)+c.sx*(u0*v1-u1*v0))/den,F=(a.sy*(u1*v2-u2*v1)+b.sy*(u2*v0-u0*v2)+c.sy*(u0*v1-u1*v0))/den;
 ctx.save();ctx.beginPath();const mx=(a.sx+b.sx+c.sx)/3,my=(a.sy+b.sy+c.sy)/3;[a,b,c].forEach((p,i)=>{const dx=p.sx-mx,dy=p.sy-my,l=Math.hypot(dx,dy)||1;ctx[i?'lineTo':'moveTo'](p.sx+dx/l*.4,p.sy+dy/l*.4);});ctx.closePath();ctx.clip();ctx.transform(A,B,C,D,E,F);ctx.drawImage(image,0,0);ctx.restore();
}
function paintPlanetGlobe(ctx,image,lat,lon,zoom=1){
 const w=520,h=460,r=190*zoom;
 ctx.clearRect(0,0,w,h);ctx.save();ctx.beginPath();ctx.arc(w/2,h/2,r,0,Math.PI*2);ctx.clip();ctx.fillStyle='#5d605c';ctx.fillRect(0,0,w,h);
 if(image){const vertices=projectMoonMesh(lat,lon,r,w,h);for(let y=0;y<24;y++)for(let x=0;x<48;x++){const a=vertices[y][x],b=vertices[y][x+1],c=vertices[y+1][x],d=vertices[y+1][x+1];for(const triangle of [[a,b,c],[b,d,c]]){if(triangle.every(p=>p.z<=0))continue;const clipped=clipMoonTriangle(triangle);for(let i=1;i<clipped.length-1;i++)paintGlobeTriangle(ctx,image,clipped[0],clipped[i],clipped[i+1]);}}}
 const shade=ctx.createRadialGradient(205,180,60,260,230,r);shade.addColorStop(0,'#0000');shade.addColorStop(.75,'#0001');shade.addColorStop(1,'#0009');ctx.fillStyle=shade;ctx.fillRect(0,0,w,h);ctx.restore();
}
let stopMoonGlobe=()=>{};
function mountMoonGlobe(hero){
 stopMoonGlobe();
 hero.querySelector(':scope > img')?.remove();
 const host=document.createElement('div');host.className='moon-explorer lunar-globe';
 host.innerHTML=`<div class="globe-topline"><span class="eyebrow">Lunar field atlas</span><span>${String(moonSites.length).padStart(2,'0')} destinations / 02 hemispheres</span></div><div class="moon-viewport"><canvas width="520" height="460" tabindex="0" role="img" aria-label="Interactive Moon globe. Drag to rotate. Arrow keys rotate, plus and minus zoom. Use the site list to explore locations." aria-describedby="globe-help"></canvas><div class="moon-markers" aria-label="Visible lunar locations"></div><span class="moon-north" aria-hidden="true">N ↑</span></div><div class="globe-tools" role="group" aria-label="Moon view controls"><button data-view="near">Near side</button><button data-view="far">Far side</button><button id="globe-out" aria-label="Zoom out">−</button><button id="globe-in" aria-label="Zoom in">+</button><button id="globe-play" aria-pressed="false">Rotate</button><button id="globe-reset">Reset</button></div><div class="moon-pin-choices" hidden></div><p id="globe-help" class="caption">Drag to explore · Arrow keys rotate · + / − zoom · Choose a numbered marker or a site below. Touch: one finger rotates, two fingers zoom; page scrolling works outside the globe.</p><p id="globe-status" class="caption" role="status">Loading the NASA global mosaic…</p><div class="globe-filters"><label>Find a place<input id="moon-site-search" type="search" placeholder="Apollo, rover, crater…"></label><label>Show<select id="moon-site-kind"><option>All locations</option><option>Landing sites</option><option>Robotic explorers</option><option>Landmarks</option></select></label></div><p id="moon-filter-status" class="caption" role="status"></p><div class="moon-site-list" role="group" aria-label="Searchable lunar destinations"></div><article class="moon-site-card" aria-live="polite"></article><p class="caption">Geographic markers on a spherical globe · North-positive latitude, east-positive longitude (−180°…180°). Positions are rounded source coordinates, not navigation-grade fixes. Markers are enlarged and may overlap.</p><p class="caption">Texture: NASA/GSFC/Arizona State University · <a href="https://svs.gsfc.nasa.gov/4720/" target="_blank" rel="noopener">NASA CGI Moon Kit ↗</a>. Appearance-optimized mosaic with filled polar gaps; no elevation mesh, live lighting, or detailed surface tiles.</p><button class="button" id="globe-impact">Explore the giant impact basin story ↗</button>`;
 hero.append(host);
 const canvas=host.querySelector('canvas');let ctx;try{ctx=canvas.getContext?.('2d')}catch{ctx=null}
 const image=new Image();let ready=false,disposed=false;
 let lat=8,lon=0,zoom=1,playing=false,visible=true,frame=0,timer=0,last=0,drag=null;
 const pointers=new Map();
 let chosen=moonSites[0],subset=moonSites.slice();
 const status=host.querySelector('#globe-status'),markers=host.querySelector('.moon-markers');
 const siteButtons=new Map();
 moonSites.forEach((site,i)=>{const button=document.createElement('button');button.type='button';button.className='moon-map-pin';button.textContent=String(i+1).padStart(2,'0');button.setAttribute('aria-label',site.name);button.title=site.name;button.onclick=()=>{const group=button.moonCluster||[site];if(group.length===1)select(site);else{pause();const panel=host.querySelector('.moon-pin-choices');panel.hidden=false;panel.innerHTML='<p>These markers overlap at this scale. Choose a location:</p>'+group.map(item=>`<button data-overlap="${item.id}">${item.name}</button>`).join('');panel.querySelectorAll('button').forEach(control=>control.onclick=()=>{select(moonSites.find(item=>item.id===control.dataset.overlap));siteButtons.get(chosen.id)?.focus({preventScroll:true});});panel.querySelector('button')?.focus();}};markers.append(button);siteButtons.set(site.id,button);});
 function pause(){clearTimeout(timer);timer=0;playing=false;last=0;host.querySelector('#globe-play').textContent='Rotate';host.querySelector('#globe-play').setAttribute('aria-pressed','false');cancelAnimationFrame(frame);frame=0;}
 function play(){if(!ctx)return;playing=true;last=0;host.querySelector('#globe-play').textContent='Pause';host.querySelector('#globe-play').setAttribute('aria-pressed','true');request();}
 function request(){clearTimeout(timer);timer=0;if(!disposed&&!frame&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
 function clampView(){lat=Math.max(-85,Math.min(85,lat));lon=((lon+180)%360+360)%360-180;zoom=Math.max(1,Math.min(2.5,zoom));}
 function draw(time=0){
   frame=0;if(disposed||!visible||document.hidden)return;
   if(playing){if(last)lon=advanceGlobeLongitude(lon,time-last);last=time;}
   host.querySelector('#globe-in').disabled=zoom>=2.5;host.querySelector('#globe-out').disabled=zoom<=1;
   const w=520,h=460,r=190*zoom;
   if(ctx)paintPlanetGlobe(ctx,ready?image:null,lat,lon,zoom);
   const candidates=[];moonSites.forEach(site=>{const p=projectMoonPoint(site.lat,site.lon,lat,lon),x=w/2+p.x*r,y=h/2-p.y*r,button=siteButtons.get(site.id);button.hidden=true;button.setAttribute('aria-pressed',String(site===chosen));if(subset.includes(site)&&p.z>.08&&x>=10&&x<=w-10&&y>=10&&y<=h-10)candidates.push({site,x,y});});
   const threshold=46*w/(canvas.getBoundingClientRect().width||w),groups=[];
   for(const point of candidates){const touching=groups.filter(group=>group.some(other=>Math.hypot(point.x-other.x,point.y-other.y)<threshold));const group=[point,...touching.flat()];for(const old of touching)groups.splice(groups.indexOf(old),1);groups.push(group);}
   for(const group of groups){const point=group.find(p=>p.site===chosen)||group[0],button=siteButtons.get(point.site.id);button.hidden=false;button.style.left=point.x/w*100+'%';button.style.top=point.y/h*100+'%';button.moonCluster=group.map(p=>p.site);button.textContent=group.length>1?String(group.length)+' sites':String(moonSites.indexOf(point.site)+1).padStart(2,'0');button.setAttribute('aria-label',group.length>1?'Choose from '+group.length+' overlapping locations':point.site.name);button.title=group.map(p=>p.site.name).join(' / ');}

   if(playing){timer=setTimeout(()=>{timer=0;request();},42);}
 }
 function renderList(reconcile=false){if(reconcile)host.querySelector('.moon-pin-choices').hidden=true;const q=host.querySelector('#moon-site-search').value.trim().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),kind=host.querySelector('#moon-site-kind').value;subset=moonSites.filter(site=>(kind==='All locations'||site.kind===kind)&&[site.name,site.description,site.kind].map(text=>window.MuseumI18n?.searchText(text)||text).join(' ').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(q));if(reconcile&&subset.length&&!subset.includes(chosen)){select(subset[0]);return;}host.querySelector('.moon-site-card').hidden=!subset.length;host.querySelector('#moon-filter-status').textContent=subset.length+' of '+moonSites.length+' locations match';host.querySelector('.moon-site-list').innerHTML=subset.map(site=>`<button data-lunar-site="${site.id}" aria-pressed="${site===chosen}"><span>${String(moonSites.indexOf(site)+1).padStart(2,'0')}</span>${site.name}</button>`).join('')||'<p>No locations match. Clear the search or choose All locations.</p>';host.querySelectorAll('[data-lunar-site]').forEach(button=>button.onclick=()=>select(moonSites.find(site=>site.id===button.dataset.lunarSite)));request();}
 function select(site){pause();host.querySelector('.moon-pin-choices').hidden=true;chosen=site;lat=site.lat;lon=site.lon;clampView();host.querySelector('.moon-site-card').innerHTML=`<div class="eyebrow">${site.kind} / ${site.year}</div><h3>${site.name}</h3><p>${site.description}</p><p class="lunar-coordinates">${Math.abs(site.lat).toFixed(4)}° ${site.lat<0?'S':'N'} · ${Math.abs(site.lon).toFixed(4)}° ${site.lon<0?'W':'E'}</p><div class="actions">${site.exhibit?`<a class="button primary" href="#exhibit/${site.exhibit}">Open museum exhibit ↗</a>`:''}<a class="button" href="${site.source||moonCoordinateSource}" target="_blank" rel="noopener">Location source ↗</a>${site.exhibit?`<button data-museum-tool="compare" data-museum-first="${site.exhibit}">Compare this artifact ↗</button>`:''}${site.exhibit==='alsep'?'<button data-museum-tool="science" data-museum-experiment="insight">Explore seismic science ↗</button>':''}</div>`;renderList();}
 function move(dx,dy){pause();lon+=dx;lat+=dy;clampView();request();}
 function baseline(){const points=[...pointers.values()];drag=points.length?{points:points.map(p=>({...p})),lon,lat,zoom}:null;}
 canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;pause();canvas.focus({preventScroll:true});pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});baseline();canvas.setPointerCapture?.(event.pointerId);});
 canvas.addEventListener('pointermove',event=>{if(!pointers.has(event.pointerId)||!drag)return;pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});const points=[...pointers.values()],rect=canvas.getBoundingClientRect();if(points.length>=2&&drag.points.length>=2){const initial=Math.hypot(drag.points[0].x-drag.points[1].x,drag.points[0].y-drag.points[1].y),now=Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y);zoom=moonPinchZoom(drag.zoom,initial,now);}else{lon=drag.lon-(points[0].x-drag.points[0].x)*180/Math.max(1,rect.width)/zoom;lat=drag.lat+(points[0].y-drag.points[0].y)*140/Math.max(1,rect.height)/zoom;}clampView();request();});
 const release=event=>{pointers.delete(event.pointerId);baseline();};for(const type of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(type,release);
 markers.addEventListener('focusin',pause);
 host.querySelector('.moon-pin-choices').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();host.querySelector('.moon-pin-choices').hidden=true;canvas.focus({preventScroll:true});}});
 canvas.addEventListener('keydown',event=>{const actions={ArrowLeft:()=>move(-12,0),ArrowRight:()=>move(12,0),ArrowUp:()=>move(0,10),ArrowDown:()=>move(0,-10),'+':()=>magnify(.2),'=':()=>magnify(.2),'-':()=>magnify(-.2),Home:reset};if(actions[event.key]){event.preventDefault();actions[event.key]();}});
 canvas.addEventListener('wheel',event=>{if(document.activeElement!==canvas)return;event.preventDefault();magnify(event.deltaY<0?.15:-.15);},{passive:false});
 function magnify(amount){pause();zoom+=amount;clampView();request();}
 function reset(){host.querySelector('#moon-site-search').value='';host.querySelector('#moon-site-kind').value='All locations';select(moonSites[0]);lat=8;lon=0;zoom=1;request();}
 host.querySelector('#globe-in').onclick=()=>magnify(.25);host.querySelector('#globe-out').onclick=()=>magnify(-.25);host.querySelector('#globe-reset').onclick=reset;
 host.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{pause();lat=0;lon=button.dataset.view==='far'?180:0;request();});
 host.querySelector('#globe-play').onclick=()=>{if(playing){pause();request();}else play();};
 host.querySelector('#moon-site-search').oninput=()=>renderList(true);host.querySelector('#moon-site-kind').onchange=()=>renderList(true);host.querySelector('#globe-impact').onclick=()=>openMoonStory('impact');
 const visibility=()=>{clearTimeout(timer);timer=0;cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden)request();};document.addEventListener('visibilitychange',visibility);
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();}):null;observer?.observe(host.querySelector('.moon-viewport'));
 const motionChange=()=>{if(motionPreference.matches){pause();request();}};motionPreference.addEventListener?.('change',motionChange);
 image.onload=()=>{ready=true;status.textContent=ctx?'Global mosaic ready · choose a site to center it. Zoom is limited by the local 2048 × 1024 texture.':'Canvas rendering is unavailable. Use the site list below.';request();};image.onerror=()=>{pause();status.textContent='The global texture could not load. Geographic markers and the searchable site list remain available.';request();};image.src='images/moon-globe.jpg';
 if(!ctx)status.textContent='Canvas rendering is unavailable. Use the searchable site list to explore all locations.';
 select(chosen);
 host.querySelector('#globe-play').disabled=!ctx;
 if(!motionPreference.matches)play();
 stopMoonGlobe=()=>{disposed=true;playing=false;pointers.clear();drag=null;clearTimeout(timer);timer=0;cancelAnimationFrame(frame);observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motionPreference.removeEventListener?.('change',motionChange);image.onload=null;image.onerror=null;};
}

// The atlas keeps its schematic artifact buttons. Only its backdrop is a globe;
// those buttons do not claim geographic positions on the rotating surface.
function mountAtlasGlobe(stage,world){
 const canvas=document.createElement('canvas');canvas.width=520;canvas.height=460;canvas.className='atlas-planet-canvas';canvas.setAttribute('aria-hidden','true');stage.prepend(canvas);
 const controls=document.createElement('div');controls.className='atlas-rotation-controls';
 const button=document.createElement('button');button.type='button';button.hidden=true;button.setAttribute('aria-label',world+' automatic rotation');controls.append(button);
 const status=document.createElement('span');status.className='caption';status.setAttribute('role','status');controls.append(status);stage.querySelector('.planet-label').after(controls);
 let ctx;try{ctx=canvas.getContext?.('2d')}catch{ctx=null}
 let disposed=false,ready=false,playing=!!ctx&&!motionPreference.matches,visible=true,frame=0,timer=0,last=0,lon=world==='Mars'?0:23.47;
 const image=new Image();
 function updateButton(){button.textContent=playing?'Pause rotation':'Rotate '+world;button.setAttribute('aria-pressed',String(playing));}
 function cancel(){clearTimeout(timer);timer=0;cancelAnimationFrame(frame);frame=0;last=0;}
 function request(){if(!disposed&&ready&&visible&&!document.hidden&&!frame)frame=requestAnimationFrame(draw);}
 function draw(time){frame=0;if(disposed||!ready||!visible||document.hidden)return;if(playing){if(last)lon=advanceGlobeLongitude(lon,time-last);last=time;}paintPlanetGlobe(ctx,image,8,lon,1.05);if(playing)timer=setTimeout(()=>{timer=0;request();},42);}
 function pause(){playing=false;cancel();updateButton();request();}
 button.onclick=()=>{if(playing)pause();else{playing=true;last=0;updateButton();request();}};updateButton();
 const visibility=()=>{cancel();request();};document.addEventListener('visibilitychange',visibility);
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;visibility();}):null;observer?.observe(stage);
 const motionChange=()=>{if(motionPreference.matches)pause();};motionPreference.addEventListener?.('change',motionChange);
 const pins=stage.querySelector('.artifact-pins');pins?.addEventListener('focusin',pause);
 image.onload=()=>{if(disposed||!ctx)return;ready=true;stage.classList.add('has-rotating-globe');button.hidden=false;request();};
 image.onerror=()=>{if(disposed)return;playing=false;cancel();updateButton();status.textContent='Globe texture unavailable · showing the still image.';};
 if(ctx)image.src=world==='Mars'?'images/mars-globe.jpg':'images/moon-globe.jpg';
 return ()=>{disposed=true;playing=false;cancel();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motionPreference.removeEventListener?.('change',motionChange);pins?.removeEventListener('focusin',pause);image.onload=null;image.onerror=null;canvas.remove();controls.remove();stage.classList.remove('has-rotating-globe');};
}
