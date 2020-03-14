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
    ToFilePath,
    ExistsFile,
} from '../tools/Tools.esm.mjs';
import ResSRFile from '../public/ResSRFile.esm.mjs';
import InterceptorError from '../interceptors/InterceptorError.esm.mjs';

function StaticResources( server, request, response ){
    const {
        pathNameStr,
    } = URLTool( request.url );

    const filePath_str = ToFilePath( config9999_obj.srPath + decodeURI( pathNameStr )
        .slice( 3 + config9999_obj.serverName.trim().length + 'StaticResources'.length ) );

    if( ExistsFile( filePath_str ) ){
        new ResSRFile( server, request, response ).file4Path( filePath_str );
    }
    else{
        new InterceptorError( server, request, response ).http404();
    }

}

export {
    StaticResources,
};

export default StaticResources;
