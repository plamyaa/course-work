import { IState } from './../index';
import getAPI from '@/api/axios-api';
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
      try {
        const response = await getAPI.get('/api/category/');
        this.commit('category/addCategory', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async readById(context, id: number) {
      try {
        const respnose = await getAPI.get(`/api/category/${id}/`);
        return respnose.data;
      } catch (err) {
        console.log(err);
      }
    },
    async create(context, { category }: { category: string }) {
      try {
        getAPI.post(`/api/category/`, { category: category });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async update(context, { id, category }: { id: number; category: string }) {
      try {
        getAPI.put(`/api/category/${id}/`, {
          category: category,
        });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async delete(context, id: number) {
      try {
        getAPI.delete(`/api/category/${id}/`);
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default category;
