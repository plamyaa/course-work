<template>
  <div class="card">
    <img class="card__image" :src="image_src" @click="openNews" />
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
      :fontWeight="700"
    >
      {{ brand }}
    </TextWrapper>
    <TextWrapper>
      {{ title }}
    </TextWrapper>
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
    >
      {{ author_id }}
    </TextWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'MainCard',
  props: {
    id: Number,
    title: String,
    text: String,
    image_src: String,
    brand_id: Number,
    author_id: Number,
  },
  data() {
    return {
      brand: '',
      author: '',
    };
  },
  async mounted() {
    const brandResponse = await this.getBrand(this.id);
    this.brand = brandResponse.brand;
  },
  methods: {
    ...mapActions({ getBrand: 'brand/readById', deleteNews: 'news/delete' }),
    openNews() {
      this.$router.push('newsPage/' + this.id);
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  &__image {
    cursor: pointer;
    height: 255px;
    object-fit: cover;
  }
}

.deleteButton {
  position: absolute;
  right: 0;
}
.editButton {
  position: absolute;
  left: 50%;
}
</style>
