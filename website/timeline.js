// A photographic timeline built from the same curated records as the exhibits.
// No new mission dates, remote requests or graphics dependencies.
const timelineState={world:'All',id:null};
let stopTimeline=()=>{};
function timelineRecords(world='All'){
 return exhibits.filter(record=>world==='All'||record.world===world).slice().sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
}
function timelineDate(date){
 if(/^\d{4}$/.test(date))return date;
 const monthly=/^\d{4}-\d{2}$/.test(date);
 return new Date((monthly?date+'-01':date)+'T12:00:00Z').toLocaleDateString('en-GB',{...(monthly?{}:{day:'numeric'}),month:'short',year:'numeric',timeZone:'UTC'});
}
function timelineDecades(records){return [...new Set(records.map(record=>Math.floor(Number(record.date.slice(0,4))/10)*10))];}
function timelineEvidence(record){return record.events?.find(event=>event.date===record.date)?.source||record.source;}

function renderTimeline(){
 stopTimeline();
 const all=timelineRecords();
 let records=timelineRecords(timelineState.world),index=0,playing=false,timer=0,disposed=false,visible=true,animations=[];
 const section=document.createElement('section');section.className='mission-timeline';
 section.innerHTML=`<div class="timeline-heading"><div><div class="eyebrow">The surface archive / ${all[0].date.slice(0,4)}—${all.at(-1).date.slice(0,4)}</div><h2>A history left<br><em>on the surface.</em></h2></div><div class="timeline-intro"><p>From a robotic scout to the final flight of a Mars helicopter. Travel through the moments that turned working machines into a lasting scientific legacy.</p><div class="timeline-facts"><span><b>${all.length}</b> objects</span><span><b>${new Set(all.map(record=>record.world)).size}</b> worlds</span><span>One shared story</span></div></div></div>
 <div class="timeline-toolbar"><div class="timeline-worlds" role="group" aria-label="Filter timeline by world">${['All','Moon','Mars'].map(world=>`<button type="button" data-timeline-world="${world}" aria-pressed="${timelineState.world===world}">${world==='All'?'Both worlds':world}</button>`).join('')}</div><label class="timeline-era-label">Jump to decade<select id="timeline-era"></select></label><button type="button" id="timeline-play" aria-pressed="false">Play journey ▷</button></div>
 <p class="timeline-play-hint caption">Explore at your own pace, or play a stop every 6.5 seconds.</p>
 <article class="timeline-feature" id="timeline-feature" aria-label="Selected mission story"></article>
 <div class="timeline-transport"><button type="button" id="timeline-prev" aria-label="Previous timeline milestone">← Previous</button><div class="timeline-position" role="status" aria-atomic="true"></div><button type="button" id="timeline-next" aria-label="Next timeline milestone">Next →</button></div>
 <label class="timeline-scrub" for="timeline-scrubber"><span>Move through the milestones <span class="timeline-range-label"></span></span><input id="timeline-scrubber" type="range" min="0" max="${records.length-1}" value="0" step="1" aria-controls="timeline-feature"></label>
 <div class="timeline-rail-heading"><h3>Choose your next moment.</h3><span class="caption" id="timeline-rail-help">Swipe or scroll the cards · Arrow keys, Home / End</span></div><div class="timeline-rail" role="group" aria-label="Chronological mission milestones" aria-describedby="timeline-rail-help"></div>
 <p class="timeline-scale-note caption">Milestones are in chronological order with equal spacing between stops, not a proportional time scale. Each date identifies its event: arrival, deployment or final flight. Open “Mission in moments” for the wider history.</p>`;
 main.replaceChildren(section);
 const feature=section.querySelector('.timeline-feature'),rail=section.querySelector('.timeline-rail'),scrubber=section.querySelector('#timeline-scrubber'),era=section.querySelector('#timeline-era'),playButton=section.querySelector('#timeline-play');
 const escape=escapeMuseumText;
 const sourceLink=(url,label='NASA evidence ↗')=>`<a href="${escape(url)}" target="_blank" rel="noopener">${label}</a>`;
 function updatePlay(){playButton.textContent=playing?'Pause journey Ⅱ':'Play journey ▷';playButton.setAttribute('aria-pressed',String(playing));playButton.disabled=motionPreference.matches||records.length<2;section.classList.toggle('journey-playing',playing);section.querySelector('.timeline-play-hint').textContent=motionPreference.matches?'Reduced motion is on. Use the cards, arrows or slider to explore.':playing?'Playing one stop every 6.5 seconds. Interact with the timeline to pause.':'Explore at your own pace, or play a stop every 6.5 seconds.';}
 function pause(){playing=false;clearTimeout(timer);timer=0;updatePlay();}
 function stopAnimations(){animations.forEach(animation=>animation.cancel());animations=[];}
 function show(next,{manual=true,animate=true,scroll=true}={}){
  if(disposed)return;
  if(manual)pause();
  index=Math.max(0,Math.min(records.length-1,next));
  const record=records[index];timelineState.id=record.id;
  stopAnimations();
  feature.dataset.world=record.world;
  feature.innerHTML=`<figure class="timeline-visual">${museumImage(record,{className:'timeline-hero-image',loading:'eager'})}<div class="timeline-image-shade" aria-hidden="true"></div><span class="timeline-visual-label">${escape(record.world)} / ${escape(record.mission)}</span><span class="timeline-year" aria-hidden="true">${record.date.slice(0,4)}</span><figcaption>${escape(record.imageMeta?.type||'Archival imagery')} · ${escape(record.credit)}${record.imageMeta?.source?' · '+sourceLink(record.imageMeta.source,'Image record ↗'):''}</figcaption></figure>
  <div class="timeline-narrative"><div class="eyebrow">${escape(record.dateLabel)} / <time datetime="${record.date}">${timelineDate(record.date)}</time></div><h3>${escape(record.name)}</h3><p class="timeline-hook">${escape(record.hook)}</p><p class="timeline-story">${escape(record.story)}</p><div class="timeline-discovery"><span class="eyebrow">What it made possible</span><p>${escape(record.discovery?.text||record.science)}</p>${sourceLink(record.discovery?.source||record.source,'Scientific legacy ↗')}</div><div class="timeline-story-actions"><a class="button primary" href="#exhibit/${record.id}">Enter this exhibit ↗</a>${sourceLink(timelineEvidence(record),'Milestone source ↗')}</div><details class="timeline-moments"><summary>Mission in moments · ${record.events.length} milestones</summary><ol>${record.events.map(event=>`<li><time datetime="${event.date}">${timelineDate(event.date)}</time><div><h4>${escape(event.label)}</h4><p>${escape(event.detail)}</p>${sourceLink(event.source)}</div></li>`).join('')}</ol><div class="timeline-final"><h4>What stayed behind</h4><p>${escape(record.finalOutcome.text)}</p>${sourceLink(record.finalOutcome.source)}</div></details></div>`;
  scrubber.value=index;scrubber.setAttribute('aria-valuetext',`${timelineDate(record.date)}: ${record.name}, ${record.dateLabel}`);
  era.value=String(Math.floor(Number(record.date.slice(0,4))/10)*10);
  section.querySelector('#timeline-prev').disabled=index===0;section.querySelector('#timeline-next').disabled=index===records.length-1;
  section.querySelector('.timeline-position').innerHTML=`${String(index+1).padStart(2,'0')} / ${String(records.length).padStart(2,'0')} · ${record.world} · ${record.date.slice(0,4)}<span class="timeline-status-name"> · ${escape(record.name)} · ${escape(record.dateLabel)}</span>`;
  section.querySelector('.timeline-range-label').textContent=records[0].date.slice(0,4)+'—'+records.at(-1).date.slice(0,4);
  section.style.setProperty('--timeline-progress',String(records.length>1?index/(records.length-1):0));
  rail.querySelectorAll('[data-timeline-stop]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.timelineStop===record.id)));
  const active=rail.querySelector(`[data-timeline-stop="${record.id}"]`);
  if(scroll&&active&&rail.scrollTo){const left=rail.scrollLeft+active.getBoundingClientRect().left-rail.getBoundingClientRect().left-(rail.clientWidth-active.getBoundingClientRect().width)/2;rail.scrollTo({left:Math.max(0,left),behavior:motionPreference.matches||!animate?'instant':'smooth'});}
  if(animate&&!motionPreference.matches&&feature.animate){animations.push(feature.animate([{opacity:.25,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:380,easing:'cubic-bezier(.2,.7,.2,1)'}));const image=feature.querySelector('img');if(image?.animate)animations.push(image.animate([{transform:'scale(1.035)'},{transform:'scale(1)'}],{duration:850,easing:'ease-out'}));}
 }
 function populate(){
  era.innerHTML=timelineDecades(records).map(decade=>`<option value="${decade}">${decade}s</option>`).join('');
  scrubber.max=records.length-1;scrubber.disabled=records.length<2;
  rail.innerHTML=records.map((record,i)=>`<button type="button" class="timeline-stop" data-timeline-stop="${record.id}" aria-pressed="false" aria-controls="timeline-feature"><span class="timeline-stop-head"><time datetime="${record.date}">${timelineDate(record.date)}</time><span>${String(i+1).padStart(2,'0')}</span></span><span class="timeline-stop-dot" aria-hidden="true"></span><span class="timeline-stop-photo" aria-hidden="true">${museumImage(record)}</span><span class="timeline-stop-name">${escape(record.name)}</span><span class="timeline-stop-event">${escape(record.world)} / ${escape(record.dateLabel)}</span></button>`).join('');
  rail.querySelectorAll('[data-timeline-stop]').forEach((button,i)=>button.onclick=()=>show(i));
  const remembered=records.findIndex(record=>record.id===timelineState.id);show(remembered<0?0:remembered,{animate:false});
 }
 section.querySelectorAll('[data-timeline-world]').forEach(button=>button.onclick=()=>{pause();timelineState.world=button.dataset.timelineWorld;records=timelineRecords(timelineState.world);section.querySelectorAll('[data-timeline-world]').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));populate();});
 section.querySelector('#timeline-prev').onclick=()=>show(index-1);section.querySelector('#timeline-next').onclick=()=>show(index+1);
 scrubber.oninput=()=>show(Number(scrubber.value));era.onchange=()=>show(records.findIndex(record=>Math.floor(Number(record.date.slice(0,4))/10)*10===Number(era.value)));
 rail.onkeydown=event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const buttons=[...rail.querySelectorAll('[data-timeline-stop]')],current=buttons.indexOf(event.target);if(current<0)return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?records.length-1:Math.max(0,Math.min(records.length-1,current+(event.key==='ArrowRight'?1:-1)));show(next);buttons[next].focus({preventScroll:true});};
 function schedule(){clearTimeout(timer);timer=setTimeout(()=>{timer=0;if(disposed||!playing)return;if(document.hidden||!visible||motionPreference.matches){pause();return;}show(index+1,{manual:false});if(index===records.length-1)pause();else schedule();},6500);}
 playButton.onclick=()=>{if(playing){pause();return;}if(motionPreference.matches||document.hidden||!visible)return;if(index===records.length-1)show(0,{manual:false});playing=true;updatePlay();schedule();};
 // Reading, keyboard focus and manual navigation always take priority over play.
 for(const target of [feature,rail,scrubber,era]){target.addEventListener('focusin',pause);target.addEventListener('pointerdown',pause);}
 section.addEventListener('keydown',event=>{if(event.key==='Escape')pause();});
 const visibility=()=>{if(document.hidden){pause();stopAnimations();}};document.addEventListener('visibilitychange',visibility);
 const motionChange=()=>{pause();stopAnimations();};motionPreference.addEventListener?.('change',motionChange);
 const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){pause();stopAnimations();}}):null;observer?.observe(feature);
 populate();
 stopTimeline=()=>{disposed=true;pause();stopAnimations();observer?.disconnect();document.removeEventListener('visibilitychange',visibility);motionPreference.removeEventListener?.('change',motionChange);};
}
