<template>
  <li class="cate-item" @click="goDetail">
    <img v-lazy="value.picUrl">
    <h6>{{value.title}}</h6>
    <p>
      <span v-for="tag in value.itemTagList" :key="tag">{{tag}}</span>
    </p>
  </li>
</template>

<script scoped>
export default {
  name: "cate-item",
  props: {
    value: Object
  },
  methods: {
    goDetail() {
      this.$router.push(`${this.$route.fullPath}/detail/${this.value.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.cate-item {
  padding: 5px;
  width: 50%;
  box-sizing: border-box;
  float: left;
  h6 {
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 24px;
  }
  img {
    width: 100%;
  }
}
</style>
