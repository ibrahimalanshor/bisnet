import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingStore = defineStore('setting', () => {
  const name = ref('Open POS');
  const logo = ref('/logo.png');

  return { name, logo };
});
