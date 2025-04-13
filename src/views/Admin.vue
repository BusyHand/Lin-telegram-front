<template>
  <div class="p-4 space-y-8">
    <div class="d-flex justify-content-center mb-4">
      <create-modal custom-class="w-100"/>
    </div>

    <div class="d-flex gap-3 mt-3 justify-content-center">
      <item-toggle
          :toggle-items-name="entityType.name"
          :items="entityMap"
          @select-item="updateEntity"
      />
      <sort-component
          :sort-options="sortOptions"
          :initial-sort="sort"
          @update-sort="updateSort"
      />
    </div>

    <div class="d-flex gap-3 mt-3 justify-content-center">
      <pagination-component
          :total-pages="totalPages"
          :start-page="currentPage"
          @page-scroll="fetchPage"
      />
    </div>

    <user-table
        v-if="entityType.name === 'users'"
        title="Пользователи"
        :headers="['ID', 'Username', 'Имя', 'Фамилия', 'Компания', 'Роли', 'Chat ID', 'Создан']"
        :keys="['id', 'username', 'firstName', 'lastName', 'companyName', 'rolesString', 'chatId', 'createAtFormatted']"
        :data="users"
        @delete="deleteUser"
        @go-to-page="(entry) => $router.push({ name: 'UserDetails', params: { id: entry.id } })"
    />
    <company-table
        v-else
        title="Компании"
        :data="companies"
        :headers="['Название', 'Описание', 'Создана', 'Обновлена', 'Пользователи', 'Цвет 1', 'Цвет 2']"
        :keys="['name', 'description', 'createAtFormatted', 'updateAtFormatted', 'usersCount', 'primaryColor', 'secondaryColor']"
        @go-to-page="goToEntityPage"
        @delete="handleDelete"
    />

  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'
import {createRouter as $router, useRouter} from 'vue-router'

import SortComponent from '@/components/ui/main/SortComponent.vue'
import ItemToggle from '@/components/ui/main/ItemToggle.vue'
import PaginationComponent from '@/components/ui/main/PaginationComponent.vue'
import CreateModal from '@/components/ui/editor/CreateModal.vue'
import UserTable from '@/components/ui/admin/UserTable.vue'
import CompanyTable from '@/components/ui/admin/CompanyTable.vue'

const store = useStore()
const router = useRouter()

const totalPages = computed(() => store.getters.getTotalItemPages)
const entityData = computed(() => store.getters.getItems)

const entityMap = {
  users: 'Пользователи',
  companies: 'Компании'
}

const entityType = ref({
  name: 'users',
  desc: 'Пользователи'
})

const currentPage = ref(1)

const sortOptions = {
  id: 'ID',
  name: 'Имя',
  email: 'Email',
  createdAt: 'Дата создания'
}

const sort = ref({
  field: 'id',
  order: 'desc'
})

const updateSort = (newSort) => {
  sort.value = newSort
  fetchPage({page: currentPage.value})
}

const updateEntity = (newKey) => {
  if (entityMap[newKey]) {
    entityType.value = {
      name: newKey,
      desc: entityMap[newKey]
    }
    fetchPage({page: currentPage.value})
  }
}

const fetchPage = ({page}) => {
  currentPage.value = page
  store.dispatch('fetchItems', {
    page: page - 1,
    size: 10,
    sort: `${sort.value.field},${sort.value.order}`,
    itemName: entityType.value.name
  })
}

const goToEntityPage = (itemName, id) => {
  router.push({name: 'ItemPage', params: {itemName, id}})
}

const handleDelete = (id) => {
  store.dispatch('deleteItem', {
    itemName: entityType.value.name,
    id
  }).then(() => {
    fetchPage({page: currentPage.value})
  })
}

onMounted(() => {
  fetchPage({page: currentPage.value})
})

const deleteUser = (id) => {
  store.dispatch('deleteItem', {itemName: 'users', id})
}

const blockUser = (id) => {
  store.dispatch('blockUser', id)
}

const detachCompany = (id) => {
  store.dispatch('detachUserFromCompany', id)
}

const assignCompany = (id) => {
  store.dispatch('openCompanyAssignModal', id)
}
const rawItems = computed(() => store.getters.getItems)

const users = computed(() =>
    entityType.value.name === 'users'
        ? rawItems.value.map(u => ({
          id: u.id,
          username: u.username,
          firstName: u.first_name,
          lastName: u.last_name,
          companyName: u.company?.name ?? '—',
          rolesString: Array.isArray(u.roles) ? u.roles.join(', ') : '—',
          chatId: u.chatId,
          createAtFormatted: new Date(u.createAt).toLocaleString()
        }))
        : []
)

const companies = computed(() =>
    entityType.value.name === 'companies'
        ? rawItems.value.map(c => ({
          id: c.id,
          name: c.name,
          description: c.description ?? '—',
          createAtFormatted: new Date(c.createAt).toLocaleString(),
          updateAtFormatted: new Date(c.updateAt).toLocaleString(),
          usersCount: c.users?.length ?? 0,
          primaryColor: c.companyColor?.primaryColor ?? '—',
          secondaryColor: c.companyColor?.secondaryColor ?? '—'
        }))
        : []
)

</script>
