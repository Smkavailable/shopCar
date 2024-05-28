import { createRouter, createWebHistory } from 'vue-router'
import HomeVue from '../views/Home.vue'
// pinia
import { useUserStore } from "@/stores/user";
// 踩坑：在vue-router中使用pinia，不能在外部定义
// const userStore = useUserStore();
import { ElMessage } from "element-plus";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeVue,
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../views/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('../views/Register.vue'),
        },
        {
            path: '/goods',
            name: 'goods',
            component: () =>
                import ('../views/Goods.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('../views/About.vue'),
        },
        {
            path: '/details',
            name: 'details',
            component: () =>
                import ('../views/Details.vue'),
        },
        {
            path: '/shoppingCart',
            name: 'shoppingCart',
            component: () =>
                import('../views/ShoppingCart.vue'),
            beforeEnter: (to, from, next) => {
                const userStore = useUserStore();
                if (userStore.userInfo.tokenCode) {
                    // ElMessage.success("账号已登录！");
                    next()
                } else {
                    ElMessage.error("账号未登录，请先登录！");
                    next({ path: '/login' })
                }
            }
        },
    ],
    // 设置页面自动滚动到顶部
    scrollBehavior() {
        return { top: 0 }
    }
})


//全局前置导航守卫
// router.beforeEach((to, from, next) => {
//     let isLogin = false
//     console.log(to)
//     if (to.path.indexOf('courseDetail') !== -1) {
//         if (isLogin) {
//             next()
//         } else {
//             next({ path: '/login' })
//         }
//     } else {
//         next()
//     }
// })
export default router