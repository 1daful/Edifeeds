import { createRouter, createWebHistory, } from 'vue-router';
import routes from './routes';
export const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory()
});
