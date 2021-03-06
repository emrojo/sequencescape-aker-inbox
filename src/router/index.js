import Vue from 'vue';
import Router from 'vue-router';
import Inbox from '@/components/Inbox';
import Login from '@/components/Login';
import store from '../store';

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/inbox',
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated,
    },
  ],
});
