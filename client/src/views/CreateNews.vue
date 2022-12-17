<template>
  <div class="create-news">
    <form class="create-news__form form">
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
          required="true"
          maxlength="100"
          v-model="title"
        />
        <TextWrapper
          :fontFamily="'libreFranklin'"
          :color="'#1111117a'"
          :fontSize="10"
          >{{ titleLen }}/100</TextWrapper
        >
      </label>
      <label class="form__label" for="title">
        <input
          class="form__input"
          type="text"
          id="title"
          required="true"
          placeholder="Ссылка на главное изображение..."
          v-model="imageSrc"
        />
      </label>
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
      <MainButton v-if="id === 0" class="form__submit" @click="createNews">
        Создать новость
      </MainButton>
      <MainButton v-else class="form__submit" @click="editNews">
        Редактивароать новость
      </MainButton>
    </form>
    <div v-html="output" class="create-news__output"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { marked } from 'marked';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'CreateNews',
  data() {
    return {
      id: 0,
      title: '',
      text: '',
      imageSrc: '',
    };
  },
  async mounted() {
    const id = Number(this.$route.params.id);
    const response = await this.getNews(id);
    const { title, text, imageSrc } = response;
    this.id = id;
    this.title = title;
    this.text = text;
    this.imageSrc = imageSrc;
  },
  computed: {
    titleLen(): number {
      return this.title.length;
    },
    output(): string {
      return marked(this.text);
    },
  },
  methods: {
    ...mapActions(['addNews', 'getNews', 'updateNews']),
    createNews() {
      this.addNews({
        title: this.title,
        text: this.text,
        image_src: this.imageSrc,
      });
      this.$router.push('/');
    },
    editNews() {
      this.updateNews({
        id: this.id,
        title: this.title,
        text: this.text,
        imageSrc: this.imageSrc,
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
  max-width: 1440px;
  width: 100%;
  padding: 20px 120px;
  display: grid;
  grid-template-columns: 35% 65%;
  gap: 60px;
  &__output {
    overflow-wrap: break-word;
    background: #fff;
    padding: 10px;
    box-shadow: inset 0px 3px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    font-family: 'Nunito', sans-serif;
    max-height: 600px;
    overflow: scroll;
  }
}
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__label {
    align-items: center;
    gap: 10px;
    display: grid;
    grid-template-columns: 100% auto;
    width: 100%;
  }
  &__input {
    min-height: 53px;
    max-height: 360px;
    width: 100%;
    padding: 19px 25px;
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
