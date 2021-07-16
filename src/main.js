import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import MocoApi from "./MocoApi";

if (!process.env.VUE_APP_MOCO_DOMAIN || process.env.VUE_APP_MOCO_DOMAIN === 'YOUR-MOCO-DOMAIN') {
    throw new Error('You must set your Moco domain!');
}

MocoApi.domain = process.env.VUE_APP_MOCO_DOMAIN;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

