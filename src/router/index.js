import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/pages/Main.vue'),
    },
    {
        path: '/authorization',
        name: 'authorization',
        component: () => import('@/pages/Authorization.vue'),
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('@/pages/Registration.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/pages/Profile.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
