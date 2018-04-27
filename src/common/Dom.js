/**
 * Created by Eric on 2018/1/20.
 */
import React from 'react';

/*
 * 获取元素的样式属性
 * @params:{
 *     node:dom元素
 *     property:属性值（不传则输出全部样式属性）
 * }
 */
const getStyle = (node, property) => {
    //判断node和property的类型
    if (node.nodeName === undefined) {
        return console.error('ERROR: ',property,' must be typeof string');
    }

    //存在属性则返回该属性值
    if (property) {
        const iNumStr = window.getComputedStyle(node)[property],
            iNum = iNumStr !== undefined ? iNumStr.replace('px', '') - 0 : undefined;
        return iNum;
    }

    return window.getComputedStyle(node);
};

/*
 * 获取dom元素距离浏览器的边距
 */
const offset = (node) => {
    let iLeft = 0,
        iTop = 0;

    while (node.offsetParent) {
        iLeft += node.offsetLeft;
        iTop += node.offsetTop;
        node = node.offsetParent;
    }
    return {left: iLeft, top: iTop}
};

/*
 *  向上返回匹配指定选择器的第一个父元素（可以匹配className、类型）
 */
const closest = (node, target) => {
    let targetNode = null,
        classNameAttr = [],
        nodeName = '',
        ifEnd = false;

    while (!ifEnd && classNameAttr.indexOf(target) === -1 && nodeName !== target) {
        node = node.parentNode;
        classNameAttr = node.className ? node.className.split(' ') : [];
        nodeName = node.nodeName;
        ifEnd = node.nodeName === 'HTML' ? true : false;
    }

    targetNode = node.nodeName === 'HTML' ? null : node;

    return targetNode;
};

export {getStyle, offset, closest}