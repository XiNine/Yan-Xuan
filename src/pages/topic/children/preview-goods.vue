<template>
  <div class="preview">
    <van-icon name="cross" class="close" @click="closeAction"></van-icon>

    <p>{{currentIndex}}/{{goodsList.length}}</p>

    <div class="swiper-container list" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in goodsList" :key="item.itemId">
          <img :src="item.itemUrl">
        </div>
      </div>
    </div>
    <button @click="goDetail">去看看</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "preview-goods",
  data(){
      return {
          currentIndex:null
      }
  },
  computed: {
    ...mapState({
      //获得商品的下标
      imgIndex: state => state.topic.previewInfo.imgIndex,
      //获得上新数据的列表
      listIndex: state => state.topic.previewInfo.listIndex
    }),
    //获得需要预览的商品列表
    goodsList() {
      let state = this.$store.state;
      let list = state.topic.topicData.list;
      let imgList = list[this.listIndex].itemList;
      return imgList;
    }
  },
  methods: {
    //关闭预览
    closeAction() {
      this.$store.commit("topic/setShowPreview", true);
    },
    //进入商品详情
    goDetail(){
    let currentGoods = this.goodsList[this.currentIndex -1];
    this.$router.push(`/topic/detail/${currentGoods.itemId}`);
    }
  },
  mounted() {
    //确定下标
    this.currentIndex = this.imgIndex + 1;
    //创建轮播图
    new Swiper(this.$refs.swiper, {
      initialSlide: this.imgIndex,
      onSlideChangeEnd: swiper => {
        // 图片翻页时更换下标
        this.currentIndex = swiper.activeIndex + 1;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;
  p{
      font-size: 12px;
      color: white;
      text-align: center;
  }
  .close {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 60px;
    font-size: 30px;
    color: #fff;
  }
  .list {
    background: #fff;
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 100%;
    }
  }
  button{
    font-size: 12px;
    outline:none;
    border: none;
    text-align: center;
  }
}
</style>
