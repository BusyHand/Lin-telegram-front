<template>
  <button type="button" @click="openModal" class="btn btn-outline-success">
    <i class="bi bi-building-fill-add"></i>
  </button>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
         data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Привязать к компании</h1>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <assign-company-form
                :user="user"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {Modal} from 'bootstrap'
import AssignCompanyForm from "@/components/ui/admin/AssignCompanyForm.vue";

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
