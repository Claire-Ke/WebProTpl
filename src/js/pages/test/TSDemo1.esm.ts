/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-04-27 23:23:27
 * IDE: WebStorm
 */

'use strict';

class TSDemo1{

    get firstName(): string{
        return this._firstName;
    }

    set firstName( value: string ){
        this._firstName = value;
    }

    get middleInitial(): string{
        return this._middleInitial;
    }

    set middleInitial( value: string ){
        this._middleInitial = value;
    }

    get lastName(): string{
        return this._lastName;
    }

    set lastName( value: string ){
        this._lastName = value;
    }

    fullName: string;

    private _firstName: string;
    private _middleInitial: string;
    private _lastName: string;

    constructor( firstName: string, middleInitial: string, lastName: string ){
        this._firstName = firstName;
        this._middleInitial = middleInitial;
        this._lastName = lastName;

        this.fullName = `${ firstName }${ middleInitial }${ lastName }`;
    }

}

interface Person{
    fullName: string;
}

function Greeter( person: Person ){
    console.dir( person );

    return `你好，${ person.fullName }！！！欢迎使用TypeScript！！！`;
}

let user = new TSDemo1( '林', '沐', '风' );

console.dir( Greeter( user ) );
