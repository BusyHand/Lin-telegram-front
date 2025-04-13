<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">{{ item?.name || "Загрузка..." }}</h1>

    <div v-if="item?.images?.length" id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, index) in item.images" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="image" class="d-block w-100" alt="Item Image">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
              data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-if="item?.definition" class="mt-4">
      <p class="text-muted">{{ item.definition }}</p>
    </div>
    <div v-else class="text-center mt-4">Загрузка данных...</div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const item = computed(() => store.getters.getItemById)

watch(
    () => [route.params.itemName, route.params.id],
    ([itemName, id]) => {
      store.dispatch('fetchItemById', { itemName, id })
    },
    { immediate: true }
)
</script>


<style scoped>
.carousel-inner img {
  height: 400px;
  object-fit: cover;
}
</style>
