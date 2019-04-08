//开发环境
const DEV_HOST = 'http://localhost:8080';
//测试环境
const SET_HOST = 'http://129.204.72.71:3000';
//生产环境
const PRO_HOST = 'http://129.204.72.71:80';

/*
说明： 商品总数接口
请求方式：GET
参数： 无
*/
const GOODS_TOTAL_API = '/api/goodsItem/total';

/*
说明： 首页菜单接口
请求方式：GET
参数： 无
*/
const HOME_MENU_API = '/api/catelist';

/*
说明： 首页轮播图接口
请求方式：GET
参数： 无
*/
const HOME_BANNER_API = '/api/home/bannerlist';

/*
首页分类数据接口
请求方式：GET
参数： 无
*/ 
const HOME_CATE_API = '/api/home/catelist';

/*
分类列表数接口
method: GET
params: id(Y)
*/
const HOME_CATE_DETAIL_API = '/api/home/catelist/itemlist';

/*
 分类接口
 method: GET
 */
const CATE_NAV_API = '/api/category/listmap';

/*
分类数据接口
method: GET
params: categoryId(Y)
*/
const CATE_MENU_API = '/api/category/listmap/group';


/*
分类商品列表接口
method: GET
params: categoryId(Y)     subCategoryId(Y)
*/
const CATE_SUB_MENU_API = '/api/category/listmap/group/item';

/*
商品详情接口
method: GET
params: id(Y)  
*/
const GOODS_DETAIL_API = '/api/item/detail';

/*
识物tab列表数据接口
method: GET
params: tabId(默认值:9) size(默认值：10) page(默认值：1)
*/
const TOPIC_LIST_API = '/api/topic/find/getTabData';

// 晒单的滚动数据
// method: GET
// params:无
const TOPIC_SHOW_ORDER_BANNER_API = '/api/topic/find/getTabShowBanner';


// 晒单的瀑布流数据
// method: GET
// params:page  size  type:1最新，2本月最热，3晒单合辑
const TOPIC_SHOW_ORDER_LIST_API = '/api/topic/find/getTabShowData';


export default {
    HOST: SET_HOST,
    GOODS_TOTAL_API,
    HOME_BANNER_API,
    HOME_MENU_API,
    HOME_CATE_API,
    HOME_CATE_DETAIL_API,
    CATE_NAV_API,
    CATE_MENU_API,
    CATE_SUB_MENU_API,
    GOODS_DETAIL_API,
    TOPIC_LIST_API,
    TOPIC_SHOW_ORDER_BANNER_API,
    TOPIC_SHOW_ORDER_LIST_API
}