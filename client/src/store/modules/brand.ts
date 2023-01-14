import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
import { Module } from 'vuex';

export interface IBrandItem {
  id: number;
  brand: string;
}

export interface IBrandState {
  data: IBrandItem[];
}

const brand: Module<IBrandState, IState> = {
  namespaced: true,
  state() {
    return {
      data: [] as IBrandItem[],
    };
  },
  getters: {
    getBrand(state: IBrandState) {
      return state.data;
    },
    getBrandById: (state: IBrandState) => (id: number) => {
      const brand = state.data.find((brand) => brand.id === id);
      return brand?.brand;
    },
    getBrandByLength: (state: IBrandState) => (len: number) => {
      return state.data.slice(0, len);
    },
  },
  mutations: {
    addBrand(state: IBrandState, payload: IBrandItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      const { data } = await GET('/api/brand/');
      this.commit('brand/addBrand', data.results);
    },
    async readById(context, id: number) {
      const respnose = await GET(`/api/brand/${id}/`);
      return respnose.data;
    },
    async create(context, { brand }: { brand: string }) {
      POST_WITH_TOKEN(`/api/brand/`, { brand: brand });
      this.dispatch('read');
    },
    async update(context, { id, brand }: { id: number; brand: string }) {
      PUT_WITH_TOKEN(`/api/brand/${id}/`, {
        brand: brand,
      });
      this.dispatch('read');
    },
    async delete(context, id: number) {
      DELETE_WITH_TOKEN(`/api/brand/${id}/`);
      this.dispatch('read');
    },
  },
};

export default brand;
