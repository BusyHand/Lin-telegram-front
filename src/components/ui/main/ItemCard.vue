<template>
  <div class="col">
    <div class="card shadow-lg border-0 rounded-4">
      <img v-if="imgSrc" :src="imgSrc" class="card-img-top rounded-top-4">
      <div class="card-body">
        <h5 class="card-title text-primary">{{ name }}</h5>
        <p class="card-text text-muted">
          {{ description }}
        </p>
        <a href="#" class="btn btn-primary w-100">Подробнее</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: false
  }
});
</script>

<style scoped>
.card {
  max-width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
