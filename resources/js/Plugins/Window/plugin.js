import { plugin } from '../../Classes/helpers';
import Window from './Window';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('window', reactive(new Window()));
    }, 
};
