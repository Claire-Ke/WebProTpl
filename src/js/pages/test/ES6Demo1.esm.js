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
    if( true ){
        let { WebService4Proxy, } = CT.getClass();

        let ws4Proxy_ins = new WebService4Proxy( CT, 'http://192.168.1.2:9999/SimServer/' );

        ws4Proxy_ins.create( /*这里的参数可传可不传！！！传的话会取代上面调用类的构造参数*/ )
                    .GETFile( {
                        // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：上面调用类的构造参数 + 具体方法名(也就是GETFile) + url
                        // url: '/?type=json',
                        options: {
                            method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            responseType: 'json',
                            mode: 'cors',
                            credentials: 'omit',
                            body: {
                                type: 'json',
                            },
                        },
                    } )
                    .then( response => {
                        response.clone()
                                .json()
                                .then( result => {
                                    console.dir( result );
                                } );

                        return response.clone();
                    } );

        ws4Proxy_ins.create( /*这里的参数可传可不传！！！传的话会取代上面调用类的构造参数*/ )
                    .GET( {
                        // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：上面调用类的构造参数 + 具体方法名(也就是GET) + url
                        // url: '/?type=json',
                        options: {
                            method: 'GET',
                            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
                            responseType: 'json',
                            mode: 'cors',
                            credentials: 'omit',
                            body: {
                                type: 'json5',
                            },
                        },
                    } )
                    .then( response => {
                        response.clone()
                                .json()
                                .then( result => {
                                    console.dir( result );
                                } );

                        return response.clone();
                    } );
    }
}
