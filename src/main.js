import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'

import * as bootstrap from 'bootstrap';


import {router} from './router';

createApp(App).use(router).mount('#app')
