<template>
  <div class="d-flex align-items-center">
    <select v-model="selectedItem" class="form-select" @change="emitSelection">
      <option
          v-for="(label, key) in items"
          :key="key"
          :value="key">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import {defineEmits, defineProps, ref, watch} from 'vue'

const props = defineProps({
  toggleItemsName: String,
  items: Object
})

const emit = defineEmits(['select-item'])

const selectedItem = ref(props.toggleItemsName)

watch(() => props.toggleItemsName, (newVal) => {
  selectedItem.value = newVal
})

const emitSelection = () => {
  emit('select-item', selectedItem.value)
}
</script>

<style scoped>
.btn {
  font-size: 18px;
}
</style>
