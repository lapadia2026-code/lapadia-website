import { computed } from 'vue';
import { useState } from '#app';

export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null);
  const user = useState<any>('auth_user', () => null);

  const isLoggedIn = computed(() => !!token.value);

  const initAuth = () => {
    if (typeof localStorage !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        token.value = storedToken;
        if (storedUser) {
          try {
            user.value = JSON.parse(storedUser);
          } catch(e) {}
        }
      } else {
        token.value = null;
        user.value = null;
      }
    }
  };

  const setAuth = (newToken: string, newUser: any) => {
    token.value = newToken;
    user.value = newUser;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  return {
    user,
    token,
    isLoggedIn,
    initAuth,
    setAuth,
    logout
  };
};
