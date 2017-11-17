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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html = __webpack_require__(1);

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);
//播放网易云歌单

var Hmusic = function () {
	function Hmusic(warp, list) {
		var _this2 = this;

		_classCallCheck(this, Hmusic);

		var hmele = _html2.default.html();
		warp.innerHTML = hmele;
		this.warp = warp;
		this.nowduan = 0;
		this.volume = 1;
		this.nowlrc = -1;
		this.longarr = '';

		//歌单播放
		if (list.playlist) {
			var arr = new Array();
			var api = 'https://t5.haotown.cn/yunmusic/';
			var xmlhttp = new XMLHttpRequest();
			var obj = new Object();
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
						arr.push(c);
					}
					_this2.p = arr;
					_this2.init();
				}
			};
			xmlhttp.open("GET", api + '/?type=playlist&id=' + list.playlist + '&br=128000', true);
			xmlhttp.send();
		} else {
			this.p = list;
			this.init();
		}
	}

	_createClass(Hmusic, [{
		key: 'init',
		value: function init() {
			var _this = this;
			var warp = this.warp;
			function $c(c) {
				return warp.querySelector(c);
			};
			this.e = { "audiowarp": $c('.hmusic'),
				"audio": $c('.hmusic>.hm-audio'),
				"banner": $c('.banner'),
				"bannerimg": $c('.banner-img'),
				"btnplay": $c('.icon-play'),
				"btnstop": $c('.icon-stop'),
				"title": $c('.songname'),
				"btnx": $c('.icon-x'),
				"btns": $c('.icon-s'),
				"wranger": $c('.ranger'),
				"nrange": $c('.ranger-n'),
				"nowtime": $c('.nowtime'),
				"alltime": $c('.alltime'),
				"lrc": $c('.lrc'),
				"x1": $c('.icon-xunhuan'),
				"x2": $c('.icon-ttpodicon'),
				"longarr": $c('.longarr'),
				"sbtn": $c('.icon-yinliang'),
				"wsound": $c('.sound-ranger'),
				"msound": $c('.sound'),
				"sounda": $c('.sound-ranger-a'),
				"soundb": $c('.sound-ranger-b')
			};
			this.e.btnplay.addEventListener('click', function () {
				_this.play();
			});

			this.e.btnstop.addEventListener('click', function () {
				_this.pause();
			});

			this.e.wranger.addEventListener('mousedown', function (event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				var xbl = show_coords(e, this);
				_this.settime(xbl.xbl * _this.alltime);
			});

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

			this.e.bannerimg.onerror = function () {
				this.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NERBQjhBNjc1NTY2MTFFN0FFOTRDOUEyOTY1QTcwNkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NERBQjhBNjg1NTY2MTFFN0FFOTRDOUEyOTY1QTcwNkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0REFCOEE2NTU1NjYxMUU3QUU5NEM5QTI5NjVBNzA2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0REFCOEE2NjU1NjYxMUU3QUU5NEM5QTI5NjVBNzA2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poji3VcAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC";
			};
			this.e.btnx.addEventListener('click', function () {
				_this.to(_this.nowduan + 1);
			});
			this.e.btns.addEventListener('click', function () {
				_this.to(_this.nowduan - 1);
			});
			this.e.x1.addEventListener('click', function () {
				this.style.display = 'none';
				_this.e.x2.style.display = 'block';
			});
			this.e.x2.addEventListener('click', function () {
				this.style.display = 'none';
				_this.e.x1.style.display = 'block';
			});
			this.e.wsound.addEventListener('click', function (event) {
				var e = event || window.event || arguments.callee.caller.arguments[0];
				var bl = show_coords(e, this);
				_this.e.soundb.style.height = bl.h * bl.ybl + 'px';
				_this.changersound(bl.ybl);
			});

			this.e.msound.addEventListener('mouseover', function () {
				_this.e.wsound.style.display = 'block';
			});
			this.e.msound.addEventListener('mouseleave', function () {
				_this.e.wsound.style.display = 'none';
			});
			this.to(0, true);

			this.e.audio.addEventListener("durationchange", function () {
				_this.getalltime();
			});

			this.e.audio.addEventListener("timeupdate", function () {
				_this.timeup();
			});

			for (var i = 0; i < this.p.length; i++) {
				var e = document.createElement('li');
				e.innerHTML = this.p[i].title;
				e.songid = i;
				if (i == 0) {
					e.style.backgroundColor = 'rgba(49, 155, 211, 0.33)';
				}
				this.e.longarr.appendChild(e);
				e.addEventListener('click', function () {
					_this.to(this.songid);
				});
			}
		}
	}, {
		key: 'play',
		value: function play() {

			this.e.btnplay.style.display = 'none';
			this.e.btnstop.style.display = 'inline-block';
			if (this.e.audio.paused) {
				this.e.audio.play();
			}
		}
	}, {
		key: 'getnowmusic',
		value: function getnowmusic() {
			this.p[this.nowduan];
		}
	}, {
		key: 'pause',
		value: function pause() {
			this.e.btnplay.style.display = 'inline-block';
			this.e.btnstop.style.display = 'none';
			this.e.audio.pause();
		}
	}, {
		key: 'playswitch',
		value: function playswitch() {
			if (this.e.btnplay.style.display !== 'none') {
				this.play();
			} else {
				this.pause();
			}
		}
	}, {
		key: 'settime',
		value: function settime(t) {
			if (this.e.lrcarr[this.nowlrc]) {
				this.e.lrcarr[this.nowlrc].className = ' ';
			}
			this.e.audio.currentTime = t;
			var getvtime = this.getvtime;
			this.e.nrange.style.width = this.e.audio.currentTime / this.alltime * 100 + '%';
			this.e.nowtime.innerHTML = getvtime(this.e.audio.currentTime).m + ':' + getvtime(this.e.audio.currentTime).s;
			for (var i = 0; i < this.lrc.b.length; i++) {
				if (t * 10 <= this.lrc.b[i]) {
					this.nowlrc = i;
					var t2 = 50 - this.nowlrc * 30;
					this.e.lrc.style.transform = 'translateY(' + t2 + 'px)';
					this.e.lrcarr[this.nowlrc].className = 'nowlrcp';
					//console.log('nowduan切换为:'+i)
					break;
				}
			}
			this.getalltime();
		}
	}, {
		key: 'addmusic',
		value: function addmusic(obj) {
			this.p.push(obj);
			var e = document.createElement('li');
			e.innerHTML = obj.title;
			e.songid = this.p.length - 1;
			this.e.longarr.appendChild(e);
			e.addEventListener('click', function () {
				this.to(this.songid);
			});
		}
	}, {
		key: 'changersound',
		value: function changersound(i) {
			this.e.audio.volume = i;
			this.volume = i;
		}
	}, {
		key: 'getlrc',
		value: function getlrc(url) {
			var _this3 = this;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var t = void 0;
					_this3.lrc = new Object();
					_this3.lrc.b = new Array();
					_this3.lrc.c = new Array();
					_this3.lrc.d = '';
					try {
						t = JSON.parse(xmlhttp.responseText).lrc.lyric;
					} catch (e) {
						t = '[00:00.72]歌词不存在';
					}
					_this3.parseLyric(t);
					_this3.lrc.a = _this3.parseLyric(t);
					for (var i in _this3.lrc.a) {
						if (_this3.lrc.a.hasOwnProperty(i)) {
							_this3.lrc.b.push(i);
							if (!_this3.lrc.a[i]) {
								_this3.lrc.c.push('&nbsp;');
							} else {
								_this3.lrc.c.push(_this3.lrc.a[i]);
							}
						};
					}
					for (var _i = 0; _i < _this3.lrc.c.length; _i++) {
						_this3.lrc.d = _this3.lrc.d + '<p>' + _this3.lrc.c[_i] + '</p>';
					}
					_this3.e.lrc.innerHTML = _this3.lrc.d;
					_this3.e.lrcarr = _this3.e.lrc.querySelectorAll('p');
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}
	}, {
		key: 'loadmusic',
		value: function loadmusic(stop) {
			var _this4 = this;

			var picsize = '?param=' + this.e.banner.offsetWidth + 'y' + this.e.banner.offsetHeight;
			this.e.bannerimg.src = this.p[this.nowduan].img + '?param=' + picsize;
			this.getlrc(this.p[this.nowduan].lrc);
			if (!stop && this.e.audio.paused) {
				this.e.audio.play();
				this.e.btnplay.style.display = 'none';
				this.e.btnstop.style.display = 'inline-block';
			}
			this.e.audio.onended = function () {
				if (_this4.e.x2.style.display == 'none') {
					_this4.to(_this4.nowduan + 1);
				} else {
					try {
						_this4.e.audio.play();
					} catch (e) {}
					_this4.nowlrc = -1;
				}
			};
			var _this = this;
			this.e.audio.addEventListener('timeupdate', function (c) {
				var t = _this.e.audio.currentTime.toFixed(1) * 10;
				if (_this.lrc) {
					if (_this.lrc.b[_this.nowlrc + 1] <= t) {
						++_this.nowlrc;
						var t2 = 50 - _this.nowlrc * 30;
						_this.e.lrc.style.transform = 'translateY(' + t2 + 'px)';
						_this.e.lrcarr[_this.nowlrc].className = 'nowlrcp';
						if (_this.e.lrcarr[_this.nowlrc - 1]) {
							_this.e.lrcarr[_this.nowlrc - 1].className = ' ';
						}
					}
				}
			});
		}
	}, {
		key: 'to',
		value: function to(duan, stop) {
			if (this.p[duan]) {
				this.e.audio.currentTime = 0;
				if (!this.e.audio.paused) {
					this.e.audio.pause();
				}
				this.e.audio.remove();
				this.e.audio = document.createElement('audio');
				this.e.audio.className = 'hm-audio';
				this.e.audiowarp.appendChild(this.e.audio);
				this.e.nrange.style.width = '0px';
				this.nowduan = duan;
				this.nowlrc = -1;
				this.e.lrc.style.transform = 'translateY(60px)';
				this.e.title.innerHTML = this.p[this.nowduan].title;
				if (this.p[this.nowduan].yunid) {
					this.getcloudurl('https://t5.haotown.cn/yunmusic/?type=song&id=' + this.p[this.nowduan].yunid + '&br=128000', stop, this.loadmusic(stop));
				} else {
					this.e.audio.src = this.p[this.nowduan].audio;
					this.loadmusic(stop);
				}
				var li = this.e.longarr.querySelectorAll('li');
				for (var i = 0; i < li.length; i++) {
					li[i].style.backgroundColor = 'transparent';
					if (duan == i) {
						li[i].style.backgroundColor = 'rgba(49, 155, 211, 0.33)';
					}
				}
			} else if (duan < 0) {
				this.to(this.p.length - 1);
			} else {
				this.to(0);
			}
			this.changersound(this.volume);
			var _this = this;
			this.e.audio.addEventListener("durationchange", function () {
				_this.getalltime();
			});
		}
	}, {
		key: 'getalltime',
		value: function getalltime() {
			this.alltime = this.e.audio.duration;
			this.e.alltime.innerHTML = this.getvtime(this.alltime).m + ':' + this.getvtime(this.alltime).s;
		}
	}, {
		key: 'getvtime',
		value: function getvtime(time) {
			var tm = void 0;
			var m = parseInt(time / 60);
			if (parseInt(time % 60) >= 10) {
				tm = parseInt(time % 60);
			} else {
				tm = '0' + parseInt(time % 60);
			}
			return {
				m: m,
				s: tm
			};
		}
	}, {
		key: 'timeup',
		value: function timeup() {
			this.e.nrange.style.width = this.e.audio.currentTime / this.alltime * 100 + '%';
			this.e.nowtime.innerHTML = this.getvtime(this.e.audio.currentTime).m + ':' + this.getvtime(this.e.audio.currentTime).s;
		}
	}, {
		key: 'parseLyric',
		value: function parseLyric(lrc) {
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
					var min = Number(String(t.match(/\[\d*/i)).slice(1));
					var sec = Number(String(t.match(/\:\d*\.*\d*/i)).slice(1));
					var time = (min * 60 + sec).toFixed(1) * 10;
					lrcObj[time] = clause;
				}
			}
			return lrcObj;
		}
	}, {
		key: 'getcloudurl',
		value: function getcloudurl(url, stop, callback) {
			var _this5 = this;

			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var t = JSON.parse(xmlhttp.responseText);
					_this5.e.audio.src = t.data[0].url;
					if (!stop && _this5.e.audio.paused) {
						_this5.e.audio.play();
					}
					if (typeof callback === "function") {
						callback();
					}
				}
			};
			xmlhttp.open("GET", url, true);
			xmlhttp.send();
		}
	}]);

	return Hmusic;
}();

window.Hmusic = Hmusic;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Hmusic.
 @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
 @license  The Star And Thank Author License (SATA)
 */
module.exports = {
  html: function html() {
    return "<div class=\"hmusic\">\n  <audio class=\"hm-audio\"></audio>\n  <div class=\"banner\">\n      <div class=\"songname\"></div>\n      <div class=\"lrc-warp\">\n        <div class=\"lrc\"></div>\n      </div>\n      <div class=\"ranger\">\n        <div class=\"ranger-n\"></div>\n      </div>\n      <img class=\"banner-img\">\n      <div class=\"banner-color\"></div>\n  </div>\n  <div class=\"con\">\n    <div class=\"left\">\n      <div class=\"nowtime\">0:00</div>\n    </div>\n    <i class=\"iconfont icon-s\"></i>\n    <i class=\"iconfont icon-play\"></i>\n    <i class=\"iconfont icon-stop\" style=\"display: none;\"></i>\n    <i class=\"iconfont icon-x\"></i>\n    <div class=\"right\">\n      <div class=\"sound\">\n        <div class=\"sound-ranger\">\n          <div class=\"sound-ranger-a\">\n            <div class=\"sound-ranger-b\"></div>\n          </div>\n        </div>\n        <i class=\"iconfont icon-yinliang\"></i>\n      </div>\n      <i class=\"iconfont icon-xunhuan xunhuan\"></i>\n      <i class=\"iconfont icon-ttpodicon xunhuan\" style=\"display: none;\"></i>\n      <div class=\"alltime\">1:00</div></div>\n  </div>\n  <div class=\"longarr\"></div>\n  <style type=\"text/css\" class=\"css\"></style>\n</div>";
  }
};

/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "\r\n@font-face {font-family: \"iconfont\";\r\n  src: url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060'); /* IE9*/\r\n  src: url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.eot?t=1494255783060#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.woff?t=1494255783060') format('woff'), /* chrome, firefox */\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.ttf?t=1494255783060') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/\r\n  url('https://at.alicdn.com/t/font_dx3vz7ez48udte29.svg?t=1494255783060#iconfont') format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family:\"iconfont\" !important;\r\n  font-size:16px;\r\n  font-style:normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-play:before { content: \"\\E633\"; }\r\n\r\n.icon-yinliang:before { content: \"\\E60A\"; }\r\n\r\n.icon-ttpodicon:before { content: \"\\E6BD\"; }\r\n\r\n.icon-s:before { content: \"\\E61E\"; }\r\n\r\n.icon-x:before { content: \"\\E620\"; }\r\n\r\n.icon-xunhuan:before { content: \"\\E605\"; }\r\n\r\n.icon-stop:before { content: \"\\E669\"; }\r\n\r\n.hmusic {\r\n\tfont-size:16px;\r\n\theight:500px;\r\n\tbox-shadow:0 3px 8px rgba(0, 0, 0, .25);\r\n\tfont-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif;\r\n\tborder-radius: 6px;\r\n    overflow: hidden;\r\n}\r\n\r\n.hmusic>.banner {\r\n\tposition: relative;\r\n\theight:200px;\r\n\toverflow:hidden;\r\n\tbackground-color:rgba(0,0,0,.3);\r\n\tcolor:#fff\r\n}\r\n.hmusic>.banner>.songname {\r\n\tposition: relative;\r\n\tpadding-top:5px;\r\n\theight:25px;\r\n\ttext-align:center;\r\n\tfont-size:1.2em;\r\n\twhite-space:nowrap;\r\n\tz-index: 4\r\n}\r\n.hmusic>.banner>.lrc-warp {\r\n\tposition: relative;\r\n\toverflow:hidden;\r\n\theight:10pc;\r\n\tz-index: 4\r\n}\r\n.hmusic>.banner>.lrc-warp>.lrc {\r\n\ttext-align:center;\r\n\ttransition:all .3s ease-out;\r\n\ttransform:translateY(-10px)\r\n}\r\n.hmusic>.banner>.lrc-warp>.lrc>p {\r\n\twhite-space:nowrap;\r\n\tmargin:0;\r\n\tpadding:0;\r\n\tline-height:30px;\r\n\tfont-size:12px\r\n}\r\n.hmusic>.banner>.lrc-warp>.lrc>.nowlrcp {\r\n\tfont-size:24px;\r\n\twhite-space:inherit;\r\n}\r\n.hmusic>.banner>.banner-img {\r\n\tposition: absolute;\r\n\theight: auto;\r\n    width: 100%;\r\n    top: 0;\r\n    left: 0;\r\n\tbackground-position:center;\r\n\tbackground-size:cover;\r\n\tbackground-image: url(https://ooo.0o0.ooo/2017/06/20/59488f02d6903.jpg);\r\n\t-webkit-filter:saturate(1.4);\r\n\t-moz-filter:saturate(1.4);\r\n\tfilter:saturate(1.4);\r\n\tz-index: 2;\r\n}\r\n.hmusic>.banner>.banner-color{\r\n\tposition: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: rgba(0, 0, 0, 0.19);\r\n    z-index: 3;\r\n}\r\n.hmusic>.banner>.ranger {\r\n\tposition: relative;\r\n\tcursor:pointer;\r\n\theight:9pt;\r\n\tbackground-color:rgba(59,65,67,.39);\r\n\tz-index: 4;\r\n}\r\n.hmusic>.banner>.ranger>.ranger-n {\r\n\twidth:20%;\r\n\theight:100%;\r\n\tbackground-color:rgba(249, 73, 73, 0.6)\r\n}\r\n.hmusic>.con {\r\n\tposition: relative;\r\n\ttop:0px;\r\n\theight:40px;\r\n\ttext-align:center;\r\n\tuser-select:none\r\n}\r\n.hmusic>.con .sound-ranger {\r\n\theight:80px;\r\n\twidth:16px;\r\n\tbackground-color:rgba(255,255,255,.4);\r\n\tcursor:pointer;\r\n\tdisplay:none\r\n}\r\n.hmusic>.con .sound-ranger>.sound-ranger-a {\r\n\theight:100%;\r\n\tposition:relative\r\n}\r\n.hmusic>.con .sound-ranger>.sound-ranger-a>.sound-ranger-b {\r\n\theight:82px;\r\n\tposition:absolute;\r\n\twidth:100%;\r\n\tbottom:0;\r\n\tbackground-color:rgba(228, 99, 99, 0.92)\r\n}\r\n.hmusic>.con .iconfont {\r\n\tcolor:#E05865;\r\n\tfont-size:1.6em;\r\n\tcursor:pointer\r\n}\r\n.hmusic>.con .iconfont:hover {\r\n\tcolor:#F33838\r\n}\r\n.hmusic>.con>.icon-s,.hmusic>.con>.icon-x{\r\n\tfont-size: 2em;\r\n    line-height: 40px;\r\n    position: absolute;\r\n}\r\n.hmusic>.con>.icon-s{\r\n\tleft: 16%;\r\n}\r\n.hmusic>.con>.icon-x{\r\n\tright: 16%;\r\n}\r\n.hmusic>.con>.icon-play,.hmusic>.con>.icon-stop {\r\n\tposition:relative;\r\n\tfont-size:2em;\r\n\tline-height:40px;\r\n}\r\n.hmusic>.con>.right {\r\n\tfloat:right;\r\n\theight: 100%;\r\n\tpadding:0 4px;\r\n\tposition:relative\r\n}\r\n.hmusic>.con>.left {\r\n\tfloat:left;\r\n\tpadding:0 4px;\r\n\theight: 100%;\r\n\tposition:relative\r\n}\r\n.hmusic>.con>.left>.nowtime,.hmusic>.con>.right>.alltime {\r\n\tdisplay:inline-block;\r\n\tfont-size:.6em\r\n}\r\n.hmusic>.con .sound {\r\n\tposition:absolute;\r\n\tbottom:2px;\r\n\tright:24px;\r\n\tz-index:10\r\n}\r\n.hmusic>.con .sound>.icon-yinliang {\r\n\tfont-size:1em\r\n}\r\n.hmusic>.con .xunhuan {\r\n\tfont-size:.9em;\r\n\tposition:absolute;\r\n\tbottom:1px;\r\n\tright:4px\r\n}\r\n.hmusic>.longarr {\r\n\twidth:100%;\r\n\toverflow-x:hidden;\r\n\toverflow-y:auto;\r\n\theight:260px;\r\n\tbackground-color:#fafafa\r\n}\r\n.hmusic>.longarr>li {\r\n\twhite-space:nowrap;\r\n\tpadding:3px 0 3px 20px;\r\n\tcursor:pointer;\r\n\tcolor: #434343;\r\n}\r\n.hmusic>.longarr>li:hover {\r\n\tpadding:3px 0 3px 24px;\r\n\tbackground-color:hsla(0,0%,69%,.9)\r\n}\r\n/*滚动条*/\r\n.longarr::-webkit-scrollbar-track\r\n{\r\n    border-radius: 10px;\r\n    background-color: rgba(19, 19, 19, 0.04);\r\n}\r\n\r\n.longarr::-webkit-scrollbar\r\n{\r\n    width: 6px;\r\n    background-color: #F5F5F5;\r\n}\r\n\r\n.longarr::-webkit-scrollbar-thumb\r\n{\r\n\t  border-radius: 10px;\r\n    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);\r\n    background-color: rgba(245, 50, 50, 0.67);\r\n}", ""]);

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