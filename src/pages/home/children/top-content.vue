<template>
  <div class="content top">
    <!-- 轮播图 -->
    <div class="swiper-container banner" ref="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in realBannerList" :key="item.id">
          <img :src="item.picUrl" alt>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <ul class="cate-list">
      <li class="cate-item" v-for="item in cateList" :key="item.text">
        <router-link :to="`/home/cate/${item.id}`">
          <img :src="item.picUrl" alt>
          <span>{{item.text}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "top-content",
  data() {
    return {
      realBannerList: []
    };
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.bannerList,
      cateList: state => state.home.cateList
    })
  },
  watch: {
    bannerList(newVal) {
      //监听全局数据 bannerList 的变化
      //将全局的值赋值给组件中的 realBannerList
      this.realBannerList = newVal;
      //上面一行代码操作了组件的属性
      //组件的dom使用了属性，dom需要更新
      //dom更新后，彩之星nextTick的回调函数
      //在属性修改和$nextTick之间，不要任何的代码
      this.$nextTick(() => {
        this.swiper && this.swiper.update();
      });
    }
  },
  created() {
    //请求轮播图数据
    this.$store.dispatch("home/getBannerAction");
    //请求首页推荐下的分类数据
    this.$store.dispatch("home/getCateListAction");
  },
  mounted() {
    //创建轮播图
    this.swiper = new Swiper(this.$refs.banner, {
      loop: true,
      pagination: ".swiper-pagination"
    });
  }
};
</script>

<style lang="scss" scoped>
.top {
  .banner {
    height: 200px;
    img {
      width: 100%;
    }
  }
  .cate-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .cate-item {
      width: 20%;
      a {
        display: block;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 50%;
        }
        span {
          text-align: center;
          font-size: 12px;
          color: #333;
        }
      }
    }
  }
}
</style>
