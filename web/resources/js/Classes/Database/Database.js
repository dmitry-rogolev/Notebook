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
    async get(url) {
        return (await driver()).get(url);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    async store(url, data) {
        return (await driver()).post(url, data);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    async update(url, data) {
        return (await driver()).patch(url, data);
    }

    /**
     * 
     * @param {String} url 
     * @returns {void}
     */
    async delete(url) {
        (await driver()).delete(url);
    }
}

export default Database;
