import { axiosApi } from '@/helpers/axios';

const BASE = 'products';

export async function getAllProducts() {
  return axiosApi({
    method: 'GET',
    url: BASE,
  });
}

export async function createProduct(data) {
  return axiosApi({
    method: 'POST',
    url: BASE,
    data,
  });
}

export async function getProduct(id) {
  return axiosApi({
    method: 'GET',
    url: `${BASE}/${id}`,
  });
}

export async function updateProduct(id) {
  return axiosApi({
    method: 'PUT',
    url: `${BASE}/${id}`,
  });
}

export async function deleteProduct(id) {
  return axiosApi({
    method: 'PUT',
    url: `${BASE}/${id}`,
  });
}
