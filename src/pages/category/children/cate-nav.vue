<template>
    <app-scroll class="nav">
       <div v-for="(item,index) in list" :key="item.id" class="list" :class="{active:value===index}" @click="selectAction(index)">
          {{item.name}}
       </div>
    </app-scroll>
</template>

<script>
export default {
   name:'cate-nav',
   props:{
       list:Array,
       value:Number
   },
   methods:{
       selectAction(index){
           this.$emit('input',index)
       }
   }
}
</script>

<style lang="scss" scoped>
.list{
    font-size: 14px;
    padding-left:10px;
    margin: 26px 0;
}
.active{
    color: rgb(179, 50, 50);
    border-left: 4px solid rgb(184, 32, 32);
}
</style>
