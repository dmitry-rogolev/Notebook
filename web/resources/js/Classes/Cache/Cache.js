import NotTypeError from "../Errors/NotTypeError";
import { config, isNull, isString, parseJson, toJson } from "../helpers";

class Cache
{
    static _instance = null;

    DEFAULT_CACHE_PREFIX = '__cache_cache';

    /**
     * 
     * @returns {Cache}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} value 
     * @returns {Cache}
     */
    set(key, value) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }

        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);

        localStorage.setItem(prefix + key, toJson(value));

        return this;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} defaultValue 
     * @returns {any}
     */
    get(key, defaultValue = null) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }

        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);
        let value = localStorage.getItem(prefix + key);

        if (isNull(value)) {
            return defaultValue;
        }

        return parseJson(value);
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }

        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);
        let value = localStorage.getItem(prefix + key);

        if (isNull(value)) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Cache}
     */
    remove(key) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }
        
        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);
        localStorage.removeItem(prefix + key);

        return this;
    }

    /**
     * @returns {Cache}
     */
    clear() {
        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);

        for (let key in localStorage) {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        }

        return this;
    }

    /**
     * @returns {Object}
     */
    all() {
        let prefix = config('cache.prefix', this.DEFAULT_CACHE_PREFIX);
        let items = {};

        for (let key in localStorage) {
            if (key.startsWith(prefix)) {
                items[key.slice(prefix.length)] = parseJson(localStorage[key]);
            }
        }

        return items;
    }
}

export default Cache;
