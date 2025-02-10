<template>
  <form class="row g-3">
    <div class="col-md-12">
      <label for="title" class="form-label">Название</label>
      <input type="text" class="form-control" id="title" v-model="title" required>
    </div>

    <div class="col-md-12">
      <label class="form-label">Тип</label>
      <div class="d-flex gap-2">
        <input type="radio" class="btn-check" name="type" id="term" value="Термин" v-model="type">
        <label class="btn btn-outline-primary" for="term">Термин</label>

        <input type="radio" class="btn-check" name="type" id="case" value="Кейс" v-model="type">
        <label class="btn btn-outline-primary" for="case">Кейс</label>

        <input type="radio" class="btn-check" name="type" id="tool" value="Инструмент" v-model="type">
        <label class="btn btn-outline-primary" for="tool">Инструмент</label>
      </div>
    </div>

    <div class="col-md-12">
      <label for="description" class="form-label">Описание</label>
      <textarea class="form-control" id="description" v-model="description" rows="3" required></textarea>
    </div>

    <div class="col-md-6">
      <label for="category" class="form-label">Категория</label>
      <select class="form-select" id="category" v-model="category" required>
        <option selected disabled value="">Выберите...</option>
        <option value="category1">Категория 1</option>
        <option value="category2">Категория 2</option>
        <option value="category3">Категория 3</option>
      </select>
    </div>

    <div class="col-12">
      <button class="btn btn-primary" type="submit">Отправить</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      type: "",
      description: "",
      category: ""
    };
  }
};
</script>

<style scoped>
.btn-check + .btn {
  border-radius: 8px;
}
</style>
