<template>
  <main class="main">
    <div class="main__latest">
      <NewsCard
        v-for="item in news"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :text="item.text"
        :image_src="item.image_src"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import NewsCard from './NewsCard.vue';

export default defineComponent({
  components: { NewsCard },
  name: 'AppMain',
  mounted() {
    this.getAllNews();
  },
  methods: {
    ...mapActions(['getAllNews']),
  },
  computed: {
    ...mapGetters({
      news: 'getNews',
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
