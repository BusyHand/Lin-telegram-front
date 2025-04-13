<template>
  <button type="button" :class="['btn btn-primary', customClass]" @click="openModal">
    Создать
  </button>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
         data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Создание</h1>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <crate-item-form/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Закрыть</button>
            <button type="button" class="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import CrateItemForm from '@/components/ui/editor/CrateItemForm.vue'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const modalRef = ref(null)
let modalInstance = null

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
})

const openModal = () => modalInstance.show()
const closeModal = () => modalInstance.hide()
</script>
