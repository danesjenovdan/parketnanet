import Vue from 'vue';
import Router from 'vue-router';
import Game from './views/Game.vue';
import Login from './views/Login.vue';
import OpponentSelection from './views/OpponentSelection.vue';

import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    }, {
      path: '/',
      name: 'game',
      component: Game,
      meta: {
        requiresAuth: true
      },
    }, {
      path: '/opponent-selection',
      name: 'oponnent-selection',
      component: OpponentSelection,
      meta: {
        requiresAuth: true
      },
    }, {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('game');
  } else {
    next();
  }
});

export default router;