import './assets/scss/main.scss'

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

// firebase
var VueFire = require('vuefire');
var firebase = require('firebase');
Vue.use(VueFire);

const config = {
  apiKey: 'AIzaSyCoxecQljnOHkZ5Vme96Vy1ktIaFSjibCY',
  authDomain: 'parketnanet.firebaseapp.com',
  databaseURL: 'https://parketnanet.firebaseio.com',
  projectId: 'parketnanet',
  storageBucket: 'parketnanet.appspot.com',
  messagingSenderId: '469908235514'
};

firebase.initializeApp(config);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');