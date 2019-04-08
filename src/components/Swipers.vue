<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <slot/>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  name: "swiperss",
  props: {
    data: Array
  },
  updated() {
    var mySwiper = new Swiper(this.$refs.swiper, {
      loop: true,
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      autoplay: {
        disableOnInteraction: false // 手动滑动后继续自动播放
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>

<style scoped>
</style>
