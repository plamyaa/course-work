import { IState } from './../index';
import { GET } from '@/api/axios-api';
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
      itemsPerPage: 1,
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
    getShowPagination(state: IPaginationState) {
      return state.totalItems > state.itemsPerPage;
    },
  },
  mutations: {
    setPagination(
      state: IPaginationState,
      {
        count,
        page_size,
        page,
      }: { count: number; page_size: number; page: number }
    ) {
      state.totalItems = count;
      state.itemsPerPage = page_size;
      state.page = page;
    },
    setTotalItems(state: IPaginationState, count: number) {
      state.totalItems = count;
    },
    setItemsPerPage(state: IPaginationState, value: number) {
      state.itemsPerPage = value;
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
      const { data } = await GET(endPoint + '?page=' + page);
      console.log(data);
      return data.results;
    },
  },
};

export default pagination;
