<template>
  <div class="card">
    <button class="deleteButton">delete</button>
    <button class="editButton" @click="editNews">edit</button>
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
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'NewsCard',
  props: {
    id: Number,
    title: String,
    text: String,
    imageSrc: String,
  },
  methods: {
    ...mapActions({}),
    editNews() {
      this.$router.push('newsEdit/' + this.id);
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  position: relative;
}

.deleteButton {
  position: absolute;
  right: 0;
}
.editButton {
  position: absolute;
  left: 50%;
}
</style>
