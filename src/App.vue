<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title primary--text">
            Think Pay Test
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense :to="{ name: 'products-table' }">
        <v-list-item-title class="ml-3">
          Products
        </v-list-item-title>
      </v-list-item>
      <v-footer color="primary" padless absolute>
        <div class="white--text mx-2 mt-1">
          &copy; october 2019
        </div>
      </v-footer>
    </v-navigation-drawer>

    <v-content>
      <router-view :key="$route.params.name"></router-view>
    </v-content>
    <notifications :max="2" position="top right" />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: true,
  }),
};
</script>
