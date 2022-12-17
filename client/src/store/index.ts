import { createStore } from 'vuex';
import news, { INewsState } from './modules/news';
export interface IState {
  isAuth: boolean;
  news: INewsState;
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
  modules: { news },
});
