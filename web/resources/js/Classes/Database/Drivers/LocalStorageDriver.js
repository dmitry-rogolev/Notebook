import ClientDriverInterface from "@/Interfaces/ClientDriverInterface";

class LocalStorageDriver extends ClientDriverInterface
{
    static _instance = null;

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
    get(key, data = null) {
        if (this._isKey(key)) {
            let value = localStorage.getItem(key);

            if (value !== null) {
                if (this._isJson(value)) {
                    value = this._jsonParse(value);
                }

                return value;
            }
        }

        return data;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {void}
     */
    set(key, data) {
        if (this._isKey(key)) {
            if (! this._isJson(data)) {
                data = this._toJson(data);
            }

            localStorage.setItem(key, data);
        }
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        if (this._isKey(key)) {
            let value = localStorage.getItem(key);

            if (value !== null) {
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    remove(key) {
        if (this._isKey(key)) {
            localStorage.removeItem(key);
        }
    }

    /**
     * @returns {void}
     */
    clear() {
        localStorage.clear();
    }

    /**
     * 
     * @param {any} key 
     * @returns {Boolean}
     */
    _isKey(key) {
        return key && typeof key === 'string';
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

    _jsonParse(json) {
        return JSON.parse(json);
    }
}

export default LocalStorageDriver;
