import Vue from 'vue';
import Router from 'vue-router';
import ProductForm from '@/components/ProductForm';
import ProductsTable from '@/components/ProductsTable';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/products',
      name: 'products-table',
      component: ProductsTable,
    },
    {
      path: '/products/create',
      name: 'product-create',
      component: ProductForm,
    },
    {
      path: '/products/:id',
      name: 'product-edit',
      component: ProductForm,
    },
  ],
});
