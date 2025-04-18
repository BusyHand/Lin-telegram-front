<template>
  <div class="container py-3" v-if="item">
    <div class="container pb-5">
      <button class="btn btn-outline-secondary w-100" @click="goBack">
        <i class="bi bi-arrow-left mx-1"></i> Назад
      </button>
    </div>
    <h1 class="text-center mb-4">{{ item?.name || "Загрузка..." }}</h1>

    <div v-if="item?.images?.length" id="carouselExampleControls" class="carousel slide mb-4" data-bs-ride="carousel">
      <div class="carousel-inner rounded-4 overflow-hidden shadow-sm">
        <div v-for="(image, index) in item.images" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="getImageUrl(image.name)" class="d-block w-100" alt="Item Image">
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Предыдущий</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Следующий</span>
      </button>
    </div>

    <div class="mb-3">
      <h5 class="text-primary">Описание</h5>
      <p class="text-muted">{{ item.definition || "Нет описания" }}</p>
    </div>

    <div v-if="item.secondaryDefinition" class="mb-3">
      <h5 class="text-primary">Доп. определение</h5>
      <p class="text-muted">{{ item.secondaryDefinition }}</p>
    </div>

    <div v-if="item.note" class="mb-3">
      <h5 class="text-primary">Примечание</h5>
      <p class="text-muted">{{ item.note }}</p>
    </div>

    <div v-if="item.purpose" class="mb-3">
      <h5 class="text-primary">Назначение</h5>
      <p class="text-muted">{{ item.purpose }}</p>
    </div>

    <div class="mt-4 text-muted small d-flex align-items-center gap-2">
      <i class="bi bi-clock"></i>
      <span>{{ formattedDate }}</span>
    </div>
    <h3 class="text-center mt-4">Связанный контент</h3>
    <div class="row row-cols-1 row-cols-md-3 g-4 mb-3 mt-2">

      <h5 v-if="item.tools?.length" class="text-primary">Инструменты</h5>
      <item-card
          v-if="item.tools?.length"
          v-for="tool in item.tools"
          :key="tool.id"
          :name="tool.name"
          :description="getDescription(tool)"
          :subdescription="getSubDescription(tool)"
          @click="goToItemPage('tools', tool.id)"
      />
      <h5 v-if="item.tool" class="text-primary">Инструмент</h5>
      <item-card
          v-if="item.tool"
          :key="item.tool.id"
          :name="item.tool.name"
          :description="getDescription(item.tool)"
          :subdescription="getSubDescription(item.tool)"
          @click="goToItemPage('tools', item.tool.id)"
      />
      <h5 v-if="item.cases?.length" class="text-primary">Бизнес кейсы</h5>
      <item-card
          v-if="item.cases?.length"
          v-for="tool in item.cases"
          :key="tool.id"
          :name="tool.name"
          :description="getDescription(tool)"
          :subdescription="getSubDescription(tool)"
          @click="goToItemPage('cases', tool.id)"
      />
      <h5 v-if="item.terms?.length" class="text-primary">Термины</h5>
      <item-card
          v-if="item.terms?.length"
          v-for="tool in item.terms"
          :key="tool.id"
          :name="tool.name"
          :description="getDescription(tool)"
          :subdescription="getSubDescription(tool)"
          @click="goToItemPage('terms', tool.id)"
      />
    </div>
  </div>
  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import router from "@/router/index.js";
import ItemCard from "@/components/ui/main/ItemCard.vue";

const store = useStore()
const route = useRoute()

const item = computed(() => store.getters.getItemById)
const itemName = ref();

const formattedDate = computed(() => {
  if (!item.value?.createAt) return ''
  const date = new Date(item.value.createAt)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

const goBack = () => {
  router.back();
};

const goToItemPage = (itemName, id) => {
  router.push({name: 'ItemPage', params: {itemName, id}})
}

const truncateText = (text) =>
    text?.length > 50 ? text.substring(0, 50) + '...' : text || ''

const getDescription = (item) => {
  return truncateText(item.definition)
}

const getSubDescription = (item) => {
  if (itemName.value === 'tools') return truncateText(item.purpose || item.note)
  if (itemName.value === 'terms') return truncateText(item.secondaryDefinition || item.note)
  return ''
}

onMounted(() => {
  itemName.value = route.params.itemName;
})

watch(
    () => [route.params.itemName, route.params.id],
    ([itemName, id]) => {
      store.dispatch('fetchItemById', {itemName, id})
    },
    {immediate: true}
)

const getImageUrl = (imageName) => `http://localhost:9000/images/${imageName}`;
</script>

<style scoped>
.carousel-inner img {
  height: 400px;
  object-fit: contain;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .carousel-inner img {
    height: 250px;
  }
}

</style>
