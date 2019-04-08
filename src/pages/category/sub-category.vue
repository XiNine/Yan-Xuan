<template>
  <div>
    <div class="page subpage" id="sub-cate">
      <!-- 头部 -->
      <app-header></app-header>

      <!-- 滚动菜单 -->
      <div class="menu">
        <ly-tab :items="navList" v-model="selectIndex"></ly-tab>
      </div>

      <app-scroll class="content">
        <h3 class="title">{{subTitle}}</h3>
        <cate-list :list="list"></cate-list>
      </app-scroll>
    </div>

    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import LyTab from "ly-tab";
import { mapState } from "vuex";
import CateList from "../../components/cate-list";
export default {
  components: {
    [LyTab.LyTab.name]: LyTab.LyTab,
    [CateList.name]: CateList
  },
  props: {
    categoryId: [Number, String],
    subCateId: [Number, String]
  },
  data() {
    return {
      selectIndex: null
    };
  },
  computed: {
    ...mapState({
      menuData: state => state.category.menuData.data,
      subTitle: state => state.goods.subCateDetail.title,
      list: state => state.goods.subCateDetail.list
    }),
    navList() {
      //计算头部菜单栏数据
      let newData = [];
      this.menuData.forEach(({ list }) => {
        let arr = list.map(({ id, name }) => ({ id, label: name }));
        newData = [...newData, ...arr];
      });
      return newData;
    }
  },
  watch: {
    selectIndex() {
      console.log("发送请求");
      //计算请求的subCateId
      let id = this.navList[this.selectIndex].id;
      this.$store.dispatch("goods/getSubCateDetailAction", {
        categoryId: this.categoryId,
        subCateId: id
      });
    }
  },
  created() {
    this.selectIndex = this.navList.findIndex(({ id }) => {
      return this.subCateId == id;
    });
  }
};
</script>

<style lang="scss" scoped>
#sub-cate {
  .menu {
    position: absolute;
    top: 44px;
    left: 0;
    width: 100%;
  }
  .content {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    bottom: 0;
    .title{
      line-height: 36px;
      text-align: center;
    }
  }
}
</style>
