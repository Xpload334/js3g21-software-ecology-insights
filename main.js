// /src/main.js
import { createApp } from 'vue';
import AppRouter from "./AppRouter.vue";
import router from './src/router'

//Import BootstrapVue
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import {BootstrapVue} from 'bootstrap-vue'

const app = createApp(AppRouter);

app.use(router);
// app.use(BootstrapVue);
app.mount('#app');
