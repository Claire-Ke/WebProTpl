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

function Handle2( name, descriptor, type, fn ){
    if( 'initializer' in descriptor && !fn( descriptor.initializer() ) ){
        GetError( `${ name }的数据类型只能是${ type }类型！` );
    }

    return descriptor;
}

function IsArray( arg ){
    'use strict';

    return Array.isArray( arg );
}

function IsBigInt( arg ){
    'use strict';

    return IsDataT( arg, 'BigInt' );
}

function IsBoolean( arg ){
    'use strict';

    return IsDataT( arg, 'Boolean' );
}

function IsDataT( data, type ){
    'use strict';

    return DataT( data )
        .includes( type );
}

function IsDate( arg ){
    'use strict';

    return IsDataT( arg, 'Date' );
}

function IsFinite( arg ){
    'use strict';

    return Number.isFinite( arg );
}

function IsFormData( arg ){
    'use strict';

    return IsDataT( arg, 'FormData' );
}

function IsFunction( arg ){
    'use strict';

    return IsDataT( arg, 'Function' );
}

function IsInteger( arg ){
    'use strict';

    return Number.isInteger( arg );
}

function IsNaN( arg ){
    'use strict';

    return Number.isNaN( arg );
}

function IsNull( arg ){
    'use strict';

    return IsDataT( arg, 'Null' );
}

function IsNumber( arg ){
    return IsDataT( arg, 'Number' ) && ( typeof arg === 'number' );
}

function IsObject( arg ){
    'use strict';

    return IsDataT( arg, 'Object' );
}

function IsRegExp( arg ){
    'use strict';

    return IsDataT( arg, 'RegExp' );
}

function IsSafeInteger( arg ){
    'use strict';

    return Number.isSafeInteger( arg );
}

function IsString( arg ){
    return IsDataT( arg, 'String' ) && ( typeof arg === 'string' );
}

function IsSymbol( arg ){
    'use strict';

    return IsDataT( arg, 'Symbol' );
}

function IsUndefined( arg ){
    'use strict';

    return IsDataT( arg, 'Undefined' );
}

/**
 * 该装饰器(Array类型的数据)用于修饰类的实例属性、静态属性<br />
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
function ArrayType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Array', IsArray );
}

/**
 * 该装饰器用于修饰类本身、类的实例方法、静态方法
 */
function AutoBind( target, name, descriptor ){
    GetError( 'Decorator装饰器“AutoBind”还未实现！' );
}

/**
 * 该装饰器(BigInt类型的数据)用于修饰类的实例属性、静态属性<br />
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
function BigIntType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'BigInt', IsBigInt );
}

/**
 * 该装饰器(Boolean类型的数据)用于修饰类的实例属性、静态属性<br />
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
function BooleanType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Boolean', IsBoolean );
}

/**
 * 该装饰器(Date类型的数据)用于修饰类的实例属性、静态属性<br />
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
function DateType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Date', IsDate );
}

/**
 * 该装饰器(FormData类型的数据)用于修饰类的实例属性、静态属性<br />
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
function FormDataType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'FormData', IsFormData );
}

/**
 * 该装饰器(Function类型的数据)用于修饰类的实例属性、静态属性<br />
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
function FunctionType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Function', IsFunction );
}

/**
 * 该装饰器(NaN类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NaNType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'NaN', IsNaN );
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
 * 该装饰器(Null类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NullType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Null', IsNull );
}

/**
 * 该装饰器(Number类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NumberType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number', IsNumber );
}

/**
 * 该装饰器(Number Finite类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NumberFiniteType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number Finite', IsFinite );
}

/**
 * 该装饰器(Number Integer类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NumberIntegerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number Integer', IsInteger );
}

/**
 * 该装饰器(Number SafeInteger类型的数据)用于修饰类的实例属性、静态属性<br />
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
function NumberSafeIntegerType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Number SafeInteger', IsSafeInteger );
}

/**
 * 该装饰器(Object类型的数据)用于修饰类的实例属性、静态属性<br />
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
function ObjectType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Object', IsObject );
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

/**
 * 该装饰器(RegExp类型的数据)用于修饰类的实例属性、静态属性<br />
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
function RegExpType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'RegExp', IsRegExp );
}

/**
 * 该装饰器(String类型的数据)用于修饰类的实例属性、静态属性<br />
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
function StringType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'String', IsString );
}

/**
 * 该装饰器(Symbol类型的数据)用于修饰类的实例属性、静态属性<br />
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
function SymbolType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Symbol', IsSymbol );
}

/**
 * 该装饰器(Undefined类型的数据)用于修饰类的实例属性、静态属性<br />
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
function UndefinedType( target, name, descriptor ){
    'use strict';

    return Handle2( name, descriptor, 'Undefined', IsUndefined );
}

const decorators_objC = {
    ArrayType,
    AutoBind,
    BigIntType,
    BooleanType,
    DateType,
    FormDataType,
    FunctionType,
    NaNType,
    NoConfigurable,
    NoEnumerable,
    NullType,
    NumberType,
    NumberFiniteType,
    NumberIntegerType,
    NumberSafeIntegerType,
    ObjectType,
    Override,
    ReadOnly,
    RegExpType,
    StringType,
    SymbolType,
    UndefinedType,
};

export {
    ArrayType,
    AutoBind,
    BigIntType,
    BooleanType,
    DateType,
    FormDataType,
    FunctionType,
    NaNType,
    NoConfigurable,
    NoEnumerable,
    NullType,
    NumberType,
    NumberFiniteType,
    NumberIntegerType,
    NumberSafeIntegerType,
    ObjectType,
    Override,
    ReadOnly,
    RegExpType,
    StringType,
    SymbolType,
    UndefinedType,
};

export default decorators_objC;
