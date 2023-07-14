import Cache from "./Cache/Cache";
import NotTypeError from "./Errors/NotTypeError";
import CacheFacade from "./Facades/Cache";
import ConfigurationFacade from "./Facades/Configuration";
import { v4 } from 'uuid';

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

/**
 * 
 * @returns {Number}
 */
export function time() {
    return (new Date).getTime();
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export function rand(min = 0, max = 100) {
    if (! isNumber(min)) {
        throw new NotTypeError('min', 'number');
    }

    if (! isNumber(max)) {
        throw new NotTypeError('max', 'number');
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 
 * @returns {String}
 */
export function uuid() {
    return v4();
}

/**
 * 
 * @param {Number} num 
 * @returns {String}
 */
export function zero(num) {
    if (! isNumber(num)) {
        throw new NotTypeError('num', 'number');
    }

    if (num < 10) {
        num = '0' + String(num);
    } else {
        num = String(num);
    }

    return num;
}

/**
 * 
 * @param {Date} date 
 * @returns {String}
 */
export function timestamp(date = null) {
    if (! isNull(date) && date instanceof Date) {
        throw new NotTypeError(date, Date.name);
    }

    date = date ?? new Date();
    return `${date.getUTCFullYear()}-${zero(date.getUTCMonth() + 1)}-${zero(date.getUTCDate())}T${zero(date.getUTCHours())}:${zero(date.getUTCMinutes())}:${zero(date.getUTCSeconds())}.${date.getUTCMilliseconds()}000Z`;
}

/**
 * 
 * @param {Function} heandler
 * @param {Number} timeout 
 * @returns {Promise}
 */
export async function delay(heandler, timeout = 100) {
    if (! isFunction(heandler)) {
        throw new NotTypeError('heandler', 'function');
    }

    if (! isNumber(timeout)) {
        throw new NotTypeError('timeout', 'number');
    }

    return new Promise((resolve) => 
        setTimeout(() => resolve(heandler()), timeout)
    );
}

/**
 * 
 * @param {Number} timeout 
 * @returns {Promise}
 */
export async function sleep(timeout = 100) {
    if (! isNumber(timeout)) {
        throw new NotTypeError('timeout', 'number');
    }

    return new Promise((resolve) => setTimeout(() => resolve(), timeout));
}
  