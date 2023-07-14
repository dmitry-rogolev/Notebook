import NotTypeError from "../../../Errors/NotTypeError";
import Model from "../../../Model/Model";
import { cache, config, isObject, isString, timestamp, uuid } from "../../../helpers";
import Database from "../../Database";

class Server 
{
    static _instance = null;

    _configuration = null;

    /**
     * 
     * @returns {Server}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    store(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)] = uuid();

        let timestampDate = timestamp();

        data[config('model.created_at', Model.DEFAULT_CREATED_AT)] = timestampDate;
        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestampDate;
        data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)] = null;

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    update(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestamp();

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

    /**
     * 
     * @param {String} key 
     * @returns {any}
     */
    _getTable(key) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }

        return cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + key);
    }
}

export default Server;
