import ConfigurationFactory from "./ConfigurationFactory";

class Configuration 
{
    _configurations = {};

    get configurations() {
        return this._configurations;
    }

    constructor(configuration = null) {
        if (configuration && typeof configuration === 'object') {
            this._configurations = configuration;
        }
    }

    /**
     * 
     * @param {string} key 
     * @param {any} value 
     * @returns {this}
     */
    add(key, value) {
        if (this._isKey(key)) {
            this._configurations[key] = value;
        }

        return this;
    }

    /**
     * 
     * @param {String} key 
     * @returns {String|null}
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
        if (this._isKey(key)) {
            return key in this._configurations;
        }

        return false;
    }

    /**
     * 
     * @returns {ConfigurationFactory}
     */
    static factory() {
        return new ConfigurationFactory();
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

export default Configuration;