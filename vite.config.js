import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
    // base: "/js3g21-software-ecology-insights/",
    base: "/",
    plugins: [vue()],
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
})

// const path = require('path')
//
// export default {
//     root: path.resolve(__dirname, 'src'),
//     resolve: {
//         alias: {
//             '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
//         }
//     },
//     server: {
//         port: 8080,
//         hot: true
//     }
// }
