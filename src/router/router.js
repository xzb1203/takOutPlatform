import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
// import { from } from 'core-js/fn/array'
import { checktoken } from "@/api/apis";
Vue.use(VueRouter)
const router =  new VueRouter({
  // mode: 'history',  //history 历史模式   hash HASH模式 性能更高
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      // 懒加载, 当hash值被匹配成功时,才会动态加载此页面
      component: () => import('../pages/Main'),
      // 子路由
      children: [
        // 首页
        {
          path: '/main/index',
          name: '/main/index',
          component: () => import('../pages/main/Index'),
          meta:{breadList:['首页']}
        },
        // 商品管理-添加商品
        {
          path: '/main/AddItem',
          name: '/main/AddItem',
          component: () => import('../pages/main/AddItem'),
          meta:{breadList:['商品管理','添加商品']}

        },
        //商品统计
        {
          path: '/main/Shop',
          name: '/main/Shop',
          component: () => import('../pages/main/Shop'),
          meta:{breadList:['销售统计','商品统计']}
        },
        //订单统计
        {
          path: '/main/Order',
          name: '/main/Order',
          component: () => import('../pages/main/Order'),
          meta:{breadList:['销售统计','订单统计']}
        },
        //订单管理
        {
          path: '/main/Oms',
          name: '/main/Oms',
          component: () => import('../pages/main/Oms'),
          meta:{breadList:['订单管理']}

        },
        //商品列表
        {
          path: '/main/ShopList',
          name: '/main/ShopList',
          component: () => import('../pages/main/ShopList'),
          meta:{breadList:['商品管理','商品列表']}
        },
        //商品添加
        {
          path: '/main/ShopAdd',
          name: '/main/ShopAdd',
          component: () => import('../pages/main/ShopAdd'),
          meta:{breadList:['商品管理','商品添加']}
        },
        //商品分类
        {
          path: '/main/ShopClass',
          name: '/main/ShopClass',
          component: () => import('../pages/main/ShopClass'),
          meta:{breadList:['商品管理','商品分类']}
        },
        //店铺管理
        {
          path: '/main/StoreAdm',
          name: '/main/StoreAdm',
          component: () => import('../pages/main/StoreAdm'),
          meta:{breadList:['店铺管理']}
        },
        //账号列表
        {
          path: '/main/AccList',
          name: '/main/AccList',
          component: () => import('../pages/main/AccList'),
          meta:{breadList:['账号管理','账号列表']}
        },
        //添加账号
        {
          path: '/main/AccAdd',
          name: '/main/AccAdd',
          component: () => import('../pages/main/AccAdd'),
          meta:{breadList:['账号管理','添加账号']}
        },
        //修改密码
        {
          path: '/main/AccPsw',
          name: '/main/AccPsw',
          component: () => import('../pages/main/AccPsw'),
          meta:{breadList:['账号管理','修改密码']}
        },
        //管理员信息
        {
          path: '/main/UserMsg',
          name: '/main/UserMsg',
          component: () => import('../pages/main/UserMsg')
        }
      ]
    }
  ]
})
// 路由拦截
router.beforeEach((to,from,next)=>{
  if(to.path != '/'){
    checktoken(localStorage.token).then(res=>{
      if(res.data.code==0){
        next()
      }else{
        next('/')
      }
    })
  }else{
    next()
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router;

