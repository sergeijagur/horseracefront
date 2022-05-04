import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import User from "@/views/Signup";
import Customer from "@/views/Customer";
import PlayGame from "@/views/PlayGame";
import signup from "@/views/Signup";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/customer',
    //     name: 'CustomerRoute',
    //     component: Customer
    // },
    {
        path: '/signup',
        name: 'SignupRoute',
        component: signup
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
        path: '/game',
        name: 'GameRoute',
        component: PlayGame
    },

    {
        path: '/admin',
        name: 'AdminRoute',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/PlayGame.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
