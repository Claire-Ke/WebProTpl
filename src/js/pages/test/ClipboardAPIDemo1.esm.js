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

CT.permissionsQuery( {
    name: 'clipboard-read',
}, {
    prompt(){
        console.log( '提示授权！！！' );
    },
    granted(){
        console.log( '已经授权！！！' );
    },
    denied(){
        console.log( '拒绝授权！！！' );
    },
    stateChange( _this ){
        console.log( '授权状态发生变化！！！Start' );
        console.dir( _this );
        console.log( '授权状态发生变化！！！End' );
    },
} );
