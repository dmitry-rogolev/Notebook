import { reactive } from 'vue';
import { cache, config, driver, identifiable, isArray, isAuth, isNull, isObject, isString, isUndefined, notEmpty, pluralize, timestamps } from '../helpers';
import NotTypeError from '../Errors/NotTypeError';
import DatabaseFacade from '../Facades/DatabaseFacade';
import Database from '../Database/Database';
import LocalStorageDriver from '../Database/Drivers/LocalStorageDriver';
import ServerFacade from '../Facades/Server';

class Model
{
    static DEFAULT_PRIMARY_KEY = 'id';
    static DEFAULT_CREATED_AT = 'created_at';
    static DEFAULT_UPDATED_AT = 'updated_at';
    static DEFAULT_DELETED_AT = 'deleted_at';
    static DEFAULT_UUID_PREFIX = 'id:';
    static DEFAULT_CACHE_PREFIX = 'model_';
    static DEFAULT_TRASHED_PREFIX = 'trash';

    _originals = {};
    _attributes = {};
    _isDirty = false;
    _isTrashed = false;
    _table = '';

    /**
     * @property {String}
     */
    get table() {
        if (! this._table) {
            this._table = this.getTable();
        }

        return this._table;
    }

    /**
     * @property {String|Number}
     */
    get key() {
        return this.primaryKey;
    }

    /**
     * @property {String|Number}
     */
    get primaryKey() {
        return this.getPrimaryKey();
    }

    /**
     * @property {Boolean}
     */
    get isDirty() {
        return this._isDirty;
    }

    /**
     * @property {Boolean}
     */
    get isClean() {
        return ! this._isDirty;
    }

    /**
     * @property {Boolean}
     */
    get isTrashed() {
        return this._isTrashed;
    }

    /**
     * 
     * @param {String} table
     * @param {Object} originals 
     */
    constructor(originals = {}) {
        if (! isObject(originals)) {
            throw new NotTypeError('originals', 'object')
        }

        let keys = [config('model.created_at', Model.DEFAULT_CREATED_AT), config('model.updated_at', Model.DEFAULT_UPDATED_AT), config('model.deleted_at', Model.DEFAULT_DELETED_AT)];

        this._originals = timestamps(identifiable(originals), keys);
        this._attributes = timestamps(this._getAttributes(), keys);

        if (this.dirty()) {
            this._isDirty = true;
        }

        if (this.trashed()) {
            this._isTrashed = true;
        }
    }

    /**
     * 
     * @returns {String}
     */
    static getTable() {
        return pluralize(this.name.toLowerCase());
    }

    /**
     * 
     * @returns {String}
     */
    getTable() {
        return pluralize(this.constructor.name.toLowerCase());
    }

    /**
     * 
     * @returns {Number|String}
     */
    getPrimaryKey() {
        return this.getOriginalAttribute(config('model.primary_key', Model.DEFAULT_PRIMARY_KEY));
    }

    /**
     * 
     * @returns {Boolean}
     */
    dirty() {
        for (let attribute in this._attributes) {
            if (this._attributes[attribute] !== this._originals[attribute]) {
                return true;
            }
        }

        return false;
    }

    /**
     * 
     * @returns {Boolean}
     */
    trashed() {
        return ! isNull(this.getOriginalAttribute(config('model.deleted_at', Model.DEFAULT_DELETED_AT)));
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    getAttribute(attribute) {
        if (! isString(attribute)) {
            throw new NotTypeError('attribute', 'string');
        }

        return this._attributes[attribute];
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    hasAttribute(attribute) {
        if (! isString(attribute)) {
            throw new NotTypeError('attribute', 'string');
        }

        return attribute in this._attributes;
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    getOriginalAttribute(attribute) {
        if (! isString(attribute)) {
            throw new NotTypeError('attribute', 'string');
        }

        return this._originals[attribute];
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    hasOriginalAttribute(attribute) {
        if (! isString(attribute)) {
            throw new NotTypeError('attribute', 'string');
        }

        return attribute in this._originals;
    }

    /**
     * 
     * @param {String} attribute 
     * @param {any} value 
     * @returns {void}
     */
    setAttribute(attribute, value) {
        if (! isString(attribute)) {
            throw new NotTypeError('attribute', 'string');
        }

        if (attribute in this._attributes && this._attributes[attribute] !== value) {
            this._attributes[attribute] = value;
            this._isDirty = this.dirty();

            if (this._isDirty) {
                this._setAttributes();
            } else {
                this._removeAttributes();
            }
        } 

        return this;
    }

    /**
     * 
     * @param {Object} attributes 
     */
    fill(attributes) {
        if (! isObject(attributes)) {
            throw new NotTypeError('attributes', 'object')
        }

        for (let attribute in attributes) {
            if (attribute in this._attributes && this._attributes[attribute] !== attributes[attribute]) {
                this._attributes[attribute] = attributes[attribute];
            } 
        }

        this._isDirty = this.dirty();
    
        if (this._isDirty) {
            this._setAttributes();
        } else {
            this._removeAttributes();
        }

        return this;
    }

    /**
     * 
     * @returns {Array}
     */
    static async all(onlyTrashed = false) {
        let data = (await DatabaseFacade.get(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${onlyTrashed ? config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX) : ''}${this.getTable()}`))?.data?.data;
        let models = [];

        if (! isNull(data) && isArray(data)) {
            for (let model of data) {
                models.push(Model.proxy(reactive(new this(model))));
            }
        }

        return models;
    }

    /**
     * 
     * @returns {Array|null}
     */
    // static async allOnlyTrash() {
    //     let data = await this._database.get(this._table + '/' + this._configuration.getPathTrash());

    //     if (data) {
    //         let models = [];

    //         for (let model of data) {
    //             let proxy = this._proxy(reactive(new this(model)));
    //             proxy._isTrashed = true;
    //             models.push(proxy);
    //         }

    //         return models;
    //     }

    //     return null;
    // }

    /**
     * 
     * @param {String} table
     * @param {Object} attributes 
     * @returns {Model}
     */
    static async create(attributes = {}) {
        if (! isObject(attributes)) {
            throw new NotTypeError('attributes', 'object');
        }

        let data = (await DatabaseFacade.store(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${this.getTable()}`, attributes))?.data?.data;

        return Model.proxy(reactive(new this((isNull(data) || isUndefined(data)) ? attributes : data)));
    }

    /**
     * @returns {void}
     */
    async save() {
        if (this.isDirty) {
            let data = (await DatabaseFacade.update(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${this.table}/${this.primaryKey}`, this._attributes))?.data?.data;

            if (! isNull(data) || ! isUndefined(data)) {
                let keys = [config('model.created_at', Model.DEFAULT_CREATED_AT), config('model.updated_at', Model.DEFAULT_UPDATED_AT), config('model.deleted_at', Model.DEFAULT_DELETED_AT)];

                this._originals = timestamps(identifiable(data), keys);
                this._attributes = Object.assign({}, this._originals);

                this._isDirty = false;
                this._removeAttributes();
            }
        }
    }

    /**
     * @returns {void}
     */
    async delete() {
        await DatabaseFacade.delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${this.table}/${this.primaryKey}`);
        this._removeAttributes();

        if (! (await isAuth())) {
            await DatabaseFacade.store(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}${this.table}`, ServerFacade.delete(this._originals), true, false);
        }
    }

    /**
     * @returns {void}
     */
    async forceDelete() {
        if (! (await isAuth()) && ! this.isTrashed) {
            await DatabaseFacade.delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${this.table}/${this.primaryKey}`);
        } else {
            await DatabaseFacade.delete(`/${config('routes.api.prefix', Database.DEFAULT_API_PREFIX)}/${config('model.trashed.prefix', Model.DEFAULT_TRASHED_PREFIX)}${this.table}/${this.primaryKey}`);
        }

        this._removeAttributes();
    }

    /**
     * @returns {void}
     */
    static async truncate() {
        await this._database.truncate(this._table);
        this._removeCache();
    }

    /**
     * @returns {void}
     */
    static async truncateTrash() {
        await this._database.truncate(this._configuration.getUrlTrash(this._table));
        this._removeCache();
    }

    /**
     * @returns {void}
     */
    async restore() {
        await this.constructor._database.restore(this.constructor._configuration.getUrlRestore(this.constructor._table, this._originals[this.constructor._primaryKey]));
        this._isTrashed = false;
    }

    /**
     * @returns {void}
     */
    static async restoreTrash() {
        await this._database.restore(this._configuration.getUrlRestore(this._table));
    }

    /**
     * 
     * @returns {Object}
     */
    _getAttributes() {
        let primary_key = config('model.primary_key', Model.DEFAULT_PRIMARY_KEY);

        if (primary_key in this._originals) {
            let models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${this.table}`);

            if (isArray(models) && notEmpty(models)) {
                let id = this._originals[primary_key];

                let model = models.find((v) => {
                    if (isObject(v) && primary_key in v) {
                        return v[primary_key] === id;
                    }
    
                    return false;
                });
    
                if (! isUndefined(model)) {
                    return model;
                }
            }
        } 

        return Object.assign({}, this._originals);
    }

    _setAttributes() {
        let primary_key = config('model.primary_key', Model.DEFAULT_PRIMARY_KEY);
        let models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${this.table}`);

        if (isNull(models) || ! isArray(models)) {
            models = [];
        }

        let index = models.findIndex((v) => {
            if (isObject(v) && primary_key in v) {
                return v[primary_key] === this.primaryKey;
            }

            return false;
        });

        if (index === -1) {
            models.push(this._attributes);
        } else {
            models[index] = this._attributes;
        }

        cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${this.table}`, models);
    }

    /**
     * 
     * @returns {void}
     */
    _removeAttributes() {
        let primary_key = config('model.primary_key', Model.DEFAULT_PRIMARY_KEY);
        let models = cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${this.table}`);

        if (isNull(models) || ! isArray(models)) {
            return;
        }

        let index = models.findIndex((v) => {
            if (isObject(v) && primary_key in v) {
                return v[primary_key] === this.primaryKey;
            }

            return false;
        });

        if (index === -1) {
            return;
        }

        models.splice(index, 1);

        cache(`${config('model.cache.prefix', Model.DEFAULT_CACHE_PREFIX)}${this.table}`, models);
    }

    static proxy(model) {
        return new Proxy(model, {
            get(target, property, receiver) {
                if (property in target) {
                    return target[property];
                }

                if (isString(property) && target.hasAttribute(property)) {
                    return target.getAttribute(property);
                }

                return Reflect.get(target, property, receiver);
            }, 
            set(target, property, value, receiver) {
                if (property in target) {
                    target[property] = value;

                    return true;
                }

                if (isString(property) && target.hasAttribute(property)) {
                    target.setAttribute(property, value);

                    return true;
                }

                return Reflect.set(target, property, value, receiver);
            },
        });
    }
}

export default Model;
