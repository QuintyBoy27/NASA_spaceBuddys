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
        try { const url = new URL(value); if (url.hostname === 'nasa.gov' || url.hostname.endsWith('.nasa.gov') || url.hostname === 'lroc.im-ldi.com' || (url.hostname === 'github.com' && url.pathname.startsWith('/asc-csa/'))) set.add(value); } catch {}
      } else if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') Object.values(value).forEach(visit);
    }
    all().forEach(visit); knowledge().forEach(visit); if(typeof researchResources!=='undefined')researchResources.forEach(visit); Object.values(contexts()).forEach(visit);
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
  const stopWords = new Set('help looking locate search take bring actually now okay ok hi hello hey pls please something anything interesting information some a an and are as at be can could did do does for from have how i in is it me my of on or please show tell that the their these they this to was were what when where which who why with would you your about find want know'.split(' '));
  const synonyms = {moon:'lunar',lunar:'moon',rover:'roving',rovers:'rover',helicopter:'ingenuity',quakes:'seismic',marsquake:'seismic',marsquakes:'seismic',seismometer:'seismic',experiments:'instruments',experiment:'instrument',equipment:'hardware',abandoned:'left',ended:'final',stopped:'final',ending:'final'};
  function tokens(question) { return [...new Set(normalize(question).split(' ').filter(word=>word.length>1 && !stopWords.has(word)).flatMap(word=>[word, synonyms[word]].filter(Boolean)))]; }
  function rank(question) {
    const terms = tokens(question);
    return all().map(record => {
      const identity = normalize([record.name,record.mission,record.id,...(record.aliases||[])].join(' '));
      const body = normalize([record.world,record.place,record.story,record.science,record.status,JSON.stringify(record.facts),JSON.stringify(record.events||[]),JSON.stringify(record.instruments||[])].join(' '));
      const score = terms.reduce((sum,term)=>sum+(identity.split(' ').includes(term)?5:body.split(' ').includes(term)?1:0),0);
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
  function museumAnswer(question) {
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

  // Conversation state stays in memory and is never sent to an external provider.
  const conversation = { subjectId:null, choices:[], world:null };
  const genericNames = new Set(['moon','mars','lunar','rover','rovers','lander','landers','flight','experiments','hardware','equipment','robot','shield','parachute','helicopter','seismic','seismometer','instruments']);
  function resetConversation() {conversation.subjectId=null;conversation.choices=[];conversation.world=null;}
  function distance(a,b) {
    let row=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}
    return row[b.length];
  }
  function interpretSpelling(question) {
    const dictionary=['opportunity','ingenuity','insight','pathfinder','sojourner','surveyor','viking','apollo','perseverance','timeline','compare','atlas','seismometer'];
    const corrections=[];
    const q=normalize(question).split(' ').map(word=>{
      if(word.length<5||dictionary.includes(word)||stopWords.has(word))return word;
      const scored=dictionary.map(name=>({name,score:distance(word,name)})).sort((a,b)=>a.score-b.score);
      if(scored[0].score<=(word.length>7?2:1)&&scored[0].score<scored[1].score){corrections.push(scored[0].name);return scored[0].name;}return word;
    }).join(' ');
    return {q,corrections};
  }
  function namedRecords(question) {
    const q=' '+question+' ';
    const special={opportunity:'shield',oppy:'shield',sojourner:'pathfinder','lunar rover':'rover','moon buggy':'rover',perseverance:'backshell'};
    const explicit=new Set(Object.entries(special).filter(([name])=>q.includes(' '+name+' ')).map(([,id])=>id));
    return all().filter(record=>explicit.has(record.id)||[record.id,record.name,record.mission,...(record.aliases||[])].map(normalize).some(name=>name.length>2&&!genericNames.has(name)&&q.includes(' '+name+' ')));
  }
  function remember(result) {
    if(result.subjectIds?.length===1){conversation.subjectId=result.subjectIds[0];conversation.choices=[];}
    else if(result.choices?.length){conversation.choices=result.choices;conversation.subjectId=null;}
    return result;
  }
  function missionReply(record, question, navigating=false) {
    let result;
    if(navigating)result={text:'I found '+record.name+'. '+(record.id==='shield'?'This exhibit is Opportunity’s discarded heat shield, with links to the rover’s wider story.':record.hook),sources:sourcesFor(record),actions:[exhibitAction(record)]};
    else if(/\b(source|sources|citation|citations|reference|references)\b/.test(question))result={text:'Here are the NASA records behind '+record.name+'. Its exhibit also links individual events and discoveries to their evidence.',sources:sourcesFor(record),actions:[exhibitAction(record)]};
    else if(/\b(location|located|landing site)\b/.test(question)||/^where (?:is|was|did)/.test(question))result={text:record.name+' is associated with '+record.place+'. The atlas shows a schematic of the collection rather than a precise geographic position.',sources:sourcesFor(record),actions:[exhibitAction(record),action('Open its world in the atlas','#atlas','atlas',record.world)]};
    else if(/\b(when|date|dates)\b/.test(question)) {
      const eventPattern=/\b(launch|launched|takeoff)\b/.test(question)?/launch/i:/\b(land|landed|arrive|arrived|arrival|touchdown)\b/.test(question)?/land|arrival|deployment/i:/\b(end|ended|stop|stopped|final|last)\b/.test(question)?/last|final|end|retire|shutdown|liftoff|departure/i:null;
      const events=eventPattern?(record.events||[]).filter(event=>eventPattern.test(event.label)):(record.events||[]);
      result={text:events.length?record.name+': '+events.map(event=>event.label+' — '+event.date+'. '+event.detail).join(' '):'I don’t have that specific event date verified for '+record.name+'. The linked NASA records may help.',sources:cleanSources(events.map(event=>({title:record.mission+' · '+event.label,url:event.source})).concat(sourcesFor(record))),actions:[exhibitAction(record)]};
    } else {
      // Resolve pronouns using the topic under discussion without modifying the visitor's text.
      const topic=record.id==='shield'?'Opportunity':record.id==='rover'?'Apollo 15':record.mission;
      let factualQuestion=question+' '+topic;
      if(/\b(stop|stopped|end|ended|happened|die|died)\b/.test(question)&&record.id==='shield'&&!question.includes('heat shield'))factualQuestion+=' opportunity stop';
      if(/\b(stop|stopped|end|ended|happened)\b/.test(question)&&record.id==='insight')factualQuestion+=' insight end';
      result=museumAnswer(factualQuestion);
      if(!result.actions?.some(item=>item.route==='#exhibit/'+record.id))result.actions=[exhibitAction(record),...(result.actions||[])].slice(0,4);
    }
    return remember({...result,subjectIds:[record.id]});
  }
  function builtInAnswer(question) {
    const {q,corrections}=interpretSpelling(question);
    const empty={text:'',sources:[],actions:[]};
    const present=result=>corrections.length?{...result,text:'I interpreted that as '+corrections.join(', ')+'. '+result.text}:result;
    if(/\b(point cloud|point clouds|terrain tutorial|analogue terrain|csa terrain)\b/.test(q)){const entry=knowledge().find(entry=>entry.id==='csa-terrain');return {...empty,text:entry.answer,sources:cleanSources([{title:'CSA terrain tutorial',url:entry.source}]),actions:[action('Open the atlas terrain lesson','#atlas','terrain')]};}
    if(/\b(alouette|isis|ionogram|ionograms|data afterlife|reception facilities|canadian archive)\b/.test(q)){const entry=knowledge().find(entry=>entry.id==='csa-archive');return {...empty,text:entry.answer,sources:cleanSources([{title:'CSA archive recovery project',url:entry.source}]),actions:[action('Open Data afterlife','#home','archive')]};}
    if(/\b(neossat|fits|radarsat|eodms|csa resources|canadian space agency)\b/.test(q)){const entry=knowledge().find(entry=>entry.id==='csa-neossat');return {...empty,text:entry.answer,sources:cleanSources([{title:'CSA telescope tutorial',url:entry.source},...(entry.sources||[]).map(url=>({title:'CSA Earth observation tutorial',url}))]),actions:[action('Open CSA research notes','#sources')]};}
    const navigation=/\b(find|locate|open|show|visit|take me|bring me|go to|looking for|search for|where can|where is|where are|help me find)\b/.test(q);
    const factual=/\b(why|how|when|what happened|what did|what is|what are|which.*longest|difference|versus|vs)\b/.test(q)&&!/^how (can|do) i (find|open|use|compare)/.test(q);
    if(/^(hi|hello|hey|hiya|good morning|good afternoon|good evening)( there| guide)?$/.test(q))return {...empty,text:'Hi! What would you like to explore? You can ask me to find a mission, explain a discovery, or help you use the museum.',actions:[action('Explore the collection','#collection'),action('Try the science activities','#home','science')]};
    if(/^(how are you|who are you|what is your name|are you a bot|are you ai)$/.test(q))return {...empty,text:'I’m Mission Guide, the museum’s built-in assistant. I’m here to help you find exhibits and explain their NASA research. In built-in mode I use curated records rather than a generative AI model. What would you like to explore?',actions:[action('Browse the museum','#collection')]};
    if(/^(yes|sure|okay|ok)$/.test(q))return {...empty,text:'What would you like to find—a mission, a photograph, a science activity, or a NASA source?',actions:[action('Find a mission','#collection'),action('Try a science activity','#home','science')]};
    if(/^(thanks|thank you|thankyou|thanks a lot|ok thanks|okay thanks|great thanks|cool thanks|perfect thanks)$/.test(q))return {...empty,text:'You’re welcome! Ask another question, or follow a connection to a different mission.',actions:conversation.subjectId?[exhibitAction(recordById(conversation.subjectId))]:[action('Explore the collection','#collection')]};
    if(!q||/^(help|help me|can you help me|i need help|what can you do|what can you help me with|help me find a mission|what can i ask|how does this work|what is this website|what is this museum)$/.test(q))return {...empty,text:'I can help you find missions, explain their science, and open the museum’s tools. Try “help me find InSight,” “show me Moon missions,” or “take me to the quiz.” After a mission comes up, you can ask “when did it land?” or “what did it discover?”',actions:[action('Browse missions','#collection'),action('Open the timeline','#timeline'),action('Compare artifacts','#home','compare')],journeys:true};
    if(/\b(quiz|quizzes|field challenge|test my knowledge|test myself)\b/.test(q))return {...empty,text:'The field challenge connects the objects with their purpose. You can answer each question and see an explanation.',actions:[action('Open the field challenge','#challenge')]};
    if(/\b(my notes|field notes|notebook|saved notes|my observations)\b/.test(q))return {...empty,text:'Your field notes are attached to individual exhibits. Open an exhibit and scroll to “Look closer” to write, revisit or download an observation. I don’t read your saved notes.',actions:conversation.subjectId?[exhibitAction(recordById(conversation.subjectId))]:[action('Choose an exhibit','#collection')]};
    if(/\b(homepage|home page|museum entrance|start page)\b/.test(q))return {...empty,text:'Here’s the museum entrance.',actions:[action('Return to the museum entrance','#home')]};
    if(/\b(photo|photos|pictures|images|photographs|gallery|archive)\b/.test(q)&&navigation&&!namedRecords(q).length)return {...empty,text:'Each exhibit has a credited NASA image you can inspect and zoom. The homepage also has a scrollable archive gallery.',actions:[action('Browse exhibit photographs','#collection'),action('Open the museum entrance','#home')]};
    if(/\b(timeline|chronological|chronology|compare|comparison|atlas|map|surface explorer|science experiments|science in motion|animations|science lab|interactive science|tour|journey|recommend)\b/.test(q)&&(!factual||/\b(use|compare|atlas|map)\b/.test(q)))return present(museumAnswer(q));
    let named=namedRecords(q);
    // A family name is intentionally ambiguous; do not pick a random Apollo object.
    if(/\bapollo\b/.test(q)&&!named.length&&!/\b(11|15|17)\b/.test(q)&&navigation)named=all().filter(record=>/^Apollo/.test(record.mission));
    const choiceMatch=q.match(/^(?:the |open |show me |i mean |number |option )?(first|second|third|fourth|last|1|2|3|4)(?: one| option| please)?$/);
    if(choiceMatch&&conversation.choices.length){const indices={first:0,second:1,third:2,fourth:3,'1':0,'2':1,'3':2,'4':3,last:conversation.choices.length-1};const chosen=recordById(conversation.choices[indices[choiceMatch[1]]]);if(chosen)return missionReply(chosen,q,true);}
    if(/\b(moon|lunar|mars|martian)\b/.test(q)&&!named.length&&(navigation||/^(and |what about |how about |on |the )?(the )?(moon|mars|lunar|martian)( missions)?$/.test(q))){const world=/\b(moon|lunar)\b/.test(q)?'Moon':'Mars';conversation.world=world;conversation.subjectId=null;conversation.choices=[];return {...empty,text:'Here are the '+world+' exhibits. You can browse their stories or explore them in the atlas.',actions:[action('Show '+world+' exhibits','#collection','collection',world),action('Explore '+world+' sites','#atlas','atlas',world)]};}
    if(named.length>1&&navigation)return present(remember({...empty,text:'I found a few possible matches. Which one did you mean?',actions:named.slice(0,4).map(exhibitAction),choices:named.slice(0,4).map(record=>record.id)}));
    if(named.length===1)return present(missionReply(named[0],q,navigation&&!factual&&!/\b(sources|references|citations)\b/.test(q)));
    const subject=recordById(conversation.subjectId)||current();
    if(subject&&/\b(it|its|this|that mission|that spacecraft|that rover|more|else)\b/.test(q))return missionReply(subject,q);
    if(!subject&&/\b(it|its|that mission|that spacecraft|that rover)\b/.test(q)&&factual)return {...empty,text:'Which mission do you mean? Tell me its name, or choose an exhibit first.',actions:[action('Browse the collection','#collection')]};
    if(/\b(source|sources|reference|references|research|datasets|data sets)\b/.test(q))return {...empty,text:'The research desk collects the mission records, image credits and archive links used by the museum.',actions:[action('Open NASA sources','#sources')]};
    if(typeof researchResources!=='undefined'&&navigation){const resource=researchResources.find(resource=>{const name=normalize(resource.title);return name.length>=4&&q.includes(name)||name.split(' ').some(word=>word.length>=5&&!['archive','catalog','mission','image','video','library','system','science'].includes(word)&&(' '+q+' ').includes(' '+word+' '));});if(resource)return {...empty,text:resource.title+' is listed as further reading in the research desk rather than as a separate museum exhibit. '+resource.description,sources:cleanSources([{title:resource.title,url:resource.url}]),actions:[action('Find '+resource.title+' in Sources','#sources')]};}
    const faq=matchKnowledge(q);
    if(faq)return remember({...museumAnswer(q),subjectIds:faq.related?.length===1?faq.related:undefined});
    if(navigation){const topical=rank(q).filter(item=>item.score>=1);const pool=/\b(rover|rovers|buggy)\b/.test(q)?all().filter(record=>['rover','pathfinder','shield'].includes(record.id)):topical.slice(0,4).map(item=>item.record);if(pool.length)return present(remember({...empty,text:'These exhibits may be what you’re looking for. Which would you like to explore?'+(pool.some(record=>record.id==='shield')?' Opportunity is represented here by its heat shield.':''),actions:pool.slice(0,4).map(exhibitAction),choices:pool.slice(0,4).map(record=>record.id)}));conversation.subjectId=null;conversation.choices=[];return {...empty,text:'I couldn’t find a clear match in this museum. Could you give me a mission name, an object, or a topic such as ancient water or marsquakes?',actions:[action('Browse all exhibits','#collection'),action('Check NASA sources','#sources')]};}
    return present(museumAnswer(q));
  }


  const launcher=document.querySelector('#mission-guide-launcher');
  launcher?.setAttribute('aria-controls','mission-guide-panel');
  const panel=document.createElement('aside'); panel.id='mission-guide-panel';panel.className='mission-guide-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','mission-guide-title');
  // Fixed interface markup only. User text and provider responses use textContent below.
  panel.innerHTML='<div class="guide-header"><div><span class="guide-kicker">AFTER THE MISSION</span><h2 id="mission-guide-title">Mission Guide</h2><p>Built-in museum assistant</p></div><div class="guide-header-actions"><button type="button" id="guide-reset" aria-label="Reset guide conversation">Reset</button><button type="button" id="guide-close" aria-label="Close mission guide">×</button></div></div><p class="guide-disclosure" id="guide-mode">Answers come from this museum’s curated NASA records. Built-in mode works locally and is not a generative AI model.</p><div class="guide-provider" hidden><label><input type="checkbox" id="guide-provider-toggle"> Use external AI for this conversation</label><p>Your next questions and current exhibit ID will be sent to OpenAI through the museum server. Conversation history and saved notes stay here. AI can make mistakes; check the sources.</p></div><div class="guide-context" id="guide-context"></div><div class="guide-messages" id="guide-messages" role="log" aria-label="Mission Guide conversation" aria-live="polite" aria-relevant="additions" tabindex="0"></div><div class="guide-journey" hidden></div><div class="guide-suggestions" aria-label="Suggested questions"></div><p class="guide-status" id="guide-status" role="status"></p><form class="guide-form"><label class="guide-label" for="guide-question">How can I help you explore?</label><div><textarea id="guide-question" name="question" rows="2" maxlength="1000" placeholder="Help me find a mission, picture or activity…" required></textarea><button type="submit" id="guide-send">Send ↗</button></div><p>Enter to send · Shift + Enter for a new line</p></form>';
  document.body.append(panel);
  const messages=panel.querySelector('#guide-messages'); const input=panel.querySelector('#guide-question');const status=panel.querySelector('#guide-status');const send=panel.querySelector('#guide-send'); const provider=panel.querySelector('#guide-provider-toggle');
  const config=window.MISSION_GUIDE_CONFIG || {};
  let endpoint;
  if (config.enabled===true && location.protocol!=='file:') {
    try { const url=new URL(config.endpoint || '/api/guide',location.href);if(url.origin===location.origin && url.pathname==='/api/guide' && !url.search && !url.hash) endpoint=url.href; } catch {}
  }
  panel.querySelector('.guide-provider').hidden=!endpoint;
  let pending=false;let abort;let requestVersion=0;let returnFocus;let journey;let lastContext='';let lastRoute='';
  const journeys=[
    {name:'Explore Mars in 5 Minutes',ids:['viking','pathfinder','shield','insight','ingenuity']},
    {name:'The Forgotten Machines of the Moon',ids:['surveyor','eagle','rover','alsep']},
    {name:'NASA’s Surprising Discoveries',ids:['surveyor','shield','insight','ingenuity']},
    {name:'From First Landing to Final Signal',ids:['surveyor','eagle','viking','pathfinder','ingenuity']}
  ];
  function el(tag,className,text) {const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}
  function navigate(item) {
    if (!item || !validRoute(item.route)) return;
    if(item.route.startsWith('#exhibit/')){conversation.subjectId=item.route.slice(9);conversation.choices=[];}
    if (item.tool) {window.dispatchEvent(new CustomEvent('museum-action',{detail:{tool:item.tool,world:['Moon','Mars'].includes(item.world)?item.world:undefined}}));}
    else if(location.hash===item.route) document.querySelector('main')?.focus({preventScroll:true});
    else location.hash=item.route;
  }
  function addMessage(role,text,details={}) {
    const article=el('article','guide-message '+(role==='user'?'guide-user':'guide-answer'));
    article.append(el('span','guide-speaker',role==='user'?'You':'Mission Guide'),el('p','guide-answer-text',String(text).slice(0,10000)));
    const sources=cleanSources(details.sources);
    if(sources.length){const list=el('div','guide-sources');list.append(el('span',null,'Research sources'));sources.forEach(source=>{const link=el('a',null,source.title+' ↗');link.href=source.url;link.target='_blank';link.rel='noopener';list.append(link);});article.append(list);}
    if(details.actions?.length){const controls=el('div','guide-message-actions');details.actions.slice(0,4).filter(item=>validRoute(item.route)).forEach(item=>{const button=el('button',null,item.label);button.type='button';button.onclick=()=>navigate(item);controls.append(button);});article.append(controls);}
    if(details.journeys){const list=el('div','guide-message-actions');journeys.forEach((item,i)=>{const button=el('button',null,item.name);button.type='button';button.onclick=()=>startJourney(i);list.append(button);});article.append(list);}
    messages.append(article);
    while(messages.children.length>40)messages.firstElementChild.remove();
    messages.scrollTop=messages.scrollHeight;
  }
  function greet(){addMessage('assistant','Welcome to After the Mission. I can help you explore spacecraft, discover the science they enabled, and find your way through the museum. What would you like to explore?');}
  function renderJourney(){const target=panel.querySelector('.guide-journey');target.replaceChildren();target.hidden=!journey;if(!journey)return;const record=recordById(journey.ids[journey.index]);target.append(el('strong',null,journey.name),el('p',null,'Stop '+(journey.index+1)+' of '+journey.ids.length+' · '+record.name));const controls=el('div','guide-message-actions');const visit=el('button',null,'Open this stop');visit.type='button';visit.onclick=()=>navigate(exhibitAction(record));controls.append(visit);if(journey.index>0){const prev=el('button',null,'Previous');prev.type='button';prev.onclick=()=>{journey.index--;renderJourney();navigate(exhibitAction(recordById(journey.ids[journey.index])));};controls.append(prev);}const next=el('button',null,journey.index===journey.ids.length-1?'Finish journey':'Next stop →');next.type='button';next.onclick=()=>{if(journey.index===journey.ids.length-1){journey=null;renderJourney();addMessage('assistant','You’ve reached the end of this journey. Try the field challenge to connect the hardware with its purpose.',{actions:[action('Take the field challenge','#challenge')]});return;}journey.index++;renderJourney();navigate(exhibitAction(recordById(journey.ids[journey.index])));};controls.append(next);const exit=el('button',null,'Exit journey');exit.type='button';exit.onclick=()=>{journey=null;renderJourney();status.textContent='Journey ended. You can keep exploring freely.';};controls.append(exit);target.append(controls);}
  function startJourney(index){const item=journeys[index];if(!item)return;journey={...item,ids:item.ids.filter(id=>recordById(id)),index:0};renderJourney();navigate(exhibitAction(recordById(journey.ids[0])));}
  function updateContext(){
    const page=current();
    const route=location.hash||'#home';
    if(route!==lastRoute){lastRoute=route;if(page){conversation.subjectId=page.id;conversation.choices=[];}}
    const topic=recordById(conversation.subjectId)||page;
    const name=page?page.name:route.slice(1).replace(/-/g,' ');
    panel.querySelector('#guide-context').textContent='You’re exploring · '+name;
    const key=route+'|'+(topic?.id||'');
    if(lastContext===key)return;lastContext=key;
    const suggestions=topic?['What did '+topic.name+' discover?','When did it land?','What happened to it?']:route==='#atlas'?['Show me the Moon missions','How do I use the atlas?','Show me the Mars missions']:['Help me find a mission','What can you help me with?','Recommend a short journey'];
    const list=panel.querySelector('.guide-suggestions');list.replaceChildren();
    suggestions.forEach(text=>{const button=el('button',null,text);button.type='button';button.onclick=()=>ask(text);list.append(button);});
  }
  async function externalAnswer(question,signal){const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify({question,exhibitId:current()?.id}),signal});if(!response.ok)throw new Error('Provider unavailable');const payload=await response.json();if(typeof payload.answer!=='string'||!payload.answer.trim()||payload.answer.length>10000)throw new Error('Invalid provider reply');let sources=payload.sources;if(Array.isArray(payload.sourceIds))sources=payload.sourceIds.map(recordById).filter(Boolean).flatMap(record=>sourcesFor(record));const actions=(Array.isArray(payload.actions)?payload.actions:[]).map(item=>typeof item==='string'?{label:'Explore '+item.slice(1),route:item}:item).filter(item=>validRoute(item?.route)).map(item=>({label:String(item.label||'Explore this museum page').slice(0,120),route:item.route}));const cleaned=cleanSources(sources);if(!cleaned.length)throw new Error('No grounded source');return {text:payload.answer,sources:cleaned,actions};}
  async function ask(question){question=String(question||'').trim().slice(0,1000);if(!question||pending)return;addMessage('user',question);input.value='';pending=true;send.disabled=true;input.readOnly=true;const version=++requestVersion;const local=builtInAnswer(question);let result=local;let usedAI=false;let timeout;
    try{if(endpoint&&provider.checked){status.textContent='Asking OpenAI through the museum server…';abort=new AbortController();timeout=setTimeout(()=>abort.abort(),15000);try{result=await externalAnswer(question,abort.signal);usedAI=true;}catch{if(version!==requestVersion)return;status.textContent='External AI is unavailable. Showing the built-in museum answer instead.';}}else status.textContent='Searching the museum’s NASA records…';if(version!==requestVersion)return;addMessage('assistant',result.text,result);updateContext();if(usedAI)status.textContent='External AI response · Check its NASA sources.';else if(!status.textContent.includes('unavailable'))status.textContent='Answered locally from the museum’s records.';}
    finally{clearTimeout(timeout);if(version===requestVersion){pending=false;send.disabled=false;input.readOnly=false;abort=null;}}
  }
  function open(){returnFocus=document.activeElement;panel.hidden=false;launcher?.setAttribute('aria-expanded','true');updateContext();input.focus({preventScroll:true});}
  function close(){panel.hidden=true;launcher?.setAttribute('aria-expanded','false');(returnFocus?.isConnected?returnFocus:launcher)?.focus({preventScroll:true});}
  panel.querySelector('#guide-close').onclick=close;
  panel.querySelector('#guide-reset').onclick=()=>{requestVersion++;abort?.abort();pending=false;send.disabled=false;input.readOnly=false;input.value='';messages.replaceChildren();resetConversation();journey=null;renderJourney();provider.checked=false;status.textContent='Conversation reset. Built-in mode is active.';greet();lastContext='';updateContext();input.focus({preventScroll:true});};
  panel.querySelector('form').onsubmit=event=>{event.preventDefault();ask(input.value);};
  input.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();ask(input.value);}});
  panel.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}});
  provider.onchange=()=>{status.textContent=provider.checked?'External AI selected. Your next question and current exhibit ID will be sent to OpenAI.':'Built-in mode selected. Your questions stay in this page.';};
  window.addEventListener('hashchange',updateContext);
  window.updateMissionGuideContext=updateContext;
  window.MissionGuide={open,close,toggle:()=>panel.hidden?open():close(),answer:builtInAnswer,ask,validRoute,cleanSources};
  greet();updateContext();
})();
