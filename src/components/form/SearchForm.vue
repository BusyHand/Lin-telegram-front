<template>
  <div class="container py-5">
    <div class="search-container">
      <div class="search-wrapper">
        <div class="search-header">
          <div class="category-filters">
            <div class="filter-chip active">
              <i class="fas fa-globe"></i>Term
            </div>
            <div class="filter-chip">
              <i class="fas fa-laptop"></i>Tool
            </div>
            <div class="filter-chip">
              <i class="fas fa-tshirt"></i>Case
            </div>
            <div class="search-input-group">
              <input type="text" class="search-input form-control" placeholder="Поиск"
                     list="list-timezone" id="input-datalist">
              <a class="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                     viewBox="0 0 16 16">
                  <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="suggestions">
            <div class="suggestion-item">
              SWOT-анализ <span class="suggestion-category">термин</span>
            </div>
            <div class="suggestion-item">
              Разработка бизнес-модели <span class="suggestion-category">кейс</span>
            </div>
            <div class="suggestion-item">
              BP FlowChart <span class="suggestion-category">инструмент</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
}

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

.search-input {
  border: 2px solid #eee;
  border-radius: 30px;
  padding: 15px 25px;
  padding-right: 50px;
  width: 100%;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: none;
}

.search-icon {
  position: absolute;
  right: 20px;
  color: #666;
}

.category-filters {
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 0 0 15px 15px;
}

.filter-chip {
  display: inline-block;
  padding: 8px 15px;
  margin: 5px;
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
  margin-right: 5px;
  font-size: 0.9em;
}

.quick-filters {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.quick-filter {
  padding: 5px 12px;
  background: #e9ecef;
  border-radius: 15px;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-filter:hover {
  background: #dee2e6;
}

.suggestions {
  margin-top: 10px;
  padding: 10px 0;
  border-top: 1px solid #eee;
}

.suggestion-item {
  padding: 8px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.suggestion-item:hover {
  background: #f8f9fa;
}

.suggestion-category {
  font-size: 0.8em;
  color: #666;
  margin-left: 5px;
}
</style>
<script setup lang="ts">
</script>