<template>
  <div class="container">
    <Header />
    <div class="content">
      <MainLoader v-if="isLoaded" />
      <router-view v-else :key="$route.fullPath"></router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default defineComponent({
  components: { Header, Footer },
  name: 'App',
  async mounted() {
    this.setLoad(true);
    this.fetchNews();
    this.fetchBrands();
    this.fetchCollections();
    this.refreshToken();
  },
  methods: {
    ...mapMutations({ setLoad: 'setLoad' }),
    ...mapActions({
      refreshToken: 'user/refreshToken',
      fetchNews: 'news/read',
      fetchBrands: 'brand/read',
      fetchCollections: 'collection/read',
    }),
  },
  computed: {
    ...mapGetters({
      isLoaded: 'getLoad',
    }),
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Libre+Franklin&family=Nunito&family=Tenor+Sans&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  max-width: 1440px;
  box-sizing: border-box;
  padding: 20px 120px;
  width: 100%;
  flex: 1;
  margin: auto;
}

@media (max-width: 1024px) {
  .content {
    padding: 20px 80px;
  }
}
@media (max-width: 768px) {
  .content {
    padding: 20px 50px;
  }
}
@media (max-width: 475px) {
  .content {
    padding: 20px;
  }
}
</style>
