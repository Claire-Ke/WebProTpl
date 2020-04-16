/**
 * Project: WebProTpl
 * Author：12278
 * Email：2726893248@qq.com
 * CreateDate：2019-01-01 00:00:00
 * IDE: WebStorm
 */

'use strict';

let WebComponents = WebCESM.WebC;

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'popup-info',
                extends: null,
            },
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    const wrapper = document.createElement( 'span' );
                    wrapper.setAttribute( 'class', 'wrapper' );

                    const icon = document.createElement( 'span' );
                    icon.setAttribute( 'class', 'icon' );
                    icon.setAttribute( 'tabindex', 0 );

                    const info = document.createElement( 'span' );
                    info.setAttribute( 'class', 'info' );

                    const text = cusHTMLClassIns.getAttribute( 'data-text' );
                    info.textContent = text;

                    let imgUrl;
                    if( cusHTMLClassIns.hasAttribute( 'data-img' ) ){
                        imgUrl = cusHTMLClassIns.getAttribute( 'data-img' );
                    }
                    else{
                        imgUrl = 'img/default.png';
                    }

                    const img = document.createElement( 'img' );
                    img.src = imgUrl;
                    icon.appendChild( img );

                    const style = document.createElement( 'style' );

                    style.textContent = `
      .wrapper {
        position: relative;
      }
      .info {
        font-size: 0.8rem;
        width: 200px;
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        background: red;
        border-radius: 10px;
        opacity: 0;
        transition: 0.6s all;
        position: absolute;
        bottom: 20px;
        left: 10px;
        z-index: 3;
      }
      img {
        width: 1.2rem;
      }
      .icon:hover + .info, .icon:focus + .info {
        opacity: 1;
      }
    `;

                    shadowRoot.appendChild( style );
                    shadowRoot.appendChild( wrapper );

                    wrapper.appendChild( icon );
                    wrapper.appendChild( info );
                },
                connectedCallback: () => {
                },
                disconnectedCallback: () => {
                },
                adoptedCallback: () => {
                },
                attributeChangedCallback: () => {
                },
            },
            extends: HTMLElement,
            isInit: true,
            obsAttrs: [],
        } );
    }
}

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'expanding-list',
                extends: 'ul',
            },
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    function ShowUL( event ){
                        const nextul = event.target.nextElementSibling;

                        if( nextul.style.display == 'block' ){
                            nextul.style.display = 'none';
                            nextul.parentNode.setAttribute( 'class', 'closed' );
                        }
                        else{
                            nextul.style.display = 'block';
                            nextul.parentNode.setAttribute( 'class', 'open' );
                        }
                    }

                    const uls = Array.from( cusHTMLClassIns.querySelectorAll( 'ul' ) ),
                        lis = Array.from( cusHTMLClassIns.querySelectorAll( 'li' ) );

                    uls.forEach( ul => void ( ul.style.display = 'none' ) );

                    lis.forEach( li => {
                        if( li.querySelectorAll( 'ul' ).length > 0 ){
                            li.setAttribute( 'class', 'closed' );

                            const childText = li.childNodes[ 0 ];
                            const newSpan = document.createElement( 'span' );

                            newSpan.textContent = childText.textContent;
                            newSpan.style.cursor = 'pointer';

                            newSpan.onclick = ShowUL;

                            childText.parentNode.insertBefore( newSpan, childText );
                            childText.parentNode.removeChild( childText );
                        }
                    } );
                },
                connectedCallback: () => {
                },
                disconnectedCallback: () => {
                },
                adoptedCallback: () => {
                },
                attributeChangedCallback: () => {
                },
            },
            extends: 'auto',
            isInit: true,
            obsAttrs: [],
        } );
    }
}

{
    if( true ){
        new WebComponents( {
            attach: {
                delegatesFocus: null,
                mode: 'open',
            },
            define: {
                name: 'custom-square',
                extends: null,
            },
            events: {
                init: ( cusHTMLClassIns, shadowRoot ) => {
                    const div = document.createElement( 'div' ),
                        style = document.createElement( 'style' );

                    shadowRoot.appendChild( style );
                    shadowRoot.appendChild( div );
                },
                connectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素已经添加到文档中了！' );

                    shadowRoot.querySelector( 'style' ).textContent = `
    div {
      width: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      height: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      background-color: ${ cusHTMLClassIns.getAttribute( 'c' ) };
    }
  `;
                },
                disconnectedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素从文档中移除了！' );
                },
                adoptedCallback: ( cusHTMLClassIns, shadowRoot ) => {
                    console.log( '自定义元素移动到新的文档中了！' );
                },
                attributeChangedCallback: ( cusHTMLClassIns, shadowRoot, arr ) => {
                    console.log( '自定义元素的属性发生了变化！' );
                    console.dir( arr );

                    shadowRoot.querySelector( 'style' ).textContent = `
    div {
      width: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      height: ${ cusHTMLClassIns.getAttribute( 'l' ) }px;
      background-color: ${ cusHTMLClassIns.getAttribute( 'c' ) };
    }
  `;
                },
            },
            extends: HTMLElement,
            isInit: true,
            obsAttrs: [
                'c',
                'l',
            ],
        } );

        const add = document.querySelector( '.add' ),
            update = document.querySelector( '.update' ),
            remove = document.querySelector( '.remove' );

        let square;

        update.disabled = true;
        remove.disabled = true;

        function random( min, max ){
            return Math.floor( Math.random() * ( max - min + 1 ) + min );
        }

        add.onclick = () => {
            square = document.createElement( 'custom-square' );
            document.querySelector( 'article' )
                    .appendChild( square );
            square.setAttribute( 'l', '100' );
            square.setAttribute( 'c', 'red' );

            update.disabled = false;
            remove.disabled = false;
            add.disabled = true;
        };

        update.onclick = () => {
            square.setAttribute( 'l', random( 50, 200 ) );
            square.setAttribute( 'c', `rgb(${ random( 0, 255 ) }, ${ random( 0, 255 ) }, ${ random( 0, 255 ) })` );
        };

        remove.onclick = () => {
            document.querySelector( 'article' )
                    .removeChild( square );

            update.disabled = true;
            remove.disabled = true;
            add.disabled = false;
        };
    }
}
