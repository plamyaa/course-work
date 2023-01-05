<template>
  <div class="login">
    <div class="login__container">
      <form class="login__form" @submit.prevent="handleLogin">
        <label class="login__label" for="login">Введите логин:</label>
        <input
          class="login__input"
          type="text"
          id="login"
          required="true"
          v-model.trim="username"
        />
        <label class="login__label" for="password">Введите пароль:</label>
        <input
          class="login__input"
          type="password"
          id="password"
          required="true"
          v-model.trim="password"
        />
        <button class="login__submit-btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';

export default defineComponent({
  name: 'MainLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapMutations({ setAuth: 'user/setAuth' }),
    ...mapActions({
      loginUser: 'user/loginUser',
      readRole: 'user/readRoleByUsername',
    }),
    handleLogin() {
      this.loginUser({ username: this.username, password: this.password });
      this.readRole({ username: this.username });
      this.$router.push('/');
    },
  },
});
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: calc(100vh - 75px);
  &__container {
    padding: 15px;
    margin: auto;
    margin-top: 30px;
    width: 350px;
    height: 400px;
    border: 1px solid black;
    border-radius: 6px;
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
