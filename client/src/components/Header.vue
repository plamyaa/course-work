<template>
  <header class="header">
    <TextWrapper class="header__logo" :fontFamily="'tenorSans'" :fontSize="24">
      <a>SNEAKER FORCE</a>
    </TextWrapper>
    <nav class="header__nav">
      <TextWrapper
        class="header__link"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <router-link to="/">Главная</router-link>
      </TextWrapper>
      <TextWrapper
        class="header__link"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <a>Новости</a>
      </TextWrapper>
      <TextWrapper
        class="header__link"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <a>О Нас</a>
      </TextWrapper>
      <div v-if="isAuth">
        <TextWrapper
          class="header__link"
          :fontFamily="'libreFranklin'"
          :fontSize="14"
          :fontWeight="700"
        >
          <router-link to="/newsCreate">Добавить статью</router-link>
        </TextWrapper>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'MainHeader',
  computed: {
    ...mapGetters({
      isAuth: 'getAuth',
    }),
  },
});
</script>

<style scoped lang="scss">
.header {
  max-width: 1440px;
  width: 100%;
  height: 90px;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__nav {
    display: flex;
    gap: 28px;
  }
}
</style>
