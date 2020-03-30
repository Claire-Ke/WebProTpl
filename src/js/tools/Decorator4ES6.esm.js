/**
 * Author：林鹏
 * Email：2726893248@qq.com
 * CreateDate：2020-03-30 20:02
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

/**
 * Decorator装饰器工具(编译时执行！！！不是运行时执行！！！)<br /><br />
 *
 * PS：<br />
 * 1、作用于类的装饰器会有一个参数，就是类本身。<br />
 * 2、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 3、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 4、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 5、如果同一个方法有多个装饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。<br />
 */

'use strict';

function DataT( arg ){
    'use strict';

    return Object.prototype.toString.call( arg );
}

function GetError( info_str ){
    throw new Error( info_str );
}

function Handle1( name, descriptor, type ){
    if( type in descriptor ){
        descriptor[ type ] = false;
        return descriptor;
    }
    else if( 'get' in descriptor || 'set' in descriptor ){
        GetError( '不能作用于get、set上！' );
    }
    else{
        GetError( `该属性(${ name })的描述对象不存在${ type }属性！` );
    }
}

function IsDataT( data, type ){
    'use strict';

    return DataT( data )
        .includes( type );
}

function IsFunction( arg ){
    'use strict';

    return IsDataT( arg, 'Function' );
}

function IsObject( arg ){
    'use strict';

    return IsDataT( arg, 'Object' );
}

function IsUndefined( arg ){
    'use strict';

    return IsDataT( arg, 'Undefined' );
}

/**
 * 该装饰器用于修饰类本身、类的实例方法、静态方法
 */
function AutoBind( target, name, descriptor ){
    GetError( 'Decorator装饰器“AutoBind”还未实现！' );
}

/**
 * 该装饰器(不可配置)用于修饰类的实例属性、实例方法、静态属性、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NoConfigurable( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'configurable' );
}

/**
 * 该装饰器(不可枚举)用于修饰类的实例属性、静态属性<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function NoEnumerable( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'enumerable' );
}

/**
 * 该装饰器(是否正确覆盖父类的方法：参数个数是否一致，方法名是否一致)用于修饰类的实例方法、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function Override( target, name, descriptor ){
    const getStr1_funC = arg => `该类没有继承其他类，无法使用该修饰器修饰${ arg }方法！`,
        getStr2_funC = arg => `直接父类不存在同名(${ name })的${ arg }方法！`,
        getTarget_funC = target => Object.getPrototypeOf( target ),
        get1_funC = target => Object.getOwnPropertyDescriptor( getTarget_funC( target ), name ),
        is1_booC = IsObject( target ),
        is2_booC = IsFunction( target ),
        isHandle1_funC = target => IsUndefined( get1_funC( target ) ),
        isHandle2_funC = target => getTarget_funC( target ) === getTarget_funC( {} ) && isHandle1_funC( target ),
        isHandle3_funC = target => !( 'get' in descriptor || 'set' in descriptor ) && ( get1_funC( target ).value.length !== descriptor.value.length ),
        getStr3_funC = arg => `${ arg }方法的参数个数不相等！直接父类的${ arg }方法${ name }的参数个数是${ get1_funC( target ).value.length }个，而子类的是${ descriptor.value.length }个！`;

    if( is1_booC && isHandle2_funC( target ) ){
        GetError( getStr1_funC( '实例' ) );
    }
    else if( is2_booC && isHandle2_funC( target.prototype ) ){
        GetError( getStr1_funC( '静态' ) );
    }
    else if( is1_booC && isHandle1_funC( target ) ){
        GetError( getStr2_funC( '实例' ) );
    }
    else if( is2_booC && isHandle1_funC( target ) ){
        GetError( getStr2_funC( '静态' ) );
    }
    else if( is1_booC && isHandle3_funC( target ) ){
        GetError( getStr3_funC( '实例' ) );
    }
    else if( is2_booC && isHandle3_funC( target ) ){
        GetError( getStr3_funC( '静态' ) );
    }

    return descriptor;
}

/**
 * 该装饰器(只读)用于修饰类的实例属性、实例方法、静态属性、静态方法<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function<br />
 * 3、作用于类的实例属性、类的实例方法的装饰器会有三个参数：类的原型对象、所要装饰的属性名、该属性的描述对象。<br />
 * 4、作用于类的静态属性、类的静态方法的装饰器会有三个参数：类本身、所要装饰的属性名、该属性的描述对象。<br />
 * 5、目前装饰器还不能作用于类的私有实例属性、类的私有实例方法、类的私有静态属性、类的私有静态方法。<br />
 * 6、使用时，直接修饰于目标上头，不能以函数的形式执行。<br />
 *
 * @param target Object|Function 修饰的目标<br />
 * PS：<br />
 * 1、修饰类的实例属性、实例方法时的第一个参数target的数据类型是object Object，类的原型对象<br />
 * 2、修饰类的静态属性、静态方法时的第一个参数target的数据类型是object Function，类本身<br />
 *
 * @param name String 所要装饰的属性名
 *
 * @param descriptor Object 该属性的描述对象
 *
 * @returns {Object} 该属性的描述对象
 */
function ReadOnly( target, name, descriptor ){
    'use strict';

    return Handle1( name, descriptor, 'writable' );
}

const decorator_objC = {
    AutoBind,
    NoConfigurable,
    NoEnumerable,
    Override,
    ReadOnly,
};

export {
    AutoBind,
    NoConfigurable,
    NoEnumerable,
    Override,
    ReadOnly,
};

export default decorator_objC;
