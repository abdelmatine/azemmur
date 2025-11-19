
'use client';

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useAuth } from '../hooks/use-auth';
import { getStorageName } from './utils';


interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
}

const createWishlistStore = (userId: string | null | undefined) => create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      toggleWishlist: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.filter(i => i.id !== item.id)
          }
        }
        return { items: [...state.items, item] }
      }),
    }),
    {
      name: getStorageName('wishlist-storage', userId),
      storage: createJSONStorage(() => localStorage),
    }
  )
)

const storeInstances = new Map<string, ReturnType<typeof createWishlistStore>>();

const getOrCreateStore = (userId: string | null | undefined) => {
  const key = userId || 'guest';
  if (!storeInstances.has(key)) {
    storeInstances.set(key, createWishlistStore(userId));
  }
  return storeInstances.get(key)!;
}


export const useWishlistStore = () => {
  const { user } = useAuth();
  const store = getOrCreateStore(user?.uid);
  return store();
};

// Expose actions directly for convenience
export const useWishlistActions = () => {
    const { user } = useAuth();
    const store = getOrCreateStore(user?.uid);
    return store.getState();
}

// This is a bit of a trick to use the hook version but get the state.
// Needed because we can't call hooks conditionally.
Object.assign(useWishlistStore, useWishlistActions);
