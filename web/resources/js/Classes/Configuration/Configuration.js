import ConfigurationFactory from "./ConfigurationFactory";
import { isObject, isString } from "../helpers";

class Configuration 
{
    _configurations = {};

    /**
     * @property {Object}
     */
    get configurations() {
        return this._configurations;
    }

    /**
     * 
     * @param {Object|null} configuration 
     */
    constructor(configuration = null) {
        if (isObject(configuration)) {
            this._configurations = configuration;
        }
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @returns {this}
     */
    set(key, value) {
        if (key && isString(value)) {
            this._configurations[key] = value;
        }

        return this;
    }

    /**
     * 
     * @param {String} key 
     * @returns {any|null}
     */
    get(key) {
        if (this.has(key)) {
            return this._configurations[key];
        }

        return null;
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        if (key && isString(key)) {
            return key in this._configurations;
        }

        return false;
    }

    /**
     * 
     * @returns {ConfigurationFactory}
     */
    static factory(configuration = null) {
        return new ConfigurationFactory(configuration);
    }
}

export default Configuration;