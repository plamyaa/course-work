import { IState } from '../index';
import { Module } from 'vuex';
import Cookies from 'js-cookie';
import { POST, POST_WITH_TOKEN, GET_WITH_TOKEN } from '@/api/axios-api';

export interface IUserState {
  isAuth: boolean;
  username: string;
  role: number;
}

const user: Module<IUserState, IState> = {
  namespaced: true,
  state() {
    return {
      isAuth: false,
      username: '',
      role: 100,
    };
  },
  getters: {
    getAuth(state: IUserState) {
      return state.isAuth;
    },
    getUsername(state: IUserState) {
      return state.username;
    },
    getRole(state: IUserState) {
      return state.role;
    },
  },
  mutations: {
    setAuth(state: IUserState, auth: boolean) {
      state.isAuth = auth;
    },
    setUsername(state: IUserState, username: string) {
      state.username = username;
    },
    setRole(state: IUserState, role: number) {
      state.role = role;
    },
    logoutUser(state: IUserState) {
      (state.role = 100), (state.isAuth = false), (state.username = '');
    },
  },
  actions: {
    async loginUser(
      context,
      { username, password }: { username: string; password: string }
    ) {
      const response = await POST('/api/token/', {
        username: username,
        password: password,
      });
      Cookies.set('refreshToken', response.data.refresh);
      Cookies.set('accessToken', response.data.access);
      this.commit('user/setAuth', true);
    },
    async registerUser(
      context,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) {
      const response = await POST('/api/user/', {
        username: username,
        email: email,
        password: password,
      });
      console.log()
    },
    async refreshToken() {
      const refreshToken = Cookies.get('refreshToken');
      const response = await POST_WITH_TOKEN('/api/token/refresh/', {
        refresh: refreshToken,
      });
      Cookies.set('accessToken', response.access);
      this.commit('user/setAuth', true);
    },
    async readRoleByUsername(context, { username }: { username: string }) {
      const userRoleId = await GET_WITH_TOKEN(
        `/api/user/?username=${username}`
      );
      this.commit('user/setRole', userRoleId[0].groups[0] ?? 0);
    },
  },
};

export default user;
