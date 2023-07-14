import NotTypeError from "../../../Errors/NotTypeError";
import { isObject, isString } from "../../../helpers";

class Server 
{
    static _instance = null;

    _configuration = null;

    /**
     * 
     * @returns {this}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {String} path
     * @param {Object} data 
     * @returns {Object}
     */
    store(path, data) {
        if (! isString(path)) {
            throw new NotTypeError('path', 'string');
        }

        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        let keys = path.split('/');
        let table = this._getTable(keys[0]);

        if (this._isJson(table)) {
            table = this._parseJson(table);
        }

        let id = 1;

        if (table !== null && Array.isArray(table) && table.length) {
            table.sort((a, b) => a[this._configuration.getModelIdName()] - b[this._configuration.getModelIdName()]);

            id = table.reverse()[0][this._configuration.getModelIdName()] + 1;
        }

        let trash = this._getTable(keys[0] + '_' + this._configuration.getPathTrash());

        if (this._isJson(trash)) {
            trash = this._parseJson(trash);
        }

        if (trash !== null && Array.isArray(trash) && trash.length) {
            trash.sort((a, b) => a[this._configuration.getModelIdName()] - b[this._configuration.getModelIdName()]);

            let trashId = trash.reverse()[0][this._configuration.getModelIdName()] + 1;

            if (id < trashId) {
                id = trashId;
            }
        }

        data[this._configuration.getModelIdName()] = id;

        let timestamp = this._getTimestamp();

        data[this._configuration.getModelCreatedAt()] = timestamp;
        data[this._configuration.getModelUpdatedAt()] = timestamp;
        data[this._configuration.getModelDeletedAt()] = null;

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    update(data) {
        if (typeof data !== 'object') {
            throw new Error('The "data" parameter must be an object.');
        }

        data[this._configuration.getModelUpdatedAt()] = this._getTimestamp();

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    delete(data) {
        if (typeof data !== 'object') {
            throw new Error('The "data" parameter must be an object.');
        }

        let timestamp = this._getTimestamp();

        data[this._configuration.getModelUpdatedAt()] = timestamp;
        data[this._configuration.getModelDeletedAt()] = timestamp;

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    restore(data) {
        if (typeof data !== 'object') {
            throw new Error('The "data" parameter must be an object.');
        }

        let timestamp = this._getTimestamp();

        data[this._configuration.getModelUpdatedAt()] = timestamp;
        data[this._configuration.getModelDeletedAt()] = null;

        return data;
    }

    _getTimestamp() {
        let date = new Date();
        return `${date.getUTCFullYear()}-${this._addZero(date.getUTCMonth() + 1)}-${this._addZero(date.getUTCDate())}T${this._addZero(date.getUTCHours())}:${this._addZero(date.getUTCMinutes())}:${this._addZero(date.getUTCSeconds())}.000000Z`;
    }

    _addZero(num) {
        if (num < 10) {
            num = '0' + String(num);
        } else {
            num = String(num);
        }

        return num;
    }

    /**
     * 
     * @param {any} value 
     * @returns {Boolean}
     */
    _isJson(value) {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 
     * @param {any} value 
     * @returns {String}
     */
    _toJson(value) {
        return JSON.stringify(value);
    }

    /**
     * 
     * @param {String} str 
     * @returns {any}
     */
    _parseJson(str) {
        return JSON.parse(str);
    }

    _getTable(key) {
        return localStorage.getItem(this._configuration.getDatabaseCachePrefix() + key);
    }
}

export default Server;
