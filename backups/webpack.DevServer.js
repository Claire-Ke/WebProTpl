/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

    // process.cwd()输出G:\\WebStormWS\\WebProTpl

let webpackDevServer_obj = require( './configures/GlobalProp.js' ).webpackDevServer_obj,
    webProName_str = webpackDevServer_obj.proName_str,
    webProHost_str = webpackDevServer_obj.localHost_str,
    webProPort_num = webpackDevServer_obj.devServerPort_num,
    publicPath_str = '/dist/devServer/',
    openPage_str = publicPath_str + 'pages/' + webpackDevServer_obj.openPage_str;

let fs = require( 'fs' ),
    path = require( 'path' ),
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

define_obj[ 'proCat' ] = '"devServer"';

function ResIcon( req, res, url = path.resolve( __dirname, './simServer/staticResources/img/favicon.ico' ) ){
    console.log( '------devServer before------Start' );
    console.log( `客户端的请求URL--->${ req.url }` );
    console.dir( req.headers );
    console.log( '------devServer before------End' );

    res.setHeader( 'Content-Type', 'image/vnd.microsoft.icon' );
    fs.createReadStream( url )
      .pipe( res );
    res.statusCode = 200;
    res.statusMessage = 'OK';
}

module.exports = {
    target: 'web',
    mode: 'development',
    entry: baseConfig.entry_obj,
    output: baseConfig.output_fun( {
        path,
        __dirname,
        proName_str: 'devServer',
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
            path: path.resolve( __dirname, `./dist/devServer/others/` ),
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
    recordsPath: baseConfig.recordsPath_fun( 'devServer' ),
    devServer: {
        contentBase: path.join( __dirname, './dist/devServer/' ),
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
        headers: webpackDevServer_obj.crossResHeader_obj,
        open: true,
        openPage: webProName_str + openPage_str,
        writeToDisk: false, // true表示把内存里的文件写到硬盘里，被开发者可见，false反之
        before( app, server, compiler ){
            console.log( '------>devServer before<------' );

            app.get( '/favicon.ico', ( req, res ) => {
                ResIcon( req, res );
            } );

            app.get( '/apple-touch-icon.png', ( req, res ) => {
                ResIcon( req, res );
            } );

            app.get( '/apple-touch-icon-precomposed.png', ( req, res ) => {
                ResIcon( req, res );
            } );
        },
        after( app, server, compiler ){
            console.log( '------>devServer after<------' );
        },
        // 拦截“GET”请求
        // 不建议使用该选项，而建议使用devServer.before，并将在v3.0.0中将其删除。
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
