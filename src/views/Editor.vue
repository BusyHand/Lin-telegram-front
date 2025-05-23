<template>
  <div class="p-4 space-y-8">
    <div class="d-flex justify-content-center mb-4">
      <create-modal custom-class="w-100"/>
    </div>
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

    <EditorTable
        :type="itemName.name"
        :title="itemName.desc"
        :headers="['ID', 'Название', 'Описание']"
        :keys="['id', 'name', 'definition']"
        :data="itemData"
        @delete="handleDelete"
        @go-to-page="(entry) => goToItemPage(itemName.name, entry.id)"
    />
  </div>
</template>


<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import EditorTable from '@/components/ui/editor/EditorTable.vue'
import SortComponent from "@/components/ui/main/SortComponent.vue"
import ItemToggle from "@/components/ui/main/ItemToggle.vue"
import PaginationComponent from "@/components/ui/main/PaginationComponent.vue"
import CreateModal from "@/components/ui/editor/CreateModal.vue"

const store = useStore()
const router = useRouter()
const route = useRoute()

const totalProductPages = computed(() => store.getters.getTotalItemPages)
const itemData = computed(() => store.getters.getItems)

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
  id: "ID",
  name: "Название",
  createAt: "Дата создания"
}

const sort = ref({
  field: "id",
  order: "desc"
})

const updateSort = (newSort) => {
  sort.value = newSort
  fetchPage({page: currentPage.value})
}

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
  currentPage.value = page
  store.dispatch("fetchItems", {
    page: page - 1,
    size: 10,
    sort: `${sort.value.field},${sort.value.order}`,
    itemName: itemName.value.name
  })
}

const goToItemPage = (itemName, id) => {
  router.push({name: 'ItemPage', params: {itemName, id}})
}

const handleDelete = (id) => {
  store.dispatch('deleteItem', {
    itemName: itemName.value.name,
    id: id
  }).then(() => {
    fetchPage({page: currentPage.value})
  })
}

onMounted(() => {
  const routeItem = route.query.item
  const routeSort = route.query.sort
  const routeOrder = route.query.order
  const routePage = parseInt(route.query.page || '1')

  if (routeItem && itemNamesMap[routeItem]) {
    itemName.value = {
      name: routeItem,
      desc: itemNamesMap[routeItem]
    }
  }

  if (routeSort && sortOptions[routeSort]) {
    sort.value.field = routeSort
  }

  if (routeOrder === 'asc' || routeOrder === 'desc') {
    sort.value.order = routeOrder
  }

  if (!isNaN(routePage)) {
    currentPage.value = routePage
  }

  fetchPage({page: currentPage.value})
})

watch([itemName, sort, currentPage], () => {
  router.replace({
    query: {
      item: itemName.value.name,
      sort: sort.value.field,
      order: sort.value.order,
      page: currentPage.value
    }
  })
}, {deep: true})
</script>

