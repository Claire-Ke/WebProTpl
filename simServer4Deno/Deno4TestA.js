/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-05-16 17:24:19
 * IDE: WebStorm
 */

'use strict';

import { serve } from 'https://deno.land/std@0.50.0/http/server.ts';

console.dir( 'Deno4TestA Start!' );

{
    if( true ){
        const s = serve( { port: 8520 } );

        console.log( 'http://localhost:8520/' );

        for await ( const req of
            s ){

            req.respond( {
                body: 'Hello World\n',
            } );

        }
    }
}

{
    if( false ){
        const wasmCode = new Uint8Array( [
                0,
                97,
                115,
                109,
                1,
                0,
                0,
                0,
                1,
                133,
                128,
                128,
                128,
                0,
                1,
                96,
                0,
                1,
                127,
                3,
                130,
                128,
                128,
                128,
                0,
                1,
                0,
                4,
                132,
                128,
                128,
                128,
                0,
                1,
                112,
                0,
                0,
                5,
                131,
                128,
                128,
                128,
                0,
                1,
                0,
                1,
                6,
                129,
                128,
                128,
                128,
                0,
                0,
                7,
                145,
                128,
                128,
                128,
                0,
                2,
                6,
                109,
                101,
                109,
                111,
                114,
                121,
                2,
                0,
                4,
                109,
                97,
                105,
                110,
                0,
                0,
                10,
                138,
                128,
                128,
                128,
                0,
                1,
                132,
                128,
                128,
                128,
                0,
                0,
                65,
                42,
                11,
            ] ),
            wasmModule = new WebAssembly.Module( wasmCode ),
            wasmInstance = new WebAssembly.Instance( wasmModule );

        console.log( wasmInstance.exports.main()
                                 .toString() );
    }
}

console.dir( 'Deno4TestA End!' );
