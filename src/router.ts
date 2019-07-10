import Vue from 'vue'
import Router from 'vue-router'
import Agenda from './views/Agenda.vue'
import News from './views/News.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/agenda/page/:page',
            name: 'agenda',
            component: Agenda,
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
    ]
})
