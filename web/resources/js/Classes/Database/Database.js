import Configuration from '@/Classes/Configuration';
import DatabaseFactory from "./DabaseFactory";
import DriverInterface from "@/Interfaces/DriverInterface";

class Database
{
    _driver = null;
    _configuration = null;

    constructor(driver) {
        if (! (driver instanceof DriverInterface)) {
            throw new Error('The driver must be extends from Interfaces/DriverInterface.');
        }

        this._driver = driver;
        this._configuration = Configuration.getInstance();
    }

    /**
     * 
     * @param {String} key 
     * @param {any|null} value default value
     * @returns {any}
     */
    async get(key, value = null) {
        if (this._isKey(key)) {
            let data = await this._driver.get(key);
    
            if (data !== null) {
                return data;
            }
        }

        return value;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {any}
     */
    async store(key, data) {
        if (this._isKey(key) && typeof data === 'object') {
            return await this._driver.post(key, data);
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {any}
     */
    async update(key, data) {
        if (this._isKey(key) && typeof data === 'object' && key.split('/').length === 2 && ! isNaN(Number(key.split('/')[1]))) {
            return await this._driver.patch(key, data);
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @return {void}
     */
    async delete(key) {
        if (this._isKey(key) && key.split('/').length === 2 && ! isNaN(Number(key.split('/')[1]))) {
            await this._driver.delete(key);
        }
    }

    /**
     * 
     * @param {String} key 
     * @return {void}
     */
    async truncate(key) {
        if (this._isKey(key) && key.split('/').length === 1) {
            await this._driver.delete(key);
        }
    }

    _isKey(key) {
        return key && typeof key === 'string';
    }

    static factory(clientDriver = null, serverDriver = null) {
        return new DatabaseFactory(clientDriver, serverDriver);
    }
}

export default Database;