<template>
  <div class="text-wrapper" :class="fontFamily">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextWrapper',
  props: {
    fontFamily: {
      type: String,
      default: 'tenorSans',
    },
    fontSize: {
      type: Number,
      default: 20,
    },
    fontStyle: {
      type: String,
      default: 'normal',
    },
    fontWeight: {
      type: Number,
      default: 400,
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  data() {
    return {
      size: this.fontSize + 'px',
    };
  },
});
</script>

<style scoped lang="scss">
.tenorSans {
  font-family: 'Tenor Sans', sans-serif;
}
.libreFranklin {
  font-family: 'Libre Franklin', sans-serif;
}
.text-wrapper {
  font-size: v-bind(size);
  font-style: v-bind(fontStyle);
  font-weight: v-bind(fontWeight);
  color: v-bind(color);
}
</style>
