import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/pages/Main.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
