<template>
  <form class="row g-3">
    <div class="col-md-12">
      <label class="form-label">Тип</label>
      <div class="d-flex gap-2">
        <div v-for="(typeOption, index) in types" :key="index">
          <input
              type="radio"
              class="btn-check"
              :name="typeOption.name"
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
      <label for="title" class="form-label">Название</label>
      <input type="text" class="form-control" id="title" v-model="name" required/>
    </div>

    <div class="col-md-12">
      <label for="definition" class="form-label">Описание</label>
      <textarea class="form-control" id="definition" v-model="definition" rows="3" required></textarea>
    </div>

    <div class="col-md-6" v-if="type === 'Инструмент'">
      <label class="form-label">Термины</label>
      <select class="form-select" v-model="selectedTerm" @change="addSelected('terms')">
        <option selected disabled value="">Выберите...</option>
        <option v-for="(term, index) in terms" :key="index" :value="term">{{ term.name }}</option>
      </select>
      <div class="selected-items">
        <span v-for="(term, index) in selectedTerms" :key="'selected-term-' + index" class="badge bg-primary me-2">
          {{ term.name }}
          <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('terms', index)"></button>
        </span>
      </div>

      <label class="form-label mt-3">Кейсы</label>
      <select class="form-select" v-model="selectedCase" @change="addSelected('cases')">
        <option selected disabled value="">Выберите...</option>
        <option v-for="(casee, index) in cases" :key="index" :value="casee">{{ casee.name }}</option>
      </select>
      <div class="selected-items">
        <span v-for="(casee, index) in selectedCases" :key="'selected-case-' + index" class="badge bg-primary me-2">
          {{ casee.name }}
          <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('cases', index)"></button>
        </span>
      </div>
    </div>

    <div class="col-md-6" v-if="type === 'Термин'">
      <label class="form-label">Инструменты</label>
      <select class="form-select" v-model="selectedTool" @change="addSelected('tools')">
        <option selected disabled value="">Выберите...</option>
        <option v-for="(tool, index) in tools" :key="index" :value="tool">{{ tool.name }}</option>
      </select>
      <div class="selected-items">
        <span v-for="(tool, index) in selectedTools" :key="'selected-tool-' + index" class="badge bg-primary me-2">
          {{ tool.name }}
          <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('tools', index)"></button>
        </span>
      </div>
    </div>

    <div class="col-md-6" v-if="type === 'Кейс'">
      <label class="form-label">Инструменты</label>
      <select class="form-select" v-model="selectedTool" @change="addSelected('tools')">
        <option selected disabled value="">Выберите...</option>
        <option v-for="(tool, index) in tools" :key="index" :value="tool">{{ tool.name }}</option>
      </select>
      <div class="selected-items">
        <span v-for="(tool, index) in selectedTools" :key="'selected-tool-case-' + index" class="badge bg-primary me-2">
          {{ tool.name }}
          <button type="button" class="btn-close btn-close-white ms-2" @click="removeSelected('tools', index)"></button>
        </span>
      </div>

      <input type="file" class="form-control mb-3" required/>
      <button type="submit" class="btn btn-primary w-100">Загрузить</button>
    </div>

    <div class="col-12">
      <button
          class="btn btn-primary"
          type="button"
          @click="handleSubmit  ">Отправить
      </button>
    </div>
  </form>
</template>

<script>
import {mapGetters, useStore} from "vuex";

export default {
  data() {
    return {
      name: "",
      type: "terms",
      definition: "",
      selectedTerm: "",
      selectedTool: "",
      selectedCase: "",
      selectedTerms: [],
      selectedTools: [],
      selectedCases: [],
      types: [
        {id: "term", name: "type", value: "Термин", label: "Термин"},
        {id: "tool", name: "type", value: "Инструмент", label: "Инструмент"},
        {id: "case", name: "type", value: "Кейс", label: "Кейс"}
      ]
    };
  },
  setup: function () {
    const store = useStore();

    const addNewTerm = async () => {
      const term = {name: this.name, definition: this.definition};
      await store.dispatch('createTerm', term);
    };

    const addNewTool = async () => {
      const tool = {name: this.name, definition: this.definition};
      await store.dispatch('createTool', tool);
    };

    const addNewCase = async () => {
      const caseData = {
        name: this.name,
        definition: this.definition

      };
      await store.dispatch('createCase', caseData);
    };

    const handleSubmit = async () => {
      if (type.value === "Термин") {
        await addNewTerm();
      } else if (type.value === "Инструмент") {
        await addNewTool()
      } else {
        await addNewCase();
      }
    };
  },

  computed: {
    ...mapGetters({
      terms: "getAllTerms",
      tools: "getAllTools",
      cases: "getAllCases"
    })
  },
  watch: {
    terms(newVal) {
      console.log("Обновились terms:", newVal);
    }
    ,
    tools(newVal) {
      console.log("Обновились tools:", newVal);
    }
    ,
    cases(newVal) {
      console.log("Обновились cases:", newVal);
    }
  },
  methods: {
    addSelected(type) {
      if (type === "terms" && this.selectedTerm &&
          !this.selectedTerms.map(term => term.id).includes(this.selectedTerm.id)) {
        this.selectedTerms.push(this.selectedTerm);
      }

      if (type === "tools" && this.selectedTool &&
          !this.selectedTools.map(tool => tool.id).includes(this.selectedTool.id)) {
        this.selectedTools.push(this.selectedTool);
      }

      if (type === "cases" && this.selectedCase &&
          !this.selectedCases.map(casee => casee.id).includes(this.selectedCase.id)) {
        this.selectedCases.push(this.selectedCase);
      }
      this.clearSelect(type);
    }
    ,
    removeSelected(type, index) {
      if (type === "terms") this.selectedTerms.splice(index, 1);
      if (type === "tools") this.selectedTools.splice(index, 1);
      if (type === "cases") this.selectedCases.splice(index, 1);
    }
    ,
    clearSelect(type) {
      if (type === "terms") this.selectedTerm = "";
      if (type === "tools") this.selectedTool = "";
      if (type === "cases") this.selectedCase = "";
    },
    async addNewTerm() {
      const term = {name: this.name, definition: this.definition};
      await this.$store.dispatch('createTerm', term);
    },
    async addNewTool() {
      const tool = {name: this.name, definition: this.definition};
      await this.$store.dispatch('createTool', tool);
    },
    async addNewCase() {
      const caseData = {
        name: this.name,
        definition: this.definition
      };
      await this.$store.dispatch('createCase', caseData);
    },
    handleSubmit() {
      if (this.type === "Термин") {
        this.addNewTerm();
      } else if (this.type === "Инструмент") {
        this.addNewTool();
      } else {
        this.addNewCase();
      }
    },
  },
  mounted() {
    this.$store.dispatch("fetchAllTerms");
    this.$store.dispatch("fetchAllTools");
    this.$store.dispatch("fetchAllCases");
  }
};
</script>


<style scoped>
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
