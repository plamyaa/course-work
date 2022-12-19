import { createStore } from 'vuex';
import news, { INewsState } from './modules/news';
import brand, { IBrandState } from './modules/brand';
import collection, { ICollectionState } from './modules/collection';
import category, { ICategoryState } from './modules/category';

export interface IState {
  isAuth: boolean;
  news: INewsState;
  brand: IBrandState;
  collection: ICollectionState;
  category: ICategoryState;
}

export default createStore({
  state: {
    isAuth: true,
  } as IState,
  getters: {
    getAuth(state: IState) {
      return state.isAuth;
    },
  },
  mutations: {
    setAuth(state: IState, auth: boolean) {
      state.isAuth = auth;
    },
  },
  actions: {},
  modules: { news, collection, brand, category },
});
