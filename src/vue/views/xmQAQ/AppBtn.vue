<!--
Project: WebProTpl
Author：12278
Email：2726893248@qq.com
CreateDate：2019-01-01 00:00:00
IDE: WebStorm
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

    export {
        default,
        default as AppBtn,
    } from 'vueMDir/xmQAQ/AppBtn.esm.js';
</script>
