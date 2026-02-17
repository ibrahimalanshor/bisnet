import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRequest } from '../../cores/http';
import { useRoute } from 'vue-router';

export const useSettingStore = defineStore('setting', () => {
  const { request } = useRequest();
  const route = useRoute();

  const name = ref('Open POS');
  const logo = ref('/logo.png');
  const form = reactive({
    name: null,
  });

  async function loadSetting() {
    const [res, err] = await request(`/api/v1/setting`);

    if (!err) {
      name.value = res.name;
      logo.value = res.logo;

      form.name = name.value;
    }

    document.title = `${route.meta.title} - ${name.value}`;

    const icon = document.querySelector('link[rel=icon]');

    icon.href = logo.value;
  }

  async function updateSetting(uploadLogo) {
    const payload = new FormData();

    payload.append('name', form.name);

    if (uploadLogo) {
      payload.append('logo', uploadLogo);
    }

    const [res, err] = await request(`/api/v1/setting`, {
      method: 'post',
      body: payload,
    });

    if (!err) {
      name.value = res.name;
      logo.value = res.logo_url;
    }
  }

  function resetForm() {
    form.name = name.value;
  }

  return { name, logo, form, loadSetting, updateSetting, resetForm };
});
