import {createRouter, createWebHistory} from 'vue-router';
import About from "@/views/About.vue";
import Main from "@/views/Main.vue";
import ItemPage from "@/views/ItemPage.vue";
import Editor from "@/views/Editor.vue";
import Admin from "@/views/Admin.vue";
import ImageEditor from "@/views/ImageEditor.vue";


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
        path: '/item/:itemName/:id',
        name: 'ItemPage',
        component: ItemPage,
        props: true,
    },
    {
        path: '/editor',
        name: 'Editor',
        component: Editor,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/editor/image',
        name: 'ImageEditor',
        component: ImageEditor,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;
