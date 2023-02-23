<template>
  <main class="main">
    <div class="main__container">
      <div class="main__latest">
        <NewsCard
          v-for="item in getNews"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :text="item.text"
          :image_src="item.image_src"
          :brand="item.brand"
          :author="item.author"
        />
      </div>
      <div v-if="showPagination">
        <MainPagination
          :page="page"
          :totalItems="totalItems"
          :itemsPerPage="itemsPerPage"
          @changePage="changePage"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import NewsCard from './MainCard.vue';
import MainPagination from './UI/MainPagination.vue';

export default defineComponent({
  components: { NewsCard, MainPagination },
  name: 'AppMain',
  computed: {
    ...mapGetters({
      getNews: 'news/getNews',
      page: 'news/pagination/getPage',
      totalItems: 'news/pagination/getTotalItems',
      itemsPerPage: 'news/pagination/getItemsPerPage',
      showPagination: 'news/pagination/getShowPagination',
    }),
  },
  methods: {
    ...mapMutations({
      setNews: 'news/addNews',
    }),
    ...mapActions({
      readPage: 'news/pagination/readPage',
    }),
    async changePage(page: number) {
      const response = await this.readPage({
        entity: 'news',
        endPoint: '/api/news/',
        page: page,
      });
      this.setNews(response);
    },
  },
});
</script>

<style scoped lang="scss">
.main__latest {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: repeat(3, calc((100% - 20px) / 3));
  gap: 10px;
  row-gap: 50px;
}
@media (max-width: 1024px) {
  .main__latest {
    row-gap: 20px;
    grid-template-columns: repeat(2, calc((100% - 10px) / 2));
  }
}
@media (max-width: 768px) {
  .main__latest {
    grid-template-columns: 100%;
  }
}
</style>
