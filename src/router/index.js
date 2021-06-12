import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "../views/login/index.vue";
import Index from "../views/index/index.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/index",
      component: Index,
    }
  ]
})
