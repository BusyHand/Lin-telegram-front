<template>
  <div class="suggestion-item">
    {{ title }}
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.suggestion-item {
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover {
  border-radius: 20px;
  background: #007bff;
  color: #ffffff;
}
</style>