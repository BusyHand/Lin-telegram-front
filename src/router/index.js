import {createRouter, createWebHistory} from 'vue-router';
import About from "@/views/About.vue";
import Main from "@/views/Main.vue";
import ItemPage from "@/views/ItemPage.vue";
import Editor from "@/views/Editor.vue";
import Admin from "@/views/Admin.vue";
import ImageEditor from "@/views/ImageEditor.vue";
import store from "@/store/store.js";
import Unauthorized from "@/views/Unauthorized.vue";


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
    {
        path: '/unauthorized',
        name: 'Unauthorized',
        component: Unauthorized,
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

router.beforeEach(async (to, from, next) => {
    if (to.path === '/unauthorized') {
        return next();
    }
    try {
        const success = await store.dispatch('authenticate');
        if (success) {
            next();
        } else {
            console.warn("Аутентификация не удалась");
            next('/unauthorized');
        }
    } catch (e) {
        console.error("Ошибка при аутентификации", e);
        next('/unauthorized');
    }
});


export default router;
