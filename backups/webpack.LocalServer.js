/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

    // process.cwd()输出G:\\WebStormWS\\WebProTpl

let webpackLocalServer_obj = require( './configures/GlobalProp.js' ).webpackLocalServer_obj,
    webProName_str = webpackLocalServer_obj.proName_str,
    webProHost_str = webpackLocalServer_obj.localHost_str,
    webProPort_num = webpackLocalServer_obj.localServerPort_num,
    publicPath_str = '/dist/localServer/',
    openPage_str = publicPath_str + 'pages/' + webpackLocalServer_obj.openPage_str;

let fs = require( 'fs' ),
    path = require( 'path' ),
    webpack = require( 'webpack' ),
    copyWebpackPlugin = require( 'copy-webpack-plugin' ),
    VueLoaderPlugin = require( 'vue-loader/lib/plugin.js' ),
    AssetsWebpackPlugin = require( 'assets-webpack-plugin' ),
    MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' ),
    ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' ),
    ForkTsCheckerNotifierWebpackPlugin = require( 'fork-ts-checker-notifier-webpack-plugin' ),
    os = require( 'os' ),
    baseConfig = require( './webpack.BaseConfig.js' ),
    htmlConfig = require( './configures/HTMLConfig.js' ),
    proxyConfig = require( './configures/ProxyConfig.js' );

let isPro = process.argv[ 3 ] === 'production',
    watchIgnored_arr = baseConfig.watchIgnored_arr,
    watchOptions_obj = baseConfig.watchOptions_obj,
    define_obj = baseConfig.defineObj_fun( isPro );

define_obj[ 'proCat' ] = '"localServer"';

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

        // 插件顺序很重要。错误的顺序将导致一些钩子未定义并且生成失败
        new ForkTsCheckerWebpackPlugin( {
            tsconfig: path.resolve( __dirname, './tsconfig.json' ),
            // 允许覆盖TypeScript options(编译选项compiler options，TypeScript选项应使用tsconfig.json文件设置)。应该以与“tsconfig.json”中的“compilerOptions”属性相同的格式指定。
            // compilerOptions: {},
            // 可选值：true | undefined
            eslint: false,
            // eslintOptions: {},
            async: true,
            // 默认值：number[]，要忽略的TypeScript诊断代码列表。
            // ignoreDiagnostics: [],
            // 默认值：string[]，eslint规则名称列表，可忽略。
            // ignoreLints: [],
            // 如果为true，将忽略所有棉绒警告。
            ignoreLintWarnings: false,
            // 仅报告与这些全局模式匹配的文件中的错误。当某些类型定义具有对您的应用程序不致命的错误时，这很有用。
            reportFiles: [
                'src/components/**/*.{ts,tsx}',
                'src/js/**/*.{ts,tsx}',
                'src/vue/**/*.{ts,tsx}',
                'src/vue/**/*.{vue}',
                'src/webComponents/**/*.{ts,tsx}',
            ],
            // 数据类型是object，记录器实例。应该是实现方法的对象：error、warn、info，默认值：console。
            // logger: {},
            // formatter: 'default',
            // 数据类型是object，
            // formatterOptions: {},
            // 默认值：false，如果为true，则不会发出console.log消息。请注意，大多数错误消息都是通过webpack发出的，不受此标志的影响。
            silent: false,
            checkSyntacticErrors: true,
            // 服务进程的内存限制，以MB为单位
            memoryLimit: 4096,
            vue: true,
            // 如果为true，插件将使用TypeScript 2.7中引入的增量编译API。使用TypeScript 3+时默认为true，低于3时默认为false。可以通过直接指定值来覆盖默认值。不要将它与启用VueJs一起使用-它还不受支持。
            useTypescriptIncrementalApi: true,
            // 如果为true，则插件将测量编译代码中花费的时间。这可能有助于比较模式，特别是在编译中涉及到其他加载程序/插件的情况下。需要Node.js>=8.5.0
            measureCompilationTime: true,
            typescript: path.resolve( __dirname, './node_modules/typescript' ),
        } ),
        new ForkTsCheckerNotifierWebpackPlugin( {
            // 通知中显示的标题前缀。
            title: 'Webpack4TypeScript',
            // 如果设置为true，警告将不会引起通知。
            excludeWarnings: false,
            // 每次触发通知。称其为“噪音模式”。
            alwaysNotify: true,
            // 不要在第一个版本上通知。这使您可以在后续增量构建上收到通知，而无需在初始构建上得到通知。
            skipFirstNotification: true,
            // 跳过有关成功构建的通知。
            skipSuccessful: true,
        } ),

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
    // stats: baseConfig.stats_obj,
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
