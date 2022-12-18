import { IState } from './../index';
import getAPI from '@/api/axios-api';
import { Module } from 'vuex';

export interface INewsItem {
  id: number;
  title: string;
  text: string;
  image_src: string;
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
    async addNews(
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
        this.dispatch('getAllNews');
      } catch (err) {
        console.log(err);
      }
    },
    async updateNews(
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
          update_date: new Date(),
        });
        this.dispatch('getAllNews');
      } catch (err) {
        console.log(err);
      }
    },
    async deleteNews(context, id: number) {
      try {
        getAPI.delete(`/api/news/${id}/`);
        this.dispatch('getAllNews');
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default news;
