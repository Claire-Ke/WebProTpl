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
    serverPort9999 as config9999_obj,
} from '../configures/GlobalProp.esm.mjs';
import {
    URLTool,
} from '../tools/Tools.esm.mjs';
import Interceptor4Get from './Interceptor4Get.esm.mjs';
import Interceptor4Post from './Interceptor4Post.esm.mjs';
import Interceptor4Options from './Interceptor4Options.esm.mjs';
import InterceptorError from './InterceptorError.esm.mjs';
import ResSRFile from '../public/ResSRFile.esm.mjs';

function InterceptorCommon( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    console.log( `------------------------------------------------------------Start` );
    console.log( `客户端的请求URL--->${ request.url }` );
    console.log( `客户端的请求方法--->${ request.method }` );
    console.dir( request.headers );
    console.log( `------------------------------------------------------------End` );

    if( pathNameStr === '/' ){
        new ResSRFile( server, request, response ).html4Path( config9999_obj.rootPath );
    }
    else if( pathNameStr === '/favicon.ico' ){
        new ResSRFile( server, request, response ).img4Path( config9999_obj.faviconPath );
    }
    else if( pathNameStr === '/apple-touch-icon.png' ){
        new ResSRFile( server, request, response ).img4Path( config9999_obj.faviconPath );
    }
    else if( pathNameStr === '/apple-touch-icon-precomposed.png' ){
        new ResSRFile( server, request, response ).img4Path( config9999_obj.faviconPath );
    }
    else if( request.method.toLowerCase() === 'get' ){
        Interceptor4Get( server, request, response );
    }
    else if( request.method.toLowerCase() === 'post' ){
        Interceptor4Post( server, request, response );
    }
    else if( request.method.toLowerCase() === 'options' ){
        Interceptor4Options( server, request, response );
    }
    else{
        new InterceptorError( server, request, response ).httpMethods();
    }

}

export {
    InterceptorCommon,
};

export default InterceptorCommon;
