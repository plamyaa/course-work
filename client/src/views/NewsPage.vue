<template>
  <div class="news-page">
    <div class="news-page__buttons" v-if="isAuth">
      <MainButton @click="editNews">Редактировать новость</MainButton>
      <MainButton @click="deleteConfirm"> Удалить новость </MainButton>
    </div>
    <TextWrapper
      class="news-page__title"
      :fontWight="700"
      :fontFamily="'tenorSans'"
      :fontSize="36"
    >
      {{ title }}
    </TextWrapper>
    <img :src="image_src" />
    <div v-html="output" class="news-page__text"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { marked } from 'marked';

export default defineComponent({
  name: 'NewsPage',
  data() {
    return {
      id: 0,
      title: '',
      text: '',
      image_src: '',
    };
  },
  async mounted() {
    const id = Number(this.$route.params.id);
    if (!id) return;
    const response = await this.getNews(id);
    const { title, text, image_src } = response;
    this.id = id;
    this.title = title;
    this.text = text;
    this.image_src = image_src;
  },
  methods: {
    ...mapActions({ getNews: 'news/readById', deleteNews: 'news/delete' }),
    editNews() {
      this.$router.push('/newsEdit/' + this.id);
    },
    deleteConfirm() {
      const answer = confirm('Вы уверены, что хотите удалить новость?');
      if (answer) {
        this.deleteNews(this.id);
      }
    },
  },
  computed: {
    ...mapGetters({ isAuth: 'getAuth' }),
    output(): string {
      return marked(this.text);
    },
  },
});
</script>

<style scoped lang="scss">
.news-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 750px;
  width: 100%;
  padding: 20px 0 20px 120px;
  &__text {
    font-family: 'Nunito', sans-serif;
  }
  &__buttons {
    display: flex;
    gap: 20px;
  }
}
</style>
