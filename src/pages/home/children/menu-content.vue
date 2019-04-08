<template>
  <div class="content menu">
    <app-scroll style="width: 100%; height: 100%;">
      <!-- banner -->
      <div class="banner">
        <img :src="cateDatail.url" alt>
      </div>

      <!-- 列表 -->
      <div class="cate" v-for="item in cateDatail.list" :key="item.id">
        <h3 class="title">{{item.title}}</h3>
        <h5 class="subtitle">{{item.subtitle}}</h5>
        <cate-list :list="item.list"></cate-list>
      </div>
    </app-scroll>

    <!-- 加载指示器遮罩层 -->
    <van-popup :value="showCover" :close-on-click-overlay="false">
      <van-loading type="spinner" color="white"/>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CateList from '../../../components/cate-list'
export default {
  name: "menu-content",
  components: {
    [CateList.name]:CateList
  },
  props: {
    id: [String, Number]
  },
  computed: {
    ...mapState({
      showCover: state => state.goods.showCover,
      cateDatail: state => state.goods.cateDatail
    })
  },
  watch: {
    id: {
      handler(newVal) {
        this.$store.dispatch("goods/getCateDetailAction", { id: this.id });
      },
      immediate: true //在初始化之前立即执行一次
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  .banner img {
    width: 100%;
  }
}
</style>
<style lang="scss">
.van-loading {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}
.van-popup {
  background: transparent;
}
.van-overlay {
  position: absolute;
  top: -34px;
  bottom: 0;
  height: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>