<!--
Author：林鹏
Email：2726893248@qq.com
CreateDate：20190101 00:00:00 AM

...每位新修改者自己的信息

PS：
一、
每位修改者请附上自己的信息，如：
ModifyAuthor：林沐风
Email：xxxxxxxxxx@qq.com
ModifyDate：20190101 00:00:00 AM
-->
<style lang = 'scss'
       scoped
       src = '../../styles/xmQAQ/ImgShowTool.scss' />
<template>
    <div class = 'css-reset ofh root imgShowToolBox'>
        <button class = 'css-reset returnToBtnBoxA cP'
                @doubleTap = 'returnTo' />
        <button class = 'css-reset refreshBtnBoxA cP'
                @doubleTap = 'refresh' />
        <img class = 'css-reset'
             :src = 'src'
             :alt = 'alt'
             :index = 'index'
             :preload-img-count = 'preloadImgCount'
             :is-first = 'isFirst'
             :state = 'state'
             @load = 'imgLoad' />
        <button class = 'css-reset prevBtn cP'
                :class = '{
                touchAN: isTouchAN,
                }'
                :title = 'prevBtnTitle'
                @tap = 'prevImg'
                @swipeRight = 'prevImg'
                @swipeLeft = 'nextImg'
                @swipeUp = 'nextImg'
                @swipeDown = 'prevImg' />
        <button class = 'css-reset nextBtn cP'
                :class = '{
                touchAN: isTouchAN,
                }'
                :title = 'nextBtnTitle'
                @tap = 'nextImg'
                @swipeRight = 'prevImg'
                @swipeLeft = 'nextImg'
                @swipeUp = 'nextImg'
                @swipeDown = 'prevImg' />
    </div>
</template>
<script type = 'module'>
    'use strict';

    export ImgShowTool, { default } from 'vueMDir/xmQAQ/ImgShowTool.esm.js';
</script>
