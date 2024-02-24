import { createApp } from 'vue'
import App from './src/App.vue'

// Import our custom CSS
import './src/scss/styles.scss'

import './src/css/main.css'

// Import all of Bootstrap's JS
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).mount('#app')

console.log("TESTING")