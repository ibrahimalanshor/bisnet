<script setup>
import { useSettingStore } from './features/setting/setting.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const settingStore = useSettingStore();

document.title = settingStore.name;

const icon = document.querySelector('link[rel=icon]');

icon.href = settingStore.logo;

router.afterEach((to) => {
  document.title = `${to.meta.title} - ${settingStore.name}`;
});
</script>

<template>
  <component
    :is="$route.meta.layout || 'div'"
    v-bind="$route.meta.layoutProps || {}"
  >
    <router-view />
  </component>
</template>
