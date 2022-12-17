import { IState } from './../index';
import getAPI from '@/api/axios-api';
import { Module } from 'vuex';

export interface INewsItem {
  id: number;
  title: string;
  text: string;
  publish_date: Date;
  update_date?: Date;
}

export interface INewsState {
  data: INewsItem[];
}

const news: Module<INewsState, IState> = {
  state() {
    return {
      data: [] as INewsItem[],
    };
  },
  getters: {
    getNews(state: INewsState) {
      console.log(state);
      return state.data;
    },
  },
  mutations: {
    addNews(state: INewsState, payload: INewsItem[]) {
      state.data = payload;
    },
  },
  actions: {
    async getAllNews() {
      try {
        const response = await getAPI.get('/api/news/');
        this.commit('addNews', response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getNews(context, id: number) {
      try {
        const respnose = await getAPI.get(`/api/news/${id}/`);
        return respnose.data;
      } catch (err) {
        console.log(err);
      }
    },
    async addNews(context, { title, text }: { title: string; text: string }) {
      try {
        console.log(title, text);
        getAPI.post(`/api/news/`, { title: title, text: text });
        this.dispatch('getAllNews');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default news;
