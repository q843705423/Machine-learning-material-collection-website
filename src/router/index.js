import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login"
import Home from "@/components/Home"
import Main from "@/components/Main"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { homedir } from 'os';
Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'home',
          component:Home,
        },
      ]
    },{
      path:"/login",
      name:"Login",
      component:Login
    },{
      path:"/main",
      name:"Main",
      component:Main,
    }
  ]
})
