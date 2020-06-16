/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 动态更新“GraphQL.Schema.json”。
 *
 * 开发：
 * http://192.168.1.100:8081/graphql/schema.json
 * 内网穿透的，指向开发的：
 * http://sn2020a.nat300.top/graphql/schema.json
 * 测试：
 * http://192.168.1.125:8080/graphql/schema.json
 */

'use strict';

const fs = require( 'fs' ),
    path = require( 'path' ),
    http = require( 'http' );

const jsonPath_strC = path.join( __dirname, '../../src/graphQL/GraphQL.Schema.json' ),
    outContent_obj = JSON.parse( fs.readFileSync( jsonPath_strC ) );

const option4Dev_objC = {
        host: '192.168.1.100',
        port: '8081',
        path: '/graphql/schema.json',
        method: 'GET',
        headers: {
            'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    },
    option4Dev2Natapp_objC = {
        host: 'sn2020a.nat300.top',
        port: '80',
        path: '/graphql/schema.json',
        method: 'GET',
        headers: {
            'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    },
    option4Test_objC = {
        host: '192.168.1.125',
        port: '8080',
        path: '/graphql/schema.json',
        method: 'GET',
        headers: {
            'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    },
    option4WWC_objC = {
        host: '192.168.1.75',
        port: '8081',
        path: '/graphql/schema.json',
        method: 'GET',
        headers: {
            'User-Agent': 'My NodeJS for Update4GraphQLSchemaJSON',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
        },
    };

function Update4GraphQLSchemaJSON( opt = {} ){
    return new Promise( ( resolve = () => {
    }, reject = () => {
    } ) => void ( http.get( opt, res => {
                          const {
                              statusCode,
                          } = res;
                          const contentType = res.headers[ 'content-type' ];

                          let error = null;

                          if( statusCode !== 200 ){
                              error = new Error( 'Request Failed.\n' + `Status Code: ${ statusCode }` );
                          }
                          else if( !/^application\/json/.test( contentType ) ){
                              error = new Error( 'Invalid content-type.\n' + `Expected application/json but received ${ contentType }` );
                          }

                          if( error ){
                              // 使用响应数据释放内存
                              res.resume();

                              return error;
                          }

                          res.setEncoding( 'utf8' );

                          let rawData = '';

                          res.on( 'data', chunk => void ( rawData += chunk ) );

                          res.on( 'end', () => {
                              try{
                                  resolve( JSON.parse( rawData ) );
                              }
                              catch( e ){
                                  reject( e );
                              }
                          } );
                      } )
                      .on( 'error', e => void ( reject( e ) ) ) ) );
}

// 根据需要自己选取用哪个：option4Dev_objC option4Dev2Natapp_objC option4Test_objC option4WWC_objC
Update4GraphQLSchemaJSON( option4Dev2Natapp_objC )
    .then( result => void ( fs.writeFileSync( jsonPath_strC, JSON.stringify( Object.assign( {}, outContent_obj, result ) ) ) ) )
    .catch( e => void ( console.error( e ) ) );
