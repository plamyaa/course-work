import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
import { Module } from 'vuex';

export interface ICategoryItem {
  id: number;
  category: string;
}

export interface ICategoryState {
  data: ICategoryItem[];
}

const category: Module<ICategoryState, IState> = {
  namespaced: true,
  state() {
    return {
      data: [] as ICategoryItem[],
    };
  },
  getters: {
    getCategory(state: ICategoryState) {
      return state.data;
    },
    getCategoryByLength: (state: ICategoryState) => (len: number) => {
      return state.data.slice(0, len);
    },
  },
  mutations: {
    addCategory(state: ICategoryState, payload: ICategoryItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      const response = await GET('/api/category/');
      this.commit('category/addCategory', response.data);
    },
    async readById(context, id: number) {
      const respnose = await GET(`/api/category/${id}/`);
      return respnose.data;
    },
    async create(context, { category }: { category: string }) {
      POST_WITH_TOKEN(`/api/category/`, { category: category });
      this.dispatch('read');
    },
    async update(context, { id, category }: { id: number; category: string }) {
      PUT_WITH_TOKEN(`/api/category/${id}/`, {
        category: category,
      });
      this.dispatch('read');
    },
    async delete(context, id: number) {
      DELETE_WITH_TOKEN(`/api/category/${id}/`);
      this.dispatch('read');
    },
  },
};

export default category;
