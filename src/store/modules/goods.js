import {
  api,
  request
} from '../../ajax/index'

const state = {
  cateDatail: {
    id: '',
    url: '',
    list: []
  },
  subCateDetail:{
    title:'',
    list:[]
  },
  goodsDetail:null,
  showCover: false
};

const mutations = {
  setCateDetail(state, param) {
    state.cateDatail = param;
  },
  triggerCover(state, param) {
    state.showCover = param;
  },
  setSubCateDetail(state,param){
    state.subCateDetail = param;
  },
  setGoodsDetail(state,param){
    state.goodsDetail = param;
  }
};

const actions = {
  //请求分页详情的商品
  async getCateDetailAction(context, {id}) {
    console.log(id, context.state.cateDatail.id);
    if (id != context.state.cateDatail.id) {
      //清空上一个页面的数据
      context.commit('setCateDetail', {
        id: '',
        url: '',
        list: []
      })
    }
    // 显示加载指示器
    context.commit('triggerCover', true)

    //请求数据
    // let result = await request.get(api.HOME_CATE_DETAIL_API, {id});
    let result = {};
    result.data = require('../../data/catelist.json')

    //处理数据
    let url = result.data.data.currentCategory.bannerUrl;
    let newData = result.data.data.categoryItemList.map(item => {
      let newItem = {
        title: item.category.name,
        subtitle: item.category.frontName,
        id: item.category.id
      };
      newItem.list = item.itemList.map(value => {
        return {
          id: value.id,
          title: value.name,
          picUrl: value.primaryPicUrl,
          counterPrice: value.counterPrice,
          retailPrice: value.retailPrice,
          colorNum: value.colorNum,
          simpleDesc: value.simpleDesc,
          itemTagList: value.itemTagList.map(({name}) => name)
        }
      })
      return newItem
    })
    //提交数据
    context.commit('setCateDetail', {
      url: url,
      list: newData,
      id
    });
    context.commit('triggerCover', false)
  },
  //请求分类子页面的数据
  async getSubCateDetailAction(context, param) {
    //清除原来的数据
    context.commit('setSubCateDetail',{title:'',list:[]})

    //请求新数据
    let result = await request.get(api.CATE_SUB_MENU_API, {categoryId: param.categoryId, subCategoryId: param.subCateId});
    //处理数据
    let subCateTitle = result.data.data.category.frontName;
    let newData = result.data.data.itemList.map(value => {
      return {
        id: value.id,
        title: value.name,
        picUrl: value.primaryPicUrl,
        counterPrice: value.counterPrice,
        retailPrice: value.retailPrice,
        colorNum: value.colorNum,
        simpleDesc: value.simpleDesc,
        itemTagList: value.itemTagList.map(({name}) => name)
      }
    })
    context.commit('setSubCateDetail',{title:subCateTitle,list:newData})
  },
  async getGoodsDetaAction(context,{id}){
    let result = await request.get(api.GOODS_DETAIL_API,{id});
    console.log(result)
    context.commit('setGoodsDetail',{
      detail:result.data.data.itemDetail.detailHtml,
      videoUrl:result.data.data.itemDetail.videoInfo.webmVideoUrl
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}