/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-06-11 17:07:18
 * IDE: WebStorm
 */

'use strict';

let CT = new CTESM.CT();
let {
    WebService4Proxy,
} = CT.getClass();

// devURL4WWC devURL4Test devURL4Dev devURL4Dev2Natapp
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

// 删除地块接口测试1
if( false ){
    post4JSON.graphql( {
        url: '/',
        options: {
            ...requestOpt,
            body: JSON.stringify( {
                query: `
                    mutation ibms_region_undefineBlock{
                        ibms_region_undefineBlock( blockId: "19e63f6e3f4042fb917ca3f4677648f3" ),
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
if( false ){
    post4JSON.graphql( {
        url: '/',
        options: {
            ...requestOpt,
            body: JSON.stringify( {
                query: `
                query {
    ibms_alarm_getAlarmByContent( pageIndex: 1, pageSize: 30, beginStamptime: "2013-01-01 00:00:00", endStamptime: "2025-01-01 00:00:00" ){
        count,
        unCheckedCount,
        data{
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
        },
    },

    ibms_alarm_getMisinformationByContent( pageIndex: 1, pageSize: 30, beginStamptime: "2013-01-01 00:00:00", endStamptime: "2025-01-01 00:00:00" ){
        count,
        checkedCount,
        data{
            id,
            url,
            title,
            checkedAlarmTime,
            deviceId,
            deviceName,
            devieceFacturerName,
            deviceCategory,
            message,
            alarmLevel,
            subsystemName,
            checkedAccountId,
            misinformationMessage,
            reviewTime,
        },
    },
}
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

if( true ){
    import('gQLDir/GraphQLDemo.graphql').then( ( {
                                                     default: GraphQLDemo,
                                                     definitions,
                                                     // 字符串：Document
                                                     kind,
                                                     loc: {
                                                         source: {
                                                             // gql的字符串
                                                             body,
                                                         },
                                                     },
                                                 } ) => {
        console.dir( GraphQLDemo );
        console.dir( definitions );
        console.log( body );
    } );
}
