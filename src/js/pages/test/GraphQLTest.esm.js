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
            'Accept-Encoding': 'gzip',
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
    } );
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

                post4JSON.graphql( {
                    url: '/',
                    options: {
                        ...requestOpt,
                        body: JSON.stringify( {
                            query: `mutation ibms_region_undefineBlock{
    ibms_region_undefineBlock( blockId: "a26b21dce0df435696cff88b594ad7c8" ),
}`,
                        } ),
                    },
                    events: {
                        success: ( data4ResponseType, response ) => {
                            console.log( 'success，请求成功------>Start' );
                            console.dir( data4ResponseType );
                            console.log( 'success，请求成功------>End' );

                            post4JSON.graphql( {
                                url: '/',
                                options: {
                                    ...requestOpt,
                                    body: JSON.stringify( {
                                        query: `query{
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
}`,
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
                            } );
                        },
                        error: ( status_num, response ) => {
                            console.warn( `错误，请求状态码：${ status_num }------>Start` );
                            console.error( response );
                            console.warn( `错误，请求状态码：${ status_num }------>End` );
                        },
                    },
                } );
            },
            error: ( status_num, response ) => {
                console.warn( `错误，请求状态码：${ status_num }------>Start` );
                console.error( response );
                console.warn( `错误，请求状态码：${ status_num }------>End` );
            },
        },
    } );
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
                        ibms_region_undefineBlock( blockId: "96334ec1f0f24ca4b2ec589e4a6826c3" ),
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
    } );
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
    } );
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
    } );
}

if( false ){
    ( async () => {
        import('../../../../src/graphQL/SN_Alert.graphql').then( resultModule => {
            // resultModule有如下属性字段：
            // MyQuery1: definitions、kind、loc
            // MyQuery2: definitions、kind、loc
            // MyQuery3: definitions、kind、loc
            // definitions
            // kind
            // loc
            // default: 上面6个都包含了
            console.dir( resultModule );
            console.log( resultModule.loc.source.body );
        } );
    } )();
}

// 警报接口测试1 全文检索查询未复核警报 通过
if( false ){
    ( async () => {
        let {
            default: SN_Alert,
            definitions,
            // 字符串：Document
            kind,
            loc: {
                source: {
                    // gql的字符串
                    body,
                },
            },
        } = await import('gQLDir/SN_Alert.graphql');

        console.dir( SN_Alert );
        console.log( body );

        post4JSON.graphql( {
            url: '/',
            options: {
                ...requestOpt,
                body: JSON.stringify( {
                    query: body,
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
        } );

    } )();
}

import SN_Alert from 'gQLDir/SN_Alert.graphql';

console.dir( SN_Alert );
console.log( SN_Alert.loc.source.body );

// 警报接口测试1 全文检索查询未复核警报 通过
if( true ){
    const {
        loc: {
            source: {
                body,
            },
        },
    } = SN_Alert;

    post4JSON.graphql( {
        url: '/',
        options: {
            ...requestOpt,
            body: JSON.stringify( {
                query: body,
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
    } );
}
