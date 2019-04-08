<template>
    <header class="app-header border-bottom">
        <van-icon name="arrow-left" class="back"
        @click="backAction" v-if="hasBackBtn"/>
      <h1 class="title">{{title}}</h1>
    </header>
</template>

<script>
export default {
  name:'app-header',
  props:{
      title:{
          type:String,
          default:'网易严选'
      },
      hasBackBtn:{
          type:Boolean,
          default:true
      }
  },
  methods:{
      backAction(){
          this.$router.back();
      }
  }
}
</script>

<style lang="scss" scoped>
.app-header{
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: absolute;
    top: 0;
    left: 0;
    .title{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }
    .back.van-icon{
        position: absolute;
        width: 44px;
        height: 44px;
        top: 0;
        left: 5px;
        text-align: center;
        line-height: 44px;
        font-size: 24px;
    }
}
</style>
