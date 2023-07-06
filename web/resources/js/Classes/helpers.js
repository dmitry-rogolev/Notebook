
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
        return !! value.length;
    }

    if (isObject(value)) {
        return !! value.keys().length;
    }

    return true;
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