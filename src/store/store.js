import {createStore} from 'vuex';

const API_BASE_URL = 'http://localhost:8080';
const API_IMAGE_BASE_URL = 'http://localhost:9000/images/'

const store = createStore({
    state() {
        return {
            items: [],
            suggestions: [],
            terms: [],
            tools: [],
            cases: [],
            totalItemPages: 0,
            itemById: null,
            tokens: null,
            accessToken: localStorage.getItem("accessToken") || null,
            refreshToken: localStorage.getItem("refreshToken") || null,
            user: (() => {
                try {
                    return JSON.parse(localStorage.getItem("user")) || null;
                } catch (e) {
                    return null;
                }
            })(),
            roles: (() => {
                try {
                    return JSON.parse(localStorage.getItem("roles")) || [];
                } catch (e) {
                    return [];
                }
            })(),
            tgWebAppData: null,
            hash: null,
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
        },
        setTokens(state, {accessToken, refreshToken}) {
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            state.user = null;
            state.roles = [];
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
        },
        setUser(state, user) {
            state.user = user;
            state.roles = user.roles || [];
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("roles", JSON.stringify(user.roles || []));
        },
        clearUser(state) {
            state.user = null;
            state.roles = [];
            localStorage.removeItem("user");
            localStorage.removeItem("roles");
        },
        setTgWebAppData(state, data) {
            state.tgWebAppData = data
        },
        setHash(state, hash) {
            state.hash = hash;
        },
    },
    getters: {
        getImageUrl(state) {
            return API_IMAGE_BASE_URL;
        },
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
        },
        isAuthenticated: (state) => !!state.accessToken,
        getUser: (state) => state.user,
        getRoles: (state) => state.roles,
        hasRole: (state) => (role) => state.roles.includes(role),
        hasAnyRole: (state) => (...roles) => roles.some(role => state.roles.includes(role))
    },
    actions: {
        async authenticate({commit, state}) {
            if (state.accessToken) {
                return true;
            }
            const initData = window.Telegram.WebApp.initData;
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({initData})
            });
            if (!response.ok) {
                return false;
            }
            const data = await response.json();
            commit("setTokens", {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            });
            const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${data.accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (userResponse.ok) {
                const userData = await userResponse.json();
                console.log("user", userData);
                commit("setUser", userData);
            }
            return true;
        },

        async authorizedFetch({dispatch, state, commit}, {url, options = {}}) {
            let response = await fetch(`${API_BASE_URL}${url}`, {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${state.accessToken}`
                }
            });
            if (response.status === 401 && state.refreshToken) {
                const newAccessToken = await dispatch("refreshAccessToken");
                if (newAccessToken) {
                    response = await fetch(`${API_BASE_URL}${url}`, {
                        ...options,
                        headers: {
                            ...options.headers,
                            "Authorization": `Bearer ${newAccessToken}`
                        }
                    });
                }
            }
            return response;
        },
        async refreshAccessToken({state, commit, dispatch}) {
            const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({refreshToken: state.refreshToken})
            });
            if (response.ok) {
                const newTokens = await response.json();
                commit("setTokens", {accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken});
                return newTokens.accessToken;
            }
            commit("clearTokens");
            await dispatch("authenticate");
            return null;
        },

        async fetchItems({commit, dispatch}, {page = 0, size = 6, sort = "id,asc", itemName = "tools"}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/${itemName}?page=${page}&size=${size}&sort=${sort}`,
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            const totalItemPages = data.page.totalPages;
            commit('setTotalItemPages', totalItemPages);
            commit('setItems', Array.isArray(data.content) ? data.content : []);
        },

        async fetchItemById({commit, dispatch}, {itemName, id}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/${itemName}/${id}`,
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            commit('setItemById', data)
        },

        async fetchSuggestionsByCategory({commit, dispatch}, {category, query, size = 5}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/${category}/suggestions?query=${query}&size=${size}`,
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            commit('setSuggestions', data.content);
        },

        async fetchAllTerms({commit, dispatch}) {
            const response = await dispatch("authorizedFetch", {
                url: '/api/terms',
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            commit('setTerms', data.content);
        },
        async fetchAllTools({commit, dispatch}) {
            const response = await dispatch("authorizedFetch", {
                url: '/api/tools',
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            commit('setTools', data.content);
        },
        async fetchAllCases({commit, dispatch}) {
            const response = await dispatch("authorizedFetch", {
                url: '/api/cases',
                options: {
                    method: 'GET',
                },
            });
            const data = await response.json();
            commit('setCases', data.content);
        },

        async createTerm({commit, dispatch}, termData) {
            await dispatch("authorizedFetch", {
                url: '/api/terms',
                options: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(termData)
                },
            });
        },

        async updateTerm({commit, dispatch}, {termId, term}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/terms/${termId}`,
                options: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(term)
                },
            });
            const updated = await response.json()
            commit('updateTerm', updated)

        },

        async createTool({commit, dispatch}, toolData) {
            await dispatch("authorizedFetch", {
                url: '/api/tools',
                options: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(toolData)
                },
            });
        },

        async updateTool({commit, dispatch}, {toolId, tool}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/tools/${toolId}`,
                options: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(tool)
                },
            });
            const updated = await response.json()
            commit('updateTool', updated)
        },

        async createCase({commit, dispatch}, caseData) {
            await dispatch("authorizedFetch", {
                url: `/api/cases`,
                options: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(caseData)
                },
            });
        },

        async updateCase({commit, dispatch}, {caseId, aCase}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/cases/${caseId}`,
                options: {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(aCase)
                },
            });
            const updated = await response.json()
            commit('updateCase', updated)
        },

        async deleteItem({commit, dispatch}, {itemName, id}) {
            await dispatch("authorizedFetch", {
                url: `/api/${itemName}/${id}`,
                options: {
                    method: 'DELETE'
                },
            });
            const capitalized = itemName.slice(0, -1).charAt(0).toUpperCase() + itemName.slice(1, -1)
            commit(`remove${capitalized}`, id)

        },

        async uploadImage({dispatch}, file) {
            const formData = new FormData()
            formData.append("imageFile", file)
            const response = await dispatch("authorizedFetch", {
                url: "/api/images",
                options: {
                    method: "POST",
                    body: formData
                },
            });
            return response.json()
        },

        async deleteImage({dispatch}, imageName) {
            await dispatch("authorizedFetch", {
                url: `/api/images/${imageName}`,
                options: {
                    method: "DELETE",
                },
            });
        },
        async generateInviteLink({dispatch}, companyId) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/companies/${companyId}/link`,
                options: {
                    method: "GET",
                },
            });
            return response.json();
        },
        async blockUser({dispatch}, userId) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/users/action/block/${userId}`,
                options: {
                    method: "POST",
                },
            });
            return response.json();
        },
        async unblock({dispatch}, userId) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/users/action/unblock/${userId}`,
                options: {
                    method: "POST",
                },
            });
            return response.json();
        },
        async detachUserFromCompany({dispatch}, {userId, companyId}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/companies/action/remove-user/${userId}/${companyId}`,
                options: {
                    method: "POST",
                },
            });
            return response.json();
        },
        async assignUserCompany({dispatch}, {userId, companyId}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/companies/action/add-user/${userId}/${companyId}`,
                options: {
                    method: "POST",
                },
            });
            return response.json();
        },
        async updateUserRoles({dispatch}, {userId, roles}) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/users/${userId}/roles`,
                options: {
                    method: "PUT",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({roles: roles})
                },
            });
            return response.json();
        },
        async createCompany({dispatch}, company) {
            const response = await dispatch("authorizedFetch", {
                url: `/api/companies`,
                options: {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(company)
                },
            });
            return response.json();
        },


    },
});

export default store;
