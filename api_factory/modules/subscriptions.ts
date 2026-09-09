import { GATEWAY_ENDPOINT_WITH_AUTH } from '../axios.config';

export const subscriptionsApi = {
  createSubscription(data: any) {
    return GATEWAY_ENDPOINT_WITH_AUTH.post('/subscriptions', data);
  },
  getSubscriptions() {
    return GATEWAY_ENDPOINT_WITH_AUTH.get('/subscriptions');
  },
  cancelSubscription(id: string) {
    return GATEWAY_ENDPOINT_WITH_AUTH.patch(`/subscriptions/${id}/cancel`);
  }
};
