/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：2020-04-09 02:11
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

import 'cssBDir/Colors.css';
import 'compDir/Components.css';

import { FileBtn, } from 'CompESM';

let CT = new CTESM.CT();

FileBtn.call( CT, {
    id: '#CryptoDemo1',
    accept: '*',
    multiple: true,
    onChange: {
        event( event, filesArr ){
            if( filesArr.length > 0 ){
                Array.from( filesArr )
                     .forEach( async ( c, i, a ) => {

                         let result = await CT.getDigest2Hex4File( c );

                         console.log( result );

                     } );
            }
        },
    },
} );
