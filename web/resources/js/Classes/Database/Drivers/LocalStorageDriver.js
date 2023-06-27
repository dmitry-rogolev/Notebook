import DriverInterface from "../../../Interfaces/DriverInterface";
import Configuration from "../../Configuration";
import AxiosServerDriver from "./AxiosServerDriver";
import Server from "./LocalStorageDriver/Server";

class LocalStorageDriver extends DriverInterface
{
    static _instance = null;
    _configuration = null;
    _server = null;
    _serverDriver = null;

    constructor() {
        super();
        this._configuration = Configuration.getInstance();
        this._server = Server.getInstance();
        this._serverDriver = AxiosServerDriver.getInstance();
    }

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
     * @param {any|null} data default data
     * @returns {any}
     */
    get(path, data = null) {
        if (this._isPath(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length !== 1) {
                throw new Error('The path must consist of one key.');
            }

            let table = this._getTable(keys[0])

            if (this._isJson(table)) {
                table = this._parseJson(table);
            }

            if (table === null || ! Array.isArray(table) || Array.isArray(table) && ! table.length) {
                return data;
            }

            return table;
        }

        return data;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    post(path, data) {
        if (this._isPath(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length !== 1) {
                throw new Error('The path must consist of one key.');
            }

            let table = this._getTable(keys[0]);

            if (this._isJson(table)) {
                table = this._parseJson(table);
            }

            if (table === null || ! Array.isArray(table)) {
                table = [];
            }

            let model = this._server.store(path, data);

            table.push(model);

            table = this._toJson(table);

            this._setTable(keys[0], table);

            return model;
        }

        return null;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    patch(path, data) {
        if (this._isPath(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length !== 2) {
                throw new Error('The path must consist of two keys.');
            }

            if (isNaN(Number(keys[1]))) {
                throw new Error('The second key must be an identifier.');
            }

            let table = this._getTable(keys[0]);

            if (this._isJson(table)) {
                table = this._parseJson(table);
            }

            if (table === null || ! Array.isArray(table) || Array.isArray(table) && ! table.length) {
                return null;
            }

            let index = table.findIndex((v) => v[this._configuration.getModelIdName()] == keys[1]);

            if (index === -1) {
                return null;
            }

            let model = this._server.update(data);

            table[index] = model;

            table = this._toJson(table);

            this._setTable(keys[0], table);

            return data;
        }

        return null;
    }

    /**
     * 
     * @param {String} path 
     * @returns {void}
     */
    delete(path) {
        if (this._isPath(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            if (keys.length > 2) {
                throw new Error('A path can contain no more than two keys.');
            }

            if (keys.length === 1) {
                this._removeTable(keys[0]);
            } else {
                if (isNaN(Number(keys[1]))) {
                    throw new Error('The second key must be an identifier.');
                }

                let table = this._getTable(keys[0]);

                if (this._isJson(table)) {
                    table = this._parseJson(table);
                }
    
                if (table === null || ! Array.isArray(table) || Array.isArray(table) && ! table.length) {
                    return;
                }

                let index = table.findIndex((v) => v[this._configuration.getModelIdName()] == keys[1]);

                if (index === -1) {
                    return;
                }

                table.splice(index, 1);

                table = this._toJson(table);

                this._setTable(keys[0], table);
            }
        }
    }

    async export(path) {
        if (this._isPath(path)) {
            path = this._parsePath(path);
            let keys = path.split('/');

            let table = this._getTable(keys[0]);

            if (this._isJson(table)) {
                table = this._parseJson(table);
            }

            if (table === null || ! Array.isArray(table) || Array.isArray(table) && ! table.length) {
                return;
            }

            await this._serverDriver.post(keys[0] + '/export', {[keys[0]]: table});

            this._removeTable(keys[0]);
        }
    }

    /**
     * 
     * @param {any} path 
     * @returns {Boolean}
     */
    _isPath(path) {
        return path && typeof path === 'string';
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

    _setTable(key, data) {
        localStorage.setItem(this._configuration.getDatabaseCachePrefix() + key, data);
    }

    _removeTable(key) {
        localStorage.removeItem(this._configuration.getDatabaseCachePrefix() + key);
    }
}

export default LocalStorageDriver;
