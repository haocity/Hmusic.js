!function(n){function e(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var t={};e.m=n,e.c=t,e.i=function(n){return n},e.d=function(n,t,r){e.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:r})},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},e.p="",e(e.s=2)}([function(n,e,t){"use strict";n.exports={html:function(){return'<div class="hmusic">\n  <audio class="hm-audio"></audio>\n  <div class="banner">\n    <div class="banner-zz">\n      <div class="songname"></div>\n      <div class="lrc-warp">\n        <div class="lrc"></div>\n      </div>\n      <div class="ranger">\n        <div class="ranger-n"></div>\n      </div>\n    </div>\n  </div>\n  <div class="con">\n    <div class="left">\n      <div class="nowtime">0:00</div>\n    </div>\n    <i class="iconfont icon-s"></i>\n    <i class="iconfont icon-play"></i>\n    <i class="iconfont icon-stop" style="display: none;"></i>\n    <i class="iconfont icon-x"></i>\n    <div class="right">\n      <div class="sound">\n        <div class="sound-ranger">\n          <div class="sound-ranger-a">\n            <div class="sound-ranger-b"></div>\n          </div>\n        </div>\n        <i class="iconfont icon-yinliang"></i>\n      </div>\n      <i class="iconfont icon-xunhuan xunhuan"></i>\n      <i class="iconfont icon-ttpodicon xunhuan" style="display: none;"></i>\n      <div class="alltime">1:00</div></div>\n  </div>\n  <div class="longarr"></div>\n  <style type="text/css" class="css"></style>\n</div>'}}},function(n,e,t){var r=t(3);"string"==typeof r&&(r=[[n.i,r,""]]);var o={};o.transform=void 0;t(5)(r,o);r.locals&&(n.exports=r.locals)},function(n,e,t){"use strict";var r=t(0);t(1),window.hyplaylist=function(n,e){var t=new Object;t.ele=n,t.arr=new Array;var r="https://api.imjad.cn/cloudmusic",o=new XMLHttpRequest;o.onreadystatechange=function(){if(4==o.readyState&&200==o.status){for(var n=JSON.parse(o.responseText).playlist.tracks,e=0;e<n.length;e++){var i=new Object,a="";if(i.yunid=n[e].id,i.img=n[e].al.picUrl+"?param=320y320",i.lrc=r+"/?type=lyric&id="+i.yunid+"&br=128000",n[e].ar.length>4)a="群星",i.title=n[e].al.name;else{for(var s=0;s<n[e].ar.length;s++)a+=n[e].ar[s].name;i.title=n[e].name+"-"+a}t.arr.push(i)}Hmusic(t.ele,t.arr)}},o.open("GET",r+"/?type=playlist&id="+e+"&br=128000",!0),o.send()},window.Hmusic=function(n,e){function t(e){return n.querySelector(e)}function o(){this.audiowarp=t(".hmusic"),this.audio=t(".hmusic>.hm-audio"),this.banner=t(".banner"),this.btnplay=t(".icon-play"),this.btnstop=t(".icon-stop"),this.title=t(".songname"),this.btnx=t(".icon-x"),this.btns=t(".icon-s"),this.wranger=t(".ranger"),this.nrange=t(".ranger-n"),this.nowtime=t(".nowtime"),this.alltime=t(".alltime"),this.lrc=t(".lrc"),this.x1=t(".icon-xunhuan"),this.x2=t(".icon-ttpodicon"),this.longarr=t(".longarr"),this.sbtn=t(".icon-yinliang"),this.wsound=t(".sound-ranger"),this.msound=t(".sound"),this.sounda=t(".sound-ranger-a"),this.soundb=t(".sound-ranger-b")}function i(){u.e.audio.duration>1?(u.alltime=u.e.audio.duration,u.e.alltime.innerHTML=a(u.alltime).m+":"+a(u.alltime).s):setTimeout(i,500)}function a(n){var e,t=parseInt(n/60);return e=parseInt(n%60)>=10?parseInt(n%60):"0"+parseInt(n%60),{m:t,s:e}}function s(n,e){var t=n.clientX-l(e)+window.scrollX,r=n.clientY-c(e)+window.scrollY,o=t/e.offsetWidth,i=1-r/e.offsetHeight;return{x:t,y:r,w:e.offsetWidth,h:e.offsetHeight,xbl:o,ybl:i}}function c(n){var e=n.offsetTop;return null!=n.offsetParent&&(e+=c(n.offsetParent)),e}function l(n){var e=n.offsetLeft;return null!=n.offsetParent&&(e+=l(n.offsetParent)),e}var u=new Object,d=r.html();n.innerHTML=d,u.nowduan=0,u.volume=1,u.nowlrc=-1,u.p=e,u.e=new o,setTimeout(i,500),u.e.btnplay.addEventListener("click",function(){u.play()}),u.e.btnstop.addEventListener("click",function(){u.pause()}),u.play=function(){u.e.btnplay.style.display="none",u.e.btnstop.style.display="inline-block",u.e.audio.paused&&u.e.audio.play()},u.pause=function(){u.e.btnplay.style.display="inline-block",u.e.btnstop.style.display="none",u.e.audio.pause()},u.playswitch=function(){"none"!==u.e.btnplay.style.display?u.play():u.pause()},u.tiao=function(n){u.e.lrcarr[u.nowlrc]&&(u.e.lrcarr[u.nowlrc].className=" "),u.e.audio.currentTime=n,u.e.nrange.style.width=u.e.audio.currentTime/u.alltime*100+"%",u.e.nowtime.innerHTML=a(u.e.audio.currentTime).m+":"+a(u.e.audio.currentTime).s;for(var e=0;e<u.lrc.b.length;e++)if(10*n<=u.lrc.b[e]){u.nowlrc=e;var t=50-30*u.nowlrc;u.e.lrc.style.transform="translateY("+t+"px)",u.e.lrcarr[u.nowlrc].className="nowlrcp";break}i()},u.interval1s=function(){u.e.nrange.style.width=u.e.audio.currentTime/u.alltime*100+"%",u.e.nowtime.innerHTML=a(u.e.audio.currentTime).m+":"+a(u.e.audio.currentTime).s},setInterval(u.interval1s,1e3),u.e.wranger.addEventListener("mousedown",function(n){var e=n||window.event||arguments.callee.caller.arguments[0],t=s(e,this);u.tiao(t.xbl*u.alltime)}),u.getcloudurl=function(n,e,t){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status){var n=JSON.parse(r.responseText);u.e.audio.src=n.data[0].url,!e&&u.e.audio.paused&&u.e.audio.play(),"function"==typeof t&&t()}},r.open("GET",n,!0),r.send()},u.getlrc=function(n){var e=new XMLHttpRequest;e.onreadystatechange=function(){if(4==e.readyState&&200==e.status){var n;u.lrc=new Object,u.lrc.b=new Array,u.lrc.c=new Array,u.lrc.d="";try{n=JSON.parse(e.responseText).lrc.lyric}catch(e){n="[00:00.72]歌词不存在"}u.parseLyric(n),u.lrc.a=u.parseLyric(n);for(var t in u.lrc.a)u.lrc.a.hasOwnProperty(t)&&(u.lrc.b.push(t),u.lrc.a[t]?u.lrc.c.push(u.lrc.a[t]):u.lrc.c.push("&nbsp;"));for(var t=0;t<u.lrc.c.length;t++)u.lrc.d=u.lrc.d+"<p>"+u.lrc.c[t]+"</p>";u.e.lrc.innerHTML=u.lrc.d,u.e.lrcarr=u.e.lrc.querySelectorAll("p")}},e.open("GET",n,!0),e.send()},u.parseLyric=function(n){for(var e=n.split("\n"),t={},r=0;r<e.length;r++){var o=decodeURIComponent(e[r]),i=/\[\d*:\d*((\.|\:)\d*)*\]/g,a=o.match(i);if(a)for(var s=o.replace(i,""),c=0,l=a.length;c<l;c++){var u=a[c],d=Number(String(u.match(/\[\d*/i)).slice(1)),p=Number(String(u.match(/\:\d*\.*\d*/i)).slice(1)),f=10*(60*d+p).toFixed(1);t[f]=s}}return t},u.huan=function(n,e){if(u.p[n]){u.e.audio.currentTime=0,u.e.audio.paused||u.e.audio.pause(),u.e.audio.remove(),u.e.audio=document.createElement("audio"),u.e.audio.className="hm-audio",u.e.audiowarp.appendChild(u.e.audio),u.e.nrange.style.width="0px",u.nowduan=n,u.nowlrc=-1,u.e.lrc.style.transform="translateY(60px)",u.e.title.innerHTML=u.p[u.nowduan].title,u.p[u.nowduan].yunid?u.getcloudurl("https://api.imjad.cn/cloudmusic/?type=song&id="+u.p[u.nowduan].yunid+"&br=128000",e,u.huan2(e)):(u.e.audio.src=u.p[u.nowduan].audio,u.huan2(e));for(var t=u.e.longarr.querySelectorAll("li"),r=0;r<t.length;r++)t[r].style.backgroundColor="transparent",n==r&&(t[r].style.backgroundColor="rgba(49, 155, 211, 0.33)")}else n<0?u.huan(u.p.length-1):u.huan(0);u.changersound(u.volume),setTimeout(i,500)},u.longarr="";for(var p=0;p<u.p.length;p++){var f=document.createElement("li");f.innerHTML=u.p[p].title,f.songid=p,0==p&&(f.style.backgroundColor="rgba(49, 155, 211, 0.33)"),u.e.longarr.appendChild(f),f.addEventListener("click",function(){u.huan(this.songid)})}u.huan2=function(n){u.e.banner.style.backgroundImage="url("+u.p[u.nowduan].img+")",u.getlrc(u.p[u.nowduan].lrc),!n&&u.e.audio.paused&&(u.e.audio.play(),u.e.btnplay.style.display="none",u.e.btnstop.style.display="inline-block")},u.e.btnx.addEventListener("click",function(){u.huan(u.nowduan+1)}),u.e.btns.addEventListener("click",function(){u.huan(u.nowduan-1)}),u.e.audio.onended=function(){"none"==u.e.x2.style.display?u.huan(u.nowduan+1):(u.e.audio.play(),u.nowlrc=-1)},u.e.x1.addEventListener("click",function(){this.style.display="none",u.e.x2.style.display="block"}),u.e.x2.addEventListener("click",function(){this.style.display="none",u.e.x1.style.display="block"}),u.e.wsound.addEventListener("click",function(n){var e=n||window.event||arguments.callee.caller.arguments[0],t=s(e,this);u.e.soundb.style.height=t.h*t.ybl+"px",u.changersound(t.ybl)}),u.changersound=function(n){u.e.audio.volume=n,u.volume=n},u.e.msound.addEventListener("mouseover",function(){u.e.wsound.style.display="block"}),u.e.msound.addEventListener("mouseleave",function(){u.e.wsound.style.display="none"}),u.huan(0,!0),u.e.audio.addEventListener("timeupdate",function(n){var e=10*u.e.audio.currentTime.toFixed(1);if(u.lrc&&u.lrc.b[u.nowlrc+1]<=e){++u.nowlrc;var t=50-30*u.nowlrc;u.e.lrc.style.transform="translateY("+t+"px)",u.e.lrcarr[u.nowlrc].className="nowlrcp",u.e.lrcarr[u.nowlrc-1]&&(u.e.lrcarr[u.nowlrc-1].className=" ")}})}},function(n,e,t){e=n.exports=t(4)(void 0),e.push([n.i,'@font-face{font-family:iconfont;src:url("https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060");src:url("https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060#iefix") format("embedded-opentype"),url("https://at.alicdn.com/t/font_dx3vz7ez48udte29.woff?t=1494255783060") format("woff"),url("https://at.alicdn.com/t/font_dx3vz7ez48udte29.ttf?t=1494255783060") format("truetype"),url("https://at.alicdn.com/t/font_dx3vz7ez48udte29.svg?t=1494255783060#iconfont") format("svg")}.iconfont{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-play:before{content:"\\E633"}.icon-yinliang:before{content:"\\E60A"}.icon-ttpodicon:before{content:"\\E6BD"}.icon-s:before{content:"\\E61E"}.icon-x:before{content:"\\E620"}.icon-xunhuan:before{content:"\\E605"}.icon-stop:before{content:"\\E669"}.hmusic{font-size:16px;height:500px;box-shadow:0 0 5px rgba(0,0,0,.8);font-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif}.hmusic>.banner{height:200px;background-position:50%;background-size:cover}.hmusic>.banner>.banner-zz{overflow:hidden;height:100%;background-color:rgba(0,0,0,.4);color:#fff}.hmusic>.banner>.banner-zz>.songname{padding-top:5px;height:25px;text-align:center;font-size:1.2em;white-space:nowrap}.hmusic>.banner>.banner-zz>.lrc-warp{overflow:hidden;height:10pc}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc{text-align:center;transition:all .3s ease-out;transform:translateY(-10px)}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>p{white-space:nowrap;margin:0;padding:0;line-height:30px;font-size:12px}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>.nowlrcp{font-size:24px;white-space:inherit}.hmusic>.banner>.banner-zz>.ranger{cursor:pointer;height:9pt;background-color:rgba(59,65,67,.39)}.hmusic>.banner>.banner-zz>.ranger>.ranger-n{width:20%;height:100%;background-color:rgba(3,169,244,.6)}.hmusic>.con{position:relative;top:0;height:40px;text-align:center;user-select:none}.hmusic>.con .sound-ranger{height:80px;width:16px;background-color:hsla(0,0%,100%,.4);cursor:pointer;display:none}.hmusic>.con .sound-ranger>.sound-ranger-a{height:100%;position:relative}.hmusic>.con .sound-ranger>.sound-ranger-a>.sound-ranger-b{height:82px;position:absolute;width:100%;bottom:0;background-color:#6d95e0}.hmusic>.con .iconfont{color:#6d95e0;font-size:1.6em;cursor:pointer}.hmusic>.con .iconfont:hover{color:#2753af}.hmusic>.con>.icon-s,.hmusic>.con>.icon-x{font-size:2em;line-height:40px;position:absolute}.hmusic>.con>.icon-s{left:16%}.hmusic>.con>.icon-x{right:16%}.hmusic>.con>.icon-play,.hmusic>.con>.icon-stop{position:relative;font-size:2em;line-height:40px}.hmusic>.con>.right{float:right}.hmusic>.con>.left,.hmusic>.con>.right{height:100%;padding:0 4px;position:relative}.hmusic>.con>.left{float:left}.hmusic>.con>.left>.nowtime,.hmusic>.con>.right>.alltime{display:inline-block;font-size:.6em}.hmusic>.con .sound{position:absolute;bottom:2px;right:24px;z-index:10}.hmusic>.con .sound>.icon-yinliang{font-size:1em}.hmusic>.con .xunhuan{font-size:.9em;position:absolute;bottom:1px;right:4px}.hmusic>.longarr{width:100%;overflow-x:hidden;overflow-y:auto;height:260px;background-color:#fafafa}.hmusic>.longarr>li{white-space:nowrap;padding:3px 0 3px 20px;cursor:pointer}.hmusic>.longarr>li:hover{padding:3px 0 3px 24px;background-color:hsla(0,0%,69%,.9)}',""])},function(n,e){function t(n,e){var t=n[1]||"",o=n[3];if(!o)return t;if(e&&"function"==typeof btoa){var i=r(o);return[t].concat(o.sources.map(function(n){return"/*# sourceURL="+o.sourceRoot+n+" */"})).concat([i]).join("\n")}return[t].join("\n")}function r(n){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"}n.exports=function(n){var e=[];return e.toString=function(){return this.map(function(e){var r=t(e,n);return e[2]?"@media "+e[2]+"{"+r+"}":r}).join("")},e.i=function(n,t){"string"==typeof n&&(n=[[null,n,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<n.length;o++){var a=n[o];"number"==typeof a[0]&&r[a[0]]||(t&&!a[2]?a[2]=t:t&&(a[2]="("+a[2]+") and ("+t+")"),e.push(a))}},e}},function(n,e,t){function r(n,e){for(var t=0;t<n.length;t++){var r=n[t],o=h[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(u(r.parts[i],e))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(u(r.parts[i],e));h[r.id]={id:r.id,refs:1,parts:a}}}}function o(n,e){for(var t=[],r={},o=0;o<n.length;o++){var i=n[o],a=e.base?i[0]+e.base:i[0],s=i[1],c=i[2],l=i[3],u={css:s,media:c,sourceMap:l};r[a]?r[a].parts.push(u):t.push(r[a]={id:a,parts:[u]})}return t}function i(n,e){var t=v(n.insertInto);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=y[y.length-1];if("top"===n.insertAt)r?r.nextSibling?t.insertBefore(e,r.nextSibling):t.appendChild(e):t.insertBefore(e,t.firstChild),y.push(e);else{if("bottom"!==n.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");t.appendChild(e)}}function a(n){n.parentNode.removeChild(n);var e=y.indexOf(n);e>=0&&y.splice(e,1)}function s(n){var e=document.createElement("style");return n.attrs.type="text/css",l(e,n.attrs),i(n,e),e}function c(n){var e=document.createElement("link");return n.attrs.type="text/css",n.attrs.rel="stylesheet",l(e,n.attrs),i(n,e),e}function l(n,e){Object.keys(e).forEach(function(t){n.setAttribute(t,e[t])})}function u(n,e){var t,r,o,i;if(e.transform&&n.css){if(!(i=e.transform(n.css)))return function(){};n.css=i}if(e.singleton){var l=b++;t=g||(g=s(e)),r=d.bind(null,t,l,!1),o=d.bind(null,t,l,!0)}else n.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(t=c(e),r=f.bind(null,t,e),o=function(){a(t),t.href&&URL.revokeObjectURL(t.href)}):(t=s(e),r=p.bind(null,t),o=function(){a(t)});return r(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;r(n=e)}else o()}}function d(n,e,t,r){var o=t?"":r.css;if(n.styleSheet)n.styleSheet.cssText=x(e,o);else{var i=document.createTextNode(o),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}function p(n,e){var t=e.css,r=e.media;if(r&&n.setAttribute("media",r),n.styleSheet)n.styleSheet.cssText=t;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(t))}}function f(n,e,t){var r=t.css,o=t.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=w(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=n.href;n.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var h={},m=function(n){var e;return function(){return void 0===e&&(e=n.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),v=function(n){var e={};return function(t){return void 0===e[t]&&(e[t]=n.call(this,t)),e[t]}}(function(n){return document.querySelector(n)}),g=null,b=0,y=[],w=t(6);n.exports=function(n,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||(e.singleton=m()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var t=o(n,e);return r(t,e),function(n){for(var i=[],a=0;a<t.length;a++){var s=t[a],c=h[s.id];c.refs--,i.push(c)}if(n){r(o(n,e),e)}for(var a=0;a<i.length;a++){var c=i[a];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete h[c.id]}}}};var x=function(){var n=[];return function(e,t){return n[e]=t,n.filter(Boolean).join("\n")}}()},function(n,e){n.exports=function(n){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!n||"string"!=typeof n)return n;var t=e.protocol+"//"+e.host,r=t+e.pathname.replace(/\/[^\/]*$/,"/");return n.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(n,e){var o=e.trim().replace(/^"(.*)"$/,function(n,e){return e}).replace(/^'(.*)'$/,function(n,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return n;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?t+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}]);