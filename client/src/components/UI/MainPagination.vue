<template>
  <vue-awesome-paginate
    :total-items="totalItems"
    v-model="currentPage"
    :items-per-page="itemsPerPage"
    :max-pages-shown="maxPagesShown"
    :on-click="onClickHandler"
  />
</template>

<script lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'MainPagination',
  components: {
    VueAwesomePaginate,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    maxPagesShown: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      currentPage: this.page,
    };
  },
  methods: {
    onClickHandler(page: number) {
      this.$emit('changePage', page);
    },
  },
});
</script>

<style lang="scss">
.pagination-container {
  margin-top: 15px;
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
