const html = require('./html.js');
require('./style.css');
window.hyplaylist=(ele,id)=>{
	let yl=new Object;
	yl.ele=ele;
	yl.arr=new Array;
	let api='https://api.imjad.cn/cloudmusic';
	let	xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			let t=JSON.parse(xmlhttp.responseText).playlist.tracks;
			  for (let i = 0; i < t.length; i++) {
	            	let c=new Object;
	            	let au='';
	            	c.yunid=t[i].id;
	            	c.img=t[i].al.picUrl;
	            	c.lrc=api+'/?type=lyric&id='+c.yunid+'&br=128000';
	            	if(t[i].ar.length>4){
		               au='群星';
		               c.title=t[i].al.name;
		            }else{
		                for (let x = 0; x < t[i].ar.length; x++) {
		                    au+=t[i].ar[x].name
		                }
		                c.title=t[i].name+'-'+au;
		            }
		            yl.arr.push(c);
	            }
	            //console.log('加载歌单成功 正在解析各个音频地址');
	            Hmusic(yl.ele,yl.arr);

		}
	}
	xmlhttp.open("GET",api+'/?type=playlist&id='+id+'&br=128000',true);
	xmlhttp.send();
}
window.Hmusic=(ele,arr)=>{
		let hm=new Object;
		function $c(c){return ele.querySelector(c)};
		let hmele=html.html();
		ele.innerHTML=hmele;
		hm.nowduan=0;
		hm.volume=1;
		hm.nowlrc=-1;
		hm.p=arr;
		hm.e=new hmeobj;
		function hmeobj(){
			this.audiowarp=$c('.hmusic');
			this.audio=$c('.hmusic>.hm-audio');
			this.banner=$c('.banner');
			this.btnplay=$c('.icon-play');
			this.btnstop=$c('.icon-stop');
			this.title=$c('.songname');
			this.btnx=$c('.icon-x');
			this.btns=$c('.icon-s');
			this.wranger=$c('.ranger');
			this.nrange=$c('.ranger-n');
			this.nowtime=$c('.nowtime');
			this.alltime=$c('.alltime');
			this.lrc=$c('.lrc');
			this.x1=$c('.icon-xunhuan');
			this.x2=$c('.icon-ttpodicon');
			this.longarr=$c('.longarr');
			this.sbtn=$c('.icon-yinliang');
			this.wsound=$c('.sound-ranger');
			this.msound=$c('.sound');
			this.sounda=$c('.sound-ranger-a');
			this.soundb=$c('.sound-ranger-b');
		}
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
			hm.pause();
		});

		hm.play=function(){
			hm.e.btnplay.style.display='none';
			hm.e.btnstop.style.display='inline-block';
			if(hm.e.audio.paused){
				hm.e.audio.play()
			}
		}
		hm.pause=function(){
			hm.e.btnplay.style.display='inline-block';
			hm.e.btnstop.style.display='none';
			hm.e.audio.pause();
		}

		hm.playswitch=function(){
			if(hm.e.btnplay.style.display!=='none'){
				hm.play()
			}else{
				hm.pause()
			}
		}
		
		hm.tiao=function(t){
			if(hm.e.lrcarr[hm.nowlrc]){
				hm.e.lrcarr[hm.nowlrc].className=' ';
			}
			hm.e.audio.currentTime=t;
			hm.e.nrange.style.width=hm.e.audio.currentTime/hm.alltime*100+'%';
			hm.e.nowtime.innerHTML=getvtime(hm.e.audio.currentTime).m+':'+getvtime(hm.e.audio.currentTime).s;
			for (let i = 0; i < hm.lrc.b.length; i++) {
				if(t*10<=hm.lrc.b[i]){
					hm.nowlrc=i;
					let t2=50-hm.nowlrc*30;
					hm.e.lrc.style.transform='translateY('+t2+'px)';
					hm.e.lrcarr[hm.nowlrc].className='nowlrcp';
					//console.log('nowduan切换为:'+i)
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
			let e = event || window.event || arguments.callee.caller.arguments[0];
			let xbl = show_coords(e, this);
			hm.tiao(xbl.xbl*hm.alltime);
		});
		function getvtime(time) {
	        let tm;
	        let m = parseInt(time / 60);
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
	        let x = event.clientX - getLeft(elem)+window.scrollX;
	        let y = event.clientY - getTop(elem)+window.scrollY;
	        let xbl = x / elem.offsetWidth;
	        let ybl =1- y /elem.offsetHeight;
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
	    hm.getcloudurl=function(url,stop,callback){
	    	let	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						let t=JSON.parse(xmlhttp.responseText);
						hm.e.audio.src=t.data[0].url;
						if(!stop&&hm.e.audio.paused){hm.e.audio.play();}
						if (typeof callback === "function"){
					        callback()
					    }
						
					}
				}
	    		xmlhttp.open("GET",url,true);
				xmlhttp.send();
	    }
	    hm.getlrc=function(url){
	    	let	xmlhttp=new XMLHttpRequest();
	    		xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						let t;
						hm.lrc=new Object;
						hm.lrc.b=new Array;
						hm.lrc.c=new Array;
						hm.lrc.d='';
						try{
						  t=JSON.parse(xmlhttp.responseText).lrc.lyric;
						}catch(e){
							t='[00:00.72]歌词不存在'
						}
						hm.parseLyric(t);
						hm.lrc.a=hm.parseLyric(t);
						for(let i in hm.lrc.a){
					        if (hm.lrc.a.hasOwnProperty(i)) {
					            hm.lrc.b.push(i);
					            if(!hm.lrc.a[i]){
					            	hm.lrc.c.push('&nbsp;')
					            }else{
					            	hm.lrc.c.push(hm.lrc.a[i])
					            } 
					        };
					    }
						for (let i = 0; i < hm.lrc.c.length; i++) {
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
		            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
		            	sec = Number(String(t.match(/\:\d*\.*\d*/i)).slice(1));
		            let time = (min * 60 + sec).toFixed(1)*10;
		            lrcObj[time] = clause;
		        }
		    }
		    return lrcObj;
		}
	    hm.huan=function(duan,stop){
	    	if(hm.p[duan]){
	    		hm.e.audio.currentTime=0;
	    		if(!hm.e.audio.paused){
	    			hm.e.audio.pause()
	    		}
	    		hm.e.audio.remove();
	    		hm.e.audio=document.createElement('audio');
	    		hm.e.audio.className='hm-audio';
	    		hm.e.audiowarp.appendChild(hm.e.audio);
	    		hm.e.nrange.style.width='0px';
	    		hm.nowduan=duan;
	    		hm.nowlrc=-1;
	    		hm.e.lrc.style.transform='translateY(60px)';
	    		hm.e.title.innerHTML=hm.p[hm.nowduan].title;
	    		if(hm.p[hm.nowduan].yunid){
	    			hm.getcloudurl('https://api.imjad.cn/cloudmusic/?type=song&id='+hm.p[hm.nowduan].yunid+'&br=128000',stop,hm.huan2(stop));
	    		}else{
	    			hm.e.audio.src=hm.p[hm.nowduan].audio;
	    			hm.huan2(stop);
	    		}
				let li=hm.e.longarr.querySelectorAll('li');
				for (let i = 0; i < li.length; i++) {
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
	   	for (let i = 0; i < hm.p.length; i++) {
	   		let e=document.createElement('li');
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
	   	hm.huan2=function(stop){
	   		let picsize='?param='+hm.e.banner.offsetWidth+'y'+hm.e.banner.offsetHeight
	   		hm.e.banner.style.backgroundImage=`url(${hm.p[hm.nowduan].img}?param=${picsize})`;
			hm.getlrc(hm.p[hm.nowduan].lrc);
			if(!stop&&hm.e.audio.paused){hm.e.audio.play();
			hm.e.btnplay.style.display='none';
			hm.e.btnstop.style.display='inline-block';
			}
			hm.e.audio.onended=function(){
				if(hm.e.x2.style.display=='none'){
					hm.huan(hm.nowduan+1);
				}else{
					try{
						hm.e.audio.play();
					}
					catch(e){}
					hm.nowlrc=-1;
				}
			};
			hm.e.audio.addEventListener('timeupdate',function(c){
			let t=hm.e.audio.currentTime.toFixed(1)*10;
			if(hm.lrc){
				if(hm.lrc.b[hm.nowlrc+1]<=t){
					++hm.nowlrc;
					let t2=50-hm.nowlrc*30;
					hm.e.lrc.style.transform='translateY('+t2+'px)';
					hm.e.lrcarr[hm.nowlrc].className='nowlrcp';
					if(hm.e.lrcarr[hm.nowlrc-1]){
						hm.e.lrcarr[hm.nowlrc-1].className=' ';
					}
					
				}
			}
			
		})
	   	}
	   	hm.e.btnx.addEventListener('click',function(){
	   		hm.huan(hm.nowduan+1);
	   	})
		hm.e.btns.addEventListener('click',function(){
			hm.huan(hm.nowduan-1);
		})
		hm.e.x1.addEventListener('click',function(){
			this.style.display='none';
			hm.e.x2.style.display='block';
		})
		hm.e.x2.addEventListener('click',function(){
			this.style.display='none';
			hm.e.x1.style.display='block';
		})
		hm.e.wsound.addEventListener('click',function(event){
			let e = event || window.event || arguments.callee.caller.arguments[0];
			let bl = show_coords(e,this);
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