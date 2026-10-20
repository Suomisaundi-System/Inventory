export const subsystem=decodeURIComponent(location.pathname.split("/").filter(Boolean)[0]||"System");
export const version="0.1.0";
export function createRecord({id=crypto.randomUUID(),title="",category=subsystem,metadata={}}={}){
 if(typeof title!=="string"||title.length>300)throw Error("Invalid title");
 if(typeof metadata!=="object"||metadata===null||Array.isArray(metadata))throw Error("Invalid metadata");
 return {id,title,category,metadata:structuredClone(metadata),createdAt:new Date().toISOString()};
}
export function validateRecord(record){return !!record&&typeof record.id==="string"&&typeof record.title==="string"&&typeof record.category==="string";}
