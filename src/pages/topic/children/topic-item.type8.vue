<template>
  <li id="type8" class="item">
    <h3 class="title">{{data.title}}</h3>
    <img class="main-img" :src="data.picUrl" alt>
  </li>
</template>

<script>
export default {
  name: "item-type8",
  props: ["data"]
};
</script>

<style lang="scss" scoped>
#type8 {
  padding: 10px;
    .title{
        font-size: 16px;
        font-weight: bold;
    }
    .main-img{
        display: block;
        width: 100%;
    }
}
</style>
