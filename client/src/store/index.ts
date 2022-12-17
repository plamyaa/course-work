import { createStore } from 'vuex';

export interface IState {
  isAuth: boolean;
}

export default createStore({
  state: {
    isAuth: true,
  },
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
  modules: {},
});
