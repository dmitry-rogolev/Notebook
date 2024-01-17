import { driver, isNull } from "../helpers";

class Database
{
    static DEFAULT_CACHE_PREFIX = 'database_';
    static DEFAULT_API_PREFIX = 'api';
    static _instance = null;

    /**
     * 
     * @returns {Database}
     */
    static getInstance() {
        if (isNull(this._instance)) {
            this._instance = new this;
        }

        return this._instance;
    }
    
    /**
     * 
     * @param {String} url 
     * @returns {any}
     */
    async get(url, ...params) {
        return (await driver()).get(url, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    async store(url, data, ...params) {
        return (await driver()).post(url, data, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    async update(url, data, ...params) {
        return (await driver()).patch(url, data, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @returns {any}
     */
    async delete(url, ...params) {
        return (await driver()).delete(url, ...params);
    }
}

export default Database;
