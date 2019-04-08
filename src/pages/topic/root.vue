<template>
  <div>
    <div class="page" id="topic">
      <app-header title="发现" :hasBackBtn="false"/>
      <nav class="nav border-bottom">
        <li
          class="nav-item"
          @click="selectNavAction(index)"
          v-for="(item,index) in navList"
          :key="item.tabId"
          :class="{active:index===selectIndex}"
        >{{item.tabName}}</li>
      </nav>

      <keep-alive>
        <top-content v-if="selectId==9"></top-content>
        <show-order-content v-else-if="selectId==7"/>
        <topic-content v-else :id="selectId"/>
      </keep-alive>

      <preview-goods v-if="showPreview"></preview-goods>
    </div>
    <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import TopContent from "./children/top-content";
import TopicContent from "./children/topic-content";
import ShowOrderContent from "./children/show-order-content";
import PreviewGoods from "./children/preview-goods";
import { mapState } from "vuex";
export default {
  components: {
    [TopicContent.name]: TopicContent,
    [ShowOrderContent.name]: ShowOrderContent,
    [TopContent.name]: TopContent,
    [PreviewGoods.name]: PreviewGoods
  },
  data() {
    return {
      navList: [
        { tabId: 9, tabName: "推荐" },
        { tabId: 7, tabName: "晒单" },
        { tabId: 4, tabName: "达人" },
        { tabId: 13, tabName: "上新" },
        { tabId: 6, tabName: "HOME" }
      ],
      selectIndex: 2
    };
  },
  computed: {
    ...mapState({
      showPreview: state => state.topic.showPreview
    }),
    selectId() {
      return this.navList[this.selectIndex].tabId;
    }
  },
  methods: {
    selectNavAction(index) {
      this.selectIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
#topic {
  .nav {
    position: absolute;
    top: 36px;
    left: 0;
    width: 100%;
    height: 34px;
    display: flex;
    .nav-item {
      flex: 1;
      text-align: center;
      line-height: 34px;
      border-bottom: 2px solid transparent;
      font-size: 16px;
    }
    & .active {
      border-bottom: 2px solid rgb(223, 86, 86);
      color: rgb(223, 86, 86);
    }
  }
  .content {
    position: absolute;
    top: 78px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
