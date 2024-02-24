import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from 'views/Search.vue';
import Dashboard from 'views/Dashboard.vue';

const routes = [
    { path: '/', component: Search },
    { path: '/dashboard', component: Dashboard },
];

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We
    // are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})



export default router;
