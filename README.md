# Hmusic.js
![log.png](https://ooo.0o0.ooo/2017/06/03/5932d9fcb06da.png)

简单的音乐播放器

## 介绍
![demo.png](https://ooo.0o0.ooo/2017/06/03/5932daa9d4bab.png)
- 可播直接放网易云歌单  支持歌词滚动
### 食用方法
引用hmusic.js
```
<script  src="hmusic.js" type="text/javascript" charset="utf-8"></script>
```
播放云歌单
```
var hm= new Hmusic(document.querySelector('.warp2'),{playlist:150301862});
```
Element:播放器所要放入的元素

playlist：网易云歌单ID


播放云音乐(多曲)
```
var hm= new Hmusic(document.querySelector('.warp2'),[{yunid: 4879869, img: "https://p1.music.126.net/tciqmgtNlLSgmAA--w4iLw==/1664660604466892.jpg", lrc: "https://t5.haotown.cn/yunmusic//?type=lyric&id=4879869&br=128000", title: "チルノのパーフェクトさんすう教室-歌ってみた"},{yunid: 29717270, img: "https://p1.music.126.net/oOGKq1fBwikj9IKsTM2TgQ==/3239161255894106.jpg", lrc: "https://t5.haotown.cn/yunmusic//?type=lyric&id=29717270&br=128000", title: "with“you”－絆－"}])
```
Element:播放器所要放入的元素

Yunid：网易单曲ID

img：封面

title：标题

Yunid可用audio替换 将直接作为地址


### APIs

hm.play() 播放

hm.pause() 暂停

hm.playswitch() 切换播放状态 播放/暂停

hm.settime()  跳转当前歌曲到指定时间

hm.to()       跳转到指定歌曲 0为第一首

hm.add()       添加音乐(单个) 

hm.getnowmusic()  获取当前音乐信息

## 开源协议
> 如果你喜欢的话
The Star And Thank Author License（SATA）

