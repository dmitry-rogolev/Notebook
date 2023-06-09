class Notification 
{
    _message = '';
    _success = false;
    _error = false;
    _isFilled = false;

    /**
     * 
     * @param {String} message 
     * @param {Object} options 
     * @property {Boolean} options.success
     * @property {Boolean} options.error
     */
    constructor(message, options = {}) {
        if (message && typeof message == 'string') {
            this._message = message;
            this._isFilled = true;
        }
        
        if (options && typeof options == 'object') {
            if ('success' in options) {
                this._success = options.success;
            }
    
            if ('error' in options) {
                this._error = options.error;
            }
        }
    }

    /**
     * @property {String} message
     */
    get message() {
        return this._message;
    }

    /**
     * @property {Boolean} success
     */
    get success() {
        return this._success;
    }

    /**
     * @property {Boolean} error
     */
    get error() {
        return this._error;
    }

    /**
     * @property {Boolean} isFilled
     */
    get isFilled() {
        return this._isFilled;
    }
};

export default Notification;