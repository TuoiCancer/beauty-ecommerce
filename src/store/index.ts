/* eslint-disable import/no-cycle */
import { encryptStorage } from '@/service/encrypt-storage/storage';
import { mergeDeepLeft } from 'ramda';
import { StoreApi, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createUserSlice, { IUserSlice } from './UserSlice';

const store = (set: any, get: any, api: StoreApi<any>) => ({
  UserSlice: createUserSlice(
    set as unknown as StoreApi<IUserSlice>['setState'],
    get as StoreApi<IUserSlice>['getState'],
    api as unknown as StoreApi<IUserSlice>
  ),
});

export type IStore = ReturnType<typeof store>;

export const useStore = create<IStore>()(
  persist(immer(devtools(store)), {
    name: 'zustand',
    getStorage: () => encryptStorage,
    merge: (persistedState: any, currentState) =>
      mergeDeepLeft(persistedState, currentState),
  })
);

export const {
  getState: getStore,
  setState: updateStore,
  subscribe: subscribeStore,
  destroy: destroyStore,
} = useStore;
