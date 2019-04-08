<template>
  <infinite-scroll
    class="content topic"
    ref="infiniteScroll"
    @refresh="refreshAction"
    @loadmore="loadmoreAction"
    :needLoadMore="hasMore"
  >
    <!-- 滚动的内容 -->
    <div v-for="(item,index) in list" :key="item.id">
      <component :is="`item-type${item.type}`" :data="item" :index="index"/>
    </div>
  </infinite-scroll>
</template>

<script>
import { mapState } from "vuex";
import TopItem0 from "./topic-item.type0";
import TopItem1 from "./topic-item.type1";
import TopItem7 from "./topic-item.type7";
import TopItem8 from "./topic-item.type8";
export default {
  name: "topic-content",
  components: {
    [TopItem0.name]: TopItem0,
    [TopItem1.name]: TopItem1,
    [TopItem7.name]: TopItem7,
    [TopItem8.name]: TopItem8
  },
  props: {
    id: [String, Number]
  },
  data() {
    return {
      size: 10,
      page: 1
    };
  },
  computed: {
    ...mapState({
      hasMore: state => state.topic.topicData.hasMore,
      list: state => state.topic.topicData.list
    })
  },
  watch: {
    id: {
      handler() {
        //初始化请求
        this.$store.dispatch("topic/getTopicListAction", {
          id: this.id,
          size: this.size,
          page: this.page,
          type: "init"
        });
      },
      immediate: true
    },
    list(newVal, oldVal) {
      //请求数据完成，关闭下拉的动画
      if (oldVal.length > 0 && newVal.length > oldVal.length) {
        //请求数据完成，关闭加载更多的动画
        this.$refs.infiniteScroll.endLoadMore();
      }
      if (newVal.length <= oldVal.length) {
        //请求数据完成，关闭下拉的动画
        this.$refs.infiniteScroll.endRefresh();
      }
    }
  },
  methods: {
    //刷新数据
    refreshAction() {
      this.page = 1;
      this.$store.dispatch("topic/getTopicListAction", {
        id: this.id,
        size: this.size,
        page: this.page,
        type: "refresh"
      });
    },
    //加载更多数据
    loadmoreAction() {
      this.page += 1;
      this.$store.dispatch("topic/getTopicListAction", {
        id: this.id,
        size: this.size,
        page: this.page,
        type: "loadmore"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.topic {
  background: #efefef;
}
.item {
  margin-top: 10px;
  padding: 10px;
}
</style>
