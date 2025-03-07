import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            items: [],
        };
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        }
    },
    actions: {
        fetchItems({ commit }) {
            const items = [
                { id: '1', title: 'Красота природы', description: 'Наслаждайтесь красивыми пейзажами природы.', images: ['/src/icons/1.jpg'] },
                { id: '2', title: 'Горы на закате', description: 'Величественные горные пейзажи на фоне заката.', images: ['/src/icons/2.jpg'] },
                { id: '3', title: 'Лесная тишина', description: 'Окунитесь в атмосферу спокойствия среди вековых деревьев.', images: ['/src/icons/3.jpg'] },
                { id: '4', title: 'Озеро и рассвет', description: 'Завораживающий рассвет над зеркальной гладью воды.', images: ['/src/icons/4.png'] },
                { id: '5', title: 'Поляна цветов', description: 'Яркие краски природы на летней поляне.', images: ['/src/icons/5.png'] }
            ];
            commit('setItems', items);
        }
    },
    getters: {
        getItems(state) {
            return state.items;
        },
        getItemById: (state) => (id) => {
            return state.items.find(item => item.id === id);
        }
    }
});

export default store;
