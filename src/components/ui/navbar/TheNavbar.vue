<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="/src/icons/logo.png" alt="" width="60" height="60" class="d-inline-block">
        <router-link to="/" class="navbar-brand mb-0 h1" aria-current="page">ЛИН-лаборатория</router-link>
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
            <router-link to="/editor/image" class="nav-link" aria-current="page">Редактор изображения</router-link>
          </li>
          <li class="nav-item" v-if="isEditor">
            <router-link to="/editor" class="nav-link">Редактор контента</router-link>
          </li>
          <li class="nav-item" v-if="isManager">
            <router-link to="/admin" class="nav-link">Администраторская</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" aria-current="page">О нас</router-link>
          </li>
        </ul>
      </div>
      <div class="search">
        <search-modal id="navbarNavDropdown"/>
      </div>
    </div>
  </nav>

</template>


<script setup>
import SearchModal from "@/components/ui/navbar/SearchModal.vue";
import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore();

const isEditor = computed(() => store.getters.hasAnyRole('ADMIN', 'EDITOR'));
const isManager = computed(() => store.getters.hasAnyRole('ADMIN', 'MANGER'));

</script>


<style scoped>
@media (max-width: 767.98px) {
  .search {
    width: 100%;
  }
}

.dropdown-menu .dropdown-item {
  color: #fff;
}

.dropdown-menu .dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

</style>