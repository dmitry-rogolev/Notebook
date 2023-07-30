import Sort from './Sort';
import { reactive } from 'vue';

export default {
    install: (app) => {
        plugin('sort', reactive(new Sort()));
    }, 
};
