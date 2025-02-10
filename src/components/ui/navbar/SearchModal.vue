<template>
  <a class="" @click="openModal">
    <form class="d-flex me-2" role="search" @click="openModal">
      <a class="btn btn-outline-light">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
             viewBox="0 0 16 16">
          <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
      </a>
    </form>
  </a>

  <teleport to="body">
    <div class="modal fade" ref="modalRef" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true"
         data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Поиск</h1>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <search-form/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {onMounted, ref} from "vue";
import {Modal} from "bootstrap";
import SearchForm from "@/components/form/SearchForm.vue";

export default {
  components: {SearchForm},

  setup() {
    const modalRef = ref(null);
    let modalInstance = null;

    onMounted(() => {
      modalInstance = new Modal(modalRef.value);
    });

    const openModal = () => modalInstance.show();
    const closeModal = () => modalInstance.hide();

    return {modalRef, openModal, closeModal};
  }
};
</script>
