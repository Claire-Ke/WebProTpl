'use strict';globalThis.importScripts("./tools/WWorker4CT.compiler.js");let a=new WWorker4CT(globalThis),b=globalThis.name;a.onMessage(c=>{console.log(`${b}--->Start`);console.dir(c);console.log(`${b}--->End`);a.postMessage({dataA:`${b}：${new Date}`})});
