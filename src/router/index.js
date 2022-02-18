import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
const Main = () => import('@/views/AppMain.vue');
const Fav = () => import('@/views/AppFav.vue');
const Login = () => import('@/views/AppLogin.vue');
const Error = () => import('@/views/AppError.vue');

let routes = [
  {
    name: 'main',
    path: '/',
    component: Main,
    meta: { auth: true },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: { auth: false },
  },
  {
    name: 'fav',
    path: '/favorite',
    component: Fav,
    meta: { auth: true },
  },
  {
    name: 'E404',
    path: '/:pathMatch(.*)',
    component: Error,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    await store.getters['user/awaitAuth'];
    store.getters['user/isLogin'] ? next() : next({ name: 'login' });
  }
  else if (to.meta.auth === false) {
    await store.getters['user/awaitAuth'];
    console.log(store.getters['user/isLogin'])
    store.getters['user/isLogin'] ? next({ name: 'main' }) : next();
  }
  else {
    next();
  }
});

export default router;


