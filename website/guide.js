/* Mission Guide: local, source-grounded retrieval with an optional, explicit provider opt-in. */
(() => {
  'use strict';
  if (window.MissionGuide) return;
  const all = () => typeof exhibits !== 'undefined' ? exhibits : [];
  const knowledge = () => typeof museumKnowledge !== 'undefined' ? museumKnowledge : [];
  const contexts = () => typeof artifactContext !== 'undefined' ? artifactContext : {};
  const normalize = text => String(text || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const current = () => all().find(record => location.hash === '#exhibit/' + record.id);
  const recordById = id => all().find(record => record.id === id);
  const approvedRoutes = () => new Set(['#home','#collection','#atlas','#timeline','#challenge','#sources','#about', ...all().map(record => '#exhibit/' + record.id)]);
  const validRoute = route => typeof route === 'string' && approvedRoutes().has(route);
  function trustedURLs() {
    const set = new Set();
    function visit(value) {
      if (typeof value === 'string' && /^https:\/\//.test(value)) {
        try { const url = new URL(value); if (url.hostname === 'nasa.gov' || url.hostname.endsWith('.nasa.gov') || url.hostname === 'lroc.im-ldi.com') set.add(value); } catch {}
      } else if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') Object.values(value).forEach(visit);
    }
    all().forEach(visit); knowledge().forEach(visit); Object.values(contexts()).forEach(visit);
    return set;
  }
  function cleanSources(items) {
    const allowed = trustedURLs();
    return (items || []).filter(item => item && allowed.has(item.url)).filter((item,index,array) => array.findIndex(other => other.url === item.url) === index).slice(0,4).map(item => ({title:String(item.title || 'NASA source').slice(0,120),url:item.url}));
  }
  function sourcesFor(record, extra) {
    return cleanSources([...(extra ? [{title:'Supporting NASA record',url:extra}] : []), ...(record.references || []), {title:record.sourceName || record.mission,url:record.source}]);
  }
  const exhibitAction = record => ({label:'Explore ' + record.name, route:'#exhibit/' + record.id});
  const action = (label, route, tool, world) => ({label,route,tool,world});
  const stopWords = new Set('a an and are as at be can could did do does for from have how i in is it me my of on or please show tell that the their these they this to was were what when where which who why with would you your about find want know'.split(' '));
  const synonyms = {moon:'lunar',lunar:'moon',rover:'roving',rovers:'rover',helicopter:'ingenuity',quakes:'seismic',marsquake:'seismic',marsquakes:'seismic',seismometer:'seismic',experiments:'instruments',experiment:'instrument',equipment:'hardware',abandoned:'left',ended:'final',stopped:'final',ending:'final'};
  function tokens(question) { return [...new Set(normalize(question).split(' ').filter(word=>word.length>1 && !stopWords.has(word)).flatMap(word=>[word, synonyms[word]].filter(Boolean)))]; }
  function rank(question) {
    const terms = tokens(question);
    return all().map(record => {
      const identity = normalize([record.name,record.mission,record.id,...(record.aliases||[])].join(' '));
      const body = normalize([record.world,record.place,record.story,record.science,record.status,JSON.stringify(record.facts),JSON.stringify(record.events||[]),JSON.stringify(record.instruments||[])].join(' '));
      const score = terms.reduce((sum,term)=>sum+(identity.includes(term)?5:body.includes(term)?1:0),0);
      return {record,score};
    }).filter(item=>item.score>0).sort((a,b)=>b.score-a.score);
  }
  function matchKnowledge(question) {
    const q=normalize(question); const terms=tokens(question);
    return knowledge().map(item=>{
      const keywords=Array.isArray(item.keywords)?item.keywords:[item.keywords||''];
      const score=keywords.reduce((sum,keyword)=>{const phrase=normalize(keyword);if(!phrase)return sum;const keyTerms=phrase.split(' ').filter(word=>!stopWords.has(word));const wordMatch=keyTerms.length>1&&keyTerms.every(word=>q.split(' ').includes(word));return sum+(q.includes(phrase)?phrase.includes(' ')?8:3:wordMatch?6:0);},0);
      return {item,score};
    }).filter(result=>result.score>=3).sort((a,b)=>b.score-a.score)[0]?.item;
  }
  function builtInAnswer(question) {
    const q=normalize(question); const active=current();
    const local = {text:'',sources:[],actions:[]};
    if (!q) return {text:'Ask about a mission, a discovery, or a place in the museum.',sources:[],actions:[]};
    if (/\b(timeline|chronolog|history of missions)\b/.test(q)) return {...local,text:'The timeline follows the collection from its earliest landing to Ingenuity’s final flight. Each entry labels the event its date describes.',actions:[action('Open the timeline','#timeline')]};
    if (/\b(compare|comparison)\b/.test(q) && !/\b(spirit|difference)\b/.test(q)) return {...local,text:'Compare two artifacts side by side in the Discovery Room. Choose each artifact to examine its purpose, status and scientific contribution.',actions:[action('Compare artifacts','#home','compare')]};
    if (/\b(science experiments|science in motion|animations|science lab|interactive science)\b/.test(q)) return {...local,text:'Science in motion lets you step through simplified illustrations of airbag landing, seismic investigations and Ingenuity’s flight legacy. The illustrations are not NASA telemetry.',actions:[action('Open Science in motion','#home','science')]};
    if (/\b(atlas|map|surface explorer)\b/.test(q)) return {...local,text:'The surface explorer groups artifacts by Moon or Mars. Select a world and an artifact to open its story. The illustrated view arranges sites for readability; it does not place them geographically.',actions:[action('Open the surface explorer','#atlas','atlas',q.includes('mars')?'Mars':q.includes('moon')?'Moon':undefined)]};
    if (/\b(tour|journey|five minutes|5 minutes|explore first|recommend|where to start)\b/.test(q)) return {...local,text:'Choose a short journey through existing exhibits. You control each stop and can leave the journey at any time.',journeys:true,actions:[]};
    if (/\b(source|sources|research|references|data set|datasets)\b/.test(q) && !rank(q).some(item=>item.score>=5)) return {...local,text:'The research desk collects exhibit references and the supplied archive links. These are curated NASA records, not a live data feed.',actions:[action('Visit the research desk','#sources')]};
    if (/\b(moon|lunar|mars)\b/.test(q) && /\b(show|where|find|missions|rovers|collection|explore)\b/.test(q) && !/\b(apollo|opportunity|spirit|ingenuity|insight|pathfinder|viking|surveyor)\b/.test(q)) {
      const world=/\b(moon|lunar)\b/.test(q)?'Moon':'Mars';
      return {...local,text:'Explore the '+world+' collection of hardware, landers and mission stories. Some are complete spacecraft; others are parts of the systems that delivered them.',actions:[action('Show '+world+' exhibits','#collection','collection',world),action('Explore '+world+' sites','#atlas','atlas',world)]};
    }
    const entry=matchKnowledge(q);
    if (entry) return {...local,text:entry.answer,sources:cleanSources([{title:entry.title || 'NASA research record',url:entry.source},...(entry.sources||[]).map(url=>({title:'Supporting NASA record',url}))]),actions:(entry.related||[]).map(recordById).filter(Boolean).slice(0,3).map(exhibitAction)};
    const ranked=rank(q);
    const genericAliases=new Set(['rover','shield','flight','experiments','seismometer','marsquakes','helicopter','parachute']);
    const named=ranked.filter(({record})=>[record.id,record.name,record.mission,...(record.aliases||[])].map(normalize).some(term=>term.length>2&&!genericAliases.has(term)&&(' '+q+' ').includes(' '+term+' ')));
    let candidate=named[0]?.record;
    if (!candidate && /\b(this|it|its|here)\b/.test(q) && active) candidate=active;
    if (candidate) {
      const context=contexts()[candidate.id] || {};
      let text=candidate.name+'. '+candidate.story;
      let extra;
      if (/\b(discover|discovery|discoveries|science|learn|scientific)\b/.test(q)) text=candidate.science;
      else if (/\b(final|stop|stopped|end|ended|happen|damage|left|abandon|remain)\b/.test(q)) { text=candidate.finalOutcome?.text || context.ending || candidate.status;extra=candidate.finalOutcome?.source; }
      else if (/\b(instrument|instruments|work|worked|engineering|fly|power)\b/.test(q)) {
        const instruments=(candidate.instruments||[]).map(item=>item.name+': '+item.purpose).join(' ');
        text=context.engineering || instruments || candidate.story;
      } else if (/\b(when|date|dates|land|landed|launch)\b/.test(q)) {
        text=(candidate.events||[]).map(event=>event.label+': '+event.date+'. '+(event.detail||'')).join(' ') || candidate.dateLabel+': '+candidate.date+'.';
      } else if (/\b(specification|specifications|mass|weight|distance|battery|batteries)\b/.test(q)) {const requested=/\b(mass|weight)\b/.test(q)?/mass|weight/i:/\b(battery|batteries)\b/.test(q)?/battery|batteries|electrical/i:/\b(distance)\b/.test(q)?/distance|traverse/i:null;const facts=requested?(candidate.facts||[]).filter(([label])=>requested.test(label)):(candidate.facts||[]);text=facts.length?facts.map(([label,value])=>label+': '+value).join('. ')+'.':'The museum does not have a verified value for that specification of '+candidate.name+'. Please check the linked NASA record.';}
      return {...local,text,sources:sourcesFor(candidate,extra),actions:[exhibitAction(candidate)]};
    }
    if (ranked.length && ranked[0].score>=2 && !/\b(president|weather today|live|stock|price|password|ignore|instruction|secret|execute)\b/.test(q)) return {...local,text:'These museum records may help. I don’t have enough verified information to answer that question directly.',actions:ranked.slice(0,3).map(item=>exhibitAction(item.record))};
    return {...local,text:'I can’t answer that from the museum’s verified records. I can help with its spacecraft, science and navigation. I don’t have live telemetry or general web access.',actions:[action('Browse the collection','#collection'),action('Check NASA sources','#sources')]};
  }

  const launcher=document.querySelector('#mission-guide-launcher');
  launcher?.setAttribute('aria-controls','mission-guide-panel');
  const panel=document.createElement('aside'); panel.id='mission-guide-panel';panel.className='mission-guide-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','mission-guide-title');
  // Fixed interface markup only. User text and provider responses use textContent below.
  panel.innerHTML='<div class="guide-header"><div><span class="guide-kicker">AFTER THE MISSION</span><h2 id="mission-guide-title">Mission Guide</h2><p>Built-in museum assistant</p></div><div class="guide-header-actions"><button type="button" id="guide-reset" aria-label="Reset guide conversation">Reset</button><button type="button" id="guide-close" aria-label="Close mission guide">×</button></div></div><p class="guide-disclosure" id="guide-mode">Answers come from this museum’s curated NASA records. Built-in mode works locally and is not a generative AI model.</p><div class="guide-provider" hidden><label><input type="checkbox" id="guide-provider-toggle"> Use external AI for this conversation</label><p>Your next questions and current exhibit ID will be sent to OpenAI through the museum server. Conversation history and saved notes stay here. AI can make mistakes; check the sources.</p></div><div class="guide-context" id="guide-context"></div><div class="guide-messages" id="guide-messages" role="log" aria-label="Mission Guide conversation" aria-live="polite" aria-relevant="additions" tabindex="0"></div><div class="guide-journey" hidden></div><div class="guide-suggestions" aria-label="Suggested questions"></div><p class="guide-status" id="guide-status" role="status"></p><form class="guide-form"><label class="guide-label" for="guide-question">Ask your mission guide</label><div><textarea id="guide-question" name="question" rows="2" maxlength="1000" placeholder="Ask about a mission or find an exhibit…" required></textarea><button type="submit" id="guide-send">Send ↗</button></div><p>Enter to send · Shift + Enter for a new line</p></form>';
  document.body.append(panel);
  const messages=panel.querySelector('#guide-messages'); const input=panel.querySelector('#guide-question');const status=panel.querySelector('#guide-status');const send=panel.querySelector('#guide-send'); const provider=panel.querySelector('#guide-provider-toggle');
  const config=window.MISSION_GUIDE_CONFIG || {};
  let endpoint;
  if (config.enabled===true && location.protocol!=='file:') {
    try { const url=new URL(config.endpoint || '/api/guide',location.href);if(url.origin===location.origin && url.pathname==='/api/guide' && !url.search && !url.hash) endpoint=url.href; } catch {}
  }
  panel.querySelector('.guide-provider').hidden=!endpoint;
  let pending=false;let abort;let requestVersion=0;let returnFocus;let journey;let lastContext='';
  const journeys=[
    {name:'Explore Mars in 5 Minutes',ids:['viking','pathfinder','shield','insight','ingenuity']},
    {name:'The Forgotten Machines of the Moon',ids:['surveyor','eagle','rover','alsep']},
    {name:'NASA’s Surprising Discoveries',ids:['surveyor','shield','insight','ingenuity']},
    {name:'From First Landing to Final Signal',ids:['surveyor','eagle','viking','pathfinder','ingenuity']}
  ];
  function el(tag,className,text) {const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function navigate(item) {
    if (!item || !validRoute(item.route)) return;
    if (item.tool) {window.dispatchEvent(new CustomEvent('museum-action',{detail:{tool:item.tool,world:['Moon','Mars'].includes(item.world)?item.world:undefined}}));}
    else if(location.hash===item.route) document.querySelector('main')?.focus({preventScroll:true});
    else location.hash=item.route;
  }
  function addMessage(role,text,details={}) {
    const article=el('article','guide-message '+(role==='user'?'guide-user':'guide-answer'));
    article.append(el('span','guide-speaker',role==='user'?'You':'Mission Guide'),el('p','guide-answer-text',String(text).slice(0,10000)));
    const sources=cleanSources(details.sources);
    if(sources.length){const list=el('div','guide-sources');list.append(el('span',null,'NASA sources'));sources.forEach(source=>{const link=el('a',null,source.title+' ↗');link.href=source.url;link.target='_blank';link.rel='noopener';list.append(link);});article.append(list);}
    if(details.actions?.length){const controls=el('div','guide-message-actions');details.actions.slice(0,4).filter(item=>validRoute(item.route)).forEach(item=>{const button=el('button',null,item.label);button.type='button';button.onclick=()=>navigate(item);controls.append(button);});article.append(controls);}
    if(details.journeys){const list=el('div','guide-message-actions');journeys.forEach((item,i)=>{const button=el('button',null,item.name);button.type='button';button.onclick=()=>startJourney(i);list.append(button);});article.append(list);}
    messages.append(article);
    while(messages.children.length>40)messages.firstElementChild.remove();
    messages.scrollTop=messages.scrollHeight;
  }
  function greet(){addMessage('assistant','Welcome to After the Mission. I can help you explore spacecraft, discover the science they enabled, and find your way through the museum. What would you like to explore?');}
  function renderJourney(){const target=panel.querySelector('.guide-journey');target.replaceChildren();target.hidden=!journey;if(!journey)return;const record=recordById(journey.ids[journey.index]);target.append(el('strong',null,journey.name),el('p',null,'Stop '+(journey.index+1)+' of '+journey.ids.length+' · '+record.name));const controls=el('div','guide-message-actions');const visit=el('button',null,'Open this stop');visit.type='button';visit.onclick=()=>navigate(exhibitAction(record));controls.append(visit);if(journey.index>0){const prev=el('button',null,'Previous');prev.type='button';prev.onclick=()=>{journey.index--;renderJourney();navigate(exhibitAction(recordById(journey.ids[journey.index])));};controls.append(prev);}const next=el('button',null,journey.index===journey.ids.length-1?'Finish journey':'Next stop →');next.type='button';next.onclick=()=>{if(journey.index===journey.ids.length-1){journey=null;renderJourney();addMessage('assistant','You’ve reached the end of this journey. Try the field challenge to connect the hardware with its purpose.',{actions:[action('Take the field challenge','#challenge')]});return;}journey.index++;renderJourney();navigate(exhibitAction(recordById(journey.ids[journey.index])));};controls.append(next);const exit=el('button',null,'Exit journey');exit.type='button';exit.onclick=()=>{journey=null;renderJourney();status.textContent='Journey ended. You can keep exploring freely.';};controls.append(exit);target.append(controls);}
  function startJourney(index){const item=journeys[index];if(!item)return;journey={...item,ids:item.ids.filter(id=>recordById(id)),index:0};renderJourney();navigate(exhibitAction(recordById(journey.ids[0])));}
  function updateContext(){const record=current();const name=record?record.name:(location.hash.slice(1)||'home').replace(/-/g,' ');panel.querySelector('#guide-context').textContent='You’re exploring · '+name;const suggestions=record?['What did '+record.mission+' discover?','What happened to '+record.mission+'?','Recommend a short journey']:location.hash==='#atlas'?['Show me the Moon missions','How do I use the atlas?','Show me the Mars missions']:['Where can I find the Mars rovers?','What is a marsquake?','Recommend a short journey'];if(lastContext===name)return;lastContext=name;const list=panel.querySelector('.guide-suggestions');list.replaceChildren();suggestions.forEach(text=>{const button=el('button',null,text);button.type='button';button.onclick=()=>ask(text);list.append(button);});}
  async function externalAnswer(question,signal){const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({question,exhibitId:current()?.id}),signal});if(!response.ok)throw new Error('Provider unavailable');const payload=await response.json();if(typeof payload.answer!=='string'||!payload.answer.trim()||payload.answer.length>10000)throw new Error('Invalid provider reply');let sources=payload.sources;if(Array.isArray(payload.sourceIds))sources=payload.sourceIds.map(recordById).filter(Boolean).flatMap(record=>sourcesFor(record));const actions=(Array.isArray(payload.actions)?payload.actions:[]).map(item=>typeof item==='string'?{label:'Explore '+item.slice(1),route:item}:item).filter(item=>validRoute(item?.route)).map(item=>({label:String(item.label||'Explore this museum page').slice(0,120),route:item.route}));const cleaned=cleanSources(sources);if(!cleaned.length)throw new Error('No grounded source');return {text:payload.answer,sources:cleaned,actions};}
  async function ask(question){question=String(question||'').trim().slice(0,1000);if(!question||pending)return;addMessage('user',question);input.value='';pending=true;send.disabled=true;input.readOnly=true;const version=++requestVersion;const local=builtInAnswer(question);let result=local;let usedAI=false;let timeout;
    try{if(endpoint&&provider.checked){status.textContent='Asking OpenAI through the museum server…';abort=new AbortController();timeout=setTimeout(()=>abort.abort(),15000);try{result=await externalAnswer(question,abort.signal);usedAI=true;}catch{if(version!==requestVersion)return;status.textContent='External AI is unavailable. Showing the built-in museum answer instead.';}}else status.textContent='Searching the museum’s NASA records…';if(version!==requestVersion)return;addMessage('assistant',result.text,result);if(usedAI)status.textContent='External AI response · Check its NASA sources.';else if(!status.textContent.includes('unavailable'))status.textContent='Answered locally from the museum’s records.';}
    finally{clearTimeout(timeout);if(version===requestVersion){pending=false;send.disabled=false;input.readOnly=false;abort=null;}}
  }
  function open(){returnFocus=document.activeElement;panel.hidden=false;launcher?.setAttribute('aria-expanded','true');updateContext();input.focus({preventScroll:true});}
  function close(){panel.hidden=true;launcher?.setAttribute('aria-expanded','false');(returnFocus?.isConnected?returnFocus:launcher)?.focus({preventScroll:true});}
  panel.querySelector('#guide-close').onclick=close;
  panel.querySelector('#guide-reset').onclick=()=>{requestVersion++;abort?.abort();pending=false;send.disabled=false;input.readOnly=false;input.value='';messages.replaceChildren();journey=null;renderJourney();provider.checked=false;status.textContent='Conversation reset. Built-in mode is active.';greet();input.focus({preventScroll:true});};
  panel.querySelector('form').onsubmit=event=>{event.preventDefault();ask(input.value);};
  input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();ask(input.value);}});
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}});
  provider.onchange=()=>{status.textContent=provider.checked?'External AI selected. Your next question and current exhibit ID will be sent to OpenAI.':'Built-in mode selected. Your questions stay in this page.';};
  window.addEventListener('hashchange',updateContext);
  window.updateMissionGuideContext=updateContext;
  window.MissionGuide={open,close,toggle:()=>panel.hidden?open():close(),answer:builtInAnswer,ask,validRoute,cleanSources};
  greet();updateContext();
})();


