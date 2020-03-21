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
    CreateFormidable,
} from '../tools/Tools.esm.mjs';

async function POSTContr( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    let resultContent = {
            'info': '这是一个POST请求的响应！！！',
        },
        fields = await new Promise( ( resolve = () => {
        }, reject = () => {
        } ) => {
            CreateFormidable()
                .parse( request, ( err, fields, files ) => {
                    if( err ){
                        console.log( '------>formidable POSTContr err Start<------' );
                        console.error( err );
                        console.log( '------>formidable POSTContr err End<------' );

                        return;
                    }

                    // fields 对象数据，所有字段
                    if( fields ){
                        console.log( '--->fields<---Start' );
                        console.dir( fields );
                        console.log( '--->fields<---End' );

                        resolve( fields );
                    }

                    // files 对象数据，所有文件
                    if( files ){
                        console.log( '--->files<---Start' );
                        console.dir( files );
                        console.log( '--->files<---End' );
                    }
                } );
        } );

    Object.assign( resultContent, fields );

    SetHeaders( response, {
        'Content-Type': 'application/json',
    } );
    RemGZip( response );
    response.statusCode = 200;
    response.statusMessage = 'OK';
    response.end( JSON.stringify( resultContent ), 'utf8' );
}

export {
    POSTContr,
};

export default POSTContr;
