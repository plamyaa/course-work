import { IState } from './../index';
import getAPI from '@/api/axios-api';
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
      try {
        const response = await getAPI.get('/api/brand/');
        this.commit('brand/addBrand', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async readById(context, id: number) {
      try {
        const respnose = await getAPI.get(`/api/brand/${id}/`);
        return respnose.data;
      } catch (err) {
        console.log(err);
      }
    },
    async create(context, { brand }: { brand: string }) {
      try {
        getAPI.post(`/api/brand/`, { brand: brand });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async update(context, { id, brand }: { id: number; brand: string }) {
      try {
        getAPI.put(`/api/brand/${id}/`, {
          brand: brand,
        });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async delete(context, id: number) {
      try {
        getAPI.delete(`/api/brand/${id}/`);
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default brand;
