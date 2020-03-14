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
import ResSRFile from '../public/ResSRFile.esm.mjs';

class InterceptorError{

    #server = null;
    #request = null;
    #response = null;

    constructor( server = null, request = null, response = null, ){
        let _this = this;

        _this.#server = server;
        _this.#request = request;
        _this.#response = response;
    }

    httpMethods(){
        let _this = this;

        new ResSRFile( _this.#server, _this.#request, _this.#response ).html4Path( config9999_obj.error4ReqMethod2PagePath );
    }

    http404(){
        let _this = this;

        new ResSRFile( _this.#server, _this.#request, _this.#response ).html4Path( config9999_obj.http404PagePath );
    }

}

export {
    InterceptorError,
};

export default InterceptorError;
