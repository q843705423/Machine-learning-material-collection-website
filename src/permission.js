import router from './router'


const _import = require('./router/_import_development.js')//获取组件的方法
import request from '@/utils/Axios'
import Cookies from 'js-cookie'
import axios from 'axios'
import {Message} from 'element-ui'
import Main from "@/components/Main"
import TaskShow from "@/components/union/TaskShow"

var myRouter = null;

router.beforeEach((to, from, next) => {

  document.title = '赋能平台';
  let needRefreshRouter = localStorage.getItem('needRefreshRouter');
  if (needRefreshRouter === '1') {
    myRouter = null
    localStorage.clear()
  }
  if (isAccessLoginInterface(to)) {
    next();
    return
  }
  if (haveNotToken()) {
    clearRouterInLocalStorage();
    next('/login');
    return
  }
  if (hasRouterInMemory()) {
    next();
    return;
  }

  if (localStorageHaveNotRouter()) {
    requestMenu().then(res => {
      let menuJsonString = JSON.stringify(res.data.data);
      saveRouterJsonStringInLocalStorage(menuJsonString);
      menuJsonString = getRouterJsonStringFromLocalStorage();
      myRouter = generateRouterByJSONString(menuJsonString);
      applyRoutingAndJump(next, to)
    })

  } else {
    let jsonString = getRouterJsonStringFromLocalStorage();
    myRouter = generateRouterByJSONString(jsonString);
    applyRoutingAndJump(next, to)
  }

});


/**
 *
 * @param jsonString
 */
function generateRouterByJSONString(jsonString) {
  let menuList = JSON.parse(jsonString);
  let newMenuList = [];
  for (let i = 0; i < menuList.length; i++) {
    newMenuList.push({
      path: menuList[i].path,
      name: menuList[i].name,
      hidden: false,
      component: _import(menuList[i].component),
    });
  }
  myRouter = [
    {
      hidden:false,
      path: "/",
      name: "Main",
      component: Main,
      children: newMenuList
    }];
  return myRouter;
}


function requestMenu() {
  return request({
    url: "menu/list",
    method: "POST",
  })
}

function changeRouter(list) {

  myRouter = [
    {
      path: "/",
      name: "Main",
      component: Main,
      children: [
        {
          name: "task",
          path: "task",
          component: _import('components/union1/TaskShow')
        },

      ]
    }
  ]
}


function getRouterJsonStringFromLocalStorage() {
  return localStorage.getItem('router')
}

function transformString2Compoent(res) {
  if (res === undefined) {
    return
  }
  if (res.length === 0) {
    return
  }
  for (let i = 0; i < res.length; i++) {
    let data = res[i]
    data.children = transformString2Compoent(data.children)
    if (data.component == null || data.component === '') {
      delete data.component
    } else if (data.component === 'Layout') {
      data.component = Layout
    } else {
      data.component = _import(data.component)
    }
    if (data.path.indexOf('http') !== -1) {
      data.children = []
      data.children.push({
        path: data.path,
        meta: data.meta
      })
    }
    res[i] = data
  }
  return res
}

var myRouter = null

function isAccessLoginInterface(to) {
  return to.path === '/login'
}


function haveNotToken() {
  let token = localStorage.getItem("ks")
  return token === null || token === undefined || token === ''
}

function clearRouterInLocalStorage() {
  localStorage.setItem('router', '')
}

function hasRouterInMemory() {
  return myRouter != null
}

function localStorageHaveNotRouter() {
  let json = getRouterJsonStringFromLocalStorage()
  return json === undefined || json == null || json === '' || json === 'undefined' || json === '[]'
}

function getRouterJsonStringFromLocalStorage() {
  return localStorage.getItem('router')
}

function saveRouterJsonStringInLocalStorage(menuJsonString) {
  localStorage.setItem('router', menuJsonString)
}


function applyRoutingAndJump(next, to) {
  if (myRouter !== null && myRouter !== undefined) {
    router.addRoutes(myRouter);
    global.antRouter = myRouter;
    next({...to, replace: true});
  } else {
    Message({
      message: '该账号没有权限访问任何菜单,请联系管理员分配权限',
      type: 'error',
      duration: 5000
    })
    localStorage.clear()

  }
}


function getPath(data, res) {
  if (data === undefined) {
    return res
  }
  for (let i = 0; i < data.length; i++) {
    let newResult = res + '/' + data[i].path
    let newPath = getPath(data[i].children, newResult)
    if (newPath !== undefined && newPath !== '') {
      return newPath
    }
  }
}

