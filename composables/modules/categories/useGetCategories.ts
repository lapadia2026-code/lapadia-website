import { ref } from 'vue';
import { categoriesApi } from '@/api_factory/modules/categories';

export const useGetCategories = () => {
  const loadingCategories = ref(false);
  const categories = ref<any[]>([]);

  const getCategories = async () => {
    loadingCategories.value = true;
    try {
      const { data } = await categoriesApi.getCategories();
      categories.value = data || [];
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      loadingCategories.value = false;
    }
  };

  return { loadingCategories, categories, getCategories };
};
