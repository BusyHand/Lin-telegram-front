<template>
  <button class="btn btn-outline-secondary" type="button" @click="openModal">
    <i class="bi bi-gear-fill">
    </i>
  </button>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
         data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Управление ролями</h1>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <role-set-form
                :user="user"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Modal} from 'bootstrap'
import RoleSetForm from "@/components/ui/admin/RoleSetForm.vue";

const props = defineProps({
  user: Object
})

const modalRef = ref(null)
let modalInstance = null

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
})

const openModal = () => modalInstance.show()
const closeModal = () => modalInstance.hide()
</script>
