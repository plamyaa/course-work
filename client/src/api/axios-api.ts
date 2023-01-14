import Cookies from 'js-cookie';
import axios from 'axios';
import store from '@/store';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибки
    if (error.response.status === 401) {
      console.log(error);
    } else {
      throw error;
    }
  }
);

// Отсюда мы экспортируем нужный CRUD метод и по нему делаем api запрос
async function POST(url: string, payload: object = {}) {
  return await axiosInstance.post(url, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

async function GET(url: string) {
  return await axiosInstance.get(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
}

async function POST_WITH_TOKEN(url: string, payload: object = {}) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  return await axiosInstance.post(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  });
}

async function GET_WITH_TOKEN(url: string, params: any = {}) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  return await axiosInstance.get(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

async function PATCH_WITH_TOKEN(url: string, payload: object = {}) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  return await axiosInstance.patch(url, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

async function PUT_WITH_TOKEN(url: string, payload: object) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  return await axiosInstance.put(url, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}

async function DELETE_WITH_TOKEN(url: string, payload?: Array<any>) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  return await axiosInstance.delete(url, {
    headers: {
      Authorization: token,
    },
    data: payload,
  });
}

export {
  POST,
  GET,
  POST_WITH_TOKEN,
  GET_WITH_TOKEN,
  PATCH_WITH_TOKEN,
  PUT_WITH_TOKEN,
  DELETE_WITH_TOKEN,
};
