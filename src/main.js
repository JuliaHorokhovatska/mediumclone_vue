import {createApp} from 'vue';
import router from './router/router';
import store from './store/store';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'

createApp(App)
.use(router)
.use(store)
.mount('#app');
