<template>
  <a @click="openModal">
    <form class="d-flex me-2" role="search">
      <button type="button" class="search-button">
        Поиск
        <i class="bi bi-search mx-1"></i>
      </button>
    </form>
  </a>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
         data-bs-backdrop="static" role="dialog" aria-modal="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Поиск</h1>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <search-form @go-to-item="handleGoToItem"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {Modal} from 'bootstrap';
import SearchForm from '@/components/ui/navbar/SearchForm.vue';
import router from '@/router';

const modalRef = ref(null);
let modalInstance = null;

const openModal = () => modalInstance.show();
const closeModal = () => modalInstance.hide();

const handleGoToItem = (category, id) => {
  closeModal();
  router.push({name: 'ItemPage', params: {itemName: category, id}});
};

onMounted(() => {
  modalInstance = new Modal(modalRef.value);
});
</script>

<style scoped>
.search-button {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 8px 16px;
  border: 1px solid #ffffff;
  color: #ffffff;
  background-color: transparent;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  width: auto;
}

@media (max-width: 767.98px) {
  .search-button {
    width: 100%;
  }
}
</style>
