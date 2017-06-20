/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  html: function html() {
    return "<div class=\"hmusic\">\n  <audio class=\"hm-audio\"></audio>\n  <div class=\"banner\">\n    <div class=\"banner-zz\">\n      <div class=\"songname\"></div>\n      <div class=\"lrc-warp\">\n        <div class=\"lrc\"></div>\n      </div>\n      <div class=\"ranger\">\n        <div class=\"ranger-n\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"con\">\n    <div class=\"left\">\n      <div class=\"nowtime\">0:00</div>\n    </div>\n    <i class=\"iconfont icon-s\"></i>\n    <i class=\"iconfont icon-play\"></i>\n    <i class=\"iconfont icon-stop\" style=\"display: none;\"></i>\n    <i class=\"iconfont icon-x\"></i>\n    <div class=\"right\">\n      <div class=\"sound\">\n        <div class=\"sound-ranger\">\n          <div class=\"sound-ranger-a\">\n            <div class=\"sound-ranger-b\"></div>\n          </div>\n        </div>\n        <i class=\"iconfont icon-yinliang\"></i>\n      </div>\n      <i class=\"iconfont icon-xunhuan xunhuan\"></i>\n      <i class=\"iconfont icon-ttpodicon xunhuan\" style=\"display: none;\"></i>\n      <div class=\"alltime\">1:00</div></div>\n  </div>\n  <div class=\"longarr\"></div>\n  <style type=\"text/css\" class=\"css\"></style>\n</div>";
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var html = __webpack_require__(0);
__webpack_require__(1);
window.hyplaylist = function (ele, id) {
	var yl = new Object();
	yl.ele = ele;
	yl.arr = new Array();
	var api = 'https://api.imjad.cn/cloudmusic';
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var t = JSON.parse(xmlhttp.responseText).playlist.tracks;
			for (var i = 0; i < t.length; i++) {
				var c = new Object();
				var au = '';
				c.yunid = t[i].id;
				c.img = t[i].al.picUrl;
				c.lrc = api + '/?type=lyric&id=' + c.yunid + '&br=128000';
				if (t[i].ar.length > 4) {
					au = '群星';
					c.title = t[i].al.name;
				} else {
					for (var x = 0; x < t[i].ar.length; x++) {
						au += t[i].ar[x].name;
					}
					c.title = t[i].name + '-' + au;
				}
				yl.arr.push(c);
			}
			//console.log('加载歌单成功 正在解析各个音频地址');
			Hmusic(yl.ele, yl.arr);
		}
	};
	xmlhttp.open("GET", api + '/?type=playlist&id=' + id + '&br=128000', true);
	xmlhttp.send();
};
window.Hmusic = function (ele, arr) {
	var hm = new Object();
	function $c(c) {
		return ele.querySelector(c);
	};
	var hmele = html.html();
	ele.innerHTML = hmele;
	hm.nowduan = 0;
	hm.volume = 1;
	hm.nowlrc = -1;
	hm.p = arr;
	hm.e = new hmeobj();
	function hmeobj() {
		this.audiowarp = $c('.hmusic');
		this.audio = $c('.hmusic>.hm-audio');
		this.banner = $c('.banner');
		this.btnplay = $c('.icon-play');
		this.btnstop = $c('.icon-stop');
		this.title = $c('.songname');
		this.btnx = $c('.icon-x');
		this.btns = $c('.icon-s');
		this.wranger = $c('.ranger');
		this.nrange = $c('.ranger-n');
		this.nowtime = $c('.nowtime');
		this.alltime = $c('.alltime');
		this.lrc = $c('.lrc');
		this.x1 = $c('.icon-xunhuan');
		this.x2 = $c('.icon-ttpodicon');
		this.longarr = $c('.longarr');
		this.sbtn = $c('.icon-yinliang');
		this.wsound = $c('.sound-ranger');
		this.msound = $c('.sound');
		this.sounda = $c('.sound-ranger-a');
		this.soundb = $c('.sound-ranger-b');
	}
	function getalltime() {
		if (hm.e.audio.duration > 1) {
			hm.alltime = hm.e.audio.duration;
			hm.e.alltime.innerHTML = getvtime(hm.alltime).m + ':' + getvtime(hm.alltime).s;
		} else {
			setTimeout(getalltime, 500);
		}
	}
	setTimeout(getalltime, 500);
	hm.e.btnplay.addEventListener('click', function () {
		hm.play();
	});
	hm.e.btnstop.addEventListener('click', function () {
		hm.pause();
	});

	hm.play = function () {
		hm.e.btnplay.style.display = 'none';
		hm.e.btnstop.style.display = 'inline-block';
		if (hm.e.audio.paused) {
			hm.e.audio.play();
		}
	};
	hm.pause = function () {
		hm.e.btnplay.style.display = 'inline-block';
		hm.e.btnstop.style.display = 'none';
		hm.e.audio.pause();
	};

	hm.playswitch = function () {
		if (hm.e.btnplay.style.display !== 'none') {
			hm.play();
		} else {
			hm.pause();
		}
	};

	hm.tiao = function (t) {
		if (hm.e.lrcarr[hm.nowlrc]) {
			hm.e.lrcarr[hm.nowlrc].className = ' ';
		}
		hm.e.audio.currentTime = t;
		hm.e.nrange.style.width = hm.e.audio.currentTime / hm.alltime * 100 + '%';
		hm.e.nowtime.innerHTML = getvtime(hm.e.audio.currentTime).m + ':' + getvtime(hm.e.audio.currentTime).s;
		for (var i = 0; i < hm.lrc.b.length; i++) {
			if (t * 10 <= hm.lrc.b[i]) {
				hm.nowlrc = i;
				var t2 = 50 - hm.nowlrc * 30;
				hm.e.lrc.style.transform = 'translateY(' + t2 + 'px)';
				hm.e.lrcarr[hm.nowlrc].className = 'nowlrcp';
				//console.log('nowduan切换为:'+i)
				break;
			}
		}
		getalltime();
	};
	//定时器1s
	hm.interval1s = function () {
		hm.e.nrange.style.width = hm.e.audio.currentTime / hm.alltime * 100 + '%';
		hm.e.nowtime.innerHTML = getvtime(hm.e.audio.currentTime).m + ':' + getvtime(hm.e.audio.currentTime).s;
	};
	setInterval(hm.interval1s, 1000);
	hm.e.wranger.addEventListener('mousedown', function (event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		var xbl = show_coords(e, this);
		hm.tiao(xbl.xbl * hm.alltime);
	});
	function getvtime(time) {
		var tm = void 0;
		var m = parseInt(time / 60);
		if (parseInt(time % 60) >= 10) {
			tm = parseInt(time % 60);
		} else {
			tm = "0" + parseInt(time % 60);
		}
		return {
			m: m,
			s: tm
		};
	}
	function show_coords(event, elem) {
		var x = event.clientX - getLeft(elem) + window.scrollX;
		var y = event.clientY - getTop(elem) + window.scrollY;
		var xbl = x / elem.offsetWidth;
		var ybl = 1 - y / elem.offsetHeight;
		return {
			x: x,
			y: y,
			w: elem.offsetWidth,
			h: elem.offsetHeight,
			xbl: xbl,
			ybl: ybl
		};
	}
	//获取元素的纵坐标（相对于窗口）
	function getTop(e) {
		var offset = e.offsetTop;
		if (e.offsetParent != null) offset += getTop(e.offsetParent);
		return offset;
	}
	//获取元素的横坐标（相对于窗口）
	function getLeft(e) {
		var offset = e.offsetLeft;
		if (e.offsetParent != null) offset += getLeft(e.offsetParent);
		return offset;
	}
	hm.getcloudurl = function (url, stop, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var t = JSON.parse(xmlhttp.responseText);
				hm.e.audio.src = t.data[0].url;
				if (!stop && hm.e.audio.paused) {
					hm.e.audio.play();
				}
				if (typeof callback === "function") {
					callback();
				}
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};
	hm.getlrc = function (url) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var t = void 0;
				hm.lrc = new Object();
				hm.lrc.b = new Array();
				hm.lrc.c = new Array();
				hm.lrc.d = '';
				try {
					t = JSON.parse(xmlhttp.responseText).lrc.lyric;
				} catch (e) {
					t = '[00:00.72]歌词不存在';
				}
				hm.parseLyric(t);
				hm.lrc.a = hm.parseLyric(t);
				for (var i in hm.lrc.a) {
					if (hm.lrc.a.hasOwnProperty(i)) {
						hm.lrc.b.push(i);
						if (!hm.lrc.a[i]) {
							hm.lrc.c.push('&nbsp;');
						} else {
							hm.lrc.c.push(hm.lrc.a[i]);
						}
					};
				}
				for (var _i = 0; _i < hm.lrc.c.length; _i++) {
					hm.lrc.d = hm.lrc.d + '<p>' + hm.lrc.c[_i] + '</p>';
				}
				hm.e.lrc.innerHTML = hm.lrc.d;
				hm.e.lrcarr = hm.e.lrc.querySelectorAll('p');
			}
		};
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	};
	hm.parseLyric = function (lrc) {
		//console.log(lrc);
		var lyrics = lrc.split("\n");
		var lrcObj = {};
		for (var i = 0; i < lyrics.length; i++) {
			var lyric = decodeURIComponent(lyrics[i]);
			var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
			var timeRegExpArr = lyric.match(timeReg);
			if (!timeRegExpArr) continue;
			var clause = lyric.replace(timeReg, '');
			for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
				var t = timeRegExpArr[k];
				var min = Number(String(t.match(/\[\d*/i)).slice(1)),
				    sec = Number(String(t.match(/\:\d*\.*\d*/i)).slice(1));
				var time = (min * 60 + sec).toFixed(1) * 10;
				lrcObj[time] = clause;
			}
		}
		return lrcObj;
	};
	hm.huan = function (duan, stop) {
		if (hm.p[duan]) {
			hm.e.audio.currentTime = 0;
			if (!hm.e.audio.paused) {
				hm.e.audio.pause();
			}
			hm.e.audio.remove();
			hm.e.audio = document.createElement('audio');
			hm.e.audio.className = 'hm-audio';
			hm.e.audiowarp.appendChild(hm.e.audio);
			hm.e.nrange.style.width = '0px';
			hm.nowduan = duan;
			hm.nowlrc = -1;
			hm.e.lrc.style.transform = 'translateY(60px)';
			hm.e.title.innerHTML = hm.p[hm.nowduan].title;
			if (hm.p[hm.nowduan].yunid) {
				hm.getcloudurl('https://api.imjad.cn/cloudmusic/?type=song&id=' + hm.p[hm.nowduan].yunid + '&br=128000', stop, hm.huan2(stop));
			} else {
				hm.e.audio.src = hm.p[hm.nowduan].audio;
				hm.huan2(stop);
			}
			var li = hm.e.longarr.querySelectorAll('li');
			for (var i = 0; i < li.length; i++) {
				li[i].style.backgroundColor = 'transparent';
				if (duan == i) {
					li[i].style.backgroundColor = 'rgba(49, 155, 211, 0.33)';
				}
			}
		} else if (duan < 0) {
			hm.huan(hm.p.length - 1);
		} else {
			hm.huan(0);
		}
		hm.changersound(hm.volume);
		setTimeout(getalltime, 500);
	};
	hm.longarr = '';
	for (var i = 0; i < hm.p.length; i++) {
		var e = document.createElement('li');
		e.innerHTML = hm.p[i].title;
		e.songid = i;
		if (i == 0) {
			e.style.backgroundColor = 'rgba(49, 155, 211, 0.33)';
		}
		hm.e.longarr.appendChild(e);
		e.addEventListener('click', function () {
			hm.huan(this.songid);
		});
	}
	hm.huan2 = function (stop) {
		var picsize = '?param=' + hm.e.banner.offsetWidth + 'y' + hm.e.banner.offsetHeight;
		hm.e.banner.style.backgroundImage = 'url(' + hm.p[hm.nowduan].img + '?param=' + picsize + ')';
		hm.getlrc(hm.p[hm.nowduan].lrc);
		if (!stop && hm.e.audio.paused) {
			hm.e.audio.play();
			hm.e.btnplay.style.display = 'none';
			hm.e.btnstop.style.display = 'inline-block';
		}
		hm.e.audio.onended = function () {
			if (hm.e.x2.style.display == 'none') {
				hm.huan(hm.nowduan + 1);
			} else {
				try {
					hm.e.audio.play();
				} catch (e) {}
				hm.nowlrc = -1;
			}
		};
		hm.e.audio.addEventListener('timeupdate', function (c) {
			var t = hm.e.audio.currentTime.toFixed(1) * 10;
			if (hm.lrc) {
				if (hm.lrc.b[hm.nowlrc + 1] <= t) {
					++hm.nowlrc;
					var t2 = 50 - hm.nowlrc * 30;
					hm.e.lrc.style.transform = 'translateY(' + t2 + 'px)';
					hm.e.lrcarr[hm.nowlrc].className = 'nowlrcp';
					if (hm.e.lrcarr[hm.nowlrc - 1]) {
						hm.e.lrcarr[hm.nowlrc - 1].className = ' ';
					}
				}
			}
		});
	};
	hm.e.btnx.addEventListener('click', function () {
		hm.huan(hm.nowduan + 1);
	});
	hm.e.btns.addEventListener('click', function () {
		hm.huan(hm.nowduan - 1);
	});
	hm.e.x1.addEventListener('click', function () {
		this.style.display = 'none';
		hm.e.x2.style.display = 'block';
	});
	hm.e.x2.addEventListener('click', function () {
		this.style.display = 'none';
		hm.e.x1.style.display = 'block';
	});
	hm.e.wsound.addEventListener('click', function (event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		var bl = show_coords(e, this);
		hm.e.soundb.style.height = bl.h * bl.ybl + 'px';
		hm.changersound(bl.ybl);
	});
	hm.changersound = function (i) {
		hm.e.audio.volume = i;
		hm.volume = i;
	};
	hm.e.msound.addEventListener('mouseover', function () {
		hm.e.wsound.style.display = 'block';
	});
	hm.e.msound.addEventListener('mouseleave', function () {
		hm.e.wsound.style.display = 'none';
	});
	hm.huan(0, true);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060'); /* IE9*/\r\n  src: url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.woff?t=1494255783060') format('woff'), /* chrome, firefox */\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.ttf?t=1494255783060') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.svg?t=1494255783060#iconfont') format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-play:before { content: \"\\E633\"; }\r\n\r\n.icon-yinliang:before { content: \"\\E60A\"; }\r\n\r\n.icon-ttpodicon:before { content: \"\\E6BD\"; }\r\n\r\n.icon-s:before { content: \"\\E61E\"; }\r\n\r\n.icon-x:before { content: \"\\E620\"; }\r\n\r\n.icon-xunhuan:before { content: \"\\E605\"; }\r\n\r\n.icon-stop:before { content: \"\\E669\"; }\r\n\r\n.hmusic {\r\n\tfont-size:16px;\r\n\theight:500px;\r\n\tbox-shadow:0 0 5px rgba(0,0,0,.8);\r\n\tfont-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif\r\n}\r\n.hmusic>.banner {\r\n\theight:200px;\r\n\t\r\n\tbackground-position:center;\r\n\tbackground-size:cover\r\n}\r\n.hmusic>.banner>.banner-zz {\r\n\toverflow:hidden;\r\n\theight:100%;\r\n\tbackground-color:rgba(0,0,0,.4);\r\n\tcolor:#fff\r\n}\r\n.hmusic>.banner>.banner-zz>.songname {\r\n\tpadding-top:5px;\r\n\theight:25px;\r\n\ttext-align:center;\r\n\tfont-size:1.2em;\r\n\twhite-space:nowrap\r\n}\r\n.hmusic>.banner>.banner-zz>.lrc-warp {\r\n\toverflow:hidden;\r\n\theight:10pc\r\n}\r\n.hmusic>.banner>.banner-zz>.lrc-warp>.lrc {\r\n\ttext-align:center;\r\n\ttransition:all .3s ease-out;\r\n\ttransform:translateY(-10px)\r\n}\r\n.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>p {\r\n\twhite-space:nowrap;\r\n\tmargin:0;\r\n\tpadding:0;\r\n\tline-height:30px;\r\n\tfont-size:12px\r\n}\r\n.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>.nowlrcp {\r\n\tfont-size:24px;\r\n\twhite-space:inherit;\r\n}\r\n.hmusic>.banner>.banner-zz>.ranger {\r\n\tcursor:pointer;\r\n\theight:9pt;\r\n\tbackground-color:rgba(59,65,67,.39)\r\n}\r\n.hmusic>.banner>.banner-zz>.ranger>.ranger-n {\r\n\twidth:20%;\r\n\theight:100%;\r\n\tbackground-color:rgba(3,169,244,.6)\r\n}\r\n.hmusic>.con {\r\n\tposition: relative;\r\n\ttop:0px;\r\n\theight:40px;\r\n\ttext-align:center;\r\n\tuser-select:none\r\n}\r\n.hmusic>.con .sound-ranger {\r\n\theight:80px;\r\n\twidth:16px;\r\n\tbackground-color:rgba(255,255,255,.4);\r\n\tcursor:pointer;\r\n\tdisplay:none\r\n}\r\n.hmusic>.con .sound-ranger>.sound-ranger-a {\r\n\theight:100%;\r\n\tposition:relative\r\n}\r\n.hmusic>.con .sound-ranger>.sound-ranger-a>.sound-ranger-b {\r\n\theight:82px;\r\n\tposition:absolute;\r\n\twidth:100%;\r\n\tbottom:0;\r\n\tbackground-color:#6D95E0\r\n}\r\n.hmusic>.con .iconfont {\r\n\tcolor:#6d95e0;\r\n\tfont-size:1.6em;\r\n\tcursor:pointer\r\n}\r\n.hmusic>.con .iconfont:hover {\r\n\tcolor:#2753af\r\n}\r\n.hmusic>.con>.icon-s,.hmusic>.con>.icon-x{\r\n\tfont-size: 2em;\r\n    line-height: 40px;\r\n    position: absolute;\r\n}\r\n.hmusic>.con>.icon-s{\r\n\tleft: 16%;\r\n}\r\n.hmusic>.con>.icon-x{\r\n\tright: 16%;\r\n}\r\n.hmusic>.con>.icon-play,.hmusic>.con>.icon-stop {\r\n\tposition:relative;\r\n\tfont-size:2em;\r\n\tline-height:40px;\r\n}\r\n.hmusic>.con>.right {\r\n\tfloat:right;\r\n\theight: 100%;\r\n\tpadding:0 4px;\r\n\tposition:relative\r\n}\r\n.hmusic>.con>.left {\r\n\tfloat:left;\r\n\tpadding:0 4px;\r\n\theight: 100%;\r\n\tposition:relative\r\n}\r\n.hmusic>.con>.left>.nowtime,.hmusic>.con>.right>.alltime {\r\n\tdisplay:inline-block;\r\n\tfont-size:.6em\r\n}\r\n.hmusic>.con .sound {\r\n\tposition:absolute;\r\n\tbottom:2px;\r\n\tright:24px;\r\n\tz-index:10\r\n}\r\n.hmusic>.con .sound>.icon-yinliang {\r\n\tfont-size:1em\r\n}\r\n.hmusic>.con .xunhuan {\r\n\tfont-size:.9em;\r\n\tposition:absolute;\r\n\tbottom:1px;\r\n\tright:4px\r\n}\r\n.hmusic>.longarr {\r\n\twidth:100%;\r\n\toverflow-x:hidden;\r\n\toverflow-y:auto;\r\n\theight:260px;\r\n\tbackground-color:#fafafa\r\n}\r\n.hmusic>.longarr>li {\r\n\twhite-space:nowrap;\r\n\tpadding:3px 0 3px 20px;\r\n\tcursor:pointer;\r\n\tcolor: #434343;\r\n}\r\n.hmusic>.longarr>li:hover {\r\n\tpadding:3px 0 3px 24px;\r\n\tbackground-color:hsla(0,0%,69%,.9)\r\n}\r\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);