import { ref, computed, watch, onMounted } from 'vue';
import { useCustomToast } from '~/composables/core/useCustomToast';

// Global state outside the composable so it persists across components in memory
const cart = ref<any[]>([]);
let isInitialized = false;

export const useCart = () => {
  const { showToast } = useCustomToast();
  const addToCart = (product: any, quantity: number = 1) => {
    const existing = cart.value.find((item) => (item.product._id || item.product.id) === (product._id || product.id));
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({ product, quantity });
    }
    showToast({ title: 'Added to Cart', message: `${product.name} added to your cart.`, type: 'success' });
  };

  const removeFromCart = (productId: string) => {
    cart.value = cart.value.filter((item) => (item.product._id || item.product.id) !== productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.value.find((item) => (item.product._id || item.product.id) === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  const cartItemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  if (import.meta.client && !isInitialized) {
    const savedCart = localStorage.getItem('lapadia_cart');
    if (savedCart) {
      try {
        cart.value = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to parse cart from local storage', e);
      }
    }
    isInitialized = true;

    watch(cart, (newCart) => {
      localStorage.setItem('lapadia_cart', JSON.stringify(newCart));
    }, { deep: true });
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
  };
};
