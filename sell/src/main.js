// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import seller from 'components/seller/seller';
import rating from 'components/rating/rating';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: goods
  },
  {
    path: '/goods',
    component: goods
  },
  {
    path: '/seller',
    component: seller
  },
  {
    path: 'rating',
    component: rating
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

new Vue({
  router,
  'render': h => h(App)
}).$mount('#app');
