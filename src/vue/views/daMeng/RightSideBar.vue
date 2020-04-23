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
       src = '../../styles/daMeng/RightSideBar.scss' />
<template>
    <div class = 'css-reset ofh root'>
        <section class = 'css-reset flexBox flexSBC ofh noticeBarBox'>
            <span class = 'css-reset notice'
                  :title = 'titleText1'
                  @click = 'noticeClick'>
                <i class = 'css-reset'
                   :class = '{ isNotice: isNotice }'></i>
            </span>
            <span class = 'css-reset headPortrait'
                  :title = 'titleText1'
                  @click = 'headPortraitClick'>
                {{ userName }}
            </span>
        </section>
        <section class = 'css-reset flexBox flexC ofh dataIndexGraphBox'>
            <div class = 'css-reset'
                 id = 'DataIndexGraph'></div>
        </section>
        <section class = 'css-reset ofh financialIndexBox'>
            <div class = 'css-reset flexBox flexSBStr'>
                <span class = 'css-reset'>{{ financialIndexText1 }}</span>
                <span class = 'css-reset'
                      :title = 'titleText1'
                      @click = 'financialIndexClick'>{{ financialIndexText2 }}
                </span>
            </div>
            <div class = 'css-reset ofh'>
                <p class = 'css-reset flexBox flexSC'
                   v-for = '( { name, indexNum, isRise, unit } ) of financialIndexData'
                   :key = 'name'>
                    <span class = 'css-reset'></span>
                    <span class = 'css-reset'>{{ name }}</span>
                    <span class = 'css-reset flexBox flexC'
                          :class = '[ isRise ? "green" : "red" ]'>{{ ( isRise ? '+' : '-' ) + unit + indexNum }}
                    </span>
                </p>
            </div>
        </section>
        <section class = 'css-reset flexBox flexC ofh moneyButtonBox'>
            <button type = 'button'
                    class = 'css-reset flexBox flexSC ofh moneyBtn'
                    :title = 'titleText1'
                    @click = 'moneyBtnClick'>{{ moneyBtnText }}
            </button>
        </section>
        <section class = 'css-reset flexBox flexEC ofh messageButtonBox'>
            <button type = 'button'
                    class = 'css-reset messageBtn'
                    :title = 'titleText1'
                    @click = 'messageBtnClick'></button>
        </section>
    </div>
</template>
<script type = 'module'>
    'use strict';

    export RightSideBar, { default } from 'vueMDir/daMeng/RightSideBar.esm.js';
</script>
