<template>
  <div class="auth">
    <div class="auth__container">
      <form class="auth__form" @submit.prevent="handleLogin">
        <label class="auth__label" for="login">Введите логин:</label>
        <input
          class="auth__input"
          type="text"
          id="login"
          required="true"
          v-model.trim="username"
        />
        <label class="auth__label" for="password">Введите пароль:</label>
        <input
          class="auth__input"
          type="password"
          id="password"
          required="true"
          v-model.trim="password"
        />
        <button class="auth__submit-btn">Войти</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations } from 'vuex';

export default defineComponent({
  name: 'MainAuth',
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
.auth {
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
