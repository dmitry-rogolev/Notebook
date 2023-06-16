import Mark from './Mark';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$mark = reactive(new Mark(options));
    }, 
};
