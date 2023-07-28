import { usePage } from "@inertiajs/vue3";
import DriverInterface from "../Interfaces/DriverInterface";
import Cache from "./Cache/Cache";
import Database from "./Database/Database";
import AxiosServerDriver from "./Database/Drivers/AxiosServerDriver";
import NotTypeError from "./Errors/NotTypeError";
import AxiosServerDriverFacade from "./Facades/AxiosServerDriver";
import CacheFacade from "./Facades/Cache";
import ConfigurationFacade from "./Facades/Configuration";
import { v4 } from 'uuid';
import LocalStorageDriver from "./Database/Drivers/LocalStorageDriver";
import plur from 'pluralize';
import moment from 'moment';
import Model from "./Model/Model";
import { Inertia } from "@inertiajs/inertia";
import { router as inertiaRouter } from "@inertiajs/vue3";

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

    for (let i = 0; i < keys.length; i++) {
        if (isArray(value) && ! isNaN(Number(keys[i]))) {
            if (i === keys.length - 1) {
                return value[Number(keys[i])];
            } else {
                value = value[Number(keys[i])];
            }
        } else if (isObject(value) && ! isArray(value)) {
            if (i === keys.length - 1) {
                return value[keys[i]];
            } else {
                value = value[keys[i]];
            }
        } else {
            break;
        }
    }

    return undefined;
}

/**
 * 
 * @param {Object|Array} array 
 * @param {String|Number} key 
 * @param {any} value
 * @returns {Object|Array}
 */
export function setValue(array, key, value) {
    if (isArray(array) && isNumber(key)) {
        array[key] = value;
        return array;
    }

    if (! isString(key)) {
        return array;
    }

    let keys = key.split('.');
    let v = array;

    for (let i = 0; i < keys.length; i++) {
        if (isArray(v) && ! isNaN(Number(keys[i]))) {
            if (! isUndefined(v[Number(keys[i])])) {
                if (i === keys.length - 1) {
                    v[Number(keys[i])] = value;
                } else {
                    v = v[Number(keys[i])];
                }
            } else {
                if (i === keys.length - 1) {
                    v[Number(keys[i])] = value;
                } else {
                    if (! isNaN(Number(keys[i + 1]))) {
                        v[Number(keys[i])] = [];
                        v = v[Number(keys[i])];
                    } else {
                        v[keys[i]] = {};
                        v = v[keys[i]];
                    }
                }
            }
        } else if (isObject(v) && ! isArray(v)) {
            if (keys[i] in v) {
                if (i === keys.length - 1) {
                    v[keys[i]] = value;
                } else {
                    v = v[keys[i]];
                }
            } else {
                if (i === keys.length - 1) {
                    v[keys[i]] = value;
                } else {
                    if (! isNaN(Number(keys[i + 1]))) {
                        v[keys[i]] = [];
                        v = v[keys[i]];
                    } else {
                        v[keys[i]] = {};
                        v = v[keys[i]];
                    }
                }
            }
        } else {
            break;
        }
    }

    return array;
}

/**
 * 
 * @param {Object|Array} array 
 * @param {String|Number} key 
 * @returns {any}
 */
export function removeValue(array, key) {
    if (isArray(array) && isNumber(key)) {
        array.splice(key, 1);
        return array;
    }

    if (! isString(key)) {
        return array;
    }

    let keys = key.split('.');
    let value = array;

    for (let i = 0; i < keys.length; i++) {
        if (isArray(value) && ! isNaN(Number(keys[i]))) {
            if (i === keys.length - 1) {
                value.splice(Number(keys[i]), 1);
            } else {
                value = value[Number(keys[i])];
            }
        } else if (isObject(value) && ! isArray(value)) {
            if (i === keys.length - 1) {
                delete value[keys[i]];
            } else {
                value = value[keys[i]];
            }
        } else {
            break;
        }
    }

    return array;
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

/**
 * 
 * @param {String} name 
 * @returns {any}
 */
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * 
 * @param {String} name 
 * @param {String} value 
 * @param {Object} options 
 */
export function setCookie(name, value, options = {}) {

    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
}

/**
 * 
 * @param {String} name 
 */
export function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
}

/**
 * @returns {void}
 */
export async function csrfCookie() {
    return AxiosServerDriverFacade.get('/sanctum/csrf-cookie');
}

/**
 * @returns {AxiosServerDriver}
 */
export function serverDriver() {
    return AxiosServerDriver.getInstance();
}

/**
 * @returns {LocalStorageDriver}
 */
export function clientDriver() {
    return LocalStorageDriver.getInstance();
}

/**
 * @returns {DriverInterface}
 */
export async function driver() {
    if (! (await isAuth())) {
        return clientDriver();
    }

    return serverDriver();
}

/**
 * 
 * @param {Array} array 
 * @param {Number|String} id 
 */
export function getIndexById(array, id) {
    if (! isArray(array)) {
        throw new NotTypeError('array', 'array');
    }

    if (! isNumber(id) && ! isString(id)) {
        throw new NotTypeError('id', 'Number|String');
    }

    return array.findIndex((v) => v[config('model.primary_key')] === id);
}

/**
 * 
 * @param {String|URL} url 
 * @returns {URL}
 */
export function url(url) {
    return (new URL(url, config('app_url', 'http://127.0.0.1:8000')));
} 

/**
 * 
 * @param {String} path 
 * @returns {Array}
 */
export function keysByUrl(path) {
    let keys = url(path).pathname.split('/').filter((v) => v !== '');

    if (keys[0] === config('routes.api.prefix', Database.DEFAULT_API_PREFIX)) {
        keys = keys.slice(1);
    }

    if (keys.length === 0) {
        keys[0] = '';
    }

    return keys;
}

/**
 * @returns {Object|null}
 */
export async function user() {
    let u = usePage()?.props?.auth?.user;

    if (! u) {
        if (isUndefined(getCookie('XSRF-TOKEN'))) {
            await csrfCookie();
        }

        try {
            let response = await serverDriver().get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/user`);
            u = response?.data;
        } catch (e) {}
    }

    return u ? u : null;
}

/**
 * 
 * @param {String} word 
 * @param {Number|null} count 
 * @param {Boolean} inclusive 
 * @returns {String}
 */
export function pluralize(word, count = null, inclusive = false) {
    return plur(word, count, inclusive);
}

/**
 * 
 * @param {Object} attributes 
 * @param {Array} keys 
 * @returns {Object}
 */
export function timestamps(attributes, keys) {
    if (! isObject(attributes)) {
        throw new NotTypeError('attributes', 'object');
    }

    if (! isArray(keys)) {
        throw new NotTypeError('keys', 'array');
    }

    for (let key of keys) {
        if (isDateFormatISO8601(attributes[key])) {
            attributes[key] = new Date(attributes[key]);
        } else if (! (attributes[key] instanceof Date)) {
            attributes[key] = null;
        }
    }

    return attributes;
}

/**
 * 
 * @param {String} date 
 * @returns {Boolean}
 */
export function isDateFormatISO8601(date) {
    if (! isString(date)) {
        return false;
    }

    return moment(date, moment.ISO_8601, true).isValid();
}

/**
 * 
 * @param {Object} model 
 * @returns {Object}
 */
export function identifiable(model) {
    if (! isObject(model) || config('model.primary_key', Model.DEFAULT_PRIMARY_KEY) in model) {
        return model;
    }

    model[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)] = uuid();

    return model;
}

/**
 * 
 * @returns {Boolean}
 */
export async function isAuth() {
    return ! isNull(await user());
}

/**
 * 
 * @returns {Object}
 */
export function app() {
    return window.app;
}

/**
 * 
 * @returns {Object}
 */
export function store() {
    return plugin('store');
}

/**
 * 
 * @returns {Object}
 */
export function inertia() {
    return Inertia;
}

/**
 * 
 * @param {String} plugin 
 * @returns {any}
 */
export function plugin(plugin) {
    if (! isString(plugin)) {
        throw new NotTypeError('plugin', 'string');
    }

    return app().config.globalProperties[`$${plugin}`];
}

/**
 * 
 * @param {String} str 
 * @returns {String}
 */
export function t(str) {
    if (! isString(str)) {
        throw new NotTypeError('str', 'string');
    }
    
    return plugin('t')(str);
}

/**
 * 
 * @param {String} element 
 * @returns {HTMLElement}
 */
export function createElement(element) {
    if (! isString(element)) {
        throw new NotTypeError('element', 'string');
    }

    return document.createElement(element);
}

/**
 * 
 */
export function router() {
    return inertiaRouter;
}
