import { IState } from './../index';
import getAPI from '@/api/axios-api';
import { Module } from 'vuex';

export interface ICollectionItem {
  id: number;
  collection: string;
}

export interface ICollectionState {
  data: ICollectionItem[];
}

const collection: Module<ICollectionState, IState> = {
  namespaced: true,
  state() {
    return {
      data: [] as ICollectionItem[],
    };
  },
  getters: {
    getCollection(state: ICollectionState) {
      return state.data;
    },
  },
  mutations: {
    addCollection(state: ICollectionState, payload: ICollectionItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      try {
        const response = await getAPI.get('/api/collection/');
        console.log(response.data);
        this.commit('collection/addCollection', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async readById(context, id: number) {
      try {
        const respnose = await getAPI.get(`/api/collection/${id}/`);
        return respnose.data;
      } catch (err) {
        console.log(err);
      }
    },
    async create(context, { collection }: { collection: string }) {
      try {
        getAPI.post(`/api/collection/`, { collection: collection });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async update(
      context,
      { id, collection }: { id: number; collection: string }
    ) {
      try {
        getAPI.put(`/api/collection/${id}/`, {
          collection: collection,
        });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async delete(context, id: number) {
      try {
        getAPI.delete(`/api/collection/${id}/`);
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default collection;
