<template>
  <div class="sort-page">
    <div class="sort-page__container">
      <TextWrapper v-if="cards.length === 0">
        Здесь пока ничего нет...
      </TextWrapper>
      <MainCard
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :title="card.title"
        :text="card.text"
        :image_src="card.image_src"
        :brand="card.brand"
        :author="card.author"
      />
    </div>
    <div class="sort-page__pagination" v-if="totalItems > itemsPerPage">
      <MainPagination
        :page="page"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @changePage="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { GET } from '../api/axios-api';
import MainCard from '../components/MainCard.vue';
import MainPagination from '../components/UI/MainPagination.vue';
import { defineComponent } from '@vue/runtime-core';
import { INewsItem } from '../store/modules/news';
export default defineComponent({
  name: 'SortPage',
  components: {
    MainCard,
    MainPagination,
  },
  data() {
    return {
      cards: [] as INewsItem[],
      page: 1,
      totalItems: 0,
      itemsPerPage: 6,
      url: '',
    };
  },
  methods: {
    async changePage(page: number) {
      const { data } = await GET(this.url + '&page=' + page);
      this.cards = data.results;
    },
  },
  async mounted() {
    this.url = `/api/news/?${this.$route.name as string}=${
      this.$route.params.id
    }`;
    const { data } = await GET(this.url);
    this.totalItems = data.count;
    this.itemsPerPage = data.page_size;
    this.page = data.current;
    this.cards = data.results;
  },
});
</script>

<style lang="scss" scoped>
.sort-page {
  &__container {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, calc((100% - 20px) / 3));
    gap: 10px;
    row-gap: 50px;
  }
}

@media (max-width: 1024px) {
  .sort-page__container {
    row-gap: 20px;
    grid-template-columns: repeat(2, calc((100% - 10px) / 2));
  }
}
@media (max-width: 768px) {
  .sort-page__container {
    grid-template-columns: 100%;
  }
}
</style>
