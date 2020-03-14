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

self.importScripts( './tools/WWorker4CT.compiler.js' );

let wWorker4CT_ins = new WWorker4CT( self ),
    wWorker4CT2Name_str = self.name;

wWorker4CT_ins.onMessage( event => {
    console.log( `${ wWorker4CT2Name_str }--->Start` );
    console.dir( event );
    console.log( `${ wWorker4CT2Name_str }--->End` );

    wWorker4CT_ins.postMessage( {
        dataA: `${ wWorker4CT2Name_str }：${ new Date() }`,
    } );
} );
