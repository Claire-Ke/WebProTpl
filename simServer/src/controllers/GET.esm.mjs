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

import {
    RemGZip,
    SetHeaders,
    URLTool,
} from '../tools/Tools.esm.mjs';
import JSON5 from 'json5';

function GETContr( server, request, response ){
    const {
        pathNameStr,
        queryObj: {
            type,
        },
    } = URLTool( request.url );

    let resContent = null;

    switch( type ){
    case 'json':
        resContent = JSON.stringify( {
            'type': 'json',
            'info': '帝子降兮北渚，目渺渺兮愁予。'
        } );
        break;
    case 'json5':
        resContent = JSON.stringify( Object.assign( {
            type: 'json5',
            info: '路漫漫其修远兮，吾将上下而求索。',
        }, {
            __proto__: null,
        } ) );
        break;
    default:
        resContent = JSON.stringify( {
            'type': String( type ),
            'info': 'type的值只能是“json”或“json5”。'
        } );
        break;
    }

    SetHeaders( response, {
        'Content-Type': 'application/json',
    } );
    RemGZip( response );
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.end( resContent, 'utf8' );
}

export {
    GETContr,
};

export default GETContr;
