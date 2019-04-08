const route = {
    path: '/category',
    component: () => import('../pages/category/root.vue'),
    children: [{
        path: 'subcate/:categoryId/:subCateId',
        component: () => import('../pages/category/sub-category'),
        props: true,
        children: [{
            path: 'detail/:goodsId',
            component: () => import('../pages/common/goods-detail.vue'),
            props: true
        }]
    }]
}

export default route;