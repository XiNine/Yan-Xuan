import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import utils from './utils/index'
import store from './store/index'
 

//引入共公组件
// import Swiper from './components/Swiper.vue'
// import SwiperItem from './components/SwiperItem.vue'
// Vue.component(Swiper.name,Swiper); 
// Vue.component(SwiperItem.name,SwiperItem); 

Vue.config.productionTip = false;

Vue.use(utils)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

