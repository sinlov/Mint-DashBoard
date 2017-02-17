/**
 * Created by sinlov on 17/2/17.
 */

import VueRouter from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      root: true
    },
    component: require('./views/index.vue')
  }
]

const routerConfig = new VueRouter({
  mode: 'hash', //  hash 模式  history 模式
  base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
  routes: routes // （缩写）相当于 routes: routes
})

function routerFactory (Vue) {
  Vue.use(VueRouter)

  routerConfig.beforeEach((to, from, next) => {
    // 如果路由切换的时候Menu是开启的($currentMenuId)，
    // 则掉起$closeMenu()，之后监听ionClose事件，
    // 再执行next();
    if (!!Vue.prototype.$actionSheet && Vue.prototype.$actionSheet.isActive) {
      Vue.prototype.$actionSheet.dismiss().then(function () {
        // next()
      }, function () {
        // next(false)
      })
      next()
    } else if (!!Vue.prototype.$menu && !!Vue.prototype.$menu.currentMenuId) {
      Vue.prototype.$menu.close().then(function () {
        next()
      }, function () {
        next(false)
      })
    } else {
      next()
    }
  })
  return routerConfig
}
export default routerFactory
