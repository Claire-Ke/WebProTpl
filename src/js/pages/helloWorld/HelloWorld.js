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

isPro
?
( console.log( '------------------This is production mode------------------' ) )
:
( console.log( '------------------This is development mode------------------' ) );

import 'compDir/Components.css';
import 'cssBDir/Colors.css';

import 'scssPDir/helloWorld/HelloWorld.scss';

import { RefreshBtn, } from 'CompESM';

let CT = new CTESM.CT();

( async () => {
    // await import('../test/VueDemo1.esm.js');
    await import('../test/VueRouterDemo1.esm.js');
    await import('../test/Test.esm.js');

    CT.scrollFix( '.helloWorld main' );

    RefreshBtn.call( CT, {
        id: '#RefreshBtnTest',
        click: {
            event: event => {
                window.location[ 'reload' ]();
            },
        },
    } );
} )();
