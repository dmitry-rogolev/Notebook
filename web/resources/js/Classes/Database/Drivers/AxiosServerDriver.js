import DriverInterface from "@/Interfaces/DriverInterface";
import Configuration from "../../Configuration/Configuration";

class AxiosServerDriver extends DriverInterface
{
    static _instance = null;
    _configuration = null;

    constructor() {
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
     * @param {String} key 
     * @param {any|null} value default value
     * @returns {any}
     */
    get(key, value = null) {
        if (this._isKey(key)) {
            axios.get()
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @param {any} value 
     * @returns {Boolean}
     */
    set(key, value) {
        if (this._isKey(key)) {
            localStorage.setItem(key, value);
        }

        return false;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        if (this._isKey(key) && localStorage.getItem(key) !== null) {
            return true;
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
}

export default AxiosServerDriver;