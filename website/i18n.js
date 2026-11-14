/* JSON-backed localization for the existing, progressively rendered museum.
 * Text-only updates preserve event handlers, focus, form values and exhibit IDs.
 * The generated catalog keeps file:// previews independent of fetch support.
 */
(() => {
 'use strict';
 let catalog=window.MUSEUM_TRANSLATIONS;
 if(!catalog?.messages||!catalog?.languages)return;
 const storageKey='museum-language',fallback='en';
 let language=fallback;
 try{const saved=localStorage.getItem(storageKey);if(Object.hasOwn(catalog.languages,saved))language=saved;}catch{}
 const textSources=new WeakMap(),attributeSources=new WeakMap();
 const attributes=['aria-label','aria-valuetext','placeholder','title','alt'];
 const ignored='script,style,textarea,code,pre,[data-i18n-skip],.guide-user .guide-answer-text';
 let originals=new Map(),alternates=new Map(),patterns=[];
 const escapePattern=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 function compile(){
  originals=new Map();alternates=new Map();
  for(const entry of Object.values(catalog.messages))if(typeof entry.en==='string'){originals.set(entry.source||entry.en,entry);for(const value of Object.values(entry))if(typeof value==='string')alternates.set(value,entry);}
  patterns=Object.values(catalog.templates||{}).map(entry=>{const names=[];let cursor=0,pattern='^';for(const token of entry.en.matchAll(/\{(\w+)\}/g)){pattern+=escapePattern(entry.en.slice(cursor,token.index))+(['count','total','index','worlds','year','number'].includes(token[1])?'([0-9]+)':'(.+?)');names.push(token[1]);cursor=token.index+token[0].length;}return {entry,names,regex:new RegExp(pattern+escapePattern(entry.en.slice(cursor))+'$')};});
 }
 compile();
 function interpolate(value,params={}){return value.replace(/\{(\w+)\}/g,(token,key)=>Object.hasOwn(params,key)?String(params[key]):token);}
 function t(key,params={}){const entry=catalog.messages[key]||catalog.templates?.[key];return interpolate(entry?.[language]??entry?.en??key,params);}
 function core(value,depth=0){
  if(depth>4||!/[A-Za-z]/.test(value)||/^https?:\/\//.test(value))return value;
  const exact=originals.get(value)||alternates.get(value);if(exact)return exact[language]??exact.en;
  for(const {entry,names,regex} of patterns){const match=regex.exec(value);if(match){const params=Object.fromEntries(names.map((name,i)=>[name,core(match[i+1],depth+1)]));return interpolate(entry[language]??entry.en,params);}}
  const chunks=value.split(/(\s*[·/]\s*|\s+[—–]\s+|\s*[↗→←▷Ⅱ✦○●]\s*)/);
  if(chunks.length>1)return chunks.map((part,i)=>i%2?part:translate(part,depth+1)).join('');
  const sentences=value.split(/(?<=[.!?])\s+(?=[A-Z])/);
  if(sentences.length>1)return sentences.map(sentence=>translate(sentence,depth+1)).join(' ');
  return value;
 }
 function translate(value,depth=0){const parts=String(value).match(/^(\s*)([\s\S]*?)(\s*)$/);return parts[1]+core(parts[2],depth)+parts[3];}
 function date(value){
  if(/^\d{4}$/.test(value))return value;
  const monthly=/^\d{4}-\d{2}$/.test(value),full=/^\d{4}-\d{2}-\d{2}$/.test(value);if(!monthly&&!full)return value;
  const parsed=new Date((monthly?value+'-01':value)+'T12:00:00Z');
  return parsed.toLocaleDateString(catalog.languages[language].locale,{...(monthly?{}:{day:'numeric'}),month:'short',year:'numeric',timeZone:'UTC'});
 }
 function updateText(node){
  const parent=node.parentElement;if(!parent||parent.closest(ignored))return;
  const old=textSources.get(node),source=old&&node.data===old.output?old.source:node.data;
  // Option values are program state, even where the original markup omitted value.
  if(parent.tagName==='OPTION'&&!parent.hasAttribute('value'))parent.setAttribute('value',parent.textContent);
  const output=parent.tagName==='TIME'&&parent.hasAttribute('datetime')&&!/^\s*\d{4}\s*$/.test(source)?date(parent.getAttribute('datetime')):translate(source);
  textSources.set(node,{source,output});if(node.data!==output)node.data=output;
 }
 function updateAttributes(element){
  if(element.closest('[data-i18n-skip]'))return;
  let saved=attributeSources.get(element);if(!saved){saved={};attributeSources.set(element,saved);}
  for(const name of attributes){if(!element.hasAttribute(name))continue;const current=element.getAttribute(name),old=saved[name],source=old&&current===old.output?old.source:current,output=translate(source);saved[name]={source,output};if(current!==output)element.setAttribute(name,output);}
  const key=element.dataset?.i18n;
  if(key&&catalog.messages[key]){const output=t(key);if(element.textContent!==output)element.textContent=output;}
 }
 function refresh(root=document.documentElement){
  function walk(node){if(node.nodeType===3){updateText(node);return;}if(node.nodeType!==1)return;if(node.matches(ignored)){if(node.tagName==='TEXTAREA')updateAttributes(node);return;}updateAttributes(node);for(const child of [...node.childNodes])walk(child);}
  walk(root);
 }
 const selector=document.querySelector('#museum-language');
 const status=document.querySelector('#language-status');
 function setLanguage(next,{persist=true,announce=true}={}){
  if(!Object.hasOwn(catalog.languages,next))return false;
  language=next;document.documentElement.lang=next;
  if(selector){selector.value=next;selector.setAttribute('aria-label',t('language.label'));}
  if(persist)try{localStorage.setItem(storageKey,next);}catch{}
  refresh();
  if(announce&&status)status.textContent=t('language.changed',{language:catalog.languages[next].name});
  document.dispatchEvent(new CustomEvent('museum-languagechange',{detail:{language:next}}));
  return true;
 }
 selector?.addEventListener('change',()=>setLanguage(selector.value));
 const observer=typeof MutationObserver==='function'?new MutationObserver(records=>{
  const roots=new Set();for(const record of records){if(record.type==='characterData')updateText(record.target);else if(record.type==='attributes')updateAttributes(record.target);else for(const node of record.addedNodes)roots.add(node);}
  for(const node of roots)refresh(node);
 }):null;
 observer?.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
 function searchText(value){const entry=originals.get(String(value))||alternates.get(String(value));return entry?Object.keys(catalog.languages).map(code=>entry[code]||entry.en).join(' '):String(value);}
 function guideQuestion(value){
  const plain=String(value).trim(),entry=alternates.get(plain);let text=(entry?.source||entry?.en||plain).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  const terms=Object.entries(catalog.guideTerms||{}).sort((a,b)=>b[0].length-a[0].length);
  for(const [from,to] of terms)text=text.replace(new RegExp('(^|\\s)'+escapePattern(from)+'(?=\\s|$)','g'),(_,space)=>space+to);
  return text;
 }
 const api={t,translate,date,refresh,setLanguage,searchText,guideQuestion,get language(){return language;},get locale(){return catalog.languages[language].locale;}};
 window.MuseumI18n=api;
 setLanguage(language,{persist:false,announce:false});
 // HTTP previews read the editable JSON directly. file:// uses the checked-in
 // generated bundle because browsers restrict fetching local JSON files.
 api.ready=/^https?:$/.test(location.protocol)&&typeof fetch==='function'?fetch('locales/translations.json',{credentials:'same-origin'}).then(response=>{if(!response.ok)throw Error('Catalog unavailable');return response.json();}).then(fresh=>{if(!fresh.languages?.en||!fresh.messages)throw Error('Invalid catalog');catalog=fresh;compile();setLanguage(Object.hasOwn(catalog.languages,language)?language:fallback,{persist:false,announce:false});return true;}).catch(()=>false):Promise.resolve(true);
})();
