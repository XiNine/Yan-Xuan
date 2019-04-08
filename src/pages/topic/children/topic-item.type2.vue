<template>
  <li id="type2" class="item">
    <div class="main-item">
      <h4 class="header">
        <img :src="data.avatar" alt>
        <span>{{data.nickname}}</span>
      </h4>
      <h3 class="title">{{data.title}}</h3>
      <p class="info">{{data.readCount}}</p>
    </div>
    <img class="main-img" :src="data.picUrl" alt>
  </li>
</template>

<script>
export default {
  name: "item-type2",
  props: ["data"]
};
</script>

<style lang="scss" scoped>
#type2 {
  border-top: 10px solid #ddd;
  padding: 10px;
  display: flex;
  .main-img {
    width: 80px;
    height: 80px;
  }
  .main-item {
    flex: 1;
    .header {
      display: flex;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .info{
      font-size: 14px;
    }
  }
}
</style>
