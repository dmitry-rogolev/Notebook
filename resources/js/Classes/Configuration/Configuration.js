import { getValue, isNull, isString, isUndefined } from "../helpers";
import config from '../../config.json';
import NotTypeError from "../Errors/NotTypeError";

class Configuration 
{
    static _instance = null;

    _configurations = {};

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
     * @param {any} defaultValue
     * @returns {any}
     */
    get(key, defaultValue = null) {
        if (! isString(key)) {
            throw new NotTypeError('key', 'string');
        }

        let value = getValue(this._configurations, key);

        if (isUndefined(value) || isNull(value)) {
            return defaultValue;
        }

        return value;
    }
}

export default Configuration;