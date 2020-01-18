// ==UserScript==
// @name         Better Google
// @namespace    google
// @version      0.1.20
// @description  Don't be evil
// @author       aligo, adambh
// @match        https://*.google.com/search?*
// @include     /^https?://(?:www|encrypted|ipv[46])\.google\.[^/]+/(?:$|[#?]|search|webhp)/
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';
    function checkElement(selector){const element=document.querySelector(selector);if(element===null){return new Promise(resolve=>requestAnimationFrame(resolve)).then(()=>checkElement(selector))}else{return Promise.resolve(element)}}
    const betterGoogleRow = (el) => {
        const tbwUpd = el.querySelectorAll('.TbwUpd');
        if (tbwUpd.length > 0) {
            const linkEl = el.querySelector('.r > a');
            const addEl = linkEl.nextSibling;
            const betterAddEl = document.createElement('div');
            betterAddEl.className = 'btrAdd';
            if (addEl) {
                for (const _el of addEl.children) {
                    if (_el.className.indexOf('TbwUpd') == -1) {
                        betterAddEl.appendChild(_el);
                    }
                }
            }
            const betterEl = document.createElement('div');
            betterEl.className = 'btrG';
            betterEl.appendChild(betterAddEl);
            el.querySelector('.r').appendChild(betterEl);
            const urlEl = document.createElement('a');
            urlEl.href = linkEl.href;
            urlEl.target = '_blank';
            urlEl.className = 'btrLink';
            const urlCiteEl = document.createElement('cite');
            urlCiteEl.innerText = linkEl.href;
            urlCiteEl.className = 'iUh30 bc';
            urlEl.appendChild(urlCiteEl);
            const maxWidth = el.clientWidth - betterAddEl.offsetWidth - 10;
            betterEl.insertBefore(urlEl, betterAddEl);
            if (urlEl.offsetWidth > maxWidth) {
                urlEl.style.width = maxWidth.toString() + 'px';
            }
            tbwUpd.forEach(el => el.remove());
            linkEl.querySelector('h3').previousSibling.remove();
        }
    }
    let prevResultCount = 0;
    const runBetterGoogle = () => {
        if (prevResultCount != document.querySelectorAll('.g .rc').length) {
            document.querySelectorAll('.g .rc').forEach(betterGoogleRow);
            prevResultCount = document.querySelectorAll('.g .rc').length;
        }
    };
    const injectStyle = () => {
        const style = document.createElement('style');
        style.setAttribute('media', 'screen');
        document.head.appendChild(style);
        style.sheet.insertRule('.btrG { word-break: break-all; line-height: 18px; } ');
        style.sheet.insertRule('.btrG .btrAdd { display: inline-block; vertical-align: top; }');
        style.sheet.insertRule('.btrG .btrLink { display: inline-block; vertical-align: top; line-height: 18px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-decoration: none !important; }');
        style.sheet.insertRule('.btrG .btrLink cite.iUh30 { color: #006621; font-size: 16px; }');
    };
    checkElement('head').then((element) => injectStyle());
    checkElement('#search').then((element) => runBetterGoogle());
})();
