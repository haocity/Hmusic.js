var e='';
var e2= document.createElement('style');
e2.type="text/css";
e2.innerHTML=e;
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
document.head.appendChild(e2);
var yl=new Object;
function hyplaylist(ele,id){
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
	            hyunmusic(yl.ele,yl.arr,1);
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
	    	setTimeout(function(){ym.getmusicutl(id,i)},1000)
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
	    	setTimeout(function(){ym.getmusicutl(id,i)},1000)
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
		function $c(c){return ele.querySelector(c)};
//		var hmele='<div class="hmusic"><audio class="hm-audio"></audio><div class="banner"><div class="banner-zz"><div class="songname"></div><div class="lrc-warp"><div class="lrc"></div></div><div class="ranger"><div class="ranger-n"></div></div></div></div><div class="con"><div class="left"><div class="nowtime">0:00</div><i class="iconfont icon-s"></i></div><i class="iconfont icon-play"></i><i class="iconfont icon-stop" style="display: none;"></i><div class="right"><i class="iconfont icon-x"></i><div class="alltime">1:00</div></div></div><div class="longarr"></div><style type="text/css" class="css"></style></div>';
//		ele.innerHTML=hmele;
		hm=new Object;
		hm.e=new Object;
		hm.nowduan=0;
		hm.p=arr;//[{"title":"ACFUN次元之旅","audio":"1.wav","img":"1.jpg","lrc":"1.json"},{"title":"おちゃめ机能 -Full","audio":"2.mp3","img":"2.jpg","lrc":"2.json"}]
		hm.e.audio=$c('.hmusic>.hm-audio');
		hm.e.audio.src=hm.p[hm.nowduan].audio;
		hm.e.banner=$c('.banner');
		hm.e.banner.style.backgroundImage='url('+hm.p[hm.nowduan].img+')';
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
		hm.e.title.innerHTML=hm.p[hm.nowduan].title;
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
			hm.e.audio.currentTime=t;
			hm.e.nrange.style.width=hm.e.audio.currentTime/hm.alltime*100+'%';
			hm.e.nowtime.innerHTML=getvtime(hm.e.audio.currentTime).m+':'+getvtime(hm.e.audio.currentTime).s;
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
			console.log('tiao'+xbl.xbl*hm.alltime);
		});
		//定时器 10
		hm.interval=function(){
			var t=parseFloat(hm.e.audio.currentTime.toFixed(2));
			if(hm.lrc){
				for(var i=0;i<hm.lrc.b.length;i++){
					if(hm.lrc.b[i]==t){
						var t2=70-i*30;
						hm.e.lrc.style.transform='translateY('+t2+'px)';
						hm.e.lrc.style.webkitTransform='translateY('+t2+'px)';
						hm.e.lrc.style.MozTransform='translateY('+t2+'px)';
						$c('.css').innerHTML='.lrc>p:nth-child('+(1+i)+'){font-size:24px!important}';
						break;
					}
				}
			}

		}
		setInterval(hm.interval,10);
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
	        var ybl = y / elem.offsetTop;
	        return {
	            x:x,
	            y:y,
	            w:elem.offsetWidth,
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
	    hm.getlrc=function(url){
	    	var	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						var t=JSON.parse(xmlhttp.responseText);
						hm.lrc=new Object;
						hm.lrc.b=[];
						hm.lrc.c=[];
						hm.lrc.d='';
						hm.lrc.a=t.lrc.lyric.split('\n');
						var reg = /\[[^\]]+/;
						var reg2=/\].+/;
						for (var i = 0; i < hm.lrc.a.length-1; i++) {
							var t2= hm.lrc.a[i].match(reg);
							var t3= hm.lrc.a[i].match(reg2);
							if(t2){
								var arr= t2[0].substr(1).split(':');
								hm.lrc.b.push(parseInt(arr[0])*60+parseFloat(arr[1]));
							}
							if(t3){
								hm.lrc.c.push(t3[0].substr(1))
							}else{
								hm.lrc.c.push('&nbsp;')
							}
						}
						for (var i = 0; i < hm.lrc.c.length; i++) {
							hm.lrc.d=hm.lrc.d+'<p>'+hm.lrc.c[i]+'</p>';
						}
						hm.e.lrc.innerHTML=hm.lrc.d;
					}
				}
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
	    }
	    hm.getlrc(hm.p[hm.nowduan].lrc);
	    hm.e.btnx.addEventListener('click',function(){
	    	
	    })
	    hm.huan=function(duan){
	    	if(hm.p[duan]){
	    		hm.nowduan=duan;
	    		hm.e.audio.src=hm.p[hm.nowduan].audio;
				hm.e.banner.style.backgroundImage='url('+hm.p[hm.nowduan].img+')';
				hm.getlrc(hm.p[hm.nowduan].lrc);
				hm.e.title.innerHTML=hm.p[hm.nowduan].title;
				hm.e.audio.play();
				hm.e.btnplay.style.display='none';
				hm.e.btnstop.style.display='inline-block';
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
	
}