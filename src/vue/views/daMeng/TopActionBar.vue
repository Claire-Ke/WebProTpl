<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
-->
<!--
关于样式的loader处理：
1、
.css、.scss在.js中导入使用，或者是.vue中的<style lang = 'css' scoped></style>、<style lang = 'scss' scoped></style>的使用方式！
但是无法在.ejs中以link标签引入！也无法require导入！
最后会被提取到一个.css文件中，最后把这个.css文件以link标签引入到页面中！

2、
.less只能在.ejs中以link标签引入！
在.js中导入，会导出编译后的.less文件的路径(如：'../styles/Demo1_LESS.css')！

3、
.sass在.js中导入使用，或者是.vue中的<style lang = 'sass' scoped></style>的使用方式！
但是无法在.ejs中以link标签引入！也无法require导入！
最后会被提取到一个<style>标签中，并且把这个<style>标签加到页面中！
-->
<style lang = 'scss'
       scoped
       src = '../../styles/daMeng/TopActionBar.scss' />
<template>
    <div class = 'css-reset flexBox flexSBStr ofh root'>
        <section class = 'css-reset flexBox flexSBStr'>
            <span class = 'css-reset flexBox flexC'
                  :title = 'titleText1'
                  v-for = '( { id, name, isSelect } ) of titleData'
                  :class = '{ isSelect: isSelect }'
                  :data-id = 'id'
                  :key = 'id'
                  @click = 'titleTextClick'>{{ name }}
            </span>
        </section>
        <section class = 'css-reset flexBox flexC'>
            <label class = 'css-reset flexBox flexSBC'>
                <input type = 'search'
                       placeholder = 'search...'
                       class = 'css-reset'
                       @keyup.enter = 'searchBtnClick' />
                <button type = 'button'
                        class = 'css-reset searchBtn'
                        :title = 'titleText1'
                        @click = 'searchBtnClick'></button>
            </label>
        </section>
    </div>
</template>
<script type = 'module'>
    'use strict';

    export TopActionBar, { default } from 'vueMDir/daMeng/TopActionBar.esm.js';
</script>
