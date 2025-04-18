<template>
  <div class="col">
    <div class="card shadow-lg border-0 rounded-4 h-100" @click="$emit('click')">
      <img v-if="imgSrc" :src="imgSrc" class="card-img-top rounded-top-4">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-primary">{{ name }}</h5>
        <p class="card-text text-muted mb-1">{{ description }}</p>
        <p v-if="subdescription" class="card-text text-muted small">{{ subdescription }}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center mt-3" v-if="createdAt">
          <small class="text-muted d-flex align-items-center gap-1">
            <i class="bi bi-clock"></i> {{ formattedDate }}
          </small>
        </div>
        <a href="#" class="btn btn-primary mt-3">Подробнее</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  name: String,
  description: String,
  subdescription: String,
  imgSrc: String,
  createdAt: String
})

const formattedDate = computed(() => {
  if (!props.createdAt) return ''
  const date = new Date(props.createdAt)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
})
</script>

<style scoped>
.card {
  max-width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
