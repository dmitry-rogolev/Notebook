import Sidebar from './Sidebar';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$sidebar = reactive(new Sidebar(options));
    }, 
};
