import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const ordersApi = {
  createOrder(data: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/orders', data);
  },
  getOrders(params?: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/orders', { params });
  },
  getOrder(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.get(`/orders/${id}`);
  },
  payOrder(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post(`/orders/${id}/pay`);
  }
};
