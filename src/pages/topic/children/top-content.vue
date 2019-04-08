<template>
  <app-scroll class="content topic">
    <div v-for="(item, index) in topList" :key="index">
      <div class="ad item">
        <img :src="item.ad">
      </div>
      <ul>
        <template v-for="value in item.topics">
          <component :key="value.topicId" :data="value" :is="`item-type${value.type}`"/>
        </template>
      </ul>
    </div>
  </app-scroll>
</template>

<script>
import { mapState } from "vuex";
import TopItem0 from "./topic-item.type0";
import TopItem1 from "./topic-item.type1";
import TopItem2 from "./topic-item.type2";
import TopItem7 from "./topic-item.type7";
import TopItem8 from "./topic-item.type8";
export default {
  name: "top-content",
  components: {
    [TopItem0.name]: TopItem0,
    [TopItem1.name]: TopItem1,
    [TopItem2.name]: TopItem2,
    [TopItem7.name]: TopItem7,
    [TopItem8.name]: TopItem8
  },
  computed: {
    ...mapState({
      topList: state => state.topic.topTopicList
    })
  },
  created() {
    this.$store.dispatch("topic/getTopTopicListAction", { id: 9 });
  }
};
</script>


<style lang="scss" scoped>
.topic {
  background: #efefef;
  .item {
    margin-top: 10px;
    background: #fff;
    padding: 10px;
  }
  .ad {
    padding: 10px;
    img {
      width: 100%;
    }
  }
}
</style>
