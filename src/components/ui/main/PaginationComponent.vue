<template>
  <ul class="pagination m-3">
    <li v-for="page in pages"
        :key="page" class="page-item"
        @click="changePage(page)">
      <a v-if="page === startPage" class="page-link active">{{ page }}</a>
      <a v-else class="page-link">{{ page }}</a>
    </li>
  </ul>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  startPage: Number,
  totalPages: Number,
});

const emit = defineEmits(["page-scroll"]);

const pages = computed(() => {
  let totalPages = props.totalPages;
  let startPages = props.startPage;
  if (totalPages < startPages) {
    startPages = totalPages
  }
  if (totalPages <= 3) {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  let result = [];

  if (startPages > 2) {
    result.push(1, "...");
  }

  let start = Math.max(1, startPages - 1);
  let end = Math.min(totalPages, startPages + 1);

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  if (totalPages - startPages > 2) {
    result.push("...", totalPages);
  }

  return result;
});

const changePage = (page) => {
  if (page !== "...") {
    emit("page-scroll", {page, itemPaged: props.itemPaged});
  }
};
</script>
