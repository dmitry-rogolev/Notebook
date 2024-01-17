import NotTypeError from '../../Classes/Errors/NotTypeError';
import { config, isNumber, isObject, isString } from '../../Classes/helpers';
import Notification from './Notification';
import { reactive } from 'vue';

class NotificationManager 
{
    static DEFAULT_TIMEOUT = true;
    static DEFAULT_INTERVAL = 2000;

    _notifications = reactive([]);

    /**
     * @returns {Number}
     */
    get length() {
        return this._notifications.length;
    }

    /**
     * @returns {Array}
     */
    get notifications() {
        return this._notifications;
    }

    /**
     * 
     * @param {Notification|Object} notification 
     * @property {String} notification.message 
     * @property {Boolean} notification.success
     * @property {Boolean} notification.error
     * @returns {void}
     */
    push(notification) {
        if (! notification) {
            return;
        }

        let notice = null;

        if (notification instanceof Notification) {
            notice = notification;
        } else if (isObject(notification) && 'message' in notification && isString(notification.message)) {
            notice = this.createNotification(notification);
        } else {
            return;
        }

        if (notice.isFilled) {
            this._notifications.push(notice);
        }

        if (config('notification.timeout', NotificationManager.DEFAULT_TIMEOUT)) {
            setTimeout(() => this.shift(), config('notification.interval', NotificationManager.DEFAULT_INTERVAL));
        }
    }

    /**
     * 
     * @returns {Notification}
     */
    shift() {
        return this._notifications.shift();
    }

    /**
     * 
     * @param {Object} options 
     * @property {String} options.message 
     * @property {Boolean} options.success
     * @property {Boolean} options.error
     * @returns {Notification}
     */
    createNotification(options = {}) {
        if (! isObject(options)) {
            throw new NotTypeError('options', 'object');
        }

        let message = '';

        if ('message' in options) {
            message = options.message;
            delete options.message;
        }
        
        return new Notification(message, options);
    }

    /**
     * 
     * @param {Notification|Number} notification 
     * @returns {void}
     */
    remove(notification) {
        let index = -1;

        if (notification instanceof Notification) {
            index = this._notifications.indexOf(notification);
        } else if (isNumber(notification) && notification >= 0) {
            index = notification;
        } else {
            return;
        }

        if (index !== -1) {
            this._notifications.splice(index, 1);
        }
    }
}

export default NotificationManager;
