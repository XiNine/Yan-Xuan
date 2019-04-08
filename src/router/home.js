const route = {
    path: '/home',
    component: () => import('../pages/home/root.vue'),
    children: [{
            path: 'cate/:cateId',
            component: () => import('../pages/home/category-list'),
            props: true,
            children: [{
                path: 'detail/:goodsId',
                component: () => import('../pages/common/goods-detail.vue'),
                props: true
            }]
        },
        {
            path: 'detail/:goodsId',
            component: () => import('../pages/common/goods-detail.vue'),
            props: true
        }
    ]
}

export default route;