// ==UserScript==
// @name         Better Google
// @namespace    google
// @version      0.1.10
// @description  Don't be evil
// @author       aligo
// @license      MIT
// @supportURL   https://github.com/aligo/better-google
// @match        https://*.google.com/search?*
// @include     /^https?://(?:www|encrypted|ipv[46])\.google\.[^/]+/(?:$|[#?]|search|webhp)/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var betterGoogleRow = (el) => {
        var tbwUpd = el.querySelectorAll('.TbwUpd');
        if (tbwUpd.length > 0) {
            var linkEl = el.querySelector('.r > a');
            var addEl = linkEl.nextSibling;

            var betterAddEl = document.createElement('div');
            betterAddEl.className = 'btrAdd';

            if (addEl) {
                for (var _el of addEl.children) {
                    if (_el.className.indexOf('TbwUpd') == -1) {
                        betterAddEl.appendChild(_el);
                    }
                }
            }

            var betterEl = document.createElement('div');
            betterEl.className = 'btrG';
            betterEl.appendChild(betterAddEl);

            el.querySelector('.r').appendChild(betterEl);

            var urlEl = document.createElement('a');
            urlEl.href = linkEl.href;
            urlEl.target = '_blank';
            urlEl.className = 'btrLink';

            var urlCiteEl = document.createElement('cite');
            urlCiteEl.innerText = linkEl.href;
            urlCiteEl.className = 'iUh30 bc';
            urlEl.appendChild(urlCiteEl);


            var maxWidth = el.clientWidth - betterAddEl.offsetWidth - 10;

            betterEl.insertBefore(urlEl, betterAddEl);
            if (urlEl.offsetWidth > maxWidth) {
                urlEl.style.width = maxWidth.toString() + 'px';
            }


            tbwUpd.forEach(el => el.remove());
            linkEl.querySelector('h3').previousSibling.remove();
        }
    }

    var prevResultCount = 0;

    var runBetterGoogle = () => {
        if (prevResultCount != document.querySelectorAll('.g .rc').length) {
            document.querySelectorAll('.g .rc').forEach(betterGoogleRow);
            prevResultCount = document.querySelectorAll('.g .rc').length;
        }
    };

    var prepareStyleSheet = () => {
        var style = document.createElement('style');
        style.setAttribute('media', 'screen');
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        style.sheet.insertRule('.btrG { word-break: break-all; line-height: 18px; }');
        style.sheet.insertRule('.btrG .btrAdd { display: inline-block; vertical-align: top; }');
        style.sheet.insertRule('.btrG .btrLink { display: inline-block; vertical-align: top; line-height: 18px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-decoration: none !important; }');
        style.sheet.insertRule('.btrG .btrLink cite.iUh30 { color: #006621; font-size: 16px; }');
    };

    prepareStyleSheet();
    runBetterGoogle();

    var searchEl = document.getElementById('search');
    var observer = new MutationObserver(runBetterGoogle);
    observer.observe(searchEl, {childList: true, subtree: true});
})();