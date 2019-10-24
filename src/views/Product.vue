<template>
  <div>
    <v-app-bar app color="primary" flat dense>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="module" class="white--text">{{ module.name }}</v-toolbar-title>
    </v-app-bar>
    <cmsComponent v-if="module" v-model="module"></cmsComponent>
    <v-overlay v-else absolute z-index="1">
      <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
    </v-overlay>
    <v-btn fab fixed top right :disabled="loading" @click="saveModule">
      <v-icon v-if="!loading" color="primary">save</v-icon>
      <v-progress-circular v-else color="white" :size="50" :width="5" indeterminate></v-progress-circular>
    </v-btn>
    <notifications group="moduleSave" position="top right" :max="2" />
  </div>
</template>

<script>
import cmsComponent from '@/components/cms';
import { getModule, saveModule } from '@/services/i18nService';

export default {
  name: 'ModuleEditor',
  components: {
    cmsComponent,
  },
  data: () => ({
    module: null,
    loading: false,
    drawer: true,
  }),
  watch: {
    drawer(val) {
      this.$emit('drawer', val);
    },
  },
  created() {
    this.getModule(this.$route.params.name);
  },
  methods: {
    async getModule(name) {
      const { data } = await getModule(name);
      this.module = data;
    },
    async saveModule() {
      this.loading = true;
      const response = await saveModule(this.module);
      if (response && response.data.ok) {
        this.$notify({
          group: 'moduleSave',
          title: 'Сохранено',
          type: 'success',
        });
      } else {
        this.$notify({
          group: 'moduleSave',
          title: 'Ошибка сохранения',
          text:
            'Возможно отсутствует связь с сервером, попробуйте позже или обратитесь в техподдержку',
          type: 'error',
        });
      }
      this.loading = false;
    },
  },
};
</script>
