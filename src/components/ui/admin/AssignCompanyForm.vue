<template>
  <form @submit.prevent="assign">

    <div class="d-flex gap-3 mt-3 justify-content-center">
      <pagination-component
          :total-pages="totalPages"
          :start-page="currentPage"
          @page-scroll="fetchPage"
      />
    </div>

    <div class="mb-3">
      <label for="companySelect" class="form-label">Выберите компанию</label>
      <select id="companySelect" class="form-select" v-model="selectedCompanyId" required>
        <option disabled value="">-- выберите компанию --</option>
        <option v-for="company in companies" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>

    <div class="d-flex justify-content-between align-items-center">
      <button type="submit" class="btn btn-success">Привязать</button>
      <span v-if="successMessageVisible" class="text-success">Успешно!</span>
    </div>

  </form>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import PaginationComponent from "@/components/ui/main/PaginationComponent.vue";

const props = defineProps({
  user: Object
})

const emit = defineEmits(['update'])

const store = useStore()

const companies = computed(() => store.getters.getItems)
const totalPages = ref(1)
const currentPage = ref(1)
const selectedCompanyId = ref('')
const successMessageVisible = ref(false)

const fetchPage = ({page}) => {
  currentPage.value = page
  store.dispatch('fetchItems', {
    page: page - 1,
    size: 10,
    sort: `name,desc`,
    itemName: 'companies'
  })
}

const assign = async () => {
  await store.dispatch('assignUserCompany', {
    userId: props.user.id,
    companyId: selectedCompanyId.value
  })

  emit('update', {id: props.user.id, companyId: selectedCompanyId.value})

  successMessageVisible.value = true
  setTimeout(() => {
    successMessageVisible.value = false
  }, 3000)
}

onMounted(() => {
  fetchPage({page: 1})
})
</script>
