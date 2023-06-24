import ClientDriverInterface from "../../Interfaces/ClientDriverInterface";
import ServerDriverInterface from "../../Interfaces/ServerDriverInterface";
import Configuration from '@/Classes/Configuration';

class Database
{
    _clientDriver = null;
    _serverDriver = null;
    _configuration = null;

    constructor(clientDriver, serverDriver) {
        if (! (clientDriver instanceof ClientDriverInterface)) {
            throw new Error('The driver must be extends from Interfaces/ClientDriverInterface.');
        }

        if (! (serverDriver instanceof ServerDriverInterface)) {
            throw new Error('The driver must be extends from Interfaces/ServerDriverInterface.');
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
            let data = this._clientDriver.get(key);

            if (data === null) {
                data = await this._serverDriver.get(key);
    
                if (data === null) {
                    return value;
                }

                this._clientDriver.set(key, data);
            }

            return data;
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
            data = await this._serverDriver.post(key, data);
            let table = this._clientDriver.get(key) ?? [];
            table.push(data);
            this._clientDriver.set(key, table);

            return data;
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {void}
     */
    async update(key, data) {
        if (this._isKey(key) && typeof data === 'object' && key.split('/').length === 2 && ! isNaN(Number(key.split('/')[1]))) {
            data = await this._serverDriver.patch(key, data);
            let table = this._clientDriver.get(key);
            table[table.findIndex((v) => v.id === data.id)] = data;
            this._clientDriver.set(key, table);
        }
    }

    delete(key) {
        if (this._isKey(key) && typeof data === 'object' && key.split('/').length === 2 && ! isNaN(Number(key.split('/')[1]))) {
            this._clientDriver.remove(key);
            this._serverDriver.delete(key);
        }
    }

    _isKey(key) {
        return key && typeof key === 'string';
    }
}

export default Database;