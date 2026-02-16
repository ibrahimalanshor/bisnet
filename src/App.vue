<script setup>
import { useSettingStore } from './features/setting/setting.store';
import { useRouter } from 'vue-router';
import { useAuthStore } from './features/auth/auth.store';

const router = useRouter();
const settingStore = useSettingStore();
const authStore = useAuthStore();

router.afterEach((to) => {
  document.title = `${to.meta.title} - ${settingStore.name}`;
});

settingStore.loadSetting();

if (authStore.loggedIn) {
  authStore.loadMe();
}
</script>

<template>
  <component
    :is="$route.meta.layout || 'div'"
    v-bind="$route.meta.layoutProps || {}"
  >
    <router-view />
  </component>
</template>
