import { createRouter, createWebHistory } from 'vue-router';

import AppAdvSearch from './pages/AppAdvSearch.vue'
import AppHome from './pages/AppHome.vue';
import AppOne from './pages/AppOne.vue';
import AppTwo from './pages/AppTwo.vue';
import NotFound from './pages/NotFound.vue';

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
    {
      path:'/AppOne',
      name:'AppOne',
      component: AppOne,
    },
    {
      path:'/AppTwo',
      name:'AppTwo',
      component: AppTwo,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: {
        title: '404'
      }
    }
    
  ],

});

export { router };