/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

let fs = require( 'fs' ),
    path = require( 'path' );

( () => {
    let outPath_str = path.join( __dirname, './' ),
        read_fun = ( filePath_str = '' ) => fs.readFileSync( filePath_str ),
        tsConfig_obj = JSON.parse( read_fun( path.join( __dirname, './tsconfig.json' ) ) ),
        arr1 = fs.readdirSync( path.join( __dirname, './node_modules/typescript/lib' ) )
        .filter( ( c, i, a ) => !fs.statSync( path.join( __dirname, `./node_modules/typescript/lib/${ c }` ) )
        .isDirectory() )
        .filter( ( c, i, a ) => c.startsWith( 'lib.' ) && c.endsWith( '.d.ts' ) );

    tsConfig_obj[ 'compilerOptions' ][ 'lib' ] = [
        'dom',
        'ES5',
        'ES6',
        'ES2015',
        'ES2016',
        'ES2017',
        'ES2018',
        'ES2019',
        'ES2020',
        'ESNext',
        'ScriptHost',
        'WebWorker',
    ].concat( arr1 );

    fs.writeFileSync( outPath_str + 'tsconfig.json', JSON.stringify( tsConfig_obj ) );
} )();
