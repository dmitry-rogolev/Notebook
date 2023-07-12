import { getValue, isNull, isObject, isUndefined } from "../helpers";
import config from '../../config.json';

class Configuration 
{
    static _instance = null;

    _configurations = {};

    /**
     * @property {Object}
     */
    get configurations() {
        return this._configurations;
    }

    constructor() {
        this._configurations = config;
    }

    /**
     * 
     * @returns {Configuration}
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
     * @returns {any}
     */
    get(key, defaultValue = null) {
        let value = getValue(this._configurations, key);

        if (isUndefined(value) || isNull(value)) {
            return defaultValue;
        }

        return value;
    }
}

export default Configuration;