/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：2020-04-01 02:58
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

{
    if( true ){
        async function* AsyncGeneratorFun(){
            yield 1;
            yield 2;
            yield await new Promise( ( resolve = () => {
            }, reject = () => {
            } ) => void ( setTimeout( resolve, 400, 3 ) ) );
            yield 4;
            yield 5;

            return 6;
        }

        CT.isAsyncGeneratorFun( AsyncGeneratorFun );
        CT.isAsyncGenerator( AsyncGeneratorFun() );
    }
}
