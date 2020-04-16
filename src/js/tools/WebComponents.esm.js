/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-01-01 00:00:00
 * IDE: WebStorm
 */

/**
 * 这是一个使用“工厂模式”编写的Web Components生成工具<br />
 * PS: <br />
 * 1、自主定制元素(Autonomous Custom Element): 独立元素；它们不继承自内置HTML元素。<br />
 * 2、定制的内置元素(Customized Built-in Element): 这些元素从内置HTML元素继承并扩展。<br />
 * 3、Firefox、Chrome和Edge(76)默认支持定制的内置元素(Customized Built-in Element)。<br />
 * 到目前为止，Opera和Safari仅支持自主定制元素(Autonomous Custom Element)。<br />
 * 4、Object.prototype.toString.call( document.createElement( 'cus-html' ) )输出'[object HTMLElement]'。<br />
 * 5、Element.attachShadow()<br />
 * “Element.attachShadow()”方法将阴影DOM树附加到指定元素，并返回对其“ShadowRoot”的引用。<br />
 * 可以附加阴影的元素：<br />
 * 任何具有有效名称的自主定制元素(Autonomous Custom Element)、article、aside、blockquote、body、div、footer、h1、<br />
 * h2、h3、h4、h5、h6、header、main、nav、p、section、span<br />
 */

// 在自定义元素的类中，'shadowRoot'这个名字不能使用，是系统保留字段！要是用了会报错！
// WebC类的私有实例属性、私有实例方法、私有静态属性、私有静态方法不能在自定义元素类内部使用！要是用了会报错！

'use strict';

function DataT( arg ){
    'use strict';

    return Object.prototype.toString.call( arg );
}

/**
 * 验证是否可以有效的使用Element.attachShadow()。<br />
 * PS: 满足以下两个条件就为true了。<br />
 * 1、任何具有有效名称的自主定制元素(Autonomous Custom Element)。<br />
 * 2、元素名是这些中的一个：article、aside、blockquote、body、div、footer、h1、<br />
 * h2、h3、h4、h5、h6、header、main、nav、p、section、span。<br />
 *
 * @param extends4ClassName Class，元素类
 *
 * @param extends4ElemName String，元素名
 *
 * @returns {boolean} true可以有效的使用Element.attachShadow()，反之，不可以。
 */
function Effectiv4AddShadow( extends4ClassName, extends4ElemName ){
    return HTMLElement === extends4ClassName || [
        'article',
        'aside',
        'blockquote',
        'body',
        'div',
        'footer',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'main',
        'nav',
        'p',
        'section',
        'span',
    ].includes( extends4ElemName );
}

function GetError( info_str ){
    throw new Error( info_str );
}

function IsDataT( data, type ){
    if( 'Element' === type ){
        return DataT( data )
            .includes( type );
    }

    let str1 = DataT( data )
        .split( ' ' )[ 1 ];

    return str1.slice( 0, str1.length - 1 ) === type;
}

function IsString( arg ){
    return IsDataT( arg, 'String' ) && ( typeof arg === 'string' );
}

class WebC{

    /**
     * 自定义的元素类
     *
     * @type {Class}
     */
    #cusHTMLClass = null;
    /**
     * 自定义的元素类的实例，在初始化自定义元素前(即调用customElements.define()前)，其值是null。
     *
     * @type {Function}
     */
    cusHTMLClassIns = null;

    /**
     * 配置选项
     *
     * @type {Object}
     */
    optionObj = null;

    /**
     * shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)、Effectiv4AddShadow()返回false时，其值是null。
     *
     * @type {Object}
     */
    shadowRootObj = null;

    /**
     * Web Components工厂类的构造函数<br />
     * PS：<br />
     * 1、<br />
     * 如果要创建的是定制的内置元素(Customized Built-in Element)(就是需要继承自内置HTML元素，但是不包括已经为文档注册了的自定义元素)，<br />
     * 那么最快、最方便的配置方法就是直接设置define.extends值以及把extends的值设置成'auto'就好了，免得去查询HTMLParagraphElement之类的内置HTML类。<br />
     * 2、在自定义元素的类中，'shadowRoot'这个名字不能使用，是系统保留字段！要是用了会报错！<br />
     * 3、WebC类的私有实例属性、私有实例方法、私有静态属性、私有静态方法不能在自定义元素类内部使用！要是用了会报错！<br />
     *
     * @param initOption Object(配置对象)，必须。<br />
     * {<br />
     * attach: Object(配置对象)，给Element.attachShadow()做参数用的，可选。<br />
     * {<br />
     * delegatesFocus: 可选，默认值是：null，值只能是：null、true、false这三种。当值是null时，表示不传这个参数。<br />
     * 当设置为true时，它指定减轻围绕焦点可用性的自定义元素问题的行为，<br />
     * 当单击shadow DOM的一个不可聚焦部分时，第一个可聚焦部分被赋予焦点，而shadow主机被赋予任何可用的“:focus”样式。<br />
     * mode: 可选，默认值是'open'，值只能是字符串: 'open'、'closed'这两个，<br />
     * 当值是'open'时，影子根的元素可以从根之外的JavaScript访问，例如使用“Element.shadowRoot”。<br />
     * 当值是'closed'时，拒绝从其外部JavaScript访问封闭的影子根节点。<br /><br />
     *
     * define: Object(配置对象)，给customElements.define()做参数用的，必须。<br />
     * {<br />
     * extends: 字符串(命名格式只能是以小写字母跟数字、'-'、“_”组成的，并且只能是以小写字母开头)，默认值是null，如果要创建的是自主定制元素(Autonomous Custom Element)，那么不用设置；<br />
     * 但如果创建的是定制的内置元素(Customized Built-in Element)，那么就必须传HTML标签名(如：'div'等HTML标签名)。<br />
     * 还有就是，如果下面的配置参数选项'extends'的值是字符串'auto'，那么表示创建的是定制的内置元素(Customized Built-in Element)，<br />
     * 那么就必须传HTML标签名(如：'div'等HTML标签名)。<br />
     * 特别的，如果传的是已经为文档注册成功了的自定义元素名(如：'cus-html')，那么下面的配置参数选项extends就必须传这个自定义元素类。<br />
     * name: 字符串，默认值是null，自定义元素名(格式如: 'cus-html'，命名格式只能是以小写字母跟数字、'-'、“_”组成的，并且只能是以小写字母开头)，必须。<br />
     * ps：<br />
     * 1、define.extends这个选项跟下面的extends选项息息相关的，需要注意。<br /><br />
     *
     * events: Object(配置对象)，自定义元素的生命周期事件函数，可选。<br />
     * {<br />
     * init: 函数，会在自定义元素的构造函数中调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，Effectiv4AddShadow()返回false时，其值为null。<br />
     * connectedCallback: 函数，每次将自定义元素附加到文档连接的元素中时调用。这将在每次移动节点时发生，并且可能发生在元素的内容完全解析之前，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，Effectiv4AddShadow()返回false时，其值为null。<br />
     * 2、一旦元素不再连接，就可以调用“connectedCallback”，请使用“Node.isConnected”确保。<br />
     * disconnectedCallback: 函数，每次自定义元素与文档DOM断开连接时调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，Effectiv4AddShadow()返回false时，其值为null。<br />
     * adoptedCallback: 函数，每次将自定义元素移至新文档时调用，可选。<br />
     * PS：<br />
     * 1、有两个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，Effectiv4AddShadow()返回false时，其值为null。<br />
     * attributeChangedCallback: 函数，每次添加、删除或更改自定义元素的属性之一时调用，可选。<br />
     * PS：<br />
     * 1、有三个函数参数：<br />
     * 第一个参数：自定义元素类的实例；<br />
     * 第二个参数：自定义元素类的shadowRoot对象，Effectiv4AddShadow()返回false时，其值为null；<br />
     * 第三个参数：数组<br />
     * [<br />
     * name(字符串，发生变化的属性的属性名),<br />
     * oldValue(字符串，旧的属性值，没有的话会是null),<br />
     * newValue(字符串，新的属性值，没有的话会是null),<br />
     * arg4(这个参数所表示的未知，一直都是null的值)<br />
     * ]。<br /><br />
     *
     * extends: String|Class，默认值是HTMLElement，值只能是：'auto'、HTMLElement、HTMLElement的内置子类(如：HTMLParagraphElement等等内置HTML类)、自定义元素类，必须。<br />
     * 当值是'auto'时，上面的配置参数选项define.extends的值必须传(HTML标签名(如：'div'等HTML标签名))，代码会自动根据define.extends的值生成define.extends的值所代表的元素类。<br />
     * 当值是HTMLElement时，表示要创建的是自主定制元素(Autonomous Custom Element)，上面的配置参数选项define.extends的值可以不用设置。<br />
     * 当值是HTMLElement的内置子类(如：HTMLParagraphElement等等内置HTML类)时，表示要创建的是定制的内置元素(Customized Built-in Element)，上面的配置参数选项define.extends的值必须传(HTML标签名(如：'div'等HTML标签名))。<br />
     * 当值是自定义元素类时，表示要再一次扩展一个已经为文档注册成功了的自定义元素类，上面的配置参数选项define.extends的值必须是它(自定义元素类)对应的已经为文档注册成功了的自定义元素名(如：'cus-html')。<br />
     * extends这个选项跟上面的define.extends选项息息相关的，需要注意。<br /><br />
     *
     * isInit: Boolean，默认值是true，true表示自动初始化自定义元素，false表示稍后手动初始化自定义元素(调用startInit()就行)，可选。<br /><br />
     *
     * obsAttrs: Array<String>，默认值是空数组[]，监听哪些属性的更改，里面的成员都是属性名，可选。<br />
     */
    constructor( initOption = {} ){
        let _this = this;

        _this.optionObj = Object.assign( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                extends: null,
                name: null,
            },
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                },
                connectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                disconnectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                adoptedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                },
                attributeChangedCallback: ( cusHTMLClassIns, shadowRoot, [
                    name,
                    oldValue,
                    newValue,
                    arg4
                ] ) => {
                },
            },
            extends: HTMLElement,
            isInit: true,
            obsAttrs: [],
        }, initOption );

        if( !( /^([a-z])[a-z0-9-_]{0,}$/g.test( _this.optionObj.define.extends ) ) ){
            GetError( 'define.extends的命名格式只能是以小写字母跟数字、"-"、“_”组成的，并且只能是以小写字母开头！' );

            return null;
        }

        if( !( /^([a-z])[a-z0-9-_]{0,}$/g.test( _this.optionObj.define.name ) ) ){
            GetError( 'define.name的命名格式只能是以小写字母跟数字、"-"、“_”组成的，并且只能是以小写字母开头！' );

            return null;
        }

        _this.optionObj.attach.delegatesFocus === null && ( delete _this.optionObj.attach.delegatesFocus );

        _this.optionObj.extends === 'auto' && ( _this.optionObj.extends = document.createElement( _this.optionObj.define.extends ).constructor );

        _this.#cusHTMLClass = class
            extends _this.optionObj.extends{

            /**
             * 静态私有属性，监听哪些属性的更改，里面的成员都是属性名
             *
             * @type {Array<String>}
             */
            static #obsAttrs = _this.optionObj.obsAttrs;

            /**
             * shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)、Effectiv4AddShadow()返回false时，其值是null。
             *
             * @type {Object}
             */
            #shadowRootObj = null;

            /**
             * 静态getter，监听哪些属性的更改，里面的成员都是属性名
             *
             * @returns {Array<String>}
             */
            static get observedAttributes(){
                return this.#obsAttrs;
            }

            constructor(){
                super();

                Effectiv4AddShadow( _this.optionObj.extends, _this.optionObj.define.extends ) && ( this.#shadowRootObj = this.attachShadow( _this.optionObj.attach ) );

                _this.optionObj.events.init( this, this.#shadowRootObj );

                _this.cusHTMLClassIns = this;
                _this.shadowRootObj = this.#shadowRootObj;
            }

            /**
             * 每次将自定义元素附加到文档连接的元素中时调用。这将在每次移动节点时发生，并且可能发生在元素的内容完全解析之前。<br />
             * PS：<br />
             * 1、一旦元素不再连接，就可以调用“connectedCallback”，请使用“Node.isConnected”确保。<br />
             */
            connectedCallback(){
                _this.optionObj.events.connectedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次自定义元素与文档DOM断开连接时调用。
             */
            disconnectedCallback(){
                _this.optionObj.events.disconnectedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次将自定义元素移至新文档时调用。
             */
            adoptedCallback(){
                _this.optionObj.events.adoptedCallback( this, this.#shadowRootObj );
            }

            /**
             * 每次添加、删除或更改自定义元素的属性之一时调用。<br />
             * PS：<br />
             * 1、“static get observedAttributes”方法中指定要注意哪些属性的更改。<br />
             *
             * @param name 字符串，发生变化的属性的属性名。
             *
             * @param oldValue 字符串，旧的属性值，没有的话会是null。
             *
             * @param newValue 字符串，新的属性值，没有的话会是null。
             *
             * @param arg4 null，这个参数所表示的未知，一直都是null的值。
             */
            attributeChangedCallback( name, oldValue, newValue, arg4 ){
                _this.optionObj.events.attributeChangedCallback( this, this.#shadowRootObj, [
                    name,
                    oldValue,
                    newValue,
                    arg4,
                ], );
            }

        };

        _this.optionObj.isInit && ( _this.optionObj.extends === HTMLElement
                                    ? customElements.define( _this.optionObj.define.name, _this.#cusHTMLClass, )
                                    : customElements.define( _this.optionObj.define.name, _this.#cusHTMLClass, { extends: _this.optionObj.define.extends, } ) );
    }

    /**
     * 获取自定义的元素类，允许再把它当作父类，被其他自定义元素类继承再次扩展。
     *
     * @returns {Class} 自定义的元素类
     */
    getHTMLClass(){
        return this.#cusHTMLClass;
    }

    /**
     * 获取自定义的元素类的实例，在初始化自定义元素前(即调用customElements.define()前)，其值是null。
     *
     * @returns {Function} 自定义的元素类的实例
     */
    getHTMLClassIns(){
        return this.cusHTMLClassIns;
    }

    /**
     * 获取shadowRoot对象，在初始化自定义元素前(即调用customElements.define()前)、Effectiv4AddShadow()返回false时，其值是null。
     *
     * @returns {Object} shadowRoot对象
     */
    getShadowRoot(){
        return this.shadowRootObj;
    }

    /**
     * 手动初始化自定义元素<br />
     * PS：<br />
     * 1、只有当上面的构造函数的配置参数选项中的“isInit”选项的值为false时，调用它才会触发初始化自定义元素。<br />
     */
    startInit(){
        let _this = this;

        !_this.optionObj.isInit && ( _this.optionObj.extends === HTMLElement
                                     ? customElements.define( _this.optionObj.define.name, _this.#cusHTMLClass, )
                                     : customElements.define( _this.optionObj.define.name, _this.#cusHTMLClass, { extends: _this.optionObj.define.extends, } ) );
    }

}

export {
    WebC,
};

export default WebC;
