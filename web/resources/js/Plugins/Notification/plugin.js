import { plugin } from '../../Classes/helpers';
import NotificationManager from './NotificationManager';
import { reactive } from 'vue';

export default {
    install: (app, options = {}) => {
        plugin('notifier', reactive(new NotificationManager()));
    }, 
};
