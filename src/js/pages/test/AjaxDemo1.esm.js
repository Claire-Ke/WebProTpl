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

import 'cssBDir/Colors.css';
import 'compDir/Components.css';

import { FileBtn, } from 'CompESM';

let CT = new CTESM.CT();

CT.fetch( 'http://localhost:9999/SimServer/GetGenymotionDevicesList', {
    success( { url, text }, response ){
        console.dir( url );
        console.log( text );
    },
}, {
    method: 'GET',
    responseType: 'json',
    mode: 'cors',
    credentials: 'omit',
} );

let formData = new FormData();
formData.append( 'id', '2020010101' );
formData.append( 'date', '2020年01月01日 18时00分00秒 周六' );
formData.append( 'title', '这是一张“.HEIC”格式的图片' );

FileBtn.call( CT, {
    id: '#HEICImg',
    accept: 'image/heic, image/heif',
    multiple: true,
    onChange: {
        event( event, filesArr ){
            if( filesArr.length > 0 ){
                Array.from( filesArr )
                     .forEach( ( c, i, a ) => void ( formData.append( 'img', c, c.name ) ) );

                CT.fetch( 'http://localhost:9999/SimServer/POST', {
                    success( data4ResponseType, response ){
                        console.dir( data4ResponseType );
                    },
                }, {
                    method: 'POST',
                    responseType: 'json',
                    mode: 'cors',
                    credentials: 'omit',
                    body: formData,
                } );
            }
        },
    },
} );
