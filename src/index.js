import html from './html.js';
require('./style.css');
//播放网易云歌单

class Hmusic{
  constructor(warp, list){
		let hmele=html.html();
		warp.innerHTML=hmele;
		this.warp=warp;
		this.nowduan=0;
		this.volume=1;
		this.nowlrc=-1;
		this.longarr='';
		
		//歌单播放
		if(list.playlist){
			let arr=new Array;
			let api='https://t5.haotown.cn/yunmusic/';
			let	xmlhttp=new XMLHttpRequest();
			let obj=new Object;
			xmlhttp.onreadystatechange=() => {
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					let t=JSON.parse(xmlhttp.responseText).playlist.tracks;
					  for (let i = 0; i < t.length; i++) {
			            	let c=new Object;
			            	let au='';
			            	c.yunid=t[i].id;
			            	c.img=t[i].al.picUrl;
			            	c.lrc=`${api}/?type=lyric&id=${c.yunid}&br=128000`;
			            	if(t[i].ar.length>4){
				               au='群星';
				               c.title=t[i].al.name;
				            }else{
				                for (let x = 0; x < t[i].ar.length; x++) {
				                    au+=t[i].ar[x].name
				                }
				                c.title=`${t[i].name}-${au}`;
				            }
				            arr.push(c);
			            }
					 this.p=arr;
					 this.init()
				}
			}
			xmlhttp.open("GET",`${api}/?type=playlist&id=${list.playlist}&br=128000`,true);
			xmlhttp.send();
		}else{
			this.p=list;
			this.init()
		}
		
	

  }
  
   init() {
   		let _this=this;
   		let warp=this.warp;
   		function $c(c){return warp.querySelector(c)};
   		this.e={"audiowarp":$c('.hmusic'),
			"audio":$c('.hmusic>.hm-audio'),
			"banner":$c('.banner'),
      "bannerimg":$c('.banner-img'),
			"btnplay":$c('.icon-play'),
			"btnstop":$c('.icon-stop'),
			"title":$c('.songname'),
			"btnx":$c('.icon-x'),
			"btns":$c('.icon-s'),
			"wranger":$c('.ranger'),
			"nrange":$c('.ranger-n'),
			"nowtime":$c('.nowtime'),
			"alltime":$c('.alltime'),
			"lrc":$c('.lrc'),
			"x1":$c('.icon-xunhuan'),
			"x2":$c('.icon-ttpodicon'),
			"longarr":$c('.longarr'),
			"sbtn":$c('.icon-yinliang'),
			"wsound":$c('.sound-ranger'),
			"msound":$c('.sound'),
			"sounda":$c('.sound-ranger-a'),
			"soundb":$c('.sound-ranger-b')
			}
   		this.e.btnplay.addEventListener('click',() => {
			_this.play();
		});
		
		this.e.btnstop.addEventListener('click',() => {
			_this.pause();
		});

		
		this.e.wranger.addEventListener('mousedown',function(event){
			let e = event || window.event || arguments.callee.caller.arguments[0];
			let xbl = show_coords(e, this);
			_this.settime(xbl.xbl*_this.alltime);
		});
		
		function show_coords(event, elem) {
	        let x = event.clientX - getLeft(elem)+window.scrollX;
	        let y = event.clientY - getTop(elem)+window.scrollY;
	        let xbl = x / elem.offsetWidth;
	        let ybl =1- y /elem.offsetHeight;
	        return {
	            x,
	            y,
	            w:elem.offsetWidth,
	            h:elem.offsetHeight,
	            xbl,
	            ybl
	        };
	    }
		//获取元素的纵坐标（相对于窗口）
	    function getTop(e) {
	        let offset = e.offsetTop;
	        if (e.offsetParent != null) offset += getTop(e.offsetParent);
	        return offset;
	    }
	    //获取元素的横坐标（相对于窗口）
	    function getLeft(e) {
	        let offset = e.offsetLeft;
	        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
	        return offset;
	    }

	   	this.e.bannerimg.onerror=function(){
	   		this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NERBQjhBNjc1NTY2MTFFN0FFOTRDOUEyOTY1QTcwNkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NERBQjhBNjg1NTY2MTFFN0FFOTRDOUEyOTY1QTcwNkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0REFCOEE2NTU1NjYxMUU3QUU5NEM5QTI5NjVBNzA2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0REFCOEE2NjU1NjYxMUU3QUU5NEM5QTI5NjVBNzA2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poji3VcAAAAGUExURf///wAAAFXC034AAAABdFJOUwBA5thmAAAADElEQVR42mJgAAgwAAACAAFPbVnhAAAAAElFTkSuQmCC";
	   	};
	   	this.e.btnx.addEventListener('click',() => {
	   		_this.to(_this.nowduan+1);
	   	})
		this.e.btns.addEventListener('click',() => {
			_this.to(_this.nowduan-1);
		})
		this.e.x1.addEventListener('click',function(){
			this.style.display='none';
			_this.e.x2.style.display='block';
		})
		this.e.x2.addEventListener('click',function(){
			this.style.display='none';
			_this.e.x1.style.display='block';
		})
		this.e.wsound.addEventListener('click',function(event){
			let e = event || window.event || arguments.callee.caller.arguments[0];
			let bl = show_coords(e,this);
			_this.e.soundb.style.height=`${bl.h*bl.ybl}px`;
			_this.changersound(bl.ybl);
		})

		this.e.msound.addEventListener('mouseover',() => {
			_this.e.wsound.style.display='block';
		})
		this.e.msound.addEventListener('mouseleave',() => {
			_this.e.wsound.style.display='none';
		})
		this.to(0,true);
		
		this.e.audio.addEventListener("durationchange",function(){
			_this.getalltime();
		})
		
		this.e.audio.addEventListener("timeupdate",function(){
			_this.timeup();
		});
		
		
		for (let i = 0; i < this.p.length; i++) {
	   		let e=document.createElement('li');
	   		e.innerHTML=this.p[i].title;
	   		e.songid=i;
	   		if(i==0){
	  			e.style.backgroundColor='rgba(49, 155, 211, 0.33)';
	  		}
	  		this.e.longarr.appendChild(e);
			e.addEventListener('click',function(){
				_this.to(this.songid);
			})
	   	}
   	
   }
  		
  		
  		play(){
			
			this.e.btnplay.style.display='none';
			this.e.btnstop.style.display='inline-block';
			if(this.e.audio.paused){
				this.e.audio.play()
			}
		}
  		getnowmusic(){this.p[this.nowduan]}
  		pause(){
			this.e.btnplay.style.display='inline-block';
			this.e.btnstop.style.display='none';
			this.e.audio.pause();
		}

		playswitch(){
			if(this.e.btnplay.style.display!=='none'){
				this.play()
			}else{
				this.pause()
			}
		}
		
		settime(t){
			if(this.e.lrcarr[this.nowlrc]){
				this.e.lrcarr[this.nowlrc].className=' ';
			}
			this.e.audio.currentTime=t;
			let getvtime=this.getvtime;
			this.e.nrange.style.width=`${this.e.audio.currentTime/this.alltime*100}%`;
			this.e.nowtime.innerHTML=`${getvtime(this.e.audio.currentTime).m}:${getvtime(this.e.audio.currentTime).s}`;
			for (let i = 0; i < this.lrc.b.length; i++) {
				if(t*10<=this.lrc.b[i]){
					this.nowlrc=i;
					let t2=50-this.nowlrc*30;
					this.e.lrc.style.transform=`translateY(${t2}px)`;
					this.e.lrcarr[this.nowlrc].className='nowlrcp';
					//console.log('nowduan切换为:'+i)
					break
				}	
			}
			this.getalltime()
		}
		addmusic(obj) {
	   		this.p.push(obj);
	   		let e=document.createElement('li');
	   		e.innerHTML=obj.title;
	   		e.songid=this.p.length-1;
	  		this.e.longarr.appendChild(e);
			e.addEventListener('click',function(){
				this.to(this.songid);
			})
	   	}
		changersound(i) {
			this.e.audio.volume=i;
			this.volume=i;
		}
		getlrc(url) {
	    	let	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=() => {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						let t;
						this.lrc=new Object;
						this.lrc.b=new Array;
						this.lrc.c=new Array;
						this.lrc.d='';
						try{
						  t=JSON.parse(xmlhttp.responseText).lrc.lyric;
						}catch(e){
							t='[00:00.72]歌词不存在'
						}
						this.parseLyric(t);
						this.lrc.a=this.parseLyric(t);
						for(let i in this.lrc.a){
					        if (this.lrc.a.hasOwnProperty(i)) {
					            this.lrc.b.push(i);
					            if(!this.lrc.a[i]){
					            	this.lrc.c.push('&nbsp;')
					            }else{
					            	this.lrc.c.push(this.lrc.a[i])
					            } 
					        };
					    }
						for (let i = 0; i < this.lrc.c.length; i++) {
							this.lrc.d=`${this.lrc.d}<p>${this.lrc.c[i]}</p>`;
						}
						this.e.lrc.innerHTML=this.lrc.d;
						this.e.lrcarr=this.e.lrc.querySelectorAll('p');
					}
				}
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
	    }
		loadmusic(stop) {
	   		let picsize=`?param=${this.e.banner.offsetWidth}y${this.e.banner.offsetHeight}`
	   	   	this.e.bannerimg.src=`${this.p[this.nowduan].img}?param=${picsize}`;
			this.getlrc(this.p[this.nowduan].lrc);
			if(!stop&&this.e.audio.paused){
				this.e.audio.play();
				this.e.btnplay.style.display='none';
				this.e.btnstop.style.display='inline-block';
			}
			this.e.audio.onended=() => {
				if(this.e.x2.style.display=='none'){
					this.to(this.nowduan+1);
				}else{
					try{this.e.audio.play()}
					catch(e){}
					this.nowlrc=-1;
				}
			};
			let _this=this
			this.e.audio.addEventListener('timeupdate',c => {
			let t=_this.e.audio.currentTime.toFixed(1)*10;
			if(_this.lrc){
				if(_this.lrc.b[_this.nowlrc+1]<=t){
					++_this.nowlrc;
					let t2=50-_this.nowlrc*30;
					_this.e.lrc.style.transform=`translateY(${t2}px)`;
					_this.e.lrcarr[_this.nowlrc].className='nowlrcp';
					if(_this.e.lrcarr[_this.nowlrc-1]){
						_this.e.lrcarr[_this.nowlrc-1].className=' ';
					}
					
				}
			}
			
		})
	   	}
		
		to(duan, stop){
	    	if(this.p[duan]){
	    		this.e.audio.currentTime=0;
	    		if(!this.e.audio.paused){
	    			this.e.audio.pause()
	    		}
	    		this.e.audio.remove();
	    		this.e.audio=document.createElement('audio');
	    		this.e.audio.className='hm-audio';
	    		this.e.audiowarp.appendChild(this.e.audio);
	    		this.e.nrange.style.width='0px';
	    		this.nowduan=duan;
	    		this.nowlrc=-1;
	    		this.e.lrc.style.transform='translateY(60px)';
	    		this.e.title.innerHTML=this.p[this.nowduan].title;
	    		if(this.p[this.nowduan].yunid){
	    			this.getcloudurl(`https://t5.haotown.cn/yunmusic/?type=song&id=${this.p[this.nowduan].yunid}&br=128000`,stop,this.loadmusic(stop));
	    		}else{
	    			this.e.audio.src=this.p[this.nowduan].audio;
	    			this.loadmusic(stop);
	    		}
				let li=this.e.longarr.querySelectorAll('li');
				for (let i = 0; i < li.length; i++) {
					li[i].style.backgroundColor='transparent';
					if(duan==i){
						li[i].style.backgroundColor='rgba(49, 155, 211, 0.33)';
					}
				}
	    	}else if(duan<0){
	    		this.to(this.p.length-1);
	    	}else{
	    		this.to(0)
	    	}
	    	this.changersound(this.volume);
	    	let _this=this;
	    	this.e.audio.addEventListener("durationchange",function(){
					_this.getalltime()
				})
	    }
		
		getalltime(){
				this.alltime=this.e.audio.duration;
				this.e.alltime.innerHTML=`${this.getvtime(this.alltime).m}:${this.getvtime(this.alltime).s}`;
		}
		getvtime(time) {
	        let tm;
	        let m = parseInt(time / 60);
	        if (parseInt(time % 60) >= 10) {
	            tm = parseInt(time % 60);
	        } else {
	            tm = `0${parseInt(time % 60)}`;
	        }
	        return {
	            m,
	            s:tm
	        };
	    }
		
		timeup() {
			this.e.nrange.style.width=`${this.e.audio.currentTime/this.alltime*100}%`;
			this.e.nowtime.innerHTML=`${this.getvtime(this.e.audio.currentTime).m}:${this.getvtime(this.e.audio.currentTime).s}`;
		}
		
		parseLyric(lrc){
	    	//console.log(lrc);
		    let lyrics = lrc.split("\n");
		    let lrcObj = {};
		    for(let i=0;i<lyrics.length;i++){
		        let lyric = decodeURIComponent(lyrics[i]);
		        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		        let timeRegExpArr = lyric.match(timeReg);
		        if(!timeRegExpArr)continue;
		        let clause = lyric.replace(timeReg,'');
		        for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
                    let t = timeRegExpArr[k];
                    let min = Number(String(t.match(/\[\d*/i)).slice(1));
                    let sec = Number(String(t.match(/\:\d*\.*\d*/i)).slice(1));
                    let time = (min * 60 + sec).toFixed(1)*10;
                    lrcObj[time] = clause;
                }
		    }
		    return lrcObj;
		}
		getcloudurl(url, stop, callback){
	    	let	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=() => {
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						let t=JSON.parse(xmlhttp.responseText);
						this.e.audio.src=t.data[0].url;
						if(!stop&&this.e.audio.paused){this.e.audio.play();}
						if (typeof callback === "function"){
					        callback()
					    }
						
					}
				}
	    		xmlhttp.open("GET",url,true);
				xmlhttp.send();
	    }
		
		
}
window.Hmusic = Hmusic;

