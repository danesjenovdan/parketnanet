import './assets/scss/main.scss'

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

// firebase
var VueFire = require('vuefire');
var firebase = require('firebase');
Vue.use(VueFire);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
