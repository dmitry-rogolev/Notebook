import { plugin } from '../../Classes/helpers';
import Notebook from './Notebook';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('notebook', reactive(new Notebook()));
    }, 
};
