<template>
  <li id="type0" class="item">
    <h4 class="header">
      <img :src="data.avatar" alt>
      <span>{{data.nickname}}</span>
    </h4>
    <h3 class="title">{{data.title}}</h3>
    <img class="main-img" :src="data.picUrl" alt>
    <p class="info">{{data.readCount}}</p>
  </li>
</template>

<script>
export default {
  name: "item-type0",
  props: ["data"]
};
</script>

<style lang="scss" scoped>
#type0 {
  padding: 10px;
      .header{
        display: flex;
        img{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
    .title{
        font-size: 16px;
        font-weight: bold;
    }
    .main-img{
        display: block;
        width: 100%;
    }
    .info{
      font-size: 14px;
    }
}
</style>
