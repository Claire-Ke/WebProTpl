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

// Generator的function.sent测试
{
    if( false ){
        function* dataConsumer(){
            // console.log( `0. `, function.sent );

            console.log( `1. ${ yield 11 }` );

            console.log( `2. ${ yield 22 }` );

            console.log( `3. ${ yield 33 }` );

            return 'result';
        }

        let genObj = dataConsumer();

        console.dir( genObj.next( 0 ) );
        console.dir( genObj.next( 1 ) );
        console.dir( genObj.next( 2 ) );
        console.dir( genObj.next( 3 ) );
    }
}

// 异步遍历器测试
{
    if( false ){
        function PromiseA(){
            return new Promise( ( resolve = () => {
            }, reject = () => {
            } ) => void ( setTimeout( resolve, 5000, 222 ) ) );
        }

        async function* Fun1(){
            yield 1;
            yield 2;
            yield await PromiseA();
            yield 3;
            yield 4;
        }

        ( async () => {
            for await( let value of
                Fun1() ){
                console.log( value );
            }
        } )();
    }
}

// Symbol.asyncIterator测试
{
    if( false ){
        function PromiseA(){
            return new Promise( ( resolve = () => {
            }, reject = () => {
            } ) => void ( setTimeout( resolve, 5000, 222 ) ) );
        }

        let obj1 = {
            async * [ Symbol.asyncIterator ](){
                yield 1;
                yield 2;
                yield await PromiseA();
                yield 3;
            },
        };

        ( async () => {
            for await( let value of
                obj1 ){
                console.log( value );
            }
        } )();
    }
}

// Decorator测试
{
    if( false ){

        let {
            ArrayType,
            AutoBind,
            BigIntType,
            BooleanType,
            DateType,
            FormDataType,
            FunctionType,
            NaNType,
            NoConfigurable,
            NoEnumerable,
            NullType,
            NumberType,
            NumberFiniteType,
            NumberIntegerType,
            NumberSafeIntegerType,
            ObjectType,
            Override,
            ReadOnly,
            RegExpType,
            StringType,
            SymbolType,
            UndefinedType,
        } = DecESM;

        class ClassC{

            constructor(){
            }

            method3( arg1, arg2 ){
                console.log( 'ClassC method3' );
            }

            static method4( arg1, arg2, arg3 ){
                console.log( 'ClassC static method4' );
            }

        }

        class ClassB
            extends ClassC{

            #Getter1 = 'ClassB #Getter1';
            static #Getter2 = 'ClassB static #Getter2';

            constructor(){
                super();
            }

            get Getter1(){
                return this.#Getter1;
            }

            set Getter1( newValue ){
                this.#Getter1 = newValue;
            }

            static get Getter2(){
                return this.#Getter2;
            }

            static set Getter2( newValue ){
                this.#Getter2 = newValue;
            }

            method3( arg1 ){
                console.log( 'ClassB method3' );
            }

            static method4( arg1, arg2 ){
                console.log( 'ClassB static method4' );
            }

        }

        class ClassA
            extends ClassB{

            @NoConfigurable
            @ReadOnly
            @NoEnumerable
            property1 = 'ClassA 实例属性1';

            @NoConfigurable
            @ReadOnly
            @NoEnumerable
            static property2 = 'ClassA 静态属性1';

            @ArrayType
            property3 = [ 1, ];

            @BigIntType
            static property4 = 1n;

            @BooleanType
            static property5 = true;

            @DateType
            static property6 = new Date();

            @FormDataType
            static property7 = new FormData();

            @FunctionType
            static property8 = () => {
            };

            @NaNType
            static property9 = NaN;

            @NullType
            static property10 = null;

            @NumberType
            static property11 = 2020;

            @ObjectType
            static property12 = {};

            @RegExpType
            static property13 = new RegExp();

            @StringType
            static property14 = 'String';

            @SymbolType
            static property15 = Symbol( 'SymbolA' );

            @UndefinedType
            static property16 = undefined;

            @NumberFiniteType
            static property17 = 1;

            @NumberIntegerType
            static property18 = 1.0;

            @NumberSafeIntegerType
            static property19 = -( 2 ** 53 - 1 );

            #Getter1 = 'ClassA #Getter1';
            static #Getter2 = 'ClassA static #Getter2';

            constructor(){
                super();
            }

            @NoConfigurable
            @ReadOnly
            method1(){
            }

            @NoConfigurable
            @ReadOnly
            static method2(){
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            get Getter1(){
                return this.#Getter1;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            set Getter1( newValue ){
                this.#Getter1 = newValue;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            static get Getter2(){
                return this.#Getter2;
            }

            @NoConfigurable
            @NoEnumerable
            @Override
            static set Getter2( newValue ){
                this.#Getter2 = newValue;
            }

            @Override
            method3( arg1 ){
                super.method3();
                // console.log( 'ClassA method3' );
            }

            @Override
            static method4( arg1, arg2 ){
                super.method4();
                // console.log( 'ClassA static method4' );
            }

        }

        try{
            let classA_ins = new ClassA();

            // ClassA.method4();
            // classA_ins.method3();

            // true
            // console.log( ClassA === ClassA.prototype.constructor );
            // true
            // console.log( classA_ins.constructor === ClassA );
            // true
            // console.log( classA_ins.constructor === ClassA.prototype.constructor );

            // true
            // console.log( Object.getPrototypeOf( classA_ins ) === ClassA.prototype );
            // true
            // console.log( classA_ins.__proto__ === ClassA.prototype );

            // false
            // console.log( Object.getPrototypeOf( ClassA ) === ClassA.prototype );
            // true
            // console.log( Object.getPrototypeOf( ClassA ) === ClassA.__proto__ );

        }
        catch( error ){
            console.error( error.message );
        }

    }
}
