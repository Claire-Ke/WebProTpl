/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：20191115 00:00:00 AM
 *
 * ...每位新修改者自己的信息
 *
 * PS：
 * 一、
 * 每位修改者请附上自己的信息，如：
 * ModifyAuthor：林沐风
 * Email：xxxxxxxxxx@qq.com
 * ModifyDate：20191115 00:00:00 AM
 */

'use strict';

import {
    SetHeaders,
    RemGZip,
} from '../tools/Tools.esm.mjs';

function Interceptor4Options( server, request, response ){
    SetHeaders( response );
    response.removeHeader( 'Content-Type' );
    RemGZip( response );
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.end();
}

export {
    Interceptor4Options,
};

export default Interceptor4Options;
