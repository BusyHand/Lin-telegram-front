<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">{{ item.title }}</h1>

    <div v-if="item.images && item.images.length > 0" id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(image, index) in item.images" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="image" class="d-block w-100" alt="Item Image">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="mt-4">
      <p class="text-muted">{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      item: {}
    };
  },
  computed: {
    ...mapGetters(['getItemById'])
  },
  created() {
    const id = this.$route.params.id;
    this.item = this.getItemById(id);
  }
};
</script>

<style scoped>
.carousel-inner img {
  height: 400px;
  object-fit: cover;
}
</style>
