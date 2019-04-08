<template>
  <div>
    <div class="page subpage" id="category-list">
      <app-header/>
      <menu-content :id="cateId"/>
    </div>

    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import menuContent from "./children/menu-content";
export default {
  components: {
    [menuContent.name]: menuContent
  },
  props: ["cateId"]
};
</script>

<style scoped lang="scss">
#category-list{
    .content{
        position: absolute;
        top: 44px;
        left: 0;
        bottom: 0;
        width: 100%;
    }
}
</style>
<style>
#category-list .van-overlay{
    top: 0;
}
</style>
