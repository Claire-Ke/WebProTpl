/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：20190101 00:00:00 AM
 *
 * ...每位新修改者自己的信息
 *
 * PS：
 * 一、
 * 每位修改者请附上自己的信息，如：
 * ModifyAuthor：林沐风
 * Email：xxxxxxxxxx@qq.com
 * ModifyDate：20190101 00:00:00 AM
 */

'use strict';

import GetAllAssets from 'jsPubDir/GetAllAssets.esm.js';
import ServiceWorkerTestA from 'serviceWorkersDir/ServiceWorkerTestA.compiler.js';

let CT = new CTESM.CT();

if( 'serviceWorker' in navigator ){
    navigator.serviceWorker.register( ServiceWorkerTestA, { scope: '/' } )
             .then( async ServiceWorkerRegistration => {
                 if( ServiceWorkerRegistration.active ){
                     ServiceWorkerRegistration.active.postMessage( {
                         GetAllAssets: GetAllAssets.toString(),
                     } );
                 }

                 return ServiceWorkerRegistration;
             } )
             .catch( error => {
                 console.error( 'failed：' + error.message );
             } );
}
