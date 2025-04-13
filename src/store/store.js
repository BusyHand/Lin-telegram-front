import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            items: [],
            suggestions: [],
            terms: [],
            tools: [],
            cases: [],
            totalItemPages: 0,
            itemById: null
        };
    },
    mutations: {
        setItemById(state, itemById) {
            state.itemById = {...itemById};
        },
        setItems(state, items) {
            state.items.splice(0, state.items.length, ...items);
        },
        setSuggestions(state, suggestions) {
            state.suggestions.splice(0, state.suggestions.length, ...suggestions);
        },
        setTerms(state, terms) {
            state.terms = terms;
        },
        updateTerm(state, updatedTerm) {
            const term = state.terms.find(t => t.id === updatedTerm.id)
            if (term) {
                term.name = updatedTerm.name
                term.definition = updatedTerm.definition
            }
        },
        removeTerm(state, id) {
            const index = state.terms.findIndex(t => t.id === id)
            if (index !== -1) state.terms.splice(index, 1)
        },
        setTools(state, tools) {
            state.tools = tools;
        },
        updateTool(state, updatedTool) {
            const tool = state.tools.find(t => t.id === updatedTool.id)
            if (tool) {
                tool.name = updatedTool.name
                tool.description = updatedTool.description
            }
        },
        removeTool(state, id) {
            const index = state.tools.findIndex(t => t.id === id)
            if (index !== -1) state.tools.splice(index, 1)
        },
        setCases(state, cases) {
            state.cases = cases;
        },
        updateCase(state, updatedCase) {
            const caseItem = state.cases.find(c => c.id === updatedCase.id)
            if (caseItem) {
                caseItem.name = updatedCase.name
                caseItem.description = updatedCase.description
            }
        },
        removeCase(state, id) {
            const index = state.cases.findIndex(c => c.id === id)
            if (index !== -1) state.cases.splice(index, 1)
        },
        addTerm(state, term) {
            state.terms.push(term);
        },
        addTool(state, tool) {
            state.tools.push(tool);
        },
        addCase(state, caseItem) {
            state.cases.push(caseItem);
        },
        setTotalItemPages(state, totalItemPages) {
            state.totalItemPages = totalItemPages;
        }
    },
    getters: {
        getItemById(state) {
            return state.itemById
        },
        getTotalItemPages(state) {
            return state.totalItemPages;
        },
        getItems(state) {
            return state.items;
        },
        getSuggestions(state) {
            return state.suggestions;
        },
        getAllTerms(state) {
            return state.terms;
        },
        getAllTools(state) {
            return state.tools;
        },
        getAllCases(state) {
            return state.cases;
        }
    },
    actions: {
        async fetchItems({commit}, {page = 0, size = 6, sort = "id,asc", itemName = "tools"}) {
            const response = await fetch(`http://localhost:8080/api/${itemName}?page=${page}&size=${size}&sort=${sort}`);
            const data = await response.json();
            const totalItemPages = data.page.totalPages;
            commit('setTotalItemPages', totalItemPages);
            commit('setItems', Array.isArray(data.content) ? data.content : []);
        },

        async fetchItemById({commit}, {itemName, id}) {
            console.log("Item name from store", itemName, id)
            const response = await fetch(`http://localhost:8080/api/${itemName}/${id}`);
            const data = await response.json();
            commit('setItemById', data)
        },

        async fetchSuggestionsByCategory({commit}, {category, query, size = 5}) {
            const response = await fetch(`http://localhost:8080/api/${category}/suggestions?query=${query}&size=${size}`);
            const data = await response.json();
            commit('setSuggestions', data.content);
        },

        async fetchAllTerms({commit}) {
            try {
                const response = await fetch('http://localhost:8080/api/terms');
                const data = await response.json();
                commit('setTerms', data.content);
            } catch (error) {
                console.error('Ошибка при загрузке терминов:', error);
            }
        },
        async fetchAllTools({commit}) {
            try {
                const response = await fetch('http://localhost:8080/api/tools');
                const data = await response.json();
                commit('setTools', data.content);
            } catch (error) {
                console.error('Ошибка при загрузке инструментов:', error);
            }
        },
        async fetchAllCases({commit}) {
            try {
                const response = await fetch('http://localhost:8080/api/cases');
                const data = await response.json();
                commit('setCases', data.content);
            } catch (error) {
                console.error('Ошибка при загрузке кейсов:', error);
            }
        },

        async createTerm({commit}, termData) {
            const response = await fetch('http://localhost:8080/api/terms', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(termData)
            });
        },

        async updateTerm({commit}, term) {
            const response = await fetch(`http://localhost:8080/api/terms/${term.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(term)
            })
            if (!response.ok) throw new Error('Ошибка при обновлении термина')
            const updated = await response.json()
            commit('updateTerm', updated)
        },

        async createTool({commit}, toolData) {
            try {
                const response = await fetch('http://localhost:8080/api/tools', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(toolData)
                });

                if (!response.ok) throw new Error('Ошибка при создании инструмента');

            } catch (error) {
                console.error('Ошибка:', error);
            }
        },

        async updateTool({commit}, tool) {
            const response = await fetch(`http://localhost:8080/api/tools/${tool.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(tool)
            })
            if (!response.ok) throw new Error('Ошибка при обновлении инструмента')
            const updated = await response.json()
            commit('updateTool', updated)
        },

        async createCase({commit}, caseData) {
            const response = await fetch('http://localhost:8080/api/cases', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(caseData)
            });

            if (!response.ok) throw new Error('Ошибка при создании кейса');
        },

        async updateCase({commit}, caseItem) {
            const response = await fetch(`http://localhost:8080/api/cases/${caseItem.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(caseItem)
            })
            if (!response.ok) throw new Error('Ошибка при обновлении кейса')
            const updated = await response.json()
            commit('updateCase', updated)
        },

        async deleteItem({commit}, {itemName, id}) {
            const response = await fetch(`http://localhost:8080/api/${itemName}/${id}`, {
                method: 'DELETE'
            })
            commit('removeCase', id)
            commit('removeCase', id)
            commit('removeCase', id)
        }
    },
});

export default store;
