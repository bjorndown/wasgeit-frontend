import Vue from 'vue'
import Router from 'vue-router'
import News from './views/News.vue'
import NotFound from './views/NotFound.vue'
import AgendaView from './views/Agenda.vue'

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
            component: News,
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
