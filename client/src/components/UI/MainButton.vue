<template>
  <button class="button" type="button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainButton',
});
</script>

<style scoped lang="scss">
.button {
  border: 1px solid #000000;
  padding: 21px;
  background: 0;
  font-family: 'Libre Franklin';
  font-style: italic;
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #000000;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #0000001b;
  }
  &:active {
    background: #00000014;
  }
}
</style>
