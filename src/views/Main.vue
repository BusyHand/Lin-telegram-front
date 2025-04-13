<template>
  <div class="d-flex gap-3 mt-3 justify-content-center">
    <item-toggle
        :toggle-items-name="itemName.name"
        :items="itemNamesMap"
        @select-item="updateItemName"
    />
    <sort-component
        :sort-options="sortOptions"
        :initial-sort="sort"
        @update-sort="updateSort"
    />
  </div>
  <div class="d-flex gap-3 mt-3 justify-content-center">
    <pagination-component
        :total-pages="totalProductPages"
        :start-page="currentPage"
        @page-scroll="fetchPage"
    />
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4 mb-3">
    <ItemCard
        v-for="card in cards"
        :key="card.id"
        :name="card.name"
        :description="truncateText(card.description)"
        @click="goToItemPage(itemName.name, card.id)"
    />
  </div>
</template>


<script setup>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import ItemCard from '@/components/ui/main/ItemCard.vue'
import PaginationComponent from "@/components/ui/main/PaginationComponent.vue";
import SortComponent from "@/components/ui/main/SortComponent.vue";
import ItemToggle from "@/components/ui/main/ItemToggle.vue";

const store = useStore()
const router = useRouter()

const totalProductPages = computed(() => store.getters.getTotalItemPages);
const cards = computed(() => store.getters.getItems)

const itemNamesMap = {
  tools: "Инструменты",
  cases: "Бизнес кейсы",
  terms: "Термины"
}

const itemName = ref({
  name: "tools",
  desc: "Инструменты"
})

const currentPage = ref(1)

const sortOptions = {
  name: "Название",
  createAt: "Дата создания",
};

const sort = ref({
  field: "createAt",
  order: "desc"
});

const updateSort = (newSort) => {
  sort.value = newSort;
  fetchPage({page: currentPage.value});
};

const updateItemName = (newItemKey) => {
  if (itemNamesMap[newItemKey]) {
    itemName.value = {
      name: newItemKey,
      desc: itemNamesMap[newItemKey]
    }
    fetchPage({page: currentPage.value})
  }
}


const fetchPage = ({page}) => {
  currentPage.value = page;
  store.dispatch("fetchItems", {
    page: page - 1,
    size: 6,
    sort: `${sort.value.field},${sort.value.order}`,
    itemName: itemName.value.name
  });
};

const truncateText = (text) =>
    text?.length > 50 ? text.substring(0, 50) + '...' : text || ''

const goToItemPage = (itemName, id) => {
  router.push({name: 'ItemPage', params: {itemName, id}})
}

onMounted(async () => {
  await store.dispatch('fetchItems', {page: 0})
})
</script>

