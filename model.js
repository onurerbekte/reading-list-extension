export const MAX_ITEMS=200;
export function cleanUrl(value){
  try{const url=new URL(value);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)return null;url.hash='';return url.href;}catch{return null;}
}
export function isItem(item){return item && typeof item.id==='string' && typeof item.title==='string' && item.title.length>0 && item.title.length<=200 && cleanUrl(item.url)===item.url && typeof item.read==='boolean';}
export function sanitize(items){if(!Array.isArray(items)||items.length>MAX_ITEMS||!items.every(isItem)||new Set(items.map(item=>item.url)).size!==items.length||new Set(items.map(item=>item.id)).size!==items.length)throw new Error('Invalid storage');return items;}
export function addPage(items,tab,id){
  const url=cleanUrl(tab.url);
  if(!url)return {items,error:'unsupported'};
  if(items.some(item=>item.url===url))return {items,error:'duplicate'};
  if(items.length>=MAX_ITEMS)return {items,error:'full'};
  const title=(tab.title||url).trim().slice(0,200)||url.slice(0,200);
  return {items:[{id,title,url,read:false},...items],error:null};
}
export function visibleItems(items,filter,query){return items.filter(item=>(filter==='all'||(filter==='read'?item.read:!item.read))&&`${item.title} ${item.url}`.toLocaleLowerCase('tr').includes(query.trim().toLocaleLowerCase('tr')));}
