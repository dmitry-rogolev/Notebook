import Notebook from './Notebook';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$notebook = reactive(new Notebook(options));
    }, 
};
