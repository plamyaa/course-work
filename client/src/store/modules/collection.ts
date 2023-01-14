import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
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
    getCollectionByLength: (state: ICollectionState) => (len: number) => {
      return state.data.slice(0, len);
    },
  },
  mutations: {
    addCollection(state: ICollectionState, payload: ICollectionItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      const { data } = await GET('/api/collection/');
      this.commit('collection/addCollection', data.results);
    },
    async readById(context, id: number) {
      const respnose = await GET(`/api/collection/${id}/`);
      return respnose.data;
    },
    async create(context, { collection }: { collection: string }) {
      POST_WITH_TOKEN(`/api/collection/`, { collection: collection });
      this.dispatch('read');
    },
    async update(
      context,
      { id, collection }: { id: number; collection: string }
    ) {
      PUT_WITH_TOKEN(`/api/collection/${id}/`, {
        collection: collection,
      });
      this.dispatch('read');
    },
    async delete(context, id: number) {
      DELETE_WITH_TOKEN(`/api/collection/${id}/`);
      this.dispatch('read');
    },
  },
};

export default collection;
