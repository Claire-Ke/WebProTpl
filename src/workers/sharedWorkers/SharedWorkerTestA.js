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

self.importScripts( './tools/SWorker4CT.compiler.js' );

let sWorker4CT_ins = new SWorker4CT( self ),
    sWorker4CT2Name_str = self.name,
    numA = 2020;

sWorker4CT_ins.onConnect( ( port, onConnectEvent ) => {
    console.log( `${ sWorker4CT2Name_str }---onConnectEvent--->Start` );
    console.dir( onConnectEvent );
    console.log( `${ sWorker4CT2Name_str }---onConnectEvent--->End` );

    Array.from( onConnectEvent.ports )
         .forEach( ( c, i, a ) => {
             c.onmessage = event => {
                 console.log( `${ sWorker4CT2Name_str }---port${ i }---onmessage--->Start` );
                 console.dir( c );
                 console.dir( event );
                 console.log( `${ sWorker4CT2Name_str }---port${ i }---onmessage--->End` );

                 sWorker4CT_ins.portPostMessage( c, {
                     dataA: `${ sWorker4CT2Name_str }---port${ i }：${ new Date() }`,
                     numA: numA,
                 } );
             };
             c.start();
         } );
} );
