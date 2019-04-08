<template>
  <header class="home-header">
    <img class="logo" src="../../../assets/logo.png">
    <span class="search">
      <van-icon name="search"/>
      搜索商品，共{{total}}款好物
    </span>
    <span class="login">登录</span>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home-header",
  computed: {
    //获得store下的商品总数
    ...mapState({
      total: state => state.home.total
    })
  },
  created() {
    // 请求商品总数
    this.$store.dispatch("home/getTotalAction");
  }
};
</script>

<style scoped lang="scss">
.home-header {
  width: 100%;
  height: 44px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  z-index: 6;
  background: #fff;
  .logo {
    height: 24px;
  }
  .search {
    font-size: 10px;
    color: #666;
    background: #ededed;
    border-radius: 4px;
    line-height: 24px;
    padding: 0 6px;
    box-sizing: border-box;
  }
  .login {
    height: 24px;
    padding: 5px;
    line-height: 14px;
    box-sizing: border-box;
    color: #b4282d;
    border: 1px solid #b4282d;
    font-size: 12px;
    border-radius: 4px;
  }
}
</style>
