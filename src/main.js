import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

import {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import store from "@/store/store.js";

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
