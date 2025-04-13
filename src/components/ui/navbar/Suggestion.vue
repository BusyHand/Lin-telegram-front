<template>
  <div class="suggestion-item">
    {{ title }} <span class="suggestion-category">#tag1 #tag2</span>
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
.suggestion-category {
  font-size: 0.8em;
  color: #666;
  margin-left: 5px;
}

.suggestion-item {
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.2s;
  border-radius: 20px;
}

.suggestion-item:hover {
  background: #007bff;
  color: #ffffff;
}
</style>