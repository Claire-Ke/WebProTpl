/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：2020-03-26 13:52
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

let CT = new CTESM.CT();

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.readText4Clip( text => {
            CT.iInsertB( '.helloWorld article', `<p class = 'css-reset' >${ text }</p><br />` );
        }, {
            error( error ){
                console.error( error.message );
            },
        } );
    }, false );
}

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.writeText4Clip( '这是写入系统剪切板的字符串内容！！！', {
            success(){
                console.log( '写入系统剪切板成功！！！' );
            },
            fail(){
                console.error( '写入系统剪切板失败！！！' );
            },
        } );
    }, false );
}

if( false ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        CT.read4Clip( ( data4Blob, type ) => {
            console.log( type );
            console.dir( data4Blob );
        }, );
    }, false );
}

if( true ){
    CT.aCE( '.permissionsAPITestBtn1', event => {
        /*
         let data = new Blob( '这是写入系统剪切板的字符串内容！！！', {
         // native transparent
         // endings: 'transparent',
         type: 'text/plain',
         } );
         */

        let data = new DataTransfer();
        data.items.add( '1这是写入系统剪切板的字符串内容！！！', 'text/plain' );

        CT.write4Clip( data, {
            success(){
                console.log( '写入成功！！！' );
            },
            fail(){
                console.error( '写入失败！！！' );
            },
        } );
    }, false );
}
