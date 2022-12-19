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
          :brand_id="item.brand_id"
          :author_id="item.author_id"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import NewsCard from './MainCard.vue';

export default defineComponent({
  components: { NewsCard },
  name: 'AppMain',
  computed: {
    ...mapGetters({
      getNews: 'news/getNews',
    }),
  },
});
</script>

<style scoped lang="scss">
.main {
  min-height: 1000px;
  &__container {
    max-width: 1440px;
    width: 100%;
    margin: auto;
    padding: 20px 120px;
  }
  &__latest {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, calc((100% - 20px) / 3));
    gap: 10px;
    row-gap: 50px;
  }
}
</style>
