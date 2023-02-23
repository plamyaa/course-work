import { IState } from './../index';
import {
  POST_WITH_TOKEN,
  GET,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
} from '@/api/axios-api';
import { Module } from 'vuex';
import pagination, { IPaginationState } from './pagination';

export interface INewsItem {
  id: number;
  title: string;
  text: string;
  image_src: string;
  publish_date: Date;
  update_date: Date;
  collection: string;
  brand: string;
  author: string;
}

interface ICreatePayload {
  title: string;
  text: string;
  image_src: string;
  author: number;
  brand: number;
  collection: number;
}

interface IUpdatePayload {
  title: string;
  text: string;
  image_src: string;
  author: number;
  brand: number;
  collection: number;
}

export interface INewsState {
  data: INewsItem[];
  pagination: IPaginationState;
}

const state = {
  data: [] as INewsItem[],
} as INewsState;

const news: Module<INewsState, IState> = {
  namespaced: true,
  state,
  getters: {
    getNews(state: INewsState) {
      return state.data;
    },
    getNewsById: (state: INewsState) => (id: number) => {
      return state.data.find((news) => news.id === id);
    },
    getLastNews(state: INewsState) {
      return state.data[state.data.length - 1];
    },
  },
  mutations: {
    addNews(state: INewsState, payload: INewsItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async read() {
      const { data } = await GET('/api/news/');
      this.commit('news/addNews', data.results);
      this.commit('news/pagination/setPagination', {
        count: data.count,
        page_size: data.page_size,
        page: data.current,
      });
      this.commit('setLoad', false);
    },
    async readPage(context, page: number) {
      this.commit('setLoad', true);
      // this.commit('news/addNews', data.results);
      this.commit('setLoad', false);
    },
    async readById(context, id: number) {
      const respnose = await GET(`/api/news/${id}/`);
      return respnose.data;
    },
    async readBySortingValue(context, sortingValue: string) {
      const response = await GET(`/api/news/?${sortingValue}`);
      return response.data;
    },
    async create(context, payload: ICreatePayload) {
      await POST_WITH_TOKEN(`/api/news/`, payload);
      this.dispatch('news/read');
    },
    async update(
      context,
      { id, payload }: { id: number; payload: IUpdatePayload }
    ) {
      await PUT_WITH_TOKEN(`/api/news/${id}/`, payload);
      this.dispatch('news/read');
    },
    async delete(context, id: number) {
      await DELETE_WITH_TOKEN(`/api/news/${id}/`);
      this.dispatch('news/read');
    },
  },
  modules: { pagination },
};

export default news;
