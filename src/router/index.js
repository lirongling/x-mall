import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import Comm from '../views/Comm.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        // 重定向
        redirect: '/'
    },
    {
        path: "/",
        component: Comm,
        children: [{
            path: '/',
            name: "home",
            component: Home,
            meta: {
                title: '首页'
            }
        }, {
            path: '/goodsDetails',
            name: "goodsDetails",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/goodsDetails/GoodsDetails.vue'),
            meta: {
                title: '商品详情'
            }
        }, {
            path: '/goods',
            name: "goods",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/goods/Goods.vue'),
            meta: {
                title: '商品'
            }
        }],
    },
    {
        path: "/",
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/LoginComm'),
        children: [{
            path: '/login',
            name: "login",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/login/Login.vue'),
            meta: {
                title: '登录'
            }
        }, {
            path: '/register',
            name: "register",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/register/Register.vue'),
            meta: {
                title: '注册'
            }
        }],
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
        // let loginMsg = localStorage.getItem('loginMsg')
        // if (to.path==='/login')
        //     next()
        // else
        //     loginMsg ? next():next('/login')
        // if (to.path==='/edit'||to.path==='/look') {
        //     let a=to.query._id
        //     a ? next():next('/published')
        // }
        // console.log(from.path)
        // console.log(to.path === from.path)
        // if (!(from.path == '/login' && to.path === from.path)) {

    // } else {
    //     next(false)
    // }

    next()


})

export default router