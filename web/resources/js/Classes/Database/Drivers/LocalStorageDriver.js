import DriverInterface from "../../../Interfaces/DriverInterface";
import NotTypeError from "../../Errors/NotTypeError";
import ServerFacade from "../../Facades/Server";
import { cache, getValue, isArray, isNull, isObject, parseJson, setValue, toJson } from "../../helpers";
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
     * @param {String} path 
     * @returns {void}
     */
    delete(path) {
        if (path && isString(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length === 3 && keys[1] === this._configuration.getPathTrash() && ! isNaN(Number(keys[2]))) {
                let trash = this._getTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());
    
                if (trash === null) {
                    return;
                }

                let index = trash.findIndex((v) => v[this._configuration.getModelIdName()] == keys[2]);

                if (index === -1) {
                    return;
                }

                trash.splice(index, 1);

                this._setTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash(), trash);
            } else if (keys.length === 2 && ! isNaN(Number(keys[1]))) {
                let table = this._getTable(keys[0]);
                let trash = this._getTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());
    
                if (table === null || ! isArray(trash)) {
                    return;
                }
    
                if (trash === null || ! isArray(trash)) {
                    trash = [];
                }
    
                let index = table.findIndex((v) => v[this._configuration.getModelIdName()] == keys[1]);
    
                if (index === -1) {
                    return;
                }
    
                let trashedModel = table.splice(index, 1)[0];
    
                trashedModel = this._server.delete(trashedModel);
                trash.push(trashedModel);
    
                this._setTable(keys[0], table);
                this._setTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash(), trash);
            }
        }
    }

    /**
     * 
     * @param {String} path 
     * @returns {void}
     */
    truncate(path) {
        if (path && isString(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length === 1) {
                let table = this._getTable(keys[0]);
                let trash = this._getTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());

                if (table === null || ! isArray(trash)) {
                    table = [];
                }

                if (trash === null || ! isArray(trash)) {
                    trash = [];
                }

                table = table.map((model) => {
                    return this._server.delete(model);
                });

                trash = trash.concat(table);

                this._removeTable(keys[0]);

                this._setTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash(), trash);
            } else if (keys[1] === this._configuration.getPathTrash()) {
                this._removeTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());
            }
        }
    }

    restore(path) {
        if (path && isString(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length === 4 && keys[1] === this._configuration.getPathTrash() && ! isNaN(Number(keys[2])) && keys[3] === this._configuration.getPathRestore()) {
                let table = this._getTable(keys[0]);
                let trash = this._getTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());

                if (table === null || ! isArray(trash)) {
                    table = [];
                }

                if (trash === null || ! isArray(trash)) {
                    return;
                }

                let index = trash.findIndex((v) => v[this._configuration.getModelIdName()] == keys[2]);
    
                if (index === -1) {
                    return;
                }

                let trashedModel = trash.splice(index, 1)[0];
    
                trashedModel = this._server.restore(trashedModel);
                table.push(trashedModel);
    
                this._setTable(keys[0], table);
                this._setTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash(), trash);
            } else if (keys.length === 3 && keys[1] === this._configuration.getPathTrash() && keys[2] === this._configuration.getPathRestore()) {
                let table = this._getTable(keys[0]);
                let trash = this._getTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());

                if (table === null || ! isArray(trash)) {
                    table = [];
                }

                if (trash === null || ! isArray(trash)) {
                    trash = [];
                }

                trash = trash.map((model) => {
                    return this._server.restore(model);
                });

                table = table.concat(trash);

                this._removeTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());

                this._setTable(keys[0], table);
            }
        }
    }

    async export(path) {
        if (path && isString(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length === 1) {
                let table = this._getTable(keys[0]);
    
                if (table === null || ! isArray(trash)) {
                    return;
                }
    
                await this._serverDriver.post(keys[0] + '/' + this._configuration.getPathExport(), {[keys[0]]: table});
    
                this._removeTable(keys[0]);
            } else if (keys.length === 2 && keys[1] === this._configuration.getPathTrash()) {
                let trash = this._getTable(keys[0] + '_' + this._configuration.getPathTrash());

                if (trash === null || ! isArray(trash)) {
                    return;
                }

                await this._serverDriver.post(keys[0] + '/' + this._configuration.getPathTrash() + '/' + this._configuration.getPathExport(), {[keys[0]]: trash});
    
                this._removeTable(keys[0] + this._configuration.getDatabaseCacheSeparator() + this._configuration.getPathTrash());
            }
        }
    }

    /**
     * 
     * @param {String} path 
     */
    _parsePath(path) {
        let result = path;

        if (result.startsWith('/')) {
            result = result.slice(1);
        }

        if (result.endsWith('/')) {
            result = result.slice(0, -1);
        }

        return encodeURI(path);
    }

    _getTable(key) {
        return parseJson(localStorage.getItem(this._configuration.getDatabaseCachePrefix() + key));
    }

    _setTable(key, data) {
        localStorage.setItem(this._configuration.getDatabaseCachePrefix() + key, toJson(data));
    }

    _removeTable(key) {
        localStorage.removeItem(this._configuration.getDatabaseCachePrefix() + key);
    }
}

export default LocalStorageDriver;
