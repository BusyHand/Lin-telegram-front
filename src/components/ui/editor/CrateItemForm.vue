<template>
  <form class="row g-3" @submit.prevent="handleSubmit">
    <div class="col-md-12">
      <label class="form-label">Тип</label>
      <div class="d-flex gap-2">
        <div v-for="(typeOption, index) in types" :key="index">
          <input
              type="radio"
              class="btn-check"
              name="type"
              :id="typeOption.id"
              :value="typeOption.value"
              v-model="type"
          />
          <label class="btn btn-outline-primary" :for="typeOption.id">
            {{ typeOption.label }}
          </label>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <label class="form-label">Название</label>
      <input type="text" class="form-control" v-model="name" required/>
    </div>

    <div class="col-md-12">
      <label class="form-label">{{ type === 'Кейс' ? 'Описание' : 'Определение' }}</label>
      <textarea class="form-control" v-model="definition" rows="3" required/>
    </div>

    <template v-if="type === 'Термин'">
      <div class="col-md-6">
        <label class="form-label">Доп. определение</label>
        <input type="text" class="form-control" v-model="secondaryDefinition"/>
      </div>

      <div class="col-md-6">
        <label class="form-label">Примечание</label>
        <input type="text" class="form-control" v-model="note"/>
      </div>

      <div class="col-md-12">
        <label class="form-label">Инструменты</label>
        <select class="form-select" v-model="selectedTool" @change="addSelected('tools')">
          <option selected disabled value="">Выберите...</option>
          <option v-for="tool in tools" :key="tool.id" :value="tool">{{ tool.name }}</option>
        </select>
        <div class="selected-items">
          <span v-for="(tool, index) in selectedTools" :key="'selected-tool-' + index" class="badge bg-primary me-2">
            {{ tool.name }}
            <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('tools', index)"/>
          </span>
        </div>
      </div>
    </template>

    <template v-if="type === 'Инструмент'">
      <div class="col-md-6">
        <label class="form-label">Примечание</label>
        <input type="text" class="form-control" v-model="note"/>
      </div>

      <div class="col-md-6">
        <label class="form-label">Назначение</label>
        <select class="form-control" v-model="purpose">
          <option value="Офис">Офис</option>
          <option value="Производство">Производство</option>
          <option value="Оба">Оба</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Термины</label>
        <select class="form-select" v-model="selectedTerm" @change="addSelected('terms')">
          <option selected disabled value="">Выберите...</option>
          <option v-for="term in terms" :key="term.id" :value="term">{{ term.name }}</option>
        </select>
        <div class="selected-items">
          <span v-for="(term, index) in selectedTerms" :key="'selected-term-' + index" class="badge bg-primary me-2">
            {{ term.name }}
            <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('terms', index)"/>
          </span>
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Кейсы</label>
        <select class="form-select" v-model="selectedCase" @change="addSelected('cases')">
          <option selected disabled value="">Выберите...</option>
          <option v-for="casee in cases" :key="casee.id" :value="casee">{{ casee.name }}</option>
        </select>
        <div class="selected-items">
          <span v-for="(casee, index) in selectedCases" :key="'selected-case-' + index" class="badge bg-primary me-2">
            {{ casee.name }}
            <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('cases', index)"/>
          </span>
        </div>
      </div>
    </template>

    <template v-if="type === 'Кейс'">
      <div class="col-md-12">
        <label class="form-label">Инструмент</label>
        <select class="form-select" v-model="selectedTool">
          <option selected disabled value="">Выберите...</option>
          <option v-for="tool in tools" :key="tool.id" :value="tool">{{ tool.name }}</option>
        </select>
      </div>
    </template>

    <div class="col-md-12">
      <label class="form-label">Изображения (до 3)</label>
      <input type="file" multiple accept="image/*" class="form-control" @change="handleFileChange"/>
    </div>

    <div class="col-md-12" v-if="images.length">
      <h5>Добавленные изображения:</h5>
      <div class="d-flex flex-wrap">
        <div v-for="(image, index) in images" :key="index" class="position-relative mx-2 m-3">
          <img :src="image.url" alt="preview" class="img-thumbnail"
               style="width: 100px; height: 100px; object-fit: cover;"/>
          <i class="text-danger hover position-absolute top-0 start-100 translate-middle z-3 bi bi-x-circle"
             @click="removeImage(index)"></i>
        </div>
      </div>
    </div>

    <div v-if="successMessageVisible" class="alert alert-success fade-in">
      Успешно отправлено!
    </div>
    <div v-else class="col-12">
      <button class="btn btn-primary w-100" type="submit">Отправить</button>
    </div>
  </form>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const type = ref('Термин')
const name = ref('')
const definition = ref('')
const secondaryDefinition = ref('')
const note = ref('')
const purpose = ref('')

const selectedTool = ref('')
const selectedTerm = ref('')
const selectedCase = ref('')

const selectedTools = ref([])
const selectedTerms = ref([])
const selectedCases = ref([])

const terms = computed(() => store.getters.getAllTerms)
const tools = computed(() => store.getters.getAllTools)
const cases = computed(() => store.getters.getAllCases)

const images = ref([])
const isUploading = ref(false)

const successMessageVisible = ref(false)

const types = [
  {id: 'term', value: 'Термин', label: 'Термин'},
  {id: 'tool', value: 'Инструмент', label: 'Инструмент'},
  {id: 'case', value: 'Кейс', label: 'Кейс'}
]

const clearSelect = (what) => {
  if (what === 'terms') selectedTerm.value = ''
  if (what === 'tools') selectedTool.value = ''
  if (what === 'cases') selectedCase.value = ''
}

const addSelected = (what) => {
  if (what === 'terms' && selectedTerm.value && !selectedTerms.value.find(i => i.id === selectedTerm.value.id)) {
    selectedTerms.value.push(selectedTerm.value)
  }
  if (what === 'tools' && selectedTool.value && !selectedTools.value.find(i => i.id === selectedTool.value.id)) {
    selectedTools.value.push(selectedTool.value)
  }
  if (what === 'cases' && selectedCase.value && !selectedCases.value.find(i => i.id === selectedCase.value.id)) {
    selectedCases.value.push(selectedCase.value)
  }
  clearSelect(what)
}

const removeSelected = (what, index) => {
  if (what === 'terms') selectedTerms.value.splice(index, 1)
  if (what === 'tools') selectedTools.value.splice(index, 1)
  if (what === 'cases') selectedCases.value.splice(index, 1)
}

const handleSubmit = async () => {

  const imagesDtos = images.value.map(image => ({name: image.name}))

  if (!name.value.trim() || !definition.value.trim()) return

  let payload = {
    name: name.value,
    definition: definition.value,
    note: note.value,
    purpose: purpose.value,
    images: imagesDtos,
    terms: selectedTerms.value.map(term => ({id: term.id})),
    cases: selectedCases.value.map(casee => ({id: casee.id})),
    tools: selectedTools.value.map(tool => ({id: tool.id})),
  }

  if (type.value === 'Термин') {
    console.log("termin")
    await store.dispatch('createTerm', payload)
  } else if (type.value === 'Инструмент') {
    console.log("tool")
    await store.dispatch('createTool', payload)
  } else {
    if (!selectedTool.value) return
    await store.dispatch('createCase', {
      name: name.value,
      description: definition.value,
      images: imagesDtos,
      tool: {id: selectedTool.value.id}
    })
  }

  name.value = ''
  definition.value = ''
  note.value = ''
  purpose.value = ''
  selectedTool.value = ''
  selectedTerms.value = []
  selectedTools.value = []
  selectedCases.value = []
  images.value = [];

  successMessageVisible.value = true

  setTimeout(() => {
    successMessageVisible.value = false
  }, 3000)
}

const handleFileChange = async (e) => {
  const files = Array.from(e.target.files).slice(0, 3)
  if (files.length === 0) return

  isUploading.value = true
  try {
    const uploadedImages = []
    for (const file of files) {
      const image = await store.dispatch('uploadImage', file)
      uploadedImages.push({name: image.name, url: URL.createObjectURL(file)})
    }
    images.value = uploadedImages
  } catch (e) {
    console.error('Ошибка при загрузке изображений', e)
    alert('Не удалось загрузить изображения')
  } finally {
    isUploading.value = false
  }
}

const removeImage = (index) => {
  store.dispatch('deleteImage', images.value[index].name)
  images.value.splice(index, 1)
}


onMounted(() => {
  store.dispatch('fetchAllTerms')
  store.dispatch('fetchAllTools')
  store.dispatch('fetchAllCases')
})
</script>

<style scoped>

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.translate-middle {
  transform: translate(-50%, -50%);
}

.alert {
  padding: 10px;
  margin-top: 10px;
  font-size: 16px;
}

.fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.selected-items {
  margin-top: 10px;
}

.badge {
  margin: 3px;
  padding: 8px 12px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.btn-close {
  font-size: 10px;
  margin-left: 8px;
  cursor: pointer;
}
</style>
