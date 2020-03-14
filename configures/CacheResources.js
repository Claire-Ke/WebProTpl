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

// 配置缓存资源的路径，支持外部第三方的资源URL

/**
 * 路径都是编译完后输出到输出目录中，相对于“pages”文件夹(如：dist/test/pages)的相对路径
 * 如：https://www.7788.com/img/img1.png、../static/ico/compressed/ico_192_192.png
 *
 * @type {string[]} 字符串数组
 */
let cacheResources = [
    '../others/ProjectAssets.json',
    '../pages/HelloWorld.html',
    '../pages/XMQAQ.html',
    '../static/ico/compressed/ico_192_192.png',
    '../static/ico/compressed/ico_512_512.png',
];

module.exports = {
    cacheResources,
};
