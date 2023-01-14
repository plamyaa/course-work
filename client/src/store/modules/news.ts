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
  collection_id: string;
  brand_id: string;
  author_id: string;
}

export interface INewsState {
  data: INewsItem[];
  pagination: IPaginationState;
}

const state: INewsState = {
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
      this.commit('news/pagination/setTotalItems', data.count);
      this.commit('news/addNews', data.results);
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
    async create(
      context,
      {
        title,
        text,
        image_src,
      }: { title: string; text: string; image_src: string }
    ) {
      POST_WITH_TOKEN(`/api/news/`, {
        title: title,
        text: text,
        image_src: image_src,
      });
      this.dispatch('read');
    },
    async update(
      context,
      {
        id,
        title,
        text,
        image_src,
      }: { id: number; title: string; text: string; image_src: string }
    ) {
      PUT_WITH_TOKEN(`/api/news/${id}/`, {
        title: title,
        text: text,
        image_src: image_src,
      });
      this.dispatch('read');
    },
    async delete(context, id: number) {
      DELETE_WITH_TOKEN(`/api/news/${id}/`);
      this.dispatch('read');
    },
  },
  modules: { pagination },
};

export default news;
