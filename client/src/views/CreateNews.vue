<template>
  <div class="create-news">
    <div class="create-news__container">
      <form class="create-news__form form" @submit.prevent="createNews">
        <TextWrapper
          :fontFamily="'libreFranklin'"
          :fontStyle="'italic'"
          :fontSize="10"
        >
          Заполните поля для создания новости:
        </TextWrapper>
        <label class="form__label" for="title">
          <input
            class="form__input"
            type="text"
            id="title"
            placeholder="Заголовок..."
            maxlength="100"
            required="true"
            v-model="title"
          />
          <TextWrapper
            :fontFamily="'libreFranklin'"
            :color="'#1111117a'"
            :fontSize="10"
          >
            {{ titleLen }}/100
          </TextWrapper>
        </label>
        <label class="form__label" for="title">
          <input
            class="form__input"
            type="text"
            id="title"
            placeholder="Ссылка на главное изображение..."
            required="true"
            v-model="image_src"
          />
        </label>
        <div class="form__selectors">
          <select class="form__input">
            <option>1</option>
            <option>2</option>
          </select>
          <select class="form__input">
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <label class="form__label" for="title">
          <textarea
            class="form__input"
            id="title"
            placeholder="Текст новости..."
            rows="20"
            required="true"
            v-model="text"
          />
        </label>
        <MainButton v-if="id === 0" class="form__submit">
          Создать новость
        </MainButton>
        <MainButton v-else class="form__submit">
          Редактивароать новость
        </MainButton>
      </form>
      <div v-html="output" class="create-news__output"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { marked } from 'marked';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'CreateNews',
  data() {
    return {
      id: 0,
      title: '',
      text: '',
      image_src: '',
      collection: '',
      brand: '',
    };
  },
  async mounted() {
    const id = Number(this.$route.params.id);
    if (!id) return;
    const news = this.getNewsById(id);
    const { title, text, image_src, collection, brand } = news;
    this.id = id;
    this.title = title;
    this.text = text;
    this.image_src = image_src;
    this.collection = collection;
    this.brand = brand;
  },
  computed: {
    ...mapGetters({
      getNewsById: 'news/getNewsById',
    }),
    titleLen(): number {
      return this.title.length;
    },
    output(): string {
      return marked(this.text);
    },
    isFieldsHasEmpty() {
      if (!this.title || !this.image_src || !this.text) {
        alert('Заполните все поля!');
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions({
      addNews: 'news/create',
      getNews: 'news/readById',
      updateNews: 'news/update',
    }),
    createNews() {
      if (this.isFieldsHasEmpty) return;
      this.addNews({
        title: this.title,
        text: this.text,
        image_src: this.image_src,
      });
      this.$router.push('/');
    },
    editNews() {
      if (this.isFieldsHasEmpty) return;
      this.updateNews({
        id: this.id,
        title: this.title,
        text: this.text,
        image_src: this.image_src,
      });
      this.$router.push('/');
    },

    // update(e: Event) {
    //   const target = e.target as HTMLTextAreaElement;
    //   this.text = target.value;
    // },
  },
});
</script>

<style scoped lang="scss">
.create-news {
  background: #fffefc;

  &__container {
    margin: auto;
    max-width: 1440px;
    width: 100%;
    display: grid;
    grid-template-columns: 35% 65%;
    column-gap: 55px;
  }
  &__output {
    width: calc(100% - 55px);
    overflow-wrap: break-word;
    background: #fff;
    padding: 10px;
    box-shadow: inset 0px 3px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    height: 615px;
    overflow: scroll;
  }
}
.form {
  display: flex;
  flex-direction: column;
  gap: 17px;
  &__label {
    align-items: center;
    gap: 8px;
    display: grid;
    grid-template-columns: 100% auto;
    width: 100%;
  }
  &__selectors {
    display: flex;
    gap: 15px;
  }
  &__input {
    max-height: 360px;
    width: 100%;
    padding: 13px 10px;
    background: #ffffff;
    box-shadow: inset 0px 3px 4px 1px rgba(0, 0, 0, 0.25);
    border: 0;
    border-radius: 6px;
    resize: vertical;
    &::placeholder {
      color: #1111117a;
      opacity: 1;
    }
    &:-ms-input-placeholder,
    &::-ms-input-placeholder {
      color: #1111117a;
    }
  }
}
</style>
