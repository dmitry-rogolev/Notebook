import DriverInterface from "../../../Interfaces/DriverInterface";
import NotTypeError from "../../Errors/NotTypeError";
import ServerFacade from "../../Facades/Server";
import Model from "../../Model/Model";
import { cache, config, empty, getIndexById, getValue, isArray, isNull, isObject, isString, keysByUrl, removeValue, setValue } from "../../helpers";
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
     * @param {Boolean} identifiable
     * @returns {any}
     */
    get(url, identifiable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = keysByUrl(url);
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);

        if (keys.length === 1) {
            return table;
        }

        if (identifiable) {
            try {
                keys = this._replaceIdWithIndex(table, keys);
            } catch (e) {
                return null;
            }
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
     * @param {Boolean} creatable
     * @param {Boolean} serverable
     * @param {Boolean} identifiable
     * @returns {any}
     */
    post(url, data, creatable = true, serverable = true, identifiable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = keysByUrl(url);
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
        data = serverable && isObject(data) && ! isArray(data) ? ServerFacade.store(data) : data;

        if (isNull(table) || ! isArray(table)) {
            table = ! isNull(table) ? [table] : [];
        }

        if (keys.length === 1) {
            if (creatable) {
                table.push(data);
                cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);
            } else {
                if (serverable && isArray(data)) {
                    data = data.map((v) => {
                        if (isObject(v) && ! isArray(v)) {
                            v = ServerFacade.store(v)
                        }

                        return v;
                    });
                }

                cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], data);
            }
            return data;
        }

        if (identifiable) {
            keys = this._replaceIdWithIndex(table, keys);
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
     * @param {Boolean} identifiable
     * @returns {any}
     */
    patch(url, data, serverable = true, identifiable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = keysByUrl(url);
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
        data = serverable && isObject(data) ? ServerFacade.update(data) : data;

        if (isNull(table)) {
            table = [];
        }

        if (keys.length === 1) {
            cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], data);
            return data;
        }

        if (identifiable) {
            keys = this._replaceIdWithIndex(table, keys);
        }

        setValue(table, keys.slice(1).join('.'), data);
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return data;
    }

    /**
     * 
     * @param {String} url 
     * @param {Boolean} identifiable
     * @returns {void}
     */
    delete(url, identifiable = true) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let keys = keysByUrl(url);
        let table = cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);

        if (isNull(table) || ! isArray(table)) {
            return;
        }

        if (keys.length === 1) {
            cache().remove(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
            return;
        }

        if (identifiable) {
            keys = this._replaceIdWithIndex(table, keys);
        }

        removeValue(table, keys.slice(1).join('.'));
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);
    }

    /**
     * 
     * @param {Array} table 
     * @param {Array} keys 
     * @returns {Array}
     */
    _replaceIdWithIndex(table, keys) {
        return keys.map((v) => {
            if ((isString(v) && v.startsWith(config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX))) || ! isNaN(Number(v))) {
                if (isNaN(Number(v))) {
                    v = v.slice(config('model.uuid.prefix', Model.DEFAULT_UUID_PREFIX).length);
                } else {
                    v = Number(v);
                }

                let index = getIndexById(table, v);

                if (index === -1) {
                    throw new Error('Not found');
                }

                return String(index);
            }

            return v;
        });
    }
}

export default LocalStorageDriver;
