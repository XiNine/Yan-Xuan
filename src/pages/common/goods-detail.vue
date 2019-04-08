<template>
  <div class="page subpage" id="datail">
    <app-header></app-header>
    <app-scroll class="content">
      <!-- <h1>详情页面</h1> -->
      <video id="main-video" ref="video"></video>
      <div class="detail" v-html="detail"></div>
    </app-scroll>
    <div class="tools border-top"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import flvjs from "flv.js";
export default {
  props: {
    goodsId: [Number, String]
  },
  computed: {
    ...mapState({
      detail: state =>
        state.goods.goodsDetail && state.goods.goodsDetail.detail,
      videoUrl: state =>
        state.goods.goodsDetail && state.godds.goodsDetail.videoUrl
    })
  },
  watch: {
    videoUrl() {
      //创建播放器
      if (this.$refs.video) {
        this.createPlayer();
      }
    }
  },
  methids: {
    createPlayer() {
      //isSupported() 判断当前节点是否支持某个特性。
      if (flvjs.isSupported()) {
        if (flvjs.isSupported()) {
          var videoElement = this.$refs.video;
          var flvPlayer = flvjs.createPlayer({
            type: "webm",
            url: this.videoUrl
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          // flvPlayer.play();
        }
      }
    }
  },
  created() {
    //请求商品详情数据
    this.$store.dispatch("goods/getGoodsDetaAction", { id: this.goodsId });
  },
  mounted() {
    //编译好后显示对应视频
    if (this.videoUrl) {
      this.createPlayer();
    }
  },
  beforeDestroy() {
    //销毁数据
    this.$store.commit("goods/setGoodsDetail", null);
  }
};
</script>

<style lang="scss" scoped>
#datail {
  .content {
    width: 100%;
    position: absolute;
    top: 44px;
    left: 0;
    bottom: 40px;
    #main-video {
      width: 100%;
    }
  }
  .tools {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>
<style>
#datail .detail img {
  width: 100%;
  display: block;
}
</style>

