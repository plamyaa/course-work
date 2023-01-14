<template>
  <header class="header">
    <div class="header__container">
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
          v-if="role < 3"
        >
          <router-link class="header__link" to="/newsCreate">
            Добавить статью
          </router-link>
        </TextWrapper>
        <TextWrapper
          class="header__text"
          :fontFamily="'libreFranklin'"
          :fontSize="14"
          :fontWeight="700"
          @click="handleAuth"
        >
          <router-link class="header__link" :to="authButton.route">
            {{ authButton.text }}
          </router-link>
        </TextWrapper>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'MainHeader',
  methods: {
    ...mapMutations({
      logout: 'user/logoutUser',
    }),
    handleAuth() {
      if (this.isAuth === true) {
        this.logout();
      }
    },
  },
  computed: {
    ...mapGetters({
      role: 'user/getRole',
      isAuth: 'user/getAuth',
    }),
    authButton() {
      switch (this.isAuth) {
        case false:
          return {
            route: '/login',
            text: 'Войти',
          };
        default:
          return {
            route: '/',
            text: 'Выйти',
          };
      }
    },
  },
});
</script>

<style scoped lang="scss">
.header {
  background: #fff5e5;
  border-bottom: 1px solid #e6e6e6;
  &__container {
    height: 75px;
    margin: auto;
    max-width: 1440px;
    padding: 0 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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
@media (max-width: 1024px) {
  .header__container {
    padding: 0 80px;
  }
}
@media (max-width: 768px) {
  .header__container {
    padding: 0 50px;
  }
}
@media (max-width: 475px) {
  .header__container {
    padding: 20px;
  }
}
</style>
