<template>
  <div class="scroll-wrap infinite-scroll" ref="scroll">
    <div class="scroll">
      <!-- 下拉刷新 -->
      <div class="refresh" v-if="needRefresh">
        <van-icon :name="iconName" :class="{active:canRefresh,rotate:iconName==='replay'}"/>
        <span class="text">{{refreshText}}</span>
      </div>

      <!-- 滚动的内容 -->
      <slot/>

      <!-- 上拉加载更多 -->
      <div class="loadmore" v-if="needLoadMore">
        <van-icon
          :name="loadMoreIcon"
          :class="{active:canLoadMore,rotate:loadMoreIcon==='replay'}"
        />
        <span class="text">{{loadMoreText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "infinite-scroll",
  props: {
    //开启下拉刷新
    needRefresh: {
      type: Boolean,
      default: true
    },
    //开启上啦加载更多
    needLoadMore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      canRefresh: false,
      refreshText: "下拉可以刷新...",
      iconName: "arrow-down",
      canLoadMore: false,
      loadMoreText: "上拉可以加载更多...",
      loadMoreIcon: "arrow-up"
    };
  },
  watch: {
    needLoadMore(newVal, oldVal) {
      if (oldVal === true && newVal === false) {
        //关闭上拉加载更多
        this.scroll.destroy();
        this.createScroll();
      } else if (oldVal === false && newVal === true) {
        //打开加载更多
        this.needLoadMore && this.runLoadMore();
      }
    }
  },
  methods: {
    createScroll() {
      //构建滚动视图
      let scroll = (this.scroll = new IScroll(this.$refs.scroll, {
        startY: this.needRefresh ? -40 : 0,
        probeType: 3
      }));
      //刷新滚动视图
      scroll.on("beforeScrollStart", () => {
        scroll.refresh();
      });

      //调用下拉刷新
      this.needRefresh && this.runRefresh();

      //调用上拉加载更多
      this.needLoadMore && this.runLoadMore();
    },
    //关闭下拉刷新的事件
    endRefresh() {
      if (this.scroll && this.scroll.maxScrollY < -40) {
        this.scroll.refresh();
        this.scroll.scrollTo(0, -40, 300);
      }
      this.refreshText = "下拉可以刷新...";
      this.iconName = "arrow-down";
    },
    //执行下拉刷新的代码
    runRefresh() {
      //实现下拉刷新的代码
      this.scroll.on("scroll", () => {
        let y = this.scroll.y;
        if (y >= 0) {
          this.canRefresh = true;
          this.refreshText = "释放立即刷新...";
        } else {
          this.canRefresh = false;
          this.refreshText = "下拉可以刷新...";
        }
      });

      this.scroll.on("scrollEnd", () => {
        let y = this.scroll.y;
        if (y > -40 && y < 0) {
          //不满足下拉刷新的条件，收回下拉刷新
          this.scroll.scrollTo(0, -40, 300);
        } else if (y >= 0) {
          //满足刷新条件
          this.iconName = "replay";
          this.refreshText = "正在刷新...";
          //执行下拉刷新的请求
          this.$emit("refresh");
        }
      });
    },
    //执行上拉加载更多
    runLoadMore() {
      this.scroll.on("scroll", () => {
        let y = this.scroll.y;
        let maxY = this.scroll.maxScrollY;
        if (y > maxY && y < maxY + 40) {
          this.loadMoreText = "上拉可以加载更多...";
          this.canLoadMore = false;
        } else if (y <= maxY) {
          this.loadMoreText = "释放立即加载更多...";
          this.canLoadMore = true;
        }
      });
      this.scroll.on("scrollEnd", () => {
        let y = this.scroll.y;
        let maxY = this.scroll.maxScrollY;
        if (y > maxY && y < maxY + 40) {
          //没有加载更多的条件,收回提示框
          this.scroll.scrollTo(0, maxY + 40, 300);
        } else if (y <= maxY) {
          //达到了加载更多的条件
          this.loadMoreIcon = "replay";
          this.loadMoreText = "正在加载中...";
          //触发加载更多
          this.$emit("loadmore");
        }
      });
    },
    //关闭加载更多的事件
    endLoadMore() {
      this.loadMoreIcon = "arrow-up";
      this.loadMoreText = "上拉可以加载更多...";
    }
  },
  mounted() {
    this.createScroll();
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.infinite-scroll {
  overflow: hidden;
  .refresh,
  .loadmore {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    background: orange;
    .van-icon {
      line-height: 40px;
      font-size: 16px;
      transition: 0.3s;
      &.active {
        transform: rotate(180deg);
      }
      &.rotate {
        animation: rotate 0.5s infinite linear;
      }
    }
  }
}
</style>
