<template>
  <main class="main">
    <div class="main__latest">
      <NewsCard
        v-for="item in getNews"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :text="item.text"
        :image_src="item.image_src"
        :brand_id="item.brand_id"
        :author_id="item.author_id"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import NewsCard from './MainCard.vue';

export default defineComponent({
  components: { NewsCard },
  name: 'AppMain',
  mounted() {
    this.getAllNews();
  },
  methods: {
    ...mapActions({ getAllNews: 'news/read' }),
  },
  computed: {
    ...mapGetters({
      getNews: 'news/getNews',
    }),
  },
});
</script>

<style scoped lang="scss">
.main {
  max-width: 1440px;
  width: 100%;
  padding: 20px 120px;
  &__latest {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, calc((100% - 20px) / 3));
    gap: 10px;
    row-gap: 50px;
  }
}
</style>
