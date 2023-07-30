import { plugin } from '../../Classes/helpers';
import Mark from './Mark';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('mark', reactive(new Mark()));
    }, 
};
