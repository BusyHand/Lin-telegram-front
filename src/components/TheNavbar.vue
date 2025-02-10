<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/src/icons/logo.png" alt="" width="60" height="60" class="d-inline-block">
        <span class="navbar-brand mb-0 h1">ЛИН-лаборатория</span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" aria-current="page">О нас</router-link>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <admin-modal/>
        <search-modal/>
      </div>
    </div>
  </nav>

</template>


<script>
import AdminModal from "@/components/ui/navbar/AdminModal.vue"
import SearchModal from "@/components/ui/navbar/SearchModal.vue";

export default {
  setup() {
  },
  components: {SearchModal, AdminModal}

}
</script>