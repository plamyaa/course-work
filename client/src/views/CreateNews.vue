<template>
  <div class="create-news">
    Fill in the fields to add news:
    <form class="create-news__form">
      <label for="title">Title:</label>
      <input type="text" id="title" />
      <label for="title">Text:</label>
      <input type="text" id="title" />
      <label for="title">Photo name:</label>
      <input type="text" id="title" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CreateNews',
});
</script>

<style scoped lang="scss"></style>
