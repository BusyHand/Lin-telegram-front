<template>
  <div class="custom-container">
    <h2>{{ title }}</h2>
    <ul class="custom-responsive-table">
      <li class="custom-table-header">
        <div v-for="(header, index) in headers" :key="index" class="custom-col" :class="`custom-col-${index + 1}`">
          {{ header }}
        </div>
        <div class="custom-col custom-col-actions">Действия</div>
      </li>

      <li v-for="entry in data" :key="entry.id" class="custom-table-row" @click="goToPage(entry)">
        <div
            v-for="(key, index) in keys"
            :key="key"
            class="custom-col"
            :class="`custom-col-${index + 1}`"
            :data-label="headers[index]">
          {{ truncateText(entry[key]) }}
        </div>
        <div class="custom-col custom-col-actions" data-label="Действия" @click.stop>
          <button v-if="!entry.isBlock" @click.stop="generateInviteLink(entry.id)" class="btn btn-outline-success">
            <i class="bi bi-qr-code">
            </i>
          </button>
          <button class="btn btn-outline-danger" @click.stop="remove(entry.id)">
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </li>
    </ul>
    <InviteLinkModal
        :visible="showModal"
        :linkData="inviteLinkData"
        @close="showModal = false"
    />
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import store from "@/store/store.js";
import InviteLinkModal from "@/components/ui/admin/InviteLinkModal.vue";

const props = defineProps({
  title: String,
  headers: Array,
  keys: Array,
  data: Array
})

const showModal = ref(false)
const inviteLinkData = ref({link: '', qrName: ''})

const generateInviteLink = async (companyId) => {
  const data = await store.dispatch('generateInviteLink', companyId)
  inviteLinkData.value = data
  console.log("inviteLinkData", inviteLinkData.value)
  showModal.value = true
}

const truncateText = (text) =>
    text?.length > 100 ? text.substring(0, 100) + '...' : text || ''

const emit = defineEmits(['delete'])

const remove = (id) => emit('delete', id)
</script>

<style scoped>
body {
  font-family: 'Lato', sans-serif;
}

.custom-container {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}

.custom-responsive-table {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем таблицу */
  width: 100%;
}

.custom-table-header {
  background-color: #2C3E50;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: white;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.custom-table-row {
  border-radius: 5px;
  padding: 20px 25px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 960px; /* Ограничиваем максимальную ширину */
  cursor: pointer;
}

.custom-table-row:hover {
  background-color: #ecf0f1;
  transform: scale(1.02);
}

.custom-col {
  flex-basis: 25%;
  padding: 10px;
}

.custom-col-actions {
  flex-basis: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.custom-col-actions button {
  transition: background-color 0.3s, color 0.3s;
}

.custom-col-actions button:hover {
  background-color: #3498db;
  color: white;
}

.custom-btn {
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.custom-btn-sm {
  font-size: 12px;
}

.custom-btn-outline-danger {
  border: 1px solid #e74c3c;
  color: #e74c3c;
  background-color: transparent;
}

.custom-btn-outline-danger:hover {
  background-color: #e74c3c;
  color: white;
}

@media all and (max-width: 767px) {
  .custom-responsive-table .custom-table-header {
    display: none;
  }

  .custom-responsive-table .custom-table-row {
    display: block;
    margin-bottom: 15px;
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }

  .custom-col {
    display: block;
    padding: 8px 0;
    flex-basis: 100%;
  }

  .custom-col::before {
    color: #6C7A89;
    padding-right: 10px;
    content: attr(data-label);
    font-weight: bold;
    text-align: left;
    display: inline-block;
    margin-bottom: 8px;
  }

  .custom-col-actions {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .custom-col-actions button {
    width: 45%;
    font-size: 14px;
    padding: 8px;
  }
}

@media all and (min-width: 768px) {
  .custom-col-actions {
    justify-content: flex-end;
  }
}
</style>
