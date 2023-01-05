import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Main.vue'),
  },
  {
    path: '/newsCreate',
    name: 'newsCreate',
    component: () => import('@/views/CreateNews.vue'),
  },
  {
    path: '/newsEdit/:id',
    name: 'newsEdit',
    component: () => import('@/views/CreateNews.vue'),
    props: true,
  },
  {
    path: '/newsPage/:id',
    name: 'newsPage',
    component: () => import('@/views/NewsPage.vue'),
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
