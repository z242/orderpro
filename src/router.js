import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './pages/Home'
import Main from './pages/home/Main'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            children: [{
                    path: '/',
                    name: 'home/main',
                    component: Main,
                },
                {
                    path: '/home/comment',
                    name: 'home/comment',
                    component: () => import('./pages/home/Comment')
                },
                {
                    path: '/home/merchant',
                    name: 'home/merchant',
                    component: () => import('./pages/home/Merchant')
                },
            ]
        },
        {
            path: '/details',
            name: 'details',
            component: () => import('./pages/Details'),
        }
    ]
})