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
       src = '../../styles/xmQAQ/AppBtn.scss' />
<template>
    <button class = 'css-reset root appBtn flexBox flexSBC flexDC ofh cP'
            @tap = 'activity'>
        <img class = 'css-reset'
             :src = 'src'
             :alt = 'alt' />
        <span class = 'css-reset sLTextE'>{{ appName }}</span>
    </button>
</template>
<script type = 'module'>
    'use strict';

    export AppBtn, { default } from 'vueMDir/xmQAQ/AppBtn.esm.js';
</script>
