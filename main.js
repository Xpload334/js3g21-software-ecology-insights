// /src/main.js
import { createApp } from 'vue';
import AppRouter from "./AppRouter.vue";
import router from './src/router'

const app = createApp(AppRouter);

app.use(router);
app.mount('#app');
