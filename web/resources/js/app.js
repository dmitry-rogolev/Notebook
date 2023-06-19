import './bootstrap';
import '../css/app.css';
import '../css/fonts.css';
import 'https://kit.fontawesome.com/7484c95978.js';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

import store from './store'; 
import VueApp from './Plugins/App/plugin';
import notifier from './Plugins/Notification/plugin';
import Editable from './Plugins/Editable/plugin';
import Window from './Plugins/Window/plugin';
import Sidebar from './Plugins/Sidebar/plugin';
import Notebook from './Plugins/Notebook/plugin';
import Mark from './Plugins/Mark/plugin';
import Sort from './Plugins/Sort/plugin';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(store)
            .use(VueApp)
            .use(Sort)
            .use(notifier, {interval: 3000})
            .use(Editable, {autofocus: true})
            .use(Window)
            .use(Sidebar)
            .use(Notebook)
            .use(Mark)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
