'use strict';self.importScripts("./tools/WWorker4CT.compiler.js");class SWorker4CT extends WWorker4CT{constructor(a,b={}){let c=Object.assign({onConnect:(a,b)=>{},portOnMessage:(a,b,c)=>{},portOnMessageError:(a,b,c)=>void console.error(a.message)},b);super(a,c);this._self=void 0;this.port=void 0;this.onConnectFun=void 0;this.portOnMessageFun=void 0;this.portOnMessageErrorFun=void 0;let d=this;d._self=a;d.onConnectFun=c.onConnect;d.portOnMessageFun=c.portOnMessage;d.portOnMessageErrorFun=c.portOnMessageError;d._self.onconnect=a=>{d.port=a.ports[0];d.port.onmessage=b=>void d.portOnMessageFun(b,d.port,a);d.port.onmessageerror=b=>void d.portOnMessageErrorFun(b,d.port,a);d.portStart(d.port);d.onConnectFun(d.port,a)}}onConnect(a=(a,b)=>{}){this.onConnectFun=a}portOnMessage(a=(a,b,c)=>{}){this.portOnMessageFun=a}portOnMessageError(a=(a,b,c)=>{}){this.portOnMessageErrorFun=a}portPostMessage(a,b={},c){c&&c.length>0?a.postMessage(b,[...c]):a.postMessage(b)}portClose(a){a.close()}portStart(a){a.start()}gPort(){return this.port}}self.SWorker4CT=SWorker4CT;
