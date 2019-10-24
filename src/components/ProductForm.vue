<template>
  <v-card height="100%" :loading="loading">
    <v-card-title>
      <span
        class="headline"
        v-html="product.id ? title : 'Create new product'"
      ></span>
    </v-card-title>
    <v-card-subtitle v-if="product.created_at" class="pb-0"
      >created at {{ product.created_at }}</v-card-subtitle
    >
    <v-card-text>
      <v-form ref="form" v-model="valid" >
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="product.name"
                required
                :rules="nameRules"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="product.code"
                required
                :rules="codeRules"
                label="Product code"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model.number="product.price"
                required
                label="Price"
                :rules="priceRules"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-progress-circular
        v-if="loading"
        :size="20"
        :width="3"
        class="mr-4"
        indeterminate
      ></v-progress-circular>
      <v-btn
        v-else
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="product.id ? update(product) : create(product)"
      >
        Save
      </v-btn>
      <v-btn
        color="error"
        class="mr-4"
        @click="$router.push({ name: 'products-table' })"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  updateProduct,
  getProduct,
  createProduct,
} from '@/services/productsService';

export default {
  name: 'ProductForm',
  data() {
    return {
      loading: false,
      valid: true,
      title: '',
      product: {
        name: '',
        code: '',
        price: '',
      },
      nameRules: [v => !!v || 'Name is required'],
      priceRules: [
        v => !!v || 'Price is required',
        v => typeof v === 'number' || 'Price must be valid number',
      ],
      codeRules: [
        v => !!v || 'Code is required',
        v =>
          !!v.match(/^[0-9]{4}-[0-9]{4}$/) ||
          '####-#### (# = digit from 1 to 9)',
      ],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getProduct(this.$route.params.id);
    }
  },
  methods: {
    async getProduct(id) {
      this.loading = true;
      try {
        const { data } = await getProduct(id);
        this.product = data.data;
        this.title = data.data.name;
      } catch (e) {
        this.$notify({
          group: 'products',
          title: e ? e : 'request error',
          type: 'error',
        });
      }
      this.loading = false;
    },
    async update({ id, code, price, name }) {
      this.loading = true;
      try {
        const response = await updateProduct(id, { code, price, name });
        this.product = response.data.data;
        this.title = response.data.data.name;
        this.$notify({
          title: `${this.title} updated`,
          type: 'success',
        });
      } catch (e) {
        this.$notify({
          title: e ? e : 'request error',
          type: 'error',
        });
      }
      this.loading = false;
    },
    async create(data) {
      this.loading = true;
      try {
        const response = await createProduct(data);
        this.product = response.data.data;
        this.title = response.data.data.name;
        this.$notify({
          title: `${this.title} created`,
          type: 'success',
        });
      } catch (e) {
        this.$notify({
          title: e ? e : 'request error',
          type: 'error',
        });
      }
      this.loading = false;
    },
  },
};
</script>
