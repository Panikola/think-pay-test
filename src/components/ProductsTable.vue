<template>
  <v-card height="100%">
    <v-data-table
      :headers="headers"
      :items="products"
      :loading="loading"
      :search="search"
      class="elevation-1"
      loading-text="Loading... Please wait"
      sort-by="created_at"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Products</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="search"
            hide-details
            label="Search"
            single-line
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            :to="{ name: 'product-create' }"
            color="primary"
            dark
            class="mb-2"
            >Add Product</v-btn
          >
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon class="mr-2" small @click="showProductItem = item">
          info
        </v-icon>
        <v-icon
          class="mr-2"
          small
          @click="
            $router.push({ name: 'product-edit', params: { id: item.id } })
          "
        >
          edit
        </v-icon>
        <v-progress-circular
          v-if="itemLoading === item.id"
          :size="20"
          :width="3"
          indeterminate
        ></v-progress-circular>
        <v-icon v-else small @click="confirmDelete(item)">
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" dark class="mb-2">Create Product</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="showProductDialog" max-width="500px">
      <product-view v-if="showProductDialog" v-model="showProductItem"></product-view>
    </v-dialog>
  </v-card>
</template>

<script>
import { getAllProducts, deleteProduct } from '@/services/productsService';
import ProductView from '@/components/ProductView';

export default {
  name: 'ProductsTable',
  components: { ProductView },
  data: () => ({
    loading: false,
    itemLoading: null,
    showProductDialog: false,
    showProductItem: {},
    search: '',
    products: [],
    headers: [],
  }),
  watch: {
    showProductItem(item) {
      this.showProductDialog = !!item.id;
    },
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.loading = true;
      try {
        const {
          data: { data },
        } = await getAllProducts();
        this.products = data;
        this.generateHeaders(data);
      } catch ({ data }) {
        this.$notify({
          group: 'product',
          title: data ? data.message : 'request error',
          type: 'error',
        });
      }
      this.loading = false;
    },
    generateHeaders(data) {
      this.headers = Object.keys(data[0]).map(key => ({
        text: this.normalizedName(key),
        value: key,
        sortable: true,
      }));
      this.headers.push({ text: 'Actions', value: 'action', sortable: false });
    },
    normalizedName(name) {
      let string = name.replace(/_/g, ' ');
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    confirmDelete(item) {
      confirm(`Are you sure you want to delete "${item.name}"?`) &&
        this.deleteProduct(item);
    },
    async deleteProduct(item) {
      this.itemLoading = item.id;
      const index = this.products.indexOf(item);
      try {
        await deleteProduct(item.id);
        this.$notify({
          title: `"${item.name}" deleted`,
          type: 'success',
        });
      } catch ({ data }) {
        this.$notify({
          title: data ? data.message : 'request error',
          type: 'error',
        });
      }
      this.products.splice(index, 1);
      this.itemLoading = null;
    },
  },
};
</script>
