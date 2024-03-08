import { createRouter, createWebHistory } from 'vue-router'

// Import our custom CSS
import '../scss/styles.scss'

import '../css/main.css'

// Import all of Bootstrap's JS
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

//BootstrapVue
// import "bootstrap-vue/dist/bootstrap-vue.min.css"
// import "bootstrap-vue"

//Import components
import Home from "../views/Home.vue";
import NotFound from "../connectionFail/NotFound.vue";


const routes = [
    { path: '/', component: Home },
    { path: '/dashboard/:owner/:repo', component: Home},
    // Add a wildcard route for 404 errors
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: { requiresConnection: true }, // Add a meta field to indicate that connection is required
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     // Check if the route requires a connection
//     if (to.meta.requiresConnection) {
//         // Implement your logic to check server connection
//         const isServerConnected = /* Your logic to check server connection */ true;
//
//         if (!isServerConnected) {
//             // Redirect to the custom error page
//             next('/404');
//         }
//     }
//
//     // Continue with the navigation
//     next();
// });
// Vue.use(VueRouter)

// const app = createApp(AppRouter)
//
// app.use(router)
// app.mount('#appRouter')
export default router;