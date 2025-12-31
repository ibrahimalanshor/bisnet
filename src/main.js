import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vClickOutside from 'click-outside-vue3';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(vClickOutside).mount('#app');
