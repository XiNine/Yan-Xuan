import Scroll from '../components/Scroll.vue'
import Header from '../components/Header.vue'
import InfiniteScroll from '../components/InfiniteScroll.vue'
import { Icon,Popup,Loading,Lazyload } from 'vant'

export default {
    install(Vue){
        Vue.component(Scroll.name,Scroll);
        Vue.component(Header.name,Header);
        Vue.component(InfiniteScroll.name,InfiniteScroll);
        Vue.component(Icon.name,Icon);
        Vue.component(Popup.name,Popup);
        Vue.component(Loading.name,Loading);
        Vue.use(Lazyload);
    }
}