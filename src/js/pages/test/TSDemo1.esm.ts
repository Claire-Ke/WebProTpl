/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2020-04-27 23:23:27
 * IDE: WebStorm
 */

'use strict';

class PersonInfo{

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

    get age(): number | undefined{
        return this._age;
    }

    set age( value: number | undefined ){
        this._age = value;
    }

    get sex(): string{
        return this._sex;
    }

    set sex( value: string ){
        this._sex = value;
    }

    fullName: string = '';

    private _firstName: string = '';
    private _middleInitial: string = '';
    private _lastName: string = '';
    private _age: number | undefined = 0;
    private _sex: string = '';

    constructor( firstName: string, middleInitial: string, lastName: string, age: number, sex: string ){
        this._firstName = firstName;
        this._middleInitial = middleInitial;
        this._lastName = lastName;
        this._age = age;
        this._sex = sex;

        this.fullName = `${ firstName }${ middleInitial }${ lastName }`;
    }

}

interface Person{
    fullName: string;
}

function GetUserInfo( person: Person ){
    console.dir( person );

    return `${ person.fullName }，你好！欢迎使用TypeScript！！！`;
}

let userInfo = new PersonInfo( '林', '沐', '风', 26, '男' );

console.log( GetUserInfo( userInfo ) );
