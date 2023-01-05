import Cookies from 'js-cookie';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обработка ошибки
    throw error;
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

  const { data } = await axiosInstance.post(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  });
  return data;
}

async function GET_WITH_TOKEN(url: string, params: any = {}) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  const { data } = await axiosInstance.get(url, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return data;
}

async function PATCH_WITH_TOKEN(url: string, payload: object = {}) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  const { data } = await axiosInstance.patch(url, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  return data;
}

async function PUT_WITH_TOKEN(url: string, payload: object) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  const { data } = await axiosInstance.put(url, payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return data;
}

async function DELETE_WITH_TOKEN(url: string, payload?: Array<any>) {
  const token = `Bearer ${Cookies.get('accessToken')}`;

  const { data } = await axiosInstance.delete(url, {
    headers: {
      Authorization: token,
    },
    data: payload,
  });
  return data;
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
