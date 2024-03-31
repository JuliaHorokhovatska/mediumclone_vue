import {createRouter, createWebHistory} from 'vue-router';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';

const routes = [
  // {path: '/', redirect: '/register'},
  {path: '/', name: 'home', component: Home},
  {path: '/register', name: 'register', component: Register},
  {path: '/login', name: 'login', component: Login},
];

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;
