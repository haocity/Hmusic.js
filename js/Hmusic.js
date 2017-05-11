var e='.warp{margin:0 auto;width:340px}.hmusic{font-size: 16px;height:500px;box-shadow:0 0 5px rgba(0,0,0,.8);font-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif}.hmusic>.banner{height:200px;background-image:url(1.jpg);background-position:center;background-size:cover}.hmusic>.banner>.banner-zz{overflow:hidden;height:100%;background-color:rgba(0,0,0,.4);color:#fff}.hmusic>.banner>.banner-zz>.songname{padding-top:5px;height:25px;text-align:center;font-size:1.2em;white-space:nowrap}.hmusic>.banner>.banner-zz>.lrc-warp{overflow:hidden;height:10pc}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc{text-align:center;transition:all .3s ease-out;transform:translateY(-10px)}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>p{white-space: nowrap;margin:0;padding:0;line-height:30px;font-size:12px}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>.nowlrcp{font-size:24px;white-space: inherit;}.hmusic>.banner>.banner-zz>.ranger{cursor: pointer;height:9pt;background-color:rgba(59,65,67,.39)}.hmusic>.banner>.banner-zz>.ranger>.ranger-n{width:20%;height:100%;background-color:rgba(3,169,244,.6)}.hmusic>.con{height:40px;text-align:center;user-select:none}.hmusic>.con .sound-ranger{height:80px;width:16px;background-color:rgba(255,255,255,.4);cursor:pointer;display:none}.hmusic>.con .sound-ranger>.sound-ranger-a{height:100%}.hmusic>.con .sound-ranger>.sound-ranger-a>.sound-ranger-b{height:82px;position:absolute;width:100%;bottom:18px;background-color:#6D95E0}.hmusic>.con .iconfont{color:#6d95e0;font-size:1.6em;cursor:pointer}.hmusic>.con .iconfont:hover{color:#2753af}.hmusic>.con>.icon-play,.hmusic>.con>.icon-stop{position:relative;font-size:2em;line-height:40px;}.hmusic>.con>.right{float:right;padding:0 4px;position:relative}.hmusic>.con>.left{float:left;padding:0 4px;position:relative}.hmusic>.con>.left>.nowtime,.hmusic>.con>.right>.alltime{position:relative;top:-1pc;display:inline-block;font-size:.6em}.hmusic>.con>.right>.icon-x{padding-right:30px;line-height:1.6em}.hmusic>.con>.left>.icon-s{padding-left:30px;line-height:1.6em}.hmusic>.con .sound{position:absolute;bottom:2px;right:24px;z-index:10}.hmusic>.con .sound>.icon-yinliang{font-size:1em}.hmusic>.con .xunhuan{font-size:.9em;position:absolute;bottom:1px;right:4px}.hmusic>.longarr{width:100%;overflow-x:hidden;overflow-y:auto;height:260px;background-color:#fafafa}.hmusic>.longarr>li{white-space:nowrap;padding:3px 0 3px 20px;cursor:pointer}.hmusic>.longarr>li:hover{padding:3px 0 3px 24px;background-color:hsla(0,0%,69%,.9)}';
var e2= document.createElement('style');
e2.type="text/css";
e2.innerHTML=e;
document.head.appendChild(e2);
var fontcss='https://at.alicdn.com/t/font_dx3vz7ez48udte29.css';
var e3=document.createElement('link');
e3.type='text/css';
e3.rel='stylesheet';
e3.href=fontcss;
document.head.appendChild(e3);
//ajax
var gc = gc || {};
gc.ajax = function(options){//options =  {url:'',method:'',data:'',success:'',async:''}
    //默认参数
    options.url = options.url || '',
    options.method = options.method || 'get',
    options.data = options.data || '',
    options.success = options.success || '',
    options.error = options.error || function(e){console.log(e)},
    options.async = options.async || true;
    //get请求-拼接url
    console.log(options.method.toLowerCase());
    if(options.method.toLowerCase() == 'get'){
        if(typeof options.data == 'object'){
            options.data = [];
            for (var k in options.data){
                options.data.push(k+'='+options.data[k]);
                options.data.join('&');
            }
        }
        options.url += (options.url.indexOf('?' == -1) ? '?' : '') + options.data;
    }
    //post请求-转换字符串
    if(options.method.toLowerCase() == 'post'){
        if(typeof options.data == 'object'){
            var arrs = [];
            for (var k in options.data){
                arrs.push(k+'='+options.data[k]);
            }
            options.data = arrs.join('&');
        }
    }
    //创建发送请求
    var xhr = window.XMLHttpRequest ?  new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //兼容ie
    xhr.open(options.method,options.url,options.async);
    if(options.method == 'post'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(options.data);
    }else{
        xhr.send(null);
    }
    //异步请求
    if(options.async == true){
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
              callcall();
          }
        }
    }
    // xhr.abort(); // 取消异步请求
    //同步请求
    if(options.async == false){
        callcall();
    }
    //返回状态判断
    function callcall(){
        if(xhr.status == 200){
            options.success(xhr.responseText);
        }else{
            options.error('error:' + xhr.status + xhr.statusText);
        }
    }
};


function hyplaylist(ele,id){
	var yl=new Object;
	yl.ele=ele;
	yl.arr=new Array;
	 var api='https://api.imjad.cn/cloudmusic';
	 gc.ajax({
	        url:api+'/?type=playlist&id='+id+'&br=128000',
	        success:function(res){
	            t=JSON.parse(res).playlist.tracks;
	            for (var i = 0; i < t.length; i++) {
	            	var c=new Object;
	            	var au='';
	            	c.yunid=t[i].id;
	            	c.img=t[i].al.picUrl+'?param=320y320';
	            	c.lrc=api+'/?type=lyric&id='+c.yunid+'&br=128000';
	            	if(t[i].ar.length>4){
		               au='群星';
		               c.title=t[i].al.name;
		            }else{
		                for (var x = 0; x < t[i].ar.length; x++) {
		                    au+=t[i].ar[x].name
		                }
		                c.title=t[i].name+'-'+au;
		            }
		            yl.arr.push(c);
	            }
	            console.log('加载歌单成功 正在解析各个音频地址');
	            Hmusic(yl.ele,yl.arr);
	        }
	    });
	
}

function hyunmusic(ele,arr,one){
	var ym=new Object;
	ym.arr=arr;
	ym.ele=ele;
	ym.yuncloud=function(arr){
	    for (var i = 0; i < arr.length; i++) {
	       ym.getmusicutl(arr[i].yunid,i,one)
	    };
	}
	ym.getmusicutl=function(id,i,one){
	    var api='https://api.imjad.cn/cloudmusic';
	    ym.arr[i].lrc=api+'/?type=lyric&id='+id+'&br=128000';
	    gc.ajax({
	    url:api+'/?type=song&id='+id+'&br=128000',
	    success:function(res){
	        t=JSON.parse(res).data[0].url;
	        if(!ym.arr[i].audio){ym.arr[i].audio=t}
	        ym.checksuccess(ym.arr);
	    },
	    error:function(e){
	    	console.log(e);
	    }
	    });
	    if(!one){
	    	gc.ajax({
	        url:api+'/?type=detail&id='+id+'&br=128000',
	        success:function(res){
	            t=JSON.parse(res).songs[0];
	            var au='';
	            if(t.ar.length>4){
	               au='群星'
	            }else{
	                for (var x = 0; x < t.ar.length; x++) {
	                    au+=t.ar[x].name
	                }
	            }
	            ym.arr[i].img=t.al.picUrl+'?param=320y320';
	            ym.arr[i].au=au;
	            if(!ym.arr[i].title){
	            	ym.arr[i].title=t.name+'-'+ym.arr[i].au;
	            }
	            ym.checksuccess(ym.arr);
	        },
	        error:function(e){
	    	console.log(e);
	    	}
		    });
	    }

	}
	ym.checksuccess=function(arr){
		var t=0;
		for (var i = 0; i < arr.length; i++) {
			if(arr[i].img&&arr[i].audio&&arr[i].title) {t++;}
		}
		if(t==arr.length){
			console.log('yun music success');
			Hmusic(ym.ele,arr)
		}else{
			console.log('没有完成');
		}
	}
	ym.yuncloud(ym.arr);
}

function Hmusic(ele,arr){
		hm=new Object;
		function $c(c){return ele.querySelector(c)};
		var hmele='<div class="hmusic"><audio class="hm-audio"></audio><div class="banner"><div class="banner-zz"><div class="songname"></div><div class="lrc-warp"><div class="lrc"></div></div><div class="ranger"><div class="ranger-n"></div></div></div></div><div class="con"><div class="left"><div class="nowtime">0:00</div><i class="iconfont icon-s"></i></div><i class="iconfont icon-play"></i><i class="iconfont icon-stop" style="display: none;"></i><div class="right"><i class="iconfont icon-x"></i><div class="sound"><div class="sound-ranger"><div class="sound-ranger-a"><div class="sound-ranger-b"></div></div></div><i class="iconfont icon-yinliang"></i></div><i class="iconfont icon-xunhuan xunhuan"></i><i class="iconfont icon-ttpodicon xunhuan" style="display: none;"></i><div class="alltime">1:00</div></div></div><div class="longarr"></div><style type="text/css" class="css"></style></div>';
		ele.innerHTML=hmele;
		
		hm.e=new Object;
		hm.nowduan=0;
		hm.volume=1;
		hm.nowlrc=-1;
		hm.p=arr;//[{"title":"ACFUN次元之旅","audio":"1.wav","img":"1.jpg","lrc":"1.json"},{"title":"おちゃめ机能 -Full","audio":"2.mp3","img":"2.jpg","lrc":"2.json"}]
		hm.e.audio=$c('.hmusic>.hm-audio');
		hm.e.banner=$c('.banner');
		hm.e.btnplay=$c('.icon-play');
		hm.e.btnstop=$c('.icon-stop');
		hm.e.title=$c('.songname');
		hm.e.btnx=$c('.icon-x');
		hm.e.btns=$c('.icon-s');
		hm.e.wranger=$c('.ranger');
		hm.e.nrange=$c('.ranger-n');
		hm.e.nowtime=$c('.nowtime');
		hm.e.alltime=$c('.alltime');
		hm.e.lrc=$c('.lrc');
		hm.e.x1=$c('.icon-xunhuan');
		hm.e.x2=$c('.icon-ttpodicon');
		hm.e.longarr=$c('.longarr');
		hm.e.sbtn=$c('.icon-yinliang');
		hm.e.wsound=$c('.sound-ranger');
		hm.e.msound=$c('.sound');
		hm.e.sounda=$c('.sound-ranger-a');
		hm.e.soundb=$c('.sound-ranger-b');
		function getalltime(){
			if(hm.e.audio.duration>1){
				hm.alltime=hm.e.audio.duration;
				hm.e.alltime.innerHTML=getvtime(hm.alltime).m+':'+getvtime(hm.alltime).s;
			}else{
				setTimeout(getalltime,500)
			}
		}
		setTimeout(getalltime,500);
		hm.e.btnplay.addEventListener('click',function(){
			hm.play();
		});
		hm.e.btnstop.addEventListener('click',function(){
			hm.play();
		});
		hm.play=function(){
			if(hm.e.btnplay.style.display!=='none'){
				hm.e.btnplay.style.display='none';
				hm.e.btnstop.style.display='inline-block';
				hm.e.audio.play();
				console.log('play')
			}else{
				hm.e.btnplay.style.display='inline-block';
				hm.e.btnstop.style.display='none';
				hm.e.audio.pause();
				console.log('pause')
			}
		}
		
		hm.tiao=function(t){
			if(hm.e.lrcarr[hm.nowlrc]){
				hm.e.lrcarr[hm.nowlrc].className=' ';
			}
			hm.e.audio.currentTime=t;
			hm.e.nrange.style.width=hm.e.audio.currentTime/hm.alltime*100+'%';
			hm.e.nowtime.innerHTML=getvtime(hm.e.audio.currentTime).m+':'+getvtime(hm.e.audio.currentTime).s;
			for (var i = 0; i < hm.lrc.b.length; i++) {
				if(t*10<=hm.lrc.b[i]){
					hm.nowlrc=i;
					var t2=50-hm.nowlrc*30;
					hm.e.lrc.style.transform='translateY('+t2+'px)';
					hm.e.lrcarr[hm.nowlrc].className='nowlrcp';
					console.log('nowduan切换为:'+i)
					break
				}	
			}
			getalltime();
		}
		//定时器1s
		hm.interval1s=function(){
			hm.e.nrange.style.width=hm.e.audio.currentTime/hm.alltime*100+'%';
			hm.e.nowtime.innerHTML=getvtime(hm.e.audio.currentTime).m+':'+getvtime(hm.e.audio.currentTime).s;
		}
		setInterval(hm.interval1s,1000);
		hm.e.wranger.addEventListener('mousedown',function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			var xbl = show_coords(e, this);
			hm.tiao(xbl.xbl*hm.alltime);
		});
		function getvtime(time) {
	        var tm;
	        var m = parseInt(time / 60);
	        if (parseInt(time % 60) >= 10) {
	            tm = parseInt(time % 60);
	        } else {
	            tm = "0" + parseInt(time % 60);
	        }
	        return {
	            m:m,
	            s:tm
	        };
	    }
		function show_coords(event, elem) {
	        var x = event.clientX - getLeft(elem);
	        var y = event.clientY - getTop(elem);
	        var xbl = x / elem.offsetWidth;
	        var ybl =1- y / elem.offsetHeight;
	        return {
	            x:x,
	            y:y,
	            w:elem.offsetWidth,
	            h:elem.offsetHeight,
	            xbl:xbl,
	            ybl:ybl
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
	    hm.getcloudurl=function(url,stop){
	    	var	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						var t=JSON.parse(xmlhttp.responseText);
						hm.e.audio.src=t.data[0].url;
						if(!stop){hm.e.audio.play();}
					}
				}
	    		xmlhttp.open("GET",url,true);
				xmlhttp.send();
	    }
	    hm.getlrc=function(url){
	    	var	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						var t;
						hm.lrc=new Object;
						hm.lrc.b=new Array;
						hm.lrc.c=new Array;
						hm.lrc.d='';
						try{
						  t=JSON.parse(xmlhttp.responseText).lrc.lyric;
						}catch(e){
							t='[00:00.72]歌词不存在'
						}
						dddd=hm.parseLyric(t);
						hm.lrc.a=hm.parseLyric(t);
						for(var i in hm.lrc.a){
					        if (hm.lrc.a.hasOwnProperty(i)) {
					            hm.lrc.b.push(i);
					            if(!hm.lrc.a[i]){
					            	hm.lrc.c.push('&nbsp;')
					            }else{
					            	hm.lrc.c.push(hm.lrc.a[i])
					            } 
					        };
					    }
						for (var i = 0; i < hm.lrc.c.length; i++) {
							hm.lrc.d=hm.lrc.d+'<p>'+hm.lrc.c[i]+'</p>';
						}
						hm.e.lrc.innerHTML=hm.lrc.d;
						hm.e.lrcarr=hm.e.lrc.querySelectorAll('p');
					}
				}
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
	    }
	    hm.parseLyric=function(lrc) {
	    	console.log(lrc);
		    var lyrics = lrc.split("\n");
		    var lrcObj = {};
		    for(var i=0;i<lyrics.length;i++){
		        var lyric = decodeURIComponent(lyrics[i]);
		        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
		        var timeRegExpArr = lyric.match(timeReg);
		        if(!timeRegExpArr)continue;
		        var clause = lyric.replace(timeReg,'');
		        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
		            var t = timeRegExpArr[k];
		            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
		            	sec = Number(String(t.match(/\:\d*\.*\d*/i)).slice(1));
		            var time = (min * 60 + sec).toFixed(1)*10;
		            lrcObj[time] = clause;
		        }
		    }
		    return lrcObj;
		}
	    hm.huan=function(duan,stop){
	    	if(hm.p[duan]){
	    		hm.nowduan=duan;
	    		hm.nowlrc=-1;
	    		hm.e.lrc.style.transform='translateY(60px)';
	    		if(hm.p[hm.nowduan].yunid){
	    			hm.getcloudurl('https://api.imjad.cn/cloudmusic/?type=song&id='+hm.p[hm.nowduan].yunid+'&br=128000',stop);
	    		}else{
	    			hm.e.audio.src=hm.p[hm.nowduan].audio;
	    		}
				hm.e.banner.style.backgroundImage='url('+hm.p[hm.nowduan].img+')';
				hm.getlrc(hm.p[hm.nowduan].lrc);
				hm.e.title.innerHTML=hm.p[hm.nowduan].title;
				if(!stop){hm.e.audio.play();
				hm.e.btnplay.style.display='none';
				hm.e.btnstop.style.display='inline-block';
				}
				var li=hm.e.longarr.querySelectorAll('li');
				for (var i = 0; i < li.length; i++) {
					li[i].style.backgroundColor='transparent';
					if(duan==i){
						li[i].style.backgroundColor='rgba(49, 155, 211, 0.33)';
					}
				}
	    	}else if(duan<0){
	    		hm.huan(hm.p.length-1);
	    	}else{
	    		hm.huan(0)
	    	}
	    	hm.changersound(hm.volume);
	    	setTimeout(getalltime,500);
	    }
	    hm.longarr='';
	   	for (var i = 0; i < hm.p.length; i++) {
	   		var e=document.createElement('li');
	   		e.innerHTML=hm.p[i].title;
	   		e.songid=i;
	   		if(i==0){
	  			e.style.backgroundColor='rgba(49, 155, 211, 0.33)';
	  		}
	  		hm.e.longarr.appendChild(e);
			e.addEventListener('click',function(){
				hm.huan(this.songid);
			})
	   	}
	   	hm.e.btnx.addEventListener('click',function(){
	   		hm.huan(hm.nowduan+1);
	   	})
		hm.e.btns.addEventListener('click',function(){
			hm.huan(hm.nowduan-1);
		})
		hm.e.audio.onended=function(){
			console.log('播放完成');
			if(hm.e.x2.style.display=='none'){
				hm.huan(hm.nowduan+1);
			}else{
				hm.e.audio.play();
				hm.nowlrc=-1;
			}
		}
		hm.e.x1.addEventListener('click',function(){
			this.style.display='none';
			hm.e.x2.style.display='block';
		})
		hm.e.x2.addEventListener('click',function(){
			this.style.display='none';
			hm.e.x1.style.display='block';
		})
		hm.e.sounda.addEventListener('click',function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			var bl = show_coords(e,this);
			hm.e.soundb.style.height=bl.h*bl.ybl+'px';
			hm.changersound(bl.ybl);
		})
		hm.changersound=function(i){
			hm.e.audio.volume=i;
			hm.volume=i;
		}
		hm.e.msound.addEventListener('mouseover',function(){
			hm.e.wsound.style.display='block';
		})
		hm.e.msound.addEventListener('mouseleave',function(){
			hm.e.wsound.style.display='none';
		})
		
		hm.huan(0,true);
}