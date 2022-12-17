<template>
  <div :class="fontFamily" :style="styleObject">
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
        fontSize: this.fontSize === undefined ? '20px' : this.fontSize + 'px',
        fontStyle: this.color === undefined ? 'normal' : this.fontStyle,
        fontWeight: this.fontWeight === undefined ? 400 : this.fontWeight,
        color: this.color === undefined ? '#000000' : this.color,
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&family=Tenor+Sans&display=swap');
.tenorSans {
  font-family: 'Tenor Sans', sans-serif;
}
.libreFranklin {
  font-family: 'Libre Franklin', sans-serif;
}
</style>
