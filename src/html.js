 /* Hmusic.
  @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
  @license  The Star And Thank Author License (SATA)
  */
module.exports = {
    html: () => {
        return `<div class="hmusic">
  <audio class="hm-audio"></audio>
  <div class="banner">
      <div class="songname"></div>
      <div class="lrc-warp">
        <div class="lrc"></div>
      </div>
      <div class="ranger">
        <div class="ranger-n"></div>
      </div>
      <img class="banner-img">
      <div class="banner-color"></div>
  </div>
  <div class="con">
    <div class="left">
      <div class="nowtime">0:00</div>
    </div>
    <i class="iconfont icon-s"></i>
    <i class="iconfont icon-play"></i>
    <i class="iconfont icon-stop" style="display: none;"></i>
    <i class="iconfont icon-x"></i>
    <div class="right">
      <div class="sound">
        <div class="sound-ranger">
          <div class="sound-ranger-a">
            <div class="sound-ranger-b"></div>
          </div>
        </div>
        <i class="iconfont icon-yinliang"></i>
      </div>
      <i class="iconfont icon-xunhuan xunhuan"></i>
      <i class="iconfont icon-ttpodicon xunhuan" style="display: none;"></i>
      <div class="alltime">1:00</div></div>
  </div>
  <div class="longarr"></div>
  <style type="text/css" class="css"></style>
</div>`
    }
}
