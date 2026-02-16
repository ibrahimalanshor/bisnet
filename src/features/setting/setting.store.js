import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRequest } from '../../cores/http';
import { useRoute } from 'vue-router';

export const useSettingStore = defineStore('setting', () => {
  const { request } = useRequest();
  const route = useRoute();

  const name = ref('Open POS');
  const logo = ref('/logo.png');

  async function loadSetting() {
    const [res, err] = await request(`/api/v1/setting`);

    if (!err) {
      name.value = res.name;
      logo.value = res.logo;
    }

    document.title = `${route.meta.title} - ${name.value}`;

    const icon = document.querySelector('link[rel=icon]');

    icon.href = logo.value;
  }

  return { name, logo, loadSetting };
});
