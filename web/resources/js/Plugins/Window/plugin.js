import Window from './Window';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$window = reactive(new Window(options));
    }, 
};
