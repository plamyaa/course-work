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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
