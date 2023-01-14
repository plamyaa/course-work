import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from './components/UI';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';

const app = createApp(App).use(store).use(router).use(VueAwesomePaginate);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount('#app');
