import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "amfe-flexible/index.js";
import "minireset.css";
import plugins from "./plugins";
// import VueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/swiper-bundle.css";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import ElementUi from "element-ui";
// import screenfull from "screenfull";
import dataV from "@jiaminghi/data-view";
import Video from "video.js";
import "video.js/dist/video-js.css";
import "videojs-flash";
import "videojs-flash"; // 要播放rtmp流, 就必须引入这哥们
import hls from "videojs-contrib-hls";
import scroll from "vue-seamless-scroll";
import tableScroll from "./assets/js/tableScroll";
Vue.use(scroll);
Vue.use(hls);
Vue.use(dataV);
// Vue.use(Image)
Vue.use(ElementUi);
// Vue.use(VueAwesomeSwiper);
Vue.use(plugins);

Vue.prototype.$axios = axios;
Vue.prototype.$video = Video;
Vue.prototype.$tableScroll = tableScroll;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
