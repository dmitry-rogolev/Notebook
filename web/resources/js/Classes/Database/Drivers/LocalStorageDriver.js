import DriverInterface from "../../../Interfaces/DriverInterface";
import NotTypeError from "../../Errors/NotTypeError";
import ServerFacade from "../../Facades/Server";
import Model from "../../Model/Model";
import { cache, config, getIndexById, getValue, isArray, isNull, isObject, isString, keysByUrl, removeValue, setValue } from "../../helpers";
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
            return setValue({}, 'data.data', table);
        }

        if (identifiable) {
            try {
                keys = this._replaceIdWithIndex(table, keys);
            } catch (e) {
                return setValue({}, 'data.data', null);
            }
        }

        if (! isNull(table)) {
            return setValue({}, 'data.data', getValue(table, keys.slice(1).join('.')));
        }

        return setValue({}, 'data.data', null);
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
            if (creatable && isObject(data) && ! isArray(data)) {
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
            return setValue({}, 'data.data', data);
        }

        if (identifiable) {
            try {
                keys = this._replaceIdWithIndex(table, keys);
            } catch (e) {
                return setValue({}, 'data.data', data);
            }
        }

        setValue(table, keys.slice(1).join('.'), data);
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return setValue({}, 'data.data', data);
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
            return setValue({}, 'data.data', data);
        }

        if (identifiable) {
            try {
                keys = this._replaceIdWithIndex(table, keys);
            } catch (e) {
                return setValue({}, 'data.data', data);
            }
        }

        setValue(table, keys.slice(1).join('.'), data);
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return setValue({}, 'data.data', data);
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
            return setValue({}, 'data.data', null);
        }

        if (keys.length === 1) {
            cache().remove(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0]);
            return setValue({}, 'data.data', null);
        }

        if (identifiable) {
            try {
                keys = this._replaceIdWithIndex(table, keys);
            } catch (e) {
                return setValue({}, 'data.data', null);
            }
        }

        removeValue(table, keys.slice(1).join('.'));
        cache(config('database.cache.prefix', Database.DEFAULT_CACHE_PREFIX) + keys[0], table);

        return setValue({}, 'data.data', null);
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
