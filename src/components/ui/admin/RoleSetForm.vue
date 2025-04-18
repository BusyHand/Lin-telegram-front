<template>
  <form class="row g-3" @submit.prevent="handleSubmit">
    <div class="col-12">
      <label class="form-label">Роли пользователя</label>
      <div class="form-check" v-for="role in allRoles" :key="role">
        <input
            class="form-check-input"
            type="checkbox"
            :id="role"
            :value="role"
            v-model="selectedRoles"
        />
        <label class="form-check-label" :for="role">{{ role }}</label>
      </div>
    </div>

    <div class="col-12">
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </div>

    <div v-if="successMessageVisible" class="alert alert-success mt-3" role="alert">
      Роли успешно обновлены!
    </div>
  </form>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

const props = defineProps({
  user: Object
})

const emit = defineEmits(['update'])

const store = useStore()

const allRoles = ['EMPLOYEE', 'MANAGER', 'ADMIN', 'EDITOR']

const selectedRoles = ref([])
const successMessageVisible = ref(false)

const handleSubmit = async () => {
  await store.dispatch('updateUserRoles', {
    userId: props.user.id,
    roles: selectedRoles.value
  })

  emit('update', {id: props.user.id, roles: selectedRoles.value})

  successMessageVisible.value = true

  setTimeout(() => {
    successMessageVisible.value = false
  }, 3000)
}

onMounted(() => {
  selectedRoles.value = Array.isArray(props.user.roles) ? [...props.user.roles] : []
})

</script>
