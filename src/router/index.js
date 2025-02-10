import {createRouter, createWebHistory} from 'vue-router';
import About from "@/views/About.vue";
import Main from "@/views/Main.vue";
import ItemPage from "@/views/ItemPage.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/item/:id',
        name: 'ItemPage',
        component: ItemPage,
        props: true,
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;
