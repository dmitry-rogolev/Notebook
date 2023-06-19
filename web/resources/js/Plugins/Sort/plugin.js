import Sort from './Sort';
import { reactive } from 'vue';

export default {
    install: (app) => {
        app.config.globalProperties.$sort = reactive(new Sort());
    }, 
};
