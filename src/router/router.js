import Vue from 'vue'
import Router from 'vue-router'
import homeRoute from './home';
import categoryRoute from './category';
import topicRoute from './topic'
import cartRoute from './cart'
import mineRoute from './mine'

Vue.use(Router)

const routes = [
  homeRoute,
  categoryRoute,
  topicRoute,
  cartRoute,
  mineRoute,
  {
    path:'**',
    redirect:'/home'
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
