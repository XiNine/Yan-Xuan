<template>
  <li id="type7" class="item" v-if="data.itemList.length>0">
    <h3 class="title">{{data.title}}</h3>
    <h6 class="subTitle">{{data.subTitle}}</h6>
    <div class="goods-img">
      <div
        class="img-item"
        v-for="(value,index) in data.itemList"
        :key="value.itemId"
        @click="showPreViewAction(index)"
      >
        <img :src="value.itemUrl" alt>
      </div>
    </div>
    <p class="info">{{data.readCount}}</p>
  </li>
</template>

<script>
export default {
  name: "item-type7",
  props: {
    data: Object,
    index: Number
  },
  data() {
    return {
      showPre: false
    };
  },
  methods: {
    //预览商品的事件
    showPreViewAction(index) {
      this.$store.commit("topic/setShowPreview", {
        show: true,
        listIndex: this.index,
        imgIndex: index
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#type7 {
  .goods-img {
    overflow: hidden;
    padding: 5px;
    .img-item {
      padding: 5px;
      width: 25%;
      float: left;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
  }
  .info {
    font-size: 12px;
  }
}
</style>
