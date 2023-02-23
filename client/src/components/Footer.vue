<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__card">
          <TextWrapper
            class="footer__header"
            :fontFamily="'libreFranklin'"
            :fontSize="10"
            :fontWeight="700"
            :fontStyle="'italic'"
            :color="'#fff'"
          >
            ПОСЛЕДНЯЯ НОВОСТЬ
          </TextWrapper>
          <MainCard
            v-if="lastNews !== undefined"
            :id="lastNews.id"
            :title="lastNews.title"
            :text="lastNews.text"
            :image_src="lastNews.image_src"
            :brand="lastNews.brand"
            :author="lastNews.author"
            :color="'#fff'"
            :imageHeight="'50%'"
          />
        </div>
        <div class="footer__brands">
          <TextWrapper
            class="footer__header"
            :fontFamily="'libreFranklin'"
            :fontSize="10"
            :fontWeight="700"
            :fontStyle="'italic'"
            :color="'#fff'"
          >
            ПОПУЛЯРЫЕ БРЕНДЫ
          </TextWrapper>
          <hr class="footer__line" />
          <ul class="footer__brands-list">
            <li v-for="{ brand, id } in brandsLen(8)" :key="id">
              <TextWrapper :fontFamily="'tenorSans'" :color="'#fff'">
                <router-link class="footer__link" :to="`/brand/${id}`">
                  {{ brand }}
                </router-link>
              </TextWrapper>
            </li>
          </ul>
          <hr class="footer__line" />
        </div>
        <div class="footer__collections">
          <TextWrapper
            class="footer__header"
            :fontFamily="'libreFranklin'"
            :fontSize="10"
            :fontWeight="700"
            :fontStyle="'italic'"
            :color="'#fff'"
          >
            ПОПУЛЯРЫЕ КОЛЛЕКЦИИ
          </TextWrapper>
          <hr class="footer__line" />
          <ul class="footer__brands-list">
            <li v-for="{ collection, id } in collectionsLen(8)" :key="id">
              <TextWrapper :fontFamily="'tenorSans'" :color="'#fff'">
                <router-link class="footer__link" :to="`/collection/${id}`">
                  {{ collection }}
                </router-link>
              </TextWrapper>
            </li>
          </ul>
          <hr class="footer__line" />
        </div>
      </div>
      <div class="footer__rights">
        <TextWrapper
          :fontSize="15"
          :fontWeight="800"
          :fontStyle="'italic'"
          :color="'#fff'"
        >
          SNEAKER FORCE
        </TextWrapper>
        <TextWrapper
          :fontFamily="'libreFranklin'"
          :fontSize="10"
          :fontStyle="'italic'"
          :color="'#666'"
        >
          © 2022 SNEAKER FORCE™, all rights reserved
        </TextWrapper>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { GET } from '../api/axios-api';
import MainCard from './MainCard.vue';

export default defineComponent({
  name: 'MainFooter',
  components: { MainCard },
  data() {
    return {
      lastNews: {},
    };
  },
  computed: {
    ...mapGetters({
      brandsLen: 'brand/getBrandByLength',
      collectionsLen: 'collection/getCollectionByLength',
    }),
  },
  async mounted() {
    const { data } = await GET('api/news/last/');
    this.lastNews = data;
  },
});
</script>

<style scoped lang="scss">
.footer {
  background-color: #000000;
  &__container {
    max-width: 1440px;
    width: 100%;
    margin: auto;
    padding: 40px 120px 15px;
    display: flex;
    flex-direction: column;
  }
  &__content {
    display: grid;
    column-gap: 30px;
    grid-template-columns: repeat(3, calc((100% - 60px) / 3));
  }
  &__header {
    margin-bottom: 25px;
  }

  &__line {
    margin-bottom: 15px;
  }
  &__brands-list {
    display: grid;
    gap: 10px;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  &__link {
    text-decoration: none;
    transition: 0.3s;
    text-decoration: none;
    color: #ffffff;
    &:visited {
      color: #c4c4c4;
    }
    &:hover {
      color: #f1f1f1;
    }
    &:active {
      color: #aeaeae;
    }
  }
  &__rights {
    height: 70px;
    display: flex;
    align-items: flex-end;
    gap: 15px;
  }
}
@media (max-width: 1024px) {
  .footer__container {
    padding: 35px 80px 15px;
  }
}
@media (max-width: 768px) {
  .footer__container {
    padding: 30px 50px 15px;
  }
  .footer__content {
    row-gap: 20px;
    grid-template-columns: repeat(2, calc((100% - 30px) / 2));
  }
}
@media (max-width: 475px) {
  .footer__container {
    padding: 20px;
  }
  .footer__content {
    grid-template-columns: 100%;
  }
}
</style>
