<template>
  <div class="scroll-wrap" ref="scroll">
    <!-- 滚动视图的三个条件：
        1.需要一个滚动容器，容器的大小固定，并且overflow:hidden;
        2.容器内部的第一个子元素将所有需要滚动的内容包裹起来；
        x轴需要滚动，需要设置样式将宽高撑开
        y轴需要滚动，不设置样式，让内容撑开高度
    3.创建滚动视图，滚动视图的参数要是外部的滚动容器-->
    <div class="scroll">
      <slot/>
    </div>
  </div>
</template>

<script>
//引入滚动插件
import BScroll from "better-scroll";
export default {
  name: "app-scroll",
  mounted() {
    let scroll = new BScroll(this.$refs.scroll, {
      scrollX: true,
      click:true,
      tab:true
    });
    //刷新滚动视图
    scroll.on('scrollStart',()=>{
      scroll.refresh();
    })
  }
};
</script>

<style>
.scroll-wrap {
  overflow: hidden;
}
</style>
