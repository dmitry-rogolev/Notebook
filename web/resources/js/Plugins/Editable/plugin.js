import { plugin } from '../../Classes/helpers';
import Editable from './Editable';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('editable', reactive(new Editable()));
    }, 
};