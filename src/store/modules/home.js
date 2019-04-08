import {
    api,
    request
} from '../../ajax/index'
const state = {
    //商品总是
    total: 0,
    //首页菜单
    menuList: [],
    //首页轮播图
    bannerList: [],
    //赋值首页的分类
    cateList: []
};

const mutations = {
    //赋值商品总数
    setTotal(state, param) {
        state.total = param
    },
    //首页菜单的赋值
    setMenu(state, param) {
        state.menuList = param;
    },
    //首页轮播图的赋值
    setBanner(state, param) {
        state.bannerList = param;
    },
    //赋值首页的分类
    setCateList(state, param) {
        state.cateList = param;
    }
};

const actions = {
    //请求商品总数
    async getTotalAction(context) {
        let result = await request.get(api.GOODS_TOTAL_API);
        let total = result.data.data.total;
        context.commit('setTotal', total);
    },
    //请求首页的菜单
    async getMenuAction(context) {
        let result = await request.get(api.HOME_MENU_API);
        let newData = result.data.data.map(({ id,name}) => ({ id,label:name}));
        context.commit('setMenu', newData)
    },
    //请求首页轮播图数据
    async getBannerAction(context) {
        let result = await request.get(api.HOME_BANNER_API);
        let newData = result.data.data.map(({id,picUrl}) => ({ id, picUrl}));
        context.commit('setBanner', newData);
    },
    //请求首页下的分类数据
    async getCateListAction(context) {
        let result = await request.get(api.HOME_CATE_API);
        let newData = result.data.data.kingKongList.map(({ picUrl, text, schemeUrl}) => {
            // 处理url，获得id
            // 正则匹配参数
            let name = 'categoryId';
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let index = schemeUrl.indexOf('?');
            let query = schemeUrl.substring(index + 1);
            var r = query.match(reg);
            let id = '';
            if (r != null) {
                id = unescape(r[2]);
            }
            return {
                picUrl,
                text,
                id
            }
        });
        context.commit('setCateList', newData);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}