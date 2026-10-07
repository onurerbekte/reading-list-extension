import {addPage,sanitize,visibleItems} from './model.js';
const strings={
  tr:{title:'Oku Sonra',demo:'Kurgusal demo proje · Yalnızca bu tarayıcıda',save:'Bu sekmeyi kaydet',search:'Listede ara',filter:'Durum',all:'Tümü',unread:'Okunmadı',read:'Okundu',empty:'Liste boş veya eşleşen kayıt yok.',markRead:'Okundu işaretle',markUnread:'Okunmadı işaretle',remove:'Sil',saved:'Sekme kaydedildi.',deleted:'Kayıt silindi.',updated:'Durum güncellendi.',unsupported:'Yalnızca HTTP/HTTPS sekmeleri desteklenir.',duplicate:'Bu sayfa zaten listede.',full:'Liste en fazla 200 kayıt alır.',error:'Tarayıcı kaydı okunamadı veya yazılamadı.',confirm:'Bu kayıt silinsin mi?'},
  en:{title:'Read Later',demo:'Fictional demo project · In this browser only',save:'Save this tab',search:'Search list',filter:'Status',all:'All',unread:'Unread',read:'Read',empty:'The list is empty or no entries match.',markRead:'Mark read',markUnread:'Mark unread',remove:'Delete',saved:'Tab saved.',deleted:'Entry deleted.',updated:'Status updated.',unsupported:'Only HTTP/HTTPS tabs are supported.',duplicate:'This page is already saved.',full:'The list supports up to 200 entries.',error:'Browser storage could not be read or written.',confirm:'Delete this entry?'}
};
let items=[],language='tr',status='';
const $=id=>document.getElementById(id);
function render(){
  const t=strings[language];document.documentElement.lang=language;
  for(const id of ['title','demo','save'])$(id).textContent=t[id];
  $('search-label').textContent=t.search;$('filter-label').textContent=t.filter;
  [...$('filter').options].forEach(option=>option.textContent=t[option.value]);
  $('language').textContent=language==='tr'?'EN':'TR';$('language').setAttribute('aria-label',language==='tr'?'Switch to English':'Türkçeye geç');
  $('status').textContent=status?t[status]:'';
  const shown=visibleItems(items,$('filter').value,$('search').value);
  $('empty').textContent=shown.length?'':t.empty;$('list').replaceChildren();
  for(const item of shown){
    const row=document.createElement('li');row.classList.toggle('read',item.read);
    const link=document.createElement('a');link.href=item.url;link.textContent=item.title;link.target='_blank';link.rel='noopener noreferrer';
    const domain=document.createElement('span');domain.className='domain';domain.textContent=new URL(item.url).hostname;
    const toggle=document.createElement('button');toggle.textContent=item.read?t.markUnread:t.markRead;
    toggle.addEventListener('click',()=>persist(items.map(entry=>entry.id===item.id?{...entry,read:!entry.read}:entry),'updated'));
    const remove=document.createElement('button');remove.textContent=t.remove;remove.setAttribute('aria-label',`${t.remove}: ${item.title}`);
    remove.addEventListener('click',()=>{if(window.confirm(t.confirm))persist(items.filter(entry=>entry.id!==item.id),'deleted');});
    row.append(link,domain,toggle,remove);$('list').append(row);
  }
}
async function persist(next,message){try{await chrome.storage.local.set({items:next});items=next;status=message;}catch{status='error';}render();}
$('save').addEventListener('click',async()=>{try{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});const result=addPage(items,tab||{},crypto.randomUUID());if(result.error){status=result.error;render();}else await persist(result.items,'saved');}catch{status='error';render();}});
$('language').addEventListener('click',async()=>{language=language==='tr'?'en':'tr';try{await chrome.storage.local.set({language});}catch{status='error';}render();});
$('search').addEventListener('input',render);$('filter').addEventListener('change',render);
try{const saved=await chrome.storage.local.get(['items','language']);items=sanitize(saved.items??[]);language=saved.language==='en'?'en':'tr';}catch{status='error';}
render();
