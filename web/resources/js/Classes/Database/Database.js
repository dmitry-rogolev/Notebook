import Configuration from '@/Classes/Configuration';
import DatabaseFactory from "./DabaseFactory";
import DriverInterface from "@/Interfaces/DriverInterface";
import { usePage } from '@inertiajs/vue3';

class Database
{
    _driver = null;
    _clientDriver = null;
    _serverDriver = null;
    _configuration = null;

    constructor(clientDriver, serverDriver) {
        if (! (clientDriver instanceof DriverInterface)) {
            throw new Error('The clientDriver must be extends from Interfaces/DriverInterface.');
        }

        if (! (serverDriver instanceof DriverInterface)) {
            throw new Error('The serverDriver must be extends from Interfaces/DriverInterface.');
        }

        this._clientDriver = clientDriver;
        this._serverDriver = serverDriver;
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
            await this._setDriver(key);

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
            await this._setDriver(key);

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
            await this._setDriver(key);

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
            await this._setDriver(key);

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
            this._setDriver(key);

            await this._driver.delete(key);
        }
    }

    _isKey(key) {
        return key && typeof key === 'string';
    }

    async _setDriver(key) {
        let driver = null;

        if (usePage().props.auth.user) {
            driver = this._serverDriver;
        } else {
            driver = this._clientDriver;
        }

        if (this._driver !== driver) {
            this._driver = driver;

            if (driver === this._serverDriver) {
                await this._clientDriver.export(key);
            }
        }
    }

    static factory(clientDriver = null, serverDriver = null) {
        return new DatabaseFactory(clientDriver, serverDriver);
    }
}

export default Database;