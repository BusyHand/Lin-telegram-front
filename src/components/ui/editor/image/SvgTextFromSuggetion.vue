<template>
  <div class="container py-2">
    <div class="search-container">
      <div class="search-wrapper">
        <div class="search-header">
          <div class="category-filters">
            <div class="filter-chips">
              <div
                  v-for="cat in categories"
                  :key="cat.value"
                  class="filter-chip"
                  :class="{ active: category === cat.value }"
                  @click="changeCategory(cat.value)"
              >
                <i :class="cat.icon"></i>{{ cat.label }}
              </div>
            </div>

            <div class="search-input-group pt-2">
              <input
                  type="text"
                  v-model="query"
                  class="search-input form-control"
                  placeholder="Поиск"
              />
              <a class="search-icon">
                <i class="bi bi-search"></i>
              </a>
            </div>
          </div>

          <div class="suggestions" v-if="Array.isArray(suggestions) && suggestions.length > 0">
            <Suggestion
                v-for="(card, index) in suggestions"
                :key="index"
                :title="card.name"
                @click="goToItemPage(card.name, card.definition)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watchEffect} from 'vue'
import {useStore} from 'vuex'
import Suggestion from '@/components/ui/navbar/Suggestion.vue'

const emit = defineEmits(["select-item"]);

const store = useStore()

const category = ref('terms')
const query = ref('')

const categories = [
  {label: "Термин", value: "terms", icon: "fas fa-globe"},
  {label: "Инструмент", value: "tools", icon: "fas fa-laptop"},
]

const suggestions = computed(() => store.getters.getSuggestions)

const fetchSuggestions = async () => {
  if (query.value.length >= 1) {
    await store.dispatch('fetchSuggestionsByCategory', {
      category: category.value,
      query: query.value
    })
  }
}

const changeCategory = (value) => {
  category.value = value
  fetchSuggestions()
}

const goToItemPage = (name, definition) => {
  emit('select-item', name, definition);
};

watchEffect(() => {
  fetchSuggestions()
})
</script>


<style scoped>
.search-wrapper {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.search-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}


.search-icon {
  position: absolute;
  right: 20px;
  color: #666;
}

.filter-chip {
  display: inline-block;
  padding: 8px 20px;
  margin: 2px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-chip:hover {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.filter-chip.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.filter-chip i {
  font-size: 0.9em;
}

.suggestions {
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

</style>
