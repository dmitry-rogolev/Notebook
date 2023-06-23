import Configuration from '@/Classes/Configuration';
import ServerDriverInterface from "@/Interfaces/ServerDriverInterface";
import ClientDriverInterface from "@/Interfaces/ClientDriverInterface";

class LocalStorageDriver extends ClientDriverInterface
{
    static _instance = null;
    _configuration = null;
    _serverDriver = null;

    constructor() {
        super();
        this._configuration = Configuration.getInstance();
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
    async get(key, data = null) {
        if (this._isKey(key)) {
            let path = this._parseKey(key);
            let value = this._getValueByStringKey(path);

            if (value === null) {
                value = await this._serverDriver.get(path);
                console.log(value);
            }

            return value;
        }

        return data;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {Boolean}
     */
    set(key, data) {
        if (this._isKey(key)) {
            let path = this._parseKey(key);
            let success = this._setValueByStringKey(path, data);

            if (success) {
                
            }
        }

        return false;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    remove(key) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * @returns {void}
     */
    clear() {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {ServerDriverInterface} serverDriver 
     * @returns {void}
     */
    setServerDriver(serverDriver) {
        if (serverDriver instanceof ServerDriverInterface) {
            this._serverDriver = serverDriver;
        }
    }

    /**
     * 
     * @param {any} key 
     * @returns {Boolean}
     */
    _isKey(key) {
        return key && typeof key === 'string';
    } 

    /**
     * 
     * @param {String} key 
     * @returns {Array}
     */
    _splitKey(key) {
        let result = key;

        result = result.split('/');

        if (result.length === 1) {
            result = key.split('.');
        }

        return result;
    }

    _parseKey(key) {
        let result = key;

        if (result.startsWith('/')) {
            result = result.slice(1);
        }

        if (result.endsWith('/')) {
            result = result.slice(0, -1);
        }

        return result.split('.').join('/');
    }

    /**
     * 
     * @param {String} tableName 
     * @returns {any}
     */
    _getAllRowsFromTable(tableName) {
        let rows = localStorage.getItem(tableName);

        if (rows === null) {
            return null;
        }

        return JSON.parse(rows); 
    }

    _getValueByStringKey(key) {
        let keys = this._splitKey(key);
        let rows = this._getAllRowsFromTable(keys[0]);

        if (rows === null) {
            return null;
        }

        let result = rows;

        if (keys.length > 1 && (Array.isArray(rows) || typeof rows === 'object')) {
            keys.splice(0, 1);
            
            result = this._getValueByKeys(rows, keys);
        }

        return result;
    }

    _getValueByKeys(rows, keys) {
        let result = rows;

        keys.forEach((key) => {
            if (Array.isArray(result)) {
                let idName = this._configuration.getDataIdName();
                let index = result.findIndex((v) => typeof v === 'object' && idName in v && v[idName] == key);

                if (index === -1) {
                    return false;
                }

                result = result[index];
            } else if (typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return false;
            }
        });

        return result;
    }

    _setValueByStringKey(key, data) {
        let keys = this._splitKey(key);
        let tableData = data;

        if (keys.length > 1) {
            let rows = this._getAllRowsFromTable(keys[0]);

            if (rows === null) {
                return false;
            }

            tableData = this._setValueByKeys(rows, keys, data);
        }
        
        this._setTableData(keys[0], tableData);

        return true;
    }

    _setValueByKeys(rows, keys, data) {
        let result = rows;

        keys.forEach((key, i) => {
            if (Array.isArray(result)) {
                let idName = this._configuration.getDataIdName();
                let index = result.findIndex((v) => typeof v === 'object' && idName in v && v[idName] == key);

                if (index === -1) {
                    return false;
                }

                if (i === keys.length - 1) {
                    result[index] = data;
                } else {
                    result = result[index];
                }
            } else if (typeof result === 'object' && key in result) {
                if (i === keys.length - 1) {
                    result[key] = data;
                } else {
                    result = result[key];
                }
            } else {
                return false;
            }
        });

        return rows;
    }

    _setTableData(key, data) {
        if (! this._isJson(data)) {
            data = this._toJson(data)
        }

        localStorage.setItem(key, data);
    }

    _isJson(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    _toJson(data) {
        return JSON.stringify(data);
    }
}

export default LocalStorageDriver;
