
'use client';

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useAuth } from '../hooks/use-auth';
import { getStorageName } from './utils';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// A wrapper to create a store that is user-aware
const createCartStore = (userId: string | null | undefined) => create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),
      removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
      })),
      updateQuantity: (itemId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter(item => item.quantity > 0)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: getStorageName('cart-storage', userId),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Store instances map
const storeInstances = new Map<string, ReturnType<typeof createCartStore>>();

const getOrCreateStore = (userId: string | null | undefined) => {
  const key = userId || 'guest';
  if (!storeInstances.has(key)) {
    storeInstances.set(key, createCartStore(userId));
  }
  return storeInstances.get(key)!;
}

export const useCartStore = () => {
  const { user } = useAuth();
  const store = getOrCreateStore(user?.uid);
  return store();
};

// Expose actions directly for convenience
export const useCartActions = () => {
    const { user } = useAuth();
    const store = getOrCreateStore(user?.uid);
    return store.getState();
}

// This is a bit of a trick to use the hook version but get the state.
// Needed because we can't call hooks conditionally.
Object.assign(useCartStore, useCartActions);
