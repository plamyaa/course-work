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
            :brand_id="lastNews.brand_id"
            :author_id="lastNews.author_id"
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
            <li v-for="brand in brandsLen(8)" :key="brand.id">
              <TextWrapper :fontFamily="'tenorSans'" :color="'#fff'">
                {{ brand.brand }}
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
            <li v-for="collection in collectionsLen(8)" :key="collection.id">
              <TextWrapper :fontFamily="'tenorSans'" :color="'#fff'">
                {{ collection.collection }}
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
import MainCard from './MainCard.vue';

export default defineComponent({
  name: 'MainFooter',
  components: { MainCard },
  computed: {
    ...mapGetters({
      lastNews: 'news/getLastNews',
      brandsLen: 'brand/getBrandByLength',
      collectionsLen: 'collection/getCollectionByLength',
    }),
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
  &__rights {
    height: 70px;
    display: flex;
    align-items: flex-end;
    gap: 15px;
  }
}
</style>
