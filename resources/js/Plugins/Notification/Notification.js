import { isObject, isString } from "../../Classes/helpers";

class Notification 
{
    _message = '';
    _success = false;
    _error = false;
    _isFilled = false;

    /**
     * @property {String}
     */
    get message() {
        return this._message;
    }

    /**
     * @property {Boolean}
     */
    get success() {
        return this._success;
    }

    /**
     * @property {Boolean}
     */
    get error() {
        return this._error;
    }

    /**
     * @property {Boolean} 
     */
    get isFilled() {
        return this._isFilled;
    }

    /**
     * 
     * @param {String} message 
     * @param {Object} options 
     * @property {Boolean} options.success
     * @property {Boolean} options.error
     */
    constructor(message, options = {}) {
        if (isString(message)) {
            this._message = message;
            this._isFilled = true;
        }
        
        if (isObject(options)) {
            if ('success' in options) {
                this._success = options.success;
            }
    
            if ('error' in options) {
                this._error = options.error;
            }
        }
    }
};

export default Notification;