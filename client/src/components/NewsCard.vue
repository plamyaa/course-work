<template>
  <div class="card">
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
      :fontWeight="700"
    >
      <p>Asics</p>
    </TextWrapper>
    <TextWrapper>
      {{ title }}
    </TextWrapper>
    <TextWrapper
      :fontFamily="'libreFranklin'"
      :fontSize="10"
      :fontStyle="'italic'"
    >
      By Author
    </TextWrapper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewsCard',
  props: {
    id: Number,
    title: String,
    text: String,
  },
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
}
</style>
