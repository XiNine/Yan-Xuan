<template>
  <div class="item">
    <div class="item-wrap border">
      <img class="pic" :src="item.picUrl">
      <h5 class="main" ref="main" v-if="item.content != ' '">{{item.content}}</h5>
      <div class="info">
        <img :src="item.avatar">
        <p>{{item.nickName}}</p>
        <span>
          <van-icon name="thumb-circle-o"/>
          {{item.supportNum}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "waterfall-item",
  props: {
    item: Object
  },
  created() {
    // 获得图片路径
    let url = this.item.picUrl;
    let content = this.item.content;
    // 创建图片对象
    let image = new Image();
    // 加载图片
    image.src = url;
    // 加载完成的事件
    image.onload = () => {
      // 计算图片的真实宽高
      let itemWidth = (document.documentElement.offsetWidth - 30) / 2;
      let itemHeight = (itemWidth * image.height) / image.width;
      // 头像和昵称部分的高度
      itemHeight += 34;
      if (content != " ") {
        //加内容的高度
        itemHeight += 19;
        // 等待组件重新加载后再计算高度
        // console.log(this.$refs.main.offsetHeight);
        //重新计算高度
        setTimeout(() => {
          this.item.height =
            this.item.height - 19 + this.$refs.main.offsetHeight;
        }, 1000);
      } else {
        //不加评论的高度
      }
      // 加上下padding
      itemHeight += 10;
      //得到最终的高度
      this.item.height = itemHeight;
    };
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  .item-wrap {
    background: #fff;
    border-radius: 6px;
    overflow: hidden;
    .pic {
      width: 100%;
    }
    .main {
      padding: 5px 5px 0;
      font-size: 12px;
      line-height: 14px;
      color: #333;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }
    .info {
      padding: 5px;
      display: flex;
      position: relative;
      height: 24px;
      img {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      p {
        font-size: 12px;
      }
      span {
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }
}
</style>

