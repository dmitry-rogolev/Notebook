import DriverInterface from "../../../Interfaces/DriverInterface";
import NotTypeError from "../../Errors/NotTypeError";
import ServerFacade from "../../Facades/Server";
import { cache, getValue, isNull, isObject, removeValue, setValue } from "../../helpers";
import Database from "../Database";

class LocalStorageDriver extends DriverInterface
{
    static _instance = null;

    /**
     * 
     * @returns {LocalStorageDriver}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {String} url 
     * @returns {any}
     */
    get(url) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = url.split('/').filter((v) => v !== '');
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);

        if (keys.length === 1) {
            return table;
        }

        if (! isNull(table)) {
            return getValue(table, keys.slice(1).join('.'));
        }

        return null;
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Boolean} serverable
     * @returns {any}
     */
    post(url, data, serverable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = url.split('/').filter((v) => v !== '');
        data = serverable && isObject(data) ? ServerFacade.store(data) : data;

        if (keys.length === 1) {
            cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], data);
            return data;
        }

        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);

        if (isNull(table)) {
            table = [];
        }

        setValue(table, keys.slice(1).join('.'), data);
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return data;
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Boolean} serverable
     * @returns {any}
     */
    patch(url, data, serverable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = url.split('/').filter((v) => v !== '');
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
        data = serverable && isObject(data) ? ServerFacade.update(data) : data;

        if (isNull(table)) {
            table = [];
        }

        if (keys.length === 1) {
            cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], data);
            return data;
        }

        setValue(table, keys.slice(1).join('.'), data);
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return data;
    }

    /**
     * 
     * @param {String} url 
     * @returns {void}
     */
    delete(url) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = url.split('/').filter((v) => v !== '');
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);

        if (isNull(table)) {
            return;
        }

        if (keys.length === 1) {
            cache().remove(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
            return;
        }

        removeValue(table, keys.join('.'));
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);
    }
}

export default LocalStorageDriver;
