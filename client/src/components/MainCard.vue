<template>
  <div class="card">
    <img
      class="card__image"
      :src="image_src"
      @click="openNews"
      :style="{ height: style.height }"
    />
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
      :fontWeight="700"
      :color="style.color"
    >
      {{ getBrandById(id) }}
    </TextWrapper>
    <TextWrapper :fontFamily="'tenorSans'" :color="style.color">
      {{ title }}
    </TextWrapper>
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
      :color="style.color"
    >
      {{ author_id }}
    </TextWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'MainCard',
  props: {
    id: Number,
    title: String,
    text: String,
    image_src: String,
    brand_id: Number,
    author_id: Number,
    color: String,
    imageHeight: String,
  },
  data() {
    return {
      author: '',
      style: {
        height: this.imageHeight ?? '255px',
        color: this.color ?? null,
      },
    };
  },
  methods: {
    ...mapActions({ deleteNews: 'news/delete' }),
    openNews() {
      this.$router.push('/newsPage/' + this.id);
    },
  },
  computed: {
    ...mapGetters({ getBrandById: 'brand/getBrandById' }),
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
