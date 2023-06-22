import { createRouter, createWebHistory } from 'vue-router';

import AppAdvSearch from './pages/AppAdvSearch.vue'

import AppHome from './pages/AppHome.vue';

const router = createRouter({

  history: createWebHistory(),

  routes: [
    {
      path:'/',
      name:'home',
      component: AppHome,
    },

    {
      path:'/search',
      name:'search',
      component: AppAdvSearch,
    },
    
  ],

});

export { router };