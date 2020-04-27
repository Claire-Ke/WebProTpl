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
        // new ForkTsCheckerWebpackPlugin( baseConfig.ForkTsCheckerWebpackPlugin_obj ),
        // new ForkTsCheckerNotifierWebpackPlugin( baseConfig.ForkTsCheckerNotifierWebpackPlugin_obj ),

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
