import { IState } from './../index';
import getAPI from '@/api/axios-api';
import { Module } from 'vuex';

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
}

const news: Module<INewsState, IState> = {
  namespaced: true,
  state() {
    return {
      data: [] as INewsItem[],
    };
  },
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
      try {
        const response = await getAPI.get('/api/news/');
        this.commit('news/addNews', response.data);
        this.commit('setLoad', false);
      } catch (err) {
        console.log(err);
      }
    },
    async readById(context, id: number) {
      try {
        const respnose = await getAPI.get(`/api/news/${id}/`);
        return respnose.data;
      } catch (err) {
        console.log(err);
      }
    },
    async create(
      context,
      {
        title,
        text,
        image_src,
      }: { title: string; text: string; image_src: string }
    ) {
      try {
        getAPI.post(`/api/news/`, {
          title: title,
          text: text,
          image_src: image_src,
        });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
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
      try {
        getAPI.put(`/api/news/${id}/`, {
          title: title,
          text: text,
          image_src: image_src,
        });
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
    async delete(context, id: number) {
      try {
        getAPI.delete(`/api/news/${id}/`);
        this.dispatch('read');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default news;
