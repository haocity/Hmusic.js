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
hyplaylist(Element,Yunid);
```
Element:播放器所要放入的元素

Yunid：网易云歌单ID

### APIs
hm.play() 播放
hm.pause() 暂停
hm.playswitch() 切换播放状态 播放/暂停
hm.settime()  跳转当前歌曲到指定时间
hm.to()       跳转到指定歌曲 0为第一首
## 开源协议
> 如果你喜欢的话
The Star And Thank Author License（SATA）

