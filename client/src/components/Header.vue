<template>
  <header class="header">
    <TextWrapper
      class="header__logo-wrapper"
      :fontFamily="'tenorSans'"
      :fontSize="24"
    >
      <router-link class="header__logo" to="/">SNEAKER FORCE</router-link>
    </TextWrapper>
    <nav class="header__nav">
      <TextWrapper
        class="header__text"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <router-link class="header__link" to="/">Главная</router-link>
      </TextWrapper>
      <TextWrapper
        class="header__text"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <a class="header__link" href="#">Новости</a>
      </TextWrapper>
      <TextWrapper
        class="header__text"
        :fontFamily="'libreFranklin'"
        :fontSize="14"
        :fontWeight="700"
      >
        <a class="header__link" href="#"> О Нас </a>
      </TextWrapper>
      <div v-if="isAuth">
        <TextWrapper
          class="header__text"
          :fontFamily="'libreFranklin'"
          :fontSize="14"
          :fontWeight="700"
        >
          <router-link class="header__link" to="/newsCreate"
            >Добавить статью</router-link
          >
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
  background: #fff5e5;
  max-width: 1440px;
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__logo {
    text-decoration: none;
    color: #000000;
  }
  &__nav {
    display: flex;
    gap: 28px;
  }
  &__link {
    transition: 0.3s;
    text-decoration: none;
    &:visited {
      color: #57471c;
    }
    &:hover {
      color: #aa8957;
    }
    &:active {
      color: #c29c61;
    }
  }
}
</style>
