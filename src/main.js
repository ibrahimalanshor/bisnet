import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import vClickOutside from 'click-outside-vue3';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { router } from './router';
import { layouts } from './layout';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App).use(pinia).use(vClickOutside).use(router);

for (const layout in layouts) {
  app.component(layout, layouts[layout]);
}

app.mount('#app');
