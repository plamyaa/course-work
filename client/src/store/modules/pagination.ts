import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
import { Module } from 'vuex';

export interface IPaginationState {
  totalItems: number;
  itemsPerPage: number;
  page: number;
}

const pagination: Module<IPaginationState, IState> = {
  namespaced: true,
  state() {
    return {
      totalItems: 0,
      itemsPerPage: 5,
      page: 1,
    };
  },
  getters: {
    getTotalItems(state: IPaginationState) {
      return state.totalItems;
    },
    getItemsPerPage(state: IPaginationState) {
      return state.itemsPerPage;
    },
    getPage(state: IPaginationState) {
      return state.itemsPerPage;
    },
  },
  mutations: {
    setTotalItems(state: IPaginationState, count: number) {
      state.totalItems = count;
    },
    setPage(state: IPaginationState, page: number) {
      state.page = page;
    },
  },
  actions: {
    async readPage(
      context,
      {
        entity,
        endPoint,
        page,
      }: { entity: string; endPoint: string; page: number }
    ) {
      this.commit(entity + '/pagination/setPage', page);
      const { data } = await GET(endPoint + '?p=' + page);
      return data.results;
    },
  },
};

export default pagination;
