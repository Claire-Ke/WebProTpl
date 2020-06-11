/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

import {
    FileBtn,
} from 'CompESM';

let CT = new CTESM.CT();
let {
    WebService4Proxy,
} = CT.getClass();

// devURL4WWC devURL4Test devURL4Dev
const webService_ins = new WebService4Proxy( CT, `${ devURL4Dev }` ),
    post4JSON = webService_ins.post( {
        type: 'json',
    } ),
    requestOpt = {
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-cache',
    };

{
    if( false ){
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
    }
}

// GETFile?type=img
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=img', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.fileOrBlobToDataURL( new Blob( [ data4ResponseType ], {
                    type: 'image/vnd.microsoft.icon',
                } ), ( dataURL, event, fileReader ) => {
                    let img = CT.dataURLToImg( dataURL );
                    img.style = 'width: 100%; height: auto;';

                    CT.iInsertB( 'html.helloWorld #HelloWorld article', img );
                } );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=zip
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=zip', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/x-7z-compressed',
                } ), '1.7z' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=apps
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=apps', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/octet-stream',
                } ), '1.exe' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=xlsx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=xlsx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                } ), '1.xlsx' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=docx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=docx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                CT.download4Blob( new Blob( [ data4ResponseType ], {
                    type: 'application/msword',
                } ), '1.doc' );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// ajax
{
    if( false ){
        CT.postAjax( 'http://localhost:9999/SimServer/POST', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.deleteAjax( 'http://localhost:9999/SimServer/DELETE', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.putAjax( 'http://localhost:9999/SimServer/PUT', {
            sendData: JSON.stringify( {
                type: 'json',
            } ),
            responseType: 'json',
            requestHeader: { 'Content-Type': 'application/json', },
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }

    if( false ){
        CT.getAjax( 'http://localhost:9999/SimServer/GET', {
            sendData: {
                type: 'json',
            },
            responseType: 'json',
            withCredentials: false,
            success( event, xhr, response ){
                console.dir( response );
            },
        } );
    }
}

// graphql
{
    // login接口测试1 通过
    if( false ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    operationName: 'ua_login',
                    variables: {
                        identifier: 'roleAdmin',
                        password: '123456',
                    },
                    query: `
                mutation ua_login( $identifier: String!, $password: String! ){
                    ua_login( domain: userName, identifier: $identifier, password: $password ){
                        account{
                            id,
                            displayName,
                            __typename,
                        },
                        forceRestPassword,
                        __typename,
                    },
                },
                `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }

    // login接口测试2 通过
    if( false ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: `
                mutation ua_login{
                    ua_login( domain: userName, identifier: "roleAdmin", password: "123456" ){
                        account{
                            id,
                            displayName,
                            __typename,
                        },
                        forceRestPassword,
                        __typename,
                    },
                },
                `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }

    // 删除地块接口测试1 通过
    if( false ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: `
                    mutation ibms_region_undefineBlock{
                        ibms_region_undefineBlock( blockId: "00001" ),
                    },
                    `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }

    // 园区获取接口测试1 通过
    if( true ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: `
                query{
                    ibms_region_getParks{
                        id,
                        name,
                        tags,
                        area,
                        introduction,
                        image,
                        blockCount,

                        blocks{
                            id,
                            name,
                            area,
                            tags,
                            buildings{
                                id,
                                name,
                                floors{
                                    id,
                                    name,
                                },
                            },
                            places{
                                id,
                                name,
                            },
                            placeCount,
                        },
                    },
                },
                `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }

    // login接口、园区获取接口的合并查询测试 不通过，因为login接口和园区获取接口不能同时操作！！！
    if( false ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: `
                mutation ua_login{
                    ua_login( domain: userName, identifier: "roleAdmin", password: "123456" ){
                        account{
                            id,
                            displayName,
                            __typename,
                        },
                        forceRestPassword,
                        __typename,
                    },
                },

                query{
                    ibms_region_getParks( exp: "item.id == 'c479ad55297f442f97d58bdd3470175a'" ){
                        id,
                        name,
                        tags,
                        area,
                        introduction,
                        image,
                        blockCount,

                        blocks( exp: "item.id == '5bdc99f4c60f4e25a4ad3fd550e02714'" ){
                            id,
                            name,
                            area,
                            tags,
                            buildings( exp: "item.id == 'bu003'" ){
                                id,
                                name,
                                floors( exp: "item.id == '77d3ac7839db4af0a9e775f222245a6e'" ){
                                    id,
                                    name,
                                },
                            },
                            places( exp: "item.id == 'pl003'" ){
                                id,
                                name,
                            },
                            placeCount,
                        },
                    },
                },
                `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }

    // 警报接口测试1 全文检索查询未复核警报
    if( false ){
        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: `
                query ibms_alarm_getAlarmByContent{
                    ibms_alarm_getAlarmByContent( pageIndex: 1, pageSize: 10, beginStamptime: "2018-01-01 00:00:00", endStamptime: "2020-10-10 00:00:00", deviceCategory: "", alarmLevel: "", content: "" ){
                        id,
                        url,
                        title,
                        unCheckedAlarmTime,
                        deviceId,
                        deviceName,
                        devieceFacturerName,
                        deviceCategory,
                        message,
                        alarmLevel,
                        subsystemName,
                        unCheckedCount,
                    }
                },
                `,
                } ),
            },
            events: {
                success: ( data4ResponseType, response ) => {
                    console.log( 'success，请求成功------>Start' );
                    console.dir( data4ResponseType );
                    console.log( 'success，请求成功------>End' );
                },
                error: ( status_num, response ) => {
                    console.warn( `错误，请求状态码：${ status_num }------>Start` );
                    console.error( response );
                    console.warn( `错误，请求状态码：${ status_num }------>End` );
                },
            },
        } )/*
         .then( response => {
         console.log( 'then，请求成功------>Start' );
         console.dir( response );
         console.log( 'then，请求成功------>End' );
         } )*/;
    }
}
