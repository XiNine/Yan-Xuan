<template>
  <app-scroll class="menu">
    <h3 class="banner">
      <img :src="data.url" alt>
    </h3>
    <div class="menu-wrap" v-for="item in data.data" :key="item.id">
      <h5 class="title" v-if="item.name">{{item.name}}</h5>
      <ul class="menu-list">
        <li
          class="menu-item"
          v-for="value in item.list"
          :key="value.id"
          @click="goSubCatePage(value.id)"
        >
          <img :src="value.bannerUrl" alt>
          <p>{{value.name}}</p>
        </li>
      </ul>
    </div>
  </app-scroll>
</template>

<script>
export default {
  name: "cate-menu",
  props: {
    data: Object,
    id: [Number, String]
  },
  methods: {
    goSubCatePage(subCateId) {
      this.$router.push(`/category/subcate/${this.id}/${subCateId}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  padding: 10px;
  .banner img {
    width: 100%;
    display: block;
  }
  .menu-wrap {
    .title {
      line-height: 34px;
      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #999;
      }
    }
    .menu-list {
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 33.33%;
        margin-top: 10px;
        img {
          width: 80%;
          margin: 0 auto;
        }
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
