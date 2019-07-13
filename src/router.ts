import Vue from 'vue'
import Router from 'vue-router'
import NewsView from './views/News.vue'
import NotFound from './views/NotFound.vue'
import AgendaView from './views/Agenda.vue'
import WhatElseView from '@/views/Festival.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/agenda/page/:page',
            name: 'agenda',
            component: AgendaView,
            props: true
        },
        {
            path: '/news',
            name: 'news',
            component: NewsView,
            props: true
        },        {
            path: '/what-else',
            name: 'festivals',
            component: WhatElseView,
            props: true
        },
        {path: '/', redirect: '/agenda'},
        {path: '/agenda', redirect: '/agenda/page/1'},
        {path: '*', component: NotFound}
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})
