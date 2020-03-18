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

import JSON5 from 'json5';
import fs from 'fs';
import path from 'path';

import {
    RemGZip,
    SetHeaders,
    URLTool,
    Get__dirname,
} from '../tools/Tools.esm.mjs';

import ResSRFile from '../public/ResSRFile.esm.mjs';

let __dirname = Get__dirname( import.meta.url );

function GETFileContr( server, request, response ){
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

        SetHeaders( response, {
            'Content-Type': 'application/json',
        } );
        RemGZip( response );
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.end( resContent, 'utf8' );
        break;
    case 'json5':
        resContent = JSON5.stringify( {
            type: 'json5',
            info: '路漫漫其修远兮，吾将上下而求索。',
        } );

        SetHeaders( response, {
            'Content-Type': 'application/json',
        } );
        RemGZip( response );
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.end( resContent, 'utf8' );
        break;
    case 'img':
        new ResSRFile( server, request, response ).file4Path( path.resolve( __dirname, '../../staticResources/img/favicon.ico' ) );
        break;
    case 'zip':
        new ResSRFile( server, request, response ).file4Path( path.resolve( __dirname, '../../staticResources/zip/1.7z' ) );
        break;
    case 'apps':
        new ResSRFile( server, request, response ).file4Path( path.resolve( __dirname, '../../staticResources/apps/1.exe' ) );
        break;
    case 'xlsx':
        new ResSRFile( server, request, response ).file4Path( path.resolve( __dirname, '../../staticResources/xlsx/1.xlsx' ) );
        break;
    case 'docx':
        new ResSRFile( server, request, response ).file4Path( path.resolve( __dirname, '../../staticResources/docx/1.doc' ) );
        break;
    default:
        resContent = JSON.stringify( {
            'type': String( type ),
            'info': 'type的值只能是“json”、“json5”、“img”、“zip”、“apps”、“xlsx”、“docx”。'
        } );

        SetHeaders( response, {
            'Content-Type': 'application/json',
        } );
        RemGZip( response );
        response.statusCode = 200;
        response.statusMessage = 'OK';
        response.end( resContent, 'utf8' );
        break;
    }
}

export {
    GETFileContr,
};

export default GETFileContr;
