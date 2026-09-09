import { GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const productsApi = {
  getProducts(params?: any) {
    return GATEWAY_ENDPOINT.get('/products', { params });
  },
  getProduct(id: string) {
    return GATEWAY_ENDPOINT.get(`/products/${id}`);
  }
};
