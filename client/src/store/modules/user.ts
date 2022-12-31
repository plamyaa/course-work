import { IState } from '../index';
import getAPI from '@/api/axios-api';
import { Module } from 'vuex';
import Cookies from 'js-cookie';

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
      try {
        const response = await getAPI.post('/api/token/', {
          username: username,
          password: password,
        });
        Cookies.set('refreshToken', response.data.refresh);
        Cookies.set('accessToken', response.data.access);
        this.commit('user/setAuth', true);
      } catch (err) {
        console.error(err);
      }
    },
    async refreshToken() {
      try {
        const refreshToken = Cookies.get('refreshToken');
        const response = await getAPI.post('/api/token/refresh/', {
          refresh: refreshToken,
        });
        Cookies.set('accessToken', response.data.access);
        this.commit('user/setAuth', true);
      } catch (err) {
        console.error(err);
      }
    },
    async readRoleByUsername(context, { username }: { username: string }) {
      try {
        const accessToken = Cookies.get('accessToken');
        const userRoleId = await getAPI.get(`api/user/?username=${username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        this.commit('user/setRole', userRoleId.data[0].groups[0] ?? 0);
      } catch (err) {
        console.error(err);
      }
    },
  },
};

export default user;
