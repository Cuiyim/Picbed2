/**
 * LightSNS
 */
window.Jinsom = function () {
        "use strict";

        function e(e, a) {
            var t = [],
                r = 0;
            if (e && !a && e instanceof C) return e;
            if (e)
                if ("string" == typeof e) {
                    var n, i, s = e.trim();
                    if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                        var o = "div";
                        for (0 === s.indexOf("<li") && (o = "ul"), 0 === s.indexOf("<tr") && (o = "tbody"), 0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (o = "tr"), 0 === s.indexOf("<tbody") && (o = "table"), 0 === s.indexOf("<option") && (o = "select"), i = document.createElement(o), i.innerHTML = s, r = 0; r < i.childNodes.length; r += 1) t.push(i.childNodes[r])
                    } else
                        for (n = a || "#" !== e[0] || e.match(/[ .<>:~]/) ? (a || document).querySelectorAll(e.trim()) : [document.getElementById(e.trim().split("#")[1])], r = 0; r < n.length; r += 1) n[r] && t.push(n[r])
                } else if (e.nodeType || e === window || e === document) t.push(e);
            else if (e.length > 0 && e[0].nodeType)
                for (r = 0; r < e.length; r += 1) t.push(e[r]);
            return new C(t)
        }

        function a(e) {
            var a, t, r, n, i = {},
                s = e || window.location.href;
            if ("string" == typeof s && s.length)
                for (s = s.indexOf("?") > -1 ? s.replace(/\S*\?/, "") : "", t = s.split("&").filter(function (e) {
                    return "" !== e
                }), n = t.length, a = 0; a < n; a += 1) r = t[a].replace(/#\S+/g, "").split("="), i[decodeURIComponent(r[0])] = void 0 === r[1] ? void 0 : decodeURIComponent(r[1]) || "";
            return i
        }

        function t(e) {
            return Array.isArray(e)
        }

        function r(e, a) {
            if ("object" == typeof e && a)
                if (Array.isArray(e) || e instanceof C) {
                    for (var t = 0; t < e.length; t += 1)
                        if (!1 === a(t, e[t])) return
                } else
                    for (var r in e)
                        if (e.hasOwnProperty(r) && !1 === a(r, e[r])) return
        }

        function n(e) {
            for (var a = [], t = 0; t < e.length; t += 1) - 1 === a.indexOf(e[t]) && a.push(e[t]);
            return a
        }

        function i(e, a) {
            function t(e) {
                if (a.length > 0) {
                    for (var t = "", r = 0; r < a.length; r += 1) t += 0 === r ? a[r] : "[" + encodeURIComponent(a[r]) + "]";
                    return t + "[" + encodeURIComponent(e) + "]"
                }
                return encodeURIComponent(e)
            }

            function r(e) {
                return encodeURIComponent(e)
            }
            if (void 0 === a && (a = []), "string" == typeof e) return e;
            var n, s = [];
            return Object.keys(e).forEach(function (o) {
                var l;
                if (Array.isArray(e[o])) {
                    l = [];
                    for (var p = 0; p < e[o].length; p += 1) Array.isArray(e[o][p]) || "object" != typeof e[o][p] ? l.push(t(o) + "[]=" + r(e[o][p])) : (n = a.slice(), n.push(o), n.push(String(p)), l.push(i(e[o][p], n)));
                    l.length > 0 && s.push(l.join("&"))
                } else null === e[o] || "" === e[o] ? s.push(t(o) + "=") : "object" == typeof e[o] ? (n = a.slice(), n.push(o), "" !== (l = i(e[o], n)) && s.push(l)) : void 0 !== e[o] && "" !== e[o] ? s.push(t(o) + "=" + r(e[o])) : "" === e[o] && s.push(t(o))
            }), s.join("&")
        }

        function s(e) {
            return e.toLowerCase().replace(/-(.)/g, function (e, a) {
                return a.toUpperCase()
            })
        }

        function o(a) {
            return e(a).dataset()
        }

        function l(e) {
            return window.requestAnimationFrame ? window.requestAnimationFrame(e) : window.webkitRequestAnimationFrame ? window.webkitRequestAnimationFrame(e) : window.setTimeout(e, 1e3 / 60)
        }

        function p(e) {
            return window.cancelAnimationFrame ? window.cancelAnimationFrame(e) : window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(e) : window.clearTimeout(e)
        }

        function d(e) {
            return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
        }

        function c() {
            for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
            for (var t = Object(e[0]), r = 1; r < e.length; r += 1) {
                var n = e[r];
                if (void 0 !== n && null !== n)
                    for (var i = Object.keys(Object(n)), s = 0, o = i.length; s < o; s += 1) {
                        var l = i[s],
                            p = Object.getOwnPropertyDescriptor(n, l);
                        void 0 !== p && p.enumerable && (d(t[l]) && d(n[l]) ? c(t[l], n[l]) : !d(t[l]) && d(n[l]) ? (t[l] = {}, c(t[l], n[l])) : t[l] = n[l])
                    }
            }
            return t
        }

        function m(a, t) {
            var r = this,
                n = {
                    props: e.extend({}, a),
                    params: e.extend({
                        duration: 300,
                        easing: "swing"
                    }, t),
                    elements: r,
                    animating: !1,
                    que: [],
                    easingProgress: function (e, a) {
                        return "swing" === e ? .5 - Math.cos(a * Math.PI) / 2 : "function" == typeof e ? e(a) : a
                    }, stop: function () {
                        n.frameId && p(n.frameId), n.animating = !1, n.elements.each(function (e, a) {
                            delete a.dom7AnimateInstance
                        }), n.que = []
                    }, done: function (e) {
                        if (n.animating = !1, n.elements.each(function (e, a) {
                            delete a.dom7AnimateInstance
                        }), e && e(r), n.que.length > 0) {
                            var a = n.que.shift();
                            n.animate(a[0], a[1])
                        }
                    }, animate: function (e, a) {
                        function t() {
                            s = (new Date).getTime();
                            var u, h;
                            m || (m = !0, a.begin && a.begin(r)), null === p && (p = s), a.progress && a.progress(r, Math.max(Math.min((s - p) / a.duration, 1), 0), p + a.duration - s < 0 ? 0 : p + a.duration - s, p), i.forEach(function (t) {
                                var r = t;
                                o || r.done || Object.keys(e).forEach(function (t) {
                                    if (!o && !r.done) {
                                        u = Math.max(Math.min((s - p) / a.duration, 1), 0), h = n.easingProgress(a.easing, u);
                                        var l = r[t],
                                            m = l.initialValue,
                                            f = l.finalValue,
                                            g = l.unit;
                                        r[t].currentValue = m + h * (f - m);
                                        var v = r[t].currentValue;
                                        if ((f > m && v >= f || f < m && v <= f) && (r.container.style[t] = f + g, c += 1, c === Object.keys(e).length && (r.done = !0, d += 1), d === i.length && (o = !0)), o) return void n.done(a.complete);
                                        r.container.style[t] = v + g
                                    }
                                })
                            }), o || (n.frameId = l(t))
                        }
                        if (n.animating) return n.que.push([e, a]), n;
                        var i = [];
                        n.elements.each(function (a, t) {
                            var r, s, o, l, p;
                            t.dom7AnimateInstance || (n.elements[a].dom7AnimateInstance = n), i[a] = {
                                container: t
                            }, Object.keys(e).forEach(function (n) {
                                r = window.getComputedStyle(t, null).getPropertyValue(n).replace(",", "."), s = parseFloat(r), o = r.replace(s, ""), l = parseFloat(e[n]), p = e[n] + o, i[a][n] = {
                                    initialFullValue: r,
                                    initialValue: s,
                                    unit: o,
                                    finalValue: l,
                                    finalFullValue: p,
                                    currentValue: s
                                }
                            })
                        });
                        var s, o, p = null,
                            d = 0,
                            c = 0,
                            m = !1;
                        return n.animating = !0, n.frameId = l(t), n
                    }
                };
            if (0 === n.elements.length) return r;
            for (var i, s = 0; s < n.elements.length; s += 1) n.elements[s].dom7AnimateInstance ? i = n.elements[s].dom7AnimateInstance : n.elements[s].dom7AnimateInstance = n;
            return i || (i = n), "stop" === a ? i.stop() : i.animate(n.props, n.params), r
        }

        function u() {
            for (var e = this, a = 0; a < e.length; a += 1) e[a].dom7AnimateInstance && e[a].dom7AnimateInstance.stop()
        }

        function h(e) {
            e.type && !e.method && (e.method = e.type), r(e, function (e, a) {
                z[e] = a
            })
        }

        function f(a) {
            function t(t, r, n) {
                var i = arguments;
                t && e(document).trigger(t, r), n && (n in o && o[n](i[3], i[4], i[5], i[6]), a[n] && a[n](i[3], i[4], i[5], i[6]))
            }
            var n = {
                    method: "GET",
                    data: !1,
                    async: !0,
                    cache: !0,
                    user: "",
                    password: "",
                    headers: {},
                    xhrFields: {},
                    statusCode: {},
                    processData: !0,
                    dataType: "text",
                    contentType: "application/x-www-form-urlencoded",
                    timeout: 0
                },
                s = ["beforeSend", "error", "complete", "success", "statusCode"];
            a.type && (a.method = a.type);
            var o = z;
            r(o, function (e, a) {
                s.indexOf(e) < 0 && (n[e] = a)
            }), r(n, function (e, t) {
                e in a || (a[e] = t)
            }), a.url || (a.url = window.location.toString());
            var l = a.url.indexOf("?") >= 0 ? "&" : "?",
                p = a.method.toUpperCase();
            if (("GET" === p || "HEAD" === p || "OPTIONS" === p || "DELETE" === p) && a.data) {
                var d;
                d = "string" == typeof a.data ? a.data.indexOf("?") >= 0 ? a.data.split("?")[1] : a.data : i(a.data), d.length && (a.url += l + d, "?" === l && (l = "&"))
            }
            if ("json" === a.dataType && a.url.indexOf("callback=") >= 0) {
                var c, m = "f7jsonp_" + (Date.now() + (D += 1)),
                    u = a.url.split("callback="),
                    h = u[0] + "callback=" + m;
                if (u[1].indexOf("&") >= 0) {
                    var f = u[1].split("&").filter(function (e) {
                        return e.indexOf("=") > 0
                    }).join("&");
                    f.length > 0 && (h += "&" + f)
                }
                var g = document.createElement("script");
                return g.type = "text/javascript", g.onerror = function () {
                    clearTimeout(c), t(void 0, void 0, "error", null, "scripterror"), t("ajaxComplete ajax:complete", {
                        scripterror: !0
                    }, "complete", null, "scripterror")
                }, g.src = h, window[m] = function (e) {
                    clearTimeout(c), t(void 0, void 0, "success", e), g.parentNode.removeChild(g), g = null, delete window[m]
                }, document.querySelector("head").appendChild(g), void(a.timeout > 0 && (c = setTimeout(function () {
                    g.parentNode.removeChild(g), g = null, t(void 0, void 0, "error", null, "timeout")
                }, a.timeout)))
            }
            "GET" !== p && "HEAD" !== p && "OPTIONS" !== p && "DELETE" !== p || !1 === a.cache && (a.url += l + "_nocache" + Date.now());
            var v = new XMLHttpRequest;
            v.requestUrl = a.url, v.requestParameters = a, v.open(p, a.url, a.async, a.user, a.password);
            var b = null;
            if (("POST" === p || "PUT" === p || "PATCH" === p) && a.data)
                if (a.processData) {
                    var w = [ArrayBuffer, Blob, Document, FormData];
                    if (w.indexOf(a.data.constructor) >= 0) b = a.data;
                    else {
                        var C = "---------------------------" + Date.now().toString(16);
                        "multipart/form-data" === a.contentType ? v.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + C) : v.setRequestHeader("Content-Type", a.contentType), b = "";
                        var y = i(a.data);
                        if ("multipart/form-data" === a.contentType) {
                            y = y.split("&");
                            for (var x = [], T = 0; T < y.length; T += 1) x.push('Content-Disposition: form-data; name="' + y[T].split("=")[0] + '"\r\n\r\n' + y[T].split("=")[1] + "\r\n");
                            b = "--" + C + "\r\n" + x.join("--" + C + "\r\n") + "--" + C + "--\r\n"
                        } else b = y
                    }
                } else b = a.data;
            a.headers && r(a.headers, function (e, a) {
                v.setRequestHeader(e, a)
            }), void 0 === a.crossDomain && (a.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(a.url) && RegExp.$2 !== window.location.host), a.crossDomain || v.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.xhrFields && r(a.xhrFields, function (e, a) {
                v[e] = a
            });
            var k;
            return v.onload = function () {
                if (k && clearTimeout(k), v.status >= 200 && v.status < 300 || 0 === v.status) {
                    var e;
                    if ("json" === a.dataType) try {
                        e = JSON.parse(v.responseText), t("ajaxSuccess ajax:success", {
                            xhr: v
                        }, "success", e, v.status, v)
                    } catch (e) {
                        t("ajaxError ajax:error", {
                            xhr: v,
                            parseerror: !0
                        }, "error", v, "parseerror")
                    } else e = "text" === v.responseType || "" === v.responseType ? v.responseText : v.response, t("ajaxSuccess ajax:success", {
                        xhr: v
                    }, "success", e, v.status, v)
                } else t("ajaxError ajax:error", {
                    xhr: v
                }, "error", v, v.status);
                a.statusCode && (o.statusCode && o.statusCode[v.status] && o.statusCode[v.status](v), a.statusCode[v.status] && a.statusCode[v.status](v)), t("ajaxComplete ajax:complete", {
                    xhr: v
                }, "complete", v, v.status)
            }, v.onerror = function () {
                k && clearTimeout(k), t("ajaxError ajax:error", {
                    xhr: v
                }, "error", v, v.status), t("ajaxComplete ajax:complete", {
                    xhr: v,
                    error: !0
                }, "complete", v, "error")
            }, t("ajaxStart ajax:start", {
                xhr: v
            }, "start", v), t(void 0, void 0, "beforeSend", v), a.timeout > 0 && (v.onabort = function () {
                k && clearTimeout(k)
            }, k = setTimeout(function () {
                v.abort(), t("ajaxError ajax:error", {
                    xhr: v,
                    timeout: !0
                }, "error", v, "timeout"), t("ajaxComplete ajax:complete", {
                    xhr: v,
                    timeout: !0
                }, "complete", v, "timeout")
            }, a.timeout)), v.send(b), v
        }

        function g(e) {
            for (var a = [], t = arguments.length - 1; t-- > 0;) a[t] = arguments[t + 1];
            var r, n, i, s, o;
            if ("function" == typeof a[1]) {
                var l;
                l = a, r = l[0], i = l[1], s = l[2], o = l[3]
            } else {
                var p;
                p = a, r = p[0], n = p[1], i = p[2], s = p[3], o = p[4]
            }
            return [i, s].forEach(function (e) {
                "string" == typeof e && (o = e, e === i ? i = void 0 : s = void 0)
            }), o = o || ("getJSON" === e ? "json" : void 0), f({
                url: r,
                method: "post" === e ? "POST" : "GET",
                data: n,
                success: i,
                error: s,
                dataType: o
            })
        }

        function v() {
            for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
            return e.unshift("get"), g.apply(this, e)
        }

        function b() {
            for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
            return e.unshift("post"), g.apply(this, e)
        }

        function w() {
            for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
            return e.unshift("getJSON"), g.apply(this, e)
        }
        var C = function (e) {
            for (var a = this, t = 0; t < e.length; t += 1) a[t] = e[t];
            return a.length = e.length, this
        };
        e.fn = C.prototype, e.Class = C, e.use = function () {
            for (var a = [], t = arguments.length; t--;) a[t] = arguments[t];
            a.forEach(function (a) {
                var t = "__utils" in a;
                Object.keys(a).forEach(function (r) {
                    "__utils" !== r && (t ? e[r] = a[r] : e.fn[r] = a[r])
                })
            })
        };
        for (var y = [{
            base: "A",
            letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
        }, {
            base: "AA",
            letters: "Ꜳ"
        }, {
            base: "AE",
            letters: "ÆǼǢ"
        }, {
            base: "AO",
            letters: "Ꜵ"
        }, {
            base: "AU",
            letters: "Ꜷ"
        }, {
            base: "AV",
            letters: "ꜸꜺ"
        }, {
            base: "AY",
            letters: "Ꜽ"
        }, {
            base: "B",
            letters: "BⒷＢḂḄḆɃƂƁ"
        }, {
            base: "C",
            letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
        }, {
            base: "D",
            letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
        }, {
            base: "DZ",
            letters: "ǱǄ"
        }, {
            base: "Dz",
            letters: "ǲǅ"
        }, {
            base: "E",
            letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
        }, {
            base: "F",
            letters: "FⒻＦḞƑꝻ"
        }, {
            base: "G",
            letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
        }, {
            base: "H",
            letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
        }, {
            base: "I",
            letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
        }, {
            base: "J",
            letters: "JⒿＪĴɈ"
        }, {
            base: "K",
            letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
        }, {
            base: "L",
            letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
        }, {
            base: "LJ",
            letters: "Ǉ"
        }, {
            base: "Lj",
            letters: "ǈ"
        }, {
            base: "M",
            letters: "MⓂＭḾṀṂⱮƜ"
        }, {
            base: "N",
            letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
        }, {
            base: "NJ",
            letters: "Ǌ"
        }, {
            base: "Nj",
            letters: "ǋ"
        }, {
            base: "O",
            letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
        }, {
            base: "OI",
            letters: "Ƣ"
        }, {
            base: "OO",
            letters: "Ꝏ"
        }, {
            base: "OU",
            letters: "Ȣ"
        }, {
            base: "OE",
            letters: "Œ"
        }, {
            base: "oe",
            letters: "œ"
        }, {
            base: "P",
            letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
        }, {
            base: "Q",
            letters: "QⓆＱꝖꝘɊ"
        }, {
            base: "R",
            letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
        }, {
            base: "S",
            letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
        }, {
            base: "T",
            letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
        }, {
            base: "TZ",
            letters: "Ꜩ"
        }, {
            base: "U",
            letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
        }, {
            base: "V",
            letters: "VⓋＶṼṾƲꝞɅ"
        }, {
            base: "VY",
            letters: "Ꝡ"
        }, {
            base: "W",
            letters: "WⓌＷẀẂŴẆẄẈⱲ"
        }, {
            base: "X",
            letters: "XⓍＸẊẌ"
        }, {
            base: "Y",
            letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
        }, {
            base: "Z",
            letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
        }, {
            base: "a",
            letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
        }, {
            base: "aa",
            letters: "ꜳ"
        }, {
            base: "ae",
            letters: "æǽǣ"
        }, {
            base: "ao",
            letters: "ꜵ"
        }, {
            base: "au",
            letters: "ꜷ"
        }, {
            base: "av",
            letters: "ꜹꜻ"
        }, {
            base: "ay",
            letters: "ꜽ"
        }, {
            base: "b",
            letters: "bⓑｂḃḅḇƀƃɓ"
        }, {
            base: "c",
            letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
        }, {
            base: "d",
            letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
        }, {
            base: "dz",
            letters: "ǳǆ"
        }, {
            base: "e",
            letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
        }, {
            base: "f",
            letters: "fⓕｆḟƒꝼ"
        }, {
            base: "g",
            letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
        }, {
            base: "h",
            letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
        }, {
            base: "hv",
            letters: "ƕ"
        }, {
            base: "i",
            letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
        }, {
            base: "j",
            letters: "jⓙｊĵǰɉ"
        }, {
            base: "k",
            letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
        }, {
            base: "l",
            letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
        }, {
            base: "lj",
            letters: "ǉ"
        }, {
            base: "m",
            letters: "mⓜｍḿṁṃɱɯ"
        }, {
            base: "n",
            letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
        }, {
            base: "nj",
            letters: "ǌ"
        }, {
            base: "o",
            letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
        }, {
            base: "oi",
            letters: "ƣ"
        }, {
            base: "ou",
            letters: "ȣ"
        }, {
            base: "oo",
            letters: "ꝏ"
        }, {
            base: "p",
            letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
        }, {
            base: "q",
            letters: "qⓠｑɋꝗꝙ"
        }, {
            base: "r",
            letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
        }, {
            base: "s",
            letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
        }, {
            base: "t",
            letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
        }, {
            base: "tz",
            letters: "ꜩ"
        }, {
            base: "u",
            letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
        }, {
            base: "v",
            letters: "vⓥｖṽṿʋꝟʌ"
        }, {
            base: "vy",
            letters: "ꝡ"
        }, {
            base: "w",
            letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
        }, {
            base: "x",
            letters: "xⓧｘẋẍ"
        }, {
            base: "y",
            letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
        }, {
            base: "z",
            letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
        }], x = {}, T = 0; T < y.length; T += 1)
            for (var k = y[T].letters, P = 0; P < k.length; P += 1) x[k[P]] = y[T].base;
        for (var S = {
            __utils: !0,
            parseUrlQuery: a,
            parseQuery: a,
            isArray: t,
            each: r,
            unique: n,
            serializeObject: i,
            param: i,
            toCamelCase: s,
            dataset: o,
            requestAnimationFrame: l,
            cancelAnimationFrame: p,
            extend: c,
            removeDiacritics: function (e) {
                return e.replace(/[^\u0000-\u007E]/g, function (e) {
                    return x[e] || e
                })
            }, getTranslate: function (e, a) {
                void 0 === a && (a = "x");
                var t, r, n, i = window.getComputedStyle(e, null);
                return window.WebKitCSSMatrix ? (r = i.transform || i.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                    return e.replace(",", ".")
                }).join(", ")), n = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (n = i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = n.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? n.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? n.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), r || 0
            }
        }, M = ({
            addClass: function (e) {
                var a = this;
                if (void 0 === e) return this;
                for (var t = e.split(" "), r = 0; r < t.length; r += 1)
                    for (var n = 0; n < this.length; n += 1) void 0 !== a[n].classList && a[n].classList.add(t[r]);
                return this
            }, removeClass: function (e) {
                for (var a = this, t = e.split(" "), r = 0; r < t.length; r += 1)
                    for (var n = 0; n < this.length; n += 1) void 0 !== a[n].classList && a[n].classList.remove(t[r]);
                return this
            }, hasClass: function (e) {
                return !!this[0] && this[0].classList.contains(e)
            }, toggleClass: function (e) {
                for (var a = this, t = e.split(" "), r = 0; r < t.length; r += 1)
                    for (var n = 0; n < this.length; n += 1) void 0 !== a[n].classList && a[n].classList.toggle(t[r]);
                return this
            }, attr: function (e, a) {
                var t = arguments,
                    r = this;
                if (1 !== arguments.length || "string" != typeof e) {
                    for (var n = 0; n < this.length; n += 1)
                        if (2 === t.length) r[n].setAttribute(e, a);
                        else
                            for (var i in e) r[n][i] = e[i], r[n].setAttribute(i, e[i]);
                    return this
                }
                if (this[0]) return this[0].getAttribute(e)
            }, removeAttr: function (e) {
                for (var a = this, t = 0; t < this.length; t += 1) a[t].removeAttribute(e);
                return this
            }, prop: function (e, a) {
                var t = arguments,
                    r = this;
                if (1 !== arguments.length || "string" != typeof e) {
                    for (var n = 0; n < this.length; n += 1)
                        if (2 === t.length) r[n][e] = a;
                        else
                            for (var i in e) r[n][i] = e[i];
                    return this
                }
                if (this[0]) return this[0][e]
            }, data: function (e, a) {
                var t, r = this;
                if (void 0 !== a) {
                    for (var n = 0; n < this.length; n += 1) t = r[n], t.dom7ElementDataStorage || (t.dom7ElementDataStorage = {}), t.dom7ElementDataStorage[e] = a;
                    return this
                }
                if (t = this[0]) {
                    if (t.dom7ElementDataStorage && e in t.dom7ElementDataStorage) return t.dom7ElementDataStorage[e];
                    var i = t.getAttribute("data-" + e);
                    if (i) return i
                }
            }, removeData: function (e) {
                for (var a = this, t = 0; t < this.length; t += 1) {
                    var r = a[t];
                    r.dom7ElementDataStorage && r.dom7ElementDataStorage[e] && (r.dom7ElementDataStorage[e] = null, delete r.dom7ElementDataStorage[e])
                }
            }, dataset: function () {
                var e = this[0];
                if (e) {
                    var a = {};
                    if (e.dataset)
                        for (var t in e.dataset) a[t] = e.dataset[t];
                    else
                        for (var r = 0; r < e.attributes.length; r += 1) {
                            var n = e.attributes[r];
                            n.name.indexOf("data-") >= 0 && (a[s(n.name.split("data-")[1])] = n.value)
                        }
                    for (var i in a) "false" === a[i] ? a[i] = !1 : "true" === a[i] ? a[i] = !0 : parseFloat(a[i]) === 1 * a[i] && (a[i] *= 1);
                    return a
                }
            }, val: function (e) {
                var a = this;
                if (void 0 !== e) {
                    for (var t = 0; t < this.length; t += 1) a[t].value = e;
                    return this
                }
                if (this[0]) {
                    if (this[0].multiple && "select" === this[0].nodeName.toLowerCase()) {
                        for (var r = [], n = 0; n < this[0].selectedOptions.length; n += 1) r.push(a[0].selectedOptions[n].value);
                        return r
                    }
                    return this[0].value
                }
            }, transform: function (e) {
                for (var a = this, t = 0; t < this.length; t += 1) {
                    var r = a[t].style;
                    r.webkitTransform = e, r.transform = e
                }
                return this
            }, transition: function (e) {
                var a = this;
                "string" != typeof e && (e += "ms");
                for (var t = 0; t < this.length; t += 1) {
                    var r = a[t].style;
                    r.webkitTransitionDuration = e, r.transitionDuration = e
                }
                return this
            }, on: function () {
                function a(a) {
                    var t = a.target;
                    if (t) {
                        var r = a.target.dom7EventData || [];
                        if (r.unshift(a), e(t).is(s)) o.apply(t, r);
                        else
                            for (var n = e(t).parents(), i = 0; i < n.length; i += 1) e(n[i]).is(s) && o.apply(n[i], r)
                    }
                }

                function t(e) {
                    var a = e && e.target ? e.target.dom7EventData || [] : [];
                    a.unshift(e), o.apply(this, a)
                }
                for (var r = this, n = [], i = arguments.length; i--;) n[i] = arguments[i];
                var s, o, l = n[0],
                    p = !1;
                "function" == typeof n[1] ? (s = !1, o = n[1], p = n[2]) : (s = n[1], o = n[2], p = n[3]);
                for (var d, c = l.split(" "), m = 0; m < this.length; m += 1) {
                    var u = r[m];
                    if (s)
                        for (d = 0; d < c.length; d += 1) u.dom7LiveListeners || (u.dom7LiveListeners = []), u.dom7LiveListeners.push({
                            type: l,
                            listener: o,
                            proxyListener: a
                        }), u.addEventListener(c[d], a, p);
                    else
                        for (d = 0; d < c.length; d += 1) u.dom7Listeners || (u.dom7Listeners = []), u.dom7Listeners.push({
                            type: l,
                            listener: o,
                            proxyListener: t
                        }), u.addEventListener(c[d], t, p)
                }
                return this
            }, off: function () {
                for (var e = this, a = [], t = arguments.length; t--;) a[t] = arguments[t];
                var r, n, i = a[0],
                    s = !1;
                "function" == typeof a[1] ? (r = !1, n = a[1], s = a[2]) : (r = a[1], n = a[2], s = a[3]);
                for (var o = i.split(" "), l = 0; l < o.length; l += 1)
                    for (var p = 0; p < this.length; p += 1) {
                        var d = e[p];
                        if (r) {
                            if (d.dom7LiveListeners)
                                for (var c = 0; c < d.dom7LiveListeners.length; c += 1) n ? d.dom7LiveListeners[c].listener === n && d.removeEventListener(o[l], d.dom7LiveListeners[c].proxyListener, s) : d.dom7LiveListeners[c].type === o[l] && d.removeEventListener(o[l], d.dom7LiveListeners[c].proxyListener, s)
                        } else if (d.dom7Listeners)
                            for (var m = 0; m < d.dom7Listeners.length; m += 1) n ? d.dom7Listeners[m].listener === n && d.removeEventListener(o[l], d.dom7Listeners[m].proxyListener, s) : d.dom7Listeners[m].type === o[l] && d.removeEventListener(o[l], d.dom7Listeners[m].proxyListener, s)
                    }
                return this
            }, once: function (e, a, t, r) {
                function n(s) {
                    var o = s.target.dom7EventData || [];
                    t.apply(this, o), i.off(e, a, n, r)
                }
                var i = this;
                return "function" == typeof a && (t = arguments[1], r = arguments[2], a = !1), i.on(e, a, n, r)
            }, trigger: function () {
                for (var e = this, a = [], t = arguments.length; t--;) a[t] = arguments[t];
                for (var r = a[0].split(" "), n = a[1], i = 0; i < r.length; i += 1)
                    for (var s = 0; s < this.length; s += 1) {
                        var o = void 0;
                        try {
                            o = new window.CustomEvent(r[i], {
                                detail: n,
                                bubbles: !0,
                                cancelable: !0
                            })
                        } catch (e) {
                            o = document.createEvent("Event"), o.initEvent(r[i], !0, !0), o.detail = n
                        }
                        e[s].dom7EventData = a.filter(function (e, a) {
                            return a > 0
                        }), e[s].dispatchEvent(o), e[s].dom7EventData = [], delete e[s].dom7EventData
                    }
                return this
            }, transitionEnd: function (e) {
                function a(i) {
                    if (i.target === this)
                        for (e.call(this, i), t = 0; t < r.length; t += 1) n.off(r[t], a)
                }
                var t, r = ["webkitTransitionEnd", "transitionend"],
                    n = this;
                if (e)
                    for (t = 0; t < r.length; t += 1) n.on(r[t], a);
                return this
            }, animationEnd: function (e) {
                function a(i) {
                    if (i.target === this)
                        for (e.call(this, i), t = 0; t < r.length; t += 1) n.off(r[t], a)
                }
                var t, r = ["webkitAnimationEnd", "animationend"],
                    n = this;
                if (e)
                    for (t = 0; t < r.length; t += 1) n.on(r[t], a);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css("width")) : null
            }, outerWidth: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var a = this.styles();
                        return this[0].offsetWidth + parseFloat(a.getPropertyValue("margin-right")) + parseFloat(a.getPropertyValue("margin-left"))
                    }
                    return this[0].offsetWidth
                }
                return null
            }, height: function () {
                return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css("height")) : null
            }, outerHeight: function (e) {
                if (this.length > 0) {
                    if (e) {
                        var a = this.styles();
                        return this[0].offsetHeight + parseFloat(a.getPropertyValue("margin-top")) + parseFloat(a.getPropertyValue("margin-bottom"))
                    }
                    return this[0].offsetHeight
                }
                return null
            }, offset: function () {
                if (this.length > 0) {
                    var e = this[0],
                        a = e.getBoundingClientRect(),
                        t = document.body,
                        r = e.clientTop || t.clientTop || 0,
                        n = e.clientLeft || t.clientLeft || 0,
                        i = e === window ? window.scrollY : e.scrollTop,
                        s = e === window ? window.scrollX : e.scrollLeft;
                    return {
                        top: a.top + i - r,
                        left: a.left + s - n
                    }
                }
                return null
            }, hide: function () {
                for (var e = this, a = 0; a < this.length; a += 1) e[a].style.display = "none";
                return this
            }, show: function () {
                for (var e = this, a = 0; a < this.length; a += 1) {
                    var t = e[a];
                    "none" === t.style.display && (t.style.display = ""), "none" === window.getComputedStyle(t, null).getPropertyValue("display") && (t.style.display = "block")
                }
                return this
            }, styles: function () {
                return this[0] ? window.getComputedStyle(this[0], null) : {}
            }, css: function (e, a) {
                var t, r = this;
                if (1 === arguments.length) {
                    if ("string" != typeof e) {
                        for (t = 0; t < this.length; t += 1)
                            for (var n in e) r[t].style[n] = e[n];
                        return this
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(e)
                }
                if (2 === arguments.length && "string" == typeof e) {
                    for (t = 0; t < this.length; t += 1) r[t].style[e] = a;
                    return this
                }
                return this
            }, toArray: function () {
                for (var e = this, a = [], t = 0; t < this.length; t += 1) a.push(e[t]);
                return a
            }, each: function (e) {
                var a = this;
                if (!e) return this;
                for (var t = 0; t < this.length; t += 1)
                    if (!1 === e.call(a[t], t, a[t])) return a;
                return this
            }, forEach: function (e) {
                var a = this;
                if (!e) return this;
                for (var t = 0; t < this.length; t += 1)
                    if (!1 === e.call(a[t], a[t], t)) return a;
                return this
            }, filter: function (e) {
                for (var a = [], t = this, r = 0; r < t.length; r += 1) e.call(t[r], r, t[r]) && a.push(t[r]);
                return new C(a)
            }, map: function (e) {
                for (var a = [], t = this, r = 0; r < t.length; r += 1) a.push(e.call(t[r], r, t[r]));
                return new C(a)
            }, html: function (e) {
                var a = this;
                if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
                for (var t = 0; t < this.length; t += 1) a[t].innerHTML = e;
                return this
            }, text: function (e) {
                var a = this;
                if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
                for (var t = 0; t < this.length; t += 1) a[t].textContent = e;
                return this
            }, is: function (a) {
                var t, r, n = this[0];
                if (!n || void 0 === a) return !1;
                if ("string" == typeof a) {
                    if (n.matches) return n.matches(a);
                    if (n.webkitMatchesSelector) return n.webkitMatchesSelector(a);
                    if (n.msMatchesSelector) return n.msMatchesSelector(a);
                    for (t = e(a), r = 0; r < t.length; r += 1)
                        if (t[r] === n) return !0;
                    return !1
                }
                if (a === document) return n === document;
                if (a === window) return n === window;
                if (a.nodeType || a instanceof C) {
                    for (t = a.nodeType ? [a] : a, r = 0; r < t.length; r += 1)
                        if (t[r] === n) return !0;
                    return !1
                }
                return !1
            }, indexOf: function (e) {
                for (var a = this, t = 0; t < this.length; t += 1)
                    if (a[t] === e) return t
            }, index: function () {
                var e, a = this[0];
                if (a) {
                    for (e = 0; null !== (a = a.previousSibling);) 1 === a.nodeType && (e += 1);
                    return e
                }
            }, eq: function (e) {
                if (void 0 === e) return this;
                var a, t = this.length;
                return e > t - 1 ? new C([]) : e < 0 ? (a = t + e, new C(a < 0 ? [] : [this[a]])) : new C([this[e]])
            }, append: function () {
                for (var e = this, a = [], t = arguments.length; t--;) a[t] = arguments[t];
                for (var r, n = 0; n < a.length; n += 1) {
                    r = a[n];
                    for (var i = 0; i < this.length; i += 1)
                        if ("string" == typeof r) {
                            var s = document.createElement("div");
                            for (s.innerHTML = r; s.firstChild;) e[i].appendChild(s.firstChild)
                        } else if (r instanceof C)
                        for (var o = 0; o < r.length; o += 1) e[i].appendChild(r[o]);
                    else e[i].appendChild(r)
                }
                return this
            }, appendTo: function (a) {
                return e(a).append(this), this
            }, prepend: function (e) {
                var a, t, r = this;
                for (a = 0; a < this.length; a += 1)
                    if ("string" == typeof e) {
                        var n = document.createElement("div");
                        for (n.innerHTML = e, t = n.childNodes.length - 1; t >= 0; t -= 1) r[a].insertBefore(n.childNodes[t], r[a].childNodes[0])
                    } else if (e instanceof C)
                    for (t = 0; t < e.length; t += 1) r[a].insertBefore(e[t], r[a].childNodes[0]);
                else r[a].insertBefore(e, r[a].childNodes[0]);
                return this
            }, prependTo: function (a) {
                return e(a).prepend(this), this
            }, insertBefore: function (a) {
                for (var t = this, r = e(a), n = 0; n < this.length; n += 1)
                    if (1 === r.length) r[0].parentNode.insertBefore(t[n], r[0]);
                    else if (r.length > 1)
                    for (var i = 0; i < r.length; i += 1) r[i].parentNode.insertBefore(t[n].cloneNode(!0), r[i])
            }, insertAfter: function (a) {
                for (var t = this, r = e(a), n = 0; n < this.length; n += 1)
                    if (1 === r.length) r[0].parentNode.insertBefore(t[n], r[0].nextSibling);
                    else if (r.length > 1)
                    for (var i = 0; i < r.length; i += 1) r[i].parentNode.insertBefore(t[n].cloneNode(!0), r[i].nextSibling)
            }, next: function (a) {
                return new C(this.length > 0 ? a ? this[0].nextElementSibling && e(this[0].nextElementSibling).is(a) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (a) {
                var t = [],
                    r = this[0];
                if (!r) return new C([]);
                for (; r.nextElementSibling;) {
                    var n = r.nextElementSibling;
                    a ? e(n).is(a) && t.push(n) : t.push(n), r = n
                }
                return new C(t)
            }, prev: function (a) {
                if (this.length > 0) {
                    var t = this[0];
                    return new C(a ? t.previousElementSibling && e(t.previousElementSibling).is(a) ? [t.previousElementSibling] : [] : t.previousElementSibling ? [t.previousElementSibling] : [])
                }
                return new C([])
            }, prevAll: function (a) {
                var t = [],
                    r = this[0];
                if (!r) return new C([]);
                for (; r.previousElementSibling;) {
                    var n = r.previousElementSibling;
                    a ? e(n).is(a) && t.push(n) : t.push(n), r = n
                }
                return new C(t)
            }, siblings: function (e) {
                return this.nextAll(e).add(this.prevAll(e))
            }, parent: function (a) {
                for (var t = this, r = [], i = 0; i < this.length; i += 1) null !== t[i].parentNode && (a ? e(t[i].parentNode).is(a) && r.push(t[i].parentNode) : r.push(t[i].parentNode));
                return e(n(r))
            }, parents: function (a) {
                for (var t = this, r = [], i = 0; i < this.length; i += 1)
                    for (var s = t[i].parentNode; s;) a ? e(s).is(a) && r.push(s) : r.push(s), s = s.parentNode;
                return e(n(r))
            }, closest: function (e) {
                var a = this;
                return void 0 === e ? new C([]) : (a.is(e) || (a = a.parents(e).eq(0)), a)
            }, find: function (e) {
                for (var a = this, t = [], r = 0; r < this.length; r += 1)
                    for (var n = a[r].querySelectorAll(e), i = 0; i < n.length; i += 1) t.push(n[i]);
                return new C(t)
            }, children: function (a) {
                for (var t = this, r = [], i = 0; i < this.length; i += 1)
                    for (var s = t[i].childNodes, o = 0; o < s.length; o += 1) a ? 1 === s[o].nodeType && e(s[o]).is(a) && r.push(s[o]) : 1 === s[o].nodeType && r.push(s[o]);
                return new C(n(r))
            }, remove: function () {
                for (var e = this, a = 0; a < this.length; a += 1) e[a].parentNode && e[a].parentNode.removeChild(e[a]);
                return this
            }, detach: function () {
                return this.remove()
            }, add: function () {
                for (var a = [], t = arguments.length; t--;) a[t] = arguments[t];
                var r, n, i = this;
                for (r = 0; r < a.length; r += 1) {
                    var s = e(a[r]);
                    for (n = 0; n < s.length; n += 1) i[i.length] = s[n], i.length += 1
                }
                return i
            }, empty: function () {
                for (var e = this, a = 0; a < this.length; a += 1) {
                    var t = e[a];
                    if (1 === t.nodeType) {
                        for (var r = 0; r < t.childNodes.length; r += 1) t.childNodes[r].parentNode && t.childNodes[r].parentNode.removeChild(t.childNodes[r]);
                        t.textContent = ""
                    }
                }
                return this
            }
        }), I = "click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll".split(" "), E = "resize scroll".split(" "), T = 0; T < I.length; T += 1)! function (a) {
            M[a] = function (t, r, n) {
                var i = this;
                if (void 0 === t) {
                    for (var s = 0; s < this.length; s += 1) E.indexOf(a) < 0 && (a in i[s] ? i[s][a]() : e(i[s]).trigger(a));
                    return this
                }
                return this.on(a, t, r, n)
            }
        }(I[T]);
        var O = {
                scrollTo: function () {
                    for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
                    var t = e[0],
                        r = e[1],
                        n = e[2],
                        i = e[3],
                        s = e[4];
                    if (4 === e.length && "function" == typeof i) {
                        s = i;
                        var o;
                        o = e, t = o[0], r = o[1], n = o[2], s = o[3], i = o[4]
                    }
                    return void 0 === i && (i = "swing"), this.each(function () {
                        function e(t) {
                            void 0 === t && (t = (new Date).getTime()), null === b && (b = t);
                            var r, p = Math.max(Math.min((t - b) / n, 1), 0),
                                d = "linear" === i ? p : .5 - Math.cos(p * Math.PI) / 2;
                            if (g && (u = a + d * (c - a)), v && (h = o + d * (m - o)), g && c > a && u >= c && (f.scrollTop = c, r = !0), g && c < a && u <= c && (f.scrollTop = c, r = !0), v && m > o && h >= m && (f.scrollLeft = m, r = !0), v && m < o && h <= m && (f.scrollLeft = m, r = !0), r) return void(s && s());
                            g && (f.scrollTop = u), v && (f.scrollLeft = h), l(e)
                        }
                        var a, o, p, d, c, m, u, h, f = this,
                            g = r > 0 || 0 === r,
                            v = t > 0 || 0 === t;
                        if (void 0 === i && (i = "swing"), g && (a = f.scrollTop, n || (f.scrollTop = r)), v && (o = f.scrollLeft, n || (f.scrollLeft = t)), n) {
                            g && (p = f.scrollHeight - f.offsetHeight, c = Math.max(Math.min(r, p), 0)), v && (d = f.scrollWidth - f.offsetWidth, m = Math.max(Math.min(t, d), 0));
                            var b = null;
                            g && c === a && (g = !1), v && m === o && (v = !1), l(e)
                        }
                    })
                }, scrollTop: function () {
                    for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
                    var t = e[0],
                        r = e[1],
                        n = e[2],
                        i = e[3];
                    if (3 === e.length && "function" == typeof n) {
                        var s;
                        s = e, t = s[0], r = s[1], i = s[2], n = s[3]
                    }
                    var o = this;
                    return void 0 === t ? o.length > 0 ? o[0].scrollTop : null : o.scrollTo(void 0, t, r, n, i)
                }, scrollLeft: function () {
                    for (var e = [], a = arguments.length; a--;) e[a] = arguments[a];
                    var t = e[0],
                        r = e[1],
                        n = e[2],
                        i = e[3];
                    if (3 === e.length && "function" == typeof n) {
                        var s;
                        s = e, t = s[0], r = s[1], i = s[2], n = s[3]
                    }
                    var o = this;
                    return void 0 === t ? o.length > 0 ? o[0].scrollLeft : null : o.scrollTo(t, void 0, r, n, i)
                }
            },
            L = {
                animate: m,
                stop: u
            },
            z = {},
            D = 0,
            B = {
                __utils: !0,
                ajaxSetup: h,
                ajax: f,
                get: v,
                post: b,
                getJSON: w
            };
        return e.use(S, M, O, L, B), e
    }(), window.Template7 = function () {
        "use strict";

        function e(e) {
            return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.apply(e)
        }

        function a(e) {
            return "function" == typeof e
        }

        function t(e) {
            return (void 0 !== l && l.escape ? l.escape(e) : e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        }

        function r(e) {
            var a, t, r, n = e.replace(/[{}#}]/g, "").split(" "),
                i = [];
            for (t = 0; t < n.length; t += 1) {
                var s = n[t],
                    o = void 0,
                    l = void 0;
                if (0 === t) i.push(s);
                else if (0 === s.indexOf('"') || 0 === s.indexOf("'"))
                    if (o = 0 === s.indexOf('"') ? d : p, l = 0 === s.indexOf('"') ? '"' : "'", 2 === s.match(o).length) i.push(s);
                    else {
                        for (a = 0, r = t + 1; r < n.length; r += 1)
                            if (s += " " + n[r], n[r].indexOf(l) >= 0) {
                                a = r, i.push(s);
                                break
                            }
                        a && (t = a)
                    } else if (s.indexOf("=") > 0) {
                    var c = s.split("="),
                        m = c[0],
                        u = c[1];
                    if (o || (o = 0 === u.indexOf('"') ? d : p, l = 0 === u.indexOf('"') ? '"' : "'"), 2 !== u.match(o).length) {
                        for (a = 0, r = t + 1; r < n.length; r += 1)
                            if (u += " " + n[r], n[r].indexOf(l) >= 0) {
                                a = r;
                                break
                            }
                        a && (t = a)
                    }
                    var h = [m, u.replace(o, "")];
                    i.push(h)
                } else i.push(s)
            }
            return i
        }

        function n(a) {
            var t, n, i = [];
            if (!a) return [];
            var s = a.split(/({{[^{^}]*}})/);
            for (t = 0; t < s.length; t += 1) {
                var o = s[t];
                if ("" !== o)
                    if (o.indexOf("{{") < 0) i.push({
                        type: "plain",
                        content: o
                    });
                    else {
                        if (o.indexOf("{/") >= 0) continue;
                        if (o.indexOf("{#") < 0 && o.indexOf(" ") < 0 && o.indexOf("else") < 0) {
                            i.push({
                                type: "variable",
                                contextName: o.replace(/[{}]/g, "")
                            });
                            continue
                        }
                        var l = r(o),
                            p = l[0],
                            d = ">" === p,
                            c = [],
                            m = {};
                        for (n = 1; n < l.length; n += 1) {
                            var u = l[n];
                            e(u) ? m[u[0]] = "false" !== u[1] && u[1] : c.push(u)
                        }
                        if (o.indexOf("{#") >= 0) {
                            var h = "",
                                f = "",
                                g = 0,
                                v = void 0,
                                b = !1,
                                w = !1,
                                C = 0;
                            for (n = t + 1; n < s.length; n += 1)
                                if (s[n].indexOf("{{#") >= 0 && (C += 1), s[n].indexOf("{{/") >= 0 && (C -= 1), s[n].indexOf("{{#" + p) >= 0) h += s[n], w && (f += s[n]), g += 1;
                                else if (s[n].indexOf("{{/" + p) >= 0) {
                                if (!(g > 0)) {
                                    v = n, b = !0;
                                    break
                                }
                                g -= 1, h += s[n], w && (f += s[n])
                            } else s[n].indexOf("else") >= 0 && 0 === C ? w = !0 : (w || (h += s[n]), w && (f += s[n]));
                            b && (v && (t = v), i.push({
                                type: "helper",
                                helperName: p,
                                contextName: c,
                                content: h,
                                inverseContent: f,
                                hash: m
                            }))
                        } else o.indexOf(" ") > 0 && (d && (p = "_partial", c[0] && (c[0] = '"' + c[0].replace(/"|'/g, "") + '"')), i.push({
                            type: "helper",
                            helperName: p,
                            contextName: c,
                            hash: m
                        }))
                    }
            }
            return i
        }

        function i(e, a, t) {
            return e.split(/([+ -*\/^])/g).map(function (e) {
                if (e.indexOf(a) < 0) return e;
                if (!t) return JSON.stringify("");
                var r = t;
                return e.indexOf(a + ".") >= 0 && e.split(a + ".")[1].split(".").forEach(function (e) {
                    r = r[e] ? r[e] : "undefined"
                }), JSON.stringify(r)
            }).join("")
        }

        function s(e, a) {
            return e.split(/([+ -*^])/g).map(function (e) {
                if (e.indexOf("../") < 0) return e;
                if (!a || 0 === a.length) return JSON.stringify("");
                var t = e.split("../").length - 1,
                    r = t > a.length ? a[a.length - 1] : a[t - 1],
                    n = r;
                return e.replace(/..\//g, "").split(".").forEach(function (e) {
                    n = n[e] ? n[e] : "undefined"
                }), JSON.stringify(n)
            }).join("")
        }

        function o(e, a) {
            if (2 === arguments.length) {
                var t = new c(e),
                    r = t.compile()(a);
                return t = null, r
            }
            return new c(e)
        }
        var l;
        l = "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0;
        var p = new RegExp("'", "g"),
            d = new RegExp('"', "g"),
            c = function (e) {
                function a(e, a, t) {
                    void 0 === t && (t = "data_1");
                    var r, n, i = a,
                        s = 0;
                    0 === e.indexOf("../") ? (s = e.split("../").length - 1, n = i.split("_")[1] - s, i = "ctx_" + (n >= 1 ? n : 1), r = e.split("../")[s].split(".")) : 0 === e.indexOf("@global") ? (i = "Template7.global", r = e.split("@global.")[1].split(".")) : 0 === e.indexOf("@root") ? (i = "root", r = e.split("@root.")[1].split(".")) : r = e.split(".");
                    for (var o = 0; o < r.length; o += 1) {
                        var l = r[o];
                        if (0 === l.indexOf("@")) {
                            var p = t.split("_")[1];
                            s > 0 && (p = n),
                                o > 0 ? i += "[(data_" + p + " && data_" + p + "." + l.replace("@", "") + ")]" : i = "(data_" + p + " && data_" + p + "." + l.replace("@", "") + ")"
                        } else isFinite(l) ? i += "[" + l + "]" : "this" === l || l.indexOf("this.") >= 0 || l.indexOf("this[") >= 0 || l.indexOf("this(") >= 0 ? i = l.replace("this", a) : i += "." + l
                    }
                    return i
                }

                function t(e, t, r) {
                    for (var n = [], i = 0; i < e.length; i += 1) /^['"]/.test(e[i]) ? n.push(e[i]) : /^(true|false|\d+)$/.test(e[i]) ? n.push(e[i]) : n.push(a(e[i], t, r));
                    return n.join(", ")
                }

                function r(e, s) {
                    function o(e, a) {
                        return e.content ? r(e.content, a) : function () {
                            return ""
                        }
                    }

                    function p(e, a) {
                        return e.inverseContent ? r(e.inverseContent, a) : function () {
                            return ""
                        }
                    }
                    if (void 0 === e && (e = i.template), void 0 === s && (s = 1), "string" != typeof e) throw new Error("Template7: Template must be a string");
                    var d = n(e),
                        c = "ctx_" + s,
                        m = "data_" + s;
                    if (0 === d.length) return function () {
                        return ""
                    };
                    var u = "";
                    u += 1 === s ? "(function (" + c + ", " + m + ", root) {\n" : "(function (" + c + ", " + m + ") {\n", 1 === s && (u += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", u += "function isFunction(func){return (typeof func === 'function');}\n", u += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n', u += "root = root || ctx_1 || {};\n"), u += "var r = '';\n";
                    var h;
                    for (h = 0; h < d.length; h += 1) {
                        var f = d[h];
                        if ("plain" !== f.type) {
                            var g = void 0,
                                v = void 0;
                            if ("variable" === f.type && (g = a(f.contextName, c, m), u += "r += c(" + g + ", " + c + ");"), "helper" === f.type) {
                                var b = void 0;
                                if ("ctx_1" !== c) {
                                    for (var w = c.split("_")[1], C = "ctx_" + (w - 1), y = w - 2; y >= 1; y -= 1) C += ", ctx_" + y;
                                    b = "[" + C + "]"
                                } else b = "[" + c + "]"; if (f.helperName in i.helpers) v = t(f.contextName, c, m), u += "r += (Template7.helpers." + f.helperName + ").call(" + c + ", " + (v && v + ", ") + "{hash:" + JSON.stringify(f.hash) + ", data: " + m + " || {}, fn: " + o(f, s + 1) + ", inverse: " + p(f, s + 1) + ", root: root, parents: " + b + "});";
                                else {
                                    if (f.contextName.length > 0) throw new Error('Template7: Missing helper: "' + f.helperName + '"');
                                    g = a(f.helperName, c, m), u += "if (" + g + ") {", u += "if (isArray(" + g + ")) {", u += "r += (Template7.helpers.each).call(" + c + ", " + g + ", {hash:" + JSON.stringify(f.hash) + ", data: " + m + " || {}, fn: " + o(f, s + 1) + ", inverse: " + p(f, s + 1) + ", root: root, parents: " + b + "});", u += "}else {", u += "r += (Template7.helpers.with).call(" + c + ", " + g + ", {hash:" + JSON.stringify(f.hash) + ", data: " + m + " || {}, fn: " + o(f, s + 1) + ", inverse: " + p(f, s + 1) + ", root: root, parents: " + b + "});", u += "}}"
                                }
                            }
                        } else u += "r +='" + f.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';"
                    }
                    return u += "\nreturn r;})", eval.call(l, u)
                }
                var i = this;
                i.template = e, i.compile = function (e) {
                    return i.compiled || (i.compiled = r(e)), i.compiled
                }
            };
        return c.prototype = {
            options: {},
            partials: {},
            helpers: {
                _partial: function (e, a) {
                        var t = c.prototype.partials[e];
                        if (!t || t && !t.template) return "";
                        t.compiled || (t.compiled = new c(t.template).compile());
                        var r = this;
                        for (var n in a.hash) r[n] = a.hash[n];
                        return t.compiled(r, a.data, a.root)
                    }, escape: function (e, a) {
                        if ("string" != typeof e) throw new Error('Template7: Passed context to "escape" helper should be a string');
                        return t(e)
                    },
                    if : function (e, t) {
                    var r = e;
                    return a(r) && (r = r.call(this)), r ? t.fn(this, t.data) : t.inverse(this, t.data)
                },
                unless: function (e, t) {
                    var r = e;
                    return a(r) && (r = r.call(this)), r ? t.inverse(this, t.data) : t.fn(this, t.data)
                }, each: function (t, r) {
                    var n = t,
                        i = "",
                        s = 0;
                    if (a(n) && (n = n.call(this)), e(n)) {
                        for (r.hash.reverse && (n = n.reverse()), s = 0; s < n.length; s += 1) i += r.fn(n[s], {
                            first: 0 === s,
                            last: s === n.length - 1,
                            index: s
                        });
                        r.hash.reverse && (n = n.reverse())
                    } else
                        for (var o in n) s += 1, i += r.fn(n[o], {
                            key: o
                        });
                    return s > 0 ? i : r.inverse(this)
                }, with: function (e, t) {
                    var r = e;
                    return a(r) && (r = e.call(this)), t.fn(r)
                }, join: function (e, t) {
                    var r = e;
                    return a(r) && (r = r.call(this)), r.join(t.hash.delimiter || t.hash.delimeter)
                }, js: function (e, a) {
                    var t, r = a.data,
                        n = e;
                    return "index first last key".split(" ").forEach(function (e) {
                        if (void 0 !== r[e]) {
                            var a = new RegExp("this.@" + e, "g"),
                                t = new RegExp("@" + e, "g");
                            n = n.replace(a, JSON.stringify(r[e])).replace(t, JSON.stringify(r[e]))
                        }
                    }), a.root && n.indexOf("@root") >= 0 && (n = i(n, "@root", a.root)), n.indexOf("@global") >= 0 && (n = i(n, "@global", l.Template7.global)), n.indexOf("../") >= 0 && (n = s(n, a.parents)), t = n.indexOf("return") >= 0 ? "(function(){" + n + "})" : "(function(){return (" + n + ")})", eval.call(this, t).call(this)
                }, js_if: function (e, a) {
                    var t, r = a.data,
                        n = e;
                    return "index first last key".split(" ").forEach(function (e) {
                        if (void 0 !== r[e]) {
                            var a = new RegExp("this.@" + e, "g"),
                                t = new RegExp("@" + e, "g");
                            n = n.replace(a, JSON.stringify(r[e])).replace(t, JSON.stringify(r[e]))
                        }
                    }), a.root && n.indexOf("@root") >= 0 && (n = i(n, "@root", a.root)), n.indexOf("@global") >= 0 && (n = i(n, "@global", c.global)), n.indexOf("../") >= 0 && (n = s(n, a.parents)), t = n.indexOf("return") >= 0 ? "(function(){" + n + "})" : "(function(){return (" + n + ")})", eval.call(this, t).call(this) ? a.fn(this, a.data) : a.inverse(this, a.data)
                }
            }
        }, c.prototype.helpers.js_compare = c.prototype.helpers.js_if, o.registerHelper = function (e, a) {
            c.prototype.helpers[e] = a
        }, o.unregisterHelper = function (e) {
            c.prototype.helpers[e] = void 0, delete c.prototype.helpers[e]
        }, o.registerPartial = function (e, a) {
            c.prototype.partials[e] = {
                template: a
            }
        }, o.unregisterPartial = function (e) {
            c.prototype.partials[e] && (c.prototype.partials[e] = void 0, delete c.prototype.partials[e])
        }, o.compile = function (e, a) {
            return new c(e, a).compile()
        }, o.options = c.prototype.options, o.helpers = c.prototype.helpers, o.partials = c.prototype.partials, o
    }(),
    function () {
        "use strict";
        window.LightSNS = function (e) {
            function a() {
                var e, a = i(this),
                    t = a[0].scrollTop,
                    r = a[0].scrollHeight,
                    n = a[0].offsetHeight,
                    s = a[0].getAttribute("data-distance"),
                    o = a.find(".virtual-list"),
                    l = a.hasClass("infinite-scroll-top");
                if (s || (s = 50), "string" == typeof s && s.indexOf("%") >= 0 && (s = parseInt(s, 10) / 100 * n), s > n && (s = n), l) t < s && a.trigger("infinite");
                else if (t + n >= r - s) {
                    if (o.length > 0 && (e = o.eq(-1)[0].f7VirtualList) && !e.reachEnd && !e.params.updatableScroll) return;
                    a.trigger("infinite")
                }
            }

            function t() {
                r.device.ipad && (document.body.scrollLeft = 0, setTimeout(function () {
                    document.body.scrollLeft = 0
                }, 0))
            }
            var r = this;
            r.version = "1.6.0", r.params = {
                root: "body",
                cache: !0,
                cacheIgnore: [],
                cacheIgnoreGetParameters: !1,
                cacheDuration: 6e5,
                preloadPreviousPage: !0,
                uniqueHistory: !1,
                uniqueHistoryIgnoreGetParameters: !1,
                dynamicPageUrl: "content-{{index}}",
                allowDuplicateUrls: !1,
                router: !0,
                routerRemoveTimeout: !1,
                routerRemoveWithTimeout: !1,
                pushState: !1,
                pushStateRoot: void 0,
                pushStateNoAnimation: !1,
                pushStateSeparator: "#!/",
                pushStateOnLoad: !0,
                fastClicks: !0,
                fastClicksDistanceThreshold: 10,
                fastClicksDelayBetweenClicks: 50,
                fastClicksExclude: "",
                tapHold: !1,
                tapHoldDelay: 750,
                tapHoldPreventClicks: !0,
                activeState: !0,
                activeStateElements: "a, button, label, span",
                animateNavBackIcon: !1,
                swipeBackPage: !0,
                swipeBackPageThreshold: 0,
                swipeBackPageActiveArea: 30,
                swipeBackPageAnimateShadow: !0,
                swipeBackPageAnimateOpacity: !0,
                ajaxLinks: void 0,
                externalLinks: ".external",
                sortable: !0,
                hideNavbarOnPageScroll: !1,
                hideToolbarOnPageScroll: !1,
                hideTabbarOnPageScroll: !1,
                showBarsOnPageScrollEnd: !0,
                showBarsOnPageScrollTop: !0,
                swipeout: !0,
                swipeoutActionsNoFold: !1,
                swipeoutNoFollow: !1,
                swipeoutRemoveWithTimeout: !1,
                smartSelectOpenIn: "page",
                smartSelectBackText: "Back",
                smartSelectPopupCloseText: "Close",
                smartSelectPickerCloseText: "Done",
                smartSelectSearchbar: !1,
                smartSelectBackOnSelect: !1,
                scrollTopOnNavbarClick: !1,
                scrollTopOnStatusbarClick: !1,
                panelLeftBreakpoint: null,
                panelRightBreakpoint: null,
                swipePanel: !1,
                swipePanelActiveArea: 0,
                swipePanelCloseOpposite: !0,
                swipePanelOnlyClose: !1,
                swipePanelNoFollow: !1,
                swipePanelThreshold: 0,
                panelsCloseByOutside: !0,
                modalButtonOk: "OK",
                modalButtonCancel: "Cancel",
                modalUsernamePlaceholder: "Username",
                modalPasswordPlaceholder: "Password",
                modalTitle: "LightSNS",
                modalCloseByOutside: !1,
                actionsCloseByOutside: !0,
                popupCloseByOutside: !0,
                popoverCloseByOutside: !0,
                modalPreloaderTitle: "Loading... ",
                modalStack: !0,
                modalsMoveToRoot: !0,
                imagesLazyLoadThreshold: 0,
                imagesLazyLoadSequential: !0,
                viewClass: "view",
                viewMainClass: "view-main",
                viewsClass: "views",
                notificationCloseOnClick: !1,
                notificationCloseIcon: !0,
                notificationCloseButtonText: "Close",
                animatePages: !0,
                templates: {},
                template7Data: {},
                template7Pages: !1,
                precompileTemplates: !1,
                material: !1,
                materialPageLoadDelay: 0,
                materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
                materialPreloaderHtml: '<span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span>',
                materialRipple: !0,
                materialRippleElements: ".ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a, .form-checkbox, .form-radio, .data-table .sortable-cell",
                init: !0
            };
            for (var n in e) r.params[n] = e[n];
            var i = Jinsom,
                s = Template7;
            r._compiledTemplates = {}, r.root = i(r.params.root), r.root.eq(0).addClass("LightSNS-Theme"), r.touchEvents = {
                start: r.support.touch ? "touchstart" : "mousedown",
                move: r.support.touch ? "touchmove" : "mousemove",
                end: r.support.touch ? "touchend" : "mouseup"
            }, r.ls = window.localStorage, r.rtl = "rtl" === i("body").css("direction"), r.rtl && i("html").attr("dir", "rtl"), void 0 !== r.params.statusbarOverlay ? r.params.statusbarOverlay ? i("html").addClass("with-statusbar-overlay") : i("html").removeClass("with-statusbar-overlay") : r.device.ios && (window.cordova || window.phonegap) && i(document).on("resume", function () {
                r.device.needsStatusBar() && i("html").addClass("with-statusbar-overlay")
            }, !1), r.views = [];
            var o = function (e, a) {
                var t, n = {
                    dynamicNavbar: !1,
                    domCache: !1,
                    linksView: void 0,
                    reloadPages: !1,
                    uniqueHistory: r.params.uniqueHistory,
                    uniqueHistoryIgnoreGetParameters: r.params.uniqueHistoryIgnoreGetParameters,
                    allowDuplicateUrls: r.params.allowDuplicateUrls,
                    swipeBackPage: r.params.swipeBackPage,
                    swipeBackPageAnimateShadow: r.params.swipeBackPageAnimateShadow,
                    swipeBackPageAnimateOpacity: r.params.swipeBackPageAnimateOpacity,
                    swipeBackPageActiveArea: r.params.swipeBackPageActiveArea,
                    swipeBackPageThreshold: r.params.swipeBackPageThreshold,
                    animatePages: r.params.animatePages,
                    preloadPreviousPage: r.params.preloadPreviousPage
                };
                a = a || {}, a.dynamicNavbar && r.params.material && (a.dynamicNavbar = !1);
                for (var s in n) void 0 === a[s] && (a[s] = n[s]);
                var o = this;
                o.params = a, o.selector = e;
                var l = i(e);
                if (o.container = l[0], "string" != typeof e && (e = (l.attr("id") ? "#" + l.attr("id") : "") + (l.attr("class") ? "." + l.attr("class").replace(/ /g, ".").replace(".active", "") : ""), o.selector = e), o.main = l.hasClass(r.params.viewMainClass), o.contentCache = {}, o.contextCache = {}, o.pagesCache = {}, o.pageElementsCache = {}, l[0].f7View = o, o.pagesContainer = l.find(".pages")[0], o.initialPages = [], o.initialPagesUrl = [], o.initialNavbars = [], o.params.domCache) {
                    var p = l.find(".page");
                    for (t = 0; t < p.length; t++) o.initialPages.push(p[t]), o.initialPagesUrl.push("#" + p.eq(t).attr("data-page"));
                    if (o.params.dynamicNavbar) {
                        var d = l.find(".navbar-inner");
                        for (t = 0; t < d.length; t++) o.initialNavbars.push(d[t])
                    }
                }
                o.allowPageChange = !0;
                var c = document.location.href;
                o.history = [];
                var m = c,
                    u = r.params.pushStateSeparator,
                    h = r.params.pushStateRoot;
                r.params.pushState && o.main && (h ? m = h : u && m.indexOf(u) >= 0 && m.indexOf(u + "#") < 0 && (m = m.split(u)[0]));
                var f, g;
                o.activePage || (f = i(o.pagesContainer).find(".page-on-center"), 0 === f.length && (f = i(o.pagesContainer).find(".page:not(.cached)"), f = f.eq(f.length - 1)), f.length > 0 && (g = f[0].f7PageData)), o.params.domCache && f ? (o.url = l.attr("data-url") || o.params.url || "#" + f.attr("data-page"), o.pagesCache[o.url] = f.attr("data-page")) : o.url = l.attr("data-url") || o.params.url || m, g && (g.view = o, g.url = o.url, o.params.domCache && o.params.dynamicNavbar && !g.navbarInnerContainer && (g.navbarInnerContainer = o.initialNavbars[o.initialPages.indexOf(g.container)]), o.activePage = g, f[0].f7PageData = g), o.url && o.history.push(o.url);
                var v, b, w, C, y, x, T, k, P, S, M, I, E = !1,
                    O = !1,
                    L = {},
                    z = [],
                    D = [],
                    B = !0,
                    N = [],
                    A = [];
                if (o.handleTouchStart = function (e) {
                    B && o.params.swipeBackPage && !E && !r.swipeoutOpenedEl && o.allowPageChange && (O = !1, E = !0, v = void 0, L.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, L.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, C = (new Date).getTime(), P = o.params.dynamicNavbar && l.find(".navbar-inner").length > 1)
                }, o.handleTouchMove = function (e) {
                    if (E) {
                        var a = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            t = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY;
                        if (void 0 === v && (v = !!(v || Math.abs(t - L.y) > Math.abs(a - L.x))), v || e.f7PreventSwipeBack || r.preventSwipeBack) return void(E = !1);
                        if (!O) {
                            var n = !1;
                            b = l.width();
                            var s = i(e.target),
                                p = s.hasClass("swipeout") ? s : s.parents(".swipeout");
                            p.length > 0 && (!r.rtl && p.find(".swipeout-actions-left").length > 0 && (n = !0), r.rtl && p.find(".swipeout-actions-right").length > 0 && (n = !0)), z = s.is(".page") ? s : s.parents(".page"), z.hasClass("no-swipeback") && (n = !0), D = l.find(".page-on-left:not(.cached)");
                            var d = L.x - l.offset().left > o.params.swipeBackPageActiveArea;
                            if (d = r.rtl ? L.x < l.offset().left - l[0].scrollLeft + b - o.params.swipeBackPageActiveArea : L.x - l.offset().left > o.params.swipeBackPageActiveArea, d && (n = !0), 0 !== D.length && 0 !== z.length || (n = !0), n) return void(E = !1);
                            o.params.swipeBackPageAnimateShadow && !r.device.android && (S = z.find(".swipeback-page-shadow"), 0 === S.length && (S = i('<div class="swipeback-page-shadow"></div>'), z.append(S))), o.params.swipeBackPageAnimateOpacity && (M = D.find(".swipeback-page-opacity"), 0 === M.length && (M = i('<div class="swipeback-page-opacity"></div>'), D.append(M))), P && (N = l.find(".navbar-on-center:not(.cached)"), A = l.find(".navbar-on-left:not(.cached)"), y = N.find(".left, .center, .right, .subnavbar, .fading"), x = A.find(".left, .center, .right, .subnavbar, .fading"), r.params.animateNavBackIcon && (T = N.find(".left.sliding .back .icon"), k = A.find(".left.sliding .back .icon"))), i(".picker-modal.modal-in").length > 0 && r.closeModal(i(".picker-modal.modal-in"))
                        }
                        e.f7PreventPanelSwipe = !0, O = !0, e.preventDefault();
                        var c = r.rtl ? -1 : 1;
                        (w = (a - L.x - o.params.swipeBackPageThreshold) * c) < 0 && (w = 0);
                        var m = w / b,
                            u = {
                                percentage: m,
                                activePage: z[0],
                                previousPage: D[0],
                                activeNavbar: N[0],
                                previousNavbar: A[0]
                            };
                        o.params.onSwipeBackMove && o.params.onSwipeBackMove(u), l.trigger("swipeBackMove swipeback:move", u);
                        var h = w * c,
                            f = (w / 5 - b / 5) * c;
                        if (1 === r.device.pixelRatio && (h = Math.round(h), f = Math.round(f)), z.transform("translate3d(" + h + "px,0,0)"), o.params.swipeBackPageAnimateShadow && !r.device.android && (S[0].style.opacity = 1 - 1 * m), D.transform("translate3d(" + f + "px,0,0)"), o.params.swipeBackPageAnimateOpacity && (M[0].style.opacity = 1 - 1 * m), P) {
                            var g;
                            for (g = 0; g < y.length; g++)
                                if (I = i(y[g]), I.is(".subnavbar.sliding") || (I[0].style.opacity = 1 - 1.3 * m), I[0].className.indexOf("sliding") >= 0) {
                                    var C = m * I[0].f7NavbarRightOffset;
                                    1 === r.device.pixelRatio && (C = Math.round(C)), I.transform("translate3d(" + C + "px,0,0)"), r.params.animateNavBackIcon && I[0].className.indexOf("left") >= 0 && T.length > 0 && T.transform("translate3d(" + -C + "px,0,0)")
                                }
                            for (g = 0; g < x.length; g++)
                                if (I = i(x[g]), I.is(".subnavbar.sliding") || (I[0].style.opacity = 1.3 * m - .3), I[0].className.indexOf("sliding") >= 0) {
                                    var B = I[0].f7NavbarLeftOffset * (1 - m);
                                    1 === r.device.pixelRatio && (B = Math.round(B)), I.transform("translate3d(" + B + "px,0,0)"), r.params.animateNavBackIcon && I[0].className.indexOf("left") >= 0 && k.length > 0 && k.transform("translate3d(" + -B + "px,0,0)")
                                }
                        }
                    }
                }, o.handleTouchEnd = function (e) {
                    if (!E || !O) return E = !1, void(O = !1);
                    if (E = !1, O = !1, 0 === w) return i([z[0], D[0]]).transform(""), void(P && (y.transform("").css({
                        opacity: ""
                    }), x.transform("").css({
                        opacity: ""
                    }), T && T.length > 0 && T.transform(""), k && T.length > 0 && k.transform("")));
                    var a = (new Date).getTime() - C,
                        t = !1;
                    (a < 300 && w > 10 || a >= 300 && w > b / 2) && (z.removeClass("page-on-center").addClass("page-on-right"), D.removeClass("page-on-left").addClass("page-on-center"), P && (N.removeClass("navbar-on-center").addClass("navbar-on-right"), A.removeClass("navbar-on-left").addClass("navbar-on-center")), t = !0), i([z[0], D[0]]).transform("").addClass("page-transitioning"), P && (y.css({
                        opacity: ""
                    }).each(function () {
                        var e = t ? this.f7NavbarRightOffset : 0,
                            a = i(this);
                        a.transform("translate3d(" + e + "px,0,0)"), r.params.animateNavBackIcon && a.hasClass("left") && T.length > 0 && T.addClass("page-transitioning").transform("translate3d(" + -e + "px,0,0)")
                    }).addClass("page-transitioning"), x.transform("").css({
                        opacity: ""
                    }).each(function () {
                        var e = t ? 0 : this.f7NavbarLeftOffset,
                            a = i(this);
                        a.transform("translate3d(" + e + "px,0,0)"), r.params.animateNavBackIcon && a.hasClass("left") && k.length > 0 && k.addClass("page-transitioning").transform("translate3d(" + -e + "px,0,0)")
                    }).addClass("page-transitioning")), B = !1, o.allowPageChange = !1;
                    var n = {
                        activePage: z[0],
                        previousPage: D[0],
                        activeNavbar: N[0],
                        previousNavbar: A[0]
                    };
                    if (t) {
                        var s = o.history[o.history.length - 2];
                        o.url = s, r.pageBackCallback("before", o, {
                            pageContainer: z[0],
                            url: s,
                            position: "center",
                            newPage: D,
                            oldPage: z,
                            swipeBack: !0
                        }), r.pageAnimCallback("before", o, {
                            pageContainer: D[0],
                            url: s,
                            position: "left",
                            newPage: D,
                            oldPage: z,
                            swipeBack: !0
                        }), o.params.onSwipeBackBeforeChange && o.params.onSwipeBackBeforeChange(n), l.trigger("swipeBackBeforeChange swipeback:beforechange", n)
                    } else o.params.onSwipeBackBeforeReset && o.params.onSwipeBackBeforeReset(n), l.trigger("swipeBackBeforeReset swipeback:beforereset", n);
                    z.transitionEnd(function () {
                        i([z[0], D[0]]).removeClass("page-transitioning"), P && (y.removeClass("page-transitioning").css({
                            opacity: ""
                        }), x.removeClass("page-transitioning").css({
                            opacity: ""
                        }), T && T.length > 0 && T.removeClass("page-transitioning"), k && k.length > 0 && k.removeClass("page-transitioning")), B = !0, o.allowPageChange = !0, t ? (r.params.pushState && o.main && history.back(), r.pageBackCallback("after", o, {
                            pageContainer: z[0],
                            url: s,
                            position: "center",
                            newPage: D,
                            oldPage: z,
                            swipeBack: !0
                        }), r.pageAnimCallback("after", o, {
                            pageContainer: D[0],
                            url: s,
                            position: "left",
                            newPage: D,
                            oldPage: z,
                            swipeBack: !0
                        }), r.router.afterBack(o, z, D), o.params.onSwipeBackAfterChange && o.params.onSwipeBackAfterChange(n), l.trigger("swipeBackAfterChange swipeback:afterchange", n)) : (o.params.onSwipeBackAfterReset && o.params.onSwipeBackAfterReset(n), l.trigger("swipeBackAfterReset swipeback:afterreset", n)), S && S.length > 0 && S.remove(), M && M.length > 0 && M.remove()
                    })
                }, o.attachEvents = function (e) {
                    var a = e ? "off" : "on",
                        t = !("touchstart" !== r.touchEvents.start || !r.support.passiveListener) && {
                            passive: !0,
                            capture: !1
                        },
                        n = !!r.support.passiveListener && {
                            passive: !1,
                            capture: !1
                        };
                    l[a](r.touchEvents.start, o.handleTouchStart, t), l[a](r.touchEvents.move, o.handleTouchMove, n), l[a](r.touchEvents.end, o.handleTouchEnd, t)
                }, o.detachEvents = function () {
                    o.attachEvents(!0)
                }, o.params.swipeBackPage && !r.params.material && o.attachEvents(), o.params.name && (o.params.name = o.params.name.replace(/[^a-zA-Z]/g, "")), r.views.push(o), o.main ? (r.mainView = o, r.views.main = o) : o.params.name && (r[o.params.name + "View"] = o, r.views[o.params.name] = o), o.router = {
                    load: function (e) {
                        return r.router.load(o, e)
                    }, back: function (e) {
                        return r.router.back(o, e)
                    }, loadPage: function (e) {
                        if ("string" == typeof (e = e || {})) {
                            var a = e;
                            e = {}, a && 0 === a.indexOf("#") && o.params.domCache ? e.pageName = a.split("#")[1] : e.url = a
                        }
                        return r.router.load(o, e)
                    }, loadContent: function (e) {
                        return r.router.load(o, {
                            content: e
                        })
                    }, reloadPage: function (e) {
                        return r.router.load(o, {
                            url: e,
                            reload: !0
                        })
                    }, reloadContent: function (e) {
                        return r.router.load(o, {
                            content: e,
                            reload: !0
                        })
                    }, reloadPreviousPage: function (e) {
                        return r.router.load(o, {
                            url: e,
                            reloadPrevious: !0,
                            reload: !0
                        })
                    }, reloadPreviousContent: function (e) {
                        return r.router.load(o, {
                            content: e,
                            reloadPrevious: !0,
                            reload: !0
                        })
                    }, refreshPage: function () {
                        var e = {
                            url: o.url,
                            reload: !0,
                            ignoreCache: !0
                        };
                        return e.url && 0 === e.url.indexOf("#") && (o.params.domCache && o.pagesCache[e.url] ? (e.pageName = o.pagesCache[e.url], e.url = void 0, delete e.url) : o.contentCache[e.url] && (e.content = o.contentCache[e.url], e.url = void 0, delete e.url)), r.router.load(o, e)
                    }, refreshPreviousPage: function () {
                        var e = {
                            url: o.history[o.history.length - 2],
                            reload: !0,
                            reloadPrevious: !0,
                            ignoreCache: !0
                        };
                        return e.url && 0 === e.url.indexOf("#") && o.params.domCache && o.pagesCache[e.url] && (e.pageName = o.pagesCache[e.url], e.url = void 0, delete e.url), r.router.load(o, e)
                    }
                }, o.loadPage = o.router.loadPage, o.loadContent = o.router.loadContent, o.reloadPage = o.router.reloadPage, o.reloadContent = o.router.reloadContent, o.reloadPreviousPage = o.router.reloadPreviousPage, o.reloadPreviousContent = o.router.reloadPreviousContent, o.refreshPage = o.router.refreshPage, o.refreshPreviousPage = o.router.refreshPreviousPage, o.back = o.router.back, o.hideNavbar = function (e) {
                    return r.hideNavbar(l.find(".navbar"), e)
                }, o.showNavbar = function (e) {
                    return r.showNavbar(l.find(".navbar"), e)
                }, o.hideToolbar = function (e) {
                    return r.hideToolbar(l.find(".toolbar"), e)
                }, o.showToolbar = function (e) {
                    return r.showToolbar(l.find(".toolbar"), e)
                }, r.params.pushState && r.params.pushStateOnLoad && o.main) {
                    var H, R = c.split(u)[1];
                    h ? H = c.split(r.params.pushStateRoot + u)[1] : u && c.indexOf(u) >= 0 && c.indexOf(u + "#") < 0 && (H = R);
                    var V = !r.params.pushStateNoAnimation && void 0,
                        Y = history.state;
                    H ? H.indexOf("#") >= 0 && o.params.domCache && Y && Y.pageName && "viewIndex" in Y ? r.router.load(o, {
                        pageName: Y.pageName,
                        url: Y.url,
                        animatePages: V,
                        pushState: !1
                    }) : H.indexOf("#") >= 0 && o.params.domCache && o.initialPagesUrl.indexOf(H) >= 0 ? r.router.load(o, {
                        pageName: H.replace("#", ""),
                        animatePages: V,
                        pushState: !1
                    }) : r.router.load(o, {
                        url: H,
                        animatePages: V,
                        pushState: !1
                    }) : o.params.domCache && c.indexOf(u + "#") >= 0 && (Y && Y.pageName && "viewIndex" in Y ? r.router.load(o, {
                        pageName: Y.pageName,
                        url: Y.url,
                        animatePages: V,
                        pushState: !1
                    }) : u && 0 === R.indexOf("#") && o.initialPagesUrl.indexOf(R) && r.router.load(o, {
                        pageName: R.replace("#", ""),
                        animatePages: V,
                        pushState: !1
                    }))
                }
                return o.destroy = function () {
                    o.detachEvents(), o.main ? (r.mainView = null, delete r.mainView, r.views.main = null, delete r.views.main) : o.params.name && (r[o.params.name + "View"] = null, delete r[o.params.name + "View"], r.views[o.params.name] = null, delete r.views[o.params.name]), l.removeAttr("data-page"), l[0].f7View = null, delete l[0].f7View, r.views.splice(r.views.indexOf(o), 1);
                    for (var e in o) o.hasOwnProperty(e) && (o[e] = null, delete o[e]);
                    o = null
                }, r.pluginHook("addView", o), o
            };
            r.addView = function (e, a) {
                return new o(e, a)
            }, r.getCurrentView = function (e) {
                var a = i(".popover.modal-in .view"),
                    t = i(".popup.modal-in .view"),
                    r = i(".panel.active .view"),
                    n = i(".views"),
                    s = n.children(".view");
                if (s.length > 1 && s.hasClass("tab") && (s = n.children(".view.active")), a.length > 0 && a[0].f7View) return a[0].f7View;
                if (t.length > 0 && t[0].f7View) return t[0].f7View;
                if (r.length > 0 && r[0].f7View) return r[0].f7View;
                if (s.length > 0) {
                    if (1 === s.length && s[0].f7View) return s[0].f7View;
                    if (s.length > 1) {
                        for (var o = [], l = 0; l < s.length; l++) s[l].f7View && o.push(s[l].f7View);
                        if (o.length > 0 && void 0 !== e) return o[e];
                        if (o.length > 1) return o;
                        if (1 === o.length) return o[0];
                        return
                    }
                }
            }, r.navbarInitCallback = function (e, a, t, n) {
                if (!t && n && (t = i(n).parent(".navbar")[0]), n && (!n.f7NavbarInitialized || !e || e.params.domCache)) {
                    var s = {
                            container: t,
                            innerContainer: n
                        },
                        o = a && a.f7PageData,
                        l = {
                            page: o,
                            navbar: s
                        };
                    if (n.f7NavbarInitialized && (e && e.params.domCache || !e && i(t).parents(".popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal").length > 0)) return r.reinitNavbar(t, n), r.pluginHook("navbarReinit", l), void i(n).trigger("navbarReinit navbar:reinit", l);
                    n.f7NavbarInitialized = !0, r.pluginHook("navbarBeforeInit", s, o), i(n).trigger("navbarBeforeInit navbar:beforeinit", l), r.initNavbar(t, n), r.pluginHook("navbarInit", s, o), i(n).trigger("navbarInit navbar:init", l)
                }
            }, r.navbarRemoveCallback = function (e, a, t, n) {
                !t && n && (t = i(n).parent(".navbar")[0]);
                var s, o = {
                    container: t,
                    innerContainer: n
                };
                a && (s = a.f7PageData);
                var l = {
                    page: s,
                    navbar: o
                };
                r.pluginHook("navbarBeforeRemove", o, s), i(n).trigger("navbarBeforeRemove navbar:beforeremove", l), o = null, s = null
            }, r.initNavbar = function (e, a) {
                r.initSearchbar && r.initSearchbar(a)
            }, r.reinitNavbar = function (e, a) {}, r.initNavbarWithCallback = function (e) {
                e = i(e);
                var a, t = e.parents("." + r.params.viewClass);
                0 !== t.length && (0 === e.parents(".navbar-through").length && 0 === t.find(".navbar-through").length || (a = t[0].f7View || void 0, e.find(".navbar-inner").each(function () {
                    var n, s = this;
                    if (i(s).attr("data-page") && (n = t.find('.page[data-page="' + i(s).attr("data-page") + '"]')[0]), !n) {
                        var o = t.find(".page");
                        1 === o.length ? n = o[0] : t.find(".page").each(function () {
                            this.f7PageData && this.f7PageData.navbarInnerContainer === s && (n = this)
                        })
                    }
                    r.navbarInitCallback(a, n, e[0], s)
                })))
            }, r.sizeNavbars = function (e) {
                r.params.material || (e ? i(e).find(".navbar .navbar-inner:not(.cached)") : i(".navbar .navbar-inner:not(.cached)")).each(function () {
                    var e = i(this);
                    if (!e.hasClass("cached")) {
                        var a, t, n = r.rtl ? e.find(".right") : e.find(".left"),
                            s = r.rtl ? e.find(".left") : e.find(".right"),
                            o = e.find(".center"),
                            l = e.find(".subnavbar"),
                            p = 0 === n.length,
                            d = 0 === s.length,
                            c = p ? 0 : n.outerWidth(!0),
                            m = d ? 0 : s.outerWidth(!0),
                            u = o.outerWidth(!0),
                            h = e.styles(),
                            f = e[0].offsetWidth - parseInt(h.paddingLeft, 10) - parseInt(h.paddingRight, 10),
                            g = e.hasClass("navbar-on-left");
                        d && (a = f - u), p && (a = 0), p || d || (a = (f - m - u + c) / 2);
                        var v = (f - u) / 2;
                        f - c - m > u ? (v < c && (v = c), v + u > f - m && (v = f - m - u), t = v - a) : t = 0;
                        var b = r.rtl ? -1 : 1;
                        if (o.hasClass("sliding") && (o[0].f7NavbarLeftOffset = -(a + t) * b, o[0].f7NavbarRightOffset = (f - a - t - u) * b, g)) {
                            if (r.params.animateNavBackIcon) {
                                var w = e.parent().find(".navbar-on-center").find(".left.sliding .back .icon ~ span");
                                w.length > 0 && (o[0].f7NavbarLeftOffset += w[0].offsetLeft)
                            }
                            o.transform("translate3d(" + o[0].f7NavbarLeftOffset + "px, 0, 0)")
                        }!p && n.hasClass("sliding") && (r.rtl ? (n[0].f7NavbarLeftOffset = -(f - n[0].offsetWidth) / 2 * b, n[0].f7NavbarRightOffset = c * b) : (n[0].f7NavbarLeftOffset = -c, n[0].f7NavbarRightOffset = (f - n[0].offsetWidth) / 2, r.params.animateNavBackIcon && n.find(".back .icon").length > 0 && (n[0].f7NavbarRightOffset -= n.find(".back .icon")[0].offsetWidth)), g && n.transform("translate3d(" + n[0].f7NavbarLeftOffset + "px, 0, 0)")), !d && s.hasClass("sliding") && (r.rtl ? (s[0].f7NavbarLeftOffset = -m * b, s[0].f7NavbarRightOffset = (f - s[0].offsetWidth) / 2 * b) : (s[0].f7NavbarLeftOffset = -(f - s[0].offsetWidth) / 2, s[0].f7NavbarRightOffset = m), g && s.transform("translate3d(" + s[0].f7NavbarLeftOffset + "px, 0, 0)")), l.length && l.hasClass("sliding") && (l[0].f7NavbarLeftOffset = r.rtl ? l[0].offsetWidth : -l[0].offsetWidth, l[0].f7NavbarRightOffset = -l[0].f7NavbarLeftOffset);
                        var C = t;
                        r.rtl && p && d && o.length > 0 && (C = -C), o.css({
                            left: C + "px"
                        })
                    }
                })
            }, r.hideNavbar = function (e, a) {
                return void 0 === a && (a = !0), i(e).addClass("navbar-hidden" + (a ? "" : " not-animated")), !0
            }, r.showNavbar = function (e, a) {
                void 0 === a && (a = !0);
                var t = i(e);
                return a ? (t.removeClass("not-animated"), t.addClass("navbar-hiding").removeClass("navbar-hidden").transitionEnd(function () {
                    t.removeClass("navbar-hiding")
                })) : t.removeClass("navbar-hidden navbar-hiding not-animated"), !0
            }, r.hideToolbar = function (e, a) {
                return void 0 === a && (a = !0), i(e).addClass("toolbar-hidden" + (a ? "" : " not-animated")), !0
            }, r.showToolbar = function (e, a) {
                void 0 === a && (a = !0);
                var t = i(e);
                a ? (t.removeClass("not-animated"), t.addClass("toolbar-hiding").removeClass("toolbar-hidden").transitionEnd(function () {
                    t.removeClass("toolbar-hiding" + (a ? "" : " not-animated"))
                })) : t.removeClass("toolbar-hidden toolbar-hiding not-animated")
            };
            var l = function (e, a) {
                function t(e) {
                    e.preventDefault()
                }
                var n = {
                    input: null,
                    clearButton: null,
                    cancelButton: null,
                    searchList: null,
                    searchIn: ".item-title",
                    searchBy: "",
                    found: null,
                    notFound: null,
                    overlay: null,
                    ignore: ".searchbar-ignore",
                    customSearch: !1,
                    removeDiacritics: !0,
                    hideDividers: !0,
                    hideGroups: !0
                };
                a = a || {};
                for (var s in n)(void 0 === a[s] || null === a[s] && n.hasOwnProperty(s)) && (a[s] = n[s]);
                var o = this;
                o.material = r.params.material, o.params = a, e = i(e), o.container = e, o.active = !1, o.input = o.params.input ? i(o.params.input) : o.container.find('input[type="search"]'), o.clearButton = o.params.clearButton ? i(o.params.clearButton) : o.container.find(".searchbar-clear"), o.cancelButton = o.params.cancelButton ? i(o.params.cancelButton) : o.container.find(".searchbar-cancel"), o.searchList = i(o.params.searchList), o.isVirtualList = o.searchList.hasClass("virtual-list"), o.pageContainer = o.container.parents(".page").eq(0), o.params.overlay ? o.overlay = i(o.params.overlay) : o.overlay = o.pageContainer.length > 0 ? o.pageContainer.find(".searchbar-overlay") : i(".searchbar-overlay"), o.params.found ? o.found = i(o.params.found) : o.found = o.pageContainer.length > 0 ? o.pageContainer.find(".searchbar-found") : i(".searchbar-found"), o.params.notFound ? o.notFound = i(o.params.notFound) : o.notFound = o.pageContainer.length > 0 ? o.pageContainer.find(".searchbar-not-found") : i(".searchbar-not-found");
                var l = r.rtl ? "margin-left" : "margin-right",
                    p = !1;
                o.setCancelButtonMargin = function () {
                    o.cancelButton.transition(0).show(), o.cancelButton.css(l, -o.cancelButton[0].offsetWidth + "px"), o.cancelButton[0].clientLeft, o.cancelButton.transition(""), p = !0
                }, o.triggerEvent = function (e, a, t) {
                    o.container.trigger(e, t), o.searchList.length > 0 && o.searchList.trigger(e, t), a && o.params[a] && o.params[a](o, t)
                }, o.enable = function (e) {
                    function a() {
                        !o.searchList.length && !o.params.customSearch || o.container.hasClass("searchbar-active") || o.query || o.overlay.addClass("searchbar-overlay-active"), o.container.addClass("searchbar-active"), o.cancelButton.length > 0 && !o.material && (p || o.setCancelButtonMargin(), o.cancelButton.css(l, "0px")), o.triggerEvent("enableSearch searchbar:enable", "onEnable"), o.active = !0
                    }
                    r.device.ios && !r.params.material && e && "focus" === e.type ? setTimeout(function () {
                        a()
                    }, 400) : a()
                }, o.disable = function () {
                    function e() {
                        o.input.blur()
                    }
                    o.input.val("").trigger("change"), o.container.removeClass("searchbar-active searchbar-not-empty"), o.cancelButton.length > 0 && !o.material && o.cancelButton.css(l, -o.cancelButton[0].offsetWidth + "px"), (o.searchList.length || o.params.customSearch) && o.overlay.removeClass("searchbar-overlay-active"), o.active = !1, r.device.ios ? setTimeout(function () {
                        e()
                    }, 400) : e(), o.triggerEvent("disableSearch searchbar:disable", "onDisable")
                }, o.clear = function (e) {
                    if (!o.query && e && i(e.target).hasClass("searchbar-clear")) return void o.disable();
                    var a = o.value;
                    o.input.val("").trigger("change").focus(), o.triggerEvent("clearSearch searchbar:clear", "onClear", {
                        previousQuery: a
                    })
                }, o.handleInput = function () {
                    setTimeout(function () {
                        var e = o.input.val().trim();
                        (o.searchList.length > 0 || o.params.customSearch) && (o.params.searchIn || o.isVirtualList) && o.search(e, !0)
                    }, 0)
                };
                var d, c = "";
                return o.search = function (e, a) {
                    if (!c || e.trim() !== c) {
                        if (c = e.trim(), a || (o.active || o.enable(), o.input.val(e)), o.query = o.value = e, 0 === e.length ? (o.container.removeClass("searchbar-not-empty"), o.searchList.length && o.container.hasClass("searchbar-active") && o.overlay.addClass("searchbar-overlay-active")) : (o.container.addClass("searchbar-not-empty"), o.searchList.length && o.container.hasClass("searchbar-active") && o.overlay.removeClass("searchbar-overlay-active")), o.params.customSearch) return void o.triggerEvent("search searchbar:search", "onSearch", {
                            query: e
                        });
                        var t, r = [];
                        if (o.isVirtualList) {
                            if (d = o.searchList[0].f7VirtualList, "" === e.trim()) return d.resetFilter(), o.notFound.hide(), void o.found.show();
                            if (t = o.params.removeDiacritics ? i.removeDiacritics(e) : e, d.params.searchAll) r = d.params.searchAll(t, d.items) || [];
                            else if (d.params.searchByItem)
                                for (var n = 0; n < d.items.length; n++) d.params.searchByItem(t, n, d.params.items[n]) && r.push(n)
                        } else {
                            var s;
                            s = o.params.removeDiacritics ? i.removeDiacritics(e.trim().toLowerCase()).split(" ") : e.trim().toLowerCase().split(" "), o.searchList.find("li").removeClass("hidden-by-searchbar").each(function (e, a) {
                                a = i(a);
                                var t = [];
                                a.find(o.params.searchIn).each(function () {
                                    var e = i(this).text().trim().toLowerCase();
                                    o.params.removeDiacritics && (e = i.removeDiacritics(e)), t.push(e)
                                }), t = t.join(" ");
                                for (var n = 0, l = 0; l < s.length; l++) t.indexOf(s[l]) >= 0 && n++;
                                n === s.length || o.params.ignore && a.is(o.params.ignore) ? r.push(a[0]) : a.addClass("hidden-by-searchbar")
                            }), o.params.hideDividers && o.searchList.find(".item-divider, .list-group-title").each(function () {
                                for (var e = i(this), a = e.nextAll("li"), t = !0, r = 0; r < a.length; r++) {
                                    var n = i(a[r]);
                                    if (n.hasClass("list-group-title") || n.hasClass("item-divider")) break;
                                    n.hasClass("hidden-by-searchbar") || (t = !1)
                                }
                                var s = o.params.ignore && e.is(o.params.ignore);
                                t && !s ? e.addClass("hidden-by-searchbar") : e.removeClass("hidden-by-searchbar")
                            }), o.params.hideGroups && o.searchList.find(".list-group").each(function () {
                                var e = i(this),
                                    a = o.params.ignore && e.is(o.params.ignore);
                                0 !== e.find("li:not(.hidden-by-searchbar)").length || a ? e.removeClass("hidden-by-searchbar") : e.addClass("hidden-by-searchbar")
                            })
                        }
                        o.triggerEvent("search searchbar:search", "onSearch", {
                            query: e,
                            foundItems: r
                        }), 0 === r.length ? (o.notFound.show(), o.found.hide()) : (o.notFound.hide(), o.found.show()), o.isVirtualList && d.filterItems(r)
                    }
                }, o.attachEvents = function (e) {
                    var a = e ? "off" : "on";
                    o.container[a]("submit", t), o.material || o.cancelButton[a]("click", o.disable), o.overlay[a]("click", o.disable),
                        o.input[a]("focus", o.enable), o.input[a]("change keydown keypress keyup compositionend", o.handleInput), o.clearButton[a]("click", o.clear)
                }, o.detachEvents = function () {
                    o.attachEvents(!0)
                }, o.init = function () {
                    o.attachEvents()
                }, o.destroy = function () {
                    o && (o.detachEvents(), o = null)
                }, o.init(), o.container[0].f7Searchbar = o, o
            };
            r.searchbar = function (e, a) {
                return new l(e, a)
            }, r.initSearchbar = function (e) {
                function a() {
                    n && n.destroy()
                }
                e = i(e);
                var t = e.hasClass("searchbar") ? e : e.find(".searchbar");
                if (0 !== t.length && t.hasClass("searchbar-init")) {
                    var n = r.searchbar(t, t.dataset());
                    e.hasClass("page") ? e.once("pageBeforeRemove", a) : e.hasClass("navbar-inner") && e.once("navbarBeforeRemove", a)
                }
            };
            var p = function (e, a) {
                function t(e) {
                    e.preventDefault()
                }
                var r = {
                    textarea: null,
                    maxHeight: null
                };
                a = a || {};
                for (var n in r) void 0 !== a[n] && null !== a[n] || (a[n] = r[n]);
                var s = this;
                if (s.params = a, s.container = i(e), 0 !== s.container.length) return s.textarea = s.params.textarea ? i(s.params.textarea) : s.container.find("textarea"), s.pageContainer = s.container.parents(".page").eq(0), s.pageContent = s.pageContainer.find(".page-content"), s.pageContentPadding = parseInt(s.pageContent.css("padding-bottom")), s.initialBarHeight = s.container[0].offsetHeight, s.initialAreaHeight = s.textarea[0].offsetHeight, s.sizeTextarea = function () {
                    s.textarea.css({
                        height: ""
                    });
                    var e = s.textarea[0].offsetHeight,
                        a = e - s.textarea[0].clientHeight,
                        t = s.textarea[0].scrollHeight;
                    if (t + a > e) {
                        var r = t + a,
                            n = s.initialBarHeight + (r - s.initialAreaHeight),
                            i = s.params.maxHeight || s.container.parents(".view")[0].offsetHeight - 88;
                        n > i && (n = parseInt(i, 10), r = n - s.initialBarHeight + s.initialAreaHeight), s.textarea.css("height", r + "px"), s.container.css("height", n + "px");
                        var o = s.pageContent[0].scrollTop === s.pageContent[0].scrollHeight - s.pageContent[0].offsetHeight;
                        s.pageContent.length > 0 && (s.pageContent.css("padding-bottom", n + "px"), 0 === s.pageContent.find(".messages-new-first").length && o && s.pageContent.scrollTop(s.pageContent[0].scrollHeight - s.pageContent[0].offsetHeight))
                    } else s.pageContent.length > 0 && (s.container.css({
                        height: "",
                        bottom: ""
                    }), s.pageContent.css({
                        "padding-bottom": ""
                    }))
                }, s.clear = function () {
                    s.textarea.val("").trigger("change")
                }, s.value = function (e) {
                    if (void 0 === e) return s.textarea.val();
                    s.textarea.val(e).trigger("change")
                }, s.textareaTimeout = void 0, s.handleTextarea = function (e) {
                    clearTimeout(s.textareaTimeout), s.textareaTimeout = setTimeout(function () {
                        s.sizeTextarea()
                    }, 0)
                }, s.attachEvents = function (e) {
                    var a = e ? "off" : "on";
                    s.container[a]("submit", t), s.textarea[a]("change keydown keypress keyup paste cut", s.handleTextarea)
                }, s.detachEvents = function () {
                    s.attachEvents(!0)
                }, s.init = function () {
                    s.attachEvents()
                }, s.destroy = function () {
                    s.detachEvents(), s = null
                }, s.init(), s.container[0].f7Messagebar = s, s
            };
            r.messagebar = function (e, a) {
                return new p(e, a)
            }, r.initPageMessagebar = function (e) {
                function a() {
                    n.destroy(), e.off("page:beforeremove", a)
                }
                e = i(e);
                var t = e.hasClass("messagebar") ? e : e.find(".messagebar");
                if (0 !== t.length && t.hasClass("messagebar-init")) {
                    var n = r.messagebar(t, t.dataset());
                    e.hasClass("page") && e.on("page:beforeremove", a)
                }
            }, r.cache = [], r.removeFromCache = function (e) {
                for (var a = !1, t = 0; t < r.cache.length; t++) r.cache[t].url === e && (a = t);
                !1 !== a && r.cache.splice(a, 1)
            }, r.xhr = !1, r.get = function (e, a, t, n) {
                var s = e;
                if (r.params.cacheIgnoreGetParameters && e.indexOf("?") >= 0 && (s = e.split("?")[0]), r.params.cache && !t && e.indexOf("nocache") < 0 && r.params.cacheIgnore.indexOf(s) < 0)
                    for (var o = 0; o < r.cache.length; o++)
                        if (r.cache[o].url === s && (new Date).getTime() - r.cache[o].time < r.params.cacheDuration) return n(r.cache[o].content), !1;
                return r.xhr = i.ajax({
                    url: e,
                    method: "GET",
                    beforeSend: r.params.onAjaxStart,
                    complete: function (e, a) {
                        "error" !== a && "timeout" !== a && e.status >= 200 && e.status < 300 || 0 === e.status ? (r.params.cache && "" !== e.responseText && (r.removeFromCache(s), r.cache.push({
                            url: s,
                            time: (new Date).getTime(),
                            content: e.responseText
                        })), n(e.responseText, !1)) : n(e.responseText, !0), r.params.onAjaxComplete && r.params.onAjaxComplete(e)
                    }, error: function (e) {
                        n(e.responseText, !0), r.params.onAjaxError && r.params.onAjaxError(e)
                    }
                }), a && (a.xhr = r.xhr), r.xhr
            }, r.pageCallbacks = {}, r.onPage = function (e, a, t) {
                if (a && a.split(" ").length > 1) {
                    for (var n = a.split(" "), i = [], s = 0; s < n.length; s++) i.push(r.onPage(e, n[s], t));
                    return i.remove = function () {
                        for (var e = 0; e < i.length; e++) i[e].remove()
                    }, i.trigger = function () {
                        for (var e = 0; e < i.length; e++) i[e].trigger()
                    }, i
                }
                var o = r.pageCallbacks[e][a];
                return o || (o = r.pageCallbacks[e][a] = []), r.pageCallbacks[e][a].push(t), {
                    remove: function () {
                        for (var e, a = 0; a < o.length; a++) o[a].toString() === t.toString() && (e = a);
                        void 0 !== e && o.splice(e, 1)
                    }, trigger: t
                }
            };
            for (var d = "beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove".split(" "), c = 0; c < d.length; c++) r.pageCallbacks[d[c]] = {},
                function (e) {
                    var a = e.replace(/^./, function (e) {
                        return e.toUpperCase()
                    });
                    r["onPage" + a] = function (a, t) {
                        return r.onPage(e, a, t)
                    }
                }(d[c]);
            r.triggerPageCallbacks = function (e, a, t) {
                var n = r.pageCallbacks[e]["*"];
                if (n)
                    for (var i = 0; i < n.length; i++) n[i](t);
                var s = r.pageCallbacks[e][a];
                if (s && 0 !== s.length)
                    for (var o = 0; o < s.length; o++) s[o](t)
            }, r.pageInitCallback = function (e, a) {
                var t = a.pageContainer;
                if (t && (!t.f7PageInitialized || !e || e.params.domCache)) {
                    var n = a.query;
                    n || (n = a.url && a.url.indexOf("?") > 0 ? i.parseUrlQuery(a.url || "") : t.f7PageData && t.f7PageData.query ? t.f7PageData.query : {});
                    var s = {
                        container: t,
                        url: a.url,
                        query: n,
                        name: i(t).attr("data-page"),
                        view: e,
                        from: a.position,
                        context: a.context,
                        navbarInnerContainer: a.navbarInnerContainer,
                        fromPage: a.fromPage
                    };
                    if (a.fromPage && !a.fromPage.navbarInnerContainer && a.oldNavbarInnerContainer && (a.fromPage.navbarInnerContainer = a.oldNavbarInnerContainer), t.f7PageInitialized && (e && e.params.domCache || !e && i(t).parents(".popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal").length > 0)) return r.reinitPage(t), r.pluginHook("pageReinit", s), r.params.onPageReinit && r.params.onPageReinit(r, s), r.triggerPageCallbacks("reinit", s.name, s), void i(s.container).trigger("pageReinit page:reinit", {
                        page: s
                    });
                    t.f7PageInitialized = !0, t.f7PageData = s, !e || a.preloadOnly || a.reloadPrevious || (i(e.container).attr("data-page", s.name), e.activePage = s), r.pluginHook("pageBeforeInit", s), r.params.onPageBeforeInit && r.params.onPageBeforeInit(r, s), r.triggerPageCallbacks("beforeInit", s.name, s), i(s.container).trigger("pageBeforeInit page:beforeinit", {
                        page: s
                    }), r.initPage(t), r.pluginHook("pageInit", s), r.params.onPageInit && r.params.onPageInit(r, s), r.triggerPageCallbacks("init", s.name, s), i(s.container).trigger("pageInit page:init", {
                        page: s
                    })
                }


if(s.name!=null&&s.name.indexOf('jinsom-')==-1){ 
if(s.query.url){
if(jinsom.permalink_structure){//固定连接   
window.history.pushState(null,null,s.query.url+'#'+Math.random().toString(36).substr(2,5));     
}else{//朴素  
window.history.pushState(null,null,'/?p='+s.query.post_id+'#'+Math.random().toString(36).substr(2,5));      
}
}else{
window.history.pushState(null,null,'/?'+s.name+'&r='+Math.random().toString(36).substr(2,5));   
}
}//!=null



            }, r.pageRemoveCallback = function (e, a, t) {
                var n;
                if (a) {
                    a.f7PageData && (n = a.f7PageData.context);
                    var s = {
                        container: a,
                        name: i(a).attr("data-page"),
                        view: e,
                        url: a.f7PageData && a.f7PageData.url,
                        query: a.f7PageData && a.f7PageData.query,
                        navbarInnerContainer: a.f7PageData && a.f7PageData.navbarInnerContainer,
                        from: t,
                        context: n
                    };
                    r.pluginHook("pageBeforeRemove", s), r.params.onPageBeforeRemove && r.params.onPageBeforeRemove(r, s), r.triggerPageCallbacks("beforeRemove", s.name, s), i(s.container).trigger("pageBeforeRemove page:beforeremove", {
                        page: s
                    }), s = null
                }
            }, r.pageBackCallback = function (e, a, t) {
                var n, s = t.pageContainer;
                if (s) {
                    s.f7PageData && (n = s.f7PageData.context);
                    var o = {
                        container: s,
                        name: i(s).attr("data-page"),
                        url: s.f7PageData && s.f7PageData.url,
                        query: s.f7PageData && s.f7PageData.query,
                        view: a,
                        from: t.position,
                        context: n,
                        navbarInnerContainer: s.f7PageData && s.f7PageData.navbarInnerContainer,
                        swipeBack: t.swipeBack
                    };
                    "after" === e && (r.pluginHook("pageAfterBack", o), r.params.onPageAfterBack && r.params.onPageAfterBack(r, o), r.triggerPageCallbacks("afterBack", o.name, o), i(s).trigger("pageAfterBack page:afterback", {
                        page: o
                    })), "before" === e && (r.pluginHook("pageBack", o), r.params.onPageBack && r.params.onPageBack(r, o), r.triggerPageCallbacks("back", o.name, o), i(o.container).trigger("pageBack page:back", {
                        page: o
                    }))
                }
            }, r.pageAnimCallback = function (e, a, t) {
                var n, s = t.pageContainer;
                if (s) {
                    s.f7PageData && (n = s.f7PageData.context);
                    var o = t.query;
                    o || (o = t.url && t.url.indexOf("?") > 0 ? i.parseUrlQuery(t.url || "") : s.f7PageData && s.f7PageData.query ? s.f7PageData.query : {});
                    var l = {
                            container: s,
                            url: t.url,
                            query: o,
                            name: i(s).attr("data-page"),
                            view: a,
                            from: t.position,
                            context: n,
                            swipeBack: t.swipeBack,
                            navbarInnerContainer: s.f7PageData && s.f7PageData.navbarInnerContainer,
                            fromPage: t.fromPage
                        },
                        p = t.oldPage,
                        d = t.newPage;
                    if (s.f7PageData = l, "after" === e && (r.pluginHook("pageAfterAnimation", l), r.params.onPageAfterAnimation && r.params.onPageAfterAnimation(r, l), r.triggerPageCallbacks("afterAnimation", l.name, l), i(l.container).trigger("pageAfterAnimation page:afteranimation", {
                        page: l
                    })), "before" === e) {
                        i(a.container).attr("data-page", l.name), a && (a.activePage = l), d.hasClass("no-navbar") && !p.hasClass("no-navbar") && a.hideNavbar(), d.hasClass("no-navbar") || !p.hasClass("no-navbar") && !p.hasClass("no-navbar-by-scroll") || a.showNavbar(), d.hasClass("no-toolbar") && !p.hasClass("no-toolbar") && a.hideToolbar(), d.hasClass("no-toolbar") || !p.hasClass("no-toolbar") && !p.hasClass("no-toolbar-by-scroll") || a.showToolbar();
                        var c;
                        d.hasClass("no-tabbar") && !p.hasClass("no-tabbar") && (c = i(a.container).find(".tabbar"), 0 === c.length && (c = i(a.container).parents("." + r.params.viewsClass).find(".tabbar")), r.hideToolbar(c)), d.hasClass("no-tabbar") || !p.hasClass("no-tabbar") && !p.hasClass("no-tabbar-by-scroll") || (c = i(a.container).find(".tabbar"), 0 === c.length && (c = i(a.container).parents("." + r.params.viewsClass).find(".tabbar")), r.showToolbar(c)), p.removeClass("no-navbar-by-scroll no-toolbar-by-scroll"), r.pluginHook("pageBeforeAnimation", l), r.params.onPageBeforeAnimation && r.params.onPageBeforeAnimation(r, l), r.triggerPageCallbacks("beforeAnimation", l.name, l), i(l.container).trigger("pageBeforeAnimation page:beforeanimation", {
                            page: l
                        })
                    }
                }
            }, r.initPage = function (e) {
                e = i(e), 0 !== e.length && (r.sizeNavbars && r.sizeNavbars(e.parents("." + r.params.viewClass)[0]), r.initPageMessages && r.initPageMessages(e), r.initFormsStorage && r.initFormsStorage(e), r.initSmartSelects && r.initSmartSelects(e), r.initPageSwiper && r.initPageSwiper(e), r.initPullToRefresh && r.initPullToRefresh(e), r.initPageInfiniteScroll && r.initPageInfiniteScroll(e), r.initSearchbar && r.initSearchbar(e), r.initPageMessagebar && r.initPageMessagebar(e), r.initPageScrollToolbars && r.initPageScrollToolbars(e), r.initImagesLazyLoad && r.initImagesLazyLoad(e), r.initPageProgressbar && r.initPageProgressbar(e), r.initPageResizableTextarea && r.initPageResizableTextarea(e), r.initPageDataTables && r.initPageDataTables(e), r.params.material && r.initPageMaterialPreloader && r.initPageMaterialPreloader(e), r.params.material && r.initPageMaterialInputs && r.initPageMaterialInputs(e), r.params.material && r.initPageMaterialTabbar && r.initPageMaterialTabbar(e))
            }, r.reinitPage = function (e) {
                e = i(e), 0 !== e.length && (r.sizeNavbars && r.sizeNavbars(e.parents("." + r.params.viewClass)[0]), r.reinitPageSwiper && r.reinitPageSwiper(e), r.reinitLazyLoad && r.reinitLazyLoad(e))
            }, r.initPageWithCallback = function (e) {
                e = i(e);
                var a = e.parents("." + r.params.viewClass);
                if (0 !== a.length) {
                    var t = a[0].f7View || void 0,
                        n = t && t.url ? t.url : void 0;
                    a && e.attr("data-page") && a.attr("data-page", e.attr("data-page")), r.pageInitCallback(t, {
                        pageContainer: e[0],
                        url: n,
                        position: "center"
                    })
                }
            }, r.router = {
                _remove: function (e) {
                    r.params.routerRemoveTimeout || r.params.routerRemoveWithTimeout ? setTimeout(function () {
                        i(e).remove()
                    }, 0) : i(e).remove()
                }, _modalsSelector: ".popup, .modal, .popover, .actions-modal, .picker-modal, .login-screen",
                temporaryDom: document.createElement("div"),
                findElement: function (e, a, t, n) {
                    a = i(a), n && (e += ":not(.cached)");
                    var s = a.find(e).filter(function (e, a) {
                        return 0 === i(a).parents(r.router._modalsSelector).length
                    });
                    return s.length > 1 && ("string" == typeof t.selector && (s = a.find(t.selector + " " + e)), s.length > 1 && (s = a.find("." + r.params.viewMainClass + " " + e))), 1 === s.length ? s : (n || (s = r.router.findElement(e, a, t, !0)), s && 1 === s.length ? s : s && s.length > 1 ? i(s[0]) : void 0)
                }, animatePages: function (e, a, t) {
                    var r = "page-on-center page-on-right page-on-left";
                    "to-left" === t && (e.removeClass(r).addClass("page-from-center-to-left"), a.removeClass(r).addClass("page-from-right-to-center")), "to-right" === t && (e.removeClass(r).addClass("page-from-left-to-center"), a.removeClass(r).addClass("page-from-center-to-right"))
                }, prepareNavbar: function (e, a, t) {
                    i(e).find(".sliding").each(function () {
                        var e = i(this),
                            a = "right" === t ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
                        r.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(" + -a + "px,0,0)"), e.transform("translate3d(" + a + "px,0,0)")
                    })
                }, animateNavbars: function (e, a, t) {
                    var n = "navbar-on-right navbar-on-center navbar-on-left";
                    "to-left" === t && (a.removeClass(n).addClass("navbar-from-right-to-center"), a.find(".sliding").each(function () {
                        var e = i(this);
                        e.transform("translate3d(0px,0,0)"), r.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(0px,0,0)")
                    }), e.removeClass(n).addClass("navbar-from-center-to-left"), e.find(".sliding").each(function () {
                        var e, t = i(this);
                        r.params.animateNavBackIcon && (t.hasClass("center") && a.find(".sliding.left .back .icon").length > 0 && (e = a.find(".sliding.left .back span"), e.length > 0 && (this.f7NavbarLeftOffset += e[0].offsetLeft)), t.hasClass("left") && t.find(".back .icon").length > 0 && t.find(".back .icon").transform("translate3d(" + -this.f7NavbarLeftOffset + "px,0,0)")), t.transform("translate3d(" + this.f7NavbarLeftOffset + "px,0,0)")
                    })), "to-right" === t && (e.removeClass(n).addClass("navbar-from-left-to-center"), e.find(".sliding").each(function () {
                        var e = i(this);
                        e.transform("translate3d(0px,0,0)"), r.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(0px,0,0)")
                    }), a.removeClass(n).addClass("navbar-from-center-to-right"), a.find(".sliding").each(function () {
                        var e = i(this);
                        r.params.animateNavBackIcon && e.hasClass("left") && e.find(".back .icon").length > 0 && e.find(".back .icon").transform("translate3d(" + -this.f7NavbarRightOffset + "px,0,0)"), e.transform("translate3d(" + this.f7NavbarRightOffset + "px,0,0)")
                    }))
                }, preprocess: function (e, a, t, n) {
                    r.pluginHook("routerPreprocess", e, a, t, n), a = r.pluginProcess("preprocess", a), e && e.params && e.params.preprocess ? void 0 !== (a = e.params.preprocess(a, t, n)) && n(a) : r.params.preprocess ? void 0 !== (a = r.params.preprocess(a, t, n)) && n(a) : n(a)
                }, preroute: function (e, a, t) {
                    return t && (a.isBack = !0), r.pluginHook("routerPreroute", e, a), !!(r.params.preroute && !1 === r.params.preroute(e, a) || e && e.params.preroute && !1 === e.params.preroute(e, a))
                }, template7Render: function (e, a) {
                    var t, n, o = a.url,
                        l = a.content,
                        p = a.content,
                        d = a.context,
                        c = a.contextName,
                        m = a.template;
                    if ("string" == typeof l ? o ? r.template7Cache[o] && !a.ignoreCache ? n = s.cache[o] : (n = s.compile(l), s.cache[o] = n) : n = s.compile(l) : m && (n = m), d) t = d, d && o && (e.contextCache[o] = d);
                    else {
                        if (c)
                            if (c.indexOf(".") >= 0) {
                                for (var u = c.split("."), h = s.data[u[0]], f = 1; f < u.length; f++) u[f] && (h = h[u[f]]);
                                t = h
                            } else t = s.data[c];
                        if (!t && o && (t = s.data["url:" + o]), !t && "string" == typeof l && !m) {
                            var g = l.match(/(data-page=["'][^"^']*["'])/);
                            if (g) {
                                var v = g[0].split("data-page=")[1].replace(/['"]/g, "");
                                v && (t = s.data["page:" + v])
                            }
                        }
                        if (!t && m && s.templates)
                            for (var b in s.templates) s.templates[b] === m && (t = s.data[b]);
                        !t && o && o in e.contextCache && (t = e.contextCache[o]), t || (t = {})
                    } if (n && t) {
                        if ("function" == typeof t && (t = t()), o) {
                            var w = i.parseUrlQuery(o);
                            t.url_query = {};
                            for (var C in w) t.url_query[C] = w[C]
                        }
                        try {
                            p = n(t)
                        } catch (e) {
                            p = "", window.console && window.console.error && console.error(e)
                        }
                    }
                    return {
                        content: p,
                        context: t
                    }
                }
            }, r.router._load = function (e, a) {
                function t() {
                    e.allowPageChange = !0, n.removeClass("page-from-right-to-center page-on-right page-on-left").addClass("page-on-center"), s.removeClass("page-from-center-to-left page-on-center page-on-right").addClass("page-on-left"), m && (d.removeClass("navbar-from-right-to-center navbar-on-left navbar-on-right").addClass("navbar-on-center"), p.removeClass("navbar-from-center-to-left navbar-on-center navbar-on-right").addClass("navbar-on-left")), r.pageAnimCallback("after", e, {
                        pageContainer: n[0],
                        url: h,
                        position: "right",
                        oldPage: s,
                        newPage: n,
                        query: a.query,
                        fromPage: s && s.length && s[0].f7PageData
                    }), r.params.pushState && e.main && r.pushStateClearQueue(), e.params.swipeBackPage || e.params.preloadPreviousPage || (e.params.domCache ? (s.addClass("cached"), m && p.addClass("cached")) : 0 === h.indexOf("#") && 0 === n.attr("data-page").indexOf("smart-select-") || (r.pageRemoveCallback(e, s[0], "left"), m && r.navbarRemoveCallback(e, s[0], c[0], p[0]), r.router._remove(s), m && r.router._remove(p))), e.params.uniqueHistory && O && e.refreshPreviousPage()
                }
                r.pluginHook("routerLoad", e, a);
                var n, s, o, l, p, d, c, m, u, h = a.url,
                    f = a.content,
                    g = {
                        content: a.content
                    },
                    v = a.template,
                    b = a.pageName,
                    w = i(e.container),
                    C = i(e.pagesContainer),
                    y = a.animatePages,
                    x = void 0 === h && f || v,
                    T = a.pushState,
                    k = a.pageElement;
                if (void 0 === y && (y = e.params.animatePages), (r.params.template7Pages && "string" == typeof f || v) && (g = r.router.template7Render(e, a), g.content && !f && (f = g.content)), r.router.temporaryDom.innerHTML = "", !b && !k)
                    if ("string" == typeof f || h && "string" == typeof f) r.router.temporaryDom.innerHTML = g.content;
                    else if ("length" in f && f.length > 1)
                    for (var P = 0; P < f.length; P++) i(r.router.temporaryDom).append(f[P]);
                else i(r.router.temporaryDom).append(f); if (u = a.reload && (a.reloadPrevious ? "left" : "center"), !(n = b ? C.find('.page[data-page="' + b + '"]') : k ? i(k) : r.router.findElement(".page", r.router.temporaryDom, e)) || 0 === n.length || b && e.activePage && e.activePage.name === b) return void(e.allowPageChange = !0);
                if (n.addClass(a.reload ? "page-on-" + u : "page-on-right"), o = C.children(".page:not(.cached)"), k && (o = o.filter(function (e, a) {
                    if (a !== k) return a
                })), a.reload && a.reloadPrevious && 1 === o.length) return void(e.allowPageChange = !0);
                if (a.reload) s = o.eq(o.length - 1);
                else {
                    if (o.length > 1) {
                        for (l = 0; l < o.length - 2; l++) e.params.domCache ? i(o[l]).addClass("cached") : (r.pageRemoveCallback(e, o[l], "left"), r.router._remove(o[l]));
                        e.params.domCache ? i(o[l]).addClass("cached") : (r.pageRemoveCallback(e, o[l], "left"), r.router._remove(o[l]))
                    }
                    s = C.children(".page:not(.cached)")
                } if (k && s.length > 1 && (s = s.filter(function (e, a) {
                    if (a !== k) return a
                })), (e.params.domCache || k) && n.removeClass("cached"), e.params.dynamicNavbar)
                    if (m = !0, d = b ? w.find('.navbar-inner[data-page="' + b + '"]') : r.router.findElement(".navbar-inner", r.router.temporaryDom, e), d && 0 !== d.length || (d = n.find(".navbar-inner"), d && 0 !== d.length ? d.parent(".navbar").length > 0 && d.prependTo(n) : m = !1), m && n.find(".navbar").length > 0 && r.router._remove(n.find(".navbar").filter(function (e, a) {
                        return 0 === i(a).parents(r.router._modalsSelector).length
                    })), c = w.children(".navbar"), a.reload) p = c.find(".navbar-inner:not(.cached):last-child");
                    else if (p = c.find(".navbar-inner:not(.cached)"), p.length > 0) {
                    for (l = 0; l < p.length - 1; l++) e.params.domCache ? i(p[l]).addClass("cached") : (r.navbarRemoveCallback(e, o[l], c[0], p[l]), r.router._remove(p[l]));
                    d || 1 !== p.length || (e.params.domCache ? i(p[0]).addClass("cached") : (r.navbarRemoveCallback(e, o[0], c[0], p[0]), r.router._remove(p[0]))), p = c.find(".navbar-inner:not(.cached)")
                }
                if (m && (d.addClass(a.reload ? "navbar-on-" + u : "navbar-on-right"), (e.params.domCache || k) && d.removeClass("cached"), n[0].f7RelatedNavbar = d[0], d[0].f7RelatedPage = n[0]), h) h && k && (e.pageElementsCache[h] = {
                    page: n,
                    navbarInner: d
                });
                else {
                    var S = b || n.attr("data-page");
                    h = x ? "#" + r.params.dynamicPageUrl.replace(/{{name}}/g, S).replace(/{{index}}/g, e.history.length - (a.reload ? 1 : 0)) : "#" + S, e.params.domCache || (e.contentCache[h] = f), e.params.domCache && b && (e.pagesCache[h] = b)
                } if (r.params.pushState && !a.reloadPrevious && e.main) {
                    void 0 === T && (T = !0);
                    var M = r.params.pushStateRoot || "",
                        I = a.reload ? "replaceState" : "pushState";
                    T && (x || b ? x && f ? history[I]({
                        content: "string" == typeof f ? f : "",
                        url: h,
                        viewIndex: r.views.indexOf(e)
                    }, "", M + r.params.pushStateSeparator + h) : b && history[I]({
                        pageName: b,
                        url: h,
                        viewIndex: r.views.indexOf(e)
                    }, "", M + r.params.pushStateSeparator + h) : history[I]({
                        url: h,
                        viewIndex: r.views.indexOf(e)
                    }, "", M + r.params.pushStateSeparator + h))
                }
                if (e.url = h, a.reload) {
                    var E = e.history[e.history.length - (a.reloadPrevious ? 2 : 1)];
                    E && 0 === E.indexOf("#") && E in e.contentCache && E !== h && -1 === e.history.indexOf(E) ? (e.contentCache[E] = null, delete e.contentCache[E]) : E && E in e.pageElementsCache && E !== h && (-1 === e.history.indexOf(E) || e.history.indexOf(E) === e.history.length - 1) && (e.pageElementsCache[E] = null, delete e.pageElementsCache[E]), E && E in e.contextCache && E !== h && (-1 === e.history.indexOf(E) || e.history.indexOf(E) === e.history.length - 1) && (e.contextCache[E] = null, delete e.contextCache[E]), e.history[e.history.length - (a.reloadPrevious ? 2 : 1)] = h
                } else e.history.push(h);
                var O = !1;
                if (e.params.uniqueHistory) {
                    var L = e.history,
                        z = h;
                    if (e.params.uniqueHistoryIgnoreGetParameters)
                        for (L = [], z = h.split("?")[0], l = 0; l < e.history.length; l++) L.push(e.history[l].split("?")[0]);
                    L.indexOf(z) !== L.lastIndexOf(z) && (e.history = e.history.slice(0, L.indexOf(z)), e.history.push(h), O = !0)
                }
                if (a.reloadPrevious ? (s = s.prev(".page"), n.insertBefore(s), m && (p = p.prev(".navbar-inner"), d.insertAfter(p))) : (C.append(n[0]), m && c.append(d[0])), a.reload && (e.params.domCache && e.initialPages.indexOf(s[0]) >= 0 ? (s.addClass("cached"), m && p.addClass("cached")) : (r.pageRemoveCallback(e, s[0], u), m && r.navbarRemoveCallback(e, s[0], c[0], p[0]), r.router._remove(s), m && r.router._remove(p))), r.pageInitCallback(e, {
                    pageContainer: n[0],
                    url: h,
                    position: a.reload ? u : "right",
                    navbarInnerContainer: m ? d && d[0] : void 0,
                    oldNavbarInnerContainer: m ? p && p[0] : void 0,
                    context: g.context || a.context,
                    query: a.query,
                    fromPage: s && s.length && s[0].f7PageData,
                    reload: a.reload,
                    reloadPrevious: a.reloadPrevious
                }), m && r.navbarInitCallback(e, n[0], c[0], d[0], h, a.reload ? u : "right"), a.reload) return e.allowPageChange = !0, void(O && e.refreshPreviousPage());
                m && y && r.router.prepareNavbar(d, p, "right"), n[0].clientLeft, r.pageAnimCallback("before", e, {
                    pageContainer: n[0],
                    url: h,
                    position: "right",
                    oldPage: s,
                    newPage: n,
                    query: a.query,
                    fromPage: s && s.length && s[0].f7PageData
                }), y ? (r.params.material && r.params.materialPageLoadDelay ? setTimeout(function () {
                    r.router.animatePages(s, n, "to-left", e)
                }, r.params.materialPageLoadDelay) : r.router.animatePages(s, n, "to-left", e), m && setTimeout(function () {
                    r.router.animateNavbars(p, d, "to-left", e)
                }, 0), n.animationEnd(function () {
                    t()
                })) : (m && d.find(".sliding, .sliding .back .icon").transform(""), t())
            }, r.router.load = function (e, a) {
                function t(t) {
                    r.router.preprocess(e, t, n, function (t) {
                        a.content = t, r.router._load(e, a)
                    })
                }
                if (a = a || {}, r.routerPreOptions && (a = r.routerPreOptions(e, a) || {}), !a.component || !r.componentLoader) {
                    if (r.router.preroute(e, a)) return !1;
                    var n = a.url,
                        s = a.content,
                        o = a.pageName,
                        l = a.pageElement;
                    o && o.indexOf("?") > 0 && (a.query = i.parseUrlQuery(o), a.pageName = o = o.split("?")[0]);
                    var p = a.template;
                    return !0 === e.params.reloadPages && (a.reload = !0), !!e.allowPageChange && (!(n && e.url === n && !a.reload && !e.params.allowDuplicateUrls) && (e.allowPageChange = !1, r.xhr && e.xhr && e.xhr === r.xhr && (r.xhr.abort(), r.xhr = !1), s || o || l ? void t(s) : p ? void r.router._load(e, a) : a.url && "#" !== a.url ? void r.get(a.url, e, a.ignoreCache, function (a, r) {
                        if (r) return void(e.allowPageChange = !0);
                        t(a)
                    }) : void(e.allowPageChange = !0)))
                }
                try {
                    r.componentLoader(e, a, function (a) {
                        r.router.load(e, a)
                    })
                } catch (e) {}
            }, r.router._back = function (e, a) {
                function t() {
                    r.pageBackCallback("after", e, {
                        pageContainer: l[0],
                        url: f,
                        position: "center",
                        oldPage: l,
                        newPage: p
                    }), r.pageAnimCallback("after", e, {
                        pageContainer: p[0],
                        url: f,
                        position: "left",
                        oldPage: l,
                        newPage: p,
                        query: a.query,
                        fromPage: l && l.length && l[0].f7PageData
                    }), r.router.afterBack(e, l[0], p[0])
                }

                function n() {
                    r.pageBackCallback("before", e, {
                        pageContainer: l[0],
                        url: f,
                        position: "center",
                        oldPage: l,
                        newPage: p
                    }), r.pageAnimCallback("before", e, {
                        pageContainer: p[0],
                        url: f,
                        position: "left",
                        oldPage: l,
                        newPage: p,
                        query: a.query,
                        fromPage: l && l.length && l[0].f7PageData
                    }), w ? (r.router.animatePages(p, l, "to-right", e), h && setTimeout(function () {
                        r.router.animateNavbars(c, d, "to-right", e)
                    }, 0), p.animationEnd(function () {
                        t()
                    })) : (h && c.find(".sliding, .sliding .back .icon").transform(""), t())
                }

                function s() {
                    if (r.router.temporaryDom.innerHTML = "", "string" == typeof g || f && "string" == typeof g) r.router.temporaryDom.innerHTML = v.content;
                    else if ("length" in g && g.length > 1)
                        for (var a = 0; a < g.length; a++) i(r.router.temporaryDom).append(g[a]);
                    else i(r.router.temporaryDom).append(g);
                    p = k ? i(k) : r.router.findElement(".page", r.router.temporaryDom, e), e.params.dynamicNavbar && (c = r.router.findElement(".navbar-inner", r.router.temporaryDom, e))
                }

                function o() {
                    if (!p || 0 === p.length) return void(e.allowPageChange = !0);
                    if (e.params.dynamicNavbar && void 0 === h && (h = !(!c || 0 === c.length)), p.addClass("page-on-left").removeClass("cached"), h && (m = P.children(".navbar"), u = m.find(".navbar-inner:not(.cached)"), c.addClass("navbar-on-left").removeClass("cached")), x) {
                        var t, s;
                        if (t = i(M[M.length - 2]), h && (s = i(t[0] && t[0].f7RelatedNavbar || u[u.length - 2])), e.params.domCache && e.initialPages.indexOf(t[0]) >= 0) t.length && t[0] !== p[0] && t.addClass("cached"), h && s.length && s[0] !== c[0] && s.addClass("cached");
                        else {
                            var o = h && s.length;
                            t.length ? (r.pageRemoveCallback(e, t[0], "right"), o && r.navbarRemoveCallback(e, t[0], m[0], s[0]), r.router._remove(t), o && r.router._remove(s)) : o && (r.navbarRemoveCallback(e, t[0], m[0], s[0]), r.router._remove(s))
                        }
                        M = S.children(".page:not(.cached)"), h && (u = P.children(".navbar").find(".navbar-inner:not(.cached)")), e.history.indexOf(f) >= 0 ? e.history = e.history.slice(0, e.history.indexOf(f) + 2) : e.history[[e.history.length - 2]] ? e.history[e.history.length - 2] = f : e.history.unshift(f)
                    }
                    if (l = i(M[M.length - 1]), e.params.domCache && l[0] === p[0] && (l = S.children(".page.page-on-center"), 0 === l.length && e.activePage && (l = i(e.activePage.container))), h && !d && (d = i(u[u.length - 1]), e.params.domCache && (d[0] === c[0] && (d = m.children(".navbar-inner.navbar-on-center:not(.cached)")), 0 === d.length && (d = m.children('.navbar-inner[data-page="' + l.attr("data-page") + '"]'))), 0 !== d.length && c[0] !== d[0] || (h = !1)), h && (I && c.insertBefore(d), c[0].f7RelatedPage = p[0], p[0].f7RelatedNavbar = c[0]), I && p.insertBefore(l), r.pageInitCallback(e, {
                        pageContainer: p[0],
                        url: f,
                        position: "left",
                        navbarInnerContainer: h ? c[0] : void 0,
                        oldNavbarInnerContainer: h ? d && d[0] : void 0,
                        context: v.context,
                        query: a.query,
                        fromPage: l && l.length && l[0].f7PageData,
                        preloadOnly: C
                    }), h && r.navbarInitCallback(e, p[0], m[0], c[0], f, "right"), h && c.hasClass("navbar-on-left") && w && r.router.prepareNavbar(c, d, "left"), C) return void(e.allowPageChange = !0);
                    e.url = f, p[0].clientLeft, n(), r.params.pushState && e.main && (void 0 === y && (y = !0), !C && history.state && y && history.back())
                }
                a = a || {}, r.pluginHook("routerBack", e, a);
                var l, p, d, c, m, u, h, f = a.url,
                    g = a.content,
                    v = {
                        content: a.content
                    },
                    b = a.template,
                    w = a.animatePages,
                    C = a.preloadOnly,
                    y = a.pushState,
                    x = (a.ignoreCache, a.force),
                    T = a.pageName,
                    k = a.pageElement,
                    P = i(e.container),
                    S = i(e.pagesContainer),
                    M = S.children(".page:not(.cached)"),
                    I = !0;
                return void 0 === w && (w = e.params.animatePages), (r.params.template7Pages && "string" == typeof g || b) && (v = r.router.template7Render(e, a), v.content && !g && (g = v.content)), M.length > 1 && !x ? C ? void(e.allowPageChange = !0) : (e.url = e.history[e.history.length - 2], f = e.url, p = i(M[M.length - 2]), l = i(M[M.length - 1]), e.params.dynamicNavbar && (h = !0, u = P.children(".navbar").find(".navbar-inner:not(.cached)"), c = i(u[0]), d = i(u[1]), 0 !== c.length && 0 !== d.length && d[0] !== c[0] || (h = !1)), I = !1, void o()) : x ? f && f === e.url || T && e.activePage && e.activePage.name === T ? void(e.allowPageChange = !0) : g ? (s(), void o()) : T && e.params.domCache ? (T && (f = "#" + T), p = i(P).find('.page[data-page="' + T + '"]'), p[0].f7PageData && p[0].f7PageData.url && (f = p[0].f7PageData.url), e.params.dynamicNavbar && (c = i(P).children(".navbar").find('.navbar-inner[data-page="' + T + '"]'), 0 === c.length && p[0].f7RelatedNavbar && (c = i(p[0].f7RelatedNavbar)), 0 === c.length && p[0].f7PageData && (c = i(p[0].f7PageData.navbarInnerContainer))), void o()) : k && f ? (p = i(k), e.params.dynamicNavbar && (c = p.find(".navbar-inner").filter(function (e, a) {
                    return 0 === i(a).parents(r.router._modalsSelector).length
                }), c.length > 0 && (p.prepend(c), r.router._remove(p.find(".navbar").filter(function (e, a) {
                    return 0 === i(a).parents(r.router._modalsSelector).length
                })))), void o()) : void(e.allowPageChange = !0) : (C || (e.url = e.history[e.history.length - 2], f = e.url), g ? (s(), void o()) : T ? (p = i(P).find('.page[data-page="' + T + '"]'), e.params.dynamicNavbar && (c = i(P).children(".navbar").find('.navbar-inner[data-page="' + T + '"]'), 0 === c.length && p[0].f7RelatedNavbar && (c = i(p[0].f7RelatedNavbar)), 0 === c.length && p[0].f7PageData && (c = i(p[0].f7PageData.navbarInnerContainer))), void o()) : f && f in e.pageElementsCache ? (p = e.pageElementsCache[f].page, c = e.pageElementsCache[f].navbarInner, void o()) : void(e.allowPageChange = !0))
            }, r.router.back = function (e, a) {
                function t(t) {
                    r.router.preprocess(e, t, n, function (t) {
                        a.content = t, r.router._back(e, a)
                    })
                }
                if (a = a || {}, r.routerPreOptions && (a = r.routerPreOptions(e, a) || {}), a.component && r.componentLoader) try {
                    r.componentLoader(e, a, function (a) {
                        r.router.load(e, a)
                    })
                } catch (e) {} else {
                    if (r.router.preroute(e, a, !0)) return !1;
                    var n = a.url,
                        s = a.content,
                        o = a.pageName,
                        l = a.pageElement;
                    o && o.indexOf("?") > 0 && (a.query = i.parseUrlQuery(o), a.pageName = o = o.split("?")[0]);
                    var p = a.force;
                    if (!e.allowPageChange) return !1;
                    if (e.allowPageChange = !1, r.xhr && e.xhr && e.xhr === r.xhr && (r.xhr.abort(), r.xhr = !1), i(e.pagesContainer).find(".page:not(.cached)").length > 1 && !p) return void r.router._back(e, a);
                    if (p) {
                        if (!n && s) return void t(s);
                        if (!n && o) return o && (n = "#" + o), void t();
                        if (n && l) return void t();
                        if (n) return void r.get(a.url, e, a.ignoreCache, function (a, r) {
                            if (r) return void(e.allowPageChange = !0);
                            t(a)
                        })
                    } else {
                        if (n = e.history[e.history.length - 2] || a.url, a.url || (a.url = n), !n) return void(e.allowPageChange = !0);
                        if (0 === n.indexOf("#") && e.contentCache[n]) return void t(e.contentCache[n]);
                        if (0 === n.indexOf("#") && e.params.domCache) return o || (a.pageName = n.split("#")[1]), void t();
                        if (n && n in e.pageElementsCache) t();
                        else if (0 !== n.indexOf("#")) return void r.get(a.url, e, a.ignoreCache, function (a, r) {
                            if (r) return void(e.allowPageChange = !0);
                            t(a)
                        })
                    }
                    e.allowPageChange = !0
                }
            }, r.router.afterBack = function (e, a, t) {
                a = i(a), t = i(t), e.params.domCache && e.initialPages.indexOf(a[0]) >= 0 ? a.removeClass("page-from-center-to-right").addClass("cached") : (r.pageRemoveCallback(e, a[0], "right"), r.router._remove(a)), t.removeClass("page-from-left-to-center page-on-left").addClass("page-on-center"), e.allowPageChange = !0;
                var n, s = e.history.pop();
                if (e.params.dynamicNavbar) {
                    var o = i(e.container).children(".navbar").find(".navbar-inner:not(.cached)"),
                        l = i(a[0].f7RelatedNavbar || o[1]);
                    e.params.domCache && e.initialNavbars.indexOf(l[0]) >= 0 ? l.removeClass("navbar-from-center-to-right").addClass("cached") : (r.navbarRemoveCallback(e, a[0], void 0, l[0]), r.router._remove(l)), n = i(o[0]).removeClass("navbar-on-left navbar-from-left-to-center").addClass("navbar-on-center")
                }
                if (e.params.domCache && i(e.container).find(".page.cached").each(function () {
                    var a = i(this),
                        t = a[0].f7PageData && a[0].f7PageData.url;
                    t && e.history.indexOf(t) < 0 && e.initialPages.indexOf(this) < 0 && (r.pageRemoveCallback(e, a[0], "right"), a[0].f7RelatedNavbar && e.params.dynamicNavbar && r.navbarRemoveCallback(e, a[0], void 0, a[0].f7RelatedNavbar), r.router._remove(a), a[0].f7RelatedNavbar && e.params.dynamicNavbar && r.router._remove(a[0].f7RelatedNavbar))
                }), !e.params.domCache && s && s.indexOf("#") > -1 && s in e.contentCache && -1 === e.history.indexOf(s) && (e.contentCache[s] = null, delete e.contentCache[s]), s && s in e.pageElementsCache && -1 === e.history.indexOf(s) && (e.pageElementsCache[s] = null, delete e.pageElementsCache[s]), s && s in e.contextCache && -1 === e.history.indexOf(s) && (e.contextCache[s] = null, delete e.contextCache[s]), r.params.pushState && e.main && r.pushStateClearQueue(), e.params.preloadPreviousPage)
                    if (e.params.domCache && e.history.length > 1) {
                        var p, d, c = e.history[e.history.length - 2];
                        c && e.pagesCache[c] ? (p = i(e.container).find('.page[data-page="' + e.pagesCache[c] + '"]'), p.next(".page")[0] !== t[0] && p.insertBefore(t), n && (d = i(e.container).children(".navbar").find('.navbar-inner[data-page="' + e.pagesCache[c] + '"]'), d && 0 !== d.length || (d = n.prev(".navbar-inner.cached")), d.next(".navbar-inner")[0] !== n[0] && d.insertBefore(n))) : (p = t.prev(".page.cached"), n && (d = n.prev(".navbar-inner.cached"))),
                            p && p.length > 0 && p.removeClass("cached page-on-right page-on-center").addClass("page-on-left"), d && d.length > 0 && d.removeClass("cached navbar-on-right navbar-on-center").addClass("navbar-on-left")
                    } else r.router.back(e, {
                        preloadOnly: !0
                    })
            };
            var m = document.createElement("div");
            r.modalStack = [], r.modalStackClearQueue = function () {
                r.modalStack.length && r.modalStack.shift()()
            }, r.modal = function (e) {
                e = e || {};
                var a = "";
                if (r.params.modalTemplate) r._compiledTemplates.modal || (r._compiledTemplates.modal = s.compile(r.params.modalTemplate)), a = r._compiledTemplates.modal(e);
                else {
                    var t = "";
                    if (e.buttons && e.buttons.length > 0)
                        for (var n = 0; n < e.buttons.length; n++) t += '<span class="modal-button' + (e.buttons[n].bold ? " modal-button-bold" : "") + '">' + e.buttons[n].text + "</span>";
                    var o = e.title ? '<div class="modal-title">' + e.title + "</div>" : "",
                        l = e.text ? '<div class="modal-text">' + e.text + "</div>" : "",
                        p = e.afterText ? e.afterText : "",
                        d = e.buttons && 0 !== e.buttons.length ? "" : "modal-no-buttons",
                        c = e.verticalButtons ? "modal-buttons-vertical" : "",
                        u = e.buttons && e.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + e.buttons.length + " " + c + '">' + t + "</div>" : "";
                    a = '<div class="modal ' + d + " " + (e.cssClass || "") + '"><div class="modal-inner">' + (o + l + p) + "</div>" + u + "</div>"
                }
                m.innerHTML = a;
                var h = i(m).children();
                return r.root.append(h[0]), h.find(".modal-button").each(function (a, t) {
                    i(t).on("click", function (t) {
                        !1 !== e.buttons[a].close && r.closeModal(h), e.buttons[a].onClick && e.buttons[a].onClick(h, t), e.onClick && e.onClick(h, a)
                    })
                }), r.openModal(h), h[0]
            }, r.alert = function (e, a, t) {
                return "function" == typeof a && (t = arguments[1], a = void 0), r.modal({
                    text: e || "",
                    title: void 0 === a ? r.params.modalTitle : a,
                    buttons: [{
                        text: r.params.modalButtonOk,
                        bold: !0,
                        onClick: t
                    }]
                })
            }, r.confirm = function (e, a, t, n) {
                return "function" == typeof a && (n = arguments[2], t = arguments[1], a = void 0), r.modal({
                    text: e || "",
                    title: void 0 === a ? r.params.modalTitle : a,
                    buttons: [{
                        text: r.params.modalButtonCancel,
                        onClick: n
                    }, {
                        text: r.params.modalButtonOk,
                        bold: !0,
                        onClick: t
                    }]
                })
            }, r.prompt = function (e, a, t, n) {
                return "function" == typeof a && (n = arguments[2], t = arguments[1], a = void 0), r.modal({
                    text: e || "",
                    title: void 0 === a ? r.params.modalTitle : a,
                    afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
                    buttons: [{
                        text: r.params.modalButtonCancel
                    }, {
                        text: r.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function (e, a) {
                        0 === a && n && n(i(e).find(".modal-text-input").val()), 1 === a && t && t(i(e).find(".modal-text-input").val())
                    }
                })
            }, r.modalLogin = function (e, a, t, n) {
                return "function" == typeof a && (n = arguments[2], t = arguments[1], a = void 0), r.modal({
                    text: e || "",
                    title: void 0 === a ? r.params.modalTitle : a,
                    afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + r.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + r.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                    buttons: [{
                        text: r.params.modalButtonCancel
                    }, {
                        text: r.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function (e, a) {
                        var r = i(e).find('.modal-text-input[name="modal-username"]').val(),
                            s = i(e).find('.modal-text-input[name="modal-password"]').val();
                        0 === a && n && n(r, s), 1 === a && t && t(r, s)
                    }
                })
            }, r.modalPassword = function (e, a, t, n) {
                return "function" == typeof a && (n = arguments[2], t = arguments[1], a = void 0), r.modal({
                    text: e || "",
                    title: void 0 === a ? r.params.modalTitle : a,
                    afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + r.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                    buttons: [{
                        text: r.params.modalButtonCancel
                    }, {
                        text: r.params.modalButtonOk,
                        bold: !0
                    }],
                    onClick: function (e, a) {
                        var r = i(e).find('.modal-text-input[name="modal-password"]').val();
                        0 === a && n && n(r), 1 === a && t && t(r)
                    }
                })
            }, r.showPreloader = function (e) {
                return r.modal({
                    title: e || r.params.modalPreloaderTitle,
                    text: '<div class="preloader">' + (r.params.material ? r.params.materialPreloaderHtml : "") + "</div>",
                    cssClass: "modal-preloader"
                })
            }, r.hidePreloader = function () {
                r.closeModal(".modal-preloader")
            }, r.showIndicator = function () {
                i(".preloader-indicator-overlay").length > 0 || r.root.append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><div class="jinsom-load"><div class="jinsom-loading"><i></i><i></i><i></i></div></div></div>')
            }, r.hideIndicator = function () {
                i(".preloader-indicator-overlay, .preloader-indicator-modal").remove()
            }, r.actions = function (e, a, t) {
                var n, o, l, p = !1;
                1 === arguments.length || 2 === arguments.length && "boolean" == typeof arguments[1] ? (a = arguments[0], t = arguments[1]) : r.device.ios ? r.device.ipad && (p = !0) : r.width >= 768 && (p = !0), void 0 === t && (t = !0), a = a || [], a.length > 0 && !Array.isArray(a[0]) && (a = [a]);
                var d;
                if (p) {
                    var c = r.params.modalActionsToPopoverTemplate || '<div class="popover actions-popover"><div class="popover-inner">{{#each this}}<div class="list-block"><ul>{{#each this}}{{#if label}}<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>{{else}}<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>{{/if}}{{/each}}</ul></div>{{/each}}</div></div>';
                    r._compiledTemplates.actionsToPopover || (r._compiledTemplates.actionsToPopover = s.compile(c));
                    var u = r._compiledTemplates.actionsToPopover(a);
                    n = i(r.popover(u, e, !0, t)), o = ".list-block ul", l = ".list-button"
                } else {
                    if (r.params.modalActionsTemplate) r._compiledTemplates.actions || (r._compiledTemplates.actions = s.compile(r.params.modalActionsTemplate)), d = r._compiledTemplates.actions(a);
                    else {
                        for (var h = "", f = 0; f < a.length; f++)
                            for (var g = 0; g < a[f].length; g++) {
                                0 === g && (h += '<div class="actions-modal-group">');
                                var v = a[f][g],
                                    b = v.label ? "actions-modal-label" : "actions-modal-button";
                                v.bold && (b += " actions-modal-button-bold"), v.color && (b += " color-" + v.color), v.bg && (b += " bg-" + v.bg), v.disabled && (b += " disabled"), h += '<div class="' + b + '">' + v.text + "</div>", g === a[f].length - 1 && (h += "</div>")
                            }
                        d = '<div class="actions-modal">' + h + "</div>"
                    }
                    m.innerHTML = d, n = i(m).children(), r.root.append(n[0]), o = ".actions-modal-group", l = ".actions-modal-button"
                }
                return n.find(o).each(function (e, t) {
                    var s = e;
                    i(t).children().each(function (e, t) {
                        var o, d = e,
                            c = a[s][d];
                        !p && i(t).is(l) && (o = i(t)), p && i(t).find(l).length > 0 && (o = i(t).find(l)), o && o.on("click", function (e) {
                            !1 !== c.close && r.closeModal(n), c.onClick && c.onClick(n, e)
                        })
                    })
                }), p || r.openModal(n, t), n[0]
            }, r.popover = function (e, a, t, n, s) {
                function o() {
                    e.css({
                        left: "",
                        top: ""
                    });
                    var t, n, i, s = e.width(),
                        o = e.height(),
                        l = 0;
                    p ? e.removeClass("popover-on-left popover-on-right popover-on-top popover-on-bottom").css({
                        left: "",
                        top: ""
                    }) : (t = e.find(".popover-angle"), l = t.width() / 2, t.removeClass("on-left on-right on-top on-bottom").css({
                        left: "",
                        top: ""
                    }));
                    var d = a.outerWidth(),
                        c = a.outerHeight(),
                        m = a.offset(),
                        u = m.left - r.left,
                        h = m.top - r.top,
                        f = a.parents(".page");
                    f.length > 0 && (h -= f[0].scrollTop);
                    var g = 0,
                        v = 0,
                        b = 0,
                        w = p ? "bottom" : "top";
                    if (p)
                        if (o < r.height - h - c ? (w = "bottom", g = h) : o < h ? (g = h - o + c, w = "top") : (w = "bottom", g = h), g <= 0 ? g = 8 : g + o >= r.height && (g = r.height - o - 8), v = u, v + s >= r.width - 8 && (v = u + d - s - 8), v < 8 && (v = 8), "top" === w && e.addClass("popover-on-top"), "bottom" === w && e.addClass("popover-on-bottom"), a.hasClass("floating-button-to-popover") && !e.hasClass("modal-in")) {
                            e.addClass("popover-floating-button");
                            var C = v + s / 2 - (u + d / 2),
                                y = g + o / 2 - (h + c / 2);
                            a.addClass("floating-button-to-popover-in").transform("translate3d(" + C + "px, " + y + "px,0)").transitionEnd(function (e) {
                                a.hasClass("floating-button-to-popover-in") && a.addClass("floating-button-to-popover-scale").transform("translate3d(" + C + "px, " + y + "px,0) scale(" + s / d + ", " + o / c + ")")
                            }), e.once("popover:close", function () {
                                a.removeClass("floating-button-to-popover-in floating-button-to-popover-scale").addClass("floating-button-to-popover-out").transform("").transitionEnd(function (e) {
                                    a.removeClass("floating-button-to-popover-out")
                                })
                            }), e.once("popover:closed", function () {
                                e.removeClass("popover-floating-button")
                            })
                        } else a.hasClass("floating-button-to-popover") && e.hasClass("modal-in") && (v = u, g = h);
                    else o + l < h ? g = h - o - l : o + l < r.height - h - c ? (w = "bottom", g = h + c + l) : (w = "middle", g = c / 2 + h - o / 2, b = g, g <= 0 ? g = 5 : g + o >= r.height && (g = r.height - o - 5), b -= g), "top" === w || "bottom" === w ? (v = d / 2 + u - s / 2, b = v, v < 5 && (v = 5), v + s > r.width && (v = r.width - s - 5), "top" === w && t.addClass("on-bottom"), "bottom" === w && t.addClass("on-top"), b -= v, n = s / 2 - l + b, n = Math.max(Math.min(n, s - 2 * l - 13), 13), t.css({
                        left: n + "px"
                    })) : "middle" === w && (v = u - s - l, t.addClass("on-right"), (v < 5 || v + s > r.width) && (v < 5 && (v = u + d + l), v + s > r.width && (v = r.width - s - 5), t.removeClass("on-right").addClass("on-left")), i = o / 2 - l + b, i = Math.max(Math.min(i, o - 2 * l - 13), 13), t.css({
                        top: i + "px"
                    }));
                    e.css({
                        top: g + "px",
                        left: v + "px"
                    })
                }
                if (void 0 === t && (t = !0), void 0 === s && (s = !0), void 0 === n && (n = !0), "string" == typeof e && e.indexOf("<") >= 0) {
                    var l = document.createElement("div");
                    if (l.innerHTML = e.trim(), !(l.childNodes.length > 0)) return !1;
                    e = l.childNodes[0], t && e.classList.add("remove-on-close"), s || e.classList.add("ignore-close-by-outside"), r.root.append(e)
                }
                if (e = i(e), a = i(a), 0 === e.length || 0 === a.length) return !1;
                0 === e.parents("body").length && (t && e.addClass("remove-on-close"), s || e.addClass.add("ignore-close-by-outside"), r.root.append(e[0])), 0 !== e.find(".popover-angle").length || r.params.material || e.append('<div class="popover-angle"></div>'), e.show();
                var p = r.params.material;
                return o(), r.onResize(o), e.on("popover:close", function () {
                    r.offResize(o)
                }), r.openModal(e, n), e[0]
            }, r.popup = function (e, a, t) {
                if (void 0 === a && (a = !0), void 0 === t && (t = !0), "string" == typeof e && e.indexOf("<") >= 0) {
                    var n = document.createElement("div");
                    if (n.innerHTML = e.trim(), !(n.childNodes.length > 0)) return !1;
                    e = n.childNodes[0], a && e.classList.add("remove-on-close"), r.root.append(e)
                }
                return e = i(e), 0 !== e.length && (0 === e.parents("body").length && (a && e.addClass("remove-on-close"), r.root.append(e[0])), e.show(), r.openModal(e, t), e[0])
            }, r.pickerModal = function (e, a, t) {
                if (void 0 === a && (a = !0), void 0 === t && (t = !0), "string" == typeof e && e.indexOf("<") >= 0) {
                    if (e = i(e), !(e.length > 0)) return !1;
                    a && e.addClass("remove-on-close"), r.root.append(e[0])
                }
                return e = i(e), 0 !== e.length && (0 === e.parents("body").length && (a && e.addClass("remove-on-close"), r.root.append(e[0])), i(".picker-modal.modal-in:not(.modal-out)").length > 0 && !e.hasClass("modal-in") && r.closeModal(".picker-modal.modal-in:not(.modal-out)"), e.show(), r.openModal(e, t), e[0])
            }, r.loginScreen = function (e, a) {
                return e || (e = ".login-screen"), void 0 === a && (a = !0), e = i(e), 0 !== e.length && (i(".login-screen.modal-in:not(.modal-out)").length > 0 && !e.hasClass("modal-in") && r.closeModal(".login-screen.modal-in:not(.modal-out)"), e.show(), r.openModal(e, a), e[0])
            }, r.openModal = function (e, a) {
                void 0 === a && (a = !0), e = i(e), e[a ? "removeClass" : "addClass"]("not-animated");
                var t = e.hasClass("modal"),
                    n = e.hasClass("popover"),
                    s = e.hasClass("popup"),
                    o = e.hasClass("login-screen"),
                    l = e.hasClass("picker-modal"),
                    p = e.hasClass("actions-modal"),
                    d = "modal";
                if (n && (d = "popover"), s && (d = "popup"), o && (d = "loginscreen"), l && (d = "picker"), p && (d = "actions"), i(".modal.modal-in:not(.modal-out)").length && r.params.modalStack && t) return void r.modalStack.push(function () {
                    r.openModal(e)
                });
                if (!0 !== e.data("f7-modal-shown")) {
                    e.data("f7-modal-shown", !0);
                    var c = e.parent();
                    r.params.modalsMoveToRoot && !c.is(r.root) && (r.root.append(e), e.once(d + ":closed", function () {
                        c.append(e)
                    })), e.once(d + ":close", function () {
                        e.removeData("f7-modal-shown")
                    }), t && (e.show(), e.css({
                        marginTop: -Math.round(e.outerHeight() / 2) + "px"
                    }));
                    var m;
                    return o || l || (0 !== i(".modal-overlay").length || s || r.root.append('<div class="modal-overlay"></div>'), 0 === i(".popup-overlay").length && s && r.root.append('<div class="popup-overlay"></div>'), m = i(s ? ".popup-overlay" : ".modal-overlay")), r.params.material && l && e.hasClass("picker-calendar") && (0 !== i(".picker-modal-overlay").length || s || r.root.append('<div class="picker-modal-overlay"></div>'), m = i(".picker-modal-overlay")), m && m[a ? "removeClass" : "addClass"]("not-animated"), e[0].clientLeft, e.trigger("open " + d + ":open"), l && i("body").addClass("with-picker-modal"), e.find("." + r.params.viewClass).length > 0 && (e.find(".page").each(function () {
                        r.initPageWithCallback(this)
                    }), e.find(".navbar").each(function () {
                        r.initNavbarWithCallback(this)
                    })), o || l || m.addClass("modal-overlay-visible"), r.params.material && l && m && m.addClass("modal-overlay-visible"), a ? e.removeClass("modal-out").addClass("modal-in").transitionEnd(function (a) {
                        e.hasClass("modal-out") ? e.trigger("closed " + d + ":closed") : e.trigger("opened " + d + ":opened")
                    }) : (e.removeClass("modal-out").addClass("modal-in"), e.trigger("opened " + d + ":opened")), !0
                }
            }, r.closeModal = function (e, a) {
                if (void 0 === a && (a = !0), void 0 === (e = i(e || ".modal-in")) || 0 !== e.length) {
                    e[a ? "removeClass" : "addClass"]("not-animated");
                    var t = e.hasClass("modal"),
                        n = e.hasClass("popover"),
                        s = e.hasClass("popup"),
                        o = e.hasClass("login-screen"),
                        l = e.hasClass("picker-modal"),
                        p = e.hasClass("actions-modal"),
                        d = "modal";
                    n && (d = "popover"), s && (d = "popup"), o && (d = "loginscreen"), l && (d = "picker"), p && (d = "actions");
                    var c = e.hasClass("remove-on-close");
                    if (!n || c || !e.hasClass("ignore-close-by-outside")) {
                        var m, u = e.hasClass("keep-on-close");
                        return s ? m = i(".popup-overlay") : l && r.params.material ? m = i(".picker-modal-overlay") : l || (m = i(".modal-overlay")), s ? e.length === i(".popup.modal-in").length && m.removeClass("modal-overlay-visible") : m && m.length > 0 && m.removeClass("modal-overlay-visible"), m && m[a ? "removeClass" : "addClass"]("not-animated"), e.trigger("close " + d + ":close"), l && (i("body").removeClass("with-picker-modal"), i("body").addClass("picker-modal-closing")), !n || r.params.material ? (a ? e.removeClass("modal-in").addClass("modal-out").transitionEnd(function (a) {
                            if (e.hasClass("modal-out")) e.trigger("closed " + d + ":closed");
                            else if (e.trigger("opened " + d + ":opened"), n) return;
                            l && i("body").removeClass("picker-modal-closing"), s || o || l || n ? (e.removeClass("modal-out").hide(), c && e.length > 0 && e.remove()) : u || e.remove()
                        }) : (e.trigger("closed " + d + ":closed"), e.removeClass("modal-in modal-out"), l && i("body").removeClass("picker-modal-closing"), s || o || l || n ? (e.hide(), c && e.length > 0 && e.remove()) : u || e.remove()), t && r.params.modalStack && r.modalStackClearQueue()) : (e.removeClass("modal-in modal-out not-animated").trigger("closed " + d + ":closed").hide(), c && e.remove()), !0
                    }
                }
            }, r.setProgressbar = function (e, a, t) {
                if (e = i(e || r.root), 0 !== e.length) {
                    a && (a = Math.min(Math.max(a, 0), 100));
                    var n;
                    if (n = e.hasClass("progressbar") ? e : e.children(".progressbar"), 0 !== n.length && !n.hasClass("progressbar-infinite")) return n[0].clientLeft, n.children("span").transform("translate3d(" + (-100 + a) + "%,0,0)"), void 0 !== t ? n.children("span").transition(t) : n.children("span").transition(""), n[0]
                }
            }, r.showProgressbar = function (e, a, t) {
                if ("number" == typeof e && (e = r.root, a = arguments[0], t = arguments[1]), a && "string" == typeof a && parseFloat(a) !== 1 * a && (t = a, a = void 0), e = i(e || r.root), 0 !== e.length) {
                    var n;
                    return e.hasClass("progressbar") ? n = e : (n = e.children(".progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)"), 0 === n.length && (n = i(void 0 !== a ? '<span class="progressbar progressbar-in' + (t ? " color-" + t : "") + '"><span></span></span>' : '<span class="progressbar-infinite progressbar-in' + (t ? " color-" + t : "") + '"></span>'), e.append(n))), a && r.setProgressbar(e, a), n[0]
                }
            }, r.hideProgressbar = function (e) {
                if (e = i(e || r.root), 0 !== e.length) {
                    var a;
                    a = e.hasClass("progressbar") ? e : e.children(".progressbar, .progressbar-infinite"), 0 !== a.length && a.hasClass("progressbar-in") && !a.hasClass("progressbar-out") && a.removeClass("progressbar-in").addClass("progressbar-out").animationEnd(function () {
                        a.remove(), a = null
                    })
                }
            }, r.initPageProgressbar = function (e) {
                e = i(e), e.find(".progressbar").each(function () {
                    var e = i(this);
                    0 === e.children("span").length && e.append("<span></span>"), e.attr("data-progress") && r.setProgressbar(e, e.attr("data-progress"))
                })
            }, r.allowPanelOpen = !0, r.openPanel = function (e, a) {
                function t() {
                    l.transitionEnd(function (e) {
                        i(e.target).is(l) ? (n.hasClass("active") ? n.trigger("opened panel:opened") : n.trigger("closed panel:closed"), o.css({
                            display: ""
                        }), r.allowPanelOpen = !0) : t()
                    })
                }
                if (void 0 === a && (a = !0), !r.allowPanelOpen) return !1;
                var n = i(".panel-" + e);
                if (0 === n.length || n.hasClass("active") || n.hasClass("panel-visible-by-breakpoint")) return !1;
                r.closePanel(), r.allowPanelOpen = !1;
                var s = n.hasClass("panel-reveal") ? "reveal" : "cover";
                n[a ? "removeClass" : "addClass"]("not-animated"), n.css({
                    display: "block"
                }).addClass("active"), n.trigger("open panel:open");
                var o = i(".panel-overlay");
                o[a ? "removeClass" : "addClass"]("not-animated"), o.show(), n.find("." + r.params.viewClass).length > 0 && r.sizeNavbars && r.sizeNavbars(n.find("." + r.params.viewClass)[0]);
                var l = (n[0].clientLeft, "reveal" === s ? i("." + r.params.viewsClass) : n);
                return a ? t() : (n.trigger("opened panel:opened"), o.css({
                    display: ""
                }), r.allowPanelOpen = !0), i("body").addClass("with-panel-" + e + "-" + s), !0
            }, r.closePanel = function (e) {
                void 0 === e && (e = !0);
                var a = i(".panel.active");
                if (0 === a.length || a.hasClass("panel-visible-by-breakpoint")) return !1;
                var t = a.hasClass("panel-reveal") ? "reveal" : "cover",
                    n = a.hasClass("panel-left") ? "left" : "right";
                a[e ? "removeClass" : "addClass"]("not-animated"), a.removeClass("active"), i(".panel-overlay").removeClass("not-animated");
                var s = "reveal" === t ? i("." + r.params.viewsClass) : a;
                a.trigger("close panel:close"), r.allowPanelOpen = !1, e ? (s.transitionEnd(function () {
                    a.hasClass("active") || (a.css({
                        display: ""
                    }), a.trigger("closed panel:closed"), i("body").removeClass("panel-closing"), r.allowPanelOpen = !0)
                }), i("body").addClass("panel-closing").removeClass("with-panel-" + n + "-" + t)) : (a.css({
                    display: ""
                }), a.trigger("closed panel:closed"), a.removeClass("not-animated"), i("body").removeClass("with-panel-" + n + "-" + t), r.allowPanelOpen = !0)
            }, r.initPanelsBreakpoints = function () {
                function e() {
                    r.params.panelLeftBreakpoint && t.length > 0 && (a = t.hasClass("panel-visible-by-breakpoint"), r.width >= r.params.panelLeftBreakpoint ? a || (i("body").removeClass("with-panel-left-reveal with-panel-left-cover"), t.css("display", "").addClass("panel-visible-by-breakpoint").removeClass("active"), t.trigger("open panel:open opened panel:opened"), s.css({
                        "margin-left": t.width() + "px"
                    }), r.allowPanelOpen = !0) : a && (t.css("display", "").removeClass("panel-visible-by-breakpoint active"), t.trigger("close panel:close closed panel:closed"), s.css({
                        "margin-left": ""
                    }), r.allowPanelOpen = !0)), r.params.panelRightBreakpoint && n.length > 0 && (a = n.hasClass("panel-visible-by-breakpoint"), r.width >= r.params.panelRightBreakpoint ? a || (i("body").removeClass("with-panel-right-reveal with-panel-right-cover"), n.css("display", "").addClass("panel-visible-by-breakpoint").removeClass("active"), n.trigger("open panel:open opened panel:opened"), s.css({
                        "margin-right": n.width() + "px"
                    }), r.allowPanelOpen = !0) : a && (n.css("display", "").removeClass("panel-visible-by-breakpoint active"), n.trigger("close panel:close closed panel:closed"), s.css({
                        "margin-right": ""
                    }), r.allowPanelOpen = !0))
                }
                var a, t = i(".panel-left"),
                    n = i(".panel-right"),
                    s = r.root.children(".views");
                r.onResize(e), e()
            }, r.initSwipePanels = function () {
                function e(e) {
                    if (r.allowPanelOpen && (r.params.swipePanel || r.params.swipePanelOnlyClose) && !o && !(i(".modal-in, .photo-browser-in").length > 0) && (r.params.swipePanelCloseOpposite || r.params.swipePanelOnlyClose || !(i(".panel.active").length > 0) || n.hasClass("active")) && !(e.target && "input" === e.target.nodeName.toLowerCase() && "range" === e.target.type || i(e.target).closest(".tabs-swipeable-wrap").length > 0)) {
                        if (w.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, w.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, r.params.swipePanelCloseOpposite || r.params.swipePanelOnlyClose) {
                            if (i(".panel.active").length > 0) s = i(".panel.active").hasClass("panel-left") ? "left" : "right";
                            else {
                                if (r.params.swipePanelOnlyClose) return;
                                s = r.params.swipePanel
                            } if (!s) return
                        }
                        if (n = i(".panel.panel-" + s), h = n.hasClass("active"), r.params.swipePanelActiveArea && !h) {
                            if ("left" === s && w.x > r.params.swipePanelActiveArea) return;
                            if ("right" === s && w.x < r.width - r.params.swipePanelActiveArea) return
                        }
                        l = !1, o = !0, p = void 0, d = (new Date).getTime(), v = void 0
                    }
                }

                function a(e) {
                    if (o && !e.f7PreventPanelSwipe) {
                        var a = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            t = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY;
                        if (void 0 === p && (p = !!(p || Math.abs(t - w.y) > Math.abs(a - w.x))), p) return void(o = !1);
                        if (!v) {
                            if (v = a > w.x ? "to-right" : "to-left", "both" === s) {
                                if (s = i(".panel.active").length > 0 ? i(".panel.active").hasClass("panel-left") ? "left" : "right" : "to-right" === v ? "left" : "right", r.params.swipePanelActiveArea > 0) {
                                    if ("left" === s && w.x > r.params.swipePanelActiveArea) return void(o = !1);
                                    if ("right" === s && w.x < r.width - r.params.swipePanelActiveArea) return void(o = !1)
                                }
                                n = i(".panel.panel-" + s)
                            }
                            if (n.hasClass("panel-visible-by-breakpoint")) return void(o = !1);
                            if ("left" === s && "to-left" === v && !n.hasClass("active") || "right" === s && "to-right" === v && !n.hasClass("active")) return void(o = !1)
                        }
                        if (r.params.swipePanelNoFollow) return (new Date).getTime() - d < 300 && ("to-left" === v && ("right" === s && r.openPanel(s), "left" === s && n.hasClass("active") && r.closePanel()), "to-right" === v && ("left" === s && r.openPanel(s), "right" === s && n.hasClass("active") && r.closePanel())), o = !1, void(l = !1);
                        l || (g = n.hasClass("panel-cover") ? "cover" : "reveal", h || (n.show(), b.show()), f = n[0].offsetWidth, n.transition(0), n.find("." + r.params.viewClass).length > 0 && r.sizeNavbars && r.sizeNavbars(n.find("." + r.params.viewClass)[0])), l = !0, e.preventDefault();
                        var y = h ? 0 : -r.params.swipePanelThreshold;
                        "right" === s && (y = -y), c = a - w.x + y, "right" === s ? "cover" === g ? (m = c + (h ? 0 : f), m < 0 && (m = 0), m > f && (m = f)) : (m = c - (h ? f : 0), m > 0 && (m = 0), m < -f && (m = -f)) : (m = c + (h ? f : 0), m < 0 && (m = 0), m > f && (m = f)), "reveal" === g ? (C.transform("translate3d(" + m + "px,0,0)").transition(0), b.transform("translate3d(" + m + "px,0,0)").transition(0), n.trigger("panel:swipe", {
                            progress: Math.abs(m / f)
                        }), r.pluginHook("swipePanelSetTransform", C[0], n[0], Math.abs(m / f))) : ("left" === s && (m -= f), n.transform("translate3d(" + m + "px,0,0)").transition(0), b.transition(0), u = 1 - Math.abs(m / f), b.css({
                            opacity: u
                        }), n.trigger("panel:swipe", {
                            progress: Math.abs(m / f)
                        }), r.pluginHook("swipePanelSetTransform", C[0], n[0], Math.abs(m / f)))
                    }
                }

                function t(e) {
                    if (!o || !l) return o = !1, void(l = !1);
                    o = !1, l = !1;
                    var a, t = (new Date).getTime() - d,
                        p = 0 === m || Math.abs(m) === f;
                    if (a = h ? "cover" === g ? 0 === m ? "reset" : t < 300 && Math.abs(m) > 0 ? "swap" : t >= 300 && Math.abs(m) < f / 2 ? "reset" : "swap" : m === -f ? "reset" : t < 300 && Math.abs(m) >= 0 || t >= 300 && Math.abs(m) <= f / 2 ? "left" === s && m === f ? "reset" : "swap" : "reset" : "cover" === g ? 0 === m ? "swap" : t < 300 && Math.abs(m) > 0 ? "swap" : t >= 300 && Math.abs(m) < f / 2 ? "swap" : "reset" : 0 === m ? "reset" : t < 300 && Math.abs(m) > 0 || t >= 300 && Math.abs(m) >= f / 2 ? "swap" : "reset", "swap" === a && (r.allowPanelOpen = !0, h ? (r.closePanel(), p && (n.css({
                        display: ""
                    }), i("body").removeClass("panel-closing"))) : r.openPanel(s), p && (r.allowPanelOpen = !0)), "reset" === a)
                        if (h) r.allowPanelOpen = !0, r.openPanel(s);
                        else if (r.closePanel(), p) r.allowPanelOpen = !0, n.css({
                        display: ""
                    });
                    else {
                        var c = "reveal" === g ? C : n;
                        n.trigger("close panel:close"), i("body").addClass("panel-closing"), c.transitionEnd(function () {
                            n.hasClass("active") || (n.trigger("close panel:closed"), n.css({
                                display: ""
                            }), i("body").removeClass("panel-closing"), r.allowPanelOpen = !0)
                        })
                    }
                    "reveal" === g && (C.transition(""), C.transform("")), n.transition("").transform(""), b.css({
                        display: ""
                    }).transform("").transition("").css("opacity", "")
                }
                var n, s;
                if (r.params.swipePanel) {
                    if (n = i(".panel.panel-" + r.params.swipePanel), s = r.params.swipePanel, 0 === n.length && "both" !== s) return
                } else {
                    if (!r.params.swipePanelOnlyClose) return;
                    if (0 === i(".panel").length) return
                }
                var o, l, p, d, c, m, u, h, f, g, v, b = i(".panel-overlay"),
                    w = {},
                    C = i("." + r.params.viewsClass),
                    y = !("touchstart" !== r.touchEvents.start || !r.support.passiveListener) && {
                        passive: !0,
                        capture: !1
                    },
                    x = !!r.support.passiveListener && {
                        passive: !1,
                        capture: !1
                    };
                i(document).on(r.touchEvents.start, e, y), i(document).on(r.touchEvents.move, a, x), i(document).on(r.touchEvents.end, t, y)
            }, r.initImagesLazyLoad = function (e) {
                function a(e) {
                    function t() {
                        e.removeClass("lazy").addClass("lazy-loaded"), s ? e.css("background-image", "url(" + o + ")") : e.attr("src", o), r.params.imagesLazyLoadSequential && (m = !1, c.length > 0 && a(c.shift())), e.trigger("lazy-loaded"), r.params.onLazyLoaded && r.params.onLazyLoaded(e)
                    }

                    function n() {
                        e.removeClass("lazy").addClass("lazy-loaded"), s ? e.css("background-image", "url(" + d + ")") : e.attr("src", d), r.params.imagesLazyLoadSequential && (m = !1, c.length > 0 && a(c.shift())), e.trigger("lazy-error"), r.params.onLazyError && r.params.onLazyError(e)
                    }
                    e = i(e);
                    var s = e.attr("data-background"),
                        o = s || e.attr("data-src");
                    if (o) {
                        if (r.params.imagesLazyLoadSequential && m) return void(c.indexOf(e[0]) < 0 && c.push(e[0]));
                        m = !0;
                        var l = new Image;
                        l.onload = t, l.onerror = n, l.src = o, e.trigger("lazy-load"), r.params.onLazyLoad && !e.hasClass("lazy-loaded") && r.params.onLazyLoad(e)
                    }
                }

                function t() {
                    l = e.find(".lazy"), l.each(function (e, t) {
                        t = i(t), t.parents(".tab:not(.active)").length > 0 || n(t[0]) && a(t)
                    })
                }

                function n(e) {
                    var a = e.getBoundingClientRect(),
                        t = r.params.imagesLazyLoadThreshold || 0;
                    return a.top >= 0 - t && a.left >= 0 - t && a.top <= r.height + t && a.left <= r.width + t
                }

                function s(a) {
                    var n = a ? "off" : "on";
                    l[n]("lazy", t), l.parents(".tab")[n]("show", t), e[n]("lazy", t), p[n]("lazy", t), p[n]("scroll", t), r["on" === n ? "onResize" : "offResize"](t)
                }

                function o() {
                    s(!0)
                }
                e = i(e);
                var l;
                if (e.hasClass("lazy") ? (l = e, e = l.parents(".page")) : l = e.find(".lazy"), 0 !== l.length) {
                    var p;
                    if (e.hasClass("page-content") ? (p = e, e = e.parents(".page")) : p = e.find(".page-content"), 0 !== p.length) {
                        var d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==";
                        "string" == typeof r.params.imagesLazyLoadPlaceholder && (d = r.params.imagesLazyLoadPlaceholder), !1 !== r.params.imagesLazyLoadPlaceholder && l.each(function () {
                            i(this).attr("data-src") && !i(this).attr("src") && i(this).attr("src", d)
                        });
                        var c = [],
                            m = !1;
                        e[0].f7DestroyImagesLazyLoad = o, s(), e.hasClass("page") && e.once("page:beforeremove", o), t(), e.once("page:afteranimation", t)
                    }
                }
            }, r.destroyImagesLazyLoad = function (e) {
                e = i(e), e.length > 0 && e[0].f7DestroyImagesLazyLoad && e[0].f7DestroyImagesLazyLoad()
            }, r.reinitImagesLazyLoad = function (e) {
                e = i(e), e.length > 0 && e.trigger("lazy")
            }, r.initPageMaterialPreloader = function (e) {
                i(e).find(".preloader").each(function () {
                    0 === i(this).children().length && i(this).html(r.params.materialPreloaderHtml)
                })
            };
            var u = function (e, a) {
                var t = {
                    autoLayout: !0,
                    newMessagesFirst: !1,
                    scrollMessages: !0,
                    scrollMessagesOnlyOnEdge: !1,
                    messageTemplate: '{{#if day}}<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>{{/if}}<div class="message message-{{type}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">{{#if name}}<div class="message-name">{{name}}</div>{{/if}}<div class="message-text">{{text}}{{#if date}}<div class="message-date">{{date}}</div>{{/if}}</div>{{#if avatar}}<div class="message-avatar" style="background-image:url({{avatar}})"></div>{{/if}}{{#if label}}<div class="message-label">{{label}}</div>{{/if}}</div>'
                };
                a = a || {};
                for (var r in t) void 0 !== a[r] && null !== a[r] || (a[r] = t[r]);
                var n = this;
                if (n.params = a, n.container = i(e), 0 !== n.container.length) return n.params.autoLayout && n.container.addClass("messages-auto-layout"), n.params.newMessagesFirst && n.container.addClass("messages-new-first"), n.pageContainer = n.container.parents(".page").eq(0), n.pageContent = n.pageContainer.find(".page-content"), n.template = Template7.compile(n.params.messageTemplate), n.layout = function () {
                    n.container.hasClass("messages-auto-layout") || n.container.addClass("messages-auto-layout"), n.container.find(".message").each(function () {
                        var e = i(this);
                        if (e.find(".message-text img").length > 0) {
                            for (var a = e.find(".message-text")[0].childNodes, t = !0, r = 0; r < a.length; r++) 1 === a[r].nodeType && "img" !== a[r].nodeName.toLowerCase() && (t = !1), 3 === a[r].nodeType && "" !== a[r].textContent.trim() && (t = !1);
                            t ? e.addClass("message-pic") : e.removeClass("message-pic")
                        }
                        e.find(".message-avatar").length > 0 && e.addClass("message-with-avatar")
                    }), n.container.find(".message").each(function () {
                        var e = i(this),
                            a = e.hasClass("message-sent"),
                            t = e.next(".message-" + (a ? "sent" : "received")),
                            r = e.prev(".message-" + (a ? "sent" : "received"));
                        0 === t.length ? e.addClass("message-last message-with-tail") : e.removeClass("message-last message-with-tail"), 0 === r.length ? e.addClass("message-first") : e.removeClass("message-first"), r.length > 0 && r.find(".message-name").length > 0 && e.find(".message-name").length > 0 && r.find(".message-name").text() !== e.find(".message-name").text() && (r.addClass("message-last message-with-tail"), e.addClass("message-first"))
                    })
                }, n.appendMessage = function (e, a) {
                    return n.addMessage(e, "append", a)
                }, n.prependMessage = function (e, a) {
                    return n.addMessage(e, "prepend", a)
                }, n.addMessage = function (e, a, t) {
                    return n.addMessages([e], a, t)
                }, n.addMessages = function (e, a, t) {
                    void 0 === t && (t = !0), void 0 === a && (a = n.params.newMessagesFirst ? "prepend" : "append");
                    var r, i = "";
                    for (r = 0; r < e.length; r++) {
                        var s = e[r] || {};
                        s.type = s.type || "sent", s.text && (s.hasImage = s.text.indexOf("<img") >= 0, !1 === s.onlyImage && (s.hasImage = !1), t && (s.position = "append" === a ? "bottom" : "top"), i += n.template(s))
                    }
                    var o = n.pageContent[0].scrollHeight,
                        l = n.pageContent[0].offsetHeight,
                        p = n.pageContent[0].scrollTop;
                    if (n.container[a](i), n.params.autoLayout && n.layout(), "prepend" === a && (n.pageContent[0].scrollTop = p + (n.pageContent[0].scrollHeight - o)), n.params.scrollMessages && "append" === a && !n.params.newMessagesFirst || "prepend" === a && n.params.newMessagesFirst)
                        if (n.params.scrollMessagesOnlyOnEdge) {
                            var d = !1;
                            n.params.newMessagesFirst ? 0 === p && (d = !0) : p - (o - l) >= -10 && (d = !0), d && n.scrollMessages(t ? void 0 : 0)
                        } else n.scrollMessages(t ? void 0 : 0);
                    var c = n.container.find(".message");
                    if (1 === e.length) return "append" === a ? c[c.length - 1] : c[0];
                    var m = [];
                    if ("append" === a)
                        for (r = c.length - e.length; r < c.length; r++) m.push(c[r]);
                    else
                        for (r = 0; r < e.length; r++) m.push(c[r]);
                    return m
                }, n.removeMessage = function (e) {
                    return e = i(e), 0 !== e.length && (e.remove(), n.params.autoLayout && n.layout(), !0)
                }, n.removeMessages = function (e) {
                    n.removeMessage(e)
                }, n.clean = function () {
                    n.container.html("")
                }, n.scrollMessages = function (e, a) {
                    void 0 === e && (e = 400);
                    var t, r = n.pageContent[0].scrollTop;
                    if (void 0 !== a) t = a;
                    else if ((t = n.params.newMessagesFirst ? 0 : n.pageContent[0].scrollHeight - n.pageContent[0].offsetHeight) === r) return;
                    n.pageContent.scrollTop(t, e)
                }, n.init = function () {
                    n.params.messages ? n.addMessages(n.params.messages, void 0, !1) : (n.params.autoLayout && n.layout(), n.scrollMessages(0))
                }, n.destroy = function () {
                    n = null
                }, n.init(), n.container[0].f7Messages = n, n
            };
            r.messages = function (e, a) {
                return new u(e, a)
            }, r.initPageMessages = function (e) {
                function a() {
                    n.destroy(), e.off("page:beforeremove", a)
                }
                e = i(e);
                var t = e.find(".messages");
                if (0 !== t.length && t.hasClass("messages-init")) {
                    var n = r.messages(t, t.dataset());
                    e.hasClass("page") && e.on("page:beforeremove", a)
                }
            }, r.swipeoutOpenedEl = void 0, r.allowSwipeout = !0, r.initSwipeout = function (e) {
                function a(e) {
                    r.allowSwipeout && (o = !1, s = !0, l = void 0, E.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, E.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, p = (new Date).getTime())
                }

                function t(e) {
                    if (s) {
                        var a = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                            t = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY;
                        if (void 0 === l && (l = !!(l || Math.abs(t - E.y) > Math.abs(a - E.x))), l) return void(s = !1);
                        if (!o) {
                            if (i(".list-block.sortable-opened").length > 0) return;
                            c = i(this), m = c.find(".swipeout-content"), u = c.find(".swipeout-actions-right"), h = c.find(".swipeout-actions-left"), f = g = C = y = k = T = null, M = h.hasClass("swipeout-actions-no-fold") || r.params.swipeoutActionsNoFold, I = u.hasClass("swipeout-actions-no-fold") || r.params.swipeoutActionsNoFold, h.length > 0 && (f = h.outerWidth(), C = h.children("a"), T = h.find(".swipeout-overswipe")), u.length > 0 && (g = u.outerWidth(), y = u.children("a"), k = u.find(".swipeout-overswipe")), b = c.hasClass("swipeout-opened"), b && (w = c.find(".swipeout-actions-left.swipeout-actions-opened").length > 0 ? "left" : "right"), c.removeClass("transitioning"), r.params.swipeoutNoFollow || (c.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"), c.removeClass("swipeout-opened"))
                        }
                        if (o = !0, e.preventDefault(), d = a - E.x, v = d, b && ("right" === w ? v -= g : v += f), v > 0 && 0 === h.length || v < 0 && 0 === u.length) {
                            if (!b) return s = o = !1, m.transform(""), y && y.length > 0 && y.transform(""), void(C && C.length > 0 && C.transform(""));
                            v = 0
                        }
                        v < 0 ? x = "to-left" : v > 0 ? x = "to-right" : x || (x = "to-left");
                        var n, p, O;
                        if (e.f7PreventPanelSwipe = !0, r.params.swipeoutNoFollow) return b ? ("right" === w && d > 0 && r.swipeoutClose(c), "left" === w && d < 0 && r.swipeoutClose(c)) : (d < 0 && u.length > 0 && r.swipeoutOpen(c, "right"), d > 0 && h.length > 0 && r.swipeoutOpen(c, "left")), s = !1, void(o = !1);
                        P = !1, S = !1;
                        var L;
                        if (u.length > 0)
                            for (O = v / g, v < -g && (v = -g - Math.pow(-v - g, .8), k.length > 0 && (S = !0)),
                                n = 0; n < y.length; n++) void 0 === y[n]._buttonOffset && (y[n]._buttonOffset = y[n].offsetLeft), p = y[n]._buttonOffset, L = i(y[n]), k.length > 0 && L.hasClass("swipeout-overswipe") && (L.css({
                                left: (S ? -p : 0) + "px"
                            }), S ? L.addClass("swipeout-overswipe-active") : L.removeClass("swipeout-overswipe-active")), L.transform("translate3d(" + (v - p * (1 + Math.max(O, -1))) + "px,0,0)");
                        if (h.length > 0)
                            for (O = v / f, v > f && (v = f + Math.pow(v - f, .8), T.length > 0 && (P = !0)), n = 0; n < C.length; n++) void 0 === C[n]._buttonOffset && (C[n]._buttonOffset = f - C[n].offsetLeft - C[n].offsetWidth), p = C[n]._buttonOffset, L = i(C[n]), T.length > 0 && L.hasClass("swipeout-overswipe") && (L.css({
                                left: (P ? p : 0) + "px"
                            }), P ? L.addClass("swipeout-overswipe-active") : L.removeClass("swipeout-overswipe-active")), C.length > 1 && L.css("z-index", C.length - n), L.transform("translate3d(" + (v + p * (1 - Math.min(O, 1))) + "px,0,0)");
                        m.transform("translate3d(" + v + "px,0,0)")
                    }
                }

                function n(e) {
                    if (!s || !o) return s = !1, void(o = !1);
                    s = !1, o = !1;
                    var a, t, n, l, w, T = (new Date).getTime() - p;
                    if (n = "to-left" === x ? u : h, t = "to-left" === x ? g : f, a = T < 300 && (d < -10 && "to-left" === x || d > 10 && "to-right" === x) || T >= 300 && Math.abs(v) > t / 2 ? "open" : "close", T < 300 && (0 === Math.abs(v) && (a = "close"), Math.abs(v) === t && (a = "open")), "open" === a) {
                        r.swipeoutOpenedEl = c, c.trigger("open swipeout:open"), c.addClass("swipeout-opened transitioning");
                        var k = "to-left" === x ? -t : t;
                        if (m.transform("translate3d(" + k + "px,0,0)"), n.addClass("swipeout-actions-opened"), l = "to-left" === x ? y : C)
                            for (w = 0; w < l.length; w++) i(l[w]).transform("translate3d(" + k + "px,0,0)");
                        S && u.find(".swipeout-overswipe")[0].click(), P && h.find(".swipeout-overswipe")[0].click()
                    } else c.trigger("close swipeout:close"), r.swipeoutOpenedEl = void 0, c.addClass("transitioning").removeClass("swipeout-opened"), m.transform(""), n.removeClass("swipeout-actions-opened");
                    var M;
                    if (C && C.length > 0 && C !== l)
                        for (w = 0; w < C.length; w++) M = C[w]._buttonOffset, void 0 === M && (C[w]._buttonOffset = f - C[w].offsetLeft - C[w].offsetWidth), i(C[w]).transform("translate3d(" + M + "px,0,0)");
                    if (y && y.length > 0 && y !== l)
                        for (w = 0; w < y.length; w++) M = y[w]._buttonOffset, void 0 === M && (y[w]._buttonOffset = y[w].offsetLeft), i(y[w]).transform("translate3d(" + -M + "px,0,0)");
                    m.transitionEnd(function (e) {
                        b && "open" === a || closed && "close" === a || (c.trigger("open" === a ? "opened" : "closed"), b && "close" === a && (u.length > 0 && y.transform(""), h.length > 0 && C.transform("")))
                    })
                }
                var s, o, l, p, d, c, m, u, h, f, g, v, b, w, C, y, x, T, k, P, S, M, I, E = {},
                    O = !!r.support.passiveListener && {
                        passive: !1,
                        capture: !1
                    };
                i(document).on(r.touchEvents.start, function (e) {
                    if (r.swipeoutOpenedEl) {
                        var a = i(e.target);
                        r.swipeoutOpenedEl.is(a[0]) || a.parents(".swipeout").is(r.swipeoutOpenedEl) || a.hasClass("modal-in") || a.hasClass("modal-overlay") || a.hasClass("actions-modal") || a.parents(".actions-modal.modal-in, .modal.modal-in").length > 0 || r.swipeoutClose(r.swipeoutOpenedEl)
                    }
                }, O), e ? (i(e).on(r.touchEvents.start, a, O), i(e).on(r.touchEvents.move, t, O), i(e).on(r.touchEvents.end, n, O)) : (i(document).on(r.touchEvents.start, ".list-block li.swipeout", a, O), i(document).on(r.touchEvents.move, ".list-block li.swipeout", t, O), i(document).on(r.touchEvents.end, ".list-block li.swipeout", n, O))
            }, r.swipeoutOpen = function (e, a, t) {
                if (e = i(e), 2 === arguments.length && "function" == typeof arguments[1] && (t = a), 0 !== e.length && (e.length > 1 && (e = i(e[0])), e.hasClass("swipeout") && !e.hasClass("swipeout-opened"))) {
                    a || (a = e.find(".swipeout-actions-right").length > 0 ? "right" : "left");
                    var n = e.find(".swipeout-actions-" + a);
                    if (0 !== n.length) {
                        e.trigger("open swipeout:open").addClass("swipeout-opened").removeClass("transitioning"), n.addClass("swipeout-actions-opened");
                        var s, o = n.children("a"),
                            l = n.outerWidth(),
                            p = "right" === a ? -l : l;
                        if (o.length > 1) {
                            for (s = 0; s < o.length; s++) "right" === a ? i(o[s]).transform("translate3d(" + -o[s].offsetLeft + "px,0,0)") : i(o[s]).css("z-index", o.length - s).transform("translate3d(" + (l - o[s].offsetWidth - o[s].offsetLeft) + "px,0,0)");
                            o[1].clientLeft
                        }
                        for (e.addClass("transitioning"), s = 0; s < o.length; s++) i(o[s]).transform("translate3d(" + p + "px,0,0)");
                        e.find(".swipeout-content").transform("translate3d(" + p + "px,0,0)").transitionEnd(function () {
                            e.trigger("opened swipeout:opened"), t && t.call(e[0])
                        }), r.swipeoutOpenedEl = e
                    }
                }
            }, r.swipeoutClose = function (e, a) {
                function t() {
                    r.allowSwipeout = !0, e.hasClass("swipeout-opened") || (e.removeClass("transitioning"), o.transform(""), e.trigger("closed swipeout:closed"), a && a.call(e[0]), p && clearTimeout(p))
                }
                if (e = i(e), 0 !== e.length && e.hasClass("swipeout-opened")) {
                    var n = e.find(".swipeout-actions-opened").hasClass("swipeout-actions-right") ? "right" : "left",
                        s = e.find(".swipeout-actions-opened").removeClass("swipeout-actions-opened"),
                        o = s.children("a"),
                        l = s.outerWidth();
                    r.allowSwipeout = !1, e.trigger("close swipeout:close"), e.removeClass("swipeout-opened").addClass("transitioning");
                    var p;
                    e.find(".swipeout-content").transform("").transitionEnd(t), p = setTimeout(t, 500);
                    for (var d = 0; d < o.length; d++) "right" === n ? i(o[d]).transform("translate3d(" + -o[d].offsetLeft + "px,0,0)") : i(o[d]).transform("translate3d(" + (l - o[d].offsetWidth - o[d].offsetLeft) + "px,0,0)"), i(o[d]).css({
                        left: "0px"
                    }).removeClass("swipeout-overswipe-active");
                    r.swipeoutOpenedEl && r.swipeoutOpenedEl[0] === e[0] && (r.swipeoutOpenedEl = void 0)
                }
            }, r.swipeoutDelete = function (e, a) {
                e = i(e), 0 !== e.length && (e.length > 1 && (e = i(e[0])), r.swipeoutOpenedEl = void 0, e.trigger("delete swipeout:delete"), e.css({
                    height: e.outerHeight() + "px"
                }), e[0].clientLeft, e.css({
                    height: "0px"
                }).addClass("deleting transitioning").transitionEnd(function () {
                    if (e.trigger("deleted swipeout:deleted"), a && a.call(e[0]), e.parents(".virtual-list").length > 0) {
                        var t = e.parents(".virtual-list")[0].f7VirtualList,
                            n = e[0].f7VirtualListIndex;
                        t && void 0 !== n && t.deleteItem(n)
                    } else r.params.swipeoutRemoveWithTimeout ? setTimeout(function () {
                        e.remove()
                    }, 0) : e.remove()
                }), e.find(".swipeout-content").transform("translate3d(-100%,0,0)"))
            }, r.sortableToggle = function (e) {
                return e = i(e), 0 === e.length && (e = i(".list-block.sortable")), e.toggleClass("sortable-opened"), e.hasClass("sortable-opened") ? e.trigger("open sortable:open") : e.trigger("close sortable:close"), e
            }, r.sortableOpen = function (e) {
                return e = i(e), 0 === e.length && (e = i(".list-block.sortable")), e.addClass("sortable-opened"), e.trigger("open sortable:open"), e
            }, r.sortableClose = function (e) {
                return e = i(e), 0 === e.length && (e = i(".list-block.sortable")), e.removeClass("sortable-opened"), e.trigger("close sortable:close"), e
            }, r.initSortable = function () {
                function e(e) {
                    s = !1, n = !0, o = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, p = i(this).parent(), v = p.index(), c = p.parent().children("li"), g = p.parents(".sortable"), e.preventDefault(), r.allowPanelOpen = r.allowSwipeout = !1
                }

                function a(e) {
                    if (n && p) {
                        var a = ("touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        s || (p.addClass("sorting"), g.addClass("sortable-sorting"), m = p[0].offsetTop, u = p.parent().height() - p[0].offsetTop - p.height(), d = p[0].offsetHeight), s = !0, e.preventDefault(), e.f7PreventPanelSwipe = !0, l = a - o;
                        var t = l;
                        t < -m && (t = -m), t > u && (t = u), p.transform("translate3d(0," + t + "px,0)"), f = h = void 0, c.each(function () {
                            var e = i(this);
                            if (e[0] !== p[0]) {
                                var a = e[0].offsetTop,
                                    r = e.height(),
                                    n = p[0].offsetTop + t;
                                n >= a - r / 2 && p.index() < e.index() ? (e.transform("translate3d(0, " + -d + "px,0)"), h = e, f = void 0) : n <= a + r / 2 && p.index() > e.index() ? (e.transform("translate3d(0, " + d + "px,0)"), h = void 0, f || (f = e)) : i(this).transform("translate3d(0, 0%,0)")
                            }
                        })
                    }
                }

                function t(e) {
                    if (r.allowPanelOpen = r.allowSwipeout = !0, !n || !s) return n = !1, void(s = !1);
                    e.preventDefault(), c.transform(""), p.removeClass("sorting"), g.removeClass("sortable-sorting");
                    var a, t, i;
                    h && (p.insertAfter(h), p.trigger("sort sortable:sort", {
                        startIndex: v,
                        newIndex: p.index()
                    })), f && (p.insertBefore(f), p.trigger("sort sortable:sort", {
                        startIndex: v,
                        newIndex: p.index()
                    })), (h || f) && g.hasClass("virtual-list") && (a = g[0].f7VirtualList, t = p[0].f7VirtualListIndex, i = f ? f[0].f7VirtualListIndex : h[0].f7VirtualListIndex, a && a.moveItem(t, i)), h = f = void 0, n = !1, s = !1
                }
                var n, s, o, l, p, d, c, m, u, h, f, g, v, b = !!r.support.passiveListener && {
                    passive: !1,
                    capture: !1
                };
                i(document).on(r.touchEvents.start, ".list-block.sortable .sortable-handler", e, b), r.support.touch ? (i(document).on(r.touchEvents.move, ".list-block.sortable .sortable-handler", a, b), i(document).on(r.touchEvents.end, ".list-block.sortable .sortable-handler", t, b)) : (i(document).on(r.touchEvents.move, a, b), i(document).on(r.touchEvents.end, t, b))
            }, r.initSmartSelects = function (e) {
                e = i(e);
                var a;
                a = e.is(".smart-select") ? e : e.find(".smart-select"), 0 !== a.length && a.each(function () {
                    var e = i(this),
                        a = e.find("select");
                    if (0 !== a.length) {
                        var t = a[0];
                        if (0 !== t.length) {
                            for (var r, n = [], s = 0; s < t.length; s++) t[s].selected && (r = t[s].dataset ? t[s].dataset.displayAs : i(t[s]).data("display-as"), r && void 0 !== r ? n.push(r) : n.push(t[s].textContent.trim()));
                            var o = e.find(".item-after");
                            if (0 === o.length) e.find(".item-inner").append('<div class="item-after">' + n.join(", ") + "</div>");
                            else {
                                var l = o.text();
                                if (o.hasClass("smart-select-value"))
                                    for (s = 0; s < t.length; s++) t[s].selected = t[s].textContent.trim() === l.trim();
                                else o.text(n.join(", "))
                            }
                            a.on("change", function () {
                                for (var a = [], r = 0; r < t.length; r++)
                                    if (t[r].selected) {
                                        var n = t[r].dataset ? t[r].dataset.displayAs : i(t[r]).data("display-as");
                                        n && void 0 !== n ? a.push(n) : a.push(t[r].textContent.trim())
                                    }
                                e.find(".item-after").text(a.join(", "))
                            })
                        }
                    }
                })
            }, r.smartSelectAddOption = function (e, a, t) {
                e = i(e);
                var n = e.parents(".smart-select");
                void 0 === t ? e.append(a) : i(a).insertBefore(e.find("option").eq(t)), r.initSmartSelects(n);
                var s = n.find("select").attr("name");
                i('.page.smart-select-page[data-select-name="' + s + '"]').length > 0 && r.smartSelectOpen(n, !0)
            }, r.smartSelectOpen = function (e, a) {
                function t(a) {
                    var t = !0;
                    (a.target === e[0] || i(a.target).parents(e[0]).length > 0) && (t = !1), i(a.target).parents(".picker-modal").length > 0 && (t = !1), t && r.closeModal(".smart-select-picker.modal-in")
                }

                function n(e) {
                    T.selectedOptions.length >= q ? e.find('input[type="checkbox"]').each(function () {
                        this.checked ? i(this).parents("li").removeClass("disabled") : i(this).parents("li").addClass("disabled")
                    }) : e.find(".disabled").removeClass("disabled")
                }

                function o(a) {
                    if (a = i(a), w) {
                        var t = r.virtualList(a.find(".virtual-list"), {
                            items: H,
                            template: W,
                            height: C || void 0,
                            searchByItem: function (e, a, t) {
                                return !!(t.text && t.text.toLowerCase().indexOf(e.trim().toLowerCase()) >= 0)
                            }
                        });
                        a.once("popup" === d || "picker" === d ? "closed" : "pageBeforeRemove", function () {
                            t && t.destroy && t.destroy()
                        })
                    }
                    q && n(a), f && a.find('input[type="radio"][name="' + Y + '"]:checked').parents("label").once("click", function () {
                        "popup" === d ? r.closeModal(re) : "picker" === d ? r.closeModal(ne) : p.router.back()
                    }), a.on("change", 'input[name="' + Y + '"]', function () {
                        var t, s, o, l = this,
                            c = l.value,
                            m = [];
                        if ("checkbox" === l.type) {
                            for (var u = 0; u < T.options.length; u++) t = T.options[u], t.value === c && (t.selected = l.checked), t.selected && (o = t.dataset ? t.dataset.displayAs : i(t).data("display-as"), s = o && void 0 !== o ? o : t.textContent, m.push(s.trim()));
                            q && n(a)
                        } else t = e.find('option[value="' + c + '"]')[0], o = t.dataset ? t.dataset.displayAs : i(t).data("display-as"), s = o && void 0 !== o ? o : t.textContent, m = [s], T.value = c;
                        k.trigger("change"), e.find(".item-after").text(m.join(", ")), f && "radio" === V && ("popup" === d ? r.closeModal(re) : "picker" === d ? r.closeModal(ne) : p.router.back())
                    })
                }

                function l(e) {
                    var a = e.detail.page;
                    a.name === ae && o(a.container)
                }
                if (e = i(e), 0 !== e.length) {
                    var p = e.parents("." + r.params.viewClass);
                    if (0 !== p.length) {
                        p = p[0].f7View;
                        var d = e.attr("data-open-in") || r.params.smartSelectOpenIn;
                        if ("popup" === d) {
                            if (i(".popup.smart-select-popup").length > 0) return
                        } else if ("picker" === d) {
                            if (i(".picker-modal.modal-in").length > 0 && !a) {
                                if (e[0].f7SmartSelectPicker === i(".picker-modal.modal-in:not(.modal-out)")[0]) return;
                                r.closeModal(i(".picker-modal.modal-in:not(.modal-out)"))
                            }
                        } else if (!p) return;
                        var c, m = e.dataset(),
                            u = m.pageTitle || e.find(".item-title").text(),
                            h = m.backText || r.params.smartSelectBackText;
                        c = "picker" === d ? m.pickerCloseText || m.backText || r.params.smartSelectPickerCloseText : m.popupCloseText || m.backText || r.params.smartSelectPopupCloseText;
                        var f = void 0 !== m.backOnSelect ? m.backOnSelect : r.params.smartSelectBackOnSelect,
                            g = m.formTheme || r.params.smartSelectFormTheme,
                            v = m.navbarTheme || r.params.smartSelectNavbarTheme,
                            b = m.toolbarTheme || r.params.smartSelectToolbarTheme,
                            w = m.virtualList,
                            C = m.virtualListHeight,
                            y = r.params.material,
                            x = m.pickerHeight || r.params.smartSelectPickerHeight,
                            T = e.find("select")[0],
                            k = i(T),
                            P = k.dataset();
                        if (!(T.disabled || e.hasClass("disabled") || k.hasClass("disabled"))) {
                            for (var S, M, I, E, O, L, z, D, B, N, A, H = [], R = (new Date).getTime(), V = T.multiple ? "checkbox" : "radio", Y = V + "-" + R, q = k.attr("maxlength"), j = T.name, F = 0; F < T.length; F++) S = i(T[F]), A = S.dataset(), I = A.optionImage || P.optionImage || m.optionImage, E = A.optionIcon || P.optionIcon || m.optionIcon, M = I || E || "checkbox" === V, y && (M = I || E), B = A.optionColor, N = A.optionClass, S[0].disabled && (N += " disabled"), O = S.parent("optgroup")[0], L = O && O.label, z = !1, O && O !== D && (z = !0, D = O, H.push({
                                groupLabel: L,
                                isLabel: z
                            })), H.push({
                                value: S[0].value,
                                text: S[0].textContent.trim(),
                                selected: S[0].selected,
                                group: O,
                                groupLabel: L,
                                image: I,
                                icon: E,
                                color: B,
                                className: N,
                                disabled: S[0].disabled,
                                inputType: V,
                                id: R,
                                hasMedia: M,
                                checkbox: "checkbox" === V,
                                inputName: Y,
                                material: r.params.material
                            });
                            r._compiledTemplates.smartSelectItem || (r._compiledTemplates.smartSelectItem = s.compile(r.params.smartSelectItemTemplate || '{{#if isLabel}}<li class="item-divider">{{groupLabel}}</li>{{else}}<li{{#if className}} class="{{className}}"{{/if}}><label class="label-{{inputType}} item-content"><input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>{{#if material}}{{#if hasMedia}}<div class="item-media">{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}{{#if image}}<img src="{{image}}">{{/if}}</div><div class="item-inner"><div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div></div><div class="item-after"><i class="icon icon-form-{{inputType}}"></i></div>{{else}}<div class="item-media"><i class="icon icon-form-{{inputType}}"></i></div><div class="item-inner"><div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div></div>{{/if}}{{else}}{{#if hasMedia}}<div class="item-media">{{#if checkbox}}<i class="icon icon-form-checkbox"></i>{{/if}}{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}{{#if image}}<img src="{{image}}">{{/if}}</div>{{/if}}<div class="item-inner"><div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div></div>{{/if}}</label></li>{{/if}}'));
                            var W = r._compiledTemplates.smartSelectItem,
                                X = "";
                            if (!w)
                                for (var G = 0; G < H.length; G++) X += W(H[G]);
                            var _, U, J = "",
                                Q = "",
                                K = "",
                                Z = "";
                            "picker" === d ? (r._compiledTemplates.smartSelectToolbar || (r._compiledTemplates.smartSelectToolbar = s.compile(r.params.smartSelectToolbarTemplate || '<div class="toolbar {{#if toolbarTheme}}theme-{{toolbarTheme}}{{/if}}"><div class="toolbar-inner"><div class="left"></div><div class="right"><a href="#" class="link close-picker"><span>{{closeText}}</span></a></div></div></div>')), J = r._compiledTemplates.smartSelectToolbar({
                                pageTitle: u,
                                closeText: c,
                                openIn: d,
                                toolbarTheme: b,
                                inPicker: "picker" === d
                            })) : (r._compiledTemplates.smartSelectNavbar || (r._compiledTemplates.smartSelectNavbar = s.compile(r.params.smartSelectNavbarTemplate || '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}"><div class="navbar-inner">{{leftTemplate}}<div class="center sliding">{{pageTitle}}</div></div></div>')), _ = r._compiledTemplates.smartSelectNavbar({
                                pageTitle: u,
                                backText: h,
                                closeText: c,
                                openIn: d,
                                navbarTheme: v,
                                inPopup: "popup" === d,
                                inPage: "page" === d,
                                leftTemplate: "popup" === d ? (r.params.smartSelectPopupCloseTemplate || (y ? '<div class="left"><a href="#" class="link close-popup icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>')).replace(/{{closeText}}/g, c) : (r.params.smartSelectBackTemplate || (y ? '<div class="left"><a href="#" class="back link icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left sliding"><a href="#" class="back link"><i class="jinsom-icon jinsom-fanhui2"></i></a></div>')).replace(/{{backText}}/g, h)
                            }), "page" === d ? (U = "static", e.parents(".navbar-through").length > 0 && (U = "through"), e.parents(".navbar-fixed").length > 0 && (U = "fixed"), K = e.parents(".page").hasClass("no-toolbar") ? "no-toolbar" : "", Q = e.parents(".page").hasClass("no-navbar") ? "no-navbar" : "navbar-" + U, Z = e.parents(".page").hasClass("no-tabbar") ? "no-tabbar" : "") : U = "fixed");
                            var $, ee, ae = "smart-select-" + Y,
                                te = void 0 === e.data("searchbar") ? r.params.smartSelectSearchbar : "true" === e.data("searchbar");
                            te && ($ = e.data("searchbar-placeholder") || "Search", ee = e.data("searchbar-cancel") || "Cancel");
                            var re, ne, ie = '<form class="searchbar searchbar-init" data-search-list=".smart-select-list-' + R + '" data-search-in=".item-title"><div class="searchbar-input"><input type="search" placeholder="' + $ + '"><a href="#" class="searchbar-clear"></a></div>' + (y ? "" : '<a href="#" class="searchbar-cancel">' + ee + "</a>") + '</form><div class="searchbar-overlay"></div>',
                                se = ("picker" !== d && "through" === U ? _ : "") + '<div class="pages">  <div data-page="' + ae + '" data-select-name="' + j + '" class="page smart-select-page ' + Q + " " + K + " " + Z + '">' + ("picker" !== d && "fixed" === U ? _ : "") + (te ? ie : "") + '    <div class="page-content">' + ("picker" !== d && "static" === U ? _ : "") + '      <div class="list-block ' + (w ? "virtual-list" : "") + " smart-select-list-" + R + " " + (g ? "theme-" + g : "") + '">        <ul>' + (w ? "" : X) + "        </ul>      </div>    </div>  </div></div>";
                            "popup" === d ? (a ? (re = i(".popup.smart-select-popup .view"), re.html(se)) : (re = r.popup('<div class="popup smart-select-popup smart-select-popup-' + Y + '"><div class="view navbar-fixed">' + se + "</div></div>"), re = i(re)), r.initPage(re.find(".page")), o(re)) : "picker" === d ? (a ? (ne = i(".picker-modal.smart-select-picker .view"), ne.html(se)) : (ne = r.pickerModal('<div class="picker-modal smart-select-picker smart-select-picker-' + Y + '"' + (x ? ' style="height:' + x + '"' : "") + ">" + J + '<div class="picker-modal-inner"><div class="view">' + se + "</div></div></div>"), ne = i(ne), function () {
                                var a = e.parents(".page-content");
                                if (0 !== a.length) {
                                    var t, r = parseInt(a.css("padding-top"), 10),
                                        n = parseInt(a.css("padding-bottom"), 10),
                                        i = a[0].offsetHeight - r - ne.height(),
                                        s = a[0].scrollHeight - r - ne.height(),
                                        o = e.offset().top - r + e[0].offsetHeight;
                                    if (o > i) {
                                        var l = a.scrollTop() + o - i;
                                        l + i > s && (t = l + i - s + n, i === s && (t = ne.height()), a.css({
                                            "padding-bottom": t + "px"
                                        })), a.scrollTop(l, 300)
                                    }
                                }
                            }(), i("html").on("click", t), ne.once("picker:close", function () {
                                e[0].f7SmartSelectPicker = void 0, i("html").off("click", t), e.parents(".page-content").css({
                                    paddingBottom: ""
                                })
                            }), e[0].f7SmartSelectPicker = ne[0]), r.initPage(ne.find(".page")), o(ne)) : (i(document).once("page:init", ".smart-select-page", l), p.router.load({
                                content: se,
                                reload: !!a || void 0
                            }))
                        }
                    }
                }
            };
            var h = function (e, a) {
                var t = {
                    cols: 1,
                    height: r.params.material ? 48 : 44,
                    cache: !0,
                    dynamicHeightBufferSize: 1,
                    showFilteredItemsOnly: !1,
                    renderExternal: void 0,
                    template: '<li><div class="item-content"><div class="item-inner"><div class="item-title">{{this}}</div></div></div></li>'
                };
                a = a || {};
                for (var n in t) void 0 === a[n] && (a[n] = t[n]);
                var o = this;
                o.listBlock = i(e), o.params = a, o.items = o.params.items, o.params.showFilteredItemsOnly && (o.filteredItems = []), o.params.template && !o.params.renderItem && ("string" == typeof o.params.template ? o.template = s.compile(o.params.template) : "function" == typeof o.params.template && (o.template = o.params.template)), o.pageContent = o.listBlock.parents(".page-content");
                var l;
                void 0 !== o.params.updatableScroll ? l = o.params.updatableScroll : (l = !0, r.device.ios && r.device.osVersion.split(".")[0] < 8 && (l = !1), o.params.updatableScroll = l), o.ul = o.params.ul ? i(o.params.ul) : o.listBlock.children("ul"), 0 === o.ul.length && (o.listBlock.append("<ul></ul>"), o.ul = o.listBlock.children("ul")), o.domCache = {}, o.displayDomCache = {}, o.tempDomElement = document.createElement("ul"), o.lastRepaintY = null, o.fragment = document.createDocumentFragment(), o.filterItems = function (e, a) {
                    o.filteredItems = [];
                    for (var t = (e[0], e[e.length - 1], 0); t < e.length; t++) o.filteredItems.push(o.items[e[t]]);
                    void 0 === a && (a = !0), a && (o.pageContent[0].scrollTop = 0), o.update()
                }, o.resetFilter = function () {
                    o.params.showFilteredItemsOnly ? o.filteredItems = [] : (o.filteredItems = null, delete o.filteredItems), o.update()
                };
                var p, d, c, m, u, h, f = 0,
                    g = "function" == typeof o.params.height;
                return o.setListSize = function () {
                    var e = o.filteredItems || o.items;
                    if (p = o.pageContent[0].offsetHeight, g) {
                        h = 0, o.heights = [];
                        for (var a = 0; a < e.length; a++) {
                            var t = o.params.height(e[a]);
                            h += t, o.heights.push(t)
                        }
                    } else h = Math.ceil(e.length / o.params.cols) * o.params.height, d = Math.ceil(p / o.params.height), c = o.params.rowsBefore || 2 * d, m = o.params.rowsAfter || d, u = d + c + m, f = c / 2 * o.params.height;
                    l && o.ul.css({
                        height: h + "px"
                    })
                }, o.render = function (e, a) {
                    e && (o.lastRepaintY = null);
                    var t = -(o.listBlock[0].getBoundingClientRect().top - o.pageContent[0].getBoundingClientRect().top);
                    if (void 0 !== a && (t = a), null === o.lastRepaintY || Math.abs(t - o.lastRepaintY) > f || !l && o.pageContent[0].scrollTop + p >= o.pageContent[0].scrollHeight) {
                        o.lastRepaintY = t;
                        var r, n, i = o.filteredItems || o.items,
                            s = 0,
                            d = 0;
                        if (g) {
                            var m, v, b = 0;
                            for (f = p, m = 0; m < o.heights.length; m++) v = o.heights[m], void 0 === r && (b + v >= t - 2 * p * o.params.dynamicHeightBufferSize ? r = m : s += v), void 0 === n && ((b + v >= t + 2 * p * o.params.dynamicHeightBufferSize || m === o.heights.length - 1) && (n = m + 1), d += v), b += v;
                            n = Math.min(n, i.length)
                        } else r = (parseInt(t / o.params.height) - c) * o.params.cols, r < 0 && (r = 0), n = Math.min(r + u * o.params.cols, i.length);
                        var w, C = [];
                        o.reachEnd = !1;
                        for (var y = r; y < n; y++) {
                            var x, T;
                            T = o.items.indexOf(i[y]), y === r && (o.currentFromIndex = T), y === n - 1 && (o.currentToIndex = T), o.filteredItems ? o.items[T] === o.filteredItems[o.filteredItems.length - 1] && (o.reachEnd = !0) : T === o.items.length - 1 && (o.reachEnd = !0), o.params.renderExternal ? C.push(i[y]) : o.domCache[T] ? (x = o.domCache[T], x.f7VirtualListIndex = T) : (o.template && !o.params.renderItem ? o.tempDomElement.innerHTML = o.template(i[y], {
                                index: T
                            }).trim() : o.params.renderItem ? o.tempDomElement.innerHTML = o.params.renderItem(T, i[y]).trim() : o.tempDomElement.innerHTML = i[y].toString().trim(), x = o.tempDomElement.childNodes[0], o.params.cache && (o.domCache[T] = x), x.f7VirtualListIndex = T), y === r && (w = g ? s : y * o.params.height / o.params.cols), o.params.renderExternal || (x.style.top = w + "px", o.params.onItemBeforeInsert && o.params.onItemBeforeInsert(o, x), o.fragment.appendChild(x))
                        }
                        l || (o.ul[0].style.height = g ? d + "px" : y * o.params.height / o.params.cols + "px"), o.params.renderExternal ? i && 0 === i.length && (o.reachEnd = !0) : (o.params.onBeforeClear && o.params.onBeforeClear(o, o.fragment), o.ul[0].innerHTML = "", o.params.onItemsBeforeInsert && o.params.onItemsBeforeInsert(o, o.fragment), i && 0 === i.length ? (o.reachEnd = !0, o.params.emptyTemplate && (o.ul[0].innerHTML = o.params.emptyTemplate)) : o.ul[0].appendChild(o.fragment), o.params.onItemsAfterInsert && o.params.onItemsAfterInsert(o, o.fragment)), void 0 !== a && e && o.pageContent.scrollTop(a, 0), o.params.renderExternal && o.params.renderExternal(o, {
                            fromIndex: r,
                            toIndex: n,
                            listHeight: h,
                            topPosition: w,
                            items: C
                        })
                    }
                }, o.scrollToItem = function (e) {
                    if (e > o.items.length) return !1;
                    var a, t = 0;
                    if (g)
                        for (var r = 0; r < e; r++) t += o.heights[r];
                    else t = e * o.params.height;
                    return a = o.listBlock[0].offsetTop, o.render(!0, a + t - parseInt(o.pageContent.css("padding-top"), 10)), !0
                }, o.handleScroll = function (e) {
                    o.render()
                }, o._isVisible = function (e) {
                    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
                }, o.handleResize = function (e) {
                    o._isVisible(o.listBlock[0]) && (o.setListSize(), o.render(!0))
                }, o.attachEvents = function (e) {
                    var a = e ? "off" : "on";
                    o.pageContent[a]("scroll", o.handleScroll), o.listBlock.parents(".tab").eq(0)[a]("tab:show", o.handleResize), o.listBlock.parents(".panel").eq(0)[a]("panel:open", o.handleResize), o.listBlock.parents(".popup").eq(0)[a]("popup:open", o.handleResize), r["on" === a ? "onResize" : "offResize"](o.handleResize)
                }, o.init = function () {
                    o.attachEvents(), o.setListSize(), o.render()
                }, o.appendItems = function (e) {
                    for (var a = 0; a < e.length; a++) o.items.push(e[a]);
                    o.update()
                }, o.appendItem = function (e) {
                    o.appendItems([e])
                }, o.replaceAllItems = function (e) {
                    o.items = e, delete o.filteredItems, o.domCache = {}, o.update()
                }, o.replaceItem = function (e, a) {
                    o.items[e] = a, o.params.cache && delete o.domCache[e], o.update()
                }, o.prependItems = function (e) {
                    for (var a = e.length - 1; a >= 0; a--) o.items.unshift(e[a]);
                    if (o.params.cache) {
                        var t = {};
                        for (var r in o.domCache) t[parseInt(r, 10) + e.length] = o.domCache[r];
                        o.domCache = t
                    }
                    o.update()
                }, o.prependItem = function (e) {
                    o.prependItems([e])
                }, o.moveItem = function (e, a) {
                    if (e !== a) {
                        var t = o.items.splice(e, 1)[0];
                        if (a >= o.items.length ? (o.items.push(t), a = o.items.length - 1) : o.items.splice(a, 0, t), o.params.cache) {
                            var r = {};
                            for (var n in o.domCache) {
                                var i = parseInt(n, 10),
                                    s = e < a ? e : a,
                                    l = e < a ? a : e,
                                    p = e < a ? -1 : 1;
                                (i < s || i > l) && (r[i] = o.domCache[i]), i === s && (r[l] = o.domCache[i]), i > s && i <= l && (r[i + p] = o.domCache[i])
                            }
                            o.domCache = r
                        }
                        o.update()
                    }
                }, o.insertItemBefore = function (e, a) {
                    if (0 === e) return void o.prependItem(a);
                    if (e >= o.items.length) return void o.appendItem(a);
                    if (o.items.splice(e, 0, a), o.params.cache) {
                        var t = {};
                        for (var r in o.domCache) {
                            var n = parseInt(r, 10);
                            n >= e && (t[n + 1] = o.domCache[n])
                        }
                        o.domCache = t
                    }
                    o.update()
                }, o.deleteItems = function (e) {
                    for (var a, t = 0, r = 0; r < e.length; r++) {
                        var n = e[r];
                        void 0 !== a && n > a && (t = -r), n += t, a = e[r];
                        var i = o.items.splice(n, 1)[0];
                        if (o.filteredItems && o.filteredItems.indexOf(i) >= 0 && o.filteredItems.splice(o.filteredItems.indexOf(i), 1), o.params.cache) {
                            var s = {};
                            for (var l in o.domCache) {
                                var p = parseInt(l, 10);
                                p === n ? delete o.domCache[n] : parseInt(l, 10) > n ? s[p - 1] = o.domCache[l] : s[p] = o.domCache[l]
                            }
                            o.domCache = s
                        }
                    }
                    o.update()
                }, o.deleteAllItems = function () {
                    o.items = [], delete o.filteredItems, o.params.cache && (o.domCache = {}), o.update()
                }, o.deleteItem = function (e) {
                    o.deleteItems([e])
                }, o.clearCache = function () {
                    o.domCache = {}
                }, o.update = function () {
                    o.setListSize(), o.render(!0)
                }, o.destroy = function () {
                    o.attachEvents(!0), delete o.items, delete o.domCache
                }, o.init(), o.listBlock[0].f7VirtualList = o, o
            };
            r.virtualList = function (e, a) {
                return new h(e, a)
            }, r.reinitVirtualList = function (e) {
                var a = i(e),
                    t = a.find(".virtual-list");
                if (0 !== t.length)
                    for (var r = 0; r < t.length; r++) {
                        var n = t[r].f7VirtualList;
                        n && n.update()
                    }
            }, r.initPullToRefresh = function (e) {
                function a(e) {
                    if (d)
                        if ("android" === r.device.os) {
                            if ("targetTouches" in e && e.targetTouches.length > 1) return
                        } else if (c && d && m) return;
                    f = i(this), f.hasClass("refreshing") || (c = !1, y = !1, d = !0, m = void 0, b = void 0, "touchstart" === e.type && (p = e.targetTouches[0].identifier), x.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, x.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, h = (new Date).getTime())
                }

                function t(e) {
                    if (d) {
                        var a, t, n;
                        if ("touchmove" === e.type) {
                            if (p && e.touches)
                                for (var i = 0; i < e.touches.length; i++) e.touches[i].identifier === p && (n = e.touches[i]);
                            n || (n = e.targetTouches[0]), a = n.pageX, t = n.pageY
                        } else a = e.pageX, t = e.pageY; if (a && t) {
                            if (void 0 === m && (m = !!(m || Math.abs(t - x.y) > Math.abs(a - x.x))), !m) return void(d = !1);
                            if (v = f[0].scrollTop, void 0 === b && 0 !== v && (b = !0), !c) {
                                if (f.removeClass("transitioning"), v > f[0].offsetHeight) return void(d = !1);
                                C && (w = f.attr("data-ptr-distance"), w.indexOf("%") >= 0 && (w = f[0].offsetHeight * parseInt(w, 10) / 100)), P = f.hasClass("refreshing") ? w : 0, k = f[0].scrollHeight === f[0].offsetHeight || "ios" !== r.device.os
                            }
                            if (c = !0, !((u = t - x.y) > 0 && v <= 0 || v < 0)) return y = !1, f.removeClass("pull-up pull-down"), void(T = !1);
                            "ios" === r.device.os && parseInt(r.device.osVersion.split(".")[0], 10) > 7 && 0 === v && !b && (k = !0), k && (e.preventDefault(), g = (Math.pow(u, .85) + P) / 3.143, f.transform("translate3d(0," + g + "vw,0)")), k && Math.pow(u, .85) > w || !k && u >= 2 * w ? (T = !0, f.addClass("pull-up").removeClass("pull-down")) : (T = !1, f.removeClass("pull-up").addClass("pull-down")), y || (f.trigger("pullstart ptr:pullstart"), y = !0), f.trigger("pullmove ptr:pullmove", {
                                event: e,
                                scrollTop: v,
                                translate: g,
                                touchesDiff: u
                            })
                        }
                    }
                }

                function n(e) {
                    return "touchend" === e.type && e.changedTouches && e.changedTouches.length > 0 && p && e.changedTouches[0].identifier !== p ? (d = !1, m = !1, c = !1, void(p = null)) : d && c ? (g && (f.addClass("transitioning"), g = 0), f.transform(""), T ? (f.addClass("refreshing"), f.trigger("refresh ptr:refresh", {
                        done: function () {
                            r.pullToRefreshDone(f)
                        }
                    })) : f.removeClass("pull-down"), d = !1, c = !1, void(y && f.trigger("pullend ptr:pullend"))) : (d = !1, void(c = !1))
                }

                function s(e) {
                    e.off(r.touchEvents.start, a, I), e.off(r.touchEvents.move, t, E), e.off(r.touchEvents.end, n, I)
                }

                function o() {
                    s(l), S.off("page:beforeremove", o)
                }
                var l = i(e);
                if (l.hasClass("pull-to-refresh-content") || (l = l.find(".pull-to-refresh-content")), l && 0 !== l.length) {
                    var p, d, c, m, u, h, f, g, v, b, w, C, y, x = {},
                        T = !1,
                        k = !1,
                        P = 0,
                        S = l.hasClass("page") ? l : l.parents(".page"),
                        M = !1;
                    (S.find(".navbar").length > 0 || S.parents(".navbar-fixed, .navbar-through").length > 0 || S.hasClass("navbar-fixed") || S.hasClass("navbar-through")) && (M = !0), S.hasClass("no-navbar") && (M = !1), M || l.addClass("pull-to-refresh-no-navbar"), f = l, f.attr("data-ptr-distance") ? C = !0 : w = 44;
                    var I = !("touchstart" !== r.touchEvents.start || !r.support.passiveListener) && {
                            passive: !0,
                            capture: !1
                        },
                        E = !!r.support.passiveListener && {
                            passive: !1,
                            capture: !1
                        };
                    if (l.on(r.touchEvents.start, a, I), l.on(r.touchEvents.move, t, E), l.on(r.touchEvents.end, n, I), 0 !== S.length) {
                        for (var O = 0; O < l.length; O++) l[O].f7DestroyPullToRefresh = s;
                        S.on("page:beforeremove", o)
                    }
                }
            }, r.pullToRefreshDone = function (e) {
                e = i(e), 0 === e.length && (e = i(".pull-to-refresh-content.refreshing")), e.removeClass("refreshing").addClass("transitioning"), e.transitionEnd(function () {
                    e.removeClass("transitioning pull-up pull-down"), e.trigger("refreshdone ptr:done")
                })
            }, r.pullToRefreshTrigger = function (e) {
                e = i(e), 0 === e.length && (e = i(".pull-to-refresh-content")), e.hasClass("refreshing") || (e.addClass("transitioning refreshing"), e.trigger("refresh ptr:refresh", {
                    done: function () {
                        r.pullToRefreshDone(e)
                    }
                }))
            }, r.destroyPullToRefresh = function (e) {
                e = i(e);
                var a = e.hasClass("pull-to-refresh-content") ? e : e.find(".pull-to-refresh-content");
                0 !== a.length && a[0].f7DestroyPullToRefresh && a[0].f7DestroyPullToRefresh(e)
            }, r.attachInfiniteScroll = function (e) {
                i(e).on("scroll", a)
            }, r.detachInfiniteScroll = function (e) {
                i(e).off("scroll", a)
            }, r.initPageInfiniteScroll = function (e) {
                function a() {
                    r.detachInfiniteScroll(t), e.off("page:beforeremove", a)
                }
                e = i(e);
                var t = e.find(".infinite-scroll");
                0 !== t.length && (r.attachInfiniteScroll(t), e.on("page:beforeremove", a))
            }, r.initPageScrollToolbars = function (e) {
                function a(a) {
                    e.hasClass("page-on-left") || (u = t[0].scrollTop, v = t[0].scrollHeight, b = t[0].offsetHeight, w = u + b >= v - S, y = d.hasClass("navbar-hidden"), x = c.hasClass("toolbar-hidden"), T = p && p.hasClass("toolbar-hidden"), w ? r.params.showBarsOnPageScrollEnd && (C = "show") : C = m > u ? r.params.showBarsOnPageScrollTop || u <= 44 ? "show" : "hide" : u > 44 ? "hide" : "show", "show" === C ? (h && n && y && (r.showNavbar(d), e.removeClass("no-navbar-by-scroll"), y = !1), f && s && x && (r.showToolbar(c), e.removeClass("no-toolbar-by-scroll"), x = !1), g && o && T && (r.showToolbar(p), e.removeClass("no-tabbar-by-scroll"), T = !1)) : (h && n && !y && (r.hideNavbar(d), e.addClass("no-navbar-by-scroll"), y = !0), f && s && !x && (r.hideToolbar(c), e.addClass("no-toolbar-by-scroll"), x = !0), g && o && !T && (r.hideToolbar(p), e.addClass("no-tabbar-by-scroll"), T = !0)), m = u)
                }
                e = i(e);
                var t = e.find(".page-content");
                if (0 !== t.length) {
                    var n = (r.params.hideNavbarOnPageScroll || t.hasClass("hide-navbar-on-scroll") || t.hasClass("hide-bars-on-scroll")) && !(t.hasClass("keep-navbar-on-scroll") || t.hasClass("keep-bars-on-scroll")),
                        s = (r.params.hideToolbarOnPageScroll || t.hasClass("hide-toolbar-on-scroll") || t.hasClass("hide-bars-on-scroll")) && !(t.hasClass("keep-toolbar-on-scroll") || t.hasClass("keep-bars-on-scroll")),
                        o = (r.params.hideTabbarOnPageScroll || t.hasClass("hide-tabbar-on-scroll")) && !t.hasClass("keep-tabbar-on-scroll");
                    if (n || s || o) {
                        var l = t.parents("." + r.params.viewClass);
                        if (0 !== l.length) {
                            var p, d = l.find(".navbar"),
                                c = l.find(".toolbar");
                            o && (p = l.find(".tabbar"), 0 === p.length && (p = l.parents("." + r.params.viewsClass).find(".tabbar")));
                            var m, u, h = d.length > 0,
                                f = c.length > 0,
                                g = p && p.length > 0;
                            m = u = t[0].scrollTop;
                            var v, b, w, C, y, x, T, k = f && s ? c[0].offsetHeight : 0,
                                P = g && o ? p[0].offsetHeight : 0,
                                S = P || k;
                            t.on("scroll", a), t[0].f7ScrollToolbarsHandler = a
                        }
                    }
                }
            }, r.destroyScrollToolbars = function (e) {
                e = i(e);
                var a = e.find(".page-content");
                0 !== a.length && a[0].f7ScrollToolbarsHandler && a.off("scroll", a[0].f7ScrollToolbarsHandler)
            }, r.materialTabbarSetHighlight = function (e, a) {
                i(e).each(function () {
                    var e = i(this);
                    if ((a = a || e.find(".tab-link.active")) && a.length > 0) {
                        var t, n;
                        e.hasClass("tabbar-scrollable") ? (t = a[0].offsetWidth + "px", n = a[0].offsetLeft + "px") : (t = 1 / e.find(".tab-link").length * 100 + "%", n = 100 * (r.rtl ? -a.index() : a.index()) + "%"), e.find(".tab-link-highlight").css({
                            width: t
                        }).transform("translate3d(" + n + ",0,0)")
                    }
                })
            }, r.initPageMaterialTabbar = function (e) {
                function a() {
                    r.materialTabbarSetHighlight(t)
                }
                e = i(e);
                var t = e.find(".tabbar");
                0 === t.length && e.hasClass("tabbar") && (t = e),
                    t.length > 0 && (0 === t.find(".tab-link-highlight").length && t.find(".toolbar-inner").append('<span class="tab-link-highlight"></span>'), a(), r.onResize(a), e.once("page:beforeremove", function () {
                        r.offResize(a)
                    }))
            }, r.initMaterialTabbar = function (e) {
                return r.initPageMaterialTabbar(e)
            }, r.showTab = function (e, a, t, n) {
                var s = i(e);
                if (2 === arguments.length && "boolean" == typeof arguments[1] && (e = arguments[0], t = arguments[1]), 3 === arguments.length && "boolean" == typeof arguments[1] && "boolean" == typeof arguments[2] && (e = arguments[0], t = arguments[1], n = arguments[2]), void 0 === t && (t = !0), 0 === s.length) return !1;
                if (s.hasClass("active")) return n && s.trigger("show tab:show"), !1;
                var o = s.parent(".tabs");
                if (0 === o.length) return !1;
                r.allowSwipeout = !0;
                var l = o.parent().hasClass("tabs-animated-wrap");
                if (l) {
                    o.parent()[t ? "removeClass" : "addClass"]("not-animated");
                    var p = 100 * (r.rtl ? s.index() : -s.index());
                    o.transform("translate3d(" + p + "%,0,0)")
                }
                var d, c = o.parent().hasClass("tabs-swipeable-wrap");
                c && (d = o.parent()[0].swiper, d.activeIndex !== s.index() && d.slideTo(s.index(), t ? void 0 : 0, !1));
                var m = o.children(".tab.active").removeClass("active").trigger("hide tab:hide");
                if (s.addClass("active"), s.trigger("show tab:show"), !l && !c && s.find(".navbar").length > 0) {
                    var u;
                    u = s.hasClass(r.params.viewClass) ? s[0] : s.parents("." + r.params.viewClass)[0], r.sizeNavbars(u)
                }
                if (a ? a = i(a) : (!(a = i("string" == typeof e ? '.tab-link[href="' + e + '"]' : '.tab-link[href="#' + s.attr("id") + '"]')) || a && 0 === a.length) && i("[data-tab]").each(function () {
                    s.is(i(this).attr("data-tab")) && (a = i(this))
                }), 0 !== a.length) {
                    var h;
                    if (m && m.length > 0) {
                        var f = m.attr("id");
                        f && (h = i('.tab-link[href="#' + f + '"]')), (!h || h && 0 === h.length) && i("[data-tab]").each(function () {
                            m.is(i(this).attr("data-tab")) && (h = i(this))
                        })
                    }
                    if (a && a.length > 0 && (a.addClass("active"), r.params.material)) {
                        var g = a.parents(".tabbar");
                        g.length > 0 && (0 === g.find(".tab-link-highlight").length && g.find(".toolbar-inner").append('<span class="tab-link-highlight"></span>'), r.materialTabbarSetHighlight(g, a))
                    }
                    return h && h.length > 0 && h.removeClass("active"), !0
                }
            }, r.accordionToggle = function (e) {
                e = i(e), 0 !== e.length && (e.hasClass("accordion-item-expanded") ? r.accordionClose(e) : r.accordionOpen(e))
            }, r.accordionOpen = function (e) {
                e = i(e);
                var a = e.parents(".accordion-list").eq(0),
                    t = e.children(".accordion-item-content");
                0 === t.length && (t = e.find(".accordion-item-content"));
                var n = a.length > 0 && e.parent().children(".accordion-item-expanded");
                n.length > 0 && r.accordionClose(n), t.css("height", t[0].scrollHeight + "px").transitionEnd(function () {
                    e.hasClass("accordion-item-expanded") ? (t.transition(0), t.css("height", "auto"), t[0].clientLeft, t.transition(""), e.trigger("opened accordion:opened")) : (t.css("height", ""), e.trigger("closed accordion:closed"))
                }), e.trigger("open accordion:open"), e.addClass("accordion-item-expanded")
            }, r.accordionClose = function (e) {
                e = i(e);
                var a = e.children(".accordion-item-content");
                0 === a.length && (a = e.find(".accordion-item-content")), e.removeClass("accordion-item-expanded"), a.transition(0), a.css("height", a[0].scrollHeight + "px"), a[0].clientLeft, a.transition(""), a.css("height", "").transitionEnd(function () {
                    e.hasClass("accordion-item-expanded") ? (a.transition(0), a.css("height", "auto"), a[0].clientLeft, a.transition(""), e.trigger("opened accordion:opened")) : (a.css("height", ""), e.trigger("closed accordion:closed"))
                }), e.trigger("close accordion:close")
            }, r.initFastClicks = function () {
                function e(e) {
                    var a, t = i(e),
                        n = t.parents(r.params.activeStateElements);
                    return t.is(r.params.activeStateElements) && (a = t), n.length > 0 && (a = a ? a.add(n) : n), a || t
                }

                function a(e) {
                    var a = e.parents(".page-content, .panel");
                    return 0 !== a.length && ("yes" !== a.prop("scrollHandlerSet") && (a.on("scroll", function () {
                        clearTimeout(R), clearTimeout(W)
                    }), a.prop("scrollHandlerSet", "yes")), !0)
                }

                function t() {
                    H && H.addClass("active-state")
                }

                function n(e) {
                    H && (H.removeClass("active-state"), H = null)
                }

                function s(e) {
                    var a = "input select textarea label".split(" ");
                    return !!(e.nodeName && a.indexOf(e.nodeName.toLowerCase()) >= 0)
                }

                function o(e) {
                    var a = "button input textarea select".split(" ");
                    return !(!document.activeElement || e === document.activeElement || document.activeElement === document.body || a.indexOf(e.nodeName.toLowerCase()) >= 0)
                }

                function l(e) {
                    var a = i(e);
                    return !("input" === e.nodeName.toLowerCase() && ("file" === e.type || "range" === e.type) || "select" === e.nodeName.toLowerCase() && r.device.android || a.hasClass("no-fastclick") || a.parents(".no-fastclick").length > 0 || r.params.fastClicksExclude && a.is(r.params.fastClicksExclude))
                }

                function p(e) {
                    if (document.activeElement === e) return !1;
                    var a = e.nodeName.toLowerCase(),
                        t = "button checkbox file image radio submit".split(" ");
                    return !e.disabled && !e.readOnly && ("textarea" === a || ("select" === a ? !r.device.android : "input" === a && t.indexOf(e.type) < 0 || void 0))
                }

                function d(e) {
                    e = i(e);
                    var a = !0;
                    return (e.is("label") || e.parents("label").length > 0) && (a = !r.device.android && !(!r.device.ios || !e.is("input"))), a
                }

                function c(a) {
                    e(a.target).addClass("active-state"), "which" in a && 3 === a.which && setTimeout(function () {
                        i(".active-state").removeClass("active-state")
                    }, 0), r.params.material && r.params.materialRipple && (S = a.pageX, M = a.pageY, v(a.target, a.pageX, a.pageY))
                }

                function m(e) {
                    i(".active-state").removeClass("active-state"), r.params.material && r.params.materialRipple && b()
                }

                function u(e) {
                    i(".active-state").removeClass("active-state"), r.params.material && r.params.materialRipple && w()
                }

                function h(e) {
                    var a = r.params.materialRippleElements,
                        t = i(e);
                    if (t.is(a)) return !t.hasClass("no-ripple") && t;
                    if (t.parents(a).length > 0) {
                        var n = t.parents(a).eq(0);
                        return !n.hasClass("no-ripple") && n
                    }
                    return !1
                }

                function f(e, a, t) {
                    if (t) {
                        var r = t[0].getBoundingClientRect(),
                            n = {
                                x: e - r.left,
                                y: a - r.top
                            },
                            s = r.height,
                            o = r.width,
                            l = Math.max(Math.pow(Math.pow(s, 2) + Math.pow(o, 2), .5), 48);
                        q = i('<div class="ripple-wave" style="width: ' + l + "px; height: " + l + "px; margin-top:-" + l / 2 + "px; margin-left:-" + l / 2 + "px; left:" + n.x + "px; top:" + n.y + 'px;"></div>'), t.prepend(q), q[0].clientLeft, F = "translate3d(" + (o / 2 - n.x) + "px, " + (s / 2 - n.y) + "px, 0) scale(1)", q.transform(F)
                    }
                }

                function g() {
                    if (q) {
                        var e = q,
                            a = setTimeout(function () {
                                e.remove()
                            }, 400);
                        q.addClass("ripple-wave-fill").transform(F.replace("scale(1)", "scale(1.01)")).transitionEnd(function () {
                            clearTimeout(a);
                            var e = i(this).addClass("ripple-wave-out").transform(F.replace("scale(1)", "scale(1.01)"));
                            a = setTimeout(function () {
                                e.remove()
                            }, 700), setTimeout(function () {
                                e.transitionEnd(function () {
                                    clearTimeout(a), i(this).remove()
                                })
                            }, 0)
                        }), q = j = void 0
                    }
                }

                function v(e, t, r) {
                    if (!(j = h(e)) || 0 === j.length) return void(j = void 0);
                    a(j) ? W = setTimeout(function () {
                        f(S, M, j)
                    }, 80) : f(S, M, j)
                }

                function b() {
                    clearTimeout(W), g()
                }

                function w() {
                    q ? g() : j && !B ? (clearTimeout(W), f(S, M, j), setTimeout(g, 0)) : g()
                }

                function C(e) {
                    var a = e.changedTouches[0],
                        t = document.createEvent("MouseEvents"),
                        n = "click";
                    r.device.android && "select" === E.nodeName.toLowerCase() && (n = "mousedown"), t.initMouseEvent(n, !0, !0, window, 1, a.screenX, a.screenY, a.clientX, a.clientY, !1, !1, !1, !1, 0, null), t.forwardedTouchEvent = !0, r.device.ios && navigator.standalone ? setTimeout(function () {
                        E = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY), E.dispatchEvent(t)
                    }, 10) : E.dispatchEvent(t)
                }

                function y(s) {
                    if (B = !1, N = !1, s.targetTouches.length > 1) return H && n(), !0;
                    if (s.touches.length > 1 && H && n(), r.params.tapHold && (A && clearTimeout(A), A = setTimeout(function () {
                        s && s.touches && s.touches.length > 1 || (N = !0, s.preventDefault(), i(s.target).trigger("taphold"))
                    }, r.params.tapHoldDelay)), Y && clearTimeout(Y), !(V = l(s.target))) return O = !1, !0;
                    if (r.device.ios || r.device.android && "getSelection" in window) {
                        var p = window.getSelection();
                        if (p.rangeCount && p.focusNode !== document.body && (!p.isCollapsed || document.activeElement === p.focusNode)) return L = !0, !0;
                        L = !1
                    }
                    r.device.android && o(s.target) && document.activeElement.blur(), O = !0, E = s.target, I = (new Date).getTime(), S = s.targetTouches[0].pageX, M = s.targetTouches[0].pageY, r.device.ios && (z = void 0, i(E).parents().each(function () {
                        var e = this;
                        e.scrollHeight > e.offsetHeight && !z && (z = e, z.f7ScrollTop = z.scrollTop)
                    })), s.timeStamp - D < r.params.fastClicksDelayBetweenClicks && s.preventDefault(), r.params.activeState && (H = e(E), a(H) ? R = setTimeout(t, 80) : t()), r.params.material && r.params.materialRipple && v(E, S, M)
                }

                function x(e) {
                    if (O) {
                        var a = !1,
                            t = r.params.fastClicksDistanceThreshold;
                        if (t) {
                            var i = e.targetTouches[0].pageX,
                                s = e.targetTouches[0].pageY;
                            (Math.abs(i - S) > t || Math.abs(s - M) > t) && (a = !0)
                        } else a = !0;
                        a && (O = !1, E = null, B = !0, r.params.tapHold && clearTimeout(A), r.params.activeState && (clearTimeout(R), n()), r.params.material && r.params.materialRipple && b())
                    }
                }

                function T(e) {
                    if (clearTimeout(R), clearTimeout(A), !O) return !L && V && (r.device.android && !e.cancelable || e.preventDefault()), !0;
                    if (document.activeElement === e.target) return r.params.activeState && n(), r.params.material && r.params.materialRipple && w(), !0;
                    if (L || e.preventDefault(), e.timeStamp - D < r.params.fastClicksDelayBetweenClicks) return setTimeout(n, 0), !0;
                    if (D = e.timeStamp, O = !1, r.device.ios && z && z.scrollTop !== z.f7ScrollTop) return !1;
                    if (r.params.activeState && (t(), setTimeout(n, 0)), r.params.material && r.params.materialRipple && w(), p(E)) {
                        if (r.device.ios && r.device.webView) return event.timeStamp - I > 159 ? (E = null, !1) : (E.focus(), !1);
                        E.focus()
                    }
                    return document.activeElement && E !== document.activeElement && document.activeElement !== document.body && "label" !== E.nodeName.toLowerCase() && document.activeElement.blur(), e.preventDefault(), C(e), !1
                }

                function k(e) {
                    O = !1, E = null, clearTimeout(R), clearTimeout(A), r.params.activeState && n(), r.params.material && r.params.materialRipple && w()
                }

                function P(e) {
                    var a = !1;
                    return O ? (E = null, O = !1, !0) : "submit" === e.target.type && 0 === e.detail || "file" === e.target.type || (E || s(e.target) || (a = !0), V || (a = !0), document.activeElement === E && (a = !0), e.forwardedTouchEvent && (a = !0), e.cancelable || (a = !0), r.params.tapHold && r.params.tapHoldPreventClicks && N && (a = !1), a || (e.stopImmediatePropagation(), e.stopPropagation(), E ? (d(E) || B) && e.preventDefault() : e.preventDefault(), E = null), Y = setTimeout(function () {
                        V = !1
                    }, r.device.ios || r.device.androidChrome ? 100 : 400), r.params.tapHold && (A = setTimeout(function () {
                        N = !1
                    }, r.device.ios || r.device.androidChrome ? 100 : 400)), a)
                }
                r.params.activeState && i("html").addClass("watch-active-state"), r.device.ios && r.device.webView && window.addEventListener("touchstart", function () {});
                var S, M, I, E, O, L, z, D, B, N, A, H, R, V, Y, q, j, F, W;
                r.support.touch ? (document.addEventListener("click", P, !0), document.addEventListener("touchstart", y), document.addEventListener("touchmove", x), document.addEventListener("touchend", T), document.addEventListener("touchcancel", k)) : r.params.activeState && (document.addEventListener("mousedown", c), document.addEventListener("mousemove", m), document.addEventListener("mouseup", u)), r.params.material && r.params.materialRipple && document.addEventListener("contextmenu", function (e) {
                    H && n(), w()
                })
            }, r.initClickEvents = function () {
                function e(e) {
                    var a = i(this),
                        t = i(e.target);
                    if (!("a" === a[0].nodeName.toLowerCase() || a.parents("a").length > 0 || "a" === t[0].nodeName.toLowerCase() || t.parents("a").length > 0)) {
                        var n;
                        if (r.params.scrollTopOnNavbarClick && a.is(".navbar .center")) {
                            var s = a.parents(".navbar");
                            n = s.parents(".page-content"), 0 === n.length && (s.parents(".page").length > 0 && (n = s.parents(".page").find(".page-content")), 0 === n.length && s.nextAll(".pages").length > 0 && (n = s.nextAll(".pages").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content")))
                        }
                        r.params.scrollTopOnStatusbarClick && a.is(".statusbar-overlay") && (n = i(".popup.modal-in").length > 0 ? i(".popup.modal-in").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content") : i(".panel.active").length > 0 ? i(".panel.active").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content") : i(".views > .view.active").length > 0 ? i(".views > .view.active").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content") : i(".views").find(".page:not(.page-on-left):not(.page-on-right):not(.cached)").find(".page-content")), n && n.length > 0 && (n.hasClass("tab") && (n = n.parent(".tabs").children(".page-content.active")), n.length > 0 && n.scrollTop(0, 300))
                    }
                }

                function a(e) {
                    var a = i(this),
                        t = a.attr("href"),
                        n = "a" === a[0].nodeName.toLowerCase();
                    if (n && (a.is(r.params.externalLinks) || t && t.indexOf("javascript:") >= 0)) return void(t && "_system" === a.attr("target") && (e.preventDefault(), window.open(t, "_system")));
                    var l = a.dataset();
                    if (a.hasClass("smart-select") && r.smartSelectOpen && r.smartSelectOpen(a), a.hasClass("open-panel") && (1 === i(".panel").length ? i(".panel").hasClass("panel-left") ? r.openPanel("left") : r.openPanel("right") : "right" === l.panel ? r.openPanel("right") : r.openPanel("left")), a.hasClass("close-panel") && r.closePanel(), a.hasClass("panel-overlay") && (i(".panel.active").trigger("panel:overlay-click"), r.params.panelsCloseByOutside && r.closePanel()), a.hasClass("open-popover")) {
                        var p;
                        p = l.popover ? l.popover : ".popover", r.popover(p, a)
                    }
                    a.hasClass("close-popover") && r.closeModal(".popover.modal-in");
                    var d;
                    a.hasClass("open-popup") && (d = l.popup ? l.popup : ".popup", r.popup(d)), a.hasClass("close-popup") && (d = l.popup ? l.popup : ".popup.modal-in", r.closeModal(d));
                    var c;
                    if (a.hasClass("open-login-screen") && (c = l.loginScreen ? l.loginScreen : ".login-screen", r.loginScreen(c)), a.hasClass("close-login-screen") && r.closeModal(".login-screen.modal-in"), a.hasClass("modal-overlay") && (i(".modal.modal-in").length > 0 && r.params.modalCloseByOutside && r.closeModal(".modal.modal-in"), i(".actions-modal.modal-in").length > 0 && r.params.actionsCloseByOutside && r.closeModal(".actions-modal.modal-in"), i(".popover.modal-in").length > 0 && r.params.popoverCloseByOutside && r.closeModal(".popover.modal-in")), a.hasClass("popup-overlay") && i(".popup.modal-in").length > 0 && r.params.popupCloseByOutside && r.closeModal(".popup.modal-in"), a.hasClass("picker-modal-overlay") && i(".picker-modal.modal-in").length > 0 && r.closeModal(".picker-modal.modal-in"), a.hasClass("close-picker")) {
                        var m = i(".picker-modal.modal-in");
                        m.length > 0 ? r.closeModal(m) : (m = i(".popover.modal-in .picker-modal"), m.length > 0 && r.closeModal(m.parents(".popover")))
                    }
                    if (a.hasClass("open-picker")) {
                        var u;
                        u = l.picker ? l.picker : ".picker-modal", r.pickerModal(u, a)
                    }
                    var h;
                    if (a.hasClass("tab-link") && (h = !0, r.showTab(l.tab || a.attr("href"), a)), a.hasClass("swipeout-close") && r.swipeoutClose(a.parents(".swipeout-opened")), a.hasClass("swipeout-delete"))
                        if (l.confirm) {
                            var f = l.confirm,
                                g = l.confirmTitle;
                            g ? r.confirm(f, g, function () {
                                r.swipeoutDelete(a.parents(".swipeout"))
                            }, function () {
                                l.closeOnCancel && r.swipeoutClose(a.parents(".swipeout"))
                            }) : r.confirm(f, function () {
                                r.swipeoutDelete(a.parents(".swipeout"))
                            }, function () {
                                l.closeOnCancel && r.swipeoutClose(a.parents(".swipeout"))
                            })
                        } else r.swipeoutDelete(a.parents(".swipeout"));
                    if (a.hasClass("toggle-sortable") && r.sortableToggle(l.sortable), a.hasClass("open-sortable") && r.sortableOpen(l.sortable), a.hasClass("close-sortable") && r.sortableClose(l.sortable), a.hasClass("accordion-item-toggle") || a.hasClass("item-link") && a.parent().hasClass("accordion-item")) {
                        var v = a.parent(".accordion-item");
                        0 === v.length && (v = a.parents(".accordion-item")), 0 === v.length && (v = a.parents("li")), r.accordionToggle(v)
                    }
                    if (a.hasClass("floating-button") && a.parent().hasClass("speed-dial") && a.parent().toggleClass("speed-dial-opened"), a.hasClass("close-speed-dial") && i(".speed-dial-opened").removeClass("speed-dial-opened"), (!r.params.ajaxLinks || a.is(r.params.ajaxLinks)) && n && r.params.router) {
                        n && e.preventDefault();
                        var b = t && t.length > 0 && "#" !== t && !h,
                            w = l.template;
                        if (b || a.hasClass("back") || w) {
                            var C;
                            if (l.view ? C = i(l.view)[0].f7View : (C = a.parents("." + r.params.viewClass)[0] && a.parents("." + r.params.viewClass)[0].f7View) && C.params.linksView && ("string" == typeof C.params.linksView ? C = i(C.params.linksView)[0].f7View : C.params.linksView instanceof o && (C = C.params.linksView)), C || r.mainView && (C = r.mainView), !C) return;
                            var y;
                            if (w) t = void 0;
                            else {
                                if (t && 0 === t.indexOf("#") && "#" !== t) {
                                    if (!C.params.domCache) return;
                                    y = t.split("#")[1]
                                }
                                if ("#" === t && !a.hasClass("back")) return
                            }
                            var x;
                            void 0 !== l.animatePages ? x = l.animatePages : (a.hasClass("with-animation") && (x = !0), a.hasClass("no-animation") && (x = !1));
                            var T = {
                                animatePages: x,
                                ignoreCache: l.ignoreCache,
                                force: l.force,
                                reload: l.reload,
                                reloadPrevious: l.reloadPrevious,
                                pageName: y,
                                pushState: l.pushState,
                                url: t
                            };
                            if (r.params.template7Pages) {
                                T.contextName = l.contextName;
                                var k = l.context;
                                k && (T.context = JSON.parse(k))
                            }
                            w && w in s.templates && (T.template = s.templates[w]), a.hasClass("back") ? C.router.back(T) : C.router.load(T)
                        }
                    }
                }

                function t(e) {
                    e.preventDefault()
                }
                if (i(document).on("click", "a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay", a), (r.params.scrollTopOnNavbarClick || r.params.scrollTopOnStatusbarClick) && i(document).on("click", ".statusbar-overlay, .navbar .center", e), r.support.touch && !r.device.android) {
                    var n = !!r.support.passiveListener && {
                        passive: !1,
                        capture: !1
                    };
                    i(document).on(r.params.fastClicks ? "touchstart" : "touchmove", ".panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay", t, n)
                }
            };
            var f = [];
            r.getSize = function () {
                var e = r.root.offset();
                r.width = r.root[0].offsetWidth, r.height = r.root[0].offsetHeight, r.left = e.left, r.top = e.top
            }, r.onResize = function (e) {
                f.push(e)
            }, r.offResize = function (e) {
                for (var a = 0; a < f.length; a++) f[a] === e && f.splice(a, 1)
            }, r.resize = function () {
                t(), r.getSize(), r.sizeNavbars && r.sizeNavbars();
                for (var e = 0; e < f.length; e++) f[e]()
            }, r.orientationchange = function () {
                r.device && r.device.minimalUi && (90 !== window.orientation && -90 !== window.orientation || (document.body.scrollTop = 0)), t()
            }, r.initResize = function () {
                i(window).on("resize", r.resize), i(window).on("orientationchange", r.orientationchange), r.getSize()
            }, r.formsData = {}, r.formStoreData = function (e, a) {
                r.formsData[e] = a, r.ls["f7form-" + e] = JSON.stringify(a)
            }, r.formDeleteData = function (e) {
                r.formsData[e] && (r.formsData[e] = "", delete r.formsData[e]), r.ls["f7form-" + e] && (r.ls["f7form-" + e] = "", r.ls.removeItem("f7form-" + e))
            }, r.formGetData = function (e) {
                return r.ls["f7form-" + e] ? JSON.parse(r.ls["f7form-" + e]) : r.formsData[e] ? r.formsData[e] : void 0
            }, r.formToData = function (e) {
                if (e = i(e), 1 !== e.length) return !1;
                var a = {},
                    t = ["submit", "image", "button", "file"],
                    r = [];
                return e.find("input, select, textarea").each(function () {
                    var n = i(this),
                        s = n.attr("name"),
                        o = n.attr("type"),
                        l = this.nodeName.toLowerCase();
                    if (!(t.indexOf(o) >= 0) && !(r.indexOf(s) >= 0) && s)
                        if ("select" === l && n.prop("multiple")) r.push(s), a[s] = [], e.find('select[name="' + s + '"] option').each(function () {
                            this.selected && a[s].push(this.value)
                        });
                        else switch (o) {
                        case "checkbox":
                            r.push(s), a[s] = [], e.find('input[name="' + s + '"]').each(function () {
                                this.checked && a[s].push(this.value)
                            });
                            break;
                        case "radio":
                            r.push(s), e.find('input[name="' + s + '"]').each(function () {
                                this.checked && (a[s] = this.value)
                            });
                            break;
                        default:
                            a[s] = n.val()
                        }
                }), e.trigger("formToJSON formToData form:todata", {
                    formData: a
                }), a
            }, r.formToJSON = r.formToData, r.formFromData = function (e, a) {
                if (e = i(e), 1 !== e.length) return !1;
                var t = ["submit", "image", "button", "file"],
                    r = [];
                e.find("input, select, textarea").each(function () {
                    var n = i(this),
                        s = n.attr("name"),
                        o = n.attr("type"),
                        l = this.nodeName.toLowerCase();
                    if (void 0 !== a[s] && null !== a[s] && !(t.indexOf(o) >= 0) && !(r.indexOf(s) >= 0) && s) {
                        if ("select" === l && n.prop("multiple")) r.push(s), e.find('select[name="' + s + '"] option').each(function () {
                            a[s].indexOf(this.value) >= 0 ? this.selected = !0 : this.selected = !1
                        });
                        else switch (o) {
                        case "checkbox":
                            r.push(s), e.find('input[name="' + s + '"]').each(function () {
                                a[s].indexOf(this.value) >= 0 ? this.checked = !0 : this.checked = !1
                            });
                            break;
                        case "radio":
                            r.push(s), e.find('input[name="' + s + '"]').each(function () {
                                a[s] === this.value ? this.checked = !0 : this.checked = !1
                            });
                            break;
                        default:
                            n.val(a[s])
                        }
                        "select" !== l && "input" !== l && "textarea" !== l || n.trigger("change")
                    }
                }), e.trigger("formFromJSON formFromData form:fromdata", {
                    formData: a
                })
            }, r.formFromJSON = r.formFromData, r.initFormsStorage = function (e) {
                function a() {
                    var e = i(this),
                        a = e[0].id;
                    if (a) {
                        var t = r.formToData(e);
                        t && (r.formStoreData(a, t), e.trigger("store form:storedata", {
                            data: t
                        }))
                    }
                }

                function t() {
                    n.off("change submit", a), e.off("page:beforeremove", t)
                }
                e = i(e);
                var n = e.find("form.store-data");
                0 !== n.length && (n.each(function () {
                    var e = this.getAttribute("id");
                    if (e) {
                        var a = r.formGetData(e);
                        a && r.formFromData(this, a)
                    }
                }), n.on("change submit", a), e.on("page:beforeremove", t))
            }, i(document).on("submit change", "form.ajax-submit, form.ajax-submit-onchange", function (e) {
                var a = i(this);
                if ("change" !== e.type || a.hasClass("ajax-submit-onchange")) {
                    "submit" === e.type && e.preventDefault();
                    var t = (a.attr("method") || "GET").toUpperCase(),
                        n = a.prop("enctype") || a.attr("enctype"),
                        s = a.attr("action");
                    if (s) {
                        var o;
                        o = "POST" === t ? new FormData(a[0]) : i.serializeObject(r.formToJSON(a[0]));
                        var l = i.ajax({
                            method: t,
                            url: s,
                            contentType: n,
                            data: o,
                            beforeSend: function (e) {
                                a.trigger("beforeSubmit form:beforesend", {
                                    data: o,
                                    xhr: e
                                })
                            }, error: function (e) {
                                a.trigger("submitError form:error", {
                                    data: o,
                                    xhr: e
                                })
                            }, success: function (e) {
                                a.trigger("submitted form:success", {
                                    data: e,
                                    xhr: l
                                })
                            }
                        })
                    }
                }
            }), r.resizeTextarea = function (e) {
                if (e = i(e), e.hasClass("resizable")) {
                    e.css({
                        height: ""
                    });
                    var a = e[0].offsetHeight,
                        t = a - e[0].clientHeight,
                        r = e[0].scrollHeight;
                    if (r + t > a) {
                        var n = r + t;
                        e.css("height", n + "px")
                    }
                }
            }, r.resizableTextarea = function (e) {
                function a() {
                    clearTimeout(t), t = setTimeout(function () {
                        r.resizeTextarea(e)
                    }, 0)
                }
                if (e = i(e), 0 !== e.length) {
                    var t;
                    return e[0].f7DestroyResizableTextarea = function () {
                        e.off("change keydown keypress keyup paste cut", a)
                    }, e.on("change keydown keypress keyup paste cut", a)
                }
            }, r.destroyResizableTextarea = function (e) {
                e = i(e), e.length > 0 && e.is("textarea") && e[0].f7DestroyResizableTextarea ? e[0].f7DestroyResizableTextarea() : e.length > 0 && e.find("textarea.resiable").each(function () {
                    var e = this;
                    e.f7DestroyResizableTextarea && e.f7DestroyResizableTextarea()
                })
            }, r.initPageResizableTextarea = function (e) {
                e = i(e), e.find("textarea.resizable").each(function () {
                    r.resizableTextarea(this)
                })
            }, r.initPageMaterialInputs = function (e) {
                e = i(e), e.find("textarea.resizable"), e.find(".item-input").each(function () {
                    var e = i(this),
                        a = ["checkbox", "button", "submit", "range", "radio", "image"];
                    e.find("input, select, textarea").each(function () {
                        var t = i(this);
                        a.indexOf(t.attr("type")) < 0 && (e.addClass("item-input-field"), "" !== t.val().trim() && t.parents(".item-input, .input-field").add(t.parents(".item-inner")).addClass("not-empty-state"))
                    }), e.parents(".input-item, .inputs-list").length > 0 || e.parents(".list-block").eq(0).addClass("inputs-list")
                })
            }, r.initMaterialWatchInputs = function () {
                function e(e) {
                    var a = i(this),
                        t = a.attr("type");
                    r.indexOf(t) >= 0 || a.add(a.parents(".item-input, .input-field")).add(a.parents(".item-inner").eq(0)).removeClass("not-empty-state").addClass("focus-state")
                }

                function a(e) {
                    var a = i(this),
                        t = a.val(),
                        n = a.attr("type");
                    if (!(r.indexOf(n) >= 0)) {
                        var s = a.add(a.parents(".item-input, .input-field")).add(a.parents(".item-inner").eq(0));
                        s.removeClass("focus-state"), t && "" !== t.trim() ? s.removeClass("focus-state").addClass("not-empty-state") : s.removeClass("not-empty-state")
                    }
                }

                function t(e) {
                    var a = i(this),
                        t = a.val(),
                        n = a.attr("type");
                    if (!(r.indexOf(n) >= 0)) {
                        var s = a.add(a.parents(".item-input, .input-field")).add(a.parents(".item-inner").eq(0));
                        0 !== s.length && (t && "string" == typeof t && "" !== t.trim() || Array.isArray(t) && t.length > 0 ? s.addClass("not-empty-state") : s.removeClass("not-empty-state"))
                    }
                }
                var r = ["checkbox", "button", "submit", "range", "radio", "image"];
                i(document).on("change", "input, textarea, select", t, !0), i(document).on("focus", "input, textarea, select", e, !0), i(document).on("blur", "input, textarea, select", a, !0)
            }, r.pushStateQueue = [], r.pushStateClearQueue = function () {
                if (0 !== r.pushStateQueue.length) {
                    var e, a = r.pushStateQueue.pop();
                    !0 === r.params.pushStateNoAnimation && (e = !1), "back" === a.action && r.router.back(a.view, {
                        animatePages: e
                    }), "loadPage" === a.action && r.router.load(a.view, {
                        url: a.stateUrl,
                        animatePages: e,
                        pushState: !1
                    }), "loadContent" === a.action && r.router.load(a.view, {
                        content: a.stateContent,
                        animatePages: e,
                        pushState: !1
                    }), "loadPageName" === a.action && r.router.load(a.view, {
                        pageName: a.statePageName,
                        url: a.stateUrl,
                        animatePages: e,
                        pushState: !1
                    })
                }
            }, r.initPushState = function () {
                function e(e) {
                    if (!a) {
                        var t = r.mainView;
                        if (t) {
                            var n = e.state;
                            if (n || (n = {
                                viewIndex: r.views.indexOf(t),
                                url: t.history[0]
                            }), !(n.viewIndex < 0)) {
                                var i, s = r.views[n.viewIndex],
                                    o = n && n.url || void 0,
                                    l = n && n.content || void 0,
                                    p = n && n.pageName || void 0;
                                !0 === r.params.pushStateNoAnimation && (i = !1), o !== s.url && (s.history.indexOf(o) >= 0 ? s.allowPageChange ? r.router.back(s, {
                                    url: void 0,
                                    animatePages: i,
                                    pushState: !1,
                                    preloadOnly: !1
                                }) : r.pushStateQueue.push({
                                    action: "back",
                                    view: s
                                }) : l ? s.allowPageChange ? r.router.load(s, {
                                    content: l,
                                    animatePages: i,
                                    pushState: !1
                                }) : r.pushStateQueue.unshift({
                                    action: "loadContent",
                                    stateContent: l,
                                    view: s
                                }) : p ? s.allowPageChange ? r.router.load(s, {
                                    pageName: p,
                                    url: o,
                                    animatePages: i,
                                    pushState: !1
                                }) : r.pushStateQueue.unshift({
                                    action: "loadPageName",
                                    statePageName: p,
                                    view: s
                                }) : s.allowPageChange ? r.router.load(s, {
                                    url: o,
                                    animatePages: i,
                                    pushState: !1
                                }) : r.pushStateQueue.unshift({
                                    action: "loadPage",
                                    stateUrl: o,
                                    view: s
                                }))
                            }
                        }
                    }
                }
                var a = !0;
                i(window).on("load", function () {
                    setTimeout(function () {
                        a = !1
                    }, 0)
                }), document.readyState && "complete" === document.readyState && (a = !1), i(window).on("popstate", e)
            }, r.swiper = function (e, a) {
                return new Swiper(e, a)
            }, r.initPageSwiper = function (e) {
                function a(a) {
                    function t() {
                        a.destroy(), e.off("page:beforeremove", t)
                    }
                    e.on("page:beforeremove", t)
                }
                e = i(e);
                var t = e.find(".swiper-init, .tabs-swipeable-wrap");
                0 !== t.length && t.each(function () {
                    var e, t, n = i(this);
                    n.hasClass("tabs-swipeable-wrap") && (n.addClass("swiper-container").children(".tabs").addClass("swiper-wrapper").children(".tab").addClass("swiper-slide"), e = n.children(".tabs").children(".tab.active").index()), t = n.data("swiper") ? JSON.parse(n.data("swiper")) : n.dataset(), void 0 === t.initialSlide && void 0 !== e && (t.initialSlide = e), n.hasClass("tabs-swipeable-wrap") && (t.onSlideChangeStart = function (e) {
                        r.showTab(e.slides.eq(e.activeIndex))
                    }), a(r.swiper(n[0], t))
                })
            }, r.reinitPageSwiper = function (e) {
                e = i(e);
                var a = e.find(".swiper-init, .tabs-swipeable-wrap");
                if (0 !== a.length)
                    for (var t = 0; t < a.length; t++) {
                        var r = a[0].swiper;
                        r && r.update(!0)
                    }
            };
            var g = function (e) {
                var a = this,
                    t = {
                        photos: [],
                        initialSlide: 0,
                        spaceBetween: 20,
                        speed: 300,
                        zoom: !0,
                        zoomMax: 3,
                        zoomMin: 1,
                        exposition: !0,
                        expositionHideCaptions: !1,
                        type: "standalone",
                        navbar: !0,
                        toolbar: !0,
                        theme: "light",
                        swipeToClose: !0,
                        backLinkText: "Close",
                        ofText: "of",
                        loop: !1,
                        lazyLoading: !1,
                        lazyLoadingInPrevNext: !1,
                        lazyLoadingOnTransitionStart: !1,
                        material: r.params.material,
                        materialPreloaderSvg: r.params.materialPreloaderSvg,
                        materialPreloaderHtml: r.params.materialPreloaderHtml
                    };
                e = e || {}, !e.backLinkText && r.params.material && (t.backLinkText = "");
                for (var n in t) void 0 === e[n] && (e[n] = t[n]);
                e.maxZoom && (e.zoomMax = e.maxZoom), e.minZoom && (e.zoomMin = e.minZoom), a.params = e, a.params.iconsColorClass = a.params.iconsColor ? "color-" + a.params.iconsColor : "dark" === a.params.theme ? "color-white" : "", a.params.preloaderColorClass = "dark" === a.params.theme ? "preloader-white" : "";
                var o = a.params.photoTemplate || '<div class="photo-browser-slide swiper-slide"><span class="swiper-zoom-container"><img src="{{js "this.url || this"}}"></span></div>',
                    l = a.params.lazyPhotoTemplate || '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide"><div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderHtml}}{{/if}}</div><span class="swiper-zoom-container"><img data-src="{{js "this.url || this"}}" class="swiper-lazy"></span></div>',
                    p = a.params.objectTemplate || '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{js "this.html || this"}}</div>',
                    d = a.params.captionTemplate || '<div class="photo-browser-caption" data-caption-index="{{@index}}">{{caption}}</div>',
                    c = a.params.navbarTemplate || '<div class="navbar"><div class="navbar-inner"><div class="left sliding"><a href="#" class="link icon-only ' + ("popup" === e.type ? "close-popup" : "photo-browser-close-link") + ' {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}"><i class="jinsom-icon jinsom-fanhui2"></i></a></div><div class="right"><a href="#" class="link icon-only"></a></div></div></div>',
                    m = a.params.toolbarTemplate || '<div class="toolbar tabbar"><div class="toolbar-inner"><a href="#" class="link photo-browser-prev"><i class="icon icon-prev {{iconsColorClass}}"></i></a><a href="#" class="link photo-browser-next"><i class="icon icon-next {{iconsColorClass}}"></i></a></div></div>',
                    u = s.compile('<div class="photo-browser photo-browser-{{theme}}"><div class="view navbar-fixed toolbar-fixed">{{#unless material}}{{#if navbar}}' + c + '{{/if}}{{/unless}}<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="photo-browser-slides">{{#if material}}{{#if navbar}}' + c + "{{/if}}{{/if}}{{#if toolbar}}" + m + '{{/if}}<div class="photo-browser-captions photo-browser-captions-{{js "this.captionsTheme || this.theme"}}">{{#each photos}}{{#if caption}}' + d + "{{/if}}{{/each}}</div><div class=\"photo-browser-swiper-container swiper-container\"><div class=\"photo-browser-swiper-wrapper swiper-wrapper\">{{#each photos}}{{#js_compare \"this.html || ((typeof this === 'string' || this instanceof String) && (this.indexOf('<') >= 0 || this.indexOf('>') >= 0))\"}}" + p + "{{else}}{{#if @root.lazyLoading}}" + l + "{{else}}" + o + "{{/if}}{{/js_compare}}{{/each}}</div></div></div></div></div>")(a.params);
                a.activeIndex = a.params.initialSlide, a.openIndex = a.activeIndex, a.opened = !1, a.open = function (e) {
                    return void 0 === e && (e = a.activeIndex), e = parseInt(e, 10), a.opened && a.swiper ? void a.swiper.slideTo(e) : (a.opened = !0, a.openIndex = e, "standalone" === a.params.type && r.root.append(u), "popup" === a.params.type && (a.popup = r.popup('<div class="popup photo-browser-popup">' + u + "</div>"), i(a.popup).on("popup:closed", a.onPopupClose)), "page" === a.params.type ? (i(document).once("page:beforeinit", a.onPageBeforeInit), i(document).once("page:beforeremove", a.onPageBeforeRemove), a.params.view || (a.params.view = r.mainView), void a.params.view.loadContent(u)) : (a.layout(a.openIndex), void(a.params.onOpen && a.params.onOpen(a))))
                }, a.close = function () {
                    a.opened = !1, a.swiperContainer && 0 !== a.swiperContainer.length && (a.params.onClose && a.params.onClose(a), a.attachEvents(!0), "standalone" === a.params.type && a.container.removeClass("photo-browser-in").addClass("photo-browser-out").animationEnd(function () {
                        a.container.remove()
                    }), a.swiper.destroy(), a.swiper = a.swiperContainer = a.swiperWrapper = a.slides = void 0)
                }, a.onPopupClose = function (e) {
                    a.close(), i(a.popup).off("page:beforeinit", a.onPopupClose)
                }, a.onPageBeforeInit = function (e) {
                    "photo-browser-slides" === e.detail.page.name && (a.layout(a.openIndex), a.params.onOpen && a.params.onOpen(a))
                }, a.onPageBeforeRemove = function (e) {
                    "photo-browser-slides" === e.detail.page.name && a.close()
                }, a.onSliderTransitionStart = function (e) {
                    a.activeIndex = e.activeIndex;
                    var t = e.activeIndex + 1,
                        r = e.slides.length;
                    if (a.params.loop && (r -= 2, t -= e.loopedSlides, t < 1 && (t = r + t), t > r && (t -= r)), a.container.find(".photo-browser-current").text(t), a.container.find(".photo-browser-total").text(r), i(".photo-browser-prev, .photo-browser-next").removeClass("photo-browser-link-inactive"), e.isBeginning && !a.params.loop && i(".photo-browser-prev").addClass("photo-browser-link-inactive"), e.isEnd && !a.params.loop && i(".photo-browser-next").addClass("photo-browser-link-inactive"), a.captions.length > 0) {
                        a.captionsContainer.find(".photo-browser-caption-active").removeClass("photo-browser-caption-active");
                        var n = a.params.loop ? e.slides.eq(e.activeIndex).attr("data-swiper-slide-index") : a.activeIndex;
                        a.captionsContainer.find('[data-caption-index="' + n + '"]').addClass("photo-browser-caption-active")
                    }
                    var s = e.slides.eq(e.previousIndex).find("video");
                    s.length > 0 && "pause" in s[0] && s[0].pause(), a.params.onTransitionStart && a.params.onTransitionStart(e)
                }, a.onSliderTransitionEnd = function (e) {
                    a.params.onTransitionEnd && a.params.onTransitionEnd(e)
                }, a.layout = function (e) {
                    "page" === a.params.type ? a.container = i(".photo-browser-swiper-container").parents(".view") : a.container = i(".photo-browser"), "standalone" === a.params.type && (a.container.addClass("photo-browser-in"), r.sizeNavbars(a.container)), a.swiperContainer = a.container.find(".photo-browser-swiper-container"), a.swiperWrapper = a.container.find(".photo-browser-swiper-wrapper"), a.slides = a.container.find(".photo-browser-slide"), a.captionsContainer = a.container.find(".photo-browser-captions"), a.captions = a.container.find(".photo-browser-caption");
                    var t = {
                        nextButton: a.params.nextButton || ".photo-browser-next",
                        prevButton: a.params.prevButton || ".photo-browser-prev",
                        indexButton: a.params.indexButton,
                        initialSlide: e,
                        spaceBetween: a.params.spaceBetween,
                        speed: a.params.speed,
                        loop: a.params.loop,
                        lazyLoading: a.params.lazyLoading,
                        lazyLoadingInPrevNext: a.params.lazyLoadingInPrevNext,
                        lazyLoadingOnTransitionStart: a.params.lazyLoadingOnTransitionStart,
                        preloadImages: !a.params.lazyLoading,
                        zoom: a.params.zoom,
                        zoomMax: a.params.zoomMax,
                        zoomMin: a.params.zoomMin,
                        onTap: function (e, t) {
                            a.params.onTap && a.params.onTap(e, t)
                        }, onClick: function (e, t) {
                            a.params.exposition && a.toggleExposition(), a.params.onClick && a.params.onClick(e, t)
                        }, onDoubleTap: function (e, t) {
                            a.params.onDoubleTap && a.params.onDoubleTap(e, t)
                        }, onTransitionStart: function (e) {
                            a.onSliderTransitionStart(e)
                        }, onTransitionEnd: function (e) {
                            a.onSliderTransitionEnd(e)
                        }, onSlideChangeStart: a.params.onSlideChangeStart,
                        onSlideChangeEnd: a.params.onSlideChangeEnd,
                        onLazyImageLoad: function (e, t, r) {
                            a.params.onLazyImageLoad && a.params.onLazyImageLoad(a, t, r)
                        }, onLazyImageReady: function (e, t, r) {
                            i(t).removeClass("photo-browser-slide-lazy"), a.params.onLazyImageReady && a.params.onLazyImageReady(a, t, r)
                        }
                    };
                    a.params.swipeToClose && "page" !== a.params.type && (t.onTouchStart = a.swipeCloseTouchStart, t.onTouchMoveOpposite = a.swipeCloseTouchMove, t.onTouchEnd = a.swipeCloseTouchEnd), a.swiper = r.swiper(a.swiperContainer, t), 0 === e && a.onSliderTransitionStart(a.swiper), a.attachEvents()
                }, a.attachEvents = function (e) {
                    var t = e ? "off" : "on";
                    a.container.find(".photo-browser-close-link")[t]("click", a.close)
                }, a.exposed = !1, a.toggleExposition = function () {
                    a.container && a.container.toggleClass("photo-browser-exposed"), a.params.expositionHideCaptions && a.captionsContainer.toggleClass("photo-browser-captions-exposed"), a.exposed = !a.exposed
                }, a.enableExposition = function () {
                    a.container && a.container.addClass("photo-browser-exposed"), a.params.expositionHideCaptions && a.captionsContainer.addClass("photo-browser-captions-exposed"), a.exposed = !0
                }, a.disableExposition = function () {
                    a.container && a.container.removeClass("photo-browser-exposed"), a.params.expositionHideCaptions && a.captionsContainer.removeClass("photo-browser-captions-exposed"), a.exposed = !1
                };
                var h, f, g, v, b, w = !1,
                    C = !0,
                    y = !1;
                return a.swipeCloseTouchStart = function (e, a) {
                    C && (w = !0)
                }, a.swipeCloseTouchMove = function (e, t) {
                    if (w) {
                        y || (y = !0, f = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, v = a.swiper.slides.eq(a.swiper.activeIndex), b = (new Date).getTime()), t.preventDefault(), g = "touchmove" === t.type ? t.targetTouches[0].pageY : t.pageY, h = f - g;
                        var r = 1 - Math.abs(h) / 300;
                        v.transform("translate3d(0," + -h + "px,0)"), a.swiper.container.css("opacity", r).transition(0)
                    }
                }, a.swipeCloseTouchEnd = function (e, t) {
                    if (w = !1, !y) return void(y = !1);
                    y = !1, C = !1;
                    var n = Math.abs(h),
                        i = (new Date).getTime() - b;
                    if (i < 300 && n > 20 || i >= 300 && n > 100) return void setTimeout(function () {
                        "standalone" === a.params.type && a.close(), "popup" === a.params.type && r.closeModal(a.popup), a.params.onSwipeToClose && a.params.onSwipeToClose(a), C = !0
                    }, 0);
                    0 !== n ? v.addClass("transitioning").transitionEnd(function () {
                        C = !0, v.removeClass("transitioning")
                    }) : C = !0, a.swiper.container.css("opacity", "").transition(""), v.transform("")
                }, a
            };
            r.photoBrowser = function (e) {
                return new g(e)
            };
            var v = function (e) {
                function a(e) {
                    var a = o.input.val();
                    o.params.source && o.params.source(o, a, function (e) {
                        var t = "",
                            r = o.params.limit ? Math.min(o.params.limit, e.length) : e.length;
                        o.items = e;
                        var n, i;
                        for (o.params.highlightMatches && (a = a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), i = new RegExp("(" + a + ")", "i")), n = 0; n < r; n++) {
                            var s = "object" == typeof e[n] ? e[n][o.params.valueProperty] : e[n],
                                l = "object" != typeof e[n] ? e[n] : e[n][o.params.textProperty];
                            t += o.dropdownItemTemplate({
                                value: s,
                                text: o.params.highlightMatches ? l.replace(i, "<b>$1</b>") : l
                            })
                        }
                        "" === t && "" === a && o.params.dropdownPlaceholderText && (t += o.dropdownPlaceholderTemplate({
                            text: o.params.dropdownPlaceholderText
                        })), o.dropdown.find("ul").html(t)
                    })
                }

                function t(e) {
                    for (var a, t = i(this), r = 0; r < o.items.length; r++) {
                        var n = "object" == typeof o.items[r] ? o.items[r][o.params.valueProperty] : o.items[r],
                            s = t.attr("data-value");
                        n !== s && 1 * n != 1 * s || (a = o.items[r])
                    }
                    o.params.updateInputValueOnSelect && (o.input.val("object" == typeof a ? a[o.params.valueProperty] : a), o.input.trigger("input change")), o.params.onChange && o.params.onChange(o, a), o.close()
                }

                function n(e) {
                    var a = i(e.target);
                    a.is(o.input[0]) || o.dropdown && a.parents(o.dropdown[0]).length > 0 || o.close()
                }
                var o = this,
                    l = {
                        popupCloseText: "Close",
                        backText: "Back",
                        searchbarPlaceholderText: "Search...",
                        searchbarCancelText: "Cancel",
                        openWithAnimation: !0,
                        autoFocus: !1,
                        openIn: "page",
                        backOnSelect: !1,
                        notFoundText: "Nothing found",
                        requestSourceOnOpen: !1,
                        valueProperty: "id",
                        textProperty: "text",
                        highlightMatches: !0,
                        updateInputValueOnSelect: !0,
                        expandInput: !1,
                        preloaderColor: !1,
                        preloader: !1
                    };
                e = e || {};
                for (var p in l) void 0 === e[p] && (e[p] = l[p]);
                o.params = e, o.params.opener && (o.opener = i(o.params.opener));
                var d = o.params.view;
                if (!o.params.view && o.opener && o.opener.length) {
                    if (d = o.opener.parents("." + r.params.viewClass), 0 === d.length) return;
                    d = d[0].f7View
                }
                if (!o.params.input || (o.input = i(o.params.input), 0 !== o.input.length || "dropdown" !== o.params.openIn)) {
                    o.value = o.params.value || [], o.id = (new Date).getTime(), o.inputType = o.params.multiple ? "checkbox" : "radio", o.inputName = o.inputType + "-" + o.id;
                    var c = r.params.material;
                    if (o.params.backOnSelect, "dropdown" !== o.params.openIn) {
                        o.itemTemplate = s.compile(o.params.itemTemplate || '<li><label class="label-{{inputType}} item-content"><input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>{{#if material}}<div class="item-media"><i class="icon icon-form-{{inputType}}"></i></div><div class="item-inner"><div class="item-title">{{text}}</div></div>{{else}}{{#if checkbox}}<div class="item-media"><i class="icon icon-form-checkbox"></i></div>{{/if}}<div class="item-inner"><div class="item-title">{{text}}</div></div>{{/if}}</label></li>');
                        var m = o.params.pageTitle || "";
                        !m && o.opener && o.opener.length && (m = o.opener.find(".item-title").text());
                        var u, h, f = "autocomplete-" + o.inputName,
                            g = o.params.navbarTheme,
                            v = o.params.formTheme,
                            b = "",
                            w = "";
                        o.navbarTemplate = s.compile(o.params.navbarTemplate || '<div class="navbar no-shadow {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}"><div class="navbar-inner"><div class="left sliding">{{#if material}}<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}} icon-only" {{#unless animated}}data-animate-pages="false"{{/unless}}><i class="icon icon-back"></i></a>{{else}}<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}}" {{#unless animated}}data-animate-pages="false"{{/unless}}><i class="icon icon-back"></i>{{#if inPopup}}<span>{{popupCloseText}}</span>{{else}}<span>{{backText}}</span>{{/if}}</a>{{/if}}</div><div class="center sliding">{{pageTitle}}</div>{{#if preloader}}<div class="right"><div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}"></div></div>{{/if}}</div></div>'), u = o.navbarTemplate({
                            pageTitle: m,
                            backText: o.params.backText,
                            popupCloseText: o.params.popupCloseText,
                            openIn: o.params.openIn,
                            navbarTheme: g,
                            inPopup: "popup" === o.params.openIn,
                            inPage: "page" === o.params.openIn,
                            material: c,
                            preloader: o.params.preloader,
                            preloaderColor: o.params.preloaderColor,
                            animated: o.params.openWithAnimation
                        }), "page" === o.params.openIn ? (h = "static", o.opener ? (o.opener.parents(".navbar-through").length > 0 && (h = "through"), o.opener.parents(".navbar-fixed").length > 0 && (h = "fixed"), w = o.opener.parents(".page").hasClass("no-toolbar") ? "no-toolbar" : "", b = o.opener.parents(".page").hasClass("no-navbar") ? "no-navbar" : "navbar-" + h) : d.container && ((i(d.container).hasClass("navbar-through") || i(d.container).find(".navbar-through").length > 0) && (h = "through"), (i(d.container).hasClass("navbar-fixed") || i(d.container).find(".navbar-fixed").length > 0) && (h = "fixed"), w = i(d.activePage.container).hasClass("no-toolbar") ? "no-toolbar" : "", b = i(d.activePage.container).hasClass("no-navbar") ? "no-navbar" : "navbar-" + h)) : h = "fixed";
                        var C = '<form class="searchbar"><div class="searchbar-input"><input type="search" placeholder="' + o.params.searchbarPlaceholderText + '"><a href="#" class="searchbar-clear"></a></div>' + (c ? "" : '<a href="#" class="searchbar-cancel">' + o.params.searchbarCancelText + "</a>") + '</form><div class="searchbar-overlay"></div>',
                            y = ("through" === h ? u : "") + '<div class="pages"><div data-page="' + f + '" class="page autocomplete-page ' + b + " " + w + '">' + ("fixed" === h ? u : "") + C + '<div class="page-content">' + ("static" === h ? u : "") + '<div class="list-block autocomplete-found autocomplete-list-' + o.id + " " + (v ? "theme-" + v : "") + '"><ul></ul></div><div class="list-block autocomplete-not-found"><ul><li class="item-content"><div class="item-inner"><div class="item-title">' + o.params.notFoundText + '</div></div></li></ul></div><div class="list-block autocomplete-values"><ul></ul></div></div></div></div>'
                    } else o.dropdownItemTemplate = s.compile(o.params.dropdownItemTemplate || '<li><label class="{{#unless placeholder}}label-radio{{/unless}} item-content" data-value="{{value}}"><div class="item-inner"><div class="item-title">{{text}}</div></div></label></li>'), o.dropdownPlaceholderTemplate = s.compile(o.params.dropdownPlaceholderTemplate || '<li class="autocomplete-dropdown-placeholder"><div class="item-content"><div class="item-inner"><div class="item-title">{{text}}</div></div></label></li>'), o.dropdownTemplate = s.compile(o.params.dropdownTemplate || '<div class="autocomplete-dropdown"><div class="autocomplete-dropdown-inner"><div class="list-block"><ul></ul></div></div>{{#if preloader}}<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}">{{#if material}}{{materialPreloaderHtml}}{{/if}}</div>{{/if}}</div>');
                    return o.popup = void 0, o.dropdown = void 0, o.positionDropDown = function () {
                        var e = o.input.parents(".list-block"),
                            a = o.input.parents(".page-content"),
                            t = (parseInt(a.css("padding-top"), 10), parseInt(a.css("padding-top"), 10)),
                            r = e.length > 0 ? e.offset().left - e.parent().offset().left : 0,
                            n = o.input.offset().left - (e.length > 0 ? e.offset().left : 0),
                            i = o.input.offset().top - (a.offset().top - a[0].scrollTop),
                            s = a[0].scrollHeight - t - (i + a[0].scrollTop) - o.input[0].offsetHeight;
                        o.dropdown.css({
                            left: (e.length > 0 ? r : n) + "px",
                            top: i + a[0].scrollTop + o.input[0].offsetHeight + "px",
                            width: (e.length > 0 ? e[0].offsetWidth : o.input[0].offsetWidth) + "px"
                        }), o.dropdown.children(".autocomplete-dropdown-inner").css({
                            maxHeight: s + "px",
                            paddingLeft: e.length > 0 && !o.params.expandInput ? n - (c ? 16 : 15) + "px" : ""
                        })
                    }, o.pageInit = function (e) {
                        function a(e) {
                            if (o.params.source) {
                                var a, t;
                                o.params.source(o, e, function (r) {
                                    var n = "",
                                        i = o.params.limit ? Math.min(o.params.limit, r.length) : r.length;
                                    for (o.items = r, a = 0; a < i; a++) {
                                        var l = !1,
                                            p = "object" == typeof r[a] ? r[a][o.params.valueProperty] : r[a];
                                        for (t = 0; t < o.value.length; t++) {
                                            var d = "object" == typeof o.value[t] ? o.value[t][o.params.valueProperty] : o.value[t];
                                            d !== p && 1 * d != 1 * p || (l = !0)
                                        }
                                        n += o.itemTemplate({
                                            value: p,
                                            text: "object" != typeof r[a] ? r[a] : r[a][o.params.textProperty],
                                            inputType: o.inputType,
                                            id: o.id,
                                            inputName: o.inputName,
                                            selected: l,
                                            checkbox: "checkbox" === o.inputType,
                                            material: c
                                        })
                                    }
                                    s.find(".autocomplete-found ul").html(n), 0 === r.length ? 0 !== e.length ? (s.find(".autocomplete-not-found").show(), s.find(".autocomplete-found, .autocomplete-values").hide()) : (s.find(".autocomplete-values").show(), s.find(".autocomplete-found, .autocomplete-not-found").hide()) : (s.find(".autocomplete-found").show(), s.find(".autocomplete-not-found, .autocomplete-values").hide())
                                })
                            }
                        }

                        function t() {
                            var e, a = "";
                            for (e = 0; e < o.value.length; e++) a += o.itemTemplate({
                                value: "object" == typeof o.value[e] ? o.value[e][o.params.valueProperty] : o.value[e],
                                text: "object" == typeof o.value[e] ? o.value[e][o.params.textProperty] : o.value[e],
                                inputType: o.inputType,
                                id: o.id,
                                inputName: o.inputName + "-checked",
                                checkbox: "checkbox" === o.inputType,
                                material: c,
                                selected: !0
                            });
                            s.find(".autocomplete-values ul").html(a)
                        }
                        var n = e.detail.page;
                        if (o.page = i(n.container), o.pageData = n, n.name === f) {
                            var s = i(n.container),
                                l = r.searchbar(s.find(".searchbar"), {
                                    customSearch: !0,
                                    onSearch: function (e, t) {
                                        0 === t.query.length && e.active ? e.overlay.addClass("searchbar-overlay-active") : e.overlay.removeClass("searchbar-overlay-active"), a(t.query)
                                    }
                                });
                            o.searchbar = l, !o.params.multiple && o.params.backOnSelect && s.once("click", ".list-block label", function () {
                                "popup" === o.params.openIn ? r.closeModal(o.popup) : d.router.back({
                                    animatePages: o.params.openWithAnimation
                                })
                            }), s.on("change", 'input[type="radio"], input[type="checkbox"]', function () {
                                var e, a, r, n, s = this,
                                    l = s.value;
                                if (i(s).parents("li").find(".item-title").text(), i(s).parents(".autocomplete-values").length > 0) {
                                    if ("checkbox" === o.inputType && !s.checked) {
                                        for (e = 0; e < o.value.length; e++)(n = "string" == typeof o.value[e] ? o.value[e] : o.value[e][o.params.valueProperty]) !== l && 1 * n != 1 * l || o.value.splice(e, 1);
                                        t(), o.params.onChange && o.params.onChange(o, o.value)
                                    }
                                } else {
                                    for (e = 0; e < o.items.length; e++)(r = "string" == typeof o.items[e] ? o.items[e] : o.items[e][o.params.valueProperty]) !== l && 1 * r != 1 * l || (a = o.items[e]);
                                    if ("radio" === o.inputType) o.value = [a];
                                    else if (s.checked) o.value.push(a);
                                    else
                                        for (e = 0; e < o.value.length; e++)(n = "string" == typeof o.value[e] ? o.value[e] : o.value[e][o.params.valueProperty]) !== l && 1 * n != 1 * l || o.value.splice(e, 1);
                                    t(), ("radio" === o.inputType && s.checked || "checkbox" === o.inputType) && o.params.onChange && o.params.onChange(o, o.value)
                                }
                            }), t(), o.params.requestSourceOnOpen && a(""), o.params.onOpen && o.params.onOpen(o)
                        }
                    }, o.showPreloader = function () {
                        "dropdown" === o.params.openIn ? o.dropdown && o.dropdown.find(".autocomplete-preloader").addClass("autocomplete-preloader-visible") : i(".autocomplete-preloader").addClass("autocomplete-preloader-visible")
                    }, o.hidePreloader = function () {
                        "dropdown" === o.params.openIn ? o.dropdown && o.dropdown.find(".autocomplete-preloader").removeClass("autocomplete-preloader-visible") : i(".autocomplete-preloader").removeClass("autocomplete-preloader-visible")
                    }, o.autoFocus = function (e) {
                        var a = this;
                        setTimeout(function () {
                            i(a).find("input[type=search]").focus()
                        }, 0)
                    }, o.open = function () {
                        if (!o.opened)
                            if (o.opened = !0, "dropdown" === o.params.openIn) {
                                o.dropdown || (o.dropdown = i(o.dropdownTemplate({
                                    preloader: o.params.preloader,
                                    preloaderColor: o.params.preloaderColor,
                                    material: c,
                                    materialPreloaderHtml: r.params.materialPreloaderHtml
                                })), o.dropdown.on("click", "label", t));
                                var e = o.input.parents(".list-block");
                                e.length && o.input.parents(".item-content").length > 0 && o.params.expandInput && o.input.parents(".item-content").addClass("item-content-dropdown-expand"), o.positionDropDown(), o.input.parents(".page-content").append(o.dropdown), o.dropdown.addClass("autocomplete-dropdown-in"), o.input.trigger("input"), r.onResize(o.positionDropDown), o.params.onOpen && o.params.onOpen(o)
                            } else i(document).once("page:init", ".autocomplete-page", o.pageInit), "popup" === o.params.openIn ? (o.popup = r.popup('<div class="popup autocomplete-popup autocomplete-popup-' + o.inputName + '"><div class="view navbar-fixed">' + y + "</div></div>", !0, o.params.openWithAnimation), o.popup = i(o.popup), o.params.autoFocus && (o.params.openWithAnimation ? o.popup.once("popup:opened", o.autoFocus) : o.autoFocus.bind(o.popup)()), o.popup.once("popup:closed", function () {
                                o.popup = void 0, o.opened = !1, o.params.onClose && o.params.onClose(o)
                            })) : (o.params.autoFocus && i(document).once(o.params.openWithAnimation ? "page:afteranimation" : "page:init", ".autocomplete-page", o.autoFocus), d.router.load({
                                content: y,
                                animatePages: o.params.openWithAnimation
                            }), i(document).once("page:back", ".autocomplete-page", function () {
                                o.opened = !1, o.params.onClose && o.params.onClose(o)
                            }))
                    }, o.close = function (e) {
                        if (o.opened) {
                            if ("dropdown" === o.params.openIn) {
                                if (e && "blur" === e.type && o.dropdown.find("label.active-state").length > 0) return;
                                o.dropdown.removeClass("autocomplete-dropdown-in").remove(), o.input.parents(".item-content-dropdown-expand").removeClass("item-content-dropdown-expand"), o.opened = !1, r.offResize(o.positionDropDown), o.params.onClose && o.params.onClose(o)
                            }
                            "popup" === o.params.openIn && o.popup && r.closeModal(o.popup)
                        }
                    }, o.initEvents = function (e) {
                        var t = e ? "off" : "on";
                        "dropdown" !== o.params.openIn && o.opener && o.opener[t]("click", o.open), "dropdown" === o.params.openIn && o.input && (o.input[t]("focus", o.open), o.input[t]("input", a), r.device.android ? i("html")[t]("click", n) : o.input[t]("blur", o.close)), e && o.dropdown && (o.dropdown = null)
                    }, o.init = function () {
                        o.initEvents()
                    }, o.destroy = function () {
                        o.initEvents(!0), o = null
                    }, o.init(), o
                }
            };
            r.autocomplete = function (e) {
                return new v(e)
            };
            var b = function (e) {
                function a() {
                    var e = !1;
                    return p.params.convertToPopover || p.params.onlyInPopover ? (!p.inline && p.params.input && (p.params.onlyInPopover ? e = !0 : r.device.ios ? e = !!r.device.ipad : r.width >= 768 && (e = !0)), e) : e
                }

                function t() {
                    return !!(p.opened && p.container && p.container.length > 0 && p.container.parents(".popover").length > 0)
                }

                function n() {
                    if (p.opened)
                        for (var e = 0; e < p.cols.length; e++) p.cols[e].divider || (p.cols[e].calcSize(), p.cols[e].setValue(p.cols[e].value, 0, !1))
                }

                function s(e) {
                    if (e.preventDefault(), !p.opened && (p.open(), p.params.scrollToInput && !a())) {
                        var t = p.input.parents(".page-content");
                        if (0 === t.length) return;
                        var r, n = parseInt(t.css("padding-top"), 10),
                            i = parseInt(t.css("padding-bottom"), 10),
                            s = t[0].offsetHeight - n - p.container.height(),
                            o = t[0].scrollHeight - n - p.container.height(),
                            l = p.input.offset().top - n + p.input[0].offsetHeight;
                        if (l > s) {
                            var d = t.scrollTop() + l - s;
                            d + s > o && (r = d + s - o + i, s === o && (r = p.container.height()), t.css({
                                "padding-bottom": r + "px"
                            })), t.scrollTop(d, 300)
                        }
                    }
                }

                function o(e) {
                    t() || (p.input && p.input.length > 0 ? e.target !== p.input[0] && 0 === i(e.target).parents(".picker-modal").length && p.close() : 0 === i(e.target).parents(".picker-modal").length && p.close())
                }

                function l() {
                    p.opened = !1, p.input && p.input.length > 0 && (p.input.parents(".page-content").css({
                        "padding-bottom": ""
                    }), r.params.material && p.input.trigger("blur")), p.params.onClose && p.params.onClose(p), p.container.find(".picker-items-col").each(function () {
                        p.destroyPickerCol(this)
                    })
                }
                var p = this,
                    d = {
                        updateValuesOnMomentum: !1,
                        updateValuesOnTouchmove: !0,
                        rotateEffect: !1,
                        momentumRatio: 7,
                        freeMode: !1,
                        closeByOutsideClick: !0,
                        scrollToInput: !0,
                        inputReadOnly: !0,
                        convertToPopover: !0,
                        onlyInPopover: !1,
                        toolbar: !0,
                        toolbarCloseText: "Done",
                        toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner"><div class="left"></div><div class="right"><a href="#" class="link close-picker">{{closeText}}</a></div></div></div>'
                    };
                e = e || {};
                for (var c in d) void 0 === e[c] && (e[c] = d[c]);
                p.params = e, p.cols = [], p.initialized = !1, p.inline = !!p.params.container;
                var m = r.device.ios || navigator.userAgent.toLowerCase().indexOf("safari") >= 0 && navigator.userAgent.toLowerCase().indexOf("chrome") < 0 && !r.device.android;
                return p.setValue = function (e, a) {
                    var t = 0;
                    if (0 === p.cols.length) return p.value = e, void p.updateValue(e);
                    for (var r = 0; r < p.cols.length; r++) p.cols[r] && !p.cols[r].divider && (p.cols[r].setValue(e[t], a), t++)
                }, p.updateValue = function (e) {
                    var a, t, r = e || [],
                        n = [];
                    if (0 === p.cols.length) {
                        var s = p.params.cols.filter(function (e) {
                            return !e.divider
                        });
                        for (a = 0; a < s.length; a++) t = s[a], void 0 !== t.displayValues && void 0 !== t.values && -1 !== t.values.indexOf(r[a]) ? n.push(t.displayValues[t.values.indexOf(r[a])]) : n.push(r[a])
                    } else
                        for (a = 0; a < p.cols.length; a++) p.cols[a].divider || (r.push(p.cols[a].value), n.push(p.cols[a].displayValue));
                    r.indexOf(void 0) >= 0 || (p.value = r, p.displayValue = n, p.params.onChange && p.params.onChange(p, p.value, p.displayValue), p.input && p.input.length > 0 && (i(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(" ")), i(p.input).trigger("change")))
                }, p.initPickerCol = function (e, a) {
                    function t() {
                        w = i.requestAnimationFrame(function () {
                            u.updateItems(void 0, void 0, 0), t()
                        })
                    }

                    function n(e) {
                        y || C || (e.preventDefault(), C = !0, x = T = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, k = (new Date).getTime(), z = !0, S = I = i.getTranslate(u.wrapper[0], "y"))
                    }

                    function s(e) {
                        C && (e.preventDefault(), z = !1, T = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, y || (i.cancelAnimationFrame(w), y = !0, S = I = i.getTranslate(u.wrapper[0], "y"), u.wrapper.transition(0)), I = S + (T - x), M = void 0, I < v && (I = v - Math.pow(v - I, .8), M = "min"), I > b && (I = b + Math.pow(I - b, .8), M = "max"), u.wrapper.transform("translate3d(0," + I + "px,0)"), u.updateItems(void 0, I, 0, p.params.updateValuesOnTouchmove), O = I - E || I, L = (new Date).getTime(), E = I)
                    }

                    function o(e) {
                        if (!C || !y) return void(C = y = !1);
                        C = y = !1, u.wrapper.transition(""), M && ("min" === M ? u.wrapper.transform("translate3d(0," + v + "px,0)") : u.wrapper.transform("translate3d(0," + b + "px,0)")), P = (new Date).getTime();
                        var a;
                        P - k > 300 ? a = I : (Math.abs(O / (P - L)), a = I + O * p.params.momentumRatio), a = Math.max(Math.min(a, b), v);
                        var r = -Math.floor((a - b) / f);
                        p.params.freeMode || (a = -r * f + b), u.wrapper.transform("translate3d(0," + parseInt(a, 10) + "px,0)"), u.updateItems(r, a, "", !0), p.params.updateValuesOnMomentum && (t(), u.wrapper.transitionEnd(function () {
                            i.cancelAnimationFrame(w)
                        })), setTimeout(function () {
                            z = !0
                        }, 100)
                    }

                    function l(e) {
                        if (z) {
                            i.cancelAnimationFrame(w);
                            var a = i(this).attr("data-picker-value");
                            u.setValue(a)
                        }
                    }
                    var d = i(e),
                        c = d.index(),
                        u = p.cols[c];
                    if (!u.divider) {
                        u.container = d, u.wrapper = u.container.find(".picker-items-col-wrapper"), u.items = u.wrapper.find(".picker-item");
                        var h, f, g, v, b;
                        u.replaceValues = function (e, a) {
                            u.destroyEvents(), u.values = e, u.displayValues = a;
                            var t = p.columnHTML(u, !0);
                            u.wrapper.html(t), u.items = u.wrapper.find(".picker-item"), u.calcSize(), u.setValue(u.values[0], 0, !0), u.initEvents()
                        }, u.calcSize = function () {
                            p.params.rotateEffect && (u.container.removeClass("picker-items-col-absolute"), u.width || u.container.css({
                                width: ""
                            }));
                            var e, a;
                            e = 0, a = u.container[0].offsetHeight, h = u.wrapper[0].offsetHeight, f = u.items[0].offsetHeight, g = f * u.items.length, v = a / 2 - g + f / 2, b = a / 2 - f / 2, u.width && (e = u.width, parseInt(e, 10) === e && (e += "px"), u.container.css({
                                width: e
                            })), p.params.rotateEffect && (u.width || (u.items.each(function () {
                                var a = i(this).children("span");
                                e = Math.max(e, a[0].offsetWidth)
                            }), u.container.css({
                                width: e + 2 + "px"
                            })), u.container.addClass("picker-items-col-absolute"))
                        }, u.calcSize(), u.wrapper.transform("translate3d(0," + b + "px,0)").transition(0);
                        var w;
                        u.setValue = function (e, a, r) {
                            void 0 === a && (a = "");
                            var n = u.wrapper.find('.picker-item[data-picker-value="' + e + '"]').index();
                            if (void 0 !== n && -1 !== n) {
                                var s = -n * f + b;
                                u.wrapper.transition(a), u.wrapper.transform("translate3d(0," + s + "px,0)"), p.params.updateValuesOnMomentum && u.activeIndex && u.activeIndex !== n && (i.cancelAnimationFrame(w), u.wrapper.transitionEnd(function () {
                                    i.cancelAnimationFrame(w)
                                }), t()), u.updateItems(n, s, a, r)
                            }
                        }, u.updateItems = function (e, a, t, r) {
                            void 0 === a && (a = i.getTranslate(u.wrapper[0], "y")), void 0 === e && (e = -Math.round((a - b) / f)), e < 0 && (e = 0), e >= u.items.length && (e = u.items.length - 1);
                            var n = u.activeIndex;
                            u.activeIndex = e, u.wrapper.find(".picker-selected").removeClass("picker-selected"), u.items.transition(t);
                            var s = u.items.eq(e).addClass("picker-selected").transform("");
                            p.params.rotateEffect && (Math.floor((a - b) / f), u.items.each(function () {
                                var e = i(this),
                                    t = e.index() * f,
                                    r = b - a,
                                    n = t - r,
                                    s = n / f,
                                    o = Math.ceil(u.height / f / 2) + 1,
                                    l = -18 * s;
                                l > 180 && (l = 180), l < -180 && (l = -180), Math.abs(s) > o ? e.addClass("picker-item-far") : e.removeClass("picker-item-far"), e.transform("translate3d(0, " + (-a + b) + "px, " + (m ? -110 : 0) + "px) rotateX(" + l + "deg)")
                            })), (r || void 0 === r) && (u.value = s.attr("data-picker-value"), u.displayValue = u.displayValues ? u.displayValues[e] : u.value, n !== e && (u.onChange && u.onChange(p, u.value, u.displayValue), p.updateValue()))
                        }, a && u.updateItems(0, b, 0);
                        var C, y, x, T, k, P, S, M, I, E, O, L, z = !0;
                        u.initEvents = function (e) {
                            var a = e ? "off" : "on",
                                t = !!r.support.passiveListener && {
                                    passive: !1,
                                    capture: !1
                                };
                            u.container[a](r.touchEvents.start, n, t), u.container[a](r.touchEvents.move, s, t), u.container[a](r.touchEvents.end, o, t), u.items[a]("click", l)
                        }, u.destroyEvents = function () {
                            u.initEvents(!0)
                        }, u.container[0].f7DestroyPickerCol = function () {
                            u.destroyEvents()
                        }, u.initEvents()
                    }
                }, p.destroyPickerCol = function (e) {
                    e = i(e), "f7DestroyPickerCol" in e[0] && e[0].f7DestroyPickerCol()
                }, r.onResize(n), p.columnHTML = function (e, a) {
                    var t = "",
                        r = "";
                    if (e.divider) r += '<div class="picker-items-col picker-items-col-divider ' + (e.textAlign ? "picker-items-col-" + e.textAlign : "") + " " + (e.cssClass || "") + '">' + e.content + "</div>";
                    else {
                        for (var n = 0; n < e.values.length; n++) t += '<div class="picker-item" data-picker-value="' + e.values[n] + '"><span>' + (e.displayValues ? e.displayValues[n] : e.values[n]) + "</span></div>";
                        r += '<div class="picker-items-col ' + (e.textAlign ? "picker-items-col-" + e.textAlign : "") + " " + (e.cssClass || "") + '"><div class="picker-items-col-wrapper">' + t + "</div></div>"
                    }
                    return a ? t : r
                }, p.layout = function () {
                    var e, a = "",
                        t = "";
                    p.cols = [];
                    var r = "";
                    for (e = 0; e < p.params.cols.length; e++) {
                        var n = p.params.cols[e];
                        r += p.columnHTML(p.params.cols[e]), p.cols.push(n)
                    }
                    t = "picker-modal picker-columns " + (p.params.cssClass || "") + (p.params.rotateEffect ? " picker-3d" : ""), a = '<div class="' + t + '">' + (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : "") + '<div class="picker-modal-inner picker-items">' + r + '<div class="picker-center-highlight"></div></div></div>', p.pickerHTML = a
                }, p.params.input && (p.input = i(p.params.input), p.input.length > 0 && (p.params.inputReadOnly && p.input.prop("readOnly", !0), p.inline || p.input.on("click", s), p.params.inputReadOnly && p.input.on("focus mousedown", function (e) {
                    e.preventDefault()
                }))), !p.inline && p.params.closeByOutsideClick && i("html").on("click", o), p.opened = !1, p.open = function () {
                    var e = a();
                    p.opened || (p.layout(), e ? (p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + "</div></div>", p.popover = r.popover(p.pickerHTML, p.params.input, !0), p.container = i(p.popover).find(".picker-modal"), i(p.popover).on("popover:close", function () {
                        l()
                    })) : p.inline ? (p.container = i(p.pickerHTML), p.container.addClass("picker-modal-inline"), i(p.params.container).append(p.container)) : (p.container = i(r.pickerModal(p.pickerHTML)), i(p.container).on("picker:close", function () {
                        l()
                    })), p.container[0].f7Picker = p, p.container.find(".picker-items-col").each(function () {
                        var e = !0;
                        (!p.initialized && p.params.value || p.initialized && p.value) && (e = !1), p.initPickerCol(this, e)
                    }), p.initialized ? p.value && p.setValue(p.value, 0) : p.value ? p.setValue(p.value, 0) : p.params.value && p.setValue(p.params.value, 0), p.input && p.input.length > 0 && r.params.material && p.input.trigger("focus")), p.opened = !0, p.initialized = !0, p.params.onOpen && p.params.onOpen(p)
                }, p.close = function () {
                    if (p.opened && !p.inline) return t() ? void r.closeModal(p.popover) : void r.closeModal(p.container)
                }, p.destroy = function () {
                    p.close(), p.params.input && p.input.length > 0 && p.input.off("click focus", s), i("html").off("click", o), r.offResize(n)
                }, p.inline ? p.open() : !p.initialized && p.params.value && p.setValue(p.params.value), p
            };
            r.picker = function (e) {
                return new b(e)
            };
            var w = function (e) {
                function a() {
                    var e = !1;
                    return p.params.convertToPopover || p.params.onlyInPopover ? (!p.inline && p.params.input && (p.params.onlyInPopover ? e = !0 : r.device.ios ? e = !!r.device.ipad : r.width >= 768 && (e = !0)), e) : e
                }

                function t() {
                    return !!(p.opened && p.container && p.container.length > 0 && p.container.parents(".popover").length > 0)
                }

                function n(e) {
                    e = new Date(e);
                    var a = e.getFullYear(),
                        t = e.getMonth(),
                        r = t + 1,
                        n = e.getDate(),
                        i = e.getDay();
                    return p.params.dateFormat.replace(/yyyy/g, a).replace(/yy/g, (a + "").substring(2)).replace(/mm/g, r < 10 ? "0" + r : r).replace(/m(\W+)/g, r + "$1").replace(/MM/g, p.params.monthNames[t]).replace(/M(\W+)/g, p.params.monthNamesShort[t] + "$1").replace(/dd/g, n < 10 ? "0" + n : n).replace(/d(\W+)/g, n + "$1").replace(/DD/g, p.params.dayNames[i]).replace(/D(\W+)/g, p.params.dayNamesShort[i] + "$1")
                }

                function s(e) {
                    if (e.preventDefault(), !p.opened && (p.open(), p.params.scrollToInput && !a() && !r.params.material)) {
                        var t = p.input.parents(".page-content");
                        if (0 === t.length) return;
                        var n, i = parseInt(t.css("padding-top"), 10),
                            s = parseInt(t.css("padding-bottom"), 10),
                            o = t[0].offsetHeight - i - p.container.height(),
                            l = t[0].scrollHeight - i - p.container.height(),
                            d = p.input.offset().top - i + p.input[0].offsetHeight;
                        if (d > o) {
                            var c = t.scrollTop() + d - o;
                            c + o > l && (n = c + o - l + s, o === l && (n = p.container.height()), t.css({
                                "padding-bottom": n + "px"
                            })), t.scrollTop(c, 300)
                        }
                    }
                }

                function o(e) {
                    t() || (p.input && p.input.length > 0 ? e.target !== p.input[0] && 0 === i(e.target).parents(".picker-modal").length && p.close() : 0 === i(e.target).parents(".picker-modal").length && p.close())
                }

                function l() {
                    p.opened = !1, p.input && p.input.length > 0 && (p.input.parents(".page-content").css({
                        "padding-bottom": ""
                    }), r.params.material && p.input.trigger("blur")), p.params.onClose && p.params.onClose(p), p.destroyCalendarEvents()
                }
                var p = this,
                    d = {
                        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        firstDay: 1,
                        weekendDays: [0, 6],
                        multiple: !1,
                        rangePicker: !1,
                        dateFormat: "yyyy-mm-dd",
                        direction: "horizontal",
                        minDate: null,
                        maxDate: null,
                        disabled: null,
                        events: null,
                        rangesClasses: null,
                        touchMove: !0,
                        animate: !0,
                        closeOnSelect: !1,
                        monthPicker: !0,
                        monthPickerTemplate: '<div class="picker-calendar-month-picker"><a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a><span class="current-month-value"></span><a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a></div>',
                        yearPicker: !0,
                        yearPickerTemplate: '<div class="picker-calendar-year-picker"><a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a><span class="current-year-value"></span><a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a></div>',
                        weekHeader: !0,
                        closeByOutsideClick: !0,
                        scrollToInput: !0,
                        inputReadOnly: !0,
                        convertToPopover: !0,
                        onlyInPopover: !1,
                        toolbar: !0,
                        toolbarCloseText: "Done",
                        headerPlaceholder: "Select date",
                        header: r.params.material,
                        footer: r.params.material,
                        toolbarTemplate: '<div class="toolbar"><div class="toolbar-inner">{{monthPicker}}{{yearPicker}}</div></div>',
                        headerTemplate: '<div class="picker-header"><div class="picker-calendar-selected-date">{{placeholder}}</div></div>',
                        footerTemplate: '<div class="picker-footer"><a href="#" class="button close-picker">{{closeText}}</a></div>'
                    };
                e = e || {};
                for (var c in d) void 0 === e[c] && (e[c] = d[c]);
                p.params = e, p.initialized = !1, p.inline = !!p.params.container, p.isH = "horizontal" === p.params.direction;
                var m = p.isH && r.rtl ? -1 : 1;
                return p.animating = !1, p.addValue = function (e) {
                    if (p.params.multiple) {
                        p.value || (p.value = []);
                        for (var a, t = 0; t < p.value.length; t++) new Date(e).getTime() === new Date(p.value[t]).getTime() && (a = t);
                        void 0 === a ? p.value.push(e) : p.value.splice(a, 1), p.updateValue()
                    } else p.params.rangePicker ? (p.value || (p.value = []), 2 !== p.value.length && 0 !== p.value.length || (p.value = []), p.value[0] !== e ? p.value.push(e) : p.value = [], p.value.sort(function (e, a) {
                        return e - a
                    }), p.updateValue()) : (p.value = [e], p.updateValue())
                }, p.setValue = function (e) {
                    p.value = e, p.updateValue()
                }, p.updateValue = function (e) {
                    var a, t;
                    if (p.container && p.container.length > 0) {
                        p.wrapper.find(".picker-calendar-day-selected").removeClass("picker-calendar-day-selected");
                        var s;
                        if (p.params.rangePicker && 2 === p.value.length)
                            for (a = new Date(p.value[0]).getTime(); a <= new Date(p.value[1]).getTime(); a += 864e5) s = new Date(a), p.wrapper.find('.picker-calendar-day[data-date="' + s.getFullYear() + "-" + s.getMonth() + "-" + s.getDate() + '"]').addClass("picker-calendar-day-selected");
                        else
                            for (a = 0; a < p.value.length; a++) s = new Date(p.value[a]), p.wrapper.find('.picker-calendar-day[data-date="' + s.getFullYear() + "-" + s.getMonth() + "-" + s.getDate() + '"]').addClass("picker-calendar-day-selected")
                    }
                    if (p.params.onChange && p.params.onChange(p, p.value), p.input && p.input.length > 0 || r.params.material && p.params.header) {
                        if (p.params.formatValue) t = p.params.formatValue(p, p.value);
                        else {
                            for (t = [], a = 0; a < p.value.length; a++) t.push(n(p.value[a]));
                            t = t.join(p.params.rangePicker ? " - " : ", ")
                        }
                        r.params.material && p.params.header && p.container && p.container.length > 0 && p.container.find(".picker-calendar-selected-date").text(t), p.input && p.input.length > 0 && !e && (i(p.input).val(t), i(p.input).trigger("change"))
                    }
                }, p.initCalendarEvents = function () {
                    function e(e) {
                        o || s || (s = !0, l = u = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, d = u = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY, h = (new Date).getTime(), C = 0, T = !0, x = void 0, g = v = p.monthsTranslate)
                    }

                    function a(e) {
                        if (s) {
                            if (c = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, u = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, void 0 === x && (x = !!(x || Math.abs(u - d) > Math.abs(c - l))), p.isH && x) return void(s = !1);
                            if (e.preventDefault(), p.animating) return void(s = !1);
                            T = !1, o || (o = !0,
                                b = p.wrapper[0].offsetWidth, w = p.wrapper[0].offsetHeight, p.wrapper.transition(0)), y = p.isH ? c - l : u - d, C = y / (p.isH ? b : w), v = 100 * (p.monthsTranslate * m + C), p.wrapper.transform("translate3d(" + (p.isH ? v : 0) + "%, " + (p.isH ? 0 : v) + "%, 0)")
                        }
                    }

                    function t(e) {
                        if (!s || !o) return void(s = o = !1);
                        s = o = !1, f = (new Date).getTime(), f - h < 300 ? Math.abs(y) < 10 ? p.resetMonth() : y >= 10 ? r.rtl ? p.nextMonth() : p.prevMonth() : r.rtl ? p.prevMonth() : p.nextMonth() : C <= -.5 ? r.rtl ? p.prevMonth() : p.nextMonth() : C >= .5 ? r.rtl ? p.nextMonth() : p.prevMonth() : p.resetMonth(), setTimeout(function () {
                            T = !0
                        }, 100)
                    }

                    function n(e) {
                        if (T) {
                            var a = i(e.target).parents(".picker-calendar-day");
                            if (0 === a.length && i(e.target).hasClass("picker-calendar-day") && (a = i(e.target)), 0 !== a.length && !a.hasClass("picker-calendar-day-disabled")) {
                                p.params.rangePicker || (a.hasClass("picker-calendar-day-next") && p.nextMonth(), a.hasClass("picker-calendar-day-prev") && p.prevMonth());
                                var t = a.attr("data-year"),
                                    r = a.attr("data-month"),
                                    n = a.attr("data-day");
                                p.params.onDayClick && p.params.onDayClick(p, a[0], t, r, n), (!a.hasClass("picker-calendar-day-selected") || p.params.multiple || p.params.rangePicker) && p.addValue(new Date(t, r, n, 0, 0, 0)), p.params.closeOnSelect && (p.params.rangePicker && 2 === p.value.length || !p.params.rangePicker) && p.close()
                            }
                        }
                    }
                    var s, o, l, d, c, u, h, f, g, v, b, w, C, y, x, T = !0;
                    p.container.find(".picker-calendar-prev-month").on("click", p.prevMonth), p.container.find(".picker-calendar-next-month").on("click", p.nextMonth), p.container.find(".picker-calendar-prev-year").on("click", p.prevYear), p.container.find(".picker-calendar-next-year").on("click", p.nextYear), p.wrapper.on("click", n);
                    var k = !("touchstart" !== r.touchEvents.start || !r.support.passiveListener) && {
                            passive: !0,
                            capture: !1
                        },
                        P = !!r.support.passiveListener && {
                            passive: !1,
                            capture: !1
                        };
                    p.params.touchMove && (p.wrapper.on(r.touchEvents.start, e, k), p.wrapper.on(r.touchEvents.move, a, P), p.wrapper.on(r.touchEvents.end, t, k)), p.container[0].f7DestroyCalendarEvents = function () {
                        p.container.find(".picker-calendar-prev-month").off("click", p.prevMonth), p.container.find(".picker-calendar-next-month").off("click", p.nextMonth), p.container.find(".picker-calendar-prev-year").off("click", p.prevYear), p.container.find(".picker-calendar-next-year").off("click", p.nextYear), p.wrapper.off("click", n), p.params.touchMove && (p.wrapper.off(r.touchEvents.start, e, k), p.wrapper.off(r.touchEvents.move, a, P), p.wrapper.off(r.touchEvents.end, t, k))
                    }
                }, p.destroyCalendarEvents = function (e) {
                    "f7DestroyCalendarEvents" in p.container[0] && p.container[0].f7DestroyCalendarEvents()
                }, p.dateInRange = function (e, a) {
                    var t, r = !1;
                    if (!a) return !1;
                    if (Array.isArray(a))
                        for (t = 0; t < a.length; t++) a[t].from || a[t].to ? a[t].from && a[t].to ? e <= new Date(a[t].to).getTime() && e >= new Date(a[t].from).getTime() && (r = !0) : a[t].from ? e >= new Date(a[t].from).getTime() && (r = !0) : a[t].to && e <= new Date(a[t].to).getTime() && (r = !0) : e === new Date(a[t]).getTime() && (r = !0);
                    else a.from || a.to ? a.from && a.to ? e <= new Date(a.to).getTime() && e >= new Date(a.from).getTime() && (r = !0) : a.from ? e >= new Date(a.from).getTime() && (r = !0) : a.to && e <= new Date(a.to).getTime() && (r = !0) : "function" == typeof a && (r = a(new Date(e)));
                    return r
                }, p.daysInMonth = function (e) {
                    var a = new Date(e);
                    return new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate()
                }, p.monthHTML = function (e, a) {
                    e = new Date(e);
                    var t = e.getFullYear(),
                        r = e.getMonth();
                    e.getDate(), "next" === a && (e = 11 === r ? new Date(t + 1, 0) : new Date(t, r + 1, 1)), "prev" === a && (e = 0 === r ? new Date(t - 1, 11) : new Date(t, r - 1, 1)), "next" !== a && "prev" !== a || (r = e.getMonth(), t = e.getFullYear());
                    var n = p.daysInMonth(new Date(e.getFullYear(), e.getMonth()).getTime() - 864e6),
                        i = p.daysInMonth(e),
                        s = new Date(e.getFullYear(), e.getMonth()).getDay();
                    0 === s && (s = 7);
                    var o, l, d, c, m, u, h = [],
                        f = "",
                        g = p.params.firstDay - 1 + 0,
                        v = (new Date).setHours(0, 0, 0, 0),
                        b = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
                        w = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;
                    if (p.value && p.value.length)
                        for (l = 0; l < p.value.length; l++) h.push(new Date(p.value[l]).setHours(0, 0, 0, 0));
                    for (l = 1; l <= 6; l++) {
                        var C = "";
                        for (d = 1; d <= 7; d++) {
                            var y = d;
                            g++;
                            var x = g - s,
                                T = y - 1 + p.params.firstDay > 6 ? y - 1 - 7 + p.params.firstDay : y - 1 + p.params.firstDay,
                                k = "";
                            if (x < 0 ? (x = n + x + 1, k += " picker-calendar-day-prev", o = new Date(r - 1 < 0 ? t - 1 : t, r - 1 < 0 ? 11 : r - 1, x).getTime()) : (x += 1, x > i ? (x -= i, k += " picker-calendar-day-next", o = new Date(r + 1 > 11 ? t + 1 : t, r + 1 > 11 ? 0 : r + 1, x).getTime()) : o = new Date(t, r, x).getTime()), o === v && (k += " picker-calendar-day-today"), p.params.rangePicker && 2 === h.length ? o >= h[0] && o <= h[1] && (k += " picker-calendar-day-selected") : h.indexOf(o) >= 0 && (k += " picker-calendar-day-selected"), p.params.weekendDays.indexOf(T) >= 0 && (k += " picker-calendar-day-weekend"), u = !1, p.params.events && p.dateInRange(o, p.params.events) && (u = !0), u && (k += " picker-calendar-day-has-events"), p.params.rangesClasses)
                                for (c = 0; c < p.params.rangesClasses.length; c++) p.dateInRange(o, p.params.rangesClasses[c].range) && (k += " " + p.params.rangesClasses[c].cssClass);
                            m = !1, (b && o < b || w && o > w) && (m = !0), p.params.disabled && p.dateInRange(o, p.params.disabled) && (m = !0), m && (k += " picker-calendar-day-disabled"), o = new Date(o);
                            var P = o.getFullYear(),
                                S = o.getMonth();
                            C += '<div data-year="' + P + '" data-month="' + S + '" data-day="' + x + '" class="picker-calendar-day' + k + '" data-date="' + P + "-" + S + "-" + x + '"><span>' + x + "</span></div>"
                        }
                        f += '<div class="picker-calendar-row">' + C + "</div>"
                    }
                    return f = '<div class="picker-calendar-month" data-year="' + t + '" data-month="' + r + '">' + f + "</div>"
                }, p.animating = !1, p.updateCurrentMonthYear = function (e) {
                    void 0 === e ? (p.currentMonth = parseInt(p.months.eq(1).attr("data-month"), 10), p.currentYear = parseInt(p.months.eq(1).attr("data-year"), 10)) : (p.currentMonth = parseInt(p.months.eq("next" === e ? p.months.length - 1 : 0).attr("data-month"), 10), p.currentYear = parseInt(p.months.eq("next" === e ? p.months.length - 1 : 0).attr("data-year"), 10)), p.container.find(".current-month-value").text(p.params.monthNames[p.currentMonth]), p.container.find(".current-year-value").text(p.currentYear)
                }, p.onMonthChangeStart = function (e) {
                    p.updateCurrentMonthYear(e), p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                    var a = "next" === e ? p.months.length - 1 : 0;
                    p.months.eq(a).addClass("picker-calendar-month-current"), p.months.eq("next" === e ? a - 1 : a + 1).addClass("next" === e ? "picker-calendar-month-prev" : "picker-calendar-month-next"), p.params.onMonthYearChangeStart && p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth)
                }, p.onMonthChangeEnd = function (e, a) {
                    p.animating = !1;
                    var t, r, n;
                    p.wrapper.find(".picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)").remove(), void 0 === e && (e = "next", a = !0), a ? (p.wrapper.find(".picker-calendar-month-next, .picker-calendar-month-prev").remove(), r = p.monthHTML(new Date(p.currentYear, p.currentMonth), "prev"), t = p.monthHTML(new Date(p.currentYear, p.currentMonth), "next")) : n = p.monthHTML(new Date(p.currentYear, p.currentMonth), e), ("next" === e || a) && p.wrapper.append(n || t), ("prev" === e || a) && p.wrapper.prepend(n || r), p.months = p.wrapper.find(".picker-calendar-month"), p.setMonthsTranslate(p.monthsTranslate), p.params.onMonthAdd && p.params.onMonthAdd(p, "next" === e ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]), p.params.onMonthYearChangeEnd && p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth)
                }, p.setMonthsTranslate = function (e) {
                    e = e || p.monthsTranslate || 0, void 0 === p.monthsTranslate && (p.monthsTranslate = e), p.months.removeClass("picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next");
                    var a = 100 * -(e + 1) * m,
                        t = 100 * -e * m,
                        r = 100 * -(e - 1) * m;
                    p.months.eq(0).transform("translate3d(" + (p.isH ? a : 0) + "%, " + (p.isH ? 0 : a) + "%, 0)").addClass("picker-calendar-month-prev"), p.months.eq(1).transform("translate3d(" + (p.isH ? t : 0) + "%, " + (p.isH ? 0 : t) + "%, 0)").addClass("picker-calendar-month-current"), p.months.eq(2).transform("translate3d(" + (p.isH ? r : 0) + "%, " + (p.isH ? 0 : r) + "%, 0)").addClass("picker-calendar-month-next")
                }, p.nextMonth = function (e) {
                    void 0 !== e && "object" != typeof e || (e = "", p.params.animate || (e = 0));
                    var a = parseInt(p.months.eq(p.months.length - 1).attr("data-month"), 10),
                        t = parseInt(p.months.eq(p.months.length - 1).attr("data-year"), 10),
                        r = new Date(t, a),
                        n = r.getTime(),
                        s = !p.animating;
                    if (p.params.maxDate && n > new Date(p.params.maxDate).getTime()) return p.resetMonth();
                    if (p.monthsTranslate--, a === p.currentMonth) {
                        var o = 100 * -p.monthsTranslate * m,
                            l = i(p.monthHTML(n, "next")).transform("translate3d(" + (p.isH ? o : 0) + "%, " + (p.isH ? 0 : o) + "%, 0)").addClass("picker-calendar-month-next");
                        p.wrapper.append(l[0]), p.months = p.wrapper.find(".picker-calendar-month"), p.params.onMonthAdd && p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0])
                    }
                    p.animating = !0, p.onMonthChangeStart("next");
                    var d = 100 * p.monthsTranslate * m;
                    p.wrapper.transition(e).transform("translate3d(" + (p.isH ? d : 0) + "%, " + (p.isH ? 0 : d) + "%, 0)"), s && p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd("next")
                    }), p.params.animate || p.onMonthChangeEnd("next")
                }, p.prevMonth = function (e) {
                    void 0 !== e && "object" != typeof e || (e = "", p.params.animate || (e = 0));
                    var a = parseInt(p.months.eq(0).attr("data-month"), 10),
                        t = parseInt(p.months.eq(0).attr("data-year"), 10),
                        r = new Date(t, a + 1, -1),
                        n = r.getTime(),
                        s = !p.animating;
                    if (p.params.minDate && n < new Date(p.params.minDate).getTime()) return p.resetMonth();
                    if (p.monthsTranslate++, a === p.currentMonth) {
                        var o = 100 * -p.monthsTranslate * m,
                            l = i(p.monthHTML(n, "prev")).transform("translate3d(" + (p.isH ? o : 0) + "%, " + (p.isH ? 0 : o) + "%, 0)").addClass("picker-calendar-month-prev");
                        p.wrapper.prepend(l[0]), p.months = p.wrapper.find(".picker-calendar-month"), p.params.onMonthAdd && p.params.onMonthAdd(p, p.months.eq(0)[0])
                    }
                    p.animating = !0, p.onMonthChangeStart("prev");
                    var d = 100 * p.monthsTranslate * m;
                    p.wrapper.transition(e).transform("translate3d(" + (p.isH ? d : 0) + "%, " + (p.isH ? 0 : d) + "%, 0)"), s && p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd("prev")
                    }), p.params.animate || p.onMonthChangeEnd("prev")
                }, p.resetMonth = function (e) {
                    void 0 === e && (e = "");
                    var a = 100 * p.monthsTranslate * m;
                    p.wrapper.transition(e).transform("translate3d(" + (p.isH ? a : 0) + "%, " + (p.isH ? 0 : a) + "%, 0)")
                }, p.setYearMonth = function (e, a, t) {
                    void 0 === e && (e = p.currentYear), void 0 === a && (a = p.currentMonth), void 0 !== t && "object" != typeof t || (t = "", p.params.animate || (t = 0));
                    var r;
                    if (r = e < p.currentYear ? new Date(e, a + 1, -1).getTime() : new Date(e, a).getTime(), p.params.maxDate && r > new Date(p.params.maxDate).getTime()) return !1;
                    if (p.params.minDate && r < new Date(p.params.minDate).getTime()) return !1;
                    var n = new Date(p.currentYear, p.currentMonth).getTime(),
                        i = r > n ? "next" : "prev",
                        s = p.monthHTML(new Date(e, a));
                    p.monthsTranslate = p.monthsTranslate || 0;
                    var o, l, d = p.monthsTranslate,
                        c = !p.animating;
                    r > n ? (p.monthsTranslate--, p.animating || p.months.eq(p.months.length - 1).remove(), p.wrapper.append(s), p.months = p.wrapper.find(".picker-calendar-month"), o = 100 * -(d - 1) * m, p.months.eq(p.months.length - 1).transform("translate3d(" + (p.isH ? o : 0) + "%, " + (p.isH ? 0 : o) + "%, 0)").addClass("picker-calendar-month-next")) : (p.monthsTranslate++, p.animating || p.months.eq(0).remove(), p.wrapper.prepend(s), p.months = p.wrapper.find(".picker-calendar-month"), o = 100 * -(d + 1) * m, p.months.eq(0).transform("translate3d(" + (p.isH ? o : 0) + "%, " + (p.isH ? 0 : o) + "%, 0)").addClass("picker-calendar-month-prev")), p.params.onMonthAdd && p.params.onMonthAdd(p, "next" === i ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]), p.animating = !0, p.onMonthChangeStart(i), l = 100 * p.monthsTranslate * m, p.wrapper.transition(t).transform("translate3d(" + (p.isH ? l : 0) + "%, " + (p.isH ? 0 : l) + "%, 0)"), c && p.wrapper.transitionEnd(function () {
                        p.onMonthChangeEnd(i, !0)
                    }), p.params.animate || p.onMonthChangeEnd(i)
                }, p.nextYear = function () {
                    p.setYearMonth(p.currentYear + 1)
                }, p.prevYear = function () {
                    p.setYearMonth(p.currentYear - 1)
                }, p.layout = function () {
                    var e, a = "",
                        t = "",
                        r = p.value && p.value.length ? p.value[0] : (new Date).setHours(0, 0, 0, 0),
                        n = p.monthHTML(r, "prev"),
                        i = p.monthHTML(r),
                        s = p.monthHTML(r, "next"),
                        o = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (n + i + s) + "</div></div>",
                        l = "";
                    if (p.params.weekHeader) {
                        for (e = 0; e < 7; e++) {
                            var d = e + p.params.firstDay > 6 ? e - 7 + p.params.firstDay : e + p.params.firstDay,
                                c = p.params.dayNamesShort[d];
                            l += '<div class="picker-calendar-week-day ' + (p.params.weekendDays.indexOf(d) >= 0 ? "picker-calendar-week-day-weekend" : "") + '"> ' + c + "</div>"
                        }
                        l = '<div class="picker-calendar-week-days">' + l + "</div>"
                    }
                    t = "picker-modal picker-calendar" + (p.params.rangePicker ? " picker-calendar-range" : "") + (p.params.cssClass ? " " + p.params.cssClass : "");
                    var m = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : "";
                    p.params.toolbar && (m = p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{monthPicker}}/g, p.params.monthPicker ? p.params.monthPickerTemplate : "").replace(/{{yearPicker}}/g, p.params.yearPicker ? p.params.yearPickerTemplate : "")), a = '<div class="' + t + '">' + (p.params.header ? p.params.headerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{placeholder}}/g, p.params.headerPlaceholder) : "") + (p.params.footer ? p.params.footerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : "") + m + '<div class="picker-modal-inner">' + l + o + "</div></div>", p.pickerHTML = a
                }, p.params.input && (p.input = i(p.params.input), p.input.length > 0 && (p.params.inputReadOnly && p.input.prop("readOnly", !0), p.inline || p.input.on("click", s), p.params.inputReadOnly && p.input.on("focus mousedown", function (e) {
                    e.preventDefault()
                }))), !p.inline && p.params.closeByOutsideClick && i("html").on("click", o), p.opened = !1, p.open = function () {
                    var e = a(),
                        t = !1;
                    p.opened || (p.value || p.params.value && (p.value = p.params.value, t = !0), p.layout(), e ? (p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + "</div></div>", p.popover = r.popover(p.pickerHTML, p.params.input, !0), p.container = i(p.popover).find(".picker-modal"), i(p.popover).on("popover:close", function () {
                        l()
                    })) : p.inline ? (p.container = i(p.pickerHTML), p.container.addClass("picker-modal-inline"), i(p.params.container).append(p.container)) : (p.container = i(r.pickerModal(p.pickerHTML)), i(p.container).on("picker:close", function () {
                        l()
                    })), p.container[0].f7Calendar = p, p.wrapper = p.container.find(".picker-calendar-months-wrapper"), p.months = p.wrapper.find(".picker-calendar-month"), p.updateCurrentMonthYear(), p.monthsTranslate = 0, p.setMonthsTranslate(), p.initCalendarEvents(), t ? p.updateValue() : r.params.material && p.value && p.updateValue(!0), p.input && p.input.length > 0 && r.params.material && p.input.trigger("focus")), p.opened = !0, p.initialized = !0, p.params.onMonthAdd && p.months.each(function () {
                        p.params.onMonthAdd(p, this)
                    }), p.params.onOpen && p.params.onOpen(p)
                }, p.close = function () {
                    if (p.opened && !p.inline) return t() ? void r.closeModal(p.popover) : void r.closeModal(p.container)
                }, p.destroy = function () {
                    p.close(), p.params.input && p.input.length > 0 && p.input.off("click focus", s), i("html").off("click", o)
                }, p.inline ? p.open() : !p.initialized && p.params.value && p.setValue(p.params.value), p
            };
            r.calendar = function (e) {
                return new w(e)
            };
            var C;
            r.addNotification = function (e) {
                if (e) {
                    void 0 === e.media && (e.media = r.params.notificationMedia), void 0 === e.title && (e.title = r.params.notificationTitle), void 0 === e.subtitle && (e.subtitle = r.params.notificationSubtitle), void 0 === e.closeIcon && (e.closeIcon = r.params.notificationCloseIcon), void 0 === e.hold && (e.hold = r.params.notificationHold), void 0 === e.closeOnClick && (e.closeOnClick = r.params.notificationCloseOnClick), void 0 === e.button && (e.button = r.params.notificationCloseButtonText && {
                        text: r.params.notificationCloseButtonText,
                        close: !0
                    }), C || (C = document.createElement("div")), e.material = r.params.material;
                    var a = i(".notifications");
                    0 === a.length && (r.root.append('<div class="notifications list-block' + (e.material ? "" : " media-list") + '"><ul></ul></div>'), a = i(".notifications"));
                    var t = a.children("ul"),
                        n = r.params.notificationTemplate || '{{#if custom}}<li>{{custom}}</li>{{else}}<li class="notification-item notification-hidden"><div class="item-content">{{#if material}}<div class="item-inner"><div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>{{#if ../button}}{{#button}}<div class="item-after"><a href="#" class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a></div>{{/button}}{{/if}}</div>{{else}}{{#if media}}<div class="item-media">{{media}}</div>{{/if}}<div class="item-inner"><div class="item-title-row">{{#if title}}<div class="item-title">{{title}}</div>{{/if}}{{#if closeIcon}}<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>{{/if}}</div>{{#if subtitle}}<div class="item-subtitle">{{subtitle}}</div>{{/if}}{{#if message}}<div class="item-text">{{message}}</div></div>{{/if}}{{/if}}</div></li>{{/if}}';
                    r._compiledTemplates.notification || (r._compiledTemplates.notification = s.compile(n)), C.innerHTML = r._compiledTemplates.notification(e);
                    var o = i(C).children();
                    o.on("click", function (a) {
                        var t = !1,
                            n = i(a.target);
                        e.material && n.hasClass("button") && e.button && e.button.onClick && e.button.onClick.call(n[0], a, o[0]), n.is(".close-notification") || i(a.target).parents(".close-notification").length > 0 ? t = !0 : (e.onClick && e.onClick(a, o[0]), e.closeOnClick && (t = !0)), t && r.closeNotification(o[0], a)
                    }), e.onClose && o.data("f7NotificationOnClose", function (a) {
                        e.onClose(o[0], a)
                    }), e.additionalClass && o.addClass(e.additionalClass), e.hold && setTimeout(function () {
                        o.length > 0 && r.closeNotification(o[0])
                    }, e.hold), r.params.material || r.closeNotification(t.children("li.notification-item:last-child")), t.append(o[0]), a.show();
                    var l = o.outerHeight();
                    return e.material ? (a.transform("translate3d(0, " + l + "px, 0)"), a.transition(0), o[0].clientLeft, a.transform("translate3d(0, 0, 0)"), a.transition("")) : (o.transform("translate3d(0," + -l + "px,0)"), o.transition(0), o[0].clientLeft, o.transition(""), o.transform("translate3d(0,0px,0)")), a.transform("translate3d(0, 0,0)"), o.removeClass("notification-hidden"), o[0]
                }
            }, r.closeNotification = function (e, a) {
                if (e = i(e), 0 !== e.length && !e.hasClass("notification-item-removing")) {
                    var t = i(".notifications"),
                        r = e.outerHeight();
                    e.css("height", r + "px").transition(0).addClass("notification-item-removing"), e[0].clientLeft, e.css({
                        height: "0px",
                        marginBottom: "0px"
                    }).transition(""), e.data("f7NotificationOnClose") && e.data("f7NotificationOnClose")(a), 0 === t.find(".notification-item:not(.notification-item-removing)").length && t.transform(""), e.addClass("notification-hidden").transitionEnd(function () {
                        e.remove(), 0 === t.find(".notification-item").length && t.hide()
                    })
                }
            }, r.initDataTable = function (e) {
                function a() {
                    if (r.length > 0 && n.length > 0) {
                        var a = e.find("tbody .checkbox-cell input:checked").length;
                        e[a > 0 ? "addClass" : "removeClass"]("data-table-has-checked"), n.find(".data-table-selected-count").text(a)
                    }
                }

                function t(e, a, t) {
                    0 === e && a[t ? "addClass" : "removeClass"]("data-table-row-selected")
                }
                e = i(e);
                var r = e.find(".data-table-header"),
                    n = e.find(".data-table-header-selected");
                e.on("change", '.checkbox-cell input[type="checkbox"]', function (r) {
                    if (!r.detail || !r.detail._sentByF7DataTable) {
                        var n = i(this),
                            s = n[0].checked,
                            o = n.parents("th"),
                            l = n.parents("td,th").index();
                        o.length > 0 ? (t(l, e.find("tbody tr"), s), e.find("tbody tr td:nth-child(" + (l + 1) + ") input").prop("checked", s).trigger("change", {
                            _sentByF7DataTable: !0
                        })) : (t(l, n.parents("tr"), s), s ? e.find("tbody .checkbox-cell:nth-child(" + (l + 1) + ') input[type="checkbox"]:checked').length === e.find("tbody tr").length && e.find("thead .checkbox-cell:nth-child(" + (l + 1) + ') input[type="checkbox"]').prop("checked", !0).trigger("change", {
                            _sentByF7DataTable: !0
                        }) : e.find("thead .checkbox-cell:nth-child(" + (l + 1) + ') input[type="checkbox"]').prop("checked", !1)), a()
                    }
                }), a(), e.find("thead .sortable-cell").on("click", function () {
                    var a, t = i(this);
                    t.hasClass("sortable-active") ? (a = t.hasClass("sortable-desc") ? "desc" : "asc", t.removeClass("sortable-desc sortable-asc").addClass("sortable-" + ("desc" === a ? "asc" : "desc"))) : (e.find("thead .sortable-active").removeClass("sortable-active"), t.addClass("sortable-active"))
                }), e.hasClass("data-table-collapsible") && e.find("tbody td:not(.checkbox-cell)").each(function () {
                    var a = i(this).index(),
                        t = i(this).attr("data-collapsible-title");
                    t || "" === t || i(this).attr("data-collapsible-title", e.find("thead th").eq(a).text())
                })
            }, r.initPageDataTables = function (e) {
                e = i(e);
                var a = e.find(".data-table-init");
                0 === a.length && e.hasClass("data-table-init") && (a = e), a.each(function () {
                    r.initDataTable(this)
                })
            }, r.initTemplate7Templates = function () {
                window.Template7 && (Template7.templates = Template7.templates || r.params.templates || {}, Template7.data = Template7.data || r.params.template7Data || {}, Template7.cache = Template7.cache || {}, r.templates = Template7.templates, r.template7Data = Template7.data, r.template7Cache = Template7.cache, r.params.precompileTemplates && i('script[type="text/template7"]').each(function () {
                    var e = i(this).attr("id");
                    e && (Template7.templates[e] = Template7.compile(i(this).html()))
                }))
            };
            var y = [];
            return r.initPlugins = function () {
                for (var e in r.plugins) {
                    var a = r.plugins[e](r, r.params[e]);
                    a && y.push(a)
                }
            }, r.pluginHook = function (e) {
                for (var a = 0; a < y.length; a++) y[a].hooks && e in y[a].hooks && y[a].hooks[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            }, r.pluginPrevent = function (e) {
                for (var a = !1, t = 0; t < y.length; t++) y[t].prevents && e in y[t].prevents && y[t].prevents[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) && (a = !0);
                return a
            }, r.pluginProcess = function (e, a) {
                for (var t = a, r = 0; r < y.length; r++) y[r].preprocess && e in y[r].preprocess && (t = y[r].preprocess[e](a, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]));
                return t
            }, r.init = function () {
                r.initTemplate7Templates && r.initTemplate7Templates(), r.initPlugins && r.initPlugins(), r.getDeviceInfo && r.getDeviceInfo(), r.initResize && r.initResize(), r.initPanelsBreakpoints && (r.params.panelLeftBreakpoint || r.params.panelRightBreakpoint) && r.initPanelsBreakpoints(), r.initFastClicks && r.params.fastClicks && r.initFastClicks(), r.initClickEvents && r.initClickEvents(), i(".page:not(.cached)").each(function () {
                    r.initPageWithCallback(this)
                }), i(".navbar:not(.cached)").each(function () {
                    r.initNavbarWithCallback(this)
                }), r.initPushState && r.params.pushState && r.initPushState(), r.initSwipeout && r.params.swipeout && r.initSwipeout(), r.initSortable && r.params.sortable && r.initSortable(), r.initSwipePanels && (r.params.swipePanel || r.params.swipePanelOnlyClose) && r.initSwipePanels(), r.params.material && r.initMaterialWatchInputs && r.initMaterialWatchInputs(), r.params.material && i(".tabbar").each(function (e, a) {
                    0 === i(a).parents(".page").length && r.initMaterialTabbar(a)
                }), r.params.onAppInit && r.params.onAppInit(), r.pluginHook("appInit")
            }, r.params.init && r.init(), r
        }, LightSNS.$ = window.Jinsom, LightSNS.prototype.support = function () {
            return {
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
                passiveListener: function () {
                    var e = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0
                            }
                        });
                        window.addEventListener("testPassiveListener", null, a)
                    } catch (e) {}
                    return e
                }()
            }
        }(), LightSNS.prototype.device = function () {
            var e = {},
                a = navigator.userAgent,
                t = Jinsom,
                r = a.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                n = a.match(/(Android);?[\s\/]+([\d.]+)?/),
                i = a.match(/(iPad).*OS\s([\d_]+)/),
                s = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                o = !i && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (e.ios = e.android = e.windows = e.iphone = e.ipod = e.ipad = e.androidChrome = !1, r && (e.os = "windows", e.osVersion = r[2], e.windows = !0), n && !r && (e.os = "android", e.osVersion = n[2], e.android = !0, e.androidChrome = a.toLowerCase().indexOf("chrome") >= 0), (i || o || s) && (e.os = "ios", e.ios = !0), o && !s && (e.osVersion = o[2].replace(/_/g, "."), e.iphone = !0), i && (e.osVersion = i[2].replace(/_/g, "."), e.ipad = !0), s && (e.osVersion = s[3] ? s[3].replace(/_/g, ".") : null, e.iphone = !0), e.ios && e.osVersion && a.indexOf("Version/") >= 0 && "10" === e.osVersion.split(".")[0] && (e.osVersion = a.toLowerCase().split("version/")[1].split(" ")[0]), e.webView = (o || i || s) && a.match(/.*AppleWebKit(?!.*Safari)/i), e.os && "ios" === e.os) {
                var l = e.osVersion.split(".");
                e.minimalUi = !e.webView && (s || o) && (1 * l[0] == 7 ? 1 * l[1] >= 1 : 1 * l[0] > 7) && t('meta[name="viewport"]').length > 0 && t('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
            }
            var p = t(window).width(),
                d = t(window).height();
            e.needsStatusBar = function () {
                return !(!e.webView || p * d != screen.width * screen.height)
            }, e.statusBar = e.needsStatusBar();
            var c = [];
            if (e.pixelRatio = window.devicePixelRatio || 1, c.push("pixel-ratio-" + Math.floor(e.pixelRatio)), e.pixelRatio >= 2 && c.push("retina"), e.os && (c.push(e.os, e.os + "-" + e.osVersion.split(".")[0], e.os + "-" + e.osVersion.replace(/\./g, "-")), "ios" === e.os))
                for (var m = parseInt(e.osVersion.split(".")[0], 10), u = m - 1; u >= 6; u--) c.push("ios-gt-" + u);
            return e.statusBar ? c.push("with-statusbar-overlay") : t("html").removeClass("with-statusbar-overlay"), c.length > 0 && t("html").addClass(c.join(" ")), e
        }(), LightSNS.prototype.plugins = {}, window.Swiper = function (e, a) {
            function t(e) {
                return Math.floor(e)
            }

            function r() {
                var e = f.params.autoplay,
                    t = f.slides.eq(f.activeIndex);
                t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || f.params.autoplay), f.autoplayTimeoutId = setTimeout(function () {
                    f.params.loop ? (f.fixLoop(), f._slideNext(), f.emit("onAutoplay", f)) : f.isEnd ? a.autoplayStopOnLast ? f.stopAutoplay() : (f._slideTo(0), f.emit("onAutoplay", f)) : (f._slideNext(), f.emit("onAutoplay", f))
                }, e)
            }

            function n(e, a) {
                var t = g(e.target);
                if (!t.is(a))
                    if ("string" == typeof a) t = t.parents(a);
                    else if (a.nodeType) {
                    var r;
                    return t.parents().each(function (e, t) {
                        t === a && (r = a)
                    }), r ? a : void 0
                }
                if (0 !== t.length) return t[0]
            }

            function i(e, a) {
                a = a || {};
                var t = window.MutationObserver || window.WebkitMutationObserver,
                    r = new t(function (e) {
                        e.forEach(function (e) {
                            f.onResize(!0), f.emit("onObserverUpdate", f, e)
                        })
                    });
                r.observe(e, {
                    attributes: void 0 === a.attributes || a.attributes,
                    childList: void 0 === a.childList || a.childList,
                    characterData: void 0 === a.characterData || a.characterData
                }), f.observers.push(r)
            }

            function s(e, a) {
                e = g(e);
                var t, r, n, i = f.rtl ? -1 : 1;
                t = e.attr("data-swiper-parallax") || "0", r = e.attr("data-swiper-parallax-x"), n = e.attr("data-swiper-parallax-y"), r || n ? (r = r || "0", n = n || "0") : f.isHorizontal() ? (r = t, n = "0") : (n = t, r = "0"), r = r.indexOf("%") >= 0 ? parseInt(r, 10) * a * i + "%" : r * a * i + "px", n = n.indexOf("%") >= 0 ? parseInt(n, 10) * a + "%" : n * a + "px", e.transform("translate3d(" + r + ", " + n + ",0px)")
            }

            function o(e) {
                return 0 !== e.indexOf("on") && (e = e[0] !== e[0].toUpperCase() ? "on" + e[0].toUpperCase() + e.substring(1) : "on" + e), e
            }
            if (!(this instanceof Swiper)) return new Swiper(e, a);
            var l = {
                    direction: "horizontal",
                    touchEventsTarget: "container",
                    initialSlide: 0,
                    speed: 300,
                    autoplay: !1,
                    autoplayDisableOnInteraction: !0,
                    autoplayStopOnLast: !1,
                    iOSEdgeSwipeDetection: !1,
                    iOSEdgeSwipeThreshold: 20,
                    freeMode: !1,
                    freeModeMomentum: !0,
                    freeModeMomentumRatio: 1,
                    freeModeMomentumBounce: !0,
                    freeModeMomentumBounceRatio: 1,
                    freeModeMomentumVelocityRatio: 1,
                    freeModeSticky: !1,
                    freeModeMinimumVelocity: .02,
                    autoHeight: !1,
                    setWrapperSize: !1,
                    virtualTranslate: !1,
                    effect: "slide",
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: !0
                    },
                    flip: {
                        slideShadows: !0,
                        limitRotation: !0
                    },
                    cube: {
                        slideShadows: !0,
                        shadow: !0,
                        shadowOffset: 20,
                        shadowScale: .94
                    },
                    fade: {
                        crossFade: !1
                    },
                    parallax: !1,
                    zoom: !1,
                    zoomMax: 3,
                    zoomMin: 1,
                    zoomToggle: !0,
                    scrollbar: null,
                    scrollbarHide: !0,
                    scrollbarDraggable: !1,
                    scrollbarSnapOnRelease: !1,
                    keyboardControl: !1,
                    mousewheelControl: !1,
                    mousewheelReleaseOnEdges: !1,
                    mousewheelInvert: !1,
                    mousewheelForceToAxis: !1,
                    mousewheelSensitivity: 1,
                    mousewheelEventsTarged: "container",
                    hashnav: !1,
                    hashnavWatchState: !1,
                    history: !1,
                    replaceState: !1,
                    breakpoints: void 0,
                    spaceBetween: 0,
                    slidesPerView: 1,
                    slidesPerColumn: 1,
                    slidesPerColumnFill: "column",
                    slidesPerGroup: 1,
                    centeredSlides: !1,
                    slidesOffsetBefore: 0,
                    slidesOffsetAfter: 0,
                    roundLengths: !1,
                    touchRatio: 1,
                    touchAngle: 45,
                    simulateTouch: !0,
                    shortSwipes: !0,
                    longSwipes: !0,
                    longSwipesRatio: .5,
                    longSwipesMs: 300,
                    followFinger: !0,
                    onlyExternal: !1,
                    threshold: 0,
                    touchMoveStopPropagation: !0,
                    touchReleaseOnEdges: !1,
                    uniqueNavElements: !0,
                    pagination: null,
                    paginationElement: "span",
                    paginationClickable: !1,
                    paginationHide: !1,
                    paginationBulletRender: null,
                    paginationProgressRender: null,
                    paginationFractionRender: null,
                    paginationCustomRender: null,
                    paginationType: "bullets",
                    resistance: !0,
                    resistanceRatio: .85,
                    nextButton: null,
                    prevButton: null,
                    watchSlidesProgress: !1,
                    watchSlidesVisibility: !1,
                    grabCursor: !1,
                    preventClicks: !0,
                    preventClicksPropagation: !0,
                    slideToClickedSlide: !1,
                    lazyLoading: !1,
                    lazyLoadingInPrevNext: !1,
                    lazyLoadingInPrevNextAmount: 1,
                    lazyLoadingOnTransitionStart: !1,
                    preloadImages: !0,
                    updateOnImagesReady: !0,
                    loop: !1,
                    loopAdditionalSlides: 0,
                    loopedSlides: null,
                    control: void 0,
                    controlInverse: !1,
                    controlBy: "slide",
                    normalizeSlideIndex: !0,
                    allowSwipeToPrev: !0,
                    allowSwipeToNext: !0,
                    swipeHandler: null,
                    noSwiping: !0,
                    noSwipingClass: "swiper-no-swiping",
                    passiveListeners: !0,
                    containerModifierClass: "swiper-container-",
                    slideClass: "swiper-slide",
                    slideActiveClass: "swiper-slide-active",
                    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
                    slideVisibleClass: "swiper-slide-visible",
                    slideDuplicateClass: "swiper-slide-duplicate",
                    slideNextClass: "swiper-slide-next",
                    slideDuplicateNextClass: "swiper-slide-duplicate-next",
                    slidePrevClass: "swiper-slide-prev",
                    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
                    wrapperClass: "swiper-wrapper",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    buttonDisabledClass: "swiper-button-disabled",
                    paginationCurrentClass: "swiper-pagination-current",
                    paginationTotalClass: "swiper-pagination-total",
                    paginationHiddenClass: "swiper-pagination-hidden",
                    paginationProgressbarClass: "swiper-pagination-progressbar",
                    paginationClickableClass: "swiper-pagination-clickable",
                    paginationModifierClass: "swiper-pagination-",
                    lazyLoadingClass: "swiper-lazy",
                    lazyStatusLoadingClass: "swiper-lazy-loading",
                    lazyStatusLoadedClass: "swiper-lazy-loaded",
                    lazyPreloaderClass: "swiper-lazy-preloader",
                    notificationClass: "swiper-notification",
                    preloaderClass: "preloader",
                    zoomContainerClass: "swiper-zoom-container",
                    observer: !1,
                    observeParents: !1,
                    a11y: !1,
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}",
                    runCallbacksOnInit: !0
                },
                p = a && a.virtualTranslate;
            a = a || {};
            var d = {};
            for (var c in a)
                if ("object" != typeof a[c] || null === a[c] || a[c].nodeType || a[c] === window || a[c] === document || "undefined" != typeof Jinsom && a[c] instanceof Jinsom || "undefined" != typeof jQuery && a[c] instanceof jQuery) d[c] = a[c];
                else {
                    d[c] = {};
                    for (var m in a[c]) d[c][m] = a[c][m]
                }
            for (var u in l)
                if (void 0 === a[u]) a[u] = l[u];
                else if ("object" == typeof a[u])
                for (var h in l[u]) void 0 === a[u][h] && (a[u][h] = l[u][h]);
            var f = this;
            f.params = a, f.originalParams = d, f.classNames = [];
            var g = g;
            if (void 0 !== g && "undefined" != typeof Jinsom && (g = Jinsom), (void 0 !== g || (g = "undefined" == typeof Jinsom ? window.Jinsom || window.Zepto || window.jQuery : Jinsom)) && (f.$ = g, f.currentBreakpoint = void 0, f.getActiveBreakpoint = function () {
                if (!f.params.breakpoints) return !1;
                var e, a = !1,
                    t = [];
                for (e in f.params.breakpoints) f.params.breakpoints.hasOwnProperty(e) && t.push(e);
                t.sort(function (e, a) {
                    return parseInt(e, 10) > parseInt(a, 10)
                });
                for (var r = 0; r < t.length; r++)(e = t[r]) >= window.innerWidth && !a && (a = e);
                return a || "max"
            }, f.setBreakpoint = function () {
                var e = f.getActiveBreakpoint();
                if (e && f.currentBreakpoint !== e) {
                    var a = e in f.params.breakpoints ? f.params.breakpoints[e] : f.originalParams,
                        t = f.params.loop && a.slidesPerView !== f.params.slidesPerView;
                    for (var r in a) f.params[r] = a[r];
                    f.currentBreakpoint = e, t && f.destroyLoop && f.reLoop(!0)
                }
            }, f.params.breakpoints && f.setBreakpoint(), f.container = g(e), 0 !== f.container.length)) {
                if (f.container.length > 1) {
                    var v = [];
                    return f.container.each(function () {
                        v.push(new Swiper(this, a))
                    }), v
                }
                f.container[0].swiper = f, f.container.data("swiper", f), f.classNames.push(f.params.containerModifierClass + f.params.direction), f.params.freeMode && f.classNames.push(f.params.containerModifierClass + "free-mode"), f.support.flexbox || (f.classNames.push(f.params.containerModifierClass + "no-flexbox"), f.params.slidesPerColumn = 1), f.params.autoHeight && f.classNames.push(f.params.containerModifierClass + "autoheight"), (f.params.parallax || f.params.watchSlidesVisibility) && (f.params.watchSlidesProgress = !0), f.params.touchReleaseOnEdges && (f.params.resistanceRatio = 0), ["cube", "coverflow", "flip"].indexOf(f.params.effect) >= 0 && (f.support.transforms3d ? (f.params.watchSlidesProgress = !0, f.classNames.push(f.params.containerModifierClass + "3d")) : f.params.effect = "slide"), "slide" !== f.params.effect && f.classNames.push(f.params.containerModifierClass + f.params.effect), "cube" === f.params.effect && (f.params.resistanceRatio = 0, f.params.slidesPerView = 1, f.params.slidesPerColumn = 1, f.params.slidesPerGroup = 1,
                    f.params.centeredSlides = !1, f.params.spaceBetween = 0, f.params.virtualTranslate = !0), "fade" !== f.params.effect && "flip" !== f.params.effect || (f.params.slidesPerView = 1, f.params.slidesPerColumn = 1, f.params.slidesPerGroup = 1, f.params.watchSlidesProgress = !0, f.params.spaceBetween = 0, void 0 === p && (f.params.virtualTranslate = !0)), f.params.grabCursor && f.support.touch && (f.params.grabCursor = !1), f.wrapper = f.container.children("." + f.params.wrapperClass), f.params.pagination && (f.paginationContainer = g(f.params.pagination), f.params.uniqueNavElements && "string" == typeof f.params.pagination && f.paginationContainer.length > 1 && 1 === f.container.find(f.params.pagination).length && (f.paginationContainer = f.container.find(f.params.pagination)), "bullets" === f.params.paginationType && f.params.paginationClickable ? f.paginationContainer.addClass(f.params.paginationModifierClass + "clickable") : f.params.paginationClickable = !1, f.paginationContainer.addClass(f.params.paginationModifierClass + f.params.paginationType)), (f.params.nextButton || f.params.prevButton) && (f.params.nextButton && (f.nextButton = g(f.params.nextButton), f.params.uniqueNavElements && "string" == typeof f.params.nextButton && f.nextButton.length > 1 && 1 === f.container.find(f.params.nextButton).length && (f.nextButton = f.container.find(f.params.nextButton))), f.params.prevButton && (f.prevButton = g(f.params.prevButton), f.params.uniqueNavElements && "string" == typeof f.params.prevButton && f.prevButton.length > 1 && 1 === f.container.find(f.params.prevButton).length && (f.prevButton = f.container.find(f.params.prevButton)))), f.isHorizontal = function () {
                    return "horizontal" === f.params.direction
                }, f.rtl = f.isHorizontal() && ("rtl" === f.container[0].dir.toLowerCase() || "rtl" === f.container.css("direction")), f.rtl && f.classNames.push(f.params.containerModifierClass + "rtl"), f.rtl && (f.wrongRTL = "-webkit-box" === f.wrapper.css("display")), f.params.slidesPerColumn > 1 && f.classNames.push(f.params.containerModifierClass + "multirow"), f.device.android && f.classNames.push(f.params.containerModifierClass + "android"), f.container.addClass(f.classNames.join(" ")), f.translate = 0, f.progress = 0, f.velocity = 0, f.lockSwipeToNext = function () {
                    f.params.allowSwipeToNext = !1, !1 === f.params.allowSwipeToPrev && f.params.grabCursor && f.unsetGrabCursor()
                }, f.lockSwipeToPrev = function () {
                    f.params.allowSwipeToPrev = !1, !1 === f.params.allowSwipeToNext && f.params.grabCursor && f.unsetGrabCursor()
                }, f.lockSwipes = function () {
                    f.params.allowSwipeToNext = f.params.allowSwipeToPrev = !1, f.params.grabCursor && f.unsetGrabCursor()
                }, f.unlockSwipeToNext = function () {
                    f.params.allowSwipeToNext = !0, !0 === f.params.allowSwipeToPrev && f.params.grabCursor && f.setGrabCursor()
                }, f.unlockSwipeToPrev = function () {
                    f.params.allowSwipeToPrev = !0, !0 === f.params.allowSwipeToNext && f.params.grabCursor && f.setGrabCursor()
                }, f.unlockSwipes = function () {
                    f.params.allowSwipeToNext = f.params.allowSwipeToPrev = !0, f.params.grabCursor && f.setGrabCursor()
                }, f.setGrabCursor = function (e) {
                    f.container[0].style.cursor = "move", f.container[0].style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", f.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab", f.container[0].style.cursor = e ? "grabbing" : "grab"
                }, f.unsetGrabCursor = function () {
                    f.container[0].style.cursor = ""
                }, f.params.grabCursor && f.setGrabCursor(), f.imagesToLoad = [], f.imagesLoaded = 0, f.loadImage = function (e, a, t, r, n, i) {
                    function s() {
                        i && i()
                    }
                    var o;
                    e.complete && n ? s() : a ? (o = new window.Image, o.onload = s, o.onerror = s, r && (o.sizes = r), t && (o.srcset = t), a && (o.src = a)) : s()
                }, f.preloadImages = function () {
                    function e() {
                        void 0 !== f && null !== f && f && (void 0 !== f.imagesLoaded && f.imagesLoaded++, f.imagesLoaded === f.imagesToLoad.length && (f.params.updateOnImagesReady && f.update(), f.emit("onImagesReady", f)))
                    }
                    f.imagesToLoad = f.container.find("img");
                    for (var a = 0; a < f.imagesToLoad.length; a++) f.loadImage(f.imagesToLoad[a], f.imagesToLoad[a].currentSrc || f.imagesToLoad[a].getAttribute("src"), f.imagesToLoad[a].srcset || f.imagesToLoad[a].getAttribute("srcset"), f.imagesToLoad[a].sizes || f.imagesToLoad[a].getAttribute("sizes"), !0, e)
                }, f.autoplayTimeoutId = void 0, f.autoplaying = !1, f.autoplayPaused = !1, f.startAutoplay = function () {
                    return void 0 === f.autoplayTimeoutId && !!f.params.autoplay && !f.autoplaying && (f.autoplaying = !0, f.emit("onAutoplayStart", f), void r())
                }, f.stopAutoplay = function (e) {
                    f.autoplayTimeoutId && (f.autoplayTimeoutId && clearTimeout(f.autoplayTimeoutId), f.autoplaying = !1, f.autoplayTimeoutId = void 0, f.emit("onAutoplayStop", f))
                }, f.pauseAutoplay = function (e) {
                    f.autoplayPaused || (f.autoplayTimeoutId && clearTimeout(f.autoplayTimeoutId), f.autoplayPaused = !0, 0 === e ? (f.autoplayPaused = !1, r()) : f.wrapper.transitionEnd(function () {
                        f && (f.autoplayPaused = !1, f.autoplaying ? r() : f.stopAutoplay())
                    }))
                }, f.minTranslate = function () {
                    return -f.snapGrid[0]
                }, f.maxTranslate = function () {
                    return -f.snapGrid[f.snapGrid.length - 1]
                }, f.updateAutoHeight = function () {
                    var e, a = [],
                        t = 0;
                    if ("auto" !== f.params.slidesPerView && f.params.slidesPerView > 1)
                        for (e = 0; e < Math.ceil(f.params.slidesPerView); e++) {
                            var r = f.activeIndex + e;
                            if (r > f.slides.length) break;
                            a.push(f.slides.eq(r)[0])
                        } else a.push(f.slides.eq(f.activeIndex)[0]);
                    for (e = 0; e < a.length; e++)
                        if (void 0 !== a[e]) {
                            var n = a[e].offsetHeight;
                            t = n > t ? n : t
                        }
                    t && f.wrapper.css("height", t + "px")
                }, f.updateContainerSize = function () {
                    var e, a;
                    e = void 0 !== f.params.width ? f.params.width : f.container[0].clientWidth, a = void 0 !== f.params.height ? f.params.height : f.container[0].clientHeight, 0 === e && f.isHorizontal() || 0 === a && !f.isHorizontal() || (e = e - parseInt(f.container.css("padding-left"), 10) - parseInt(f.container.css("padding-right"), 10), a = a - parseInt(f.container.css("padding-top"), 10) - parseInt(f.container.css("padding-bottom"), 10), f.width = e, f.height = a, f.size = f.isHorizontal() ? f.width : f.height)
                }, f.updateSlidesSize = function () {
                    f.slides = f.wrapper.children("." + f.params.slideClass), f.snapGrid = [], f.slidesGrid = [], f.slidesSizesGrid = [];
                    var e, a = f.params.spaceBetween,
                        r = -f.params.slidesOffsetBefore,
                        n = 0,
                        i = 0;
                    if (void 0 !== f.size) {
                        "string" == typeof a && a.indexOf("%") >= 0 && (a = parseFloat(a.replace("%", "")) / 100 * f.size), f.virtualSize = -a, f.rtl ? f.slides.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : f.slides.css({
                            marginRight: "",
                            marginBottom: ""
                        });
                        var s;
                        f.params.slidesPerColumn > 1 && (s = Math.floor(f.slides.length / f.params.slidesPerColumn) === f.slides.length / f.params.slidesPerColumn ? f.slides.length : Math.ceil(f.slides.length / f.params.slidesPerColumn) * f.params.slidesPerColumn, "auto" !== f.params.slidesPerView && "row" === f.params.slidesPerColumnFill && (s = Math.max(s, f.params.slidesPerView * f.params.slidesPerColumn)));
                        var o, l = f.params.slidesPerColumn,
                            p = s / l,
                            d = p - (f.params.slidesPerColumn * p - f.slides.length);
                        for (e = 0; e < f.slides.length; e++) {
                            o = 0;
                            var c = f.slides.eq(e);
                            if (f.params.slidesPerColumn > 1) {
                                var m, u, h;
                                "column" === f.params.slidesPerColumnFill ? (u = Math.floor(e / l), h = e - u * l, (u > d || u === d && h === l - 1) && ++h >= l && (h = 0, u++), m = u + h * s / l, c.css({
                                    "-webkit-box-ordinal-group": m,
                                    "-moz-box-ordinal-group": m,
                                    "-ms-flex-order": m,
                                    "-webkit-order": m,
                                    order: m
                                })) : (h = Math.floor(e / p), u = e - h * p), c.css("margin-" + (f.isHorizontal() ? "top" : "left"), 0 !== h && f.params.spaceBetween && f.params.spaceBetween + "px").attr("data-swiper-column", u).attr("data-swiper-row", h)
                            }
                            "none" !== c.css("display") && ("auto" === f.params.slidesPerView ? (o = f.isHorizontal() ? c.outerWidth(!0) : c.outerHeight(!0), f.params.roundLengths && (o = t(o))) : (o = (f.size - (f.params.slidesPerView - 1) * a) / f.params.slidesPerView, f.params.roundLengths && (o = t(o)), f.isHorizontal() ? f.slides[e].style.width = o + "px" : f.slides[e].style.height = o + "px"), f.slides[e].swiperSlideSize = o, f.slidesSizesGrid.push(o), f.params.centeredSlides ? (r = r + o / 2 + n / 2 + a, 0 === n && 0 !== e && (r = r - f.size / 2 - a), 0 === e && (r = r - f.size / 2 - a), Math.abs(r) < .001 && (r = 0), i % f.params.slidesPerGroup == 0 && f.snapGrid.push(r), f.slidesGrid.push(r)) : (i % f.params.slidesPerGroup == 0 && f.snapGrid.push(r), f.slidesGrid.push(r), r = r + o + a), f.virtualSize += o + a, n = o, i++)
                        }
                        f.virtualSize = Math.max(f.virtualSize, f.size) + f.params.slidesOffsetAfter;
                        var g;
                        if (f.rtl && f.wrongRTL && ("slide" === f.params.effect || "coverflow" === f.params.effect) && f.wrapper.css({
                            width: f.virtualSize + f.params.spaceBetween + "px"
                        }), f.support.flexbox && !f.params.setWrapperSize || (f.isHorizontal() ? f.wrapper.css({
                            width: f.virtualSize + f.params.spaceBetween + "px"
                        }) : f.wrapper.css({
                            height: f.virtualSize + f.params.spaceBetween + "px"
                        })), f.params.slidesPerColumn > 1 && (f.virtualSize = (o + f.params.spaceBetween) * s, f.virtualSize = Math.ceil(f.virtualSize / f.params.slidesPerColumn) - f.params.spaceBetween, f.isHorizontal() ? f.wrapper.css({
                            width: f.virtualSize + f.params.spaceBetween + "px"
                        }) : f.wrapper.css({
                            height: f.virtualSize + f.params.spaceBetween + "px"
                        }), f.params.centeredSlides)) {
                            for (g = [], e = 0; e < f.snapGrid.length; e++) f.snapGrid[e] < f.virtualSize + f.snapGrid[0] && g.push(f.snapGrid[e]);
                            f.snapGrid = g
                        }
                        if (!f.params.centeredSlides) {
                            for (g = [], e = 0; e < f.snapGrid.length; e++) f.snapGrid[e] <= f.virtualSize - f.size && g.push(f.snapGrid[e]);
                            f.snapGrid = g, Math.floor(f.virtualSize - f.size) - Math.floor(f.snapGrid[f.snapGrid.length - 1]) > 1 && f.snapGrid.push(f.virtualSize - f.size)
                        }
                        0 === f.snapGrid.length && (f.snapGrid = [0]), 0 !== f.params.spaceBetween && (f.isHorizontal() ? f.rtl ? f.slides.css({
                            marginLeft: a + "px"
                        }) : f.slides.css({
                            marginRight: a + "px"
                        }) : f.slides.css({
                            marginBottom: a + "px"
                        })), f.params.watchSlidesProgress && f.updateSlidesOffset()
                    }
                }, f.updateSlidesOffset = function () {
                    for (var e = 0; e < f.slides.length; e++) f.slides[e].swiperSlideOffset = f.isHorizontal() ? f.slides[e].offsetLeft : f.slides[e].offsetTop
                }, f.currentSlidesPerView = function () {
                    var e, a, t = 1;
                    if (f.params.centeredSlides) {
                        var r, n = f.slides[f.activeIndex].swiperSlideSize;
                        for (e = f.activeIndex + 1; e < f.slides.length; e++) f.slides[e] && !r && (n += f.slides[e].swiperSlideSize, t++, n > f.size && (r = !0));
                        for (a = f.activeIndex - 1; a >= 0; a--) f.slides[a] && !r && (n += f.slides[a].swiperSlideSize, t++, n > f.size && (r = !0))
                    } else
                        for (e = f.activeIndex + 1; e < f.slides.length; e++) f.slidesGrid[e] - f.slidesGrid[f.activeIndex] < f.size && t++;
                    return t
                }, f.updateSlidesProgress = function (e) {
                    if (void 0 === e && (e = f.translate || 0), 0 !== f.slides.length) {
                        void 0 === f.slides[0].swiperSlideOffset && f.updateSlidesOffset();
                        var a = -e;
                        f.rtl && (a = e), f.slides.removeClass(f.params.slideVisibleClass);
                        for (var t = 0; t < f.slides.length; t++) {
                            var r = f.slides[t],
                                n = (a + (f.params.centeredSlides ? f.minTranslate() : 0) - r.swiperSlideOffset) / (r.swiperSlideSize + f.params.spaceBetween);
                            if (f.params.watchSlidesVisibility) {
                                var i = -(a - r.swiperSlideOffset),
                                    s = i + f.slidesSizesGrid[t];
                                (i >= 0 && i < f.size || s > 0 && s <= f.size || i <= 0 && s >= f.size) && f.slides.eq(t).addClass(f.params.slideVisibleClass)
                            }
                            r.progress = f.rtl ? -n : n
                        }
                    }
                }, f.updateProgress = function (e) {
                    void 0 === e && (e = f.translate || 0);
                    var a = f.maxTranslate() - f.minTranslate(),
                        t = f.isBeginning,
                        r = f.isEnd;
                    0 === a ? (f.progress = 0, f.isBeginning = f.isEnd = !0) : (f.progress = (e - f.minTranslate()) / a, f.isBeginning = f.progress <= 0, f.isEnd = f.progress >= 1), f.isBeginning && !t && f.emit("onReachBeginning", f), f.isEnd && !r && f.emit("onReachEnd", f), f.params.watchSlidesProgress && f.updateSlidesProgress(e), f.emit("onProgress", f, f.progress)
                }, f.updateActiveIndex = function () {
                    var e, a, t, r = f.rtl ? f.translate : -f.translate;
                    for (a = 0; a < f.slidesGrid.length; a++) void 0 !== f.slidesGrid[a + 1] ? r >= f.slidesGrid[a] && r < f.slidesGrid[a + 1] - (f.slidesGrid[a + 1] - f.slidesGrid[a]) / 2 ? e = a : r >= f.slidesGrid[a] && r < f.slidesGrid[a + 1] && (e = a + 1) : r >= f.slidesGrid[a] && (e = a);
                    f.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0), t = Math.floor(e / f.params.slidesPerGroup), t >= f.snapGrid.length && (t = f.snapGrid.length - 1), e !== f.activeIndex && (f.snapIndex = t, f.previousIndex = f.activeIndex, f.activeIndex = e, f.updateClasses(), f.updateRealIndex())
                }, f.updateRealIndex = function () {
                    f.realIndex = parseInt(f.slides.eq(f.activeIndex).attr("data-swiper-slide-index") || f.activeIndex, 10)
                }, f.updateClasses = function () {
                    f.slides.removeClass(f.params.slideActiveClass + " " + f.params.slideNextClass + " " + f.params.slidePrevClass + " " + f.params.slideDuplicateActiveClass + " " + f.params.slideDuplicateNextClass + " " + f.params.slideDuplicatePrevClass);
                    var e = f.slides.eq(f.activeIndex);
                    e.addClass(f.params.slideActiveClass), a.loop && (e.hasClass(f.params.slideDuplicateClass) ? f.wrapper.children("." + f.params.slideClass + ":not(." + f.params.slideDuplicateClass + ')[data-swiper-slide-index="' + f.realIndex + '"]').addClass(f.params.slideDuplicateActiveClass) : f.wrapper.children("." + f.params.slideClass + "." + f.params.slideDuplicateClass + '[data-swiper-slide-index="' + f.realIndex + '"]').addClass(f.params.slideDuplicateActiveClass));
                    var t = e.next("." + f.params.slideClass).addClass(f.params.slideNextClass);
                    f.params.loop && 0 === t.length && (t = f.slides.eq(0), t.addClass(f.params.slideNextClass));
                    var r = e.prev("." + f.params.slideClass).addClass(f.params.slidePrevClass);
                    if (f.params.loop && 0 === r.length && (r = f.slides.eq(-1), r.addClass(f.params.slidePrevClass)), a.loop && (t.hasClass(f.params.slideDuplicateClass) ? f.wrapper.children("." + f.params.slideClass + ":not(." + f.params.slideDuplicateClass + ')[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(f.params.slideDuplicateNextClass) : f.wrapper.children("." + f.params.slideClass + "." + f.params.slideDuplicateClass + '[data-swiper-slide-index="' + t.attr("data-swiper-slide-index") + '"]').addClass(f.params.slideDuplicateNextClass), r.hasClass(f.params.slideDuplicateClass) ? f.wrapper.children("." + f.params.slideClass + ":not(." + f.params.slideDuplicateClass + ')[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(f.params.slideDuplicatePrevClass) : f.wrapper.children("." + f.params.slideClass + "." + f.params.slideDuplicateClass + '[data-swiper-slide-index="' + r.attr("data-swiper-slide-index") + '"]').addClass(f.params.slideDuplicatePrevClass)), f.paginationContainer && f.paginationContainer.length > 0) {
                        var n, i = f.params.loop ? Math.ceil((f.slides.length - 2 * f.loopedSlides) / f.params.slidesPerGroup) : f.snapGrid.length;
                        if (f.params.loop ? (n = Math.ceil((f.activeIndex - f.loopedSlides) / f.params.slidesPerGroup), n > f.slides.length - 1 - 2 * f.loopedSlides && (n -= f.slides.length - 2 * f.loopedSlides), n > i - 1 && (n -= i), n < 0 && "bullets" !== f.params.paginationType && (n = i + n)) : n = void 0 !== f.snapIndex ? f.snapIndex : f.activeIndex || 0, "bullets" === f.params.paginationType && f.bullets && f.bullets.length > 0 && (f.bullets.removeClass(f.params.bulletActiveClass), f.paginationContainer.length > 1 ? f.bullets.each(function () {
                            g(this).index() === n && g(this).addClass(f.params.bulletActiveClass)
                        }) : f.bullets.eq(n).addClass(f.params.bulletActiveClass)), "fraction" === f.params.paginationType && (f.paginationContainer.find("." + f.params.paginationCurrentClass).text(n + 1), f.paginationContainer.find("." + f.params.paginationTotalClass).text(i)), "progress" === f.params.paginationType) {
                            var s = (n + 1) / i,
                                o = s,
                                l = 1;
                            f.isHorizontal() || (l = s, o = 1), f.paginationContainer.find("." + f.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + o + ") scaleY(" + l + ")").transition(f.params.speed)
                        }
                        "custom" === f.params.paginationType && f.params.paginationCustomRender && (f.paginationContainer.html(f.params.paginationCustomRender(f, n + 1, i)), f.emit("onPaginationRendered", f, f.paginationContainer[0]))
                    }
                    f.params.loop || (f.params.prevButton && f.prevButton && f.prevButton.length > 0 && (f.isBeginning ? (f.prevButton.addClass(f.params.buttonDisabledClass), f.params.a11y && f.a11y && f.a11y.disable(f.prevButton)) : (f.prevButton.removeClass(f.params.buttonDisabledClass), f.params.a11y && f.a11y && f.a11y.enable(f.prevButton))), f.params.nextButton && f.nextButton && f.nextButton.length > 0 && (f.isEnd ? (f.nextButton.addClass(f.params.buttonDisabledClass), f.params.a11y && f.a11y && f.a11y.disable(f.nextButton)) : (f.nextButton.removeClass(f.params.buttonDisabledClass), f.params.a11y && f.a11y && f.a11y.enable(f.nextButton))))
                }, f.updatePagination = function () {
                    if (f.params.pagination && f.paginationContainer && f.paginationContainer.length > 0) {
                        var e = "";
                        if ("bullets" === f.params.paginationType) {
                            for (var a = f.params.loop ? Math.ceil((f.slides.length - 2 * f.loopedSlides) / f.params.slidesPerGroup) : f.snapGrid.length, t = 0; t < a; t++) f.params.paginationBulletRender ? e += f.params.paginationBulletRender(f, t, f.params.bulletClass) : e += "<" + f.params.paginationElement + ' class="' + f.params.bulletClass + '"></' + f.params.paginationElement + ">";
                            f.paginationContainer.html(e), f.bullets = f.paginationContainer.find("." + f.params.bulletClass), f.params.paginationClickable && f.params.a11y && f.a11y && f.a11y.initPagination()
                        }
                        "fraction" === f.params.paginationType && (e = f.params.paginationFractionRender ? f.params.paginationFractionRender(f, f.params.paginationCurrentClass, f.params.paginationTotalClass) : '<span class="' + f.params.paginationCurrentClass + '"></span> / <span class="' + f.params.paginationTotalClass + '"></span>', f.paginationContainer.html(e)), "progress" === f.params.paginationType && (e = f.params.paginationProgressRender ? f.params.paginationProgressRender(f, f.params.paginationProgressbarClass) : '<span class="' + f.params.paginationProgressbarClass + '"></span>', f.paginationContainer.html(e)), "custom" !== f.params.paginationType && f.emit("onPaginationRendered", f, f.paginationContainer[0])
                    }
                }, f.update = function (e) {
                    function a() {
                        f.rtl, f.translate, t = Math.min(Math.max(f.translate, f.maxTranslate()), f.minTranslate()), f.setWrapperTranslate(t), f.updateActiveIndex(), f.updateClasses()
                    }
                    if (f) {
                        f.updateContainerSize(), f.updateSlidesSize(), f.updateProgress(), f.updatePagination(), f.updateClasses(), f.params.scrollbar && f.scrollbar && f.scrollbar.set();
                        var t;
                        e ? (f.controller && f.controller.spline && (f.controller.spline = void 0), f.params.freeMode ? (a(), f.params.autoHeight && f.updateAutoHeight()) : (("auto" === f.params.slidesPerView || f.params.slidesPerView > 1) && f.isEnd && !f.params.centeredSlides ? f.slideTo(f.slides.length - 1, 0, !1, !0) : f.slideTo(f.activeIndex, 0, !1, !0)) || a()) : f.params.autoHeight && f.updateAutoHeight()
                    }
                }, f.onResize = function (e) {
                    f.params.onBeforeResize && f.params.onBeforeResize(f), f.params.breakpoints && f.setBreakpoint();
                    var a = f.params.allowSwipeToPrev,
                        t = f.params.allowSwipeToNext;
                    f.params.allowSwipeToPrev = f.params.allowSwipeToNext = !0, f.updateContainerSize(), f.updateSlidesSize(), ("auto" === f.params.slidesPerView || f.params.freeMode || e) && f.updatePagination(), f.params.scrollbar && f.scrollbar && f.scrollbar.set(), f.controller && f.controller.spline && (f.controller.spline = void 0);
                    var r = !1;
                    if (f.params.freeMode) {
                        var n = Math.min(Math.max(f.translate, f.maxTranslate()), f.minTranslate());
                        f.setWrapperTranslate(n), f.updateActiveIndex(), f.updateClasses(), f.params.autoHeight && f.updateAutoHeight()
                    } else f.updateClasses(), r = ("auto" === f.params.slidesPerView || f.params.slidesPerView > 1) && f.isEnd && !f.params.centeredSlides ? f.slideTo(f.slides.length - 1, 0, !1, !0) : f.slideTo(f.activeIndex, 0, !1, !0);
                    f.params.lazyLoading && !r && f.lazy && f.lazy.load(), f.params.allowSwipeToPrev = a, f.params.allowSwipeToNext = t, f.params.onAfterResize && f.params.onAfterResize(f)
                }, f.touchEventsDesktop = {
                    start: "mousedown",
                    move: "mousemove",
                    end: "mouseup"
                }, window.navigator.pointerEnabled ? f.touchEventsDesktop = {
                    start: "pointerdown",
                    move: "pointermove",
                    end: "pointerup"
                } : window.navigator.msPointerEnabled && (f.touchEventsDesktop = {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }), f.touchEvents = {
                    start: f.support.touch || !f.params.simulateTouch ? "touchstart" : f.touchEventsDesktop.start,
                    move: f.support.touch || !f.params.simulateTouch ? "touchmove" : f.touchEventsDesktop.move,
                    end: f.support.touch || !f.params.simulateTouch ? "touchend" : f.touchEventsDesktop.end
                }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === f.params.touchEventsTarget ? f.container : f.wrapper).addClass("swiper-wp8-" + f.params.direction), f.initEvents = function (e) {
                    var t = e ? "off" : "on",
                        r = e ? "removeEventListener" : "addEventListener",
                        n = "container" === f.params.touchEventsTarget ? f.container[0] : f.wrapper[0],
                        i = f.support.touch ? n : document,
                        s = !!f.params.nested;
                    if (f.browser.ie) n[r](f.touchEvents.start, f.onTouchStart, !1), i[r](f.touchEvents.move, f.onTouchMove, s), i[r](f.touchEvents.end, f.onTouchEnd, !1);
                    else {
                        if (f.support.touch) {
                            var o = !("touchstart" !== f.touchEvents.start || !f.support.passiveListener || !f.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            n[r](f.touchEvents.start, f.onTouchStart, o), n[r](f.touchEvents.move, f.onTouchMove, s), n[r](f.touchEvents.end, f.onTouchEnd, o)
                        }(a.simulateTouch && !f.device.ios && !f.device.android || a.simulateTouch && !f.support.touch && f.device.ios) && (n[r]("mousedown", f.onTouchStart, !1), document[r]("mousemove", f.onTouchMove, s), document[r]("mouseup", f.onTouchEnd, !1))
                    }
                    window[r]("resize", f.onResize), f.params.nextButton && f.nextButton && f.nextButton.length > 0 && (f.nextButton[t]("click", f.onClickNext), f.params.a11y && f.a11y && f.nextButton[t]("keydown", f.a11y.onEnterKey)), f.params.prevButton && f.prevButton && f.prevButton.length > 0 && (f.prevButton[t]("click", f.onClickPrev), f.params.a11y && f.a11y && f.prevButton[t]("keydown", f.a11y.onEnterKey)), f.params.pagination && f.params.paginationClickable && (f.paginationContainer[t]("click", "." + f.params.bulletClass, f.onClickIndex), f.params.a11y && f.a11y && f.paginationContainer[t]("keydown", "." + f.params.bulletClass, f.a11y.onEnterKey)), (f.params.preventClicks || f.params.preventClicksPropagation) && n[r]("click", f.preventClicks, !0)
                }, f.attachEvents = function () {
                    f.initEvents()
                }, f.detachEvents = function () {
                    f.initEvents(!0)
                }, f.allowClick = !0, f.preventClicks = function (e) {
                    f.allowClick || (f.params.preventClicks && e.preventDefault(), f.params.preventClicksPropagation && f.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
                }, f.onClickNext = function (e) {
                    e.preventDefault(), f.isEnd && !f.params.loop || f.slideNext()
                }, f.onClickPrev = function (e) {
                    e.preventDefault(), f.isBeginning && !f.params.loop || f.slidePrev()
                }, f.onClickIndex = function (e) {
                    e.preventDefault();
                    var a = g(this).index() * f.params.slidesPerGroup;
                    f.params.loop && (a += f.loopedSlides), f.slideTo(a)
                }, f.updateClickedSlide = function (e) {
                    var a = n(e, "." + f.params.slideClass),
                        t = !1;
                    if (a)
                        for (var r = 0; r < f.slides.length; r++) f.slides[r] === a && (t = !0);
                    if (!a || !t) return f.clickedSlide = void 0, void(f.clickedIndex = void 0);
                    if (f.clickedSlide = a, f.clickedIndex = g(a).index(), f.params.slideToClickedSlide && void 0 !== f.clickedIndex && f.clickedIndex !== f.activeIndex) {
                        var i, s = f.clickedIndex,
                            o = "auto" === f.params.slidesPerView ? f.currentSlidesPerView() : f.params.slidesPerView;
                        if (f.params.loop) {
                            if (f.animating) return;
                            i = parseInt(g(f.clickedSlide).attr("data-swiper-slide-index"), 10), f.params.centeredSlides ? s < f.loopedSlides - o / 2 || s > f.slides.length - f.loopedSlides + o / 2 ? (f.fixLoop(), s = f.wrapper.children("." + f.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + f.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                f.slideTo(s)
                            }, 0)) : f.slideTo(s) : s > f.slides.length - o ? (f.fixLoop(), s = f.wrapper.children("." + f.params.slideClass + '[data-swiper-slide-index="' + i + '"]:not(.' + f.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                                f.slideTo(s)
                            }, 0)) : f.slideTo(s)
                        } else f.slideTo(s)
                    }
                };
                var b, w, C, y, x, T, k, P, S, M, I = "input, select, textarea, button, video",
                    E = Date.now(),
                    O = [];
                f.animating = !1, f.touches = {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                };
                var L, z;
                f.onTouchStart = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), (L = "touchstart" === e.type) || !("which" in e) || 3 !== e.which) {
                        if (f.params.noSwiping && n(e, "." + f.params.noSwipingClass)) return void(f.allowClick = !0);
                        if (!f.params.swipeHandler || n(e, f.params.swipeHandler)) {
                            var a = f.touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                                t = f.touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
                            if (!(f.device.ios && f.params.iOSEdgeSwipeDetection && a <= f.params.iOSEdgeSwipeThreshold)) {
                                if (b = !0, w = !1, C = !0, x = void 0, z = void 0, f.touches.startX = a, f.touches.startY = t, y = Date.now(), f.allowClick = !0, f.updateContainerSize(), f.swipeDirection = void 0, f.params.threshold > 0 && (P = !1), "touchstart" !== e.type) {
                                    var r = !0;
                                    g(e.target).is(I) && (r = !1), document.activeElement && g(document.activeElement).is(I) && document.activeElement.blur(), r && e.preventDefault()
                                }
                                f.emit("onTouchStart", f, e)
                            }
                        }
                    }
                }, f.onTouchMove = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), !L || "mousemove" !== e.type) {
                        if (e.preventedByNestedSwiper) return f.touches.startX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, void(f.touches.startY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY);
                        if (f.params.onlyExternal) return f.allowClick = !1, void(b && (f.touches.startX = f.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, f.touches.startY = f.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, y = Date.now()));
                        if (L && f.params.touchReleaseOnEdges && !f.params.loop)
                            if (f.isHorizontal()) {
                                if (f.touches.currentX < f.touches.startX && f.translate <= f.maxTranslate() || f.touches.currentX > f.touches.startX && f.translate >= f.minTranslate()) return
                            } else if (f.touches.currentY < f.touches.startY && f.translate <= f.maxTranslate() || f.touches.currentY > f.touches.startY && f.translate >= f.minTranslate()) return;
                        if (L && document.activeElement && e.target === document.activeElement && g(e.target).is(I)) return w = !0, void(f.allowClick = !1);
                        if (C && f.emit("onTouchMove", f, e), !(e.targetTouches && e.targetTouches.length > 1)) {
                            if (f.touches.currentX = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, f.touches.currentY = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, void 0 === x) {
                                var t;
                                f.isHorizontal() && f.touches.currentY === f.touches.startY || !f.isHorizontal() && f.touches.currentX === f.touches.startX ? x = !1 : (t = 180 * Math.atan2(Math.abs(f.touches.currentY - f.touches.startY), Math.abs(f.touches.currentX - f.touches.startX)) / Math.PI, x = f.isHorizontal() ? t > f.params.touchAngle : 90 - t > f.params.touchAngle)
                            }
                            if (x && f.emit("onTouchMoveOpposite", f, e), void 0 === z && (f.touches.currentX === f.touches.startX && f.touches.currentY === f.touches.startY || (z = !0)), b) {
                                if (x) return void(b = !1);
                                if (z) {
                                    f.allowClick = !1, f.emit("onSliderMove", f, e), e.preventDefault(), f.params.touchMoveStopPropagation && !f.params.nested && e.stopPropagation(), w || (a.loop && f.fixLoop(), k = f.getWrapperTranslate(), f.setWrapperTransition(0), f.animating && f.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), f.params.autoplay && f.autoplaying && (f.params.autoplayDisableOnInteraction ? f.stopAutoplay() : f.pauseAutoplay()), M = !1, !f.params.grabCursor || !0 !== f.params.allowSwipeToNext && !0 !== f.params.allowSwipeToPrev || f.setGrabCursor(!0)), w = !0;
                                    var r = f.touches.diff = f.isHorizontal() ? f.touches.currentX - f.touches.startX : f.touches.currentY - f.touches.startY;
                                    r *= f.params.touchRatio, f.rtl && (r = -r), f.swipeDirection = r > 0 ? "prev" : "next", T = r + k;
                                    var n = !0;
                                    if (r > 0 && T > f.minTranslate() ? (n = !1, f.params.resistance && (T = f.minTranslate() - 1 + Math.pow(-f.minTranslate() + k + r, f.params.resistanceRatio))) : r < 0 && T < f.maxTranslate() && (n = !1, f.params.resistance && (T = f.maxTranslate() + 1 - Math.pow(f.maxTranslate() - k - r, f.params.resistanceRatio))), n && (e.preventedByNestedSwiper = !0), !f.params.allowSwipeToNext && "next" === f.swipeDirection && T < k && (T = k), !f.params.allowSwipeToPrev && "prev" === f.swipeDirection && T > k && (T = k), f.params.threshold > 0) {
                                        if (!(Math.abs(r) > f.params.threshold || P)) return void(T = k);
                                        if (!P) return P = !0, f.touches.startX = f.touches.currentX, f.touches.startY = f.touches.currentY, T = k, void(f.touches.diff = f.isHorizontal() ? f.touches.currentX - f.touches.startX : f.touches.currentY - f.touches.startY)
                                    }
                                    f.params.followFinger && ((f.params.freeMode || f.params.watchSlidesProgress) && f.updateActiveIndex(), f.params.freeMode && (0 === O.length && O.push({
                                        position: f.touches[f.isHorizontal() ? "startX" : "startY"],
                                        time: y
                                    }), O.push({
                                        position: f.touches[f.isHorizontal() ? "currentX" : "currentY"],
                                        time: (new window.Date).getTime()
                                    })), f.updateProgress(T), f.setWrapperTranslate(T))
                                }
                            }
                        }
                    }
                }, f.onTouchEnd = function (e) {
                    if (e.originalEvent && (e = e.originalEvent), C && f.emit("onTouchEnd", f, e), C = !1, b) {
                        f.params.grabCursor && w && b && (!0 === f.params.allowSwipeToNext || !0 === f.params.allowSwipeToPrev) && f.setGrabCursor(!1);
                        var a = Date.now(),
                            t = a - y;
                        if (f.allowClick && (f.updateClickedSlide(e), f.emit("onTap", f, e), t < 300 && a - E > 300 && (S && clearTimeout(S), S = setTimeout(function () {
                            f && (f.params.paginationHide && f.paginationContainer.length > 0 && !g(e.target).hasClass(f.params.bulletClass) && f.paginationContainer.toggleClass(f.params.paginationHiddenClass), f.emit("onClick", f, e))
                        }, 300)), t < 300 && a - E < 300 && (S && clearTimeout(S), f.emit("onDoubleTap", f, e))), E = Date.now(), setTimeout(function () {
                            f && (f.allowClick = !0)
                        }, 0), !b || !w || !f.swipeDirection || 0 === f.touches.diff || T === k) return void(b = w = !1);
                        b = w = !1;
                        var r;
                        if (r = f.params.followFinger ? f.rtl ? f.translate : -f.translate : -T, f.params.freeMode) {
                            if (r < -f.minTranslate()) return void f.slideTo(f.activeIndex);
                            if (r > -f.maxTranslate()) return void(f.slides.length < f.snapGrid.length ? f.slideTo(f.snapGrid.length - 1) : f.slideTo(f.slides.length - 1));
                            if (f.params.freeModeMomentum) {
                                if (O.length > 1) {
                                    var n = O.pop(),
                                        i = O.pop(),
                                        s = n.position - i.position,
                                        o = n.time - i.time;
                                    f.velocity = s / o, f.velocity = f.velocity / 2, Math.abs(f.velocity) < f.params.freeModeMinimumVelocity && (f.velocity = 0), (o > 150 || (new window.Date).getTime() - n.time > 300) && (f.velocity = 0)
                                } else f.velocity = 0;
                                f.velocity = f.velocity * f.params.freeModeMomentumVelocityRatio, O.length = 0;
                                var l = 1e3 * f.params.freeModeMomentumRatio,
                                    p = f.velocity * l,
                                    d = f.translate + p;
                                f.rtl && (d = -d);
                                var c, m = !1,
                                    u = 20 * Math.abs(f.velocity) * f.params.freeModeMomentumBounceRatio;
                                if (d < f.maxTranslate()) f.params.freeModeMomentumBounce ? (d + f.maxTranslate() < -u && (d = f.maxTranslate() - u), c = f.maxTranslate(), m = !0, M = !0) : d = f.maxTranslate();
                                else if (d > f.minTranslate()) f.params.freeModeMomentumBounce ? (d - f.minTranslate() > u && (d = f.minTranslate() + u), c = f.minTranslate(), m = !0, M = !0) : d = f.minTranslate();
                                else if (f.params.freeModeSticky) {
                                    var h, v = 0;
                                    for (v = 0; v < f.snapGrid.length; v += 1)
                                        if (f.snapGrid[v] > -d) {
                                            h = v;
                                            break
                                        }
                                    d = Math.abs(f.snapGrid[h] - d) < Math.abs(f.snapGrid[h - 1] - d) || "next" === f.swipeDirection ? f.snapGrid[h] : f.snapGrid[h - 1], f.rtl || (d = -d)
                                }
                                if (0 !== f.velocity) l = f.rtl ? Math.abs((-d - f.translate) / f.velocity) : Math.abs((d - f.translate) / f.velocity);
                                else if (f.params.freeModeSticky) return void f.slideReset();
                                f.params.freeModeMomentumBounce && m ? (f.updateProgress(c), f.setWrapperTransition(l), f.setWrapperTranslate(d), f.onTransitionStart(), f.animating = !0, f.wrapper.transitionEnd(function () {
                                    f && M && (f.emit("onMomentumBounce", f), f.setWrapperTransition(f.params.speed), f.setWrapperTranslate(c), f.wrapper.transitionEnd(function () {
                                        f && f.onTransitionEnd()
                                    }))
                                })) : f.velocity ? (f.updateProgress(d), f.setWrapperTransition(l), f.setWrapperTranslate(d), f.onTransitionStart(), f.animating || (f.animating = !0, f.wrapper.transitionEnd(function () {
                                    f && f.onTransitionEnd()
                                }))) : f.updateProgress(d), f.updateActiveIndex()
                            }
                            return void((!f.params.freeModeMomentum || t >= f.params.longSwipesMs) && (f.updateProgress(), f.updateActiveIndex()))
                        }
                        var x, P = 0,
                            I = f.slidesSizesGrid[0];
                        for (x = 0; x < f.slidesGrid.length; x += f.params.slidesPerGroup) void 0 !== f.slidesGrid[x + f.params.slidesPerGroup] ? r >= f.slidesGrid[x] && r < f.slidesGrid[x + f.params.slidesPerGroup] && (P = x, I = f.slidesGrid[x + f.params.slidesPerGroup] - f.slidesGrid[x]) : r >= f.slidesGrid[x] && (P = x, I = f.slidesGrid[f.slidesGrid.length - 1] - f.slidesGrid[f.slidesGrid.length - 2]);
                        var L = (r - f.slidesGrid[P]) / I;
                        if (t > f.params.longSwipesMs) {
                            if (!f.params.longSwipes) return void f.slideTo(f.activeIndex);
                            "next" === f.swipeDirection && (L >= f.params.longSwipesRatio ? f.slideTo(P + f.params.slidesPerGroup) : f.slideTo(P)), "prev" === f.swipeDirection && (L > 1 - f.params.longSwipesRatio ? f.slideTo(P + f.params.slidesPerGroup) : f.slideTo(P))
                        } else {
                            if (!f.params.shortSwipes) return void f.slideTo(f.activeIndex);
                            "next" === f.swipeDirection && f.slideTo(P + f.params.slidesPerGroup), "prev" === f.swipeDirection && f.slideTo(P)
                        }
                    }
                }, f._slideTo = function (e, a) {
                    return f.slideTo(e, a, !0, !0)
                }, f.slideTo = function (e, a, t, r) {
                    void 0 === t && (t = !0), void 0 === e && (e = 0), e < 0 && (e = 0), f.snapIndex = Math.floor(e / f.params.slidesPerGroup), f.snapIndex >= f.snapGrid.length && (f.snapIndex = f.snapGrid.length - 1);
                    var n = -f.snapGrid[f.snapIndex];
                    if (f.params.autoplay && f.autoplaying && (r || !f.params.autoplayDisableOnInteraction ? f.pauseAutoplay(a) : f.stopAutoplay()), f.updateProgress(n), f.params.normalizeSlideIndex)
                        for (var i = 0; i < f.slidesGrid.length; i++) - Math.floor(100 * n) >= Math.floor(100 * f.slidesGrid[i]) && (e = i);
                    return !(!f.params.allowSwipeToNext && n < f.translate && n < f.minTranslate() || !f.params.allowSwipeToPrev && n > f.translate && n > f.maxTranslate() && (f.activeIndex || 0) !== e || (void 0 === a && (a = f.params.speed), f.previousIndex = f.activeIndex || 0, f.activeIndex = e, f.updateRealIndex(), f.rtl && -n === f.translate || !f.rtl && n === f.translate ? (f.params.autoHeight && f.updateAutoHeight(), f.updateClasses(), "slide" !== f.params.effect && f.setWrapperTranslate(n), 1) : (f.updateClasses(), f.onTransitionStart(t), 0 === a || f.browser.lteIE9 ? (f.setWrapperTranslate(n), f.setWrapperTransition(0), f.onTransitionEnd(t)) : (f.setWrapperTranslate(n), f.setWrapperTransition(a), f.animating || (f.animating = !0, f.wrapper.transitionEnd(function () {
                        f && f.onTransitionEnd(t)
                    }))), 0)))
                }, f.onTransitionStart = function (e) {
                    void 0 === e && (e = !0), f.params.autoHeight && f.updateAutoHeight(), f.lazy && f.lazy.onTransitionStart(),
                        e && (f.emit("onTransitionStart", f), f.activeIndex !== f.previousIndex && (f.emit("onSlideChangeStart", f), f.activeIndex > f.previousIndex ? f.emit("onSlideNextStart", f) : f.emit("onSlidePrevStart", f)))
                }, f.onTransitionEnd = function (e) {
                    f.animating = !1, f.setWrapperTransition(0), void 0 === e && (e = !0), f.lazy && f.lazy.onTransitionEnd(), e && (f.emit("onTransitionEnd", f), f.activeIndex !== f.previousIndex && (f.emit("onSlideChangeEnd", f), f.activeIndex > f.previousIndex ? f.emit("onSlideNextEnd", f) : f.emit("onSlidePrevEnd", f))), f.params.history && f.history && f.history.setHistory(f.params.history, f.activeIndex), f.params.hashnav && f.hashnav && f.hashnav.setHash()
                }, f.slideNext = function (e, a, t) {
                    return f.params.loop ? !f.animating && (f.fixLoop(), f.container[0].clientLeft, f.slideTo(f.activeIndex + f.params.slidesPerGroup, a, e, t)) : f.slideTo(f.activeIndex + f.params.slidesPerGroup, a, e, t)
                }, f._slideNext = function (e) {
                    return f.slideNext(!0, e, !0)
                }, f.slidePrev = function (e, a, t) {
                    return f.params.loop ? !f.animating && (f.fixLoop(), f.container[0].clientLeft, f.slideTo(f.activeIndex - 1, a, e, t)) : f.slideTo(f.activeIndex - 1, a, e, t)
                }, f._slidePrev = function (e) {
                    return f.slidePrev(!0, e, !0)
                }, f.slideReset = function (e, a, t) {
                    return f.slideTo(f.activeIndex, a, e)
                }, f.disableTouchControl = function () {
                    return f.params.onlyExternal = !0, !0
                }, f.enableTouchControl = function () {
                    return f.params.onlyExternal = !1, !0
                }, f.setWrapperTransition = function (e, a) {
                    f.wrapper.transition(e), "slide" !== f.params.effect && f.effects[f.params.effect] && f.effects[f.params.effect].setTransition(e), f.params.parallax && f.parallax && f.parallax.setTransition(e), f.params.scrollbar && f.scrollbar && f.scrollbar.setTransition(e), f.params.control && f.controller && f.controller.setTransition(e, a), f.emit("onSetTransition", f, e)
                }, f.setWrapperTranslate = function (e, a, r) {
                    var n = 0,
                        i = 0;
                    f.isHorizontal() ? n = f.rtl ? -e : e : i = e, f.params.roundLengths && (n = t(n), i = t(i)), f.params.virtualTranslate || (f.support.transforms3d ? f.wrapper.transform("translate3d(" + n + "px, " + i + "px, 0px)") : f.wrapper.transform("translate(" + n + "px, " + i + "px)")), f.translate = f.isHorizontal() ? n : i;
                    var s, o = f.maxTranslate() - f.minTranslate();
                    s = 0 === o ? 0 : (e - f.minTranslate()) / o, s !== f.progress && f.updateProgress(e), a && f.updateActiveIndex(), "slide" !== f.params.effect && f.effects[f.params.effect] && f.effects[f.params.effect].setTranslate(f.translate), f.params.parallax && f.parallax && f.parallax.setTranslate(f.translate), f.params.scrollbar && f.scrollbar && f.scrollbar.setTranslate(f.translate), f.params.control && f.controller && f.controller.setTranslate(f.translate, r), f.emit("onSetTranslate", f, f.translate)
                }, f.getTranslate = function (e, a) {
                    var t, r, n, i;
                    return void 0 === a && (a = "x"), f.params.virtualTranslate ? f.rtl ? -f.translate : f.translate : (n = window.getComputedStyle(e, null), window.WebKitCSSMatrix ? (r = n.transform || n.webkitTransform, r.split(",").length > 6 && (r = r.split(", ").map(function (e) {
                        return e.replace(",", ".")
                    }).join(", ")), i = new window.WebKitCSSMatrix("none" === r ? "" : r)) : (i = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), t = i.toString().split(",")), "x" === a && (r = window.WebKitCSSMatrix ? i.m41 : 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === a && (r = window.WebKitCSSMatrix ? i.m42 : 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5])), f.rtl && r && (r = -r), r || 0)
                }, f.getWrapperTranslate = function (e) {
                    return void 0 === e && (e = f.isHorizontal() ? "x" : "y"), f.getTranslate(f.wrapper[0], e)
                }, f.observers = [], f.initObservers = function () {
                    if (f.params.observeParents)
                        for (var e = f.container.parents(), a = 0; a < e.length; a++) i(e[a]);
                    i(f.container[0], {
                        childList: !1
                    }), i(f.wrapper[0], {
                        attributes: !1
                    })
                }, f.disconnectObservers = function () {
                    for (var e = 0; e < f.observers.length; e++) f.observers[e].disconnect();
                    f.observers = []
                }, f.createLoop = function () {
                    f.wrapper.children("." + f.params.slideClass + "." + f.params.slideDuplicateClass).remove();
                    var e = f.wrapper.children("." + f.params.slideClass);
                    "auto" !== f.params.slidesPerView || f.params.loopedSlides || (f.params.loopedSlides = e.length), f.loopedSlides = parseInt(f.params.loopedSlides || f.params.slidesPerView, 10), f.loopedSlides = f.loopedSlides + f.params.loopAdditionalSlides, f.loopedSlides > e.length && (f.loopedSlides = e.length);
                    var a, t = [],
                        r = [];
                    for (e.each(function (a, n) {
                        var i = g(this);
                        a < f.loopedSlides && r.push(n), a < e.length && a >= e.length - f.loopedSlides && t.push(n), i.attr("data-swiper-slide-index", a)
                    }), a = 0; a < r.length; a++) f.wrapper.append(g(r[a].cloneNode(!0)).addClass(f.params.slideDuplicateClass));
                    for (a = t.length - 1; a >= 0; a--) f.wrapper.prepend(g(t[a].cloneNode(!0)).addClass(f.params.slideDuplicateClass))
                }, f.destroyLoop = function () {
                    f.wrapper.children("." + f.params.slideClass + "." + f.params.slideDuplicateClass).remove(), f.slides.removeAttr("data-swiper-slide-index")
                }, f.reLoop = function (e) {
                    var a = f.activeIndex - f.loopedSlides;
                    f.destroyLoop(), f.createLoop(), f.updateSlidesSize(), e && f.slideTo(a + f.loopedSlides, 0, !1)
                }, f.fixLoop = function () {
                    var e;
                    f.activeIndex < f.loopedSlides ? (e = f.slides.length - 3 * f.loopedSlides + f.activeIndex, e += f.loopedSlides, f.slideTo(e, 0, !1, !0)) : ("auto" === f.params.slidesPerView && f.activeIndex >= 2 * f.loopedSlides || f.activeIndex > f.slides.length - 2 * f.params.slidesPerView) && (e = -f.slides.length + f.activeIndex + f.loopedSlides, e += f.loopedSlides, f.slideTo(e, 0, !1, !0))
                }, f.appendSlide = function (e) {
                    if (f.params.loop && f.destroyLoop(), "object" == typeof e && e.length)
                        for (var a = 0; a < e.length; a++) e[a] && f.wrapper.append(e[a]);
                    else f.wrapper.append(e);
                    f.params.loop && f.createLoop(), f.params.observer && f.support.observer || f.update(!0)
                }, f.prependSlide = function (e) {
                    f.params.loop && f.destroyLoop();
                    var a = f.activeIndex + 1;
                    if ("object" == typeof e && e.length) {
                        for (var t = 0; t < e.length; t++) e[t] && f.wrapper.prepend(e[t]);
                        a = f.activeIndex + e.length
                    } else f.wrapper.prepend(e);
                    f.params.loop && f.createLoop(), f.params.observer && f.support.observer || f.update(!0), f.slideTo(a, 0, !1)
                }, f.removeSlide = function (e) {
                    f.params.loop && (f.destroyLoop(), f.slides = f.wrapper.children("." + f.params.slideClass));
                    var a, t = f.activeIndex;
                    if ("object" == typeof e && e.length) {
                        for (var r = 0; r < e.length; r++) a = e[r], f.slides[a] && f.slides.eq(a).remove(), a < t && t--;
                        t = Math.max(t, 0)
                    } else a = e, f.slides[a] && f.slides.eq(a).remove(), a < t && t--, t = Math.max(t, 0);
                    f.params.loop && f.createLoop(), f.params.observer && f.support.observer || f.update(!0), f.params.loop ? f.slideTo(t + f.loopedSlides, 0, !1) : f.slideTo(t, 0, !1)
                }, f.removeAllSlides = function () {
                    for (var e = [], a = 0; a < f.slides.length; a++) e.push(a);
                    f.removeSlide(e)
                }, f.effects = {
                    fade: {
                        setTranslate: function () {
                            for (var e = 0; e < f.slides.length; e++) {
                                var a = f.slides.eq(e),
                                    t = a[0].swiperSlideOffset,
                                    r = -t;
                                f.params.virtualTranslate || (r -= f.translate);
                                var n = 0;
                                f.isHorizontal() || (n = r, r = 0);
                                var i = f.params.fade.crossFade ? Math.max(1 - Math.abs(a[0].progress), 0) : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                                a.css({
                                    opacity: i
                                }).transform("translate3d(" + r + "px, " + n + "px, 0px)")
                            }
                        }, setTransition: function (e) {
                            if (f.slides.transition(e), f.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                f.slides.transitionEnd(function () {
                                    if (!a && f) {
                                        a = !0, f.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) f.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    flip: {
                        setTranslate: function () {
                            for (var e = 0; e < f.slides.length; e++) {
                                var a = f.slides.eq(e),
                                    t = a[0].progress;
                                f.params.flip.limitRotation && (t = Math.max(Math.min(a[0].progress, 1), -1));
                                var r = a[0].swiperSlideOffset,
                                    n = -180 * t,
                                    i = n,
                                    s = 0,
                                    o = -r,
                                    l = 0;
                                if (f.isHorizontal() ? f.rtl && (i = -i) : (l = o, o = 0, s = -i, i = 0), a[0].style.zIndex = -Math.abs(Math.round(t)) + f.slides.length, f.params.flip.slideShadows) {
                                    var p = f.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                                        d = f.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                                    0 === p.length && (p = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "left" : "top") + '"></div>'), a.append(p)), 0 === d.length && (d = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(d)), p.length && (p[0].style.opacity = Math.max(-t, 0)), d.length && (d[0].style.opacity = Math.max(t, 0))
                                }
                                a.transform("translate3d(" + o + "px, " + l + "px, 0px) rotateX(" + s + "deg) rotateY(" + i + "deg)")
                            }
                        }, setTransition: function (e) {
                            if (f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), f.params.virtualTranslate && 0 !== e) {
                                var a = !1;
                                f.slides.eq(f.activeIndex).transitionEnd(function () {
                                    if (!a && f && g(this).hasClass(f.params.slideActiveClass)) {
                                        a = !0, f.animating = !1;
                                        for (var e = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], t = 0; t < e.length; t++) f.wrapper.trigger(e[t])
                                    }
                                })
                            }
                        }
                    },
                    cube: {
                        setTranslate: function () {
                            var e, a = 0;
                            f.params.cube.shadow && (f.isHorizontal() ? (e = f.wrapper.find(".swiper-cube-shadow"), 0 === e.length && (e = g('<div class="swiper-cube-shadow"></div>'), f.wrapper.append(e)), e.css({
                                height: f.width + "px"
                            })) : (e = f.container.find(".swiper-cube-shadow"), 0 === e.length && (e = g('<div class="swiper-cube-shadow"></div>'), f.container.append(e))));
                            for (var t = 0; t < f.slides.length; t++) {
                                var r = f.slides.eq(t),
                                    n = 90 * t,
                                    i = Math.floor(n / 360);
                                f.rtl && (n = -n, i = Math.floor(-n / 360));
                                var s = Math.max(Math.min(r[0].progress, 1), -1),
                                    o = 0,
                                    l = 0,
                                    p = 0;
                                t % 4 == 0 ? (o = 4 * -i * f.size, p = 0) : (t - 1) % 4 == 0 ? (o = 0, p = 4 * -i * f.size) : (t - 2) % 4 == 0 ? (o = f.size + 4 * i * f.size, p = f.size) : (t - 3) % 4 == 0 && (o = -f.size, p = 3 * f.size + 4 * f.size * i), f.rtl && (o = -o), f.isHorizontal() || (l = o, o = 0);
                                var d = "rotateX(" + (f.isHorizontal() ? 0 : -n) + "deg) rotateY(" + (f.isHorizontal() ? n : 0) + "deg) translate3d(" + o + "px, " + l + "px, " + p + "px)";
                                if (s <= 1 && s > -1 && (a = 90 * t + 90 * s, f.rtl && (a = 90 * -t - 90 * s)), r.transform(d), f.params.cube.slideShadows) {
                                    var c = f.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top"),
                                        m = f.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                                    0 === c.length && (c = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "left" : "top") + '"></div>'), r.append(c)), 0 === m.length && (m = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "right" : "bottom") + '"></div>'), r.append(m)), c.length && (c[0].style.opacity = Math.max(-s, 0)), m.length && (m[0].style.opacity = Math.max(s, 0))
                                }
                            }
                            if (f.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + f.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + f.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + f.size / 2 + "px",
                                "transform-origin": "50% 50% -" + f.size / 2 + "px"
                            }), f.params.cube.shadow)
                                if (f.isHorizontal()) e.transform("translate3d(0px, " + (f.width / 2 + f.params.cube.shadowOffset) + "px, " + -f.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + f.params.cube.shadowScale + ")");
                                else {
                                    var u = Math.abs(a) - 90 * Math.floor(Math.abs(a) / 90),
                                        h = 1.5 - (Math.sin(2 * u * Math.PI / 360) / 2 + Math.cos(2 * u * Math.PI / 360) / 2),
                                        v = f.params.cube.shadowScale,
                                        b = f.params.cube.shadowScale / h,
                                        w = f.params.cube.shadowOffset;
                                    e.transform("scale3d(" + v + ", 1, " + b + ") translate3d(0px, " + (f.height / 2 + w) + "px, " + -f.height / 2 / b + "px) rotateX(-90deg)")
                                }
                            var C = f.isSafari || f.isUiWebView ? -f.size / 2 : 0;
                            f.wrapper.transform("translate3d(0px,0," + C + "px) rotateX(" + (f.isHorizontal() ? 0 : a) + "deg) rotateY(" + (f.isHorizontal() ? -a : 0) + "deg)")
                        }, setTransition: function (e) {
                            f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), f.params.cube.shadow && !f.isHorizontal() && f.container.find(".swiper-cube-shadow").transition(e)
                        }
                    },
                    coverflow: {
                        setTranslate: function () {
                            for (var e = f.translate, a = f.isHorizontal() ? -e + f.width / 2 : -e + f.height / 2, t = f.isHorizontal() ? f.params.coverflow.rotate : -f.params.coverflow.rotate, r = f.params.coverflow.depth, n = 0, i = f.slides.length; n < i; n++) {
                                var s = f.slides.eq(n),
                                    o = f.slidesSizesGrid[n],
                                    l = s[0].swiperSlideOffset,
                                    p = (a - l - o / 2) / o * f.params.coverflow.modifier,
                                    d = f.isHorizontal() ? t * p : 0,
                                    c = f.isHorizontal() ? 0 : t * p,
                                    m = -r * Math.abs(p),
                                    u = f.isHorizontal() ? 0 : f.params.coverflow.stretch * p,
                                    h = f.isHorizontal() ? f.params.coverflow.stretch * p : 0;
                                Math.abs(h) < .001 && (h = 0), Math.abs(u) < .001 && (u = 0), Math.abs(m) < .001 && (m = 0), Math.abs(d) < .001 && (d = 0), Math.abs(c) < .001 && (c = 0);
                                var v = "translate3d(" + h + "px," + u + "px," + m + "px)  rotateX(" + c + "deg) rotateY(" + d + "deg)";
                                if (s.transform(v), s[0].style.zIndex = 1 - Math.abs(Math.round(p)), f.params.coverflow.slideShadows) {
                                    var b = f.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
                                        w = f.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                                    0 === b.length && (b = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "left" : "top") + '"></div>'), s.append(b)), 0 === w.length && (w = g('<div class="swiper-slide-shadow-' + (f.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(w)), b.length && (b[0].style.opacity = p > 0 ? p : 0), w.length && (w[0].style.opacity = -p > 0 ? -p : 0)
                                }
                            }
                            f.browser.ie && (f.wrapper[0].style.perspectiveOrigin = a + "px 50%")
                        }, setTransition: function (e) {
                            f.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
                        }
                    }
                }, f.lazy = {
                    initialImageLoaded: !1,
                    loadImageInSlide: function (e, a) {
                        if (void 0 !== e && (void 0 === a && (a = !0), 0 !== f.slides.length)) {
                            var t = f.slides.eq(e),
                                r = t.find("." + f.params.lazyLoadingClass + ":not(." + f.params.lazyStatusLoadedClass + "):not(." + f.params.lazyStatusLoadingClass + ")");
                            !t.hasClass(f.params.lazyLoadingClass) || t.hasClass(f.params.lazyStatusLoadedClass) || t.hasClass(f.params.lazyStatusLoadingClass) || (r = r.add(t[0])), 0 !== r.length && r.each(function () {
                                var e = g(this);
                                e.addClass(f.params.lazyStatusLoadingClass);
                                var r = e.attr("data-background"),
                                    n = e.attr("data-src"),
                                    i = e.attr("data-srcset"),
                                    s = e.attr("data-sizes");
                                f.loadImage(e[0], n || r, i, s, !1, function () {
                                    if (void 0 !== f && null !== f && f) {
                                        if (r ? (e.css("background-image", 'url("' + r + '")'), e.removeAttr("data-background")) : (i && (e.attr("srcset", i), e.removeAttr("data-srcset")), s && (e.attr("sizes", s), e.removeAttr("data-sizes")), n && (e.attr("src", n), e.removeAttr("data-src"))), e.addClass(f.params.lazyStatusLoadedClass).removeClass(f.params.lazyStatusLoadingClass), t.find("." + f.params.lazyPreloaderClass + ", ." + f.params.preloaderClass).remove(), f.params.loop && a) {
                                            var o = t.attr("data-swiper-slide-index");
                                            if (t.hasClass(f.params.slideDuplicateClass)) {
                                                var l = f.wrapper.children('[data-swiper-slide-index="' + o + '"]:not(.' + f.params.slideDuplicateClass + ")");
                                                f.lazy.loadImageInSlide(l.index(), !1)
                                            } else {
                                                var p = f.wrapper.children("." + f.params.slideDuplicateClass + '[data-swiper-slide-index="' + o + '"]');
                                                f.lazy.loadImageInSlide(p.index(), !1)
                                            }
                                        }
                                        f.emit("onLazyImageReady", f, t[0], e[0])
                                    }
                                }), f.emit("onLazyImageLoad", f, t[0], e[0])
                            })
                        }
                    }, load: function () {
                        var e, a = f.params.slidesPerView;
                        if ("auto" === a && (a = 0), f.lazy.initialImageLoaded || (f.lazy.initialImageLoaded = !0), f.params.watchSlidesVisibility) f.wrapper.children("." + f.params.slideVisibleClass).each(function () {
                            f.lazy.loadImageInSlide(g(this).index())
                        });
                        else if (a > 1)
                            for (e = f.activeIndex; e < f.activeIndex + a; e++) f.slides[e] && f.lazy.loadImageInSlide(e);
                        else f.lazy.loadImageInSlide(f.activeIndex); if (f.params.lazyLoadingInPrevNext)
                            if (a > 1 || f.params.lazyLoadingInPrevNextAmount && f.params.lazyLoadingInPrevNextAmount > 1) {
                                var t = f.params.lazyLoadingInPrevNextAmount,
                                    r = a,
                                    n = Math.min(f.activeIndex + r + Math.max(t, r), f.slides.length),
                                    i = Math.max(f.activeIndex - Math.max(r, t), 0);
                                for (e = f.activeIndex + a; e < n; e++) f.slides[e] && f.lazy.loadImageInSlide(e);
                                for (e = i; e < f.activeIndex; e++) f.slides[e] && f.lazy.loadImageInSlide(e)
                            } else {
                                var s = f.wrapper.children("." + f.params.slideNextClass);
                                s.length > 0 && f.lazy.loadImageInSlide(s.index());
                                var o = f.wrapper.children("." + f.params.slidePrevClass);
                                o.length > 0 && f.lazy.loadImageInSlide(o.index())
                            }
                    }, onTransitionStart: function () {
                        f.params.lazyLoading && (f.params.lazyLoadingOnTransitionStart || !f.params.lazyLoadingOnTransitionStart && !f.lazy.initialImageLoaded) && f.lazy.load()
                    }, onTransitionEnd: function () {
                        f.params.lazyLoading && !f.params.lazyLoadingOnTransitionStart && f.lazy.load()
                    }
                }, f.scrollbar = {
                    isTouched: !1,
                    setDragPosition: function (e) {
                        var a = f.scrollbar,
                            t = f.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY,
                            r = t - a.track.offset()[f.isHorizontal() ? "left" : "top"] - a.dragSize / 2,
                            n = -f.minTranslate() * a.moveDivider,
                            i = -f.maxTranslate() * a.moveDivider;
                        r < n ? r = n : r > i && (r = i), r = -r / a.moveDivider, f.updateProgress(r), f.setWrapperTranslate(r, !0)
                    }, dragStart: function (e) {
                        var a = f.scrollbar;
                        a.isTouched = !0, e.preventDefault(), e.stopPropagation(), a.setDragPosition(e), clearTimeout(a.dragTimeout), a.track.transition(0), f.params.scrollbarHide && a.track.css("opacity", 1), f.wrapper.transition(100), a.drag.transition(100), f.emit("onScrollbarDragStart", f)
                    }, dragMove: function (e) {
                        var a = f.scrollbar;
                        a.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), f.wrapper.transition(0), a.track.transition(0), a.drag.transition(0), f.emit("onScrollbarDragMove", f))
                    }, dragEnd: function (e) {
                        var a = f.scrollbar;
                        a.isTouched && (a.isTouched = !1, f.params.scrollbarHide && (clearTimeout(a.dragTimeout), a.dragTimeout = setTimeout(function () {
                            a.track.css("opacity", 0), a.track.transition(400)
                        }, 1e3)), f.emit("onScrollbarDragEnd", f), f.params.scrollbarSnapOnRelease && f.slideReset())
                    }, draggableEvents: function () {
                        return !1 !== f.params.simulateTouch || f.support.touch ? f.touchEvents : f.touchEventsDesktop
                    }(),
                    enableDraggable: function () {
                        var e = f.scrollbar,
                            a = f.support.touch ? e.track : document;
                        g(e.track).on(e.draggableEvents.start, e.dragStart), g(a).on(e.draggableEvents.move, e.dragMove), g(a).on(e.draggableEvents.end, e.dragEnd)
                    }, disableDraggable: function () {
                        var e = f.scrollbar,
                            a = f.support.touch ? e.track : document;
                        g(e.track).off(e.draggableEvents.start, e.dragStart), g(a).off(e.draggableEvents.move, e.dragMove), g(a).off(e.draggableEvents.end, e.dragEnd)
                    }, set: function () {
                        if (f.params.scrollbar) {
                            var e = f.scrollbar;
                            e.track = g(f.params.scrollbar), f.params.uniqueNavElements && "string" == typeof f.params.scrollbar && e.track.length > 1 && 1 === f.container.find(f.params.scrollbar).length && (e.track = f.container.find(f.params.scrollbar)), e.drag = e.track.find(".swiper-scrollbar-drag"), 0 === e.drag.length && (e.drag = g('<div class="swiper-scrollbar-drag"></div>'), e.track.append(e.drag)), e.drag[0].style.width = "", e.drag[0].style.height = "", e.trackSize = f.isHorizontal() ? e.track[0].offsetWidth : e.track[0].offsetHeight, e.divider = f.size / f.virtualSize, e.moveDivider = e.divider * (e.trackSize / f.size), e.dragSize = e.trackSize * e.divider, f.isHorizontal() ? e.drag[0].style.width = e.dragSize + "px" : e.drag[0].style.height = e.dragSize + "px", e.divider >= 1 ? e.track[0].style.display = "none" : e.track[0].style.display = "", f.params.scrollbarHide && (e.track[0].style.opacity = 0)
                        }
                    }, setTranslate: function () {
                        if (f.params.scrollbar) {
                            var e, a = f.scrollbar,
                                t = (f.translate, a.dragSize);
                            e = (a.trackSize - a.dragSize) * f.progress, f.rtl && f.isHorizontal() ? (e = -e, e > 0 ? (t = a.dragSize - e, e = 0) : -e + a.dragSize > a.trackSize && (t = a.trackSize + e)) : e < 0 ? (t = a.dragSize + e, e = 0) : e + a.dragSize > a.trackSize && (t = a.trackSize - e), f.isHorizontal() ? (f.support.transforms3d ? a.drag.transform("translate3d(" + e + "px, 0, 0)") : a.drag.transform("translateX(" + e + "px)"), a.drag[0].style.width = t + "px") : (f.support.transforms3d ? a.drag.transform("translate3d(0px, " + e + "px, 0)") : a.drag.transform("translateY(" + e + "px)"), a.drag[0].style.height = t + "px"), f.params.scrollbarHide && (clearTimeout(a.timeout), a.track[0].style.opacity = 1, a.timeout = setTimeout(function () {
                                a.track[0].style.opacity = 0, a.track.transition(400)
                            }, 1e3))
                        }
                    }, setTransition: function (e) {
                        f.params.scrollbar && f.scrollbar.drag.transition(e)
                    }
                }, f.controller = {
                    LinearSpline: function (e, a) {
                        var t = function () {
                            var e, a, t;
                            return function (r, n) {
                                for (a = -1, e = r.length; e - a > 1;) r[t = e + a >> 1] <= n ? a = t : e = t;
                                return e
                            }
                        }();
                        this.x = e, this.y = a, this.lastIndex = e.length - 1;
                        var r, n;
                        this.x.length, this.interpolate = function (e) {
                            return e ? (n = t(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                        }
                    }, getInterpolateFunction: function (e) {
                        f.controller.spline || (f.controller.spline = f.params.loop ? new f.controller.LinearSpline(f.slidesGrid, e.slidesGrid) : new f.controller.LinearSpline(f.snapGrid, e.snapGrid))
                    }, setTranslate: function (e, a) {
                        function t(a) {
                            e = a.rtl && "horizontal" === a.params.direction ? -f.translate : f.translate, "slide" === f.params.controlBy && (f.controller.getInterpolateFunction(a), n = -f.controller.spline.interpolate(-e)), n && "container" !== f.params.controlBy || (r = (a.maxTranslate() - a.minTranslate()) / (f.maxTranslate() - f.minTranslate()), n = (e - f.minTranslate()) * r + a.minTranslate()), f.params.controlInverse && (n = a.maxTranslate() - n), a.updateProgress(n), a.setWrapperTranslate(n, !1, f), a.updateActiveIndex()
                        }
                        var r, n, i = f.params.control;
                        if (Array.isArray(i))
                            for (var s = 0; s < i.length; s++) i[s] !== a && i[s] instanceof Swiper && t(i[s]);
                        else i instanceof Swiper && a !== i && t(i)
                    }, setTransition: function (e, a) {
                        function t(a) {
                            a.setWrapperTransition(e, f), 0 !== e && (a.onTransitionStart(), a.wrapper.transitionEnd(function () {
                                n && (a.params.loop && "slide" === f.params.controlBy && a.fixLoop(), a.onTransitionEnd())
                            }))
                        }
                        var r, n = f.params.control;
                        if (Array.isArray(n))
                            for (r = 0; r < n.length; r++) n[r] !== a && n[r] instanceof Swiper && t(n[r]);
                        else n instanceof Swiper && a !== n && t(n)
                    }
                }, f.parallax = {
                    setTranslate: function () {
                        f.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            s(this, f.progress)
                        }), f.slides.each(function () {
                            var e = g(this);
                            e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                                s(this, Math.min(Math.max(e[0].progress, -1), 1))
                            })
                        })
                    }, setTransition: function (e) {
                        void 0 === e && (e = f.params.speed), f.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function () {
                            var a = g(this),
                                t = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                            0 === e && (t = 0), a.transition(t)
                        })
                    }
                }, f.zoom = {
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        slide: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        image: void 0,
                        imageWrap: void 0,
                        zoomMax: f.params.zoomMax
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    },
                    getDistanceBetweenTouches: function (e) {
                        if (e.targetTouches.length < 2) return 1;
                        var a = e.targetTouches[0].pageX,
                            t = e.targetTouches[0].pageY,
                            r = e.targetTouches[1].pageX,
                            n = e.targetTouches[1].pageY;
                        return Math.sqrt(Math.pow(r - a, 2) + Math.pow(n - t, 2))
                    }, onGestureStart: function (e) {
                        var a = f.zoom;
                        if (!f.support.gestures) {
                            if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                            a.gesture.scaleStart = a.getDistanceBetweenTouches(e)
                        }
                        if (!(a.gesture.slide && a.gesture.slide.length || (a.gesture.slide = g(this), 0 === a.gesture.slide.length && (a.gesture.slide = f.slides.eq(f.activeIndex)), a.gesture.image = a.gesture.slide.find("img, svg, canvas"), a.gesture.imageWrap = a.gesture.image.parent("." + f.params.zoomContainerClass), a.gesture.zoomMax = a.gesture.imageWrap.attr("data-swiper-zoom") || f.params.zoomMax, 0 !== a.gesture.imageWrap.length))) return void(a.gesture.image = void 0);
                        a.gesture.image.transition(0), a.isScaling = !0
                    }, onGestureChange: function (e) {
                        var a = f.zoom;
                        if (!f.support.gestures) {
                            if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                            a.gesture.scaleMove = a.getDistanceBetweenTouches(e)
                        }
                        a.gesture.image && 0 !== a.gesture.image.length && (f.support.gestures ? a.scale = e.scale * a.currentScale : a.scale = a.gesture.scaleMove / a.gesture.scaleStart * a.currentScale, a.scale > a.gesture.zoomMax && (a.scale = a.gesture.zoomMax - 1 + Math.pow(a.scale - a.gesture.zoomMax + 1, .5)), a.scale < f.params.zoomMin && (a.scale = f.params.zoomMin + 1 - Math.pow(f.params.zoomMin - a.scale + 1, .5)), a.gesture.image.transform("translate3d(0,0,0) scale(" + a.scale + ")"))
                    }, onGestureEnd: function (e) {
                        var a = f.zoom;
                        !f.support.gestures && ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2) || a.gesture.image && 0 !== a.gesture.image.length && (a.scale = Math.max(Math.min(a.scale, a.gesture.zoomMax), f.params.zoomMin), a.gesture.image.transition(f.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"), a.currentScale = a.scale, a.isScaling = !1, 1 === a.scale && (a.gesture.slide = void 0))
                    }, onTouchStart: function (e, a) {
                        var t = e.zoom;
                        t.gesture.image && 0 !== t.gesture.image.length && (t.image.isTouched || ("android" === e.device.os && a.preventDefault(), t.image.isTouched = !0, t.image.touchesStart.x = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, t.image.touchesStart.y = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY))
                    }, onTouchMove: function (e) {
                        var a = f.zoom;
                        if (a.gesture.image && 0 !== a.gesture.image.length && (f.allowClick = !1, a.image.isTouched && a.gesture.slide)) {
                            a.image.isMoved || (a.image.width = a.gesture.image[0].offsetWidth, a.image.height = a.gesture.image[0].offsetHeight, a.image.startX = f.getTranslate(a.gesture.imageWrap[0], "x") || 0, a.image.startY = f.getTranslate(a.gesture.imageWrap[0], "y") || 0, a.gesture.slideWidth = a.gesture.slide[0].offsetWidth, a.gesture.slideHeight = a.gesture.slide[0].offsetHeight, a.gesture.imageWrap.transition(0), f.rtl && (a.image.startX = -a.image.startX), f.rtl && (a.image.startY = -a.image.startY));
                            var t = a.image.width * a.scale,
                                r = a.image.height * a.scale;
                            if (!(t < a.gesture.slideWidth && r < a.gesture.slideHeight)) {
                                if (a.image.minX = Math.min(a.gesture.slideWidth / 2 - t / 2, 0), a.image.maxX = -a.image.minX, a.image.minY = Math.min(a.gesture.slideHeight / 2 - r / 2, 0), a.image.maxY = -a.image.minY, a.image.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, a.image.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !a.image.isMoved && !a.isScaling) {
                                    if (f.isHorizontal() && Math.floor(a.image.minX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x < a.image.touchesStart.x || Math.floor(a.image.maxX) === Math.floor(a.image.startX) && a.image.touchesCurrent.x > a.image.touchesStart.x) return void(a.image.isTouched = !1);
                                    if (!f.isHorizontal() && Math.floor(a.image.minY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y < a.image.touchesStart.y || Math.floor(a.image.maxY) === Math.floor(a.image.startY) && a.image.touchesCurrent.y > a.image.touchesStart.y) return void(a.image.isTouched = !1)
                                }
                                e.preventDefault(), e.stopPropagation(), a.image.isMoved = !0, a.image.currentX = a.image.touchesCurrent.x - a.image.touchesStart.x + a.image.startX, a.image.currentY = a.image.touchesCurrent.y - a.image.touchesStart.y + a.image.startY, a.image.currentX < a.image.minX && (a.image.currentX = a.image.minX + 1 - Math.pow(a.image.minX - a.image.currentX + 1, .8)), a.image.currentX > a.image.maxX && (a.image.currentX = a.image.maxX - 1 + Math.pow(a.image.currentX - a.image.maxX + 1, .8)), a.image.currentY < a.image.minY && (a.image.currentY = a.image.minY + 1 - Math.pow(a.image.minY - a.image.currentY + 1, .8)), a.image.currentY > a.image.maxY && (a.image.currentY = a.image.maxY - 1 + Math.pow(a.image.currentY - a.image.maxY + 1, .8)), a.velocity.prevPositionX || (a.velocity.prevPositionX = a.image.touchesCurrent.x), a.velocity.prevPositionY || (a.velocity.prevPositionY = a.image.touchesCurrent.y), a.velocity.prevTime || (a.velocity.prevTime = Date.now()), a.velocity.x = (a.image.touchesCurrent.x - a.velocity.prevPositionX) / (Date.now() - a.velocity.prevTime) / 2, a.velocity.y = (a.image.touchesCurrent.y - a.velocity.prevPositionY) / (Date.now() - a.velocity.prevTime) / 2, Math.abs(a.image.touchesCurrent.x - a.velocity.prevPositionX) < 2 && (a.velocity.x = 0), Math.abs(a.image.touchesCurrent.y - a.velocity.prevPositionY) < 2 && (a.velocity.y = 0), a.velocity.prevPositionX = a.image.touchesCurrent.x, a.velocity.prevPositionY = a.image.touchesCurrent.y, a.velocity.prevTime = Date.now(), a.gesture.imageWrap.transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                            }
                        }
                    }, onTouchEnd: function (e, a) {
                        var t = e.zoom;
                        if (t.gesture.image && 0 !== t.gesture.image.length) {
                            if (!t.image.isTouched || !t.image.isMoved) return t.image.isTouched = !1, void(t.image.isMoved = !1);
                            t.image.isTouched = !1, t.image.isMoved = !1;
                            var r = 300,
                                n = 300,
                                i = t.velocity.x * r,
                                s = t.image.currentX + i,
                                o = t.velocity.y * n,
                                l = t.image.currentY + o;
                            0 !== t.velocity.x && (r = Math.abs((s - t.image.currentX) / t.velocity.x)), 0 !== t.velocity.y && (n = Math.abs((l - t.image.currentY) / t.velocity.y));
                            var p = Math.max(r, n);
                            t.image.currentX = s, t.image.currentY = l;
                            var d = t.image.width * t.scale,
                                c = t.image.height * t.scale;
                            t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0), t.image.maxX = -t.image.minX, t.image.minY = Math.min(t.gesture.slideHeight / 2 - c / 2, 0), t.image.maxY = -t.image.minY, t.image.currentX = Math.max(Math.min(t.image.currentX, t.image.maxX), t.image.minX), t.image.currentY = Math.max(Math.min(t.image.currentY, t.image.maxY), t.image.minY), t.gesture.imageWrap.transition(p).transform("translate3d(" + t.image.currentX + "px, " + t.image.currentY + "px,0)")
                        }
                    }, onTransitionEnd: function (e) {
                        var a = e.zoom;
                        a.gesture.slide && e.previousIndex !== e.activeIndex && (a.gesture.image.transform("translate3d(0,0,0) scale(1)"), a.gesture.imageWrap.transform("translate3d(0,0,0)"), a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0, a.scale = a.currentScale = 1)
                    }, toggleZoom: function (e, a) {
                        var t = e.zoom;
                        if (t.gesture.slide || (t.gesture.slide = e.clickedSlide ? g(e.clickedSlide) : e.slides.eq(e.activeIndex), t.gesture.image = t.gesture.slide.find("img, svg, canvas"), t.gesture.imageWrap = t.gesture.image.parent("." + e.params.zoomContainerClass)), t.gesture.image && 0 !== t.gesture.image.length) {
                            var r, n, i, s, o, l, p, d, c, m, u, h, f, v, b, w, C, y;
                            void 0 === t.image.touchesStart.x && a ? (r = "touchend" === a.type ? a.changedTouches[0].pageX : a.pageX, n = "touchend" === a.type ? a.changedTouches[0].pageY : a.pageY) : (r = t.image.touchesStart.x, n = t.image.touchesStart.y), t.scale && 1 !== t.scale ? (t.scale = t.currentScale = 1, t.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), t.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), t.gesture.slide = void 0) : (t.scale = t.currentScale = t.gesture.imageWrap.attr("data-swiper-zoom") || e.params.zoomMax, a ? (C = t.gesture.slide[0].offsetWidth, y = t.gesture.slide[0].offsetHeight, i = t.gesture.slide.offset().left, s = t.gesture.slide.offset().top, o = i + C / 2 - r, l = s + y / 2 - n, c = t.gesture.image[0].offsetWidth, m = t.gesture.image[0].offsetHeight, u = c * t.scale, h = m * t.scale, f = Math.min(C / 2 - u / 2, 0), v = Math.min(y / 2 - h / 2, 0), b = -f, w = -v, p = o * t.scale, d = l * t.scale, p < f && (p = f), p > b && (p = b), d < v && (d = v), d > w && (d = w)) : (p = 0, d = 0), t.gesture.imageWrap.transition(300).transform("translate3d(" + p + "px, " + d + "px,0)"), t.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + t.scale + ")"))
                        }
                    }, attachEvents: function (e) {
                        var a = e ? "off" : "on";
                        if (f.params.zoom) {
                            var t = (f.slides, !("touchstart" !== f.touchEvents.start || !f.support.passiveListener || !f.params.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            });
                            f.support.gestures ? (f.slides[a]("gesturestart", f.zoom.onGestureStart, t), f.slides[a]("gesturechange", f.zoom.onGestureChange, t), f.slides[a]("gestureend", f.zoom.onGestureEnd, t)) : "touchstart" === f.touchEvents.start && (f.slides[a](f.touchEvents.start, f.zoom.onGestureStart, t), f.slides[a](f.touchEvents.move, f.zoom.onGestureChange, t), f.slides[a](f.touchEvents.end, f.zoom.onGestureEnd, t)), f[a]("touchStart", f.zoom.onTouchStart), f.slides.each(function (e, t) {
                                g(t).find("." + f.params.zoomContainerClass).length > 0 && g(t)[a](f.touchEvents.move, f.zoom.onTouchMove)
                            }), f[a]("touchEnd", f.zoom.onTouchEnd), f[a]("transitionEnd", f.zoom.onTransitionEnd), f.params.zoomToggle && f.on("doubleTap", f.zoom.toggleZoom)
                        }
                    }, init: function () {
                        f.zoom.attachEvents()
                    }, destroy: function () {
                        f.zoom.attachEvents(!0)
                    }
                }, f._plugins = [];
                for (var D in f.plugins) {
                    var B = f.plugins[D](f, f.params[D]);
                    B && f._plugins.push(B)
                }
                return f.callPlugins = function (e) {
                    for (var a = 0; a < f._plugins.length; a++) e in f._plugins[a] && f._plugins[a][e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, f.emitterEventListeners = {}, f.emit = function (e) {
                    f.params[e] && f.params[e](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    var a;
                    if (f.emitterEventListeners[e])
                        for (a = 0; a < f.emitterEventListeners[e].length; a++) f.emitterEventListeners[e][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                    f.callPlugins && f.callPlugins(e, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
                }, f.on = function (e, a) {
                    return e = o(e), f.emitterEventListeners[e] || (f.emitterEventListeners[e] = []), f.emitterEventListeners[e].push(a), f
                }, f.off = function (e, a) {
                    var t;
                    if (e = o(e), void 0 === a) return f.emitterEventListeners[e] = [], f;
                    if (f.emitterEventListeners[e] && 0 !== f.emitterEventListeners[e].length) {
                        for (t = 0; t < f.emitterEventListeners[e].length; t++) f.emitterEventListeners[e][t] === a && f.emitterEventListeners[e].splice(t, 1);
                        return f
                    }
                }, f.once = function (e, a) {
                    e = o(e);
                    var t = function () {
                        a(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]), f.off(e, t)
                    };
                    return f.on(e, t), f
                }, f.a11y = {
                    makeFocusable: function (e) {
                            return e.attr("tabIndex", "0"), e
                        },
                        addRole: function (e, a) {
                            return e.attr("role", a), e
                        }, addLabel: function (e, a) {
                            return e.attr("aria-label", a), e
                        }, disable: function (e) {
                            return e.attr("aria-disabled", !0), e
                        }, enable: function (e) {
                            return e.attr("aria-disabled", !1), e
                        }, onEnterKey: function (e) {
                            13 === e.keyCode && (g(e.target).is(f.params.nextButton) ? (f.onClickNext(e), f.isEnd ? f.a11y.notify(f.params.lastSlideMessage) : f.a11y.notify(f.params.nextSlideMessage)) : g(e.target).is(f.params.prevButton) && (f.onClickPrev(e), f.isBeginning ? f.a11y.notify(f.params.firstSlideMessage) : f.a11y.notify(f.params.prevSlideMessage)), g(e.target).is("." + f.params.bulletClass) && g(e.target)[0].click())
                        }, liveRegion: g('<span class="' + f.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                    notify: function (e) {
                        var a = f.a11y.liveRegion;
                        0 !== a.length && (a.html(""), a.html(e))
                    }, init: function () {
                        f.params.nextButton && f.nextButton && f.nextButton.length > 0 && (f.a11y.makeFocusable(f.nextButton), f.a11y.addRole(f.nextButton, "button"), f.a11y.addLabel(f.nextButton, f.params.nextSlideMessage)), f.params.prevButton && f.prevButton && f.prevButton.length > 0 && (f.a11y.makeFocusable(f.prevButton), f.a11y.addRole(f.prevButton, "button"), f.a11y.addLabel(f.prevButton, f.params.prevSlideMessage)), g(f.container).append(f.a11y.liveRegion)
                    }, initPagination: function () {
                        f.params.pagination && f.params.paginationClickable && f.bullets && f.bullets.length && f.bullets.each(function () {
                            var e = g(this);
                            f.a11y.makeFocusable(e), f.a11y.addRole(e, "button"), f.a11y.addLabel(e, f.params.paginationBulletMessage.replace(/{{index}}/, e.index() + 1))
                        })
                    }, destroy: function () {
                        f.a11y.liveRegion && f.a11y.liveRegion.length > 0 && f.a11y.liveRegion.remove()
                    }
                }, f.init = function () {
                    f.params.loop && f.createLoop(), f.updateContainerSize(), f.updateSlidesSize(), f.updatePagination(), f.params.scrollbar && f.scrollbar && (f.scrollbar.set(), f.params.scrollbarDraggable && f.scrollbar.enableDraggable()), "slide" !== f.params.effect && f.effects[f.params.effect] && (f.params.loop || f.updateProgress(), f.effects[f.params.effect].setTranslate()), f.params.loop ? f.slideTo(f.params.initialSlide + f.loopedSlides, 0, f.params.runCallbacksOnInit) : (f.slideTo(f.params.initialSlide, 0, f.params.runCallbacksOnInit), 0 === f.params.initialSlide && (f.parallax && f.params.parallax && f.parallax.setTranslate(), f.lazy && f.params.lazyLoading && (f.lazy.load(), f.lazy.initialImageLoaded = !0))), f.attachEvents(), f.params.observer && f.support.observer && f.initObservers(), f.params.preloadImages && !f.params.lazyLoading && f.preloadImages(), f.params.zoom && f.zoom && f.zoom.init(), f.params.autoplay && f.startAutoplay(), f.params.keyboardControl && f.enableKeyboardControl && f.enableKeyboardControl(), f.params.mousewheelControl && f.enableMousewheelControl && f.enableMousewheelControl(), f.params.hashnavReplaceState && (f.params.replaceState = f.params.hashnavReplaceState), f.params.history && f.history && f.history.init(), f.params.hashnav && f.hashnav && f.hashnav.init(), f.params.a11y && f.a11y && f.a11y.init(), f.emit("onInit", f)
                }, f.cleanupStyles = function () {
                    f.container.removeClass(f.classNames.join(" ")).removeAttr("style"), f.wrapper.removeAttr("style"), f.slides && f.slides.length && f.slides.removeClass([f.params.slideVisibleClass, f.params.slideActiveClass, f.params.slideNextClass, f.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"), f.paginationContainer && f.paginationContainer.length && f.paginationContainer.removeClass(f.params.paginationHiddenClass), f.bullets && f.bullets.length && f.bullets.removeClass(f.params.bulletActiveClass), f.params.prevButton && g(f.params.prevButton).removeClass(f.params.buttonDisabledClass), f.params.nextButton && g(f.params.nextButton).removeClass(f.params.buttonDisabledClass), f.params.scrollbar && f.scrollbar && (f.scrollbar.track && f.scrollbar.track.length && f.scrollbar.track.removeAttr("style"), f.scrollbar.drag && f.scrollbar.drag.length && f.scrollbar.drag.removeAttr("style"))
                }, f.destroy = function (e, a) {
                    f.detachEvents(), f.stopAutoplay(), f.params.scrollbar && f.scrollbar && f.params.scrollbarDraggable && f.scrollbar.disableDraggable(), f.params.loop && f.destroyLoop(), a && f.cleanupStyles(), f.disconnectObservers(), f.params.zoom && f.zoom && f.zoom.destroy(), f.params.keyboardControl && f.disableKeyboardControl && f.disableKeyboardControl(), f.params.mousewheelControl && f.disableMousewheelControl && f.disableMousewheelControl(), f.params.a11y && f.a11y && f.a11y.destroy(), f.params.history && !f.params.replaceState && window.removeEventListener("popstate", f.history.setHistoryPopState), f.params.hashnav && f.hashnav && f.hashnav.destroy(), f.emit("onDestroy"), !1 !== e && (f = null)
                }, f.init(), f
            }
        }, Swiper.prototype = {
            isSafari: function () {
                var e = window.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
            isArray: function (e) {
                return "[object Array]" === Object.prototype.toString.apply(e)
            }, browser: {
                ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
                ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1,
                lteIE9: function () {
                    var e = document.createElement("div");
                    return e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e", 1 === e.getElementsByTagName("i").length
                }()
            }, device: function () {
                var e = window.navigator.userAgent,
                    a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    t = e.match(/(iPad).*OS\s([\d_]+)/),
                    r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                    n = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
                return {
                    ios: t || n || r,
                    android: a
                }
            }(),
            support: {
                touch: window.Modernizr && !0 === Modernizr.touch || function () {
                    return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
                }(),
                transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
                    var e = document.createElement("div").style;
                    return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
                }(),
                flexbox: function () {
                    for (var e = document.createElement("div").style, a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), t = 0; t < a.length; t++)
                        if (a[t] in e) return !0
                }(),
                observer: function () {
                    return "MutationObserver" in window || "WebkitMutationObserver" in window
                }(),
                passiveListener: function () {
                    var e = !1;
                    try {
                        var a = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0
                            }
                        });
                        window.addEventListener("testPassiveListener", null, a)
                    } catch (e) {}
                    return e
                }(),
                gestures: function () {
                    return "ongesturestart" in window
                }()
            },
            plugins: {}
        }
    }();



// 压缩
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){n(6),n(7),e.exports=n(8)},function(e,t,n){(function(t){!function(n){function r(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],l(e,r(a,this),r(s,this))}function o(e){var t=this;return null===this._state?void this._deferreds.push(e):void f(function(){var n=t._state?e.onFulfilled:e.onRejected;if(null===n)return void(t._state?e.resolve:e.reject)(t._value);var r;try{r=n(t._value)}catch(i){return void e.reject(i)}e.resolve(r)})}function a(e){try{if(e===this)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void l(r(t,e),r(a,this),r(s,this))}this._state=!0,this._value=e,u.call(this)}catch(n){s.call(this,n)}}function s(e){this._state=!1,this._value=e,u.call(this)}function u(){for(var e=0,t=this._deferreds.length;t>e;e++)o.call(this,this._deferreds[e]);this._deferreds=null}function c(e,t,n,r){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=r}function l(e,t,n){var r=!1;try{e(function(e){r||(r=!0,t(e))},function(e){r||(r=!0,n(e))})}catch(i){if(r)return;r=!0,n(i)}}var f="function"==typeof t&&t||function(e){setTimeout(e,1)},d=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};i.prototype["catch"]=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=this;return new i(function(r,i){o.call(n,new c(e,t,r,i))})},i.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&d(arguments[0])?arguments[0]:arguments);return new i(function(t,n){function r(o,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,function(e){r(o,e)},n)}e[o]=a,0===--i&&t(e)}catch(u){n(u)}}if(0===e.length)return t([]);for(var i=e.length,o=0;o<e.length;o++)r(o,e[o])})},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i(function(t){t(e)})},i.reject=function(e){return new i(function(t,n){n(e)})},i.race=function(e){return new i(function(t,n){for(var r=0,i=e.length;i>r;r++)e[r].then(t,n)})},i._setImmediateFn=function(e){f=e},i.prototype.always=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){throw n})})},"undefined"!=typeof e&&e.exports?e.exports=i:n.Promise||(n.Promise=i)}(this)}).call(t,n(2).setImmediate)},function(e,t,n){(function(e,r){function i(e,t){this._id=e,this._clearFn=t}var o=n(3).nextTick,a=Function.prototype.apply,s=Array.prototype.slice,u={},c=0;t.setTimeout=function(){return new i(a.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(a.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},t.setImmediate="function"==typeof e?e:function(e){var n=c++,r=arguments.length<2?!1:s.call(arguments,1);return u[n]=!0,o(function(){u[n]&&(r?e.apply(null,r):e.call(null),t.clearImmediate(n))}),n},t.clearImmediate="function"==typeof r?r:function(e){delete u[e]}}).call(t,n(2).setImmediate,n(2).clearImmediate)},function(e,t){function n(){c=!1,a.length?u=a.concat(u):l=-1,u.length&&r()}function r(){if(!c){var e=setTimeout(n);c=!0;for(var t=u.length;t;){for(a=u,u=[];++l<t;)a&&a[l].run();l=-1,t=u.length}a=null,c=!1,clearTimeout(e)}}function i(e,t){this.fun=e,this.array=t}function o(){}var a,s=e.exports={},u=[],c=!1,l=-1;s.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new i(e,t)),1!==u.length||c||setTimeout(r,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=o,s.addListener=o,s.once=o,s.off=o,s.removeListener=o,s.removeAllListeners=o,s.emit=o,s.binding=function(e){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(e){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},function(e,t){function n(){var e=~navigator.userAgent.indexOf("Android")&&~navigator.vendor.indexOf("Google")&&!~navigator.userAgent.indexOf("Chrome");return e&&navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop()<=534||/MQQBrowser/g.test(navigator.userAgent)}var r=function(){try{return new Blob,!0}catch(e){return!1}}()?window.Blob:function(e,t){var n=new(window.BlobBuilder||window.WebKitBlobBuilder||window.MSBlobBuilder||window.MozBlobBuilder);return e.forEach(function(e){n.append(e)}),n.getBlob(t?t.type:void 0)},i=function(){function e(){var e=this,n=[],i=Array(21).join("-")+(+new Date*(1e16*Math.random())).toString(36),o=XMLHttpRequest.prototype.send;this.getParts=function(){return n.toString()},this.append=function(e,t,r){n.push("--"+i+'\r\nContent-Disposition: form-data; name="'+e+'"'),t instanceof Blob?(n.push('; filename="'+(r||"blob")+'"\r\nContent-Type: '+t.type+"\r\n\r\n"),n.push(t)):n.push("\r\n\r\n"+t),n.push("\r\n")},t++,XMLHttpRequest.prototype.send=function(a){var s,u,c=this;a===e?(n.push("--"+i+"--\r\n"),u=new r(n),s=new FileReader,s.onload=function(){o.call(c,s.result)},s.onerror=function(e){throw e},s.readAsArrayBuffer(u),this.setRequestHeader("Content-Type","multipart/form-data; boundary="+i),t--,0==t&&(XMLHttpRequest.prototype.send=o)):o.call(this,a)}}var t=0;return e.prototype=Object.create(FormData.prototype),e}();e.exports={Blob:r,FormData:n()?i:FormData}},function(e,t,n){var r,i;(function(){function n(e){return!!e.exifdata}function o(e,t){t=t||e.match(/^data\:([^\;]+)\;base64,/im)[1]||"",e=e.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(e),r=n.length,i=new ArrayBuffer(r),o=new Uint8Array(i),a=0;r>a;a++)o[a]=n.charCodeAt(a);return i}function a(e,t){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){(200==this.status||0===this.status)&&t(this.response)},n.send()}function s(e,t){function n(n){var r=u(n),i=c(n);e.exifdata=r||{},e.iptcdata=i||{},t&&t.call(e)}if(e.src)if(/^data\:/i.test(e.src)){var r=o(e.src);n(r)}else if(/^blob\:/i.test(e.src)){var i=new FileReader;i.onload=function(e){n(e.target.result)},a(e.src,function(e){i.readAsArrayBuffer(e)})}else{var s=new XMLHttpRequest;s.onload=function(){200==this.status||0===this.status?n(s.response):t(new Error("Could not load image")),s=null},s.open("GET",e.src,!0),s.responseType="arraybuffer",s.send(null)}else if(window.FileReader&&(e instanceof window.Blob||e instanceof window.File)){var i=new FileReader;i.onload=function(e){p&&console.log("Got file of length "+e.target.result.byteLength),n(e.target.result)},i.readAsArrayBuffer(e)}}function u(e){var t=new DataView(e);if(p&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return p&&console.log("Not a valid JPEG"),!1;for(var n,r=2,i=e.byteLength;i>r;){if(255!=t.getUint8(r))return p&&console.log("Not a valid marker at offset "+r+", found: "+t.getUint8(r)),!1;if(n=t.getUint8(r+1),p&&console.log(n),225==n)return p&&console.log("Found 0xFFE1 marker"),g(t,r+4,t.getUint16(r+2)-2);r+=2+t.getUint16(r+2)}}function c(e){var t=new DataView(e);if(p&&console.log("Got file of length "+e.byteLength),255!=t.getUint8(0)||216!=t.getUint8(1))return p&&console.log("Not a valid JPEG"),!1;for(var n=2,r=e.byteLength,i=function(e,t){return 56===e.getUint8(t)&&66===e.getUint8(t+1)&&73===e.getUint8(t+2)&&77===e.getUint8(t+3)&&4===e.getUint8(t+4)&&4===e.getUint8(t+5)};r>n;){if(i(t,n)){var o=t.getUint8(n+7);o%2!==0&&(o+=1),0===o&&(o=4);var a=n+8+o,s=t.getUint16(n+6+o);return l(e,a,s)}n++}}function l(e,t,n){for(var r,i,o,a,s,u=new DataView(e),c={},l=t;t+n>l;)28===u.getUint8(l)&&2===u.getUint8(l+1)&&(a=u.getUint8(l+2),a in S&&(o=u.getInt16(l+3),s=o+5,i=S[a],r=h(u,l+5,o),c.hasOwnProperty(i)?c[i]instanceof Array?c[i].push(r):c[i]=[c[i],r]:c[i]=r)),l++;return c}function f(e,t,n,r,i){var o,a,s,u=e.getUint16(n,!i),c={};for(s=0;u>s;s++)o=n+12*s+2,a=r[e.getUint16(o,!i)],!a&&p&&console.log("Unknown tag: "+e.getUint16(o,!i)),c[a]=d(e,o,t,n,i);return c}function d(e,t,n,r,i){var o,a,s,u,c,l,f=e.getUint16(t+2,!i),d=e.getUint32(t+4,!i),g=e.getUint32(t+8,!i)+n;switch(f){case 1:case 7:if(1==d)return e.getUint8(t+8,!i);for(o=d>4?g:t+8,a=[],u=0;d>u;u++)a[u]=e.getUint8(o+u);return a;case 2:return o=d>4?g:t+8,h(e,o,d-1);case 3:if(1==d)return e.getUint16(t+8,!i);for(o=d>2?g:t+8,a=[],u=0;d>u;u++)a[u]=e.getUint16(o+2*u,!i);return a;case 4:if(1==d)return e.getUint32(t+8,!i);for(a=[],u=0;d>u;u++)a[u]=e.getUint32(g+4*u,!i);return a;case 5:if(1==d)return c=e.getUint32(g,!i),l=e.getUint32(g+4,!i),s=new Number(c/l),s.numerator=c,s.denominator=l,s;for(a=[],u=0;d>u;u++)c=e.getUint32(g+8*u,!i),l=e.getUint32(g+4+8*u,!i),a[u]=new Number(c/l),a[u].numerator=c,a[u].denominator=l;return a;case 9:if(1==d)return e.getInt32(t+8,!i);for(a=[],u=0;d>u;u++)a[u]=e.getInt32(g+4*u,!i);return a;case 10:if(1==d)return e.getInt32(g,!i)/e.getInt32(g+4,!i);for(a=[],u=0;d>u;u++)a[u]=e.getInt32(g+8*u,!i)/e.getInt32(g+4+8*u,!i);return a}}function h(e,t,n){var r,i="";for(r=t;t+n>r;r++)i+=String.fromCharCode(e.getUint8(r));return i}function g(e,t){if("Exif"!=h(e,t,4))return p&&console.log("Not valid EXIF data! "+h(e,t,4)),!1;var n,r,i,o,a,s=t+6;if(18761==e.getUint16(s))n=!1;else{if(19789!=e.getUint16(s))return p&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;n=!0}if(42!=e.getUint16(s+2,!n))return p&&console.log("Not valid TIFF data! (no 0x002A)"),!1;var u=e.getUint32(s+4,!n);if(8>u)return p&&console.log("Not valid TIFF data! (First offset less than 8)",e.getUint32(s+4,!n)),!1;if(r=f(e,s,s+u,v,n),r.ExifIFDPointer){o=f(e,s,s+r.ExifIFDPointer,w,n);for(i in o){switch(i){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":o[i]=b[i][o[i]];break;case"ExifVersion":case"FlashpixVersion":o[i]=String.fromCharCode(o[i][0],o[i][1],o[i][2],o[i][3]);break;case"ComponentsConfiguration":o[i]=b.Components[o[i][0]]+b.Components[o[i][1]]+b.Components[o[i][2]]+b.Components[o[i][3]]}r[i]=o[i]}}if(r.GPSInfoIFDPointer){a=f(e,s,s+r.GPSInfoIFDPointer,y,n);for(i in a){switch(i){case"GPSVersionID":a[i]=a[i][0]+"."+a[i][1]+"."+a[i][2]+"."+a[i][3]}r[i]=a[i]}}return r}var p=!1,m=function(e){return e instanceof m?e:this instanceof m?void(this.EXIFwrapped=e):new m(e)};"undefined"!=typeof e&&e.exports&&(t=e.exports=m),t.EXIF=m;var w=m.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},v=m.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y=m.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},b=m.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},S={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};m.getData=function(e,t){return(e instanceof Image||e instanceof HTMLImageElement)&&!e.complete?!1:(n(e)?t&&t.call(e):s(e,t),!0)},m.getTag=function(e,t){return n(e)?e.exifdata[t]:void 0},m.getAllTags=function(e){if(!n(e))return{};var t,r=e.exifdata,i={};for(t in r)r.hasOwnProperty(t)&&(i[t]=r[t]);return i},m.pretty=function(e){if(!n(e))return"";var t,r=e.exifdata,i="";for(t in r)r.hasOwnProperty(t)&&(i+="object"==typeof r[t]?r[t]instanceof Number?t+" : "+r[t]+" ["+r[t].numerator+"/"+r[t].denominator+"]\r\n":t+" : ["+r[t].length+" values]\r\n":t+" : "+r[t]+"\r\n");return i},m.readFromBinaryFile=function(e){return u(e)},r=[],i=function(){return m}.apply(t,r),!(void 0!==i&&(e.exports=i))}).call(this)},function(e,t,n){var r,i;!function(){function n(e){var t=e.naturalWidth,n=e.naturalHeight;if(t*n>1048576){var r=document.createElement("canvas");r.width=r.height=1;var i=r.getContext("2d");return i.drawImage(e,-t+1,0),0===i.getImageData(0,0,1,1).data[3]}return!1}function o(e,t,n){var r=document.createElement("canvas");r.width=1,r.height=n;var i=r.getContext("2d");i.drawImage(e,0,0);for(var o=i.getImageData(0,0,1,n).data,a=0,s=n,u=n;u>a;){var c=o[4*(u-1)+3];0===c?s=u:a=u,u=s+a>>1}var l=u/n;return 0===l?1:l}function a(e,t,n){var r=document.createElement("canvas");return s(e,r,t,n),r.toDataURL("image/jpeg",t.quality||.8)}function s(e,t,r,i){var a=e.naturalWidth,s=e.naturalHeight,c=r.width,l=r.height,f=t.getContext("2d");f.save(),u(t,f,c,l,r.orientation);var d=n(e);d&&(a/=2,s/=2);var h=1024,g=document.createElement("canvas");g.width=g.height=h;for(var p=g.getContext("2d"),m=i?o(e,a,s):1,w=Math.ceil(h*c/a),v=Math.ceil(h*l/s/m),y=0,b=0;s>y;){for(var S=0,I=0;a>S;)p.clearRect(0,0,h,h),p.drawImage(e,-S,-y),f.drawImage(g,0,0,h,h,I,b,w,v),S+=h,I+=w;y+=h,b+=v}f.restore(),g=p=null}function u(e,t,n,r,i){switch(i){case 5:case 6:case 7:case 8:e.width=r,e.height=n;break;default:e.width=n,e.height=r}switch(i){case 2:t.translate(n,0),t.scale(-1,1);break;case 3:t.translate(n,r),t.rotate(Math.PI);break;case 4:t.translate(0,r),t.scale(1,-1);break;case 5:t.rotate(.5*Math.PI),t.scale(1,-1);break;case 6:t.rotate(.5*Math.PI),t.translate(0,-r);break;case 7:t.rotate(.5*Math.PI),t.translate(n,-r),t.scale(-1,1);break;case 8:t.rotate(-.5*Math.PI),t.translate(-n,0)}}function c(e){if(window.Blob&&e instanceof Blob){var t=new Image,n=window.URL&&window.URL.createObjectURL?window.URL:window.webkitURL&&window.webkitURL.createObjectURL?window.webkitURL:null;if(!n)throw Error("No createObjectURL function found to create blob url");t.src=n.createObjectURL(e),this.blob=e,e=t}if(!e.naturalWidth&&!e.naturalHeight){var r=this;e.onload=function(){var e=r.imageLoadListeners;if(e){r.imageLoadListeners=null;for(var t=0,n=e.length;n>t;t++)e[t]()}},this.imageLoadListeners=[]}this.srcImage=e}c.prototype.render=function(e,t,n){if(this.imageLoadListeners){var r=this;return void this.imageLoadListeners.push(function(){r.render(e,t,n)})}t=t||{};var i=this.srcImage,o=i.src,u=o.length,c=i.naturalWidth,l=i.naturalHeight,f=t.width,d=t.height,h=t.maxWidth,g=t.maxHeight,p=this.blob&&"image/jpeg"===this.blob.type||0===o.indexOf("data:image/jpeg")||o.indexOf(".jpg")===u-4||o.indexOf(".jpeg")===u-5;f&&!d?d=l*f/c<<0:d&&!f?f=c*d/l<<0:(f=c,d=l),h&&f>h&&(f=h,d=l*f/c<<0),g&&d>g&&(d=g,f=c*d/l<<0);var m={width:f,height:d};for(var w in t)m[w]=t[w];var v=e.tagName.toLowerCase();"img"===v?e.src=a(this.srcImage,m,p):"canvas"===v&&s(this.srcImage,e,m,p),"function"==typeof this.onrender&&this.onrender(e),n&&n()},r=[],i=function(){return c}.apply(t,r),!(void 0!==i&&(e.exports=i))}()},function(e,t){function n(e){function t(e){for(var t=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],n=0;64>n;n++){var r=F((t[n]*e+50)/100);1>r?r=1:r>255&&(r=255),D[N[n]]=r}for(var i=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],o=0;64>o;o++){var a=F((i[o]*e+50)/100);1>a?a=1:a>255&&(a=255),x[N[o]]=a}for(var s=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],u=0,c=0;8>c;c++)for(var l=0;8>l;l++)U[u]=1/(D[N[u]]*s[c]*s[l]*8),C[u]=1/(x[N[u]]*s[c]*s[l]*8),u++}function n(e,t){for(var n=0,r=0,i=new Array,o=1;16>=o;o++){for(var a=1;a<=e[o];a++)i[t[r]]=[],i[t[r]][0]=n,i[t[r]][1]=o,r++,n++;n*=2}return i}function r(){y=n(W,H),b=n(V,X),S=n(z,q),I=n(Q,Y)}function i(){for(var e=1,t=2,n=1;15>=n;n++){for(var r=e;t>r;r++)A[32767+r]=n,T[32767+r]=[],T[32767+r][1]=n,T[32767+r][0]=r;for(var i=-(t-1);-e>=i;i++)A[32767+i]=n,T[32767+i]=[],T[32767+i][1]=n,T[32767+i][0]=t-1+i;e<<=1,t<<=1}}function o(){for(var e=0;256>e;e++)k[e]=19595*e,k[e+256>>0]=38470*e,k[e+512>>0]=7471*e+32768,k[e+768>>0]=-11059*e,k[e+1024>>0]=-21709*e,k[e+1280>>0]=32768*e+8421375,k[e+1536>>0]=-27439*e,k[e+1792>>0]=-5329*e}function a(e){for(var t=e[0],n=e[1]-1;n>=0;)t&1<<n&&(G|=1<<O),n--,O--,0>O&&(255==G?(s(255),s(0)):s(G),O=7,G=0)}function s(e){M.push(j[e])}function u(e){s(e>>8&255),s(255&e)}function c(e,t){var n,r,i,o,a,s,u,c,l,f=0;const d=8,h=64;for(l=0;d>l;++l){n=e[f],r=e[f+1],i=e[f+2],o=e[f+3],a=e[f+4],s=e[f+5],u=e[f+6],c=e[f+7];var g=n+c,p=n-c,m=r+u,w=r-u,v=i+s,y=i-s,b=o+a,S=o-a,I=g+b,P=g-b,F=m+v,D=m-v;e[f]=I+F,e[f+4]=I-F;var x=.707106781*(D+P);e[f+2]=P+x,e[f+6]=P-x,I=S+y,F=y+w,D=w+p;var U=.382683433*(I-D),C=.5411961*I+U,T=1.306562965*D+U,A=.707106781*F,R=p+A,M=p-A;e[f+5]=M+C,e[f+3]=M-C,e[f+1]=R+T,e[f+7]=R-T,f+=8}for(f=0,l=0;d>l;++l){n=e[f],r=e[f+8],i=e[f+16],o=e[f+24],a=e[f+32],s=e[f+40],u=e[f+48],c=e[f+56];var G=n+c,O=n-c,_=r+u,B=r-u,E=i+s,j=i-s,k=o+a,N=o-a,W=G+k,H=G-k,z=_+E,q=_-E;e[f]=W+z,e[f+32]=W-z;var V=.707106781*(q+H);e[f+16]=H+V,e[f+48]=H-V,W=N+j,z=j+B,q=B+O;var X=.382683433*(W-q),Q=.5411961*W+X,Y=1.306562965*q+X,K=.707106781*z,J=O+K,Z=O-K;e[f+40]=Z+Q,e[f+24]=Z-Q,e[f+8]=J+Y,e[f+56]=J-Y,f++}var $;for(l=0;h>l;++l)$=e[l]*t[l],L[l]=$>0?$+.5|0:$-.5|0;return L}function l(){u(65504),u(16),s(74),s(70),s(73),s(70),s(0),s(1),s(1),s(0),u(1),u(1),s(0),s(0)}function f(e,t){u(65472),u(17),s(8),u(t),u(e),s(3),s(1),s(17),s(0),s(2),s(17),s(1),s(3),s(17),s(1)}function d(){u(65499),u(132),s(0);for(var e=0;64>e;e++)s(D[e]);s(1);for(var t=0;64>t;t++)s(x[t])}function h(){u(65476),u(418),s(0);for(var e=0;16>e;e++)s(W[e+1]);for(var t=0;11>=t;t++)s(H[t]);s(16);for(var n=0;16>n;n++)s(z[n+1]);for(var r=0;161>=r;r++)s(q[r]);s(1);for(var i=0;16>i;i++)s(V[i+1]);for(var o=0;11>=o;o++)s(X[o]);s(17);for(var a=0;16>a;a++)s(Q[a+1]);for(var c=0;161>=c;c++)s(Y[c])}function g(){u(65498),u(12),s(3),s(1),s(0),s(2),s(17),s(3),s(17),s(0),s(63),s(0)}function p(e,t,n,r,i){var o,s=i[0],u=i[240];const l=16,f=63,d=64;for(var h=c(e,t),g=0;d>g;++g)R[N[g]]=h[g];var p=R[0]-n;n=R[0],0==p?a(r[0]):(o=32767+p,a(r[A[o]]),a(T[o]));for(var m=63;m>0&&0==R[m];m--);if(0==m)return a(s),n;for(var w,v=1;m>=v;){for(var y=v;0==R[v]&&m>=v;++v);var b=v-y;if(b>=l){w=b>>4;for(var S=1;w>=S;++S)a(u);b=15&b}o=32767+R[v],a(i[(b<<4)+A[o]]),a(T[o]),v++}return m!=f&&a(s),n}function m(){for(var e=String.fromCharCode,t=0;256>t;t++)j[t]=e(t)}function w(e){if(0>=e&&(e=1),e>100&&(e=100),P!=e){var n=0;n=50>e?Math.floor(5e3/e):Math.floor(200-2*e),t(n),P=e}}function v(){var t=(new Date).getTime();e||(e=50),m(),r(),i(),o(),w(e);(new Date).getTime()-t}var y,b,S,I,P,F=(Math.round,Math.floor),D=new Array(64),x=new Array(64),U=new Array(64),C=new Array(64),T=new Array(65535),A=new Array(65535),L=new Array(64),R=new Array(64),M=[],G=0,O=7,_=new Array(64),B=new Array(64),E=new Array(64),j=new Array(256),k=new Array(2048),N=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],W=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],H=[0,1,2,3,4,5,6,7,8,9,10,11],z=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],q=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],V=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],X=[0,1,2,3,4,5,6,7,8,9,10,11],Q=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],Y=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(e,t,n){var r=(new Date).getTime();t&&w(t),M=new Array,G=0,O=7,u(65496),l(),d(),f(e.width,e.height),h(),g();var i=0,o=0,s=0;G=0,O=7,this.encode.displayName="_encode_";for(var c,m,v,P,F,D,x,T,A,L=e.data,R=e.width,j=e.height,N=4*R,W=0;j>W;){for(c=0;N>c;){for(F=N*W+c,D=F,x=-1,T=0,A=0;64>A;A++)T=A>>3,x=4*(7&A),D=F+T*N+x,W+T>=j&&(D-=N*(W+1+T-j)),c+x>=N&&(D-=c+x-N+4),m=L[D++],v=L[D++],P=L[D++],_[A]=(k[m]+k[v+256>>0]+k[P+512>>0]>>16)-128,B[A]=(k[m+768>>0]+k[v+1024>>0]+k[P+1280>>0]>>16)-128,E[A]=(k[m+1280>>0]+k[v+1536>>0]+k[P+1792>>0]>>16)-128;i=p(_,U,i,y,S),o=p(B,C,o,b,I),s=p(E,C,s,b,I),c+=32}W+=8}if(O>=0){var H=[];H[1]=O+1,H[0]=(1<<O+1)-1,a(H)}if(u(65497),n){for(var z=M.length,q=new Uint8Array(z),V=0;z>V;V++)q[V]=M[V].charCodeAt();M=[];(new Date).getTime()-r;return q}var X="data:image/jpeg;base64,"+btoa(M.join(""));M=[];(new Date).getTime()-r;return X},v()}e.exports=n},function(e,t,n){function r(e,t){var n=this;if(!e)throw new Error("没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG/issues/7");t=t||{},n.defaults={width:null,height:null,fieldName:"file",quality:.7},n.file=e;for(var r in t)t.hasOwnProperty(r)&&(n.defaults[r]=t[r]);return this.init()}function i(e){var t=null;return t=e?[].filter.call(document.scripts,function(t){return-1!==t.src.indexOf(e)})[0]:document.scripts[document.scripts.length-1],t?t.src.substr(0,t.src.lastIndexOf("/")):null}function o(e){var t;t=e.split(",")[0].indexOf("base64")>=0?atob(e.split(",")[1]):unescape(e.split(",")[1]);for(var n=e.split(",")[0].split(":")[1].split(";")[0],r=new Uint8Array(t.length),i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return new s.Blob([r.buffer],{type:n})}n.p=i("lrz")+"/",window.URL=window.URL||window.webkitURL;var a=n(1),s=n(4),u=n(5),c=function(e){var t=/OS (\d)_.* like Mac OS X/g.exec(e),n=/Android (\d.*?);/g.exec(e)||/Android\/(\d.*?) /g.exec(e);return{oldIOS:t?+t.pop()<8:!1,oldAndroid:n?+n.pop().substr(0,3)<4.5:!1,iOS:/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(e),android:/Android/g.test(e),mQQBrowser:/MQQBrowser/g.test(e)}}(navigator.userAgent);r.prototype.init=function(){var e=this,t=e.file,n="string"==typeof t,r=/^data:/.test(t),i=new Image,u=document.createElement("canvas"),c=n?t:URL.createObjectURL(t);if(e.img=i,e.blob=c,e.canvas=u,n?e.fileName=r?"base64.jpg":t.split("/").pop():e.fileName=t.name,!document.createElement("canvas").getContext)throw new Error("浏览器不支持canvas");return new a(function(n,a){i.onerror=function(){var e=new Error("加载图片文件失败");throw a(e),e},i.onload=function(){e._getBase64().then(function(e){if(e.length<10){var t=new Error("生成base64失败");throw a(t),t}return e}).then(function(r){var i=null;"object"==typeof e.file&&r.length>e.file.size?(i=new FormData,t=e.file):(i=new s.FormData,t=o(r)),i.append(e.defaults.fieldName,t,e.fileName.replace(/\..+/g,".jpg")),n({formData:i,fileLen:+t.size,base64:r,base64Len:r.length,origin:e.file,file:t});for(var a in e)e.hasOwnProperty(a)&&(e[a]=null);URL.revokeObjectURL(e.blob)})},!r&&(i.crossOrigin="*"),i.src=c})},r.prototype._getBase64=function(){var e=this,t=e.img,n=e.file,r=e.canvas;return new a(function(i){try{u.getData("object"==typeof n?n:t,function(){e.orientation=u.getTag(this,"Orientation"),e.resize=e._getResize(),e.ctx=r.getContext("2d"),r.width=e.resize.width,r.height=e.resize.height,e.ctx.fillStyle="#fff",e.ctx.fillRect(0,0,r.width,r.height),c.oldIOS?e._createBase64ForOldIOS().then(i):e._createBase64().then(i)})}catch(o){throw new Error(o)}})},r.prototype._createBase64ForOldIOS=function(){var e=this,t=e.img,r=e.canvas,i=e.defaults,o=e.orientation;return new a(function(e){!function(){var a=[n(6)];(function(n){var a=new n(t);"5678".indexOf(o)>-1?a.render(r,{width:r.height,height:r.width,orientation:o}):a.render(r,{width:r.width,height:r.height,orientation:o}),e(r.toDataURL("image/jpeg",i.quality))}).apply(null,a)}()})},r.prototype._createBase64=function(){var e=this,t=e.resize,r=e.img,i=e.canvas,o=e.ctx,s=e.defaults,u=e.orientation;switch(u){case 3:o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 6:o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 8:o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;case 2:o.translate(t.width,0),o.scale(-1,1),o.drawImage(r,0,0,t.width,t.height);break;case 4:o.translate(t.width,0),o.scale(-1,1),o.rotate(180*Math.PI/180),o.drawImage(r,-t.width,-t.height,t.width,t.height);break;case 5:o.translate(t.width,0),o.scale(-1,1),o.rotate(90*Math.PI/180),o.drawImage(r,0,-t.width,t.height,t.width);break;case 7:o.translate(t.width,0),o.scale(-1,1),o.rotate(270*Math.PI/180),o.drawImage(r,-t.height,0,t.height,t.width);break;default:o.drawImage(r,0,0,t.width,t.height)}return new a(function(e){c.oldAndroid||c.mQQBrowser||!navigator.userAgent?!function(){var t=[n(7)];(function(t){var n=new t,r=o.getImageData(0,0,i.width,i.height);e(n.encode(r,100*s.quality))}).apply(null,t)}():e(i.toDataURL("image/jpeg",s.quality))})},r.prototype._getResize=function(){var e=this,t=e.img,n=e.defaults,r=n.width,i=n.height,o=e.orientation,a={width:t.width,height:t.height};if("5678".indexOf(o)>-1&&(a.width=t.height,a.height=t.width),a.width<r||a.height<i)return a;var s=a.width/a.height;for(r&&i?s>=r/i?a.width>r&&(a.width=r,a.height=Math.ceil(r/s)):a.height>i&&(a.height=i,a.width=Math.ceil(i*s)):r?r<a.width&&(a.width=r,a.height=Math.ceil(r/s)):i&&i<a.height&&(a.width=Math.ceil(i*s),a.height=i);a.width>=3264||a.height>=2448;)a.width*=.8,a.height*=.8;return a},window.lrz=function(e,t){return new r(e,t)},window.lrz.version="4.9.40",
e.exports=window.lrz}])});


/* 排序 1.7.0 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&void 0!==module.exports?module.exports=t():window.Sortable=t()}(function(){"use strict";if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var t,e,n,o,i,r,a,l,s,c,d,h,u,f,p,g,v,m,_,b,D,y={},w=/\s+/g,T=/left|right|inline/,S="Sortable"+(new Date).getTime(),C=window,E=C.document,x=C.parseInt,k=C.setTimeout,N=C.jQuery||C.Zepto,B=C.Polymer,P=!1,Y="draggable"in E.createElement("div"),X=!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)&&((D=E.createElement("x")).style.cssText="pointer-events:auto","auto"===D.style.pointerEvents),O=!1,I=Math.abs,M=Math.min,A=[],R=[],L=function(){return!1},F=ot(function(t,e,n){if(n&&e.scroll){var o,i,r,a,d,h,u=n[S],f=e.scrollSensitivity,p=e.scrollSpeed,g=t.clientX,v=t.clientY,m=window.innerWidth,b=window.innerHeight;if(s!==n&&(l=e.scroll,s=n,c=e.scrollFn,!0===l)){l=n;do{if(l.offsetWidth<l.scrollWidth||l.offsetHeight<l.scrollHeight)break}while(l=l.parentNode)}l&&(o=l,i=l.getBoundingClientRect(),r=(I(i.right-g)<=f)-(I(i.left-g)<=f),a=(I(i.bottom-v)<=f)-(I(i.top-v)<=f)),r||a||(a=(b-v<=f)-(v<=f),((r=(m-g<=f)-(g<=f))||a)&&(o=C)),y.vx===r&&y.vy===a&&y.el===o||(y.el=o,y.vx=r,y.vy=a,clearInterval(y.pid),o&&(y.pid=setInterval(function(){h=a?a*p:0,d=r?r*p:0,"function"==typeof c&&"continue"!==c.call(u,d,h,t,_,o)||(o===C?C.scrollTo(C.pageXOffset+d,C.pageYOffset+h):(o.scrollTop+=h,o.scrollLeft+=d))},24)))}},30),H=function(t){function e(t,e){return null!=t&&!0!==t||null!=(t=n.name)?"function"==typeof t?t:function(n,o){var i=o.options.group.name;return e?t:t&&(t.join?t.indexOf(i)>-1:i==t)}:L}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n};try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){P={capture:!1,passive:!1}}}))}catch(t){}function W(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(t);this.el=t,this.options=e=it({},e),t[S]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(t.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==W.supportPointer};for(var o in n)!(o in e)&&(e[o]=n[o]);H(e);for(var i in this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&Y,V(t,"mousedown",this._onTapStart),V(t,"touchstart",this._onTapStart),e.supportPointer&&V(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(V(t,"dragover",this),V(t,"dragenter",this)),R.push(this._onDragOver),e.store&&this.sort(e.store.get(this))}function j(e,n){"clone"!==e.lastPullMode&&(n=!0),o&&o.state!==n&&(G(o,"display",n?"none":""),n||o.state&&(e.options.group.revertClone?(i.insertBefore(o,r),e._animate(t,o)):i.insertBefore(o,t)),o.state=n)}function U(t,e,n){if(t){n=n||E;do{if(">*"===e&&t.parentNode===n||nt(t,e))return t}while(void 0,t=(i=(o=t).host)&&i.nodeType?i:o.parentNode)}var o,i;return null}function V(t,e,n){t.addEventListener(e,n,P)}function q(t,e,n){t.removeEventListener(e,n,P)}function z(t,e,n){if(t)if(t.classList)t.classList[n?"add":"remove"](e);else{var o=(" "+t.className+" ").replace(w," ").replace(" "+e+" "," ");t.className=(o+(n?" "+e:"")).replace(w," ")}}function G(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return E.defaultView&&E.defaultView.getComputedStyle?n=E.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in o||(e="-webkit-"+e),o[e]=n+("string"==typeof n?"":"px")}}function Q(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,r=o.length;if(n)for(;i<r;i++)n(o[i],i);return o}return[]}function Z(t,e,n,i,r,a,l,s,c){t=t||e[S];var d=E.createEvent("Event"),h=t.options,u="on"+n.charAt(0).toUpperCase()+n.substr(1);d.initEvent(n,!0,!0),d.to=r||e,d.from=a||e,d.item=i||e,d.clone=o,d.oldIndex=l,d.newIndex=s,d.originalEvent=c,e.dispatchEvent(d),h[u]&&h[u].call(t,d)}function J(t,e,n,o,i,r,a,l){var s,c,d=t[S],h=d.options.onMove;return(s=E.createEvent("Event")).initEvent("move",!0,!0),s.to=e,s.from=t,s.dragged=n,s.draggedRect=o,s.related=i||e,s.relatedRect=r||e.getBoundingClientRect(),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function K(t){t.draggable=!1}function $(){O=!1}function tt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;n--;)o+=e.charCodeAt(n);return o.toString(36)}function et(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||">*"!==e&&!nt(t,e)||n++;return n}function nt(t,e){if(t){if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e)}return!1}function ot(t,e){var n,o;return function(){void 0===n&&(n=arguments,o=this,k(function(){1===n.length?t.call(o,n[0]):t.apply(o,n),n=void 0},e))}}function it(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function rt(t){return B&&B.dom?B.dom(t).cloneNode(!0):N?N(t).clone(!0)[0]:t.cloneNode(!0)}function at(t){return k(t,0)}function lt(t){return clearTimeout(t)}return W.prototype={constructor:W,_onTapStart:function(e){var n,o=this,i=this.el,r=this.options,l=r.preventOnFilter,s=e.type,c=e.touches&&e.touches[0],d=(c||e).target,h=e.target.shadowRoot&&e.path&&e.path[0]||d,u=r.filter;if(function(t){A.length=0;var e=t.getElementsByTagName("input"),n=e.length;for(;n--;){var o=e[n];o.checked&&A.push(o)}}(i),!t&&!(/mousedown|pointerdown/.test(s)&&0!==e.button||r.disabled)&&!h.isContentEditable&&(d=U(d,r.draggable,i))&&a!==d){if(n=et(d,r.draggable),"function"==typeof u){if(u.call(this,e,d,this))return Z(o,h,"filter",d,i,i,n),void(l&&e.preventDefault())}else if(u&&(u=u.split(",").some(function(t){if(t=U(h,t.trim(),i))return Z(o,t,"filter",d,i,i,n),!0})))return void(l&&e.preventDefault());r.handle&&!U(h,r.handle,i)||this._prepareDragStart(e,c,d,n)}},_prepareDragStart:function(n,o,l,s){var c,d=this,h=d.el,u=d.options,p=h.ownerDocument;l&&!t&&l.parentNode===h&&(m=n,i=h,e=(t=l).parentNode,r=t.nextSibling,a=l,g=u.group,f=s,this._lastX=(o||n).clientX,this._lastY=(o||n).clientY,t.style["will-change"]="all",c=function(){d._disableDelayedDrag(),t.draggable=d.nativeDraggable,z(t,u.chosenClass,!0),d._triggerDragStart(n,o),Z(d,i,"choose",t,i,i,f)},u.ignore.split(",").forEach(function(e){Q(t,e.trim(),K)}),V(p,"mouseup",d._onDrop),V(p,"touchend",d._onDrop),V(p,"touchcancel",d._onDrop),V(p,"selectstart",d),u.supportPointer&&V(p,"pointercancel",d._onDrop),u.delay?(V(p,"mouseup",d._disableDelayedDrag),V(p,"touchend",d._disableDelayedDrag),V(p,"touchcancel",d._disableDelayedDrag),V(p,"mousemove",d._disableDelayedDrag),V(p,"touchmove",d._disableDelayedDrag),u.supportPointer&&V(p,"pointermove",d._disableDelayedDrag),d._dragStartTimer=k(c,u.delay)):c())},_disableDelayedDrag:function(){var t=this.el.ownerDocument;clearTimeout(this._dragStartTimer),q(t,"mouseup",this._disableDelayedDrag),q(t,"touchend",this._disableDelayedDrag),q(t,"touchcancel",this._disableDelayedDrag),q(t,"mousemove",this._disableDelayedDrag),q(t,"touchmove",this._disableDelayedDrag),q(t,"pointermove",this._disableDelayedDrag)},_triggerDragStart:function(e,n){(n=n||("touch"==e.pointerType?e:null))?(m={target:t,clientX:n.clientX,clientY:n.clientY},this._onDragStart(m,"touch")):this.nativeDraggable?(V(t,"dragend",this),V(i,"dragstart",this._onDragStart)):this._onDragStart(m,!0);try{E.selection?at(function(){E.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(){if(i&&t){var e=this.options;z(t,e.ghostClass,!0),z(t,e.dragClass,!1),W.active=this,Z(this,i,"start",t,i,i,f)}else this._nulling()},_emulateDragOver:function(){if(_){if(this._lastX===_.clientX&&this._lastY===_.clientY)return;this._lastX=_.clientX,this._lastY=_.clientY,X||G(n,"display","none");var t=E.elementFromPoint(_.clientX,_.clientY),e=t,o=R.length;if(t&&t.shadowRoot&&(e=t=t.shadowRoot.elementFromPoint(_.clientX,_.clientY)),e)do{if(e[S]){for(;o--;)R[o]({clientX:_.clientX,clientY:_.clientY,target:t,rootEl:e});break}t=e}while(e=e.parentNode);X||G(n,"display","")}},_onTouchMove:function(t){if(m){var e=this.options,o=e.fallbackTolerance,i=e.fallbackOffset,r=t.touches?t.touches[0]:t,a=r.clientX-m.clientX+i.x,l=r.clientY-m.clientY+i.y,s=t.touches?"translate3d("+a+"px,"+l+"px,0)":"translate("+a+"px,"+l+"px)";if(!W.active){if(o&&M(I(r.clientX-this._lastX),I(r.clientY-this._lastY))<o)return;this._dragStarted()}this._appendGhost(),b=!0,_=r,G(n,"webkitTransform",s),G(n,"mozTransform",s),G(n,"msTransform",s),G(n,"transform",s),t.preventDefault()}},_appendGhost:function(){if(!n){var e,o=t.getBoundingClientRect(),r=G(t),a=this.options;z(n=t.cloneNode(!0),a.ghostClass,!1),z(n,a.fallbackClass,!0),z(n,a.dragClass,!0),G(n,"top",o.top-x(r.marginTop,10)),G(n,"left",o.left-x(r.marginLeft,10)),G(n,"width",o.width),G(n,"height",o.height),G(n,"opacity","0.8"),G(n,"position","fixed"),G(n,"zIndex","100000"),G(n,"pointerEvents","none"),a.fallbackOnBody&&E.body.appendChild(n)||i.appendChild(n),e=n.getBoundingClientRect(),G(n,"width",2*o.width-e.width),G(n,"height",2*o.height-e.height)}},_onDragStart:function(e,n){var r=this,a=e.dataTransfer,l=r.options;r._offUpEvents(),g.checkPull(r,r,t,e)&&((o=rt(t)).draggable=!1,o.style["will-change"]="",G(o,"display","none"),z(o,r.options.chosenClass,!1),r._cloneId=at(function(){i.insertBefore(o,t),Z(r,i,"clone",t)})),z(t,l.dragClass,!0),n?("touch"===n?(V(E,"touchmove",r._onTouchMove),V(E,"touchend",r._onDrop),V(E,"touchcancel",r._onDrop),l.supportPointer&&(V(E,"pointermove",r._onTouchMove),V(E,"pointerup",r._onDrop))):(V(E,"mousemove",r._onTouchMove),V(E,"mouseup",r._onDrop)),r._loopId=setInterval(r._emulateDragOver,50)):(a&&(a.effectAllowed="move",l.setData&&l.setData.call(r,a,t)),V(E,"drop",r),r._dragStartId=at(r._dragStarted))},_onDragOver:function(a){var l,s,c,f,p,m,_=this.el,D=this.options,y=D.group,w=W.active,C=g===y,E=!1,x=D.sort;if((void 0!==a.preventDefault&&(a.preventDefault(),!D.dragoverBubble&&a.stopPropagation()),!t.animated)&&(b=!0,w&&!D.disabled&&(C?x||(f=!i.contains(t)):v===this||(w.lastPullMode=g.checkPull(this,w,t,a))&&y.checkPut(this,w,t,a))&&(void 0===a.rootEl||a.rootEl===this.el))){if(F(a,D,this.el),O)return;if(l=U(a.target,D.draggable,_),s=t.getBoundingClientRect(),v!==this&&(v=this,E=!0),f)return j(w,!0),e=i,void(o||r?i.insertBefore(t,o||r):x||i.appendChild(t));if(0===_.children.length||_.children[0]===n||_===a.target&&(p=a,m=_.lastElementChild.getBoundingClientRect(),p.clientY-(m.top+m.height)>5||p.clientX-(m.left+m.width)>5)){if(0!==_.children.length&&_.children[0]!==n&&_===a.target&&(l=_.lastElementChild),l){if(l.animated)return;c=l.getBoundingClientRect()}j(w,C),!1!==J(i,_,t,s,l,c,a)&&(t.contains(_)||(_.appendChild(t),e=_),this._animate(s,t),l&&this._animate(c,l))}else if(l&&!l.animated&&l!==t&&void 0!==l.parentNode[S]){d!==l&&(d=l,h=G(l),u=G(l.parentNode));var N=(c=l.getBoundingClientRect()).right-c.left,B=c.bottom-c.top,P=T.test(h.cssFloat+h.display)||"flex"==u.display&&0===u["flex-direction"].indexOf("row"),Y=l.offsetWidth>t.offsetWidth,X=l.offsetHeight>t.offsetHeight,I=(P?(a.clientX-c.left)/N:(a.clientY-c.top)/B)>.5,M=l.nextElementSibling,A=!1;if(P){var R=t.offsetTop,L=l.offsetTop;A=R===L?l.previousElementSibling===t&&!Y||I&&Y:l.previousElementSibling===t||t.previousElementSibling===l?(a.clientY-c.top)/B>.5:L>R}else E||(A=M!==t&&!X||I&&X);var H=J(i,_,t,s,l,c,a,A);!1!==H&&(1!==H&&-1!==H||(A=1===H),O=!0,k($,30),j(w,C),t.contains(_)||(A&&!M?_.appendChild(t):l.parentNode.insertBefore(t,A?M:l)),e=t.parentNode,this._animate(s,t),this._animate(c,l))}}},_animate:function(t,e){var n=this.options.animation;if(n){var o=e.getBoundingClientRect();1===t.nodeType&&(t=t.getBoundingClientRect()),G(e,"transition","none"),G(e,"transform","translate3d("+(t.left-o.left)+"px,"+(t.top-o.top)+"px,0)"),e.offsetWidth,G(e,"transition","all "+n+"ms"),G(e,"transform","translate3d(0,0,0)"),clearTimeout(e.animated),e.animated=k(function(){G(e,"transition",""),G(e,"transform",""),e.animated=!1},n)}},_offUpEvents:function(){var t=this.el.ownerDocument;q(E,"touchmove",this._onTouchMove),q(E,"pointermove",this._onTouchMove),q(t,"mouseup",this._onDrop),q(t,"touchend",this._onDrop),q(t,"pointerup",this._onDrop),q(t,"touchcancel",this._onDrop),q(t,"pointercancel",this._onDrop),q(t,"selectstart",this)},_onDrop:function(a){var l=this.el,s=this.options;clearInterval(this._loopId),clearInterval(y.pid),clearTimeout(this._dragStartTimer),lt(this._cloneId),lt(this._dragStartId),q(E,"mouseover",this),q(E,"mousemove",this._onTouchMove),this.nativeDraggable&&(q(E,"drop",this),q(l,"dragstart",this._onDragStart)),this._offUpEvents(),a&&(b&&(a.preventDefault(),!s.dropBubble&&a.stopPropagation()),n&&n.parentNode&&n.parentNode.removeChild(n),i!==e&&"clone"===W.active.lastPullMode||o&&o.parentNode&&o.parentNode.removeChild(o),t&&(this.nativeDraggable&&q(t,"dragend",this),K(t),t.style["will-change"]="",z(t,this.options.ghostClass,!1),z(t,this.options.chosenClass,!1),Z(this,i,"unchoose",t,e,i,f,null,a),i!==e?(p=et(t,s.draggable))>=0&&(Z(null,e,"add",t,e,i,f,p,a),Z(this,i,"remove",t,e,i,f,p,a),Z(null,e,"sort",t,e,i,f,p,a),Z(this,i,"sort",t,e,i,f,p,a)):t.nextSibling!==r&&(p=et(t,s.draggable))>=0&&(Z(this,i,"update",t,e,i,f,p,a),Z(this,i,"sort",t,e,i,f,p,a)),W.active&&(null!=p&&-1!==p||(p=f),Z(this,i,"end",t,e,i,f,p,a),this.save()))),this._nulling()},_nulling:function(){i=t=e=n=r=o=a=l=s=m=_=b=p=d=h=v=g=W.active=null,A.forEach(function(t){t.checked=!0}),A.length=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragover":case"dragenter":t&&(this._onDragOver(e),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.preventDefault()}(e));break;case"mouseover":this._onDrop(e);break;case"selectstart":e.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)U(t=n[o],r.draggable,this.el)&&e.push(t.getAttribute(r.dataIdAttr)||tt(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];U(i,this.options.draggable,n)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set(this)},closest:function(t,e){return U(t,e||this.options.draggable,this.el)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&H(n)},destroy:function(){var t=this.el;t[S]=null,q(t,"mousedown",this._onTapStart),q(t,"touchstart",this._onTapStart),q(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(q(t,"dragover",this),q(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),R.splice(R.indexOf(this._onDragOver),1),this._onDrop(),this.el=t=null}},V(E,"touchmove",function(t){W.active&&t.preventDefault()}),W.utils={on:V,off:q,css:G,find:Q,is:function(t,e){return!!U(t,e,t)},extend:it,throttle:ot,closest:U,toggleClass:z,clone:rt,index:et,nextTick:at,cancelNextTick:lt},W.create=function(t,e){return new W(t,e)},W.version="1.7.0",W});


//旋转/幸运转盘
!function($){for(var supportedCSS,styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "),a=0;a<toCheck.length;a++)void 0!==styles[toCheck[a]]&&(supportedCSS=toCheck[a]);var IE=eval('"v"=="\v"');jQuery.fn.extend({rotate:function(t){if(0!==this.length&&void 0!==t){"number"==typeof t&&(t={angle:t});for(var i=[],e=0,s=this.length;e<s;e++){var h=this.get(e);if(h.Wilq32&&h.Wilq32.PhotoEffect)h.Wilq32.PhotoEffect._handleRotation(t);else{var a=$.extend(!0,{},t),n=new Wilq32.PhotoEffect(h,a)._rootObj;i.push($(n))}}return i}},getRotateAngle:function(){for(var t=[],i=0,e=this.length;i<e;i++){var s=this.get(i);s.Wilq32&&s.Wilq32.PhotoEffect&&(t[i]=s.Wilq32.PhotoEffect._angle)}return t},stopRotate:function(){for(var t=0,i=this.length;t<i;t++){var e=this.get(t);e.Wilq32&&e.Wilq32.PhotoEffect&&clearTimeout(e.Wilq32.PhotoEffect._timer)}}}),Wilq32=window.Wilq32||{},Wilq32.PhotoEffect=function(){return supportedCSS?function(t,i){t.Wilq32={PhotoEffect:this},this._img=this._rootObj=this._eventObj=t,this._handleRotation(i)}:function(t,i){if(this._img=t,this._rootObj=document.createElement("span"),this._rootObj.style.display="inline-block",this._rootObj.Wilq32={PhotoEffect:this},t.parentNode.insertBefore(this._rootObj,t),t.complete)this._Loader(i);else{var e=this;jQuery(this._img).bind("load",function(){e._Loader(i)})}}}(),Wilq32.PhotoEffect.prototype={_setupParameters:function(t){this._parameters=this._parameters||{},"number"!=typeof this._angle&&(this._angle=0),"number"==typeof t.angle&&(this._angle=t.angle),this._parameters.animateTo="number"==typeof t.animateTo?t.animateTo:this._angle,this._parameters.step=t.step||this._parameters.step||null,this._parameters.easing=t.easing||this._parameters.easing||function(t,i,e,s,h){return-s*((i=i/h-1)*i*i*i-1)+e},this._parameters.duration=t.duration||this._parameters.duration||1e3,this._parameters.callback=t.callback||this._parameters.callback||function(){},t.bind&&t.bind!=this._parameters.bind&&this._BindEvents(t.bind)},_handleRotation:function(t){this._setupParameters(t),this._angle==this._parameters.animateTo?this._rotate(this._angle):this._animateStart()},_BindEvents:function(t){if(t&&this._eventObj){if(this._parameters.bind){var i=this._parameters.bind;for(var e in i)i.hasOwnProperty(e)&&jQuery(this._eventObj).unbind(e,i[e])}this._parameters.bind=t;for(var e in t)t.hasOwnProperty(e)&&jQuery(this._eventObj).bind(e,t[e])}},_Loader:function(){return IE?function(t){var i=this._img.width,e=this._img.height;this._img.parentNode.removeChild(this._img),this._vimage=this.createVMLNode("image"),this._vimage.src=this._img.src,this._vimage.style.height=e+"px",this._vimage.style.width=i+"px",this._vimage.style.position="absolute",this._vimage.style.top="0px",this._vimage.style.left="0px",this._container=this.createVMLNode("group"),this._container.style.width=i,this._container.style.height=e,this._container.style.position="absolute",this._container.setAttribute("coordsize",i-1+","+(e-1)),this._container.appendChild(this._vimage),this._rootObj.appendChild(this._container),this._rootObj.style.position="relative",this._rootObj.style.width=i+"px",this._rootObj.style.height=e+"px",this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._eventObj=this._rootObj,this._handleRotation(t)}:function(t){this._rootObj.setAttribute("id",this._img.getAttribute("id")),this._rootObj.className=this._img.className,this._width=this._img.width,this._height=this._img.height,this._widthHalf=this._width/2,this._heightHalf=this._height/2;var i=Math.sqrt(this._height*this._height+this._width*this._width);this._widthAdd=i-this._width,this._heightAdd=i-this._height,this._widthAddHalf=this._widthAdd/2,this._heightAddHalf=this._heightAdd/2,this._img.parentNode.removeChild(this._img),this._aspectW=(parseInt(this._img.style.width,10)||this._width)/this._img.width,this._aspectH=(parseInt(this._img.style.height,10)||this._height)/this._img.height,this._canvas=document.createElement("canvas"),this._canvas.setAttribute("width",this._width),this._canvas.style.position="relative",this._canvas.style.left=-this._widthAddHalf+"px",this._canvas.style.top=-this._heightAddHalf+"px",this._canvas.Wilq32=this._rootObj.Wilq32,this._rootObj.appendChild(this._canvas),this._rootObj.style.width=this._width+"px",this._rootObj.style.height=this._height+"px",this._eventObj=this._canvas,this._cnv=this._canvas.getContext("2d"),this._handleRotation(t)}}(),_animateStart:function(){this._timer&&clearTimeout(this._timer),this._animateStartTime=+new Date,this._animateStartAngle=this._angle,this._animate()},_animate:function(){var t=+new Date,i=t-this._animateStartTime>this._parameters.duration;if(i&&!this._parameters.animatedGif)clearTimeout(this._timer);else{if(this._canvas||this._vimage||this._img){var e=this._parameters.easing(0,t-this._animateStartTime,this._animateStartAngle,this._parameters.animateTo-this._animateStartAngle,this._parameters.duration);this._rotate(~~(10*e)/10)}this._parameters.step&&this._parameters.step(this._angle);var s=this;this._timer=setTimeout(function(){s._animate.call(s)},10)}this._parameters.callback&&i&&(this._angle=this._parameters.animateTo,this._rotate(this._angle),this._parameters.callback.call(this._rootObj))},_rotate:function(){var t=Math.PI/180;return IE?function(t){this._angle=t,this._container.style.rotation=t%360+"deg"}:supportedCSS?function(t){this._angle=t,this._img.style[supportedCSS]="rotate("+t%360+"deg)"}:function(i){this._angle=i,i=i%360*t,this._canvas.width=this._width+this._widthAdd,this._canvas.height=this._height+this._heightAdd,this._cnv.translate(this._widthAddHalf,this._heightAddHalf),this._cnv.translate(this._widthHalf,this._heightHalf),this._cnv.rotate(i),this._cnv.translate(-this._widthHalf,-this._heightHalf),this._cnv.scale(this._aspectW,this._aspectH),this._cnv.drawImage(this._img,0,0)}}()}}(jQuery);