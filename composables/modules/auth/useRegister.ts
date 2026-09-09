import { ref } from 'vue';
import { authApi } from '@/api_factory/modules/auth';

export const useRegister = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const register = async (credentials: any) => {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await authApi.register(credentials);
      return data;
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'Registration failed';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, error, register };
};
