<template>
  <div class="card">
    <img
      class="card__image"
      :src="image_src"
      @click="openNews"
      :style="{ height: style.height }"
    />
    <div class="card__links">
      <TextWrapper
        :fontFamily="'libreFranklin'"
        :fontSize="10"
        :fontStyle="'italic'"
        :fontWeight="700"
        :color="style.color"
      >
        <router-link :to="`/brand/${brand}`" class="card__link">
          {{ getBrandById(brand) }}
        </router-link>
      </TextWrapper>
      <TextWrapper
        :fontFamily="'libreFranklin'"
        :fontSize="10"
        :fontStyle="'italic'"
        :fontWeight="700"
        :color="style.color"
      >
        <router-link :to="`/author/${author}`" class="card__link">
          {{ getAuthorById(author) }}
        </router-link>
      </TextWrapper>
    </div>
    <TextWrapper :fontFamily="'tenorSans'" :color="style.color">
      <router-link :to="`/newsPage/${id}`" class="card__link">
        {{ title }}
      </router-link>
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
    brand: Number,
    author: Number,
    color: String,
    imageHeight: String,
  },
  data() {
    return {
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
    ...mapGetters({
      getBrandById: 'brand/getBrandById',
      getAuthorById: 'author/getAuthorById',
    }),
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
  &__links {
    display: flex;
    justify-content: space-between;
  }
  &__link {
    text-decoration: none;
    color: v-bind(color);
    transition: 0.3s;
    &:visited {
      opacity: 0.9;
    }
    &:hover {
      opacity: 0.8;
    }
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
