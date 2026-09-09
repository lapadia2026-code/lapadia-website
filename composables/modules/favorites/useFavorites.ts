import { ref, onMounted } from 'vue';
import { GATEWAY_ENDPOINT_WITH_AUTH } from '~/api_factory/axios.config';
import { useCustomToast } from '~/composables/core/useCustomToast';

const favorites = ref<any[]>([]);

export const useFavorites = () => {
  const { showToast } = useCustomToast();

  const fetchFavorites = async () => {
    try {
      const res = await GATEWAY_ENDPOINT_WITH_AUTH.get('/users/favorites');
      favorites.value = res.data;
    } catch (e) {
      console.error('Failed to fetch favorites', e);
    }
  };

  const isFavorite = (productId: string) => {
    return favorites.value.some((fav) => typeof fav === 'string' ? fav === productId : fav._id === productId);
  };

  const toggleFavorite = async (productId: string) => {
    try {
      if (isFavorite(productId)) {
        await GATEWAY_ENDPOINT_WITH_AUTH.delete(`/users/favorites/${productId}`);
        favorites.value = favorites.value.filter(fav => (typeof fav === 'string' ? fav : fav._id) !== productId);
        showToast({ title: 'Removed', message: 'Product removed from favorites', type: 'success' });
      } else {
        const res = await GATEWAY_ENDPOINT_WITH_AUTH.post(`/users/favorites/${productId}`);
        favorites.value = res.data;
        showToast({ title: 'Added', message: 'Product added to favorites', type: 'success' });
      }
    } catch (e: any) {
      console.error(e);
      if (e.response?.status === 401) {
        showToast({ title: 'Login Required', message: 'Please log in to add favorites', type: 'error' });
      } else {
        showToast({ title: 'Error', message: 'Failed to update favorites', type: 'error' });
      }
    }
  };

  return {
    favorites,
    fetchFavorites,
    isFavorite,
    toggleFavorite
  };
};
