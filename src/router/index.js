import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import User from "@/views/User";
import Customer from "@/views/Customer";

Vue.use(VueRouter)

const routes = [
    {
        path: '/customer',
        name: 'CustomerRoute',
        component: Customer
    },
    {
        path: '/user',
        name: 'UserRoute',
        component: User
    },
    {
        path: '/log-in',
        name: 'LoginRoute',
        component: Login
    },
    {
        path: '/',
        name: 'HomeRoute',
        component: Home
    },
    {
        path: '/about',
        name: 'AboutRoute',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
