const route = {
    path: '/topic',
    component: ()=>import('../pages/topic/root'),
    children: [{
        path: 'detail/:goodsId',
        component: () => import('../pages/common/goods-detail.vue'),
        props: true
    }]
}

export default route;