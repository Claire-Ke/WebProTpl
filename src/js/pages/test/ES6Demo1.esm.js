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

let CT = new CTESM.CT();

// ?.
{
    if( false ){
        function Fun1(){
            console.dir( this );
        }

        function Fun2(){
            console.dir( this );
        }

        Fun1?.();
        Fun2?.();
        // 报错！！！
        // console.dir( Fun3?.() );
    }
}

// CT.completeAssign 1
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
            };

        console.dir( CT.completeAssign( obj1, obj2, obj3, ) );
    }
}

// CT.deepCopy 1
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
            };

        // obj2.__proto__ = obj3;
        // obj1.__proto__ = obj2;
        Object.setPrototypeOf( obj2, obj3 );
        Object.setPrototypeOf( obj1, obj2 );

        // console.dir( obj1 );
        console.dir( CT.deepCopy( obj1 ) );
    }
}

// CT.completeAssign 2
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
                obj3,
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
                obj2,
            };

        // console.dir( obj1 );
        console.dir( CT.completeAssign( obj1, obj3, ) );
    }
}

// CT.deepCopy 2
{
    if( false ){
        let obj3 = {
                attr7: 2027,
                set attr8( v ){
                },
                get attr9(){
                },
                [ Symbol( 'Symbol3' ) ]: 'SymbolValue3',
            },
            obj2 = {
                attr4: 2024,
                set attr5( v ){
                },
                get attr6(){
                },
                [ Symbol( 'Symbol2' ) ]: 'SymbolValue2',
                obj3,
            },
            obj1 = {
                attr1: 2021,
                set attr2( v ){
                },
                get attr3(){
                },
                [ Symbol( 'Symbol1' ) ]: 'SymbolValue1',
                obj2,
            };

        // obj2.__proto__ = obj3;
        // obj1.__proto__ = obj2;
        Object.setPrototypeOf( obj2, obj3 );
        Object.setPrototypeOf( obj1, obj2 );

        // console.dir( obj1 );
        console.dir( CT.deepCopy( obj1 ) );
    }
}

// WebService4Proxy测试
{
    if( false ){
        let { WebService4Proxy, } = CT.getClass();

        let ws4Proxy_ins = new WebService4Proxy( CT, 'http://192.168.1.2:9999/SimServer/' );

        /*
         ws4Proxy_ins.create( { type: 'json', } )
         .GET( {
         options: {
         method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json5',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );

         ws4Proxy_ins.json()
         .GET( {
         options: {
         method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json5',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );

         ws4Proxy_ins.get( { type: 'json', } )
         .GETFile( {
         options: {
         // method: 'GET',
         // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
         // responseType: 'json',
         mode: 'cors',
         credentials: 'omit',
         body: {
         type: 'json',
         },
         },
         } )
         .then( json => {
         console.dir( json );
         } );
         */

        ws4Proxy_ins.post( { type: 'json', } )
                    .POST( {
                        options: {
                            // method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            // responseType: 'json',
                            headers: new Headers( { 'Content-Type': 'application/json', } ),
                            mode: 'cors',
                            credentials: 'omit',
                            body: JSON.stringify( {
                                type: 'json',
                            } ),
                        },
                    } )
                    .then( json => {
                        console.dir( json );
                    } );
    }
}

// Reflect、Proxy的观察者模式的Demo测试
{
    if( false ){
        let observeTarget1 = {
                q: 'qqq',
                w: {
                    e: 'eee',
                    r: {
                        t: 'ttt',
                    },
                },
            },
            observeTarget2 = [
                1,
                [
                    2,
                    [
                        3,
                        [ 4, ],
                    ],
                ],
            ];

        let observeTarget4Proxy1 = CT.observe2Obj( observeTarget1, {
                isDeep: true,
                handle: ( keyName, newValue, oldValue ) => {
                    console.log( `set old ${ keyName }: ${ oldValue }` );
                    console.log( `set new ${ keyName }: ${ newValue }` );
                },
            } ),
            observeTarget4Proxy2 = CT.observe2Obj( observeTarget2, {
                isDeep: true,
                handle: ( keyName, newValue, oldValue ) => {
                    console.log( `set old ${ keyName }: ${ oldValue }` );
                    console.log( `set new ${ keyName }: ${ newValue }` );
                },
            } );

        observeTarget4Proxy1.w.r.t = 2020;
        observeTarget4Proxy2[ 1 ][ 1 ][ 1 ][ 0 ] = 2021;

        console.dir( observeTarget4Proxy1 );
        console.dir( observeTarget4Proxy2 );
    }
}

// Promise.any测试
{
    if( false ){
        let resolve1 = Promise.resolve( 'resolve1' ),
            resolve2 = Promise.resolve( 'resolve2' ),
            reject1 = Promise.reject( 'reject1' ),
            reject2 = Promise.reject( 'reject2' );

        /*
         Promise.any( [
         resolve1,
         resolve2,
         reject1,
         reject2,
         ] )
         .then( result => {
         // resolve1
         console.log( result );
         } );
         */

        Promise.any( [
                   reject1,
                   reject2,
               ] )
               .then( result => {
                   console.dir( result );
               } )
               .catch( ( result/*{ errors, stack, message }*/ ) => {
                   console.dir( result );

                   // [ 'reject1', 'reject2' ]
                   // console.dir( errors );

                   // AggregateError: No one promise resolved
                   //     at new AggregateError (webpack:///./node_modules/core-js/modules/esnext.aggregate-error.js?:20:27)
                   //     at eval (webpack:///./node_modules/core-js/modules/esnext.promise.any.js?:38:33)
                   // console.log( `stack--->${ stack }<---stack` );

                   // No one promise resolved
                   // console.log( `message--->${ message }` );
               } );
    }
}

// Promise.try测试
{
    if( false ){
        console.log( '1' );

        Promise.try( () => new Promise( ( resolve = () => {
               }, reject = () => {
               } ) => {
                   resolve( '5' );
               } ) )
               .then( arg => {
                   console.log( arg );
                   console.log( '4' );
               } )
               .catch( error => {
                   console.error( error.message );
               } );

        console.log( '2' );
    }
}
