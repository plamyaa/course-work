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
        <!-- <div class="header__search">
          <input type="text" class="header__input" v-if="showInput" />
          <button class="header__button" @click="toggleInput">
            <img src="@/assets/find.svg" class="header__icon" />
          </button>
        </div> -->
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
  data() {
    return {
      showInput: false,
      search: null,
    };
  },
  methods: {
    ...mapMutations({
      logout: 'user/logoutUser',
    }),
    toggleInput() {
      this.showInput = !this.showInput;
    },
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
    align-items: center;
  }
  &__search {
    display: flex;
    gap: 10px;
  }
  &__button {
    height: 30px;
    width: 30px;
    border: 0;
    background: transparent;
    border-radius: 100%;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #57471c32;
    }
  }
  &__icon {
    width: 25px;
    height: 25px;
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
    flex-direction: column;
    justify-content: space-around;
    padding: 0 50px;
  }
}
@media (max-width: 475px) {
  .header__container {
    padding: 20px;
  }
}
</style>
