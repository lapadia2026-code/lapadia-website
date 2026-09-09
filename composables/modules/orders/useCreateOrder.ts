import { ref } from 'vue';
import { ordersApi } from '@/api_factory/modules/orders';

export const useCreateOrder = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const createOrder = async (orderData: any) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await ordersApi.createOrder(orderData);
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Failed to create order';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, createOrder };
};
