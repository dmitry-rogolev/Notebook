import Cache from "./Cache/Cache";
import NotTypeError from "./Errors/NotTypeError";
import CacheFacade from "./Facades/Cache";
import ConfigurationFacade from "./Facades/Configuration";

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isObject(value) {
    return typeof value === 'object';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isString(value) {
    return typeof value === 'string';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isNumber(value) {
    return typeof value === 'number';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isFunction(value) {
    return typeof value === 'function';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isNull(value) {
    return value === null;
}

/**
 * 
 * @param {any} value 
 * @param {String} type
 * @returns {Boolean}
 */
export function is(value, type) {
    return typeof value === type;
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isArray(value) {
    return Array.isArray(value);
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function empty(value) {
    if (isArray(value) || isString(value)) {
        return ! value.length;
    }

    if (isObject(value)) {
        return ! Object.keys(value).length;
    }

    return ! value;
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function notEmpty(value) {
    return ! empty(value);
}

/**
 * 
 * @param {any} value 
 * @returns {String}
 */
export function toJson(value) {
    if (! isJson(value)) {
        return JSON.stringify(value);
    }

    return value;
}

/**
 * 
 * @param {String} value 
 * @returns {any}
 */
export function parseJson(value) {
    if (isJson(value)) {
        return JSON.parse(value);
    }

    return value;
}

/**
 * 
 * @param {any} value 
 * @returns {Boolean}
 */
export function isJson(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 
 * @param {Object|Array} array 
 * @param {String|Number} key 
 * @returns {any}
 */
export function getValue(array, key) {
    if (isArray(array) && isNumber(key)) {
        return array[key];
    }

    if (! isString(key)) {
        return array;
    }

    let keys = key.split('.');
    let value = array;

    for (let key of keys) {
        if (isArray(value) && Number(key)) {
            value = value[key];
        } else if (isObject(value)) {
            value = value[key];
        } else {
            break;
        }
    }

    return value;
}

/**
 * 
 * @param {String} key 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function config(key, defaultValue = null) {
    return ConfigurationFacade.get(key, defaultValue);
}

/**
 * 
 * @param {String} key 
 * @param {any} value 
 * @param {any} defaultValue 
 * @returns {any}
 */
export function cache(key = null, value = null, defaultValue = null) {
    if (isNull(key)) {
        return Cache.getInstance();    
    }

    if (! isString(key)) {
        throw new NotTypeError('key', 'string');
    }

    if (isNull(value)) {
        return CacheFacade.get(key, defaultValue);
    }

    CacheFacade.set(key, value);
}