<template>
  <div class="d-flex gap-3 mt-3 justify-content-center">
    <pagination/>
  </div>
  <div class="row row-cols-1 row-cols-md-3 g-4  mb-3">
    <item-card
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :description="truncateText(card.description)"
        :imgSrc="card.images[0]"
        @click="goToItemPage(card.id)"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import ItemCard from "@/components/ui/main/ItemCard.vue";
import Pagination from "@/components/ui/main/Pagination.vue";

export default {
  components: {
    Pagination,
    ItemCard
  },
  data() {
    return {
      cards: []
    };
  },
  computed: {
    ...mapGetters(['getItems'])
  },

  created() {
    if (this.getItems.length === 0) {
      this.$store.dispatch('fetchItems');
    } else {
      this.cards = this.getItems;
    }
  },

  methods: {
    truncateText(text) {
      return text.length > 50 ? text.substring(0, 50) + "..." : text;
    },
    goToItemPage(id) {
      this.$router.push({name: 'ItemPage', params: {id}});
    }
  },
  watch: {
    getItems: {
      immediate: true,
      handler(newItems) {
        if (newItems.length > 0) {
          this.cards = newItems;
        }
      }
    }
  }
};
</script>
