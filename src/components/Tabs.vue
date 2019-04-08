<template>
  <nav class="tabs border-top">
    <li class="tab">
      <router-link to="/home">
        <i></i>
        <span>首页</span>
      </router-link>
    </li>
    <li class="tab">
      <router-link to="/category">
        <i></i>
        <span>分类</span>
      </router-link>
    </li>
    <li class="tab">
      <router-link to="/topic">
        <i></i>
        <span>识物</span>
      </router-link>
    </li>
    <li class="tab">
      <router-link to="/cart">
        <i></i>
        <span>购物车</span>
      </router-link>
    </li>
    <li class="tab">
      <router-link to="/mine">
        <i></i>
        <span>我的</span>
      </router-link>
    </li>
  </nav>
</template>

<script>
export default {
  name: "app-tabs"
};
</script>

<style lang="scss" scoped>
.tabs{
   width: 100%;
   height: 49px;
   position: absolute;
   left: 0;
   bottom: 0;
   background: #fff;
   display: flex;
   .tab{
       flex:1;
       a{
           display: block;
           width: 100%;
           height: 100%;
           display: flex;
           flex-direction: column;
           i{
              display: block;
              background-image: url(/images/tab.png);
              background-size: 20px;
              width: 20px;
              height: 25px;
              margin: 0 auto;
              margin-top: 4px;
            }
            span{
                display: block;
                font-size: 12px;
                color: #666;
                text-align: center;
            }
            &.router-link-active span{
                color: #b4282d;
            }
        }
    }
    .tab:nth-of-type(1){
        a i{
            background-position: 0 -24px;
        }
        a.router-link-active i{
            background-position: 0 0;
        }
    }
    .tab:nth-of-type(2){
        a i{
            background-position: 0 -74px;
        }
        a.router-link-active i{
            background-position: 0 -49px;
        }
    }
    .tab:nth-of-type(3){
        a i{
            background-position: 0 71px;
        }
        a.router-link-active i{
            background-position: 0 97px;
        }
    }
    .tab:nth-of-type(4){
        a i{
            background-position: 0 -24px;
        }
        a.router-link-active i{
            background-position: 0 0;
        }
    }
    .tab:nth-of-type(5){
        a i{
            background-position: 0 24px;
        }
        a.router-link-active i{
            background-position: 0 47px;
        }
    }   
}
</style>
