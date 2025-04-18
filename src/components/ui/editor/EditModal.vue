<template>
  <button type="button" class="custom-btn custom-btn-sm custom-btn-outline-primary mx-2" @click="openModal">
    <i class="bi bi-pencil-square">
    </i>
  </button>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true"
         data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editModalLabel">Редактирование</h1>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <edit-item-form
                :item="item"
                :type="type"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Modal} from 'bootstrap'
import EditItemForm from "@/components/ui/editor/EditItemForm.vue";

const props = defineProps({
  item: Object,
  type: String,
})

const modalRef = ref(null)
let modalInstance = null

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
})

const openModal = () => modalInstance.show()
const closeModal = () => modalInstance.hide()
</script>

<style scoped>
body {
  font-family: 'Lato', sans-serif;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}

.custom-col-actions button {
  transition: background-color 0.3s, color 0.3s;
}

.custom-col-actions button:hover {
  background-color: #3498db;
  color: white;
}

.custom-btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.custom-btn-sm {
  font-size: 12px;
}

.custom-btn-outline-primary {
  border: 1px solid #3498db;
  color: #3498db;
  background-color: transparent;
}

.custom-btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

@media all and (max-width: 767px) {
  .custom-col-actions button {
    width: 45%;
    font-size: 14px;
    padding: 8px;
  }
}
</style>
