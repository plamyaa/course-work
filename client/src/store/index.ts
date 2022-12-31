import { createStore } from 'vuex';
import news, { INewsState } from './modules/news';
import brand, { IBrandState } from './modules/brand';
import collection, { ICollectionState } from './modules/collection';
import category, { ICategoryState } from './modules/category';
import user, { IUserState } from './modules/user';

export interface IState {
  loaded: boolean;
  news: INewsState;
  brand: IBrandState;
  collection: ICollectionState;
  category: ICategoryState;
  user: IUserState;
}

export default createStore({
  state: {
    loaded: false,
  } as IState,
  getters: {
    getLoad(state: IState) {
      return state.loaded;
    },
  },
  mutations: {
    setLoad(state: IState, load: boolean) {
      state.loaded = load;
    },
  },
  modules: { news, collection, brand, category, user },
});
