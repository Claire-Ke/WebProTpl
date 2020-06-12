const TSConfig_objC = {
    'compileOnSave': true,
    // 指定要包含在程序中的文件的允许列表。如果找不到任何文件，则会发生错误。
    // 当您只有少量文件并且不需要使用glob来引用许多文件时，此功能非常有用。如果需要，请使用include。
    'files': [],
    // 指定解析包含时应跳过的文件名或模式的数组。
    // "include"和"exclude"支持通配符以创建全局模式：
    // * 匹配零个或多个字符（目录分隔符除外）
    // ? 匹配任何一个字符（目录分隔符除外）
    // **/ 匹配嵌套到任何级别的任何目录
    // 如果全局模式不包含文件扩展名，则仅包含具有受支持的扩展名的文件（例如，默认情况下为.ts，.tsx和.d.ts，如果allowJs设置为true，则包含.js和.jsx）。
    'exclude': [
        '.git',
        '.idea',
        'assistTools',
        'backups',
        'bats',
        'configures',
        'dist',
        'node_modules',
        'notes',
        'simServer',
        'simServer4Deno',
        'src/assets',
        'src/pwa4Manifest',
        'src/static',
        'src/styles',
        'src/tplEJS',
        'src/tplHTML',
        'src/wasm',
        'src/workers',
        'webpackRecords',
        'bower_components',
        'jspm_packages'
    ],
    // 指定要包含在程序中的文件名或模式的数组。这些文件名相对于包含tsconfig.json文件的目录进行解析。
    // "include"和"exclude"支持通配符以创建全局模式：
    // * 匹配零个或多个字符（目录分隔符除外）
    // ? 匹配任何一个字符（目录分隔符除外）
    // **/ 匹配嵌套到任何级别的任何目录
    // 如果全局模式不包含文件扩展名，则仅包含具有受支持的扩展名的文件（例如，默认情况下为.ts，.tsx和.d.ts，如果allowJs设置为true，则包含.js和.jsx）。
    'include': [
        'src/components/**/*.ts',
        'src/components/**/*.tsx',
        'src/js/**/*.ts',
        'src/js/**/*.tsx',
        'src/vue/**/*.ts',
        'src/vue/**/*.tsx',
        'src/vue/**/*.ts.vue',
        'src/webComponents/**/*.ts',
        'src/webComponents/**/*.tsx'
    ],
    /*
     'typeAcquisition': {
     'enable': true
     },
     */
    'references': true,
    'compilerOptions': {
        // Project Options Start

        // 告诉TypeScript将上次编译的项目图信息保存到存储在磁盘上的文件中。这将在编译输出所在的文件夹中创建一系列.tsbuildinfo文件。
        // 它们在运行时不被JavaScript使用，可以安全地删除。
        'incremental': true,
        'tsBuildInfoFile': './dist/TSBuildInfo.tsbuildinfo',
        // ES3、ES5、ES6、ES2015、ES7、ES2016、ES2017(Node 8)、ES2018(Node 10)、ES2019(Node 12)、ES2020、ESNext
        'target': 'ES2020',
        // CommonJS(default if target is ES3 or ES5)、ES6、ES2015、ES2020、None、UMD、AMD、System、ESNext
        'module': 'ES2020',
        // [ 'lib.es6.d.ts', 'lib.es2015.d.ts' ]
        'lib': ( () => fs.readdirSync( path.join( __dirname, './node_modules/typescript/lib' ) )
                         .filter( ( c, i, a ) => !fs.statSync( path.join( __dirname, `./node_modules/typescript/lib/${ c }` ) )
                                                    .isDirectory() )
                         .filter( ( c, i, a ) => c.startsWith( 'lib.' ) && c.endsWith( '.d.ts' ) ) )(),
        // true时，可以在.ts中导入.js；但是，false时，这么干，会报错！
        'allowJs': false,
        // true时，当把.js文件导入到.ts文件中时，如果.js文件中有错，将报告错误，这相当于在项目中包含的所有JavaScript文件的顶部包含"// @ts-check"。
        'checkJs': false,
        // 控制如何在JavaScript文件中发出JSX构造。这仅影响以.tsx文件开头的JS文件的输出。
        // preserve: 在不更改JSX的情况下发出.jsx文件
        // react: 使用JSX发出.js文件已更改为等效的React.createElement调用
        // react-native: 在JSX不变的情况下发出.js文件
        'jsx': 'preserve',
        // 为项目中的每个TypeScript或JavaScript文件生成.d.ts文件。这些.d.ts文件是描述模块外部API的类型定义文件。
        // 对于.d.ts文件，TypeScript之类的工具可以为未键入的代码提供智能感知和准确的类型。
        // PS: 在为JavaScript文件使用“.d.ts”文件时，可能需要使用“emitDeclarationOnly”或“outDir”来确保JavaScript文件不会被覆盖。
        'declaration': true,
        // 为映射回原始“.ts”源文件的“.d.ts”文件生成源映射。这将允许像VS代码这样的编辑器在使用像go to Definition这样的功能时转到原始的“.ts”文件。
        // 如果您使用的是项目参考，则应强烈考虑启用此功能。
        'declarationMap': true,
        'sourceMap': false,
        'composite': true,
        // 转换为JavaScript时，剥离TypeScript文件中的所有注释。默认为false。
        'removeComments': true,
        'noEmit': false,
        // 属于“有助于调试的标志”！！！
        'importHelpers': true,
        'downlevelIteration': true,
        // 如果设置了isolatedModules，则所有实现文件都必须是模块（这意味着它具有某种形式的导入/导出）。如果任何文件不是模块，则会发生错误(此限制不适用于.d.ts文件)
        // 这些限制可能会导致某些类型脚本功能（如常量枚举和命名空间）出现运行时问题。
        // 设置isolatedModules标志会告诉TypeScript，如果您编写的某些代码无法由单个文件转换过程正确解释，则会发出警告。
        // 它不会更改代码的行为，也不会更改TypeScript检查和发出进程的行为。
        'isolatedModules': false,

        // Project Options End

        // Strict Checks Start

        'strict': true,
        // 在隐式任何类型的表达式和声明上引发错误。
        'noImplicitAny': true,
        // 在严格的null检查模式下，null和undefined值不在每种类型的域中，并且只能分配给它们自己和任何值（一个例外是undefined也可以分配给void）。
        // 当strictNullChecks为true时，null和undefined有各自不同的类型，如果在需要具体值的地方尝试使用它们，则会出现类型错误。
        'strictNullChecks': true,
        // 在开发此功能期间，我们发现了大量固有的不安全类层次结构，包括DOM中的某些层次结构。因此，该设置仅适用于以函数语法编写的函数，而不适用于以方法语法编写的函数
        'strictFunctionTypes': true,
        // 设置后，TypeScript将检查是否为基础函数使用正确的参数调用了函数的内置方法call，bind和apply：
        'strictBindCallApply': true,
        // 设置为true时，当声明了类属性但未在构造函数中设置ClassType时，TypeScript将引发错误。
        'strictPropertyInitialization': true,
        // 使用隐式任何类型引发此表达式上的错误。
        'noImplicitThis': true,
        // 确保以ECMAScript严格模式解析文件，并为每个源文件发出"use strict"信息。
        'alwaysStrict': true,

        // Strict Checks End

        // Module Resolution Start

        // 不推荐使用，允许值：node(Node.js)、classic(TypeScript pre-1.6)
        // 'moduleResolution': 'node',
        'baseUrl': './',
        // 就跟Webpack里的resolve.alias一样
        'paths': {
            'echarts': [
                'node_modules/echarts/dist/echarts.min.js'
            ],
            'jQuery': [
                'node_modules/jquery/dist/jquery.min.js'
            ],
            '$': [
                'node_modules/jquery/dist/jquery.min.js'
            ],
            'Swiper': [
                'node_modules/swiper/js/swiper.min.js'
            ],
            'Vue': [
                'node_modules/vue/dist/vue.min.js'
            ],
            'VueRouter': [
                'node_modules/vue-router/dist/vue-router.min.js'
            ],
            'Vuex': [
                'node_modules/vuex/dist/vuex.min.js'
            ],
            'tslib': [
                'node_modules/tslib/tslib.es6.js'
            ],
            'CompESM': [
                'src/components/Components.esm.js'
            ],
            'CTESM': [
                'src/js/tools/CurrencyTools.esm.js'
            ],
            'DecESM': [
                'src/js/tools/Decorator4ES6.esm.js'
            ],
            'HTML2C4ESM': [
                'src/js/tools/HTML2Canvas.esm.js'
            ],
            'WebCESM': [
                'src/js/tools/WebComponents.esm.js'
            ],
            'WorkersESM': [
                'src/js/tools/Workers4MT.esm.js'
            ],
            'configDir/*': [
                'configures/*'
            ],
            'jsonDir/*': [
                'src/assets/doc/json/*'
            ],
            'json5Dir/*': [
                'src/assets/doc/json5/*'
            ],
            'txtDir/*': [
                'src/assets/doc/txt/*'
            ],
            'xmlDir/*': [
                'src/assets/doc/xml/*'
            ],
            'fontsDir/*': [
                'src/assets/fonts/*'
            ],
            'imgDir/*': [
                'src/assets/img/*'
            ],
            'musicDir/*': [
                'src/assets/music/*'
            ],
            'videosDir/*': [
                'src/assets/videos/*'
            ],
            'compDir/*': [
                'src/components/*'
            ],
            'gQLDir/*': [
                'src/graphQL/*'
            ],
            'jsDir/*': [
                'src/js/*'
            ],
            'jsMDir/*': [
                'src/js/modules/*'
            ],
            'jsPDir/*': [
                'src/js/pages/*'
            ],
            'jsPubDir/*': [
                'src/js/public/*'
            ],
            'jsTDir/*': [
                'src/js/tools/*'
            ],
            'manifestDir/*': [
                'src/pwa4Manifest/*'
            ],
            'cssDir/*': [
                'src/styles/css/*'
            ],
            'cssBDir/*': [
                'src/styles/css/basic/*'
            ],
            'cssMDir/*': [
                'src/styles/css/modules/*'
            ],
            'cssPDir/*': [
                'src/styles/css/pages/*'
            ],
            'cssPubDir/*': [
                'src/styles/css/public/*'
            ],
            'lessDir/*': [
                'src/styles/less/*'
            ],
            'lessBDir/*': [
                'src/styles/less/basic/*'
            ],
            'lessMDir/*': [
                'src/styles/less/modules/*'
            ],
            'lessPDir/*': [
                'src/styles/less/pages/*'
            ],
            'lessPubDir/*': [
                'src/styles/less/public/*'
            ],
            'sassDir/*': [
                'src/styles/sass/*'
            ],
            'sassBDir/*': [
                'src/styles/sass/basic/*'
            ],
            'sassMDir/*': [
                'src/styles/sass/modules/*'
            ],
            'sassPDir/*': [
                'src/styles/sass/pages/*'
            ],
            'sassPubDir/*': [
                'src/styles/sass/public/*'
            ],
            'scssDir/*': [
                'src/styles/scss/*'
            ],
            'scssBDir/*': [
                'src/styles/scss/basic/*'
            ],
            'scssMDir/*': [
                'src/styles/scss/modules/*'
            ],
            'scssPDir/*': [
                'src/styles/scss/pages/*'
            ],
            'scssPubDir/*': [
                'src/styles/scss/public/*'
            ],
            'tplEJSDir/*': [
                'src/tplEJS/*'
            ],
            'tplEJSBDir/*': [
                'src/tplEJS/basic/*'
            ],
            'tplEJSMLDir/*': [
                'src/tplEJS/basic/metaLink/*'
            ],
            'tplEJSMDir/*': [
                'src/tplEJS/modules/*'
            ],
            'tplEJSPDir/*': [
                'src/tplEJS/pages/*'
            ],
            'tplEJSPubDir/*': [
                'src/tplEJS/public/*'
            ],
            'tplHTMLDir/*': [
                'src/tplHTML/*'
            ],
            'tplHTMLBDir/*': [
                'src/tplHTML/basic/*'
            ],
            'tplHTMLMDir/*': [
                'src/tplHTML/modules/*'
            ],
            'tplHTMLPDir/*': [
                'src/tplHTML/pages/*'
            ],
            'tplHTMLPubDir/*': [
                'src/tplHTML/public/*'
            ],
            'vueDir/*': [
                'src/vue/*'
            ],
            'vueCompDir/*': [
                'src/vue/components/*'
            ],
            'vueMDir/*': [
                'src/vue/models/*'
            ],
            'vueRDir/*': [
                'src/vue/routers/*'
            ],
            'vueSDir/*': [
                'src/vue/stores/*'
            ],
            'vueStyDir/*': [
                'src/vue/styles/*'
            ],
            'vueVDir/*': [
                'src/vue/views/*'
            ],
            'wasmDir/*': [
                'src/wasm/*'
            ],
            'wasmBDir/*': [
                'src/wasm/basic/*'
            ],
            'wasmMDir/*': [
                'src/wasm/modules/*'
            ],
            'wasmPDir/*': [
                'src/wasm/pages/*'
            ],
            'wasmPubDir/*': [
                'src/wasm/public/*'
            ],
            'webCDir/*': [
                'src/webComponents/*'
            ],
            'serviceWorkersDir/*': [
                'src/workers/serviceWorkers/*'
            ],
            'sWorkersDir/*': [
                'src/workers/sharedWorkers/*'
            ],
            'tWorkersDir/*': [
                'src/workers/tools/*'
            ],
            'wWorkersDir/*': [
                'src/workers/webWorkers/*'
            ]
        },
        'typeRoots': [
            'node_modules/@types'
        ],
        // 空数组将禁用自动引入 @types 包
        'types': [],
        'allowSyntheticDefaultImports': true,
        // 通过为所有导入创建名称空间对象，启用CommonJS和ES模块之间的发射互操作性。
        'esModuleInterop': true,
        // 这是为了在Node.js中反映相同的标志；它不解析符号链接的实际路径。
        // 此标志还显示与Webpack的resolve.symlinks选项相反的行为（即将TypeScript的preserveSymlinks设置为true与将Webpack的resolve.symlinks设置为false并行，反之亦然）。
        // 启用此选项后，对模块和包的引用（例如imports和/// <reference type="..." />指令）都是相对于符号链接文件的位置解析的，而不是相对于符号链接解析到的路径解析的。
        'preserveSymlinks': false,
        // 当设置为true时，allowumddglobalaccess允许您从模块文件内部以全局方式访问UMD导出。模块文件是具有导入和/或导出的文件。
        // 如果没有这个标志，使用UMD模块的导出需要一个导入声明。
        // 此标志的一个示例用例是一个web项目，在该项目中，您知道特定库（如jQuery或Lodash）在运行时始终可用，但不能通过导入访问它。
        'allowUmdGlobalAccess': true,

        // Module Resolution End

        // Source Maps Start

        'sourceRoot': './dist/',
        'mapRoot': './dist/',
        // 设置后，TypeScript将在.js文件中嵌入源映射内容，而不是写出.js.map文件来提供源映射。尽管这会产生更大的JS文件，但在某些情况下，这是很方便的。
        // 例如，您可能希望在不允许提供.map文件的Web服务器上调试JS文件。
        'inlineSourceMap': false,
        // 设置后，TypeScript将把.ts文件的原始内容作为嵌入字符串包含在源映射中。在与inlineSourceMap相同的情况下，这通常很有用。
        // 需要设置sourceMap或inlineSourceMap。
        'inlineSources': false,

        // Source Maps End

        // Linter Checks Start

        // 报告未使用的局部变量的错误。
        'noUnusedLocals': true,
        // 报告有关函数中未使用参数的错误。
        'noUnusedParameters': true,
        // 启用后，TypeScript将检查函数中的所有代码路径，以确保它们返回值。
        'noImplicitReturns': true,
        // 在switch语句中报告失败情况的错误。确保switch语句中的任何非空情况都包括break或return。这意味着您不会意外附带案例失败漏洞。
        'noFallthroughCasesInSwitch': true,

        // Linter Checks End

        // Experimental Start

        // 在TC39标准化流程的第二阶段，为装饰器启用实验支持。
        // 装饰器是一种语言功能，尚未完全批准到JavaScript规范中。这意味着TypeScript中的实现版本可能与TC39决定的JavaScript中的实现版本有所不同。
        'experimentalDecorators': true,
        // 为与装饰器反射元数据模块一起使用的装饰器的发射类型元数据启用实验性支持。
        'emitDecoratorMetadata': true,

        // Experimental End

        // Advanced Start

        // 属于“有助于调试的标志”！！！
        // 打印文件名称的一部分。当您不确定TypeScript是否包含所需的文件时，此功能很有用。
        'listFiles': false,
        // 属于“有助于调试的标志”！！！
        // 将编译的一部分生成文件的名称打印到终端。
        // 该标志在两种情况下很有用：
        // 1、您想将TypeScript转换为终端中构建链的一部分，该终端在下一条命令中处理文件名。
        // 2、您不确定TypeScript是否包含了所需的文件，这是调试文件包含设置的一部分。
        'listEmittedFiles': false,
        // 属于“有助于调试的标志”！！！
        // 当您尝试调试未包含模块的原因时。您可以将traceResolutions设置为true，以使TypeScript打印有关每个已处理文件的解析过程的信息。
        'traceResolution': false,
        // 属于“有助于调试的标志”！！！
        // 不推荐使用
        // 'diagnostics': true,
        // 属于“有助于调试的标志”！！！
        // 您可以使用此标志来发现TypeScript在编译时花费的时间。这是一个用于了解代码库整体性能特征的工具。
        'extendedDiagnostics': true,
        // 属于“有助于调试的标志”！！！
        // 此选项使您有机会让TypeScript在编译器运行期间发出v8 CPU配置文件。CPU配置文件可以提供对构建可能缓慢的原因的洞察。
        // 可以在基于Chromium的浏览器（如Chrome浏览器或Edge Profiler）中的Chrome或Edge Developer中打开此文件。
        'generateCpuProfile': './dist/profile.cpuprofile',
        // 属于“有助于调试的标志”！！！
        // 启用此选项后，TypeScript将避免重新检查/重新生成所有真正可能受影响的文件，并且只重新检查/重新生成已更改的文件以及直接导入它们的文件。
        // 这可以被认为是监视算法的“快速和松散”实现，它可以大大减少增量重建时间，但代价是必须偶尔运行完整的构建以获取所有编译器错误消息。
        'assumeChangesOnlyAffectDirectDependencies': true,
        // 属于“有助于调试的标志”！！！
        // 只发出.d.ts文件；不发出.js文件。 此设置在两种情况下很有用：
        // 1、您正在使用TypeScript以外的其他编译器来生成JavaScript。
        // 2、您正在使用TypeScript仅为使用者生成d.ts文件。
        'emitDeclarationOnly': false,
        // 属于“有助于调试的标志”！！！
        // 此标志控制导入的工作方式，共有3种不同的选项：
        // 该标志起作用是因为您可以使用导入类型来显式创建一个导入语句，该语句永远不会发送到JavaScript中。
        // remove 删除仅引用类型的导入语句的默认行为。
        // preserve 保留所有从不使用值或类型的导入语句。这可能导致保留导入/副作用。
        // error 这将保留所有导入（与preserve选项相同），但当值导入仅用作类型时将出错。如果希望确保没有意外导入值，但仍使副作用导入显式化，则这可能很有用。
        'importsNotUsedAsValues': 'remove',
        // 属于“有助于调试的标志”！！！
        // 编译JSX Elements时，更改.js文件中调用的函数。最常见的更改是使用“ h”或“ preact.h”，而不是默认的“ React.createElement”（如果使用preact）。
        'jsxFactory': 'React.createElement',
        // 属于“有助于调试的标志”！！！
        // 允许导入扩展名为“ .json”的模块，这是节点项目中的常见做法。这包括基于静态JSON形状为导入生成类型。
        'resolveJsonModule': true,
        // 不推荐使用
        // 'charset': 'utf8',
        'emitBOM': false,
        'newLine': 'crlf',
        // 不推荐使用
        // 'noErrorTruncation': true,
        // 禁用自动包含任何库文件。如果设置此选项，则忽略lib。
        'noLib': false,
        // 默认情况下，TypeScript将检查导入和引用指令的初始文件集，并将这些解析文件添加到程序中。
        // 如果设置了noResolve，则不会发生此过程。但是，仍然会检查import语句以查看它们是否解析为有效模块，因此您需要确保通过其他方法满足这一要求。
        'noResolve': false,
        // 不要为JSDoc注释中包含@internal注释的代码发出声明。这是一个内部编译器选项；请自行承担使用风险，因为编译器不会检查结果是否有效。
        // 如果您正在搜索一个工具来处理d.ts文件中的其他可见性级别，请查看api提取器。
        // @internal
        'stripInternal': true,
        // 为避免在处理非常大的JavaScript项目时可能出现的内存膨胀问题，TypeScript将分配的内存量有上限。开启此标志将删除限制。
        'disableSizeLimit': true,
        // 禁用项目引用重定向的源
        // 在处理复合TypeScript项目时，此选项提供了一种方法，可返回到3.7之前的行为，其中d.ts文件用作模块之间的边界。在3.7中，真理的源头就是您的TypeScript文件。
        'disableSourceOfProjectReferenceRedirect': true,
        // 禁用解决方案搜索
        // 使用复合类型脚本项目时，此选项提供了一种方法，用于声明在编辑器中使用“查找所有引用”或“跳转到定义”等功能时不希望包含项目。
        // 这个标志可以用来提高大型复合项目的响应性。
        'disableSolutionSearching': true,
        'noImplicitUseStrict': false,
        'noEmitHelpers': false,
        // 如果报告了任何错误，请不要发出编译器输出文件，如JavaScript源代码、源映射或声明。
        // 这默认为false，使在类似于监视的环境中使用TypeScript更容易，在这种环境中，在确保解决所有错误之前，您可能希望在另一个环境中查看代码更改的结果。
        'noEmitOnError': true,
        // 不要在生成的代码中擦除const枚举声明。 const枚举提供一种方法，该方法通过发出枚举值（而不是引用）来减少应用程序在运行时的总体内存占用。
        // const枚举的默认行为是将任何Album.Something转换为相应的数字文字，并从JavaScript中完全删除对该枚举的引用。
        // 将preserveConstEnums设置为true时，枚举在运行时存在并且仍会发出数字。
        // 这实质上使此类const枚举仅具有源代码功能，而没有运行时跟踪。
        'preserveConstEnums': true,
        'declarationDir': './dist/',
        // 跳过默认库声明文件的类型检查。
        'skipLibCheck': true,
        // 设置为false可禁用有关未使用标签的警告。 标签在JavaScript中很少见，通常表示尝试编写对象文字：
        // false，会启用无法访问到的代码的错误检查；true，表示关闭这种检查。
        'allowUnusedLabels': false,
        // 设置为false可禁用有关无法访问代码的警告。这些警告仅与由于使用JavaScript语法而无法访问的代码有关
        // 这不会影响基于类型分析似乎无法到达的基于代码的错误。false，会启用无法访问到的代码的错误检查；true，表示关闭这种检查。
        'allowUnreachableCode': true,
        // true将禁用报告多余的属性错误
        // 添加此标志是为了帮助人们迁移到TypeScript 1.6中对新对象文字进行更严格的检查。
        // 我们不建议在现代代码库中使用此标志，您可以使用'// @ts-ignore'抑制一次性需要的情况。
        'suppressExcessPropertyErrors': false,
        // 启用“suppressImplicitAnyIndexErrors”将禁止在索引到对象时报告有关隐式Any的错误
        // 使用suppressImplicitAnyIndexErrors是一种非常严格的方法。建议使用'// @ts-ignore'注释代替
        'suppressImplicitAnyIndexErrors': false,
        // 设置此选项后，如果程序试图通过与磁盘上的大小写不同的大小写来包含文件，则TypeScript将发出错误。
        'forceConsistentCasingInFileNames': true,
        // 在节点模块下搜索和加载JavaScript文件的最大依赖深度。
        // 此标志只能在启用allowJs时使用，如果要在节点模块中为所有JavaScript设置TypeScript推断类型，则使用此标志。
        // 理想情况下，该值应保持在0（默认值），并且应使用d.ts文件显式定义模块的形状。但是，在某些情况下，您可能希望以牺牲速度和潜在准确性为代价来启用此功能。
        'maxNodeModuleJsDepth': 10000,
        // 比较两个通用函数时，TypeScript将统一类型参数。
        'noStrictGenericChecks': false,
        // 此标志用作迁移到即将到来的类字段标准版本的一部分。TypeScript在TC39中被认可之前引入了类字段很多年。
        // 即将发布的规范的最新版本与TypeScript的实现具有不同的运行时行为，但语法相同。
        // 此标志将切换到即将到来的ECMA运行时行为。
        'useDefineForClassFields': true,
        // 不推荐使用
        // 'keyofStringsOnly': true,

        // Advanced End

        // Command Line Start

        // 是否将过时的控制台输出保持在监视模式下，而不是每次发生更改时都清除屏幕。true，保留
        'preserveWatchOutput': false,
        // 使用颜色和上下文对错误和消息进行样式化，默认情况下处于启用状态-使您有机会从编译器中获得较少的简洁单色消息。
        'pretty': true,

        // Command Line End

        // 这些只存在于命令行的启动命令参数中(命令参数的使用，如：tsc --project ./tsconfig.json src/*.ts) Start

        // --locale
        'locale': 'zh-CN',
        // --project、-p
        'project': './tsconfig.json',
        // --showConfig
        'showConfig': false,
        // --watch、-w
        'watch': true,
        // 这个参数没在“Compiler Options”中找到！！！奇怪了！！！当初哪里看到的呢！！！
        'onlyRemoveTypeImports': true

        // 这些只存在于命令行的启动命令参数中 End
    }
};
