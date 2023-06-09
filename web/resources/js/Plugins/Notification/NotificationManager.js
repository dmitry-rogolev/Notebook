import Notification from './Notification';
import { reactive } from 'vue';

class NotificationManager {
    _notifications = reactive([]);
    _filledMod = true;
    _interval = 2000;
    _timeoutMod = true;

    get length() {
        return this._notifications.length;
    }

    get notifications() {
        return this._notifications;
    }

    get isFilledMod() {
        return this._filledMod;
    }

    set isFilledMod(v) {
        if (typeof v == 'boolean') {
            this._filledMod = v;
        }
    }

    get interval() {
        return this._interval;
    }

    set interval(v) {
        if (typeof v == 'number') {
            this._interval = v;
        }
    }

    get isTimeoutMod() {
        return this._timeoutMod;
    }

    set isTimeoutMod(v) {
        if (typeof v == 'boolean') {
            this._timeoutMod = v;
        }
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

        if (typeof notification == 'object' && notification instanceof Notification) {
            notice = notification;
        } else if (typeof notification == 'object' && 'message' in notification && notification.message) {
            notice = this.createNotification(notification);
        } else {
            return;
        }

        if (this._filledMod) {
            if (notice.isFilled) {
                this._notifications.push(notice);
            }
        } else {
            this._notifications.push(notice);
        }

        if (this._timeoutMod) {
            setTimeout(() => this.shift(), this._interval);
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

        if (typeof notification == 'object' && notification instanceof Notification) {
            index = this._notifications.indexOf(notification);
        } else if (typeof notification == 'number' && notification !== -1) {
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
