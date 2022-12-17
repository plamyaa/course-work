<template>
  <div class="card">
    <img class="card__image" :src="image_src" @click="openNews" />
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
      :fontWeight="700"
    >
      <p>Asics</p>
    </TextWrapper>
    <TextWrapper>
      {{ title }}
    </TextWrapper>
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
    >
      By Author
    </TextWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'NewsCard',
  props: {
    id: Number,
    title: String,
    text: String,
    image_src: String,
  },
  methods: {
    ...mapActions({
      deleteNews: 'deleteNews',
    }),
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
