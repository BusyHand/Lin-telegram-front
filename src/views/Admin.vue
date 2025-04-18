<template>
  <div class="p-4 space-y-8">
    <div v-if="entityType.name === 'companies'" class="d-flex justify-content-center mb-4">
      <create-company-modal/>
    </div>

    <div class="d-flex gap-3 mt-3 justify-content-center">
      <item-toggle
          :toggle-items-name="entityType.name"
          :items="entityMap"
          @select-item="updateEntity"
      />
      <sort-component
          v-if="entityType.name === 'users'"
          :sort-options="sortUserOptions"
          :initial-sort="sort"
          @update-sort="updateSort"
      />
      <sort-component
          v-else
          :sort-options="sortCompanyOptions"
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
        :headers="['ID', 'Telegram Id','Username', 'Компания','Роли','Заблокирован',  'Создан']"
        :keys="['id', 'telegramId','username', 'companyName' ,'rolesString','block',  'createAtFormatted']"
        :data="users"
        @delete="deleteUser"
        @block="blockUser"
        @unblock="unblockUser"
        @detach-company="detachCompany"
    />
    <company-table
        v-else
        title="Компании"
        :data="companies"
        :headers="['Название', 'Описание', 'Создана', 'Обновлена', 'Пользователи', 'Цвет 1', 'Цвет 2']"
        :keys="['name', 'description', 'createAtFormatted', 'updateAtFormatted', 'usersCount', 'primaryColor', 'secondaryColor']"
        @delete="handleDelete"

    />

  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'

import SortComponent from '@/components/ui/main/SortComponent.vue'
import ItemToggle from '@/components/ui/main/ItemToggle.vue'
import PaginationComponent from '@/components/ui/main/PaginationComponent.vue'
import UserTable from '@/components/ui/admin/UserTable.vue'
import CompanyTable from '@/components/ui/admin/CompanyTable.vue'
import CreateCompanyModal from "@/components/ui/admin/CreateCompanyModal.vue";

const store = useStore()
const router = useRouter()
const route = useRoute()

const detachCompany = (userid, companyId) => {
  store.dispatch('detachUserFromCompany', {userId: userid, companyId: companyId})
}

const blockUser = (userid) => {
  store.dispatch('blockUser', userid)
}

const unblockUser = (userid) => {
  store.dispatch('unblock', userid)
}

const totalPages = computed(() => store.getters.getTotalItemPages)
const rawItems = computed(() => store.getters.getItems)

const entityMap = {
  users: 'Пользователи',
  companies: 'Компании'
}

const entityType = ref({
  name: 'users',
  desc: 'Пользователи'
})

const currentPage = ref(1)

const sortUserOptions = {
  id: 'ID',
  username: 'Имя',
  createdAt: 'Дата создания'
}

const sortCompanyOptions = {
  id: 'ID',
  name: 'Имя',
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

const updateEntity = async (newKey) => {
  if (entityMap[newKey]) {
    entityType.value = {
      name: newKey,
      desc: entityMap[newKey]
    }

    if (newKey === 'users') {
      sort.value = {
        field: Object.keys(sortUserOptions)[0],
        order: 'desc'
      }
    } else {
      sort.value = {
        field: Object.keys(sortCompanyOptions)[0],
        order: 'desc'
      }
    }

    currentPage.value = 1
    await fetchPage({page: 1})
  }
}


const fetchPage = ({page}) => {
  console.log("3", entityType.value.name)
  currentPage.value = page
  return store.dispatch('fetchItems', {
    page: page - 1,
    size: 10,
    sort: `${sort.value.field},${sort.value.order}`,
    itemName: entityType.value.name
  })
}

const handleDelete = (id) => {
  store.dispatch('deleteItem', {
    itemName: entityType.value.name,
    id
  }).then(() => {
    fetchPage({page: currentPage.value})
  })
}

const deleteUser = (id) => {
  store.dispatch('deleteItem', {itemName: 'users', id})
}

const users = computed(() =>
    entityType.value.name === 'users'
        ? rawItems.value.map(u => ({
          id: u.id,
          telegramId: u.telegramId,
          username: u.username,
          firstName: u.first_name,
          lastName: u.last_name,
          companyName: u.company?.name ?? null,
          companyId: u.company?.id ?? null,
          block: u.block,
          rolesString: Array.isArray(u.roles) ? u.roles.join(', ') : '—',
          roles: u.roles,
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

onMounted(() => {
  const routeItem = route.query.item
  const routeSort = route.query.sort
  const routeOrder = route.query.order
  const routePage = parseInt(route.query.page || '1')

  if (routeItem && entityMap[routeItem]) {
    entityType.value = {
      name: routeItem,
      desc: entityMap[routeItem]
    }
  }

  if (routeSort && sortUserOptions[routeSort]) {
    sort.value.field = routeSort
  }

  if (routeOrder === 'asc' || routeOrder === 'desc') {
    sort.value.order = routeOrder
  }

  if (!isNaN(routePage)) {
    currentPage.value = routePage
  }

  fetchPage({page: currentPage.value})
})

watch(
    () => [entityType.value.name, sort.value.field, sort.value.order, currentPage.value],
    () => {
      router.replace({
        query: {
          item: entityType.value.name,
          sort: sort.value.field,
          order: sort.value.order,
          page: currentPage.value
        }
      })
    }
)

</script>

