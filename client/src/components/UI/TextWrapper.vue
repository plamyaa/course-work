<template>
  <div class="link" :class="fontFamily" :style="styleObject">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextWrapper',
  props: {
    fontFamily: String,
    fontSize: Number,
    fontStyle: String,
    fontWeight: Number,
    color: String,
  },
  data() {
    return {
      styleObject: {
        fontSize: (this.fontSize ?? 20) + 'px',
        fontStyle: this.fontStyle ?? 'normal',
        fontWeight: this.fontWeight ?? 400,
        color: this.color ?? '#000000',
      },
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

a {
  text-decoration: none;
}
</style>
