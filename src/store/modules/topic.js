import {
  api,
  request
} from '../../ajax'
import {
  connect
} from 'net';

const state = {
  topicData: {
    hasMore: true,
    list: []
  },
  showPreview: false,
  previewInfo: {
    listIndex: null,
    imgIndex: null
  },
  topTopicList: [],
  showOrderBannerData: {
    list: [],
    title: '',
    subtitle: ''
  },
  showOrderListData: {
    hasMore: true,
    list: []
  }
};
const mutations = {
  // 设置推荐的数据
  setTopTopicList(state, param) {
    state.topTopicList = param;
  },
  setTopicList(state, param) {
    let list = [];
    if (param.type === 'loadmore') {
      list = [...state.topicData.list, ...param.list];
    } else if (param.type === 'refresh' || param.type === 'init') {
      list = param.list;
    }
    state.topicData = {
      hasMore: param.hasMore,
      list
    }
  },
  setShowPreview(state, param) {
    // 是否预览
    if (param.show) {
      // 需要预览，取出下标
      state.previewInfo.listIndex = param.listIndex;
      state.previewInfo.imgIndex = param.imgIndex;
    } else {
      state.previewInfo.listIndex = null;
      state.previewInfo.imgIndex = null;
    }
    state.showPreview = param.show;
  },
  setShowOrderBanner(state, param) {
    state.showOrderBannerData = param;
  },
  setShowOrderList(state, param) {
    state.showOrderListData = {
      hasMore: param.hasMore,
      list: [...state.showOrderListData.list, ...param.list]
    };
  }
}
const actions = {
  // 请求推荐的数据
  async getTopTopicListAction(context, {
    id
  }) {
    let result = await request.get(api.TOPIC_LIST_API, {
      tabId: id
    });
    console.log(result);
    let newData = result.data.data.map(({
      ad,
      topics
    }) => {
      return {
        ad: ad && ad.picUrl,
        topics: topics.map(({
          topicId,
          type,
          title,
          subTitle,
          picUrl,
          readCount,
          avatar,
          nickname,
          itemList
        }) => {
          let newList = [];
          if (itemList) {
            // 处理上新的商品数据
            let length = Math.floor(itemList.length / 4) * 4;
            newList = itemList.splice(0, length);
          }
          return {
            id: topicId,
            type,
            title,
            subTitle,
            picUrl,
            readCount,
            avatar,
            nickname,
            itemList: newList
          }
        })
      }
    })
    context.commit('setTopTopicList', newData);
  },
  // 请求晒单的滚动数据
  async getShowOrderBannerAction(context) {
    let result = await request.get(api.TOPIC_SHOW_ORDER_BANNER_API);
    let newData = result.data.data.lookList.map(item => {
      return {
        id: item.topicId,
        picUrl: item.banner.picUrl
      }
    })
    context.commit('setShowOrderBanner', {
      list: newData,
      title: result.data.data.title,
      subtitle: result.data.data.subtitle
    })
  },
  //请求晒单页面的瀑布流数据
  async getShowOrderListAction(context, {
    page,
    size,
    type
  }) {
    let result = await request.get(api.TOPIC_SHOW_ORDER_LIST_API, {
      page,
      size,
      type
    });
    let newData = result.data.data.topicList.map(item => {
      return {
        id: item.topicId,
        picUrl: item.bannerInfo.picUrl,
        content: item.content,
        avatar: item.avatar,
        nickName: item.nickName,
        supportNum: item.supportNum,
        height: 0
      }
    });
    context.commit('setShowOrderList', {
      hasMore: result.data.data.hasMore,
      list: newData
    })
  },
  // 请求上新/home/达人数据
  async getTopicListAction(context, {
    id,
    size,
    page,
    type
  }) {
    let result = await request.get(api.TOPIC_LIST_API, {
      tabId: id,
      size,
      page
    });
    let hasMore = result.data.data.hasMore;
    let newData = result.data.data.result.map(({
      topicId,
      type,
      title,
      subTitle,
      picUrl,
      readCount,
      avatar,
      nickname,
      itemList
    }) => {
      let newList = [];
      if (itemList) {
        // 处理上新的商品数据
        let length = Math.floor(itemList.length / 4) * 4;
        newList = itemList.splice(0, length);
      }
      return {
        id: topicId,
        type,
        title,
        subTitle,
        picUrl,
        readCount,
        avatar,
        nickname,
        itemList: newList
      }
    });
    context.commit('setTopicList', {
      hasMore,
      list: newData,
      type
    });
  }

}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}