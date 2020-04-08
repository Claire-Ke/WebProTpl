/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：2020-04-09 02:11
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

( async () => {

    const str1 = `An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.`,
        digestHex1 = await CT.getDigest2Hex4String( str1, 'SHA-512' );

    const arr1 = new Uint8Array( new TextEncoder().encode( String( str1 ) ) ),
        digestHex2 = await CT.getDigest2Hex4Uint8Array( arr1, 'SHA-512' );

    console.log( digestHex1 );
    console.log( digestHex2 );
} )();
