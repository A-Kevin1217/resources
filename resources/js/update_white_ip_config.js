// ==UserScript==
// @name         QQ开放平台机器人关闭IP白名单
// @namespace    https://kevcore.cn
// @version      4.0
// @description  提交IP白名单时，自动把IP白名单关掉，无需删改IP列表
// @match        https://q.qq.com/*
// @match        https://bot.q.qq.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const TARGET = '/cgi-bin/dev_info/update_white_ip_config';

    function patchBody(obj) {
        if (obj.ip_white_infos) {
            for (const key of Object.keys(obj.ip_white_infos)) {
                obj.ip_white_infos[key].use = false;
                obj.ip_white_infos[key].ip_list = [];
            }
        }
    }

    // XHR
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        this._isTarget = method === 'POST' && typeof url === 'string' && url.includes(TARGET);
        return origOpen.call(this, method, url, ...args);
    };

    XMLHttpRequest.prototype.send = function(body) {
        if (this._isTarget && body) {
            try {
                const data = JSON.parse(body);
                patchBody(data);
                body = JSON.stringify(data);
                console.log('[QQ Bot] POST已篡改', body);
            } catch(e) {}
        }
        return origSend.call(this, body);
    };

    // fetch
    const origFetch = window.fetch;
    window.fetch = async function(input, init) {
        const url = typeof input === 'string' ? input : input?.url;
        if (url && url.includes(TARGET) && init?.body) {
            try {
                const data = JSON.parse(init.body);
                patchBody(data);
                init.body = JSON.stringify(data);
                console.log('[QQ Bot] POST已篡改', init.body);
            } catch(e) {}
        }
        return origFetch.call(this, input, init);
    };

    console.log('[QQ Bot] v4.0 已加载');
})();