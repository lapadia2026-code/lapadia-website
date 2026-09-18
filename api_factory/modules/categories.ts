import { GATEWAY_ENDPOINT } from '../axios.config';

export const categoriesApi = {
  getCategories() {
    return GATEWAY_ENDPOINT.get('/categories/active');
  }
};
