<template>
  <div class="news-page">
    <div class="news-page__container">
      <div class="news-page__content">
        <div class="news-page__buttons" v-if="role < 3">
          <MainButton v-if="role < 3" @click="editNews">
            Редактировать новость
          </MainButton>
          <MainButton v-if="role < 2" @click="deleteSubmit">
            Удалить новость
          </MainButton>
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
      <div class="news-page__side"></div>
    </div>
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
    const id = +this.$route.params.id;
    if (!id) return;
    let news = this.getNewsById(id);
    if (!news) news = await this.newsById(id);
    const { title, text, image_src } = news;
    this.id = id;
    this.title = title;
    this.text = text;
    this.image_src = image_src;
  },
  methods: {
    ...mapActions({
      deleteNews: 'news/delete',
      readNews: 'news/read',
      newsById: 'news/readById',
    }),
    editNews() {
      this.$router.push('/newsEdit/' + this.id);
    },
    deleteSubmit() {
      const answer = confirm('Вы уверены, что хотите удалить новость?');
      if (answer) {
        this.deleteNews(this.id);
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapGetters({
      role: 'user/getRole',
      getNewsById: 'news/getNewsById',
    }),
    output(): string {
      return marked(this.text);
    },
  },
});
</script>

<style scoped lang="scss">
.news-page {
  &__container {
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
  }
  &__content {
    display: flex;
    flex-direction: column;
    max-width: 750px;
    gap: 30px;
  }
  &__text {
    font-family: 'Nunito', sans-serif;
  }
  &__buttons {
    display: flex;
    gap: 20px;
  }
}
</style>
