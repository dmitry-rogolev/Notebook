import { plugin } from '../../Classes/helpers';
import Sidebar from './Sidebar';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('sidebar', reactive(new Sidebar()));
    }, 
};
