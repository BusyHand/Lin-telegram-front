<template>
  <form @submit.prevent="createCompany" class="mb-4">
    <div class="mb-3">
      <label class="form-label">Название компании</label>
      <input v-model="form.name" type="text" class="form-control" placeholder="Введите название" />
    </div>

    <div class="mb-3">
      <label class="form-label">Описание</label>
      <textarea v-model="form.desc" class="form-control" placeholder="Введите описание"></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Primary Color</label>
      <input v-model="form.companyColor.primaryColor" type="text" class="form-control" placeholder="Primary Color" />
    </div>

    <div class="mb-3">
      <label class="form-label">Secondary Color</label>
      <input v-model="form.companyColor.secondaryColor" type="text" class="form-control" placeholder="Secondary Color" />
    </div>

    <div class="mb-3">
      <label class="form-label">Tertiary Color (необязательно)</label>
      <input v-model="form.companyColor.tertiaryColor" type="text" class="form-control" placeholder="Tertiary Color" />
    </div>

    <div v-if="successMessageVisible" class="alert alert-success fade-in">
      Успешно отправлено!
    </div>
    <div v-else class="col-12">
      <button class="btn btn-primary w-100" type="submit">Создать компанию</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const successMessageVisible = ref(false)

const form = reactive({
  name: '',
  description: '',
  companyColor: {
    primaryColor: '',
    secondaryColor: '',
    tertiaryColor: ''
  }
})

const createCompany = async () => {
  await store.dispatch('createCompany', form)
  successMessageVisible.value = true
  setTimeout(() => {
    successMessageVisible.value = false
  }, 3000)
}
</script>
