<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title class="title primary--text">
            Think Pay Test
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-footer color="primary" padless absolute>
        <div class="white--text mx-2 mt-1">
          &copy; {{ new Date().getFullYear() }}
        </div>
      </v-footer>
    </v-navigation-drawer>

    <v-content>
      <!--      <router-view :key="$route.params.name"></router-view>-->
    </v-content>

    <notifications :max="2" group="products" position="top left" />
  </v-app>
</template>

<script>
import { getAllProducts } from '@/services/productsService';

export default {
  name: 'App',
  data: () => ({
    drawer: true,
    products: [],
  }),
  computed: {},
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.loading = true;
      try {
        const { data } = await getAllProducts();
        this.products = data.data;
      } catch (e) {
        this.$notify({
          group: 'products',
          title: e ? e : 'request error',
          type: 'error',
        });
      }
      this.loading = false;
    },
  },
};
</script>
