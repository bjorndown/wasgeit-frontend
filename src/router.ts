import Vue from 'vue';
import Router from 'vue-router';
import Agenda from './views/Agenda.vue';
import News from './views/News.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/', redirect: '/agenda'},
    {
      path: '/agenda',
      name: 'agenda',
      component: Agenda,
      props: true
    },
    {
      path: '/news',
      name: 'news',
      component: News,
      props: true
    }
  ]
});
