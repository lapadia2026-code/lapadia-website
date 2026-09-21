import { ref, computed, watch, onMounted } from 'vue';
import { useCustomToast } from '~/composables/core/useCustomToast';

// Global state outside the composable so it persists across components in memory
const cart = ref<any[]>([]);
let isInitialized = false;

export const useCart = () => {
  const { showToast } = useCustomToast();
  const generateCartItemId = (product: any) => {
    let id = product._id || product.id;
    if (product.selectedVariant) {
      id += `-${product.selectedVariant._id || product.selectedVariant.measurement}`;
    }
    if (product.selectedAddons && product.selectedAddons.length > 0) {
      const addonIds = product.selectedAddons.map((a: any) => a._id).sort().join('-');
      id += `-addons-${addonIds}`;
    }
    return id;
  };

  const addToCart = (product: any, quantity: number = 1) => {
    const cartItemId = generateCartItemId(product);
    const existing = cart.value.find((item) => item.cartItemId === cartItemId);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.value.push({ cartItemId, product, quantity });
    }
    showToast({ title: 'Added to Cart', message: `${product.name} added to your cart.`, type: 'success' });
  };

  const removeFromCart = (cartItemId: string) => {
    cart.value = cart.value.filter((item) => item.cartItemId !== cartItemId);
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    const item = cart.value.find((item) => item.cartItemId === cartItemId);
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
