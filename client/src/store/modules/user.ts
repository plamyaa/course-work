import { IState } from '../index';
import { Module } from 'vuex';
import Cookies from 'js-cookie';
import { POST, POST_WITH_TOKEN, GET_WITH_TOKEN } from '@/api/axios-api';

export interface IUserState {
  isAuth: boolean;
  username: string;
  user_id: number;
  role: number;
}

const user: Module<IUserState, IState> = {
  namespaced: true,
  state() {
    return {
      isAuth: false,
      username: '',
      user_id: 0,
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
    getUserId(state: IUserState) {
      return +state.user_id;
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
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
      (state.role = 100), (state.isAuth = false), (state.username = '');
    },
    setUserId(state: IUserState, id: number) {
      state.user_id = id;
    },
  },
  actions: {
    async read(context, { username }: { username: string }) {
      const { data } = await GET_WITH_TOKEN('/api/user/');
      const userId = data.results.find(
        (user: any) => user.username === username
      ).id;
      console.log(userId);
      this.commit('user/setUserId', userId);
      Cookies.set('userId', userId);
    },
    async loginUser(
      context,
      { username, password }: { username: string; password: string }
    ) {
      const response = await POST('/api/token/', {
        username: username,
        password: password,
      });
      Cookies.set('refreshToken', response?.data?.refresh);
      Cookies.set('accessToken', response?.data?.access);
      Cookies.set('username', username);

      this.dispatch('user/readRoleByUsername', { username: username });
      this.commit('user/setAuth', true);
      this.dispatch('user/read', { username: username });
    },
    async registerUser(
      context,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) {
      const { data } = await POST('/api/user/', {
        username: username,
        email: email,
        password: password,
      });
      console.log(data.results);
    },
    async refreshToken() {
      const refreshToken = Cookies.get('refreshToken');
      if (!refreshToken) return;
      const response = await POST_WITH_TOKEN('/api/token/refresh/', {
        refresh: refreshToken,
      });
      Cookies.set('accessToken', response.data.access);
      const username = Cookies.get('username');
      const userId = Cookies.get('userId');
      if (username && userId) {
        this.commit('user/setUserId', userId);
        this.commit('user/setUsername', username);
        this.dispatch('user/readRoleByUsername', { username: username });
        this.commit('user/setAuth', true);
      }
    },
    async readRoleByUsername(context, { username }: { username: string }) {
      const { data } = await GET_WITH_TOKEN(`/api/user/?username=${username}`);
      this.commit('user/setRole', data.results[0].groups[0] ?? 0);
    },
  },
};

export default user;
