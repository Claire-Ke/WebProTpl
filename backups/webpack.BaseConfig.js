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
let isPro = process.argv[ 3 ] === 'production',
    os = require( 'os' ),
    osLen = os.cpus().length,
    threadLoader = require( 'thread-loader' ),
    jsWorkerPool = {
        // 生成的工作进程数，默认为（ os.cpus().length-1 ），fallback to 1 when require('os').cpus() is undefined
        workers: osLen,
        // 一个工人并行处理的作业数默认为20
        workerParallelJobs: 20,
        // 其他的node.js参数
        workerNodeArgs: [ '--max-old-space-size=1024' ],
        // 允许重新生成一个已死亡的工人池，重新生成会减慢整个编译速度，并且应设置为false以进行开发
        poolRespawn: false,
        // 空闲默认值为500（ms）时终止工作进程的超时，可以设置为无穷大，以便监视生成以保持工作进程的活动性
        // Infinity：可用于开发模式
        // 2000
        poolTimeout: isPro
                     ? 2000
                     : Infinity,
        // 投票分配给工人的工作岗位数量默认为200个，分配效率较低但更公平
        poolParallelJobs: 50,
        // 池的名称可用于创建其他具有相同选项的不同池
        name: 'jsWorkerPool',
    };

threadLoader.warmup( jsWorkerPool, [
    'babel-loader',
] );

let path = require( 'path' ),
    // TerserPlugin = require( 'terser-webpack-plugin' ),
    browsers_arr = [
        /*
         // '> 1%',
         // 'last 3 major versions',
         // 'last 3 versions',
         // 'not ie < 9',
         // 'not ie_mob < 9',
         // 'not dead',

         'since 2015-01-01',

         // Safari 10是首先完全支持ES6的浏览器(2016年7月)
         'iOS >= 10',
         'Safari >= 10',

         // Edge 14是首先完全支持ES6的浏览器(2016年8月)
         'Edge >= 14',

         // 开始支持ES6的时间点(2018年8月)
         'Opera >= 55',
         'OperaMobile >= 55',

         // 开始支持ES6的时间点(2017年1月)
         'Chrome >= 58',
         'Android >= 58',
         'ChromeAndroid >= 58',

         // 开始支持ES6的时间点(2017年3月)
         'Firefox >= 54',
         'FirefoxAndroid >= 54',
         'Firefox ESR',

         'Node >= 10',

         'last 2 BlackBerry major versions',
         'last 2 Electron major versions',
         'last 2 OperaMini major versions',
         'last 2 QQAndroid major versions',
         'last 2 Samsung major versions',
         'last 2 UCAndroid major versions',
         'last 2 kaios major versions',

         'not ie <= 11',
         'not ie_mob <= 11',
         */

        // 以下只是用于自己设备上的浏览器
        'iOS >= 13',
        'Safari >= 13',

        'Edge >= 18',

        'Opera >= 67',
        'OperaMobile >= 67',

        'Chrome >= 80',
        'Android >= 80',
        'ChromeAndroid >= 80',

        'Firefox >= 74',
        'FirefoxAndroid >= 74',
    ],
    postCSSLoader_fun = isPro => {
        let obj = {
            precision: 10,
            mediaQueries: true,
            selectors: true,
        };

        !isPro && ( obj.preserve = true );

        let arr = [
            require( 'postcss-import' )(),
            require( 'postcss-preset-env' )( {
                autoprefixer: {
                    ignoreUnknownVersions: true,
                    grid: false,
                    overrideBrowserslist: browsers_arr,
                    // browsers: browsers_arr,
                },
                browsers: browsers_arr,
                stage: 3,
                features: {
                    'custom-properties': false,
                },
            } ),
            require( 'postcss-calc' )( obj ),
        ];

        isPro && ( arr.push( require( 'cssnano' )() ) );

        return {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: () => arr,
            }
        };
    },
    entry_obj = require( './src/js/App.js' ).pageRoutingManagement_obj,
    output_fun = ( { path, __dirname, proName_str, hashName_str } ) => ( {
        /*
         如：编译的资源都输出在dist/production下的各种一级文件夹(里面没有其他文件夹了)下，所以'../'就是向上一级，也就是定位到了根目录(dist/production)下了
         也可以指定绝对路径：'http://localhost:8081/WebProTpl/dist/production/'，一般用于正式生产环境
         */
        publicPath: '../',
        // hex base64
        hashDigest: 'hex',
        hashDigestLength: 6,
        // sha512 md5
        hashFunction: 'sha512',
        crossOriginLoading: 'anonymous',
        filename: `js/[name]_[${ hashName_str }:6].js`,
        chunkFilename: `js/[name]_chunk_[${ hashName_str }:6].js`,
        path: path.resolve( __dirname, `./dist/${ proName_str }/` ),
        pathinfo: false,
        /*
         webpack 5.X有效
         告诉webpack生成代码的最大EcmaScript版本。
         应该是以下之一：
         should be >= 5, should be <= 11
         should be >= 2009, should be <= 2020
         */
        // ecmaVersion: 2018,
    } ),
    resolve_fun = ( path, __dirname, isPro_boo ) => ( {
        alias: {
            vueESM: isPro_boo
                    ? 'vue/dist/vue.min.js'
                    : 'vue/dist/vue.js',
            vuexESM: isPro_boo
                     ? 'vuex/dist/vuex.min.js'
                     : 'vuex/dist/vuex.js',
            vueRouterESM: isPro_boo
                          ? 'vue-router/dist/vue-router.min.js'
                          : 'vue-router/dist/vue-router.js',

            jQueryMin: 'jquery/dist/jquery.min.js',
            echartsMin: 'echarts/dist/echarts.min.js',
            swiperMin: 'swiper/js/swiper.min.js',
            HTML2C4ESM: 'src/js/tools/HTML2Canvas.esm.js',

            CTESM: path.resolve( __dirname, './src/js/tools/CurrencyTools.esm.js' ),
            WorkersESM: path.resolve( __dirname, './src/js/tools/Workers4MT.esm.js' ),
            CompESM: path.resolve( __dirname, './src/components/Components.esm.js' ),

            configDir: path.resolve( __dirname, './configures/' ),

            jsonDir: path.resolve( __dirname, './src/assets/doc/json/' ),
            json5Dir: path.resolve( __dirname, './src/assets/doc/json5/' ),
            txtDir: path.resolve( __dirname, './src/assets/doc/txt/' ),
            xmlDir: path.resolve( __dirname, './src/assets/doc/xml/' ),
            fontsDir: path.resolve( __dirname, './src/assets/fonts/' ),
            imgDir: path.resolve( __dirname, './src/assets/img/' ),
            musicDir: path.resolve( __dirname, './src/assets/music/' ),
            videosDir: path.resolve( __dirname, './src/assets/videos/' ),

            compDir: path.resolve( __dirname, './src/components/' ),

            jsDir: path.resolve( __dirname, './src/js/' ),
            jsMDir: path.resolve( __dirname, './src/js/modules/' ),
            jsPDir: path.resolve( __dirname, './src/js/pages/' ),
            jsPubDir: path.resolve( __dirname, './src/js/public/' ),
            jsTDir: path.resolve( __dirname, './src/js/tools/' ),

            manifestDir: path.resolve( __dirname, './src/pwa4Manifest/' ),

            cssDir: path.resolve( __dirname, './src/styles/css/' ),
            cssBDir: path.resolve( __dirname, './src/styles/css/basic/' ),
            cssMDir: path.resolve( __dirname, './src/styles/css/modules/' ),
            cssPDir: path.resolve( __dirname, './src/styles/css/pages/' ),
            cssPubDir: path.resolve( __dirname, './src/styles/css/public/' ),

            lessDir: path.resolve( __dirname, './src/styles/less/' ),
            lessBDir: path.resolve( __dirname, './src/styles/less/basic/' ),
            lessMDir: path.resolve( __dirname, './src/styles/less/modules/' ),
            lessPDir: path.resolve( __dirname, './src/styles/less/pages/' ),
            lessPubDir: path.resolve( __dirname, './src/styles/less/public/' ),

            sassDir: path.resolve( __dirname, './src/styles/sass/' ),
            sassBDir: path.resolve( __dirname, './src/styles/sass/basic/' ),
            sassMDir: path.resolve( __dirname, './src/styles/sass/modules/' ),
            sassPDir: path.resolve( __dirname, './src/styles/sass/pages/' ),
            sassPubDir: path.resolve( __dirname, './src/styles/sass/public/' ),

            scssDir: path.resolve( __dirname, './src/styles/scss/' ),
            scssBDir: path.resolve( __dirname, './src/styles/scss/basic/' ),
            scssMDir: path.resolve( __dirname, './src/styles/scss/modules/' ),
            scssPDir: path.resolve( __dirname, './src/styles/scss/pages/' ),
            scssPubDir: path.resolve( __dirname, './src/styles/scss/public/' ),

            tplEJSDir: path.resolve( __dirname, './src/tplEJS/' ),
            tplEJSBDir: path.resolve( __dirname, './src/tplEJS/basic/' ),
            tplEJSMLDir: path.resolve( __dirname, './src/tplEJS/basic/metaLink/' ),
            tplEJSMDir: path.resolve( __dirname, './src/tplEJS/modules/' ),
            tplEJSPDir: path.resolve( __dirname, './src/tplEJS/pages/' ),
            tplEJSPubDir: path.resolve( __dirname, './src/tplEJS/public/' ),

            tplHTMLDir: path.resolve( __dirname, './src/tplHTML/' ),
            tplHTMLBDir: path.resolve( __dirname, './src/tplHTML/basic/' ),
            tplHTMLMDir: path.resolve( __dirname, './src/tplHTML/modules/' ),
            tplHTMLPDir: path.resolve( __dirname, './src/tplHTML/pages/' ),
            tplHTMLPubDir: path.resolve( __dirname, './src/tplHTML/public/' ),

            vueDir: path.resolve( __dirname, './src/vue/' ),
            vueCompDir: path.resolve( __dirname, './src/vue/components/' ),
            vueMDir: path.resolve( __dirname, './src/vue/models/' ),
            vueRDir: path.resolve( __dirname, './src/vue/routers/' ),
            vueSDir: path.resolve( __dirname, './src/vue/stores/' ),
            vueStyDir: path.resolve( __dirname, './src/vue/styles/' ),
            vueVDir: path.resolve( __dirname, './src/vue/views/' ),

            wasmDir: path.resolve( __dirname, './src/wasm/' ),
            wasmBDir: path.resolve( __dirname, './src/wasm/basic/' ),
            wasmMDir: path.resolve( __dirname, './src/wasm/modules/' ),
            wasmPDir: path.resolve( __dirname, './src/wasm/pages/' ),
            wasmPubDir: path.resolve( __dirname, './src/wasm/public/' ),

            serviceWorkersDir: path.resolve( __dirname, './src/workers/serviceWorkers/' ),
            sWorkersDir: path.resolve( __dirname, './src/workers/sharedWorkers/' ),
            tWorkersDir: path.resolve( __dirname, './src/workers/tools/' ),
            wWorkersDir: path.resolve( __dirname, './src/workers/webWorkers/' ),
        },
        modules: [
            'node_modules',
        ],
        symlinks: false,
    } ),
    externals_obj = {
        win_Vue: 'window.Vue',
        win_Vuex: 'window.Vuex',
        win_VueRouter: 'window.VueRouter',
        win_Swiper: 'window.Swiper',
        win_echarts: 'window.echarts',
    },
    node_obj = {
        fs: 'empty',
        // path: 'empty',
        // crypto: 'empty',
    },
    performance_obj = {
        hints: 'warning',
        // 50MB
        maxAssetSize: 52428800,
        // 50MB
        maxEntrypointSize: 52428800,
    },
    optimization_fun = ( isPro, isTest = true ) => {
        /*
         // 有效的配置选项！！！
         {
         checkWasmTypes
         // chunkIds: "deterministic"这个值已经无效了！！！可能在“Webpack 5”中有效！！！
         chunkIds
         concatenateModules
         flagIncludedChunks
         hashedModuleIds
         mangleWasmImports
         mergeDuplicateChunks
         minimize
         minimizer
         // moduleIds: "deterministic"这个值已经无效了！！！可能在“Webpack 5”中有效！！！
         moduleIds
         namedChunks
         namedModules
         noEmitOnErrors
         nodeEnv
         occurrenceOrder
         portableRecords
         providedExports
         removeAvailableModules
         removeEmptyChunks
         runtimeChunk
         sideEffects
         splitChunks
         usedExports
         }
         */
        return isPro
               ? {
                runtimeChunk: {
                    name: entryPoint => `Runtime_${ entryPoint.name }`,
                },
                minimize: true,
                /*
                 minimizer: [
                 new TerserPlugin( {
                 test: /\.m?js(\?.*)?$/i,
                 include: [
                 path.resolve( __dirname, './src/components/' ),
                 path.resolve( __dirname, './src/js/' ),
                 path.resolve( __dirname, './src/vue/' ),
                 ],
                 exclude: [
                 path.resolve( __dirname, './assistTools/' ),
                 path.resolve( __dirname, './backups/' ),
                 path.resolve( __dirname, './bats/' ),
                 path.resolve( __dirname, './configures/' ),
                 path.resolve( __dirname, './dist/' ),
                 path.resolve( __dirname, './node_modules/' ),
                 path.resolve( __dirname, './notes/' ),
                 path.resolve( __dirname, './simServer/' ),

                 path.resolve( __dirname, './src/assets/' ),
                 path.resolve( __dirname, './src/pwa4Manifest/' ),
                 path.resolve( __dirname, './src/static/' ),
                 path.resolve( __dirname, './src/styles/' ),
                 path.resolve( __dirname, './src/tplEJS/' ),
                 path.resolve( __dirname, './src/tplHTML/' ),
                 ],
                 chunkFilter: chunk => true,
                 cache: true,
                 parallel: os.cpus().length,
                 sourceMap: false,
                 terserOptions: {
                 // 传递5、6、7、8，会覆盖parse、compress和output这三个选项的ecma选项
                 // ecma: 5,
                 // 值也可以是字符串：'verbose'
                 warnings: true,
                 parse: {
                 // 支持顶层返回语句
                 bare_returns: true,
                 // 指定5、6、7或8中的一个。注意：除了函数参数列表中的ES8可选尾随逗号和使用ecma 8的调用之外，此设置目前不强制执行。
                 // 默认为 8
                 ecma: 8,
                 html5_comments: false,
                 // 支持 #!command 作为第一行
                 shebang: true,
                 },
                 // 压缩选项
                 compress: {
                 // 测试一下！！！
                 arrows: true,
                 // 尽可能用函数参数名替换 arguments[index]。
                 arguments: false,
                 // !!a ? b : c → a ? b : c
                 booleans: true,
                 booleans_as_integers: false,
                 collapse_vars: true,
                 comparisons: true,
                 computed_props: true,
                 conditionals: true,
                 dead_code: true,
                 // 传递false可禁用大多数默认启用的压缩转换。当您只想启用几个压缩选项而禁用其余压缩选项时很有用。
                 defaults: true,
                 // 删除冗余或非标准指令
                 directives: true,
                 drop_console: !isTest,
                 drop_debugger: !isTest,
                 // 通过6或更高级别以启用压缩选项，这些选项会将ES5代码转换为较小的ES6 +等效形式。
                 // 默认 5
                 ecma: 5,
                 // 尝试评估常量表达式
                 evaluate: true,
                 expression: false,
                 // 定义全局常量
                 global_defs: {},
                 // 提升function声明
                 hoist_funs: false,
                 // 将属性从常量对象和数组文字提升为受一组约束的正则变量。例如：var o={p:1，q:2}；f（o.p，o.q）；被转换为f（1，2）；。
                 // 注意：在启用mangle、compress选项设置为2或更高、compress选项toplever启用的情况下，提升支柱的工作效果最佳。
                 hoist_props: true,
                 hoist_vars: false,
                 // if/return 和 if/continue 的优化
                 if_return: true,
                 inline: true,
                 join_vars: true,
                 keep_classnames: true,
                 keep_fargs: true,
                 keep_fnames: true,
                 keep_infinity: true,
                 // 当我们可以静态确定条件时，对do，while和for循环进行优化。
                 loops: true,
                 // 压缩ES6模块时传递true。默认严格模式，也隐含顶层选项。
                 module: true,
                 negate_iife: true,
                 passes: 1,
                 // foo["bar"] → foo.bar
                 properties: true,
                 pure_funcs: null,
                 pure_getters: 'strict',
                 // 传统选项，为向后兼容而被安全忽略
                 // reduce_funcs: '这个属性的值文档没说是什么类型的数据类型',
                 // 改善分配给变量并用作常量值的变量的优化。
                 reduce_vars: true,
                 // 如果此选项设置为true，则默认序列限制为200。
                 sequences: 20,
                 side_effects: true,
                 switches: true,
                 // 在顶级范围内删除未引用的函数（“ funcs”）和/或变量（“ vars”）（默认为false，为true时将同时删除未引用的函数和变量）
                 toplevel: true,
                 // 防止未使用的特定顶级函数和变量被删除（可以是数组，逗号分隔，RegExp或函数。表示顶级）
                 top_retain: null,
                 // 将typeof foo ==“ undefined”转换为foo === void0。注意：由于已知问题，建议将IE10和更早版本的此值设置为false。
                 typeofs: false,
                 // 应用“不安全的”转换
                 unsafe: false,
                 // 此转换要求将ecma compress选项设置为6或更高。
                 unsafe_arrows: false,
                 // 只有 comparisons 和 unsafe_comps 都设置为true时，压缩才起作用。
                 unsafe_comps: false,
                 unsafe_Function: false,
                 // 将 2 * num1 * 3 之类的数值表达式优化为 6 * num1，可能会产生不精确的浮点结果。
                 unsafe_math: false,
                 unsafe_methods: false,
                 unsafe_proto: false,
                 unsafe_regexp: false,
                 unsafe_undefined: false,
                 // 删除未引用的函数和变量。除非设置为字符串"keep_assign"，否则简单的直接变量分配不会算作引用
                 unused: true,
                 // 删除无法访问的代码或未使用的声明等时显示警告。true会启用警告！！！
                 warnings: true,
                 },
                 mangle: {
                 eval: true,
                 keep_classnames: true,
                 keep_fnames: true,
                 // ES6模块，其中顶级作用域不是全局作用域。表示顶级。
                 module: true,
                 reserved: [],
                 toplevel: true,
                 safari10: true,
                 properties: {
                 builtins: false,
                 debug: false,
                 keep_quoted: true,
                 regex: null,
                 reserved: [],
                 undeclared: false,
                 },
                 },
                 module: true,
                 output: {
                 ascii_only: false,
                 beautify: false,
                 braces: true,
                 comments: false,
                 // 默认 5
                 ecma: 5,
                 // 默认 4
                 indent_level: 0,
                 indent_start: 0,
                 inline_script: false,
                 keep_quoted_props: true,
                 max_line_len: false,
                 preamble: null,
                 quote_keys: true,
                 quote_style: 0,
                 safari10: true,
                 semicolons: true,
                 shebang: true,
                 webkit: false,
                 wrap_iife: true,
                 wrap_func_args: true,
                 },
                 toplevel: true,
                 nameCache: null,
                 // true表示支持 IE8
                 ie8: false,
                 keep_classnames: true,
                 keep_fnames: true,
                 safari10: true,
                 },
                 extractComments: false,
                 warningsFilter: ( warning, source, file ) => true,
                 } ),
                 ],
                 */
                noEmitOnErrors: true,
                namedModules: false,
                namedChunks: false,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                moduleIds: 'hashed',
                checkWasmTypes: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                chunkIds: 'total-size',
                nodeEnv: 'production',
                mangleWasmImports: false,
                removeAvailableModules: true,
                removeEmptyChunks: true,
                mergeDuplicateChunks: true,
                flagIncludedChunks: true,
                occurrenceOrder: true,
                providedExports: true,
                usedExports: true,
                concatenateModules: true,
                sideEffects: true,
                portableRecords: true,
                // 这个选项无效了！！！
                // mangleExports: true,
            }
               : {
                runtimeChunk: {
                    name: entryPoint => `Runtime_${ entryPoint.name }`,
                },
                minimize: false,
                noEmitOnErrors: true,
                namedModules: true,
                namedChunks: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                moduleIds: 'named',
                checkWasmTypes: true,
                // deterministic这个值已经无效了！！！可能在“Webpack 5”中有效！！！
                chunkIds: 'named',
                nodeEnv: 'development',
                mangleWasmImports: false,
                removeAvailableModules: true,
                removeEmptyChunks: true,
                mergeDuplicateChunks: true,
                flagIncludedChunks: true,
                occurrenceOrder: true,
                providedExports: true,
                usedExports: true,
                concatenateModules: true,
                sideEffects: true,
                portableRecords: true,
                // 这个选项无效了！！！
                // mangleExports: true,
            };
    },
    // 如果定义的值是字符串值，得单引号内部嵌套双引号，如：'"例子"'，否则没法真正输出这个字符串
    defineObj_fun = isPro => ( {
        isPro,
        devURL: '"localhost"',
        localURL: '"localhost"',
        testURL: '"localhost"',
        proURL: '"localhost"',
    } ),
    splitChunks_obj = {
        chunks: 'all',
        // 单位：字节
        minSize: 1 * 1024 * 1024,
        // 单位：字节
        // maxSize: 10 * 1024 * 1024,
        hidePathInfo: true,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '_',
        automaticNameMaxLength: 109,
        name: true,
        cacheGroups: require( './src/js/App.js' ).isSPA_booC
                     ? ( ( ( start_num = 1000 ) => {
                let obj = {
                    VendorsCSS_dir: {
                        test: /node_modules[\\/].*\.css/,
                        name: 'VendorsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    Basic_Colors_LESS: {
                        test: /src[\\/]styles[\\/]less[\\/]basic[\\/](Basic.less|Colors.less)/,
                        name: 'Basic_Colors_LESS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_CSS: {
                        test: /src[\\/]styles[\\/]css[\\/]basic[\\/](Basic.css|Colors.css)/,
                        name: 'Basic_Colors_CSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_SCSS: {
                        test: /src[\\/]styles[\\/]scss[\\/]basic[\\/](Basic.scss|Colors.scss)/,
                        name: 'Basic_Colors_SCSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_SASS: {
                        test: /src[\\/]styles[\\/]sass[\\/]basic[\\/](Basic.sass|Colors.sass)/,
                        name: 'Basic_Colors_SASS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    BasicLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]basic[\\/](?!Basic.less|Colors.less).*\.less$/,
                        name: 'BasicLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]basic[\\/](?!Basic.css|Colors.css).*\.css$/,
                        name: 'BasicCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]basic[\\/](?!Basic.scss|Colors.scss).*\.scss$/,
                        name: 'BasicSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]basic[\\/](?!Basic.sass|Colors.sass).*\.sass$/,
                        name: 'BasicSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    Components_LESS: {
                        test: /src[\\/]components[\\/]Components.less/,
                        name: 'Components_LESS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_CSS: {
                        test: /src[\\/]components[\\/]Components.css/,
                        name: 'Components_CSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_SCSS: {
                        test: /src[\\/]components[\\/]Components.scss/,
                        name: 'Components_SCSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_SASS: {
                        test: /src[\\/]components[\\/]Components.sass/,
                        name: 'Components_SASS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ComponentsLESS_dir: {
                        test: /src[\\/]components[\\/](?!Components.less).*\.less$/,
                        name: 'ComponentsLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsCSS_dir: {
                        test: /src[\\/]components[\\/](?!Components.css).*\.css$/,
                        name: 'ComponentsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsSCSS_dir: {
                        test: /src[\\/]components[\\/](?!Components.scss).*\.scss$/,
                        name: 'ComponentsSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsSASS_dir: {
                        test: /src[\\/]components[\\/](?!Components.sass).*\.sass$/,
                        name: 'ComponentsSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    PublicLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]public[\\/].*\.less$/,
                        name: 'PublicLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]public[\\/].*\.css$/,
                        name: 'PublicCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]public[\\/].*\.scss$/,
                        name: 'PublicSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]public[\\/].*\.sass$/,
                        name: 'PublicSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ModulesLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]modules[\\/].*\.less$/,
                        name: 'ModulesLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]modules[\\/].*\.css$/,
                        name: 'ModulesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]modules[\\/].*\.scss$/,
                        name: 'ModulesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]modules[\\/].*\.sass$/,
                        name: 'ModulesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueComponentsCSS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.css$/,
                        name: 'VueComponentsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsSCSS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.scss$/,
                        name: 'VueComponentsSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsSASS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.sass$/,
                        name: 'VueComponentsSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueStylesCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/].*\.css$/,
                        name: 'VueStylesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStylesSCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/].*\.scss$/,
                        name: 'VueStylesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStylesSASS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/].*\.sass$/,
                        name: 'VueStylesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    PagesLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]pages[\\/].*\.less$/,
                        name: 'PagesLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]pages[\\/].*\.css$/,
                        name: 'PagesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]pages[\\/].*\.scss$/,
                        name: 'PagesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]pages[\\/].*\.sass$/,
                        name: 'PagesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VendorsJS_dir: {
                        test: /node_modules[\\/](?!vue[\\/]|vuex[\\/]|vue-router[\\/]|jquery[\\/]|echarts[\\/]|swiper[\\/]).*\.js/,
                        name: 'VendorsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VendorsToolsJS_dir: {
                        test: /node_modules[\\/](vue[\\/]|vuex[\\/]|vue-router[\\/]|jquery[\\/]|echarts[\\/]|swiper[\\/]).*\.js/,
                        name: 'VendorsToolsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ToolsJS_dir: {
                        test: /src[\\/]js[\\/]tools[\\/].*\.js$/,
                        name: 'ToolsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    WASMBasic_dir: {
                        test: /src[\\/]wasm[\\/]basic[\\/]$/,
                        name: 'WASMBasic_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMPublic_dir: {
                        test: /src[\\/]wasm[\\/]public[\\/]$/,
                        name: 'WASMPublic_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMModules_dir: {
                        test: /src[\\/]wasm[\\/]modules[\\/]$/,
                        name: 'WASMModules_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMPages_dir: {
                        test: /src[\\/]wasm[\\/]pages[\\/]$/,
                        name: 'WASMPages_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ComponentsJS_dir: {
                        test: /src[\\/]components[\\/].*\.js$/,
                        name: 'ComponentsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicJS_dir: {
                        test: /src[\\/]js[\\/]public[\\/].*\.js$/,
                        name: 'PublicJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesJS_dir: {
                        test: /src[\\/]js[\\/]modules[\\/].*\.js$/,
                        name: 'ModulesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueRoutersJS_dir: {
                        test: /src[\\/]vue[\\/]routers[\\/].*\.js$/,
                        name: 'VueRoutersJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStoresJS_dir: {
                        test: /src[\\/]vue[\\/]stores[\\/].*\.js$/,
                        name: 'VueStoresJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsJS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.js$/,
                        name: 'VueComponentsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueModelsJS_dir: {
                        test: /src[\\/]vue[\\/]models[\\/].*\.js$/,
                        name: 'VueModelsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    PagesJS_dir: {
                        test: /src[\\/]js[\\/]pages[\\/].*\.js$/,
                        name: 'PagesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    /*
                     default: {
                     minChunks: 2,
                     // 数值越高越先添加加载
                     // priority: -10,
                     reuseExistingChunk: true,
                     },
                     */
                };

                Object.entries( obj )
                      .forEach( ( c, i, ) => {
                          c[ 1 ].priority = start_num - i;
                      } );

                return obj;
            } )( 1000 ) )
                     : ( ( ( start_num = 1000 ) => {
                let obj = {
                    VendorsCSS_dir: {
                        test: /node_modules[\\/].*\.css/,
                        name: 'VendorsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    Basic_Colors_LESS: {
                        test: /src[\\/]styles[\\/]less[\\/]basic[\\/](Basic.less|Colors.less)/,
                        name: 'Basic_Colors_LESS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_CSS: {
                        test: /src[\\/]styles[\\/]css[\\/]basic[\\/](Basic.css|Colors.css)/,
                        name: 'Basic_Colors_CSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_SCSS: {
                        test: /src[\\/]styles[\\/]scss[\\/]basic[\\/](Basic.scss|Colors.scss)/,
                        name: 'Basic_Colors_SCSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Basic_Colors_SASS: {
                        test: /src[\\/]styles[\\/]sass[\\/]basic[\\/](Basic.sass|Colors.sass)/,
                        name: 'Basic_Colors_SASS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    BasicLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]basic[\\/](?!Basic.less|Colors.less).*\.less$/,
                        name: 'BasicLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]basic[\\/](?!Basic.css|Colors.css).*\.css$/,
                        name: 'BasicCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]basic[\\/](?!Basic.scss|Colors.scss).*\.scss$/,
                        name: 'BasicSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    BasicSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]basic[\\/](?!Basic.sass|Colors.sass).*\.sass$/,
                        name: 'BasicSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    Components_LESS: {
                        test: /src[\\/]components[\\/]Components.less/,
                        name: 'Components_LESS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_CSS: {
                        test: /src[\\/]components[\\/]Components.css/,
                        name: 'Components_CSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_SCSS: {
                        test: /src[\\/]components[\\/]Components.scss/,
                        name: 'Components_SCSS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Components_SASS: {
                        test: /src[\\/]components[\\/]Components.sass/,
                        name: 'Components_SASS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ComponentsLESS_dir: {
                        test: /src[\\/]components[\\/](?!Components.less).*\.less$/,
                        name: 'ComponentsLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsCSS_dir: {
                        test: /src[\\/]components[\\/](?!Components.css).*\.css$/,
                        name: 'ComponentsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsSCSS_dir: {
                        test: /src[\\/]components[\\/](?!Components.scss).*\.scss$/,
                        name: 'ComponentsSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ComponentsSASS_dir: {
                        test: /src[\\/]components[\\/](?!Components.sass).*\.sass$/,
                        name: 'ComponentsSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    PublicLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]public[\\/].*\.less$/,
                        name: 'PublicLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]public[\\/].*\.css$/,
                        name: 'PublicCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]public[\\/].*\.scss$/,
                        name: 'PublicSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]public[\\/].*\.sass$/,
                        name: 'PublicSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ModulesLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]modules[\\/].*\.less$/,
                        name: 'ModulesLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]modules[\\/].*\.css$/,
                        name: 'ModulesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]modules[\\/].*\.scss$/,
                        name: 'ModulesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]modules[\\/].*\.sass$/,
                        name: 'ModulesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueComponentsCSS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.css$/,
                        name: 'VueComponentsCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsSCSS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.scss$/,
                        name: 'VueComponentsSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsSASS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.sass$/,
                        name: 'VueComponentsSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueStylesCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/].*\.css$/,
                        name: 'VueStylesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStylesSCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/](?!test[\\/]|xmQAQ[\\/]).*\.scss$/,
                        name: 'VueStylesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStylesSASS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/].*\.sass$/,
                        name: 'VueStylesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 Start

                    TestVueStylesSCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/]test[\\/].*\.scss$/,
                        name: 'TestVueStylesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    XMQAQVueStylesSCSS_dir: {
                        test: /src[\\/]vue[\\/]styles[\\/]xmQAQ[\\/].*\.scss$/,
                        name: 'XMQAQVueStylesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 End

                    PagesLESS_dir: {
                        test: /src[\\/]styles[\\/]less[\\/]pages[\\/].*\.less$/,
                        name: 'PagesLESS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesCSS_dir: {
                        test: /src[\\/]styles[\\/]css[\\/]pages[\\/].*\.css$/,
                        name: 'PagesCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]pages[\\/](?!helloWorld[\\/]|xmQAQ[\\/]).*\.scss$/,
                        name: 'PagesSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PagesSASS_dir: {
                        test: /src[\\/]styles[\\/]sass[\\/]pages[\\/].*\.sass$/,
                        name: 'PagesSASS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 Start

                    HelloWorldSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]pages[\\/]helloWorld[\\/].*\.scss$/,
                        name: 'HelloWorldSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    XMQAQSCSS_dir: {
                        test: /src[\\/]styles[\\/]scss[\\/]pages[\\/]xmQAQ[\\/].*\.scss$/,
                        name: 'XMQAQSCSS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 End

                    VendorsJS_dir: {
                        test: /node_modules[\\/](?!vue[\\/]|vuex[\\/]|vue-router[\\/]|jquery[\\/]|echarts[\\/]|swiper[\\/]).*\.js/,
                        name: 'VendorsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueFamilyJS_dir: {
                        test: /node_modules[\\/](vue[\\/]|vuex[\\/]|vue-router[\\/]).*\.js/,
                        name: 'VueFamilyJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    jQueryJS_dir: {
                        test: /node_modules[\\/]jquery[\\/].*\.js/,
                        name: 'jQueryJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    EchartsJS_dir: {
                        test: /node_modules[\\/]echarts[\\/].*\.js/,
                        name: 'EchartsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    SwiperJS_dir: {
                        test: /node_modules[\\/]swiper[\\/].*\.js/,
                        name: 'SwiperJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    HTML2Canvas_JS: {
                        test: /src[\\/]js[\\/]tools[\\/]HTML2Canvas.esm.js/,
                        name: 'HTML2Canvas_JS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    CT_JS: {
                        test: /src[\\/]js[\\/]tools[\\/]CurrencyTools.esm.js/,
                        name: 'CT_JS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    Workers_JS: {
                        test: /src[\\/]js[\\/]tools[\\/]Workers4MT.esm.js/,
                        name: 'Workers_JS',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ToolsJS_dir: {
                        test: /src[\\/]js[\\/]tools[\\/](?!CurrencyTools.esm.js|Workers4MT.esm.js|HTML2Canvas.esm.js).*\.js$/,
                        name: 'ToolsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    WASMBasic_dir: {
                        test: /src[\\/]wasm[\\/]basic[\\/]$/,
                        name: 'WASMBasic_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMPublic_dir: {
                        test: /src[\\/]wasm[\\/]public[\\/]$/,
                        name: 'WASMPublic_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMModules_dir: {
                        test: /src[\\/]wasm[\\/]modules[\\/]$/,
                        name: 'WASMModules_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    WASMPages_dir: {
                        test: /src[\\/]wasm[\\/]pages[\\/]$/,
                        name: 'WASMPages_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    ComponentsJS_dir: {
                        test: /src[\\/]components[\\/].*\.js$/,
                        name: 'ComponentsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    PublicJS_dir: {
                        test: /src[\\/]js[\\/]public[\\/].*\.js$/,
                        name: 'PublicJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    ModulesJS_dir: {
                        test: /src[\\/]js[\\/]modules[\\/].*\.js$/,
                        name: 'ModulesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    VueRoutersJS_dir: {
                        test: /src[\\/]vue[\\/]routers[\\/].*\.js$/,
                        name: 'VueRoutersJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueStoresJS_dir: {
                        test: /src[\\/]vue[\\/]stores[\\/].*\.js$/,
                        name: 'VueStoresJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueComponentsJS_dir: {
                        test: /src[\\/]vue[\\/]components[\\/].*\.js$/,
                        name: 'VueComponentsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    VueModelsJS_dir: {
                        test: /src[\\/]vue[\\/]models[\\/](?!test[\\/]|xmQAQ[\\/]).*\.js$/,
                        name: 'VueModelsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 Start

                    TestVueModelsJS_dir: {
                        test: /src[\\/]vue[\\/]models[\\/]test[\\/].*\.js$/,
                        name: 'TestVueModelsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    XMQAQVueModelsJS_dir: {
                        test: /src[\\/]vue[\\/]models[\\/]xmQAQ[\\/].*\.js$/,
                        name: 'XMQAQVueModelsJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    TestPagesJS_dir: {
                        test: /src[\\/]js[\\/]pages[\\/]test[\\/].*\.js$/,
                        name: 'TestPagesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    HelloWorldPagesJS_dir: {
                        test: /src[\\/]js[\\/]pages[\\/]helloWorld[\\/].*\.js$/,
                        name: 'HelloWorldPagesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    XMQAQPagesJS_dir: {
                        test: /src[\\/]js[\\/]pages[\\/]xmQAQ[\\/].*\.js$/,
                        name: 'XMQAQPagesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    // 测试用 End

                    PagesJS_dir: {
                        test: /src[\\/]js[\\/]pages[\\/](?!helloWorld[\\/]|test[\\/]|xmQAQ[\\/]).*\.js$/,
                        name: 'PagesJS_dir',
                        // 数值越高越先添加加载
                        // priority: 1000,
                        enforce: true,
                        reuseExistingChunk: true
                    },

                    /*
                     default: {
                     minChunks: 2,
                     // 数值越高越先添加加载
                     // priority: -10,
                     reuseExistingChunk: true,
                     },
                     */
                };

                Object.entries( obj )
                      .forEach( ( c, i, ) => {
                          c[ 1 ].priority = start_num - i;
                      } );

                return obj;
            } )( 1000 ) )
    },
    provide_obj = {
        $: 'jQueryMin',
        jQuery: 'jQueryMin',
        'window.$': 'jQueryMin',
        'window.jQuery': 'jQueryMin',
        echarts: 'echartsMin',
        Swiper: 'swiperMin',
        Vue: 'vueESM',
        Vuex: 'vuexESM',
        VueRouter: 'vueRouterESM',
        CTESM: 'CTESM',
        CompESM: 'CompESM',
        WorkersESM: 'WorkersESM',
        HTML2C4ESM: 'HTML2C4ESM',
    },
    hashedModuleIds_obj = {
        // hex base64
        hashDigest: 'hex',
        hashDigestLength: 6,
        // sha512 md5
        hashFunction: 'sha512',
    },
    babelPresets_fun = ( isPro_boo, noTest_boo ) => [
        [
            '@babel/preset-env',
            {
                // 是否松散，建议不要
                loose: true,
                // 是否规范，启用后编译会耗时
                spec: false,
                // 7.4版本的插件写法发生巨变！！！
                corejs: {
                    version: 3,
                    proposals: true,
                },
                /*
                 modules这个选项说明！！！要细看！！！

                 把 modules 设置为 false，就是告诉 babel 不要编译模块代码。这会让 Babel 保留我们现有的 es2015 import/export 语句。
                 划重点：
                 所有可需要 tree-shaking 的代码必须以这种方式编译。
                 因此，如果你有要导入的库，则必须将这些库编译为 es2015 模块以便进行 tree-shaking 。
                 如果它们被编译为 commonjs，那么它们就不能做 tree-shaking ，并且将会被打包进你的应用程序中。
                 许多库支持部分导入，lodash 就是一个很好的例子，它本身是 commonjs 模块，但是它有一个 lodash-es 版本，用的是 es2015模块。
                 此外，如果你在应用程序中使用内部库，也必须使用 es2015 模块编译。为了减少应用程序包的大小，必须将所有这些内部库修改为以这种方式编译。
                 */
                // auto
                modules: false,
                useBuiltIns: 'usage',
                shippedProposals: true,
                targets: {
                    safari: 'tp',
                    // 启用会忽略browsers属性
                    esmodules: false,
                    browsers: browsers_arr,
                },
            }
        ]
    ],
    babelPlugins_fun = ( isPro_boo, noTest_boo, isESM_boo ) => {
        let miniJS_arr = [
                // JS压缩插件 Start
                // 暂时不用
                // [ 'minify-simplify' ],
                [
                    'minify-mangle-names',
                    {
                        // exclude: { TestClassA: true },
                        keepFnName: true,
                        eval: true,
                        topLevel: true,
                        keepClassName: true,
                    }
                ],
                [ 'transform-inline-consecutive-adds' ],
                [ '@babel/plugin-transform-member-expression-literals' ],
                [ 'transform-merge-sibling-variables' ],
                // [ 'transform-minify-booleans' ],
                /*
                 [
                 'minify-builtins',
                 {
                 tdz: true,
                 }
                 ],
                 */
                [
                    'minify-constant-folding',
                    {
                        tdz: true,
                    }
                ],
                [
                    'minify-dead-code-elimination',
                    {
                        optimizeRawSize: true,
                        keepFnName: true,
                        keepFnArgs: true,
                        keepClassName: true,
                        tdz: true,
                    }
                ],
                [ 'minify-numeric-literals' ],
                // Boolean(x) -> !!x
                [
                    'minify-type-constructors',
                    {
                        // true不转换
                        array: true,
                        boolean: true,
                        number: true,
                        object: true,
                        string: true,
                    }
                ],
                // const foo='ab+';var a=new RegExp(foo+'c','i');->const foo='ab+';var a=/ab+c/i;
                [ 'transform-regexp-constructors' ],
                /*
                 [
                 'transform-remove-undefined',
                 {
                 tdz: true,
                 }
                 ],
                 */
                // [ 'transform-undefined-to-void' ]
                // JS压缩插件 End
            ],
            cjs_arr = [
                '@babel/plugin-transform-modules-commonjs',
                {
                    allowTopLevelThis: true,
                    loose: true,
                    strict: false,
                    noInterop: false,
                    lazy: false,
                }
            ],
            runtime_arr = [
                '@babel/plugin-transform-runtime',
                {
                    // 7.4版本的插件写法发生巨变！！！
                    /*
                     corejs: {
                     version: 3,
                     proposals: true,
                     },
                     */
                    helpers: true,
                    regenerator: true,
                    useESModules: isESM_boo,
                }
            ],
            plug_arr = [
                [ '@babel/plugin-external-helpers' ],

                /*ES6+提案语法转换插件 Start*/
                [
                    '@babel/plugin-proposal-decorators',
                    {
                        legacy: true,
                        /*
                         // 当decoratorsBeforeExport === undefined时，而且legacy = false(默认的值也是false)时，会报错！！！
                         // The decorators plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you want to use the legacy decorators semantics, you can set the 'legacy: true' option.

                         // 当decoratorsBeforeExport !== undefined时，而且legacy = true时，会报错！！！
                         // 'decoratorsBeforeExport' can't be used with legacy decorators.

                         decoratorsBeforeExport: true
                         //@decorator
                         //export class Foo {}

                         //decoratorsBeforeExport: false
                         //export @decorator class Bar {}
                         */
                    }
                ],
                [
                    '@babel/plugin-proposal-class-properties',
                    {
                        loose: true,
                    }
                ],
                [ '@babel/plugin-proposal-async-generator-functions' ],
                [ '@babel/plugin-proposal-do-expressions' ],
                [ '@babel/plugin-proposal-export-default-from' ],
                [ '@babel/plugin-proposal-export-namespace-from' ],
                [ '@babel/plugin-proposal-function-bind' ],
                [ '@babel/plugin-proposal-function-sent' ],
                [ '@babel/plugin-proposal-json-strings' ],
                [ '@babel/plugin-proposal-logical-assignment-operators' ],
                [
                    '@babel/plugin-proposal-nullish-coalescing-operator',
                    {
                        loose: false,
                    }
                ],
                [ '@babel/plugin-proposal-numeric-separator' ],
                [ '@babel/plugin-transform-literals' ],
                [
                    '@babel/plugin-proposal-object-rest-spread',
                    {
                        loose: true,
                        useBuiltIns: true,
                    }
                ],
                [ '@babel/plugin-proposal-optional-catch-binding' ],
                [
                    '@babel/plugin-proposal-optional-chaining',
                    {
                        loose: false,
                    }
                ],
                [
                    '@babel/plugin-proposal-pipeline-operator',
                    {
                        proposal: 'minimal',
                    }
                ],
                [ '@babel/plugin-proposal-throw-expressions' ],
                [
                    '@babel/plugin-proposal-unicode-property-regex',
                    {
                        useUnicodeFlag: true,
                    }
                ],
                [
                    '@babel/plugin-proposal-private-methods',
                    {
                        loose: true,
                    }
                ],
                [ '@babel/plugin-proposal-partial-application' ],
                /*ES6+提案语法转换插件 End*/

                /*句法转换插件 Start*/
                [
                    '@babel/plugin-syntax-decorators',
                    {
                        legacy: true,
                        /*
                         // 当decoratorsBeforeExport === undefined时，而且legacy = false(默认的值也是false)时，会报错！！！
                         // The decorators plugin requires a 'decoratorsBeforeExport' option, whose value must be a boolean. If you want to use the legacy decorators semantics, you can set the 'legacy: true' option.

                         // 当decoratorsBeforeExport !== undefined时，而且legacy = true时，会报错！！！
                         // 'decoratorsBeforeExport' can't be used with legacy decorators.

                         decoratorsBeforeExport: true
                         //@decorator
                         //export class Foo {}

                         //decoratorsBeforeExport: false
                         //export @decorator class Bar {}
                         */
                    }
                ],
                [
                    '@babel/plugin-syntax-class-properties',
                    {
                        loose: true,
                    }
                ],
                [ '@babel/plugin-syntax-async-generators' ],
                [ '@babel/plugin-syntax-bigint' ],
                [ '@babel/plugin-syntax-do-expressions' ],
                [ '@babel/plugin-syntax-dynamic-import' ],
                [ '@babel/plugin-syntax-export-default-from' ],
                [ '@babel/plugin-syntax-export-extensions' ],
                [ '@babel/plugin-syntax-export-namespace-from' ],
                [ '@babel/plugin-syntax-flow' ],
                [ '@babel/plugin-syntax-function-bind' ],
                [ '@babel/plugin-syntax-function-sent' ],
                [ '@babel/plugin-syntax-import-meta' ],
                [ '@babel/plugin-syntax-json-strings' ],
                [ '@babel/plugin-syntax-jsx' ],
                [ '@babel/plugin-syntax-logical-assignment-operators' ],
                [
                    '@babel/plugin-syntax-nullish-coalescing-operator',
                    {
                        loose: false,
                    }
                ],
                [ '@babel/plugin-syntax-numeric-separator' ],
                [
                    '@babel/plugin-syntax-object-rest-spread',
                    {
                        loose: true,
                        useBuiltIns: true,
                    }
                ],
                [ '@babel/plugin-syntax-optional-catch-binding' ],
                [
                    '@babel/plugin-syntax-optional-chaining',
                    {
                        loose: false,
                    }
                ],
                [
                    '@babel/plugin-syntax-pipeline-operator',
                    {
                        proposal: 'minimal',
                    }
                ],
                [ '@babel/plugin-syntax-throw-expressions' ],
                [
                    '@babel/plugin-syntax-typescript',
                    {
                        isTSX: false,
                    }
                ],
                [ '@babel/plugin-syntax-partial-application' ],
                [ '@babel/plugin-syntax-top-level-await' ],
                /*句法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2015(ES6)
                /*ES2015(ES6)语法转换插件 Start*/
                /* 暂时不用 [ '@babel/plugin-transform-instanceof' ],*/
                /* 暂时不用 [ '@babel/plugin-transform-sticky-regex' ],*/
                /*tdz: true会报错 TypeError: this.addHelper is not a function*/
                /*[
                 '@babel/plugin-transform-block-scoping',
                 {
                 throwIfClosureRequired: false,
                 tdz: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-arrow-functions',
                 {
                 spec: true,
                 }
                 ],
                 [ '@babel/plugin-transform-block-scoped-functions' ],
                 [
                 '@babel/plugin-transform-computed-properties',
                 {
                 loose: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-destructuring',
                 {
                 loose: false,
                 useBuiltIns: true,
                 }
                 ],
                 [ '@babel/plugin-transform-duplicate-keys' ],
                 [
                 '@babel/plugin-transform-for-of',
                 {
                 loose: false,
                 assumeArray: false,
                 }
                 ],
                 [ '@babel/plugin-transform-function-name' ],
                 [ '@babel/plugin-transform-new-target' ],
                 [ '@babel/plugin-transform-object-super' ],
                 [
                 '@babel/plugin-transform-parameters',
                 {
                 loose: false,
                 }
                 ],
                 [ '@babel/plugin-transform-shorthand-properties' ],
                 [
                 '@babel/plugin-transform-spread',
                 {
                 loose: false,
                 }
                 ],
                 [
                 '@babel/plugin-transform-template-literals',
                 {
                 loose: false,
                 }
                 ],
                 [ '@babel/plugin-transform-typeof-symbol' ],
                 [ '@babel/plugin-transform-unicode-regex' ],
                 [
                 '@babel/plugin-transform-classes',
                 {
                 loose: false,
                 }
                 ],*/
                /*ES2015(ES6)语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2016
                /*ES2016语法转换插件 Strat*/
                /*[ '@babel/plugin-transform-exponentiation-operator' ],*/
                /*ES2016语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2017
                /*ES2017语法转换插件 Strat*/
                /*[
                 '@babel/plugin-transform-async-to-generator',
                 {
                 module: 'bluebird',
                 method: 'coroutine',
                 }
                 ],*/
                /*ES2017语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候，就可以不用转码ES2018
                /*ES2018语法转换插件 Strat*/
                /*[ '@babel/plugin-transform-dotall-regex' ],
                 [
                 '@babel/plugin-transform-named-capturing-groups-regex',
                 {
                 runtime: true,
                 }
                 ],*/
                /*ES2018语法转换插件 End*/

                // 当不需要兼容低版本的浏览器的时候
                /*语法转换插件 Start*/
                /*[ '@babel/plugin-transform-jscript' ],
                 [ '@babel/plugin-check-constants' ],
                 [ '@babel/plugin-codemod-optional-catch-binding' ],
                 [ '@babel/plugin-transform-eval' ],
                 [ '@babel/plugin-transform-property-literals' ],
                 [ '@babel/plugin-transform-property-mutators' ],
                 [
                 '@babel/plugin-transform-regenerator',
                 {
                 asyncGenerators: true,
                 generators: true,
                 async: true,
                 }
                 ],

                 [ '@babel/plugin-transform-reserved-words' ],
                 [ '@babel/plugin-transform-object-assign' ],*/

                // 要注意这个插件的使用方法！！！该插件配合下面那个插件使用！！！没用这两个插件，IE9中就无法使用Object.setPrototypeOf()
                // [ '@babel/plugin-transform-proto-to-assign' ],
                // Object.setPrototypeOf(bar, foo);要注意这个插件的使用方法！！！需要上头那个插件的配合使用！！！没用这两个插件，IE9中就无法使用Object.setPrototypeOf()
                // [ '@babel/plugin-transform-object-set-prototype-of-to-assign' ],
                /*
                 PS:
                 var foo = { a: 1 };
                 var bar = { b: 2 };
                 bar.__proto__ = foo;
                 bar.a; // 1
                 foo.a = 2;
                 bar.a; // 1 没用这个两个插件，会输出2(本来也应该输出2的)！！！用了会输出1！！！
                 */

                /*语法转换插件 End*/

                // 没啥效果
                // [ '@babel/plugin-transform-strict-mode' ],
            ];
        noTest_boo && miniJS_arr.unshift( [ 'transform-remove-console' ], [ 'transform-remove-debugger' ] );
        isESM_boo
        ? plug_arr.push( runtime_arr )
        : ( plug_arr.push( cjs_arr ), plug_arr.push( runtime_arr ) );
        isPro_boo && plug_arr.push( ...miniJS_arr );
        return plug_arr;
    },
    moduleRules_fun = ( { path, __dirname, isPro, MiniCSSExtractPlugin, noTest_boo, isESM_boo, } ) => {
        let obj = {
            hmr: !isPro,
            // reloadAll isPro为true时去掉这个选项
            // reloadAll: false,
        };

        !isPro && ( obj.reloadAll = true );

        let arr = [
            {
                test: /\.(html|htm)$/i,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [
                                'script:src',
                                'img:src',
                                'link:href',
                                'audio:src',
                                'video:src',
                                'source:src',
                            ],
                            removeComments: isPro,
                            removeScriptTypeAttributes: isPro,
                            removeStyleTypeAttributes: isPro,
                            removeAttributeQuotes: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.ejs$/i,
                use: [
                    { loader: 'ejs-loader' },
                ],
                include: [
                    path.resolve( __dirname, './src/tplEJS/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: obj,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 1,
                        },
                    },
                    postCSSLoader_fun( isPro ),
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: obj,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                // indentedSyntax: true,
                                // indentWidth: 4,
                                precision: 6,
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'contenthash'
                                              : 'contenthash' }:6].css`,
                            // publicPath: '../',
                            outputPath: './styles/',
                            esModule: false,
                        }
                    },
                    { loader: 'extract-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                        },
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                sideEffects: true,
            },
            {
                test: /\.sass$/i,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            import: true,
                            importLoaders: 2,
                        }
                    },
                    postCSSLoader_fun( isPro ),
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true,
                                indentWidth: 4,
                                precision: 6,
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/styles/sass/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/css/' ),
                    path.resolve( __dirname, './src/styles/less/' ),
                    path.resolve( __dirname, './src/styles/scss/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                sideEffects: true,
            },

            {
                test: /\.(js|mjs|cjs)$/i,
                // 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json'
                // 'webassembly/sync' | 'webassembly/async'(webpack 5) | 'webassembly/experimental'(webpack 4)
                // 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'
                type: 'javascript/auto',
                parser: {
                    // true启用 false禁用
                    // 启用 CommonJS
                    commonjs: true,
                    // 启用 ES2015 Harmony import/export
                    harmony: true,
                    // 禁用 AMD
                    // amd: false,
                    // 禁用 SystemJS
                    // system: false,
                    // 禁用 require.include
                    // requireInclude: false,
                    // 禁用 require.ensure
                    // requireEnsure: false,
                    // 禁用 require.context
                    // requireContext: false,
                    // 禁用特殊处理的 browserify bundle
                    // browserify: false,
                    // 禁用 requirejs.*
                    // requireJs: false,
                    // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
                    // node: false
                    // 或 node: {} 在模块级别(module level)上重新配置 node 层(layer)
                },
                use: [
                    {
                        loader: 'thread-loader',
                        options: jsWorkerPool,
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: !isPro,
                            presets: babelPresets_fun( isPro, noTest_boo ),
                            plugins: babelPlugins_fun( isPro, noTest_boo, isESM_boo ),
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                    path.resolve( __dirname, './src/workers/' ),
                ],
                // sideEffects: true,
            },
            // src/workers下的.js文件的特殊处理
            {
                test: /\.(js)$/i,
                // 'javascript/auto' | 'javascript/dynamic' | 'javascript/esm' | 'json'
                // 'webassembly/sync' | 'webassembly/async'(webpack 5) | 'webassembly/experimental'(webpack 4)
                // 'asset' | 'asset/source' | 'asset/resource' | 'asset/inline'
                type: 'javascript/auto',
                parser: {
                    // true启用 false禁用
                    // 启用 CommonJS
                    commonjs: true,
                    // 启用 ES2015 Harmony import/export
                    harmony: true,
                    // 禁用 AMD
                    // amd: false,
                    // 禁用 SystemJS
                    // system: false,
                    // 禁用 require.include
                    // requireInclude: false,
                    // 禁用 require.ensure
                    // requireEnsure: false,
                    // 禁用 require.context
                    // requireContext: false,
                    // 禁用特殊处理的 browserify bundle
                    // browserify: false,
                    // 禁用 requirejs.*
                    // requireJs: false,
                    // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
                    // node: false
                    // 或 node: {} 在模块级别(module level)上重新配置 node 层(layer)
                },
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'contenthash'
                                              : 'contenthash' }:6].worker.js`,
                            // publicPath: '../',
                            outputPath: './workers/',
                            esModule: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/workers/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.vue$/i,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            transformAssetUrls: {
                                video: [
                                    'src',
                                    'poster',
                                ],
                                source: 'src',
                                img: 'src',
                                audio: 'src',
                                image: [
                                    'xlink:href',
                                    'href',
                                ],
                                use: [
                                    'xlink:href',
                                    'href',
                                ],
                            },
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.manifest\.json$/i,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'contenthash'
                                              : 'contenthash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './others/',
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.json5$/i,
                type: 'javascript/auto',
                use: [
                    { loader: 'json5-loader' },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.xml$/i,
                use: [
                    {
                        loader: 'xml-loader',
                        /*
                         options: {
                         explicitChildren: true,
                         },
                         */
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/json/' ),
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.txt$/i,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/doc/txt/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/json/' ),
                    path.resolve( __dirname, './src/assets/doc/json5/' ),
                    path.resolve( __dirname, './src/assets/doc/xml/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.wasm$/i,
                // webpack 4: webassembly/experimental   webpack 5: webassembly/async
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'hash'
                                              : 'hash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './wasm/',
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                // sideEffects: true,
            },

            {
                test: /\.(jng|bmp|dcx|gif|icns|ico|jbig2|jpe|jpeg|jpg|pam|pbm|pcx|pgm|png|pnm|ppm|psd|rgbe|tga|tif|tiff|wbmp|xbm|xpm|svg|svgz|webp|heif|heic)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'hash'
                                              : 'hash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './img/',
                            limit: 10240,
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(eot|otf|fon|font|ttf|ttc|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'hash'
                                              : 'hash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './fonts/',
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(m4a|kar|ape|wav|wave|flac|wma|cda|aiff|au|mpeg|mpeg-1|mpeg-2|mpeg-layer3|mpeg-4|mp3|mp2|mp1|mid|midi|ra|rm|rmx|vqf|amr|aac|vorbis)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'hash'
                                              : 'hash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './music/',
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
            {
                test: /\.(wmv|asf|asx|rmvb|mp4|3gp|mov|m4v|avi|dat|mkv|flv|vob|mod|mng|mpg|ts|3gpp|ogg|webm)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // chunkhash hash contenthash
                            name: `[name]_[${ isPro
                                              ? 'hash'
                                              : 'hash' }:6].[ext]`,
                            // publicPath: '../',
                            outputPath: './videos/',
                            esModule: false,
                        }
                    },
                ],
                include: [
                    path.resolve( __dirname, './node_modules/' ),
                    path.resolve( __dirname, './src/assets/videos/' ),
                    path.resolve( __dirname, './src/components/' ),
                    path.resolve( __dirname, './src/vue/' ),
                ],
                exclude: [
                    path.resolve( __dirname, './assistTools/' ),
                    path.resolve( __dirname, './backups/' ),
                    path.resolve( __dirname, './bats/' ),
                    path.resolve( __dirname, './configures/' ),
                    path.resolve( __dirname, './dist/' ),
                    path.resolve( __dirname, './notes/' ),
                    path.resolve( __dirname, './simServer/' ),
                    path.resolve( __dirname, './webpackRecords/' ),

                    path.resolve( __dirname, './src/assets/doc/' ),
                    path.resolve( __dirname, './src/assets/fonts/' ),
                    path.resolve( __dirname, './src/assets/img/' ),
                    path.resolve( __dirname, './src/assets/music/' ),
                    path.resolve( __dirname, './src/js/' ),
                    path.resolve( __dirname, './src/pwa4Manifest/' ),
                    path.resolve( __dirname, './src/static/' ),
                    path.resolve( __dirname, './src/styles/' ),
                    path.resolve( __dirname, './src/tplEJS/' ),
                    path.resolve( __dirname, './src/tplHTML/' ),
                    path.resolve( __dirname, './src/wasm/' ),
                ],
                // sideEffects: true,
            },
        ];
        return arr;
    },
    watchIgnored_arr = [
        path.resolve( __dirname, './.git/' ),
        path.resolve( __dirname, './.idea/' ),
        path.resolve( __dirname, './assistTools/' ),
        path.resolve( __dirname, './backups/' ),
        path.resolve( __dirname, './bats/' ),
        path.resolve( __dirname, './dist/' ),
        path.resolve( __dirname, './node_modules/' ),
        path.resolve( __dirname, './notes/' ),
        path.resolve( __dirname, './simServer/' ),
        path.resolve( __dirname, './src/static/' ),
    ],
    watchOptions_obj = {
        aggregateTimeout: 100,
        ignored: watchIgnored_arr,
        poll: 100,
    },
    copyWebpackPluginConfig_arr = [
        {
            context: './src/',
            from: 'static',
            to: './static',
            toType: 'dir',
            force: true,
            cache: true,
            ignore: [
                '**/.gitignore',
                '该文件夹说明.txt',
            ],
        },
        {
            context: './src/workers/',
            from: 'tools',
            to: './workers/tools',
            toType: 'dir',
            force: true,
            cache: true,
            ignore: [
                '**/.gitignore',
                'tools文件夹下的文件说明.txt',
            ],
        },
    ],
    cleanWebpackPluginConfig_fun = arg => ( {
        // 模拟删除文件的操作，true开启，开启后，不会真的删除硬盘上的文件
        dry: false,
        // 将日志写入控制台，true开启，当dry开启时，这个选项总是开启的
        verbose: false,
        // 在重建时自动删除所有未使用的webpack资产，true开启
        cleanStaleWebpackAssets: true,
        // 不允许删除当前的webpack资产，true开启
        protectWebpackAssets: false,
        // 在Webpack编译之前删除一次文件，但是不包括重建过程中的文件（也就是监视模式）
        // 值为空数组时，表示禁用“cleanOnceBeforeBuildPatterns”的功能
        // !test，表示排除test文件
        // 相对于Webpack的output.path目录。
        // 如果在webpack的output.path目录之外，请使用完整路径。path.join
        // 如：'**/*', '!static-files*'
        cleanOnceBeforeBuildPatterns: [
            path.join( __dirname, `./dist/${ arg }/fonts/*` ),
            path.join( __dirname, `./dist/${ arg }/img/*` ),
            path.join( __dirname, `./dist/${ arg }/js/*` ),
            path.join( __dirname, `./dist/${ arg }/music/*` ),
            path.join( __dirname, `./dist/${ arg }/others/*` ),
            path.join( __dirname, `./dist/${ arg }/pages/*` ),
            path.join( __dirname, `./dist/${ arg }/styles/*` ),
            path.join( __dirname, `./dist/${ arg }/videos/*` ),
            path.join( __dirname, `./dist/${ arg }/wasm/*` ),
            path.join( __dirname, `./dist/${ arg }/workers/*` ),
        ],
        // 在每次构建（包括监视模式）后删除与此模式匹配的文件。
        // 如：'static*.*', '!static1.js'
        cleanAfterEveryBuildPatterns: [],
        // true开启，会删除匹配之外的文件
        dangerouslyAllowCleanPatternsOutsideProject: false,
    } ),
    recordsPath_fun = str => {
        const nowDate = new Date( Date.now() ),
            year = nowDate.getFullYear(),
            month = String( nowDate.getMonth() + 1 )
                .padStart( 2, '0' ),
            date = String( nowDate.getDate() )
                .padStart( 2, '0' ),
            hours = String( nowDate.getHours() )
                .padStart( 2, '0' ),
            minutes = String( nowDate.getMinutes() )
                .padStart( 2, '0' ),
            seconds = String( nowDate.getSeconds() )
                .padStart( 2, '0' ),
            day0 = Number( nowDate.getDay() ),
            day = day0 === 0
                  ? '日'
                  : day0,
            result_str = `./webpackRecords/${ str }/${ year }年${ month }月${ date }日${ hours }时${ minutes }分${ seconds }秒_周${ day }.json5`;

        return path.join( __dirname, result_str );
    },
    AssetsWebpackPluginOption_obj = {
        filename: 'ProjectAssets.json',
        fullPath: true,
        includeManifest: false,
        manifestFirst: true,
        useCompilerPath: false,
        prettyPrint: false,
        update: false,
        includeAllFileTypes: true,
        integrity: false,
        entrypoints: false,
        metadata: {
            version: '2020.01.01',
            assetsFileName: '../others/ProjectAssets.json',
            externalAssets: require( './configures/CacheResources.js' ).cacheResources,
        },
    };

module.exports = {
    entry_obj,
    output_fun,
    resolve_fun,
    externals_obj,
    node_obj,
    performance_obj,
    optimization_fun,
    defineObj_fun,
    splitChunks_obj,
    provide_obj,
    hashedModuleIds_obj,
    browsers_arr,
    moduleRules_fun,
    watchIgnored_arr,
    watchOptions_obj,
    copyWebpackPluginConfig_arr,
    cleanWebpackPluginConfig_fun,
    recordsPath_fun,
    AssetsWebpackPluginOption_obj,
};
