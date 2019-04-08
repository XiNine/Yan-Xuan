import {api,request} from '../../ajax/index'

const state = {
    navData:[],
    menuData:{
        url:'',
        data:[]
    }
}

const mutations = {
    setNavData(state,param){
     state.navData = param;
    },
    setMenuData(state,param){
        state.menuData = param;
    }
}

const actions = {
    //请求左边栏数据
    async getNavDataAction(context){
        let result = await request.get(api.CATE_NAV_API);
        let newData = result.data.data.map(({id,name})=>({id,name}));
        context.commit('setNavData',newData)
    },

    //请求默认右边栏菜单数据
    async getMenuDataAction(context,{id}){
     let result = await request.get(api.CATE_MENU_API,{categoryId:id});
     let url = result.data.data.currentCategory.wapBannerUrl;
     let navData = result.data.data.categoryGroupList.map(({id,name,categoryList})=>{
         let list = categoryList.map(({id,name,wapBannerUrl})=>({id,name,bannerUrl:wapBannerUrl}));
         return {
             id,
             name,
             list
         }
     })
     context.commit('setMenuData',{url,data:navData})
    },
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}