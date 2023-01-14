<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { GET } from '@/api/axios-api';
import MainCard from '@/components/MainCard.vue';
import MainPagination from '@/components/UI/MainPagination.vue';
export default { name: 'SortPage' };
</script>

<template>
  <div class="sort-page">
    <div class="sort-page__container">
      <TextWrapper v-if="cards.length === 0">
        Здесь пока ничего нет...
      </TextWrapper>
      <MainCard
        v-for="{
          id,
          title,
          text,
          image_src,
          brand_id,
          author_id,
          collection_id,
        } in cards"
        :key="id"
        :id="id"
        :title="title"
        :text="text"
        :image_src="image_src"
        :brand_id="brand_id"
        :author_id="author_id"
        :collection_id="collection_id"
      />
    </div>
    <div class="sort-page__pagination">
      <MainPagination :totalItems="totalItems" :itemsPerPage="itemsPerPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const cards = ref([]);
const totalItems = ref(0);
const itemsPerPage = ref(10);
onMounted(async () => {
  const { data } = await GET(
    `/api/news/?${route.name as string}_id=${route.params.id}`
  );
  console.log(data);
  totalItems.value = data.count;
  cards.value = data.results;
});
</script>

<style lang="scss" scoped>
.sort-page {
  &__pagination {
  }
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
