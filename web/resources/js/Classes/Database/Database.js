import DriverInterface from "../../Interfaces/DriverInterface";

class Database
{
    _driver = null;

    constructor(driver) {
        if (! (driver instanceof DriverInterface)) {
            throw new Error('The driver must be extends from Interfaces/DriverInterface.');
        }

        this._driver = driver;
    }

    /**
     * 
     * @param {String} key 
     * @param {any|null} value default value
     * @returns {any}
     */
    get(key, value = null) {
        return this._driver.get(key, value);
    }

    /**
     * 
     * @param {String} key 
     * @param {any} value 
     * @returns {Boolean}
     */
    set(key, value) {
        return this._driver.set(key, value);
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        return this._driver.has(key);
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
        this._driver.clear();
    }
}

export default Database;