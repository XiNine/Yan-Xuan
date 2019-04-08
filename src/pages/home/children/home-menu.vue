<template>
  <div>
    <div class="home-menu">
      <!-- 横向菜单列表 -->
      <ly-tab
        v-if="menuList.length>1"
        v-show="showMenu===false"
        :value="value"
        @input="selectMenuItem"
        :items="menuList"
        :options="{activeColor: '#b4282d'}"
      ></ly-tab>

      <!-- 箭头 -->
      <div class="arrow">
        <span></span>
        <span @click="changeMenuAction">
          <van-icon :class="{active: showMenu}" name="arrow-down"/>
        </span>
      </div>

      <!-- 下拉菜单 -->
      <transition enter-active-class="slideInDown" leave-active-class="slideOutUp">
        <div v-if="showMenu" class="bg">
          <h4 class="title">全部频道</h4>
          <ul class="show-menu">
            <li
              class="menu-item"
              :class="{active: value === index}"
              v-for="(item, index) in menuList"
              :key="item.id"
              @click="selectMenuItem(index)"
            >
              <span>{{item.label}}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="cover" v-if="showMenu"></div>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LyTab from "ly-tab";
export default {
  name: "home-menu",
  components: {
    [LyTab.LyTab.name]: LyTab.LyTab
  },
  props: {
    // 选中的菜单列表
    value: Number
  },
  data() {
    return {
      // 显示下拉菜单
      showMenu: false
    };
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      list: state => state.home.menuList
    }),
    menuList() {
      return [{ id: 0, label: "推荐" }, ...this.list];
    }
  },
  methods: {
    // 菜单选项的点击事件
    selectMenuItem(index) {
      this.$emit("input", index);
      this.showMenu = false;
    },
    // 切换菜单栏
    changeMenuAction() {
      this.showMenu = !this.showMenu;
    }
  },
  created() {
    // 请求菜单列表
    this.$store.dispatch("home/getMenuAction");
  }
};
</script>

<style socped lang="scss">
.home-menu {
  width: 100%;
  height: 26px;
  position: absolute;
  left: 0;
  top: 44px;
  z-index: 5;
  .arrow {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 39px;
    padding-top: 8px;
    box-sizing: border-box;
    display: flex;
    background: transparent;
    z-index: 6;
    span {
      flex: 1;
    }
    .van-icon {
      display: block;
      text-align: center;
      line-height: 24px;
      transition: transform 300ms;
    }
    .van-icon.active {
      transform: rotate(180deg);
    }
    span:nth-of-type(1) {
      background-image: linear-gradient(
        left,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
    }
    span:nth-of-type(2) {
      background-color: #fff;
    }
  }
  .show-menu {
    background: #fff;
    padding: 8px;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .title {
    background: #fff;
    margin: 0;
    padding: 8px 0;
  }
  .menu-item {
    width: 25%;
    float: left;
    padding: 8px;
    box-sizing: border-box;
    span {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #999;
      text-align: center;
      line-height: 18px;
      border: 1px solid #999;
      border-radius: 4px;
    }
    &.active span {
      color: #b4282d;
      border: 1px solid #b4282d;
    }
  }
}
.cover {
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 4;
}
</style>
<style>
.home-menu .ly-tabbar .ly-tab-list {
  padding-right: 45px;
  padding: 9px 24px;
  overflow: hidden;
}
</style>
