<template>
  <div class="d-flex align-items-center ">
    <select v-model="selectedSort.field" id="sortField" class="form-select" @change="emitSort">
      <option v-for="(label, key) in sortOptions" :key="key" :value="key">
        {{ label }}
      </option>
    </select>

    <button @click="toggleSortOrder" class="btn btn-primary btn-sm d-flex align-items-center">
      <i :class="sortIcon"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  sortOptions: Object,
  initialSort: Object,
});

const emit = defineEmits(["update-sort"]);

const selectedSort = ref({ ...props.initialSort });

watch(() => props.initialSort, (newSort) => {
  selectedSort.value = { ...newSort };
}, { deep: true });

const emitSort = () => {
  emit("update-sort", selectedSort.value);
};

const toggleSortOrder = () => {
  selectedSort.value.order = selectedSort.value.order === "asc" ? "desc" : "asc";
  emitSort();
};

const sortIcon = computed(() => {
  return selectedSort.value.order === "asc" ? "bi bi-sort-down-alt" : "bi bi-sort-up-alt";
});

</script>

<style scoped>
.btn {
  font-size: 18px;
}
</style>
