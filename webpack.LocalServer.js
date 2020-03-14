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

    // process.cwd()输出G:\\WebStormWS\\WebProTpl

let webpackLocalServer_obj = require( './configures/GlobalProp.js' ).webpackLocalServer_obj,
    webProName_str = webpackLocalServer_obj.proName_str,
    webProHost_str = webpackLocalServer_obj.localHost_str,
    webProPort_num = webpackLocalServer_obj.localServerPort_num,
    publicPath_str = '/dist/localServer/',
    openPage_str = publicPath_str + 'pages/' + webpackLocalServer_obj.openPage_str;

let path = require( 'path' ),
    webpack = require( 'webpack' ),
    copyWebpackPlugin = require( 'copy-webpack-plugin' ),
    VueLoaderPlugin = require( 'vue-loader/lib/plugin.js' ),
    AssetsWebpackPlugin = require( 'assets-webpack-plugin' ),
    MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' ),
    os = require( 'os' ),
    baseConfig = require( './webpack.BaseConfig.js' ),
    htmlConfig = require( './configures/HTMLConfig.js' ),
    proxyConfig = require( './configures/ProxyConfig.js' );

let isPro = process.argv[ 3 ] === 'production',
    watchIgnored_arr = baseConfig.watchIgnored_arr,
    watchOptions_obj = baseConfig.watchOptions_obj,
    define_obj = baseConfig.defineObj_fun( isPro );

define_obj[ 'proCat' ] = '"localServer"';

module.exports = {
    target: 'web',
    mode: 'development',
    entry: baseConfig.entry_obj,
    output: baseConfig.output_fun( {
        path,
        __dirname,
        proName_str: 'localServer',
        // chunkhash hash contenthash
        hashName_str: 'contenthash',
    } ),
    module: {
        rules: baseConfig.moduleRules_fun( {
            path,
            __dirname,
            isPro,
            MiniCSSExtractPlugin,
            noTest_boo: false,
            isESM_boo: true,
        } ),
    },
    resolve: baseConfig.resolve_fun( path, __dirname, isPro ),
    externals: baseConfig.externals_obj,
    plugins: htmlConfig.concat( [
        new webpack.WatchIgnorePlugin( watchIgnored_arr ),
        new webpack.DefinePlugin( define_obj ),
        new webpack.ProvidePlugin( baseConfig.provide_obj ),
        new VueLoaderPlugin(),
        new webpack.HashedModuleIdsPlugin( baseConfig.hashedModuleIds_obj ),
        new webpack.optimize.SplitChunksPlugin( baseConfig.splitChunks_obj ),
        new MiniCSSExtractPlugin( {
            // 默认值是webpackOptions.output.publicPath
            // publicPath: '../',
            // chunkhash hash contenthash
            filename: 'styles/[name]_[contenthash:6].css',
            chunkFilename: 'styles/[name]_chunk_[contenthash:6].css',
        } ),
        new copyWebpackPlugin( baseConfig.copyWebpackPluginConfig_arr ),
        new AssetsWebpackPlugin( Object.assign( {}, baseConfig.AssetsWebpackPluginOption_obj, {
            keepInMemory: true,
            path: path.resolve( __dirname, `./dist/localServer/others/` ),
        } ) ),
    ] ),
    optimization: baseConfig.optimization_fun( isPro ),
    node: baseConfig.node_obj,
    cache: true,
    watch: true,
    watchOptions: watchOptions_obj,
    parallelism: os.cpus().length,
    profile: true,
    performance: baseConfig.performance_obj,
    recordsPath: baseConfig.recordsPath_fun( 'localServer' ),
    devServer: {
        contentBase: path.join( __dirname, './dist/localServer/' ),
        publicPath: `http://${ webProHost_str }:${ webProPort_num }/${ webProName_str }${ publicPath_str }`,
        host: webProHost_str,
        port: webProPort_num,
        disableHostCheck: true,
        compress: true,
        hot: false,
        hotOnly: false,
        // none info
        clientLogLevel: 'none',
        https: false,
        useLocalIp: false,
        overlay: {
            warnings: false,
            errors: true,
        },
        noInfo: false,
        quiet: false,
        watchContentBase: true,
        watchOptions: watchOptions_obj,
        proxy: proxyConfig,
        headers: webpackLocalServer_obj.crossResHeader_obj,
        open: true,
        openPage: webProName_str + openPage_str,
        writeToDisk: false, // true表示把内存里的文件写到硬盘里，被开发者可见，false反之
        before( app, server ){
            console.log( '------>devServer before<------' );
        },
        after( app, server ){
            console.log( '------>devServer after<------' );
        },
        // 拦截“GET”请求
        // setup( app, server ){
        //     app.get( '/WebProTpl/dist/*', ( req, res ) => {
        //         console.log( '------>devServer setup<------Start' );
        //         console.log( `客户端的请求URL--->${ req.url }` );
        //         console.log( `客户端的请求方法--->${ req.method }` );
        //         console.dir( req.headers );
        //         console.log( '------>devServer setup<------End' );
        //     } );
        // },
    },
    /*
     // 可能在“Webpack 5”中有效，“Webpack 4”中会报错！！！
     experiments: {
     outputModule: true,
     mjs: true,
     topLevelAwait: true,
     importAsync: true,
     importAwait: true,
     asyncWebAssembly: true,
     },
     */
};
