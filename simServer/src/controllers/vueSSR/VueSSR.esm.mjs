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

import TopLevelVar4NodeJS2CommonJS from '../../tools/TopLevelVar4NodeJS2CommonJS.CommonJS.js';

const {
    __dirname,
} = TopLevelVar4NodeJS2CommonJS;

import { readFileSync, } from 'fs';
import { resolve, } from 'path';
import Vue from 'vue';
import VueServerRenderer from 'vue-server-renderer';

import {
    RemGZip,
    SetHeaders,
} from '../../tools/Tools.esm.mjs';

function VueSSR( server, request, response ){
    let context = {
            title: 'Vue SSR',
        },
        template = readFileSync( resolve( __dirname, '../controllers/vueSSR/tplHTML/pages/Index.html' ), 'utf8' ),
        vueRenderer = VueServerRenderer.createRenderer( {
            template,
        } ),
        app = new Vue( {
            data: {
                url: request.url,
            },
            template: `
                <div>
                    <h1>Vue SSR</h1>
                    <p>访问的URL是：{{ url }}</p>
                </div>
            `,
        } );

    vueRenderer.renderToString( app, context )
               .then( html => {
                   SetHeaders( response, {
                       'Content-Type': 'text/html;charset=utf-8',
                   } );
                   RemGZip( response );

                   response.statusCode = 200;
                   response.statusMessage = 'OK';
                   response.end( html, 'utf8' );
               } )
               .catch( err => {
                   console.error( err );
               } );
}

export {
    VueSSR,
};

export default VueSSR;
