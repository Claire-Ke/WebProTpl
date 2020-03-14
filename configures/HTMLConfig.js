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

/**
 * htmlWebpackPlugin配置
 *
 * 这个.js基本只要配置new htmlWebpackPlugin({})的参数选项，复制模板后，修改各个选项就行！
 */

let SubresourceIntegrityPlugin = require( 'webpack-subresource-integrity' ),
    htmlWebpackPlugin = require( 'html-webpack-plugin' ),
    htmlConfig_obj = require( './GlobalProp.js' ).htmlConfig_objC,
    app = require( '../src/js/App.js' ),
    pageRoutingManagement_obj = app.pageRoutingManagement_obj,
    isSPA_booC = app.isSPA_booC,
    /**
     * process.argv[ 3 ]--->production
     * 如：package.json中scripts字段里production字段的"webpack --mode production --config webpack.Production.js"
     *
     * @type {boolean} boolean
     */
    isPro_boo = process.argv[ 3 ] === 'production',
    /**
     * proN_str--->Production
     * 如：package.json中scripts字段里production字段的"webpack --mode production --config webpack.Production.js"
     *
     * @type {string} string
     */
    proN_str = process.argv[ 5 ].split( '.' )[ 1 ],
    minify_obj = {
        html5: true,
        removeComments: isPro_boo,
        removeScriptTypeAttributes: isPro_boo,
        removeStyleLinkTypeAttributes: isPro_boo,
        removeEmptyAttributes: isPro_boo,
        removeAttributeQuotes: false,
        minimize: isPro_boo,
        minifyJS: isPro_boo,
        minifyCSS: isPro_boo,
        collapseWhitespace: isPro_boo,
    },
    weinreDevTool_str = isPro_boo
                        ? ''
                        : htmlConfig_obj.weinreDevTool_str,
    dynamicREM_str = htmlConfig_obj.dynamicREM_str,
    /**
     * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
     *
     * @param fileName_str 字符串，编译完成后，这个页面的文件名，不加后缀名，必须
     * 如：'HelloWorld'
     *
     * @returns {Array} Array，数组里面就是不需要加入该页面的“js块名”
     */
    excludeChunks_fun = fileName_str => {
        let arr = [];
        Object.keys( pageRoutingManagement_obj )
              .forEach( c => {
                  if( c.trim() !== fileName_str.trim() ){
                      arr.push( c );
                  }
              } );
        return arr;
    };

const str1 = proN_str.slice( 0, 1 )
                     .toLocaleLowerCase(),
    str2 = proN_str.slice( 1 );
// 如：proN_str--->production，对应dist文件夹下的production文件夹
proN_str = str1 + str2;

/**
 * 路径都是编译完后输出到输出目录中，相对于“pages”文件夹(如：dist/test/pages)的相对路径
 * 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
 *
 * @type {string[]} 字符串数组
 */
let cacheResources_arr = require( './CacheResources.js' ).cacheResources,
    /**
     * 预加载的苹果启动图片的资源数组，成员是一个个JSON对象，必须
     * 成员JSON对象的格式是
     * {
     *   href: 资源的url 字符串，必须
     *   as： 'font' 字符串，可选
     *   type: 'font/ttf' 字符串，可选
     *   crossorigin: 'anonymous' 字符串，可选
     *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
     *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
     * }
     *
     * as的值:
     * 支持不填写“as”属性，那么链接地址就是资源任何地址
     * audio(音频文件)、
     * document(用于嵌入<frame>或中的HTML文档<iframe>)、
     * embed(要嵌入<embed>元素内的资源)、
     * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
     * font(字体文件)、
     * image(图像文件、SVG)、
     * object(要嵌入<embed>元素内的资源)、
     * script(JavaScript文件)、
     * style(样式表)、
     * track(WebVTT文件)、
     * worker(Web Worker或Shared Worker)、
     * video(视频文件)、
     * report(不需要链接地址)、
     * audioworklet、
     * paintworklet、
     * serviceworker、
     * manifest、
     * xslt、
     *
     * type值:(链接查找)
     * http://www.w3school.com.cn/media/media_mimeref.asp
     */
    preload_StartAppleTSI_arr = ( () => {
        let arr1 = [];
        for( let item of
            require( './StartAppleTSI_Arr.js' ).startAppleTSI_arr ){
            arr1.push( {
                href: item.href,
                type: item.type,
                as: item.as,
                crossorigin: item.crossorigin,
                attrs: {
                    sizes: item.attrs.sizes,
                    media: item.attrs.media,
                },
            } );
        }
        return arr1;
    } )();

// htmlWebpackPlugin配置写在这个数组里头就行！
let htmlWebpackPluginA_arr = [
    // 每个htmlWebpackPlugin配置都要参照这个来写！
    new htmlWebpackPlugin( {
        // [sha512:contenthash:hex:8]
        filename: 'pages/HelloWorld.html',
        template: './src/tplEJS/pages/HelloWorld.ejs',
        title: 'HelloWorld',
        /**
         * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
         */
        excludeChunks: isSPA_booC
                       ? []
                       : excludeChunks_fun( 'HelloWorld' ),
        inject: 'body',
        cache: false,
        minify: minify_obj,
        chunksSortMode: 'auto',
        // chunks没值，就不要写这个属性，写[]空数组，会导致任何.js都不添加到页面
        // chunks: [],
        // 以下data的属性尽量都要有，自定义功能
        data: {
            /*
             必须，字符串，默认“HelloWorld”，每个模板允许有自己配置的如“HelloWorld.ejs”一类的文件，也可以是同一个文件(HelloWorld)
             都在src/tplEJS/basic/metaLink下
             */
            metaLinkName_str: 'HelloWorld',
            /*
             必须，字符串，默认“HelloWorld”，manifest文件名，每个模板允许有自己配置的manifest文件，也可以是同一个文件(如：HelloWorld)
             都在pwa4Manifest文件夹下
             */
            manifestName_str: 'HelloWorld',
            // 必须，保持这个就行
            proN_str,
            // 必须，保持这个就行
            dynamicREM_str,
            // 可选，保持这个就行
            weinreDevTool_str,
            // 可选，是否添加"apple-touch-startup-image"，布尔值，默认true(添加)，false不添加
            startAppleTSI_boo: true,
            /*
             可选，JSON对象
             ApplicationCache过时了，建议不要用了，建议用Service Worker
             在“configures/AppCacheTool.js”、“src/tplEJS/pages/HelloWorld.ejs”中使用
             */
            appCache_obj: {
                // 必须，布尔值，是否要启用“AppCache(.appcache)”，true启用，false不启用
                open_boo: false,
                // 字符串，缓存配置文件名 + 文件后缀名，如：“HelloWorld.appcache”，open_boo的值为false时，可以不用有这个属性
                name_str: 'HelloWorld.appcache',
                // open_boo的值为false时，可以不用有这个属性，需要缓存的资源URL，这个选项是用于补充因为手动导入的静态资源的URL，支持外部网络的URL
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                cache_arr: cacheResources_arr,
                // open_boo的值为false时，可以不用有这个属性，不需要缓存的资源，必须请求网络，支持外部网络的URL
                network_arr: [],
                /*
                 open_boo的值为false时，可以不用有这个属性，出错后代替的资源，键名是原资源URL，键值是替补资源URL，支持外部网络的URL
                 如：'../static/ico/compressed/ico_192_192.png': '../static/ico/compressed/ico_200_200.png'
                 */
                fallback_obj: {}
            },
            /*
             可选，JSON配置对象，将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，
             该标签里有一个名为“CTAllAssets”的全局常量数组
             */
            outAssets_obj: {
                // 布尔值，必须，true开启该功能，false关闭
                open_boo: false,
                // 其他资源路径，支持外部URL，没有资源路径，就写空数组
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                other_arr: cacheResources_arr,
            },
            // 可选，资源预加载工具，true开启该功能，false关闭
            preloadTool_obj: {
                open_boo: false,
                /**
                 * 数组，成员是一个个JSON对象，必须
                 * 成员JSON对象的格式是
                 * {
                 *   href: 资源的url 字符串，必须
                 *   as： 'font' 字符串，可选
                 *   type: 'font/ttf' 字符串，可选
                 *   crossorigin: 'anonymous' 字符串，可选
                 *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
                 *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
                 * }
                 *
                 * as的值:
                 * 支持不填写“as”属性，那么链接地址就是资源任何地址
                 * audio(音频文件)、
                 * document(用于嵌入<frame>或中的HTML文档<iframe>)、
                 * embed(要嵌入<embed>元素内的资源)、
                 * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
                 * font(字体文件)、
                 * image(图像文件、SVG)、
                 * object(要嵌入<embed>元素内的资源)、
                 * script(JavaScript文件)、
                 * style(样式表)、
                 * track(WebVTT文件)、
                 * worker(Web Worker或Shared Worker)、
                 * video(视频文件)、
                 * report(不需要链接地址)、
                 * audioworklet、
                 * paintworklet、
                 * serviceworker、
                 * manifest、
                 * xslt、
                 *
                 * type值:(链接查找)
                 * http://www.w3school.com.cn/media/media_mimeref.asp
                 */
                preload_arr: preload_StartAppleTSI_arr,
            }
        }
    } ),
    // XMQAQ
    new htmlWebpackPlugin( {
        // [sha512:contenthash:hex:8]
        filename: 'pages/XMQAQ.html',
        template: './src/tplEJS/pages/XMQAQ.ejs',
        title: '轩墨宝宝QAQ',
        /**
         * 多页面应用时，用于该页面对应的.js文件的路由处理，表示这个页面只导入"src/js/App.js"中所配置的这个页面对应的.js
         */
        excludeChunks: isSPA_booC
                       ? []
                       : excludeChunks_fun( 'XMQAQ' ),
        inject: 'body',
        cache: false,
        minify: minify_obj,
        chunksSortMode: 'auto',
        // chunks没值，就不要写这个属性，写[]空数组，会导致任何.js都不添加到页面
        // chunks: [],
        // 以下data的属性尽量都要有，自定义功能
        data: {
            /*
             必须，字符串，默认“HelloWorld”，每个模板允许有自己配置的如“HelloWorld.ejs”一类的文件，也可以是同一个文件(HelloWorld)
             都在src/tplEJS/basic/metaLink下
             */
            metaLinkName_str: 'XMQAQ',
            /*
             必须，字符串，默认“HelloWorld”，manifest文件名，每个模板允许有自己配置的manifest文件，也可以是同一个文件(如：HelloWorld)
             都在pwa4Manifest文件夹下
             */
            manifestName_str: 'XMQAQ',
            // 必须，保持这个就行
            proN_str,
            // 必须，保持这个就行
            dynamicREM_str,
            // 可选，保持这个就行
            weinreDevTool_str,
            // 可选，是否添加"apple-touch-startup-image"，布尔值，默认true(添加)，false不添加
            startAppleTSI_boo: true,
            /*
             可选，JSON对象
             ApplicationCache过时了，建议不要用了，建议用Service Worker
             在“configures/AppCacheTool.js”、“src/tplEJS/pages/HelloWorld.ejs”中使用
             */
            appCache_obj: {
                // 必须，布尔值，是否要启用“AppCache(.appcache)”，true启用，false不启用
                open_boo: false,
                // 字符串，缓存配置文件名 + 文件后缀名，如：“HelloWorld.appcache”，open_boo的值为false时，可以不用有这个属性
                name_str: 'XMQAQ.appcache',
                // open_boo的值为false时，可以不用有这个属性，需要缓存的资源URL，这个选项是用于补充因为手动导入的静态资源的URL，支持外部网络的URL
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                cache_arr: cacheResources_arr,
                // open_boo的值为false时，可以不用有这个属性，不需要缓存的资源，必须请求网络，支持外部网络的URL
                network_arr: [],
                /*
                 open_boo的值为false时，可以不用有这个属性，出错后代替的资源，键名是原资源URL，键值是替补资源URL，支持外部网络的URL
                 如：'../static/ico/compressed/ico_192_192.png': '../static/ico/compressed/ico_200_200.png'
                 */
                fallback_obj: {}
            },
            /*
             可选，JSON配置对象，将webpack打包输出的所有类型的资源文件的路径和自己添加的资源路径一起输出到页面中的一个<script>标签里，
             该标签里有一个名为“CTAllAssets”的全局常量数组
             */
            outAssets_obj: {
                // 布尔值，必须，true开启该功能，false关闭
                open_boo: false,
                // 其他资源路径，支持外部URL，没有资源路径，就写空数组
                // 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
                other_arr: cacheResources_arr,
            },
            // 可选，资源预加载工具，true开启该功能，false关闭
            preloadTool_obj: {
                open_boo: false,
                /**
                 * 数组，成员是一个个JSON对象，必须
                 * 成员JSON对象的格式是
                 * {
                 *   href: 资源的url 字符串，必须
                 *   as： 'font' 字符串，可选
                 *   type: 'font/ttf' 字符串，可选
                 *   crossorigin: 'anonymous' 字符串，可选
                 *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选
                 *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选
                 * }
                 *
                 * as的值:
                 * 支持不填写“as”属性，那么链接地址就是资源任何地址
                 * audio(音频文件)、
                 * document(用于嵌入<frame>或中的HTML文档<iframe>)、
                 * embed(要嵌入<embed>元素内的资源)、
                 * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、
                 * font(字体文件)、
                 * image(图像文件、SVG)、
                 * object(要嵌入<embed>元素内的资源)、
                 * script(JavaScript文件)、
                 * style(样式表)、
                 * track(WebVTT文件)、
                 * worker(Web Worker或Shared Worker)、
                 * video(视频文件)、
                 * report(不需要链接地址)、
                 * audioworklet、
                 * paintworklet、
                 * serviceworker、
                 * manifest、
                 * xslt、
                 *
                 * type值:(链接查找)
                 * http://www.w3school.com.cn/media/media_mimeref.asp
                 */
                preload_arr: preload_StartAppleTSI_arr,
            }
        }
    } ),
];

module.exports = [
    new SubresourceIntegrityPlugin( {
        hashFuncNames: [
            // 'sha256',
            // 'sha384',
            'sha512',
        ],
        enabled: isPro_boo,
    } ),
    ...( isSPA_booC
         ? [ htmlWebpackPluginA_arr[ 0 ], ]
         : htmlWebpackPluginA_arr )
];
