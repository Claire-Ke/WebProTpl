/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

    // process.cwd()输出G:\\WebStormWS\\WebProTpl

let path = require( 'path' ),
    webpack = require( 'webpack' ),
    copyWebpackPlugin = require( 'copy-webpack-plugin' ),
    VueLoaderPlugin = require( 'vue-loader/lib/plugin.js' ),
    AssetsWebpackPlugin = require( 'assets-webpack-plugin' ),
    MiniCSSExtractPlugin = require( 'mini-css-extract-plugin' ),
    ForkTsCheckerWebpackPlugin = require( 'fork-ts-checker-webpack-plugin' ),
    ForkTsCheckerNotifierWebpackPlugin = require( 'fork-ts-checker-notifier-webpack-plugin' ),
    os = require( 'os' ),
    baseConfig = require( './webpack.BaseConfig.js' ),
    htmlConfig = require( './configures/HTMLConfig.js' );

let { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

let isPro = process.argv[ 3 ] === 'production',
    define_obj = baseConfig.defineObj_fun( isPro );

define_obj[ 'proCat' ] = '"production"';

module.exports = {
    target: 'web',
    mode: 'production',
    entry: baseConfig.entry_obj,
    output: baseConfig.output_fun( {
        path,
        __dirname,
        proName_str: 'production',
        // chunkhash hash contenthash
        hashName_str: 'contenthash',
    } ),
    module: {
        rules: baseConfig.moduleRules_fun( {
            path,
            __dirname,
            isPro,
            MiniCSSExtractPlugin,
            noTest_boo: true,
            isESM_boo: true,
        } ),
    },
    resolve: baseConfig.resolve_fun( path, __dirname, isPro ),
    externals: baseConfig.externals_obj,
    plugins: htmlConfig.concat( [
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
        new CleanWebpackPlugin( baseConfig.cleanWebpackPluginConfig_fun( 'production' ) ),
        new copyWebpackPlugin( baseConfig.copyWebpackPluginConfig_arr ),
        new AssetsWebpackPlugin( Object.assign( {}, baseConfig.AssetsWebpackPluginOption_obj, {
            keepInMemory: false,
            path: path.resolve( __dirname, `./dist/production/others/` ),
        } ) ),
    ] ),
    optimization: baseConfig.optimization_fun( isPro, false ),
    node: baseConfig.node_obj,
    cache: false,
    watch: false,
    parallelism: os.cpus().length,
    profile: false,
    performance: baseConfig.performance_obj,
    recordsPath: baseConfig.recordsPath_fun( 'production' ),
    // stats: baseConfig.stats_obj,
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
