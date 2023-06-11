import Editable from './Editable';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        app.config.globalProperties.$editable = reactive(new Editable(options));
    }, 
};