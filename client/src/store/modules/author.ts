import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
import { Module } from 'vuex';

export interface IAuthorItem {
  id: number;
  username: string;
  group: number;
}

export interface IAuthorState {
  data: IAuthorItem[];
}

const author: Module<IAuthorState, IState> = {
  namespaced: true,
  state() {
    return {
      data: [],
    };
  },
  getters: {
    getAuthor(state: IAuthorState) {
      return state.data;
    },
    getAuthorById: (state: IAuthorState) => (id: number) => {
      const author = state.data.find((author) => author.id === id);
      return author?.username;
    },
    getAuthorByLength: (state: IAuthorState) => (len: number) => {
      return state.data.slice(0, len);
    },
  },
  mutations: {
    addAuthor(state: IAuthorState, payload: IAuthorItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      const { data } = await GET('/api/user/');
      this.commit('author/addAuthor', data.results);
    },
    async readById(context, id: number) {
      const respnose = await GET(`/api/user/${id}/`);
      return respnose.data;
    },
    async create(context, { author }: { author: string }) {
      POST_WITH_TOKEN(`/api/user/`, { author: author });
      this.dispatch('read');
    },
    async update(context, { id, author }: { id: number; author: string }) {
      PUT_WITH_TOKEN(`/api/user/${id}/`, {
        author: author,
      });
      this.dispatch('read');
    },
    async delete(context, id: number) {
      DELETE_WITH_TOKEN(`/api/user/${id}/`);
      this.dispatch('read');
    },
  },
};

export default author;
