/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let fs = require( 'fs' ),
    path = require( 'path' );

( () => {
    let outPath_str = path.join( __dirname, './' ),
        read_fun = ( filePath_str = '' ) => fs.readFileSync( filePath_str ),
        tsConfig_obj = JSON.parse( read_fun( path.join( __dirname, './tsconfig.json' ) ) );

    tsConfig_obj[ 'compilerOptions' ][ 'lib' ] = Array.from( new Set( [
                                                          'dom',
                                                          'es2015',
                                                          'es2016',
                                                          'es2017',
                                                          'es2018',
                                                          'es2019',
                                                          'es2020',
                                                          'es5',
                                                          'es6',
                                                          'es7',
                                                          'esnext',
                                                          'scripthost',
                                                          'webworker'
                                                      ].concat( fs.readdirSync( path.join( __dirname, './node_modules/typescript/lib' ) )
                                                                  .filter( ( c, i, a ) => !fs.statSync( path.join( __dirname, `./node_modules/typescript/lib/${ c }` ) )
                                                                                             .isDirectory() )
                                                                  .filter( ( c, i, a ) => c.startsWith( 'lib.' ) && c.endsWith( '.d.ts' ) && c !== 'lib.d.ts' )
                                                                  .map( ( c, i, a ) => c.slice( 4, -5 )
                                                                                        .toLowerCase() ) ) ) )
                                                      .sort();

    fs.writeFileSync( outPath_str + 'tsconfig.json', JSON.stringify( tsConfig_obj ) );
} )();
