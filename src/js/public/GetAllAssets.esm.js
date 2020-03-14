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

/**
 * 异步函数(使用了fetch)，获取本项目打包后的所有资产文件的路径，以及自行添加的外部第三方的URL资源
 *
 * @param url 字符串，一般默认就行('../others/ProjectAssets.json')。可选
 *
 * @param option JSON配置对象，一般默认就行，用于fetch的第二个配置参数。可选
 *
 * @returns {Promise<Array>} Promise<Array>，成功的话，会返回一个Promise<Array>。
 */
async function GetAllAssets( url = '../others/ProjectAssets.json', option = {} ){
    let CTAllAssets = await fetch( url, Object.assign( {}, {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
    }, option ) )
        .then( response => {
            if( response && response.ok && response.status === 200 ){
                return response.clone()
                               .json()
                               .then( json => {
                                   let obj = json,
                                       CTAllAssets = [],
                                       item;

                                   Object.keys( obj )
                                         .filter( ( c, i, a ) => c !== '' && c !== 'metadata' )
                                         .forEach( ( c, i, a ) => {
                                             item = obj[ c ];

                                             if( Object.prototype.toString.call( item )
                                                       .includes( 'String' ) ){
                                                 CTAllAssets.push( item );
                                             }
                                             else if( Array.isArray( item ) ){
                                                 CTAllAssets.push( ...item );
                                             }
                                             else if( Object.prototype.toString.call( item )
                                                            .includes( 'Object' ) ){
                                                 CTAllAssets.push( ...( Object.values( item )
                                                                              .flat( Infinity ) ) );
                                             }
                                         } );

                                   CTAllAssets.push( ...( Object.values( obj[ '' ] )
                                                                .flat( Infinity ) ) );

                                   CTAllAssets.push( obj.metadata.assetsFileName );
                                   CTAllAssets.push( ...( obj.metadata.externalAssets ) );

                                   return CTAllAssets;
                               } )
                               .catch( error => {
                                   console.error( error.message );
                               } );
            }
        } )
        .catch( error => {
            console.error( error.message );
        } );

    return Array.from( new Set( CTAllAssets ) );
}

export {
    GetAllAssets,
};

export default GetAllAssets;
