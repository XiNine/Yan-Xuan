<template>
  <div class="page" id="category">
    <header class="header border-bottom">
      <h1 class="title">
        <van-icon name="search"/>
        搜索商品共款{{total}}好物
      </h1>
    </header>
    <div class="content">
      <cate-nav :list="navData" v-model="selectIndex"></cate-nav>
      <cate-menu :data="menuData" :id="navId"></cate-menu>
    </div>

    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CateNav from "./children/cate-nav";
import CateMenu from "./children/cate-menu";
export default {
  components: {
    [CateNav.name]: CateNav,
    [CateMenu.name]: CateMenu
  },
  data() {
    return {
      //默认选中菜单
      selectIndex: 0
    };
  },
  computed: {
    ...mapState({
      total: state => state.home.total,
      //左边栏数据
      navData: state => state.category.navData,
      //右边栏数据
      menuData: state => state.category.menuData
    }),
    navId() {
      if (this.navData.length > 0) {
        return this.navData[this.selectIndex].id;
      } else {
        return "";
      }
    }
  },
  watch: {
    navId(newVal) {
      //请求选中右边菜单数据
      this.$store.dispatch("category/getMenuDataAction", { id: newVal });
    }
  },
  created() {
    //请求左边栏数据
    this.$store.dispatch("category/getNavDataAction");
    //请求默认右边栏菜单数据
    this.$store.dispatch("category/getMenuDataAction", {});
  }
};
</script>

<style lang="scss" scoped>
#category {
  .header {
    width: 100%;
    height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    box-sizing: border-box;
    .title {
      font-size: 12px;
      color: #666;
      background: #ededed;
      border-radius: 4px;
      line-height: 24px;
      text-align: center;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    box-sizing: border-box;
    display: flex;
    .nav {
      width: 100px;
      background: #fff;
    }
    .menu {
      flex: 1;
      background: #fff;
    }
  }
}
</style>
