<template>
  <infinite-scroll class="content topic" @loadmore="loadmoreAction">
    <app-scroll class="content show-order">
      <!-- 横向滚动视图 -->
      <div class="banner">
        <h3>{{title}}</h3>
        <h6>{{subtitle}}</h6>
        <div class="scroll" ref="bannerScroll">
          <div class="scroll-wrap" :style="{width: bannerList.length*110+'px'}">
            <div
              class="item"
              v-for="item in bannerList"
              :key="item.id"
              :style="{backgroundImage: `url(${item.picUrl})`}"
            ></div>
          </div>
        </div>
      </div>

      <!-- 瀑布流 -->
      <waterfall :line-gap="width" :watch="showOrderList">
        <waterfall-slot
          v-for="(item, index) in showOrderList"
          :width="width"
          :height="item.height"
          :order="index"
          :key="item.id"
        >
          <waterfall-item :item="item" ref="waterfallItem"/>
        </waterfall-slot>
      </waterfall>
    </app-scroll>
  </infinite-scroll>
</template>

<script>
import { mapState } from "vuex";
import WaterfallItem from "./waterfall-item";
import Waterfall from "vue-waterfall/lib/waterfall";
import WaterfallSlot from "vue-waterfall/lib/waterfall-slot";
export default {
  name: "show-order-content",
  components: {
    [WaterfallItem.name]: WaterfallItem,
    Waterfall: Waterfall,
    WaterfallSlot: WaterfallSlot
  },
  data() {
    return {
      width: document.documentElement.offsetWidth / 2
    };
  },
  methods: {
    //加载更多数据
    loadmoreAction() {
      this.page += 1;
      this.$store.dispatch("topic/getTopicListAction", {
        size: 20,
        page: 1
      });
    }
  },
  computed: {
    ...mapState({
      title: state => state.topic.showOrderBannerData.title,
      subtitle: state => state.topic.showOrderBannerData.subtitle,
      bannerList: state => state.topic.showOrderBannerData.list,
      showOrderList: state => state.topic.showOrderListData.list
    })
    // item(){
    //     return this.showOrderList.length > 0 ? this.showOrderList[2] : null
    // }
  },
  created() {
    // 请求横向滚动的数据
    this.$store.dispatch("topic/getShowOrderBannerAction");
    // 请求瀑布流数据
    this.$store.dispatch("topic/getShowOrderListAction", {
      page: 1,
      size: 10,
      type: 1
    });
  },
  mounted() {
    //创建横向滚动的视图
    let bannerScroll = new IScroll(this.$refs.bannerScroll, {
      scrollX: true,
      scrollY: false
    });
    bannerScroll.on("beforeScrollStart", () => {
      bannerScroll.refresh();
    });
  }
};
</script>

<style lang="scss" scoped>
.show-order {
  .banner {
    border-bottom: 10px solid #efefef;
    padding: 5px;
    h3,
    h6 {
      text-align: center;
      line-height: 26px;
    }
    .scroll {
      overflow: hidden;
      .item {
        float: left;
        width: 100px;
        height: 100px;
        margin: 0 5px;
        background-size: cover;
      }
    }
  }
  .vue-waterfall {
    overflow: hidden;
    padding: 5px;
    background: #fff;
  }
}
</style>

