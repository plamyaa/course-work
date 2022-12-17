<template>
  <div class="container">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';

export default defineComponent({
  components: { Header },
  name: 'App',
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&family=Nunito&family=Tenor+Sans&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
