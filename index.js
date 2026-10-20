export * from "./system.js";
const root="https://suomisaundi-system.github.io/";
const main=document.createElement("main");
main.style.cssText="min-height:80vh;display:grid;place-content:center;text-align:center;font:16px system-ui;padding:1rem";
const heading=document.createElement("h1");heading.textContent="Nothing to see here";
const message=document.createElement("p");message.textContent="This is a Suomisaundi subsidiary system. Redirecting in 10 seconds.";
const link=document.createElement("a");link.href=root;link.textContent="Open Suomisaundi System";
main.append(heading,message,link);document.body.append(main);
setTimeout(()=>location.replace(root),10000);
