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

import 'cssBDir/Colors.css';
import 'compDir/Components.css';

import { FileBtn, } from 'CompESM';

let CT = new CTESM.CT();

{
    if( false ){
        let formData = new FormData();
        formData.append( 'id', '2020010101' );
        formData.append( 'date', '2020年01月01日 18时00分00秒 周六' );
        formData.append( 'title', '这是一张“.HEIC”格式的图片' );

        FileBtn.call( CT, {
            id: '#HEICImg',
            accept: 'image/heic, image/heif',
            multiple: true,
            onChange: {
                event( event, filesArr ){
                    if( filesArr.length > 0 ){
                        Array.from( filesArr )
                             .forEach( ( c, i, a ) => void ( formData.append( 'img', c, c.name ) ) );

                        CT.fetch( 'http://localhost:9999/SimServer/POST', {
                            success( data4ResponseType, response ){
                                console.dir( data4ResponseType );
                            },
                        }, {
                            method: 'POST',
                            responseType: 'json',
                            mode: 'cors',
                            credentials: 'omit',
                            body: formData,
                        } );
                    }
                },
            },
        } );
    }
}

// GETFile?type=img
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=img', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                let imgBlob = new Blob( [ data4ResponseType ], {
                    type: 'image/vnd.microsoft.icon',
                } );

                CT.fileOrBlobToDataURL( imgBlob, ( dataURL, event, fileReader ) => {
                    let img = CT.dataURLToImg( dataURL );
                    img.style = 'width: 100%; height: auto;';

                    CT.iInsertB( 'html.helloWorld #HelloWorld article', img );
                } );
            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=zip
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=zip', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                let imgBlob = new Blob( [ data4ResponseType ], {
                    type: 'application/x-7z-compressed',
                } );

                {
                    let imgBlobURL = window.URL.createObjectURL( imgBlob ),
                        eleLink = document.createElement( 'a' );
                    eleLink.download = '1.7z';
                    eleLink.style.display = 'none';
                    eleLink.href = imgBlobURL;
                    document.body.appendChild( eleLink );
                    eleLink.click();
                    document.body.removeChild( eleLink );
                    window.URL.revokeObjectURL( imgBlobURL );
                }

            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=apps
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=apps', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                let imgBlob = new Blob( [ data4ResponseType ], {
                    type: 'application/octet-stream',
                } );

                {
                    let imgBlobURL = window.URL.createObjectURL( imgBlob ),
                        eleLink = document.createElement( 'a' );
                    eleLink.download = '1.exe';
                    eleLink.style.display = 'none';
                    eleLink.href = imgBlobURL;
                    document.body.appendChild( eleLink );
                    eleLink.click();
                    document.body.removeChild( eleLink );
                    window.URL.revokeObjectURL( imgBlobURL );
                }

            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=xlsx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=xlsx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                let imgBlob = new Blob( [ data4ResponseType ], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                } );

                {
                    let imgBlobURL = window.URL.createObjectURL( imgBlob ),
                        eleLink = document.createElement( 'a' );
                    eleLink.download = '1.xlsx';
                    eleLink.style.display = 'none';
                    eleLink.href = imgBlobURL;
                    document.body.appendChild( eleLink );
                    eleLink.click();
                    document.body.removeChild( eleLink );
                    window.URL.revokeObjectURL( imgBlobURL );
                }

            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}

// GETFile?type=docx
{
    if( false ){
        CT.fetch( 'http://192.168.1.2:9999/SimServer/GETFile?type=docx', {
            success( data4ResponseType, response ){
                console.dir( data4ResponseType );

                let imgBlob = new Blob( [ data4ResponseType ], {
                    type: 'application/msword',
                } );

                {
                    let imgBlobURL = window.URL.createObjectURL( imgBlob ),
                        eleLink = document.createElement( 'a' );
                    eleLink.download = '1.doc';
                    eleLink.style.display = 'none';
                    eleLink.href = imgBlobURL;
                    document.body.appendChild( eleLink );
                    eleLink.click();
                    document.body.removeChild( eleLink );
                    window.URL.revokeObjectURL( imgBlobURL );
                }

            },
        }, {
            // 'arrayBuffer'、'blob'、'formData'、'json'、'text'
            responseType: 'arrayBuffer',
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
        } );
    }
}
