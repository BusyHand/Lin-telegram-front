<template>
  <div class="col">
    <div class="card shadow-lg border-0 rounded-4">
      <img :src="imgSrc" class="card-img-top rounded-top-4" :alt="title">
      <div class="card-body">
        <h5 class="card-title text-primary">{{ title }}</h5>
        <p class="card-text text-muted">
          {{ description }}
        </p>
        <a href="#" class="btn btn-primary w-100">Подробнее</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  }
}
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
