var e='.warp{margin:0 auto;width:340px}.hmusic{height:500px;box-shadow:0 0 5px rgba(0,0,0,.8);font-family:Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif}.hmusic>.banner{height:200px;background-image:url(1.jpg);background-position:center;background-size:cover}.hmusic>.banner>.banner-zz{overflow:hidden;height:100%;background-color:rgba(0,0,0,.4);color:#fff}.hmusic>.banner>.banner-zz>.songname{padding-top:5px;height:25px;text-align:center;font-size:1.2em}.hmusic>.banner>.banner-zz>.lrc-warp{overflow:hidden;height:10pc}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc{text-align:center;transition:all .3s ease-out;transform:translateY(-10px)}.hmusic>.banner>.banner-zz>.lrc-warp>.lrc>p{margin:0;padding:0;line-height:30px}.hmusic>.banner>.banner-zz>.ranger{height:9pt;background-color:rgba(59,65,67,.39)}.hmusic>.banner>.banner-zz>.ranger>.ranger-n{width:20%;height:100%;background-color:rgba(3,169,244,.6)}.hmusic>.con{overflow:hidden;height:40px;text-align:center;user-select:none}.hmusic>.con .iconfont{color:#6d95e0;font-size:1.6em;cursor:pointer}.hmusic>.con .iconfont:hover{color:#2753af}.hmusic>.con>.icon-play,.hmusic>.con>.icon-stop{position:relative;top:3px;font-size:2em}.hmusic>.con>.right{float:right;padding:0 4px}.hmusic>.con>.left{float:left;padding:0 4px}.hmusic>.con>.left>.nowtime,.hmusic>.con>.right>.alltime{position:relative;top:-1pc;display:inline-block;font-size:.6em}.hmusic>.con>.right>.iconfont{padding-right:30px;line-height:1.6em}.hmusic>.con>.left>.iconfont{padding-left:30px;line-height:1.6em}.hmusic>.longarr{overflow-x:hidden;overflow-y:scroll;height:260px;background-color:#fafafa}.hmusic>.longarr>li{padding:3px 0 3px 20px;cursor:pointer}.hmusic>.longarr>li:hover{padding:3px 0 3px 24px;background-color:hsla(0,0%,69%,.9)}';
var e2= document.createElement('style');
e2.type="text/css";
e2.innerHTML=e;
document.head.appendChild(e2);
function Hmusic(ele,arr){
		function $c(c){return ele.querySelector(c)};
		var hmele='<div class="hmusic"><audio class="hm-audio"></audio><div class="banner"><div class="banner-zz"><div class="songname"></div><div class="lrc-warp"><div class="lrc"></div></div><div class="ranger"><div class="ranger-n"></div></div></div></div><div class="con"><div class="left"><div class="nowtime">0:00</div><i class="iconfont icon-s"></i></div><i class="iconfont icon-play"></i><i class="iconfont icon-stop" style="display: none;"></i><div class="right"><i class="iconfont icon-x"></i><div class="alltime">1:00</div></div></div><div class="longarr"></div><style type="text/css" class="css"></style></div>';
		ele.innerHTML=hmele;
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
			for(var i=0;i<hm.lrc.b.length;i++){
				if(hm.lrc.b[i]==t){
					var t2=70-i*30;
					hm.e.lrc.style.transform='translateY('+t2+'px)';
					hm.e.lrc.style.webkitTransform='translateY('+t2+'px)';
					hm.e.lrc.style.MozTransform='translateY('+t2+'px)';
					$c('.css').innerHTML='.lrc>p:nth-child('+(1+i)+'){font-size:24px}';
					break;
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
}