// Browser-local inventory. Data stays on this device and may be evicted.
const DB="suomisaundi-inventory-v1", STORE="records";
function open(){
 return new Promise((resolve,reject)=>{
  const r=indexedDB.open(DB,1);
  r.onupgradeneeded=()=>r.result.createObjectStore(STORE,{keyPath:"id"});
  r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
 });
}
async function query(mode,method,value){
 const db=await open();
 try{return await new Promise((resolve,reject)=>{
  const tx=db.transaction(STORE,mode),req=tx.objectStore(STORE)[method](...value);
  req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);
 });}finally{db.close();}
}
export function putRecord({id=crypto.randomUUID(),type="generic",title="",tags=[],data={}}={}){
 if(!/^[a-z0-9-]{1,80}$/i.test(type)||typeof title!=="string"||title.length>300)throw Error("Invalid record");
 if(!Array.isArray(tags)||tags.some(t=>typeof t!=="string"||t.length>80))throw Error("Invalid tags");
 const record={id,type,title,tags,data:structuredClone(data),updatedAt:new Date().toISOString()};
 return query("readwrite","put",[record]).then(()=>record);
}
export const getRecord=id=>query("readonly","get",[id]);
export const listRecords=()=>query("readonly","getAll",[]);
export const deleteRecord=id=>query("readwrite","delete",[id]);
export async function searchRecords(text){
 const q=String(text).toLocaleLowerCase().trim();
 const all=await listRecords();
 return all.filter(r=>(r.title+" "+r.type+" "+r.tags.join(" ")).toLocaleLowerCase().includes(q));
}
export async function exportInventory(){
 return JSON.stringify({format:"suomisaundi-inventory-v1",records:await listRecords()},null,2);
}
