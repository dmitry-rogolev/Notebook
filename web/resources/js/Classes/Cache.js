import { config, isNull, parseJson, toJson } from "./helpers";

class Cache
{
    static _DEFAULT_PREFIX = '__cache_cache';

    /**
     * 
     * @param {String} key 
     * @param {any} value 
     * @returns {void}
     */
    static set(key, value) {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);

        localStorage.setItem(prefix + key, toJson(value));
    }

    /**
     * 
     * @param {String} key 
     * @param {any} defaultValue 
     * @returns {any}
     */
    static get(key, defaultValue = null) {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);
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
    static has(key) {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);
        let value = localStorage.getItem(prefix + key);

        if (isNull(value)) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    static remove(key) {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);
        localStorage.removeItem(prefix + key);
    }

    /**
     * @returns {void}
     */
    static clear() {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);

        for (let key in localStorage) {
            if (key.startsWith(prefix)) {
                localStorage.removeItem(key);
            }
        }
    }

    /**
     * @returns {Object}
     */
    static all() {
        let prefix = config('cache.prefix', this._DEFAULT_PREFIX);
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
