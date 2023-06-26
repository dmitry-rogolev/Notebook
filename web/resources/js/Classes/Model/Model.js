import Cache from "../Cache";
import Configuration from "../Configuration";
import Database from "../Database/Database";
import AxiosServerDriver from "../Database/Drivers/AxiosServerDriver";
import { reactive } from 'vue';

class Model
{
    static _database = Database.factory(AxiosServerDriver.getInstance()).make();
    static _configuration = Configuration.getInstance();

    static _table = 'models';
    static _primaryKey = Model._configuration.getModelIdName();

    _originals = {};
    _attributes = {};
    _defaults = {};
    _isDirty = false;

    /**
     * @property {String}
     */
    get table() {
        return this._table;
    }

    /**
     * @property {String}
     */
    get primaryKey() {
        return this._primaryKey;
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
     * 
     * @param {String} table
     * @param {Object} originals 
     */
    constructor(originals = {}) {
        if (typeof originals !== 'object') {
            throw new Error('The "originals" parameter must be an object.');
        }

        this._originals = this._parseTimestamps(originals);

        let attributes = this._getAttributesFromCache(originals);

        if (attributes) {
            this._attributes = this._parseTimestamps(attributes);

            if (this.isChanged()) {
                this._isDirty = true;
            }
        } else {
            this._attributes = Object.assign({}, this._originals);
        }
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    getAttribute(attribute) {
        if (typeof attribute !== 'string') {
            throw new Error('The "attribute" parameter must be a string.');
        }

        return this._attributes[attribute];
    }

    /**
     * 
     * @param {String} attribute 
     * @returns {any}
     */
    getOriginalAttribute(attribute) {
        if (typeof attribute !== 'string') {
            throw new Error('The "attribute" parameter must be a string.');
        }

        return this._originals[attribute];
    }

    /**
     * 
     * @param {String} attribute 
     * @param {any} value 
     * @returns {void}
     */
    setAttribute(attribute, value) {
        if (typeof attribute !== 'string') {
            throw new Error('The "attribute" parameter must be a string.');
        }

        if (attribute in this._attributes && this._attributes[attribute] !== value) {
            this._attributes[attribute] = value;
            this._isDirty = true;
            this._cacheAttributes();
        } 

        return this;
    }

    /**
     * 
     * @param {Object} attributes 
     */
    fill(attributes) {
        if (typeof attributes !== 'object') {
            throw new Error('The "attributes" parameter must be an object.');
        }

        for (let attribute in attributes) {
            if (attribute in this._attributes && this._attributes[attribute] !== attributes[attribute]) {
                this._attributes[attribute] = attributes[attribute];
                this._isDirty = true;
            }
        }

        this._cacheAttributes();

        return this;
    }

    /**
     * 
     * @returns {Array|null}
     */
    static async all() {
        let data = await this._database.get(this._table);

        if (data) {
            let models = [];

            for (let model of data) {
                models.push(this._proxy(reactive(new this(model))));
            }

            return models;
        }

        return null;
    }

    /**
     * 
     * @param {String} table
     * @param {Object} attributes 
     * @returns {Model}
     */
    static async create(attributes = {}) {
        if (typeof attributes !== 'object') {
            throw new Error('The "attributes" parameter must be an object.');
        }

        let data = await this._database.store(this._table, attributes);

        return this._proxy(reactive(new this(data)));
    }

    /**
     * @returns {void}
     */
    async save() {
        if (this._isDirty) {
            let data = await this.constructor._database.update(this.constructor._table + '/' + this._originals[this.constructor._primaryKey], this._attributes);

            if (data) {
                this._originals = this._parseTimestamps(data);
                this._attributes = Object.assign({}, this._originals);
                this._isDirty = false;
                this._removeCacheAttributes();
            }
        }
    }

    /**
     * @returns {void}
     */
    async delete() {
        await this.constructor._database.delete(this.constructor._table + '/' + this._originals[this.constructor._primaryKey]);
        this._removeCacheAttributes();
    }

    /**
     * 
     * @returns {Boolean}
     */
    isChanged() {
        let dirty = false;

        for (let attribute in this._attributes) {
            if (this._attributes[attribute] !== this._originals[attribute]) {
                dirty = true;
                break;
            }
        }

        return dirty;
    }

    /**
     * 
     * @param {Object} attributes 
     * @returns {void}
     */
    _cacheAttributes(attributes = null) {
        if (! attributes) {
            attributes = this._attributes;
        }

        let models = this._getCache();

        if (Array.isArray(models)) {
            let index = models.findIndex((v) => v.id === attributes[this.constructor._configuration.getModelIdName()]);

            if (index !== -1) {
                models[index] = attributes;
                this._setCache(models);
            } else {
                models.push(attributes);
                this._setCache(models);
            }
        } else {
            models = [];
            models.push(attributes);
            this._setCache(models);
        }
    }

    /**
     * 
     * @param {Object} attributes 
     * @returns {any}
     */
    _getAttributesFromCache(attributes = null) {
        if (! attributes) {
            attributes = this._attributes;
        }

        let models = this._getCache();

        if (models && Array.isArray(models)) {
            let model = models.find((v) => v.id === attributes[this.constructor._configuration.getModelIdName()]);

            if (model !== undefined) {
                return model;
            }
        }

        return null;
    }

    _removeCacheAttributes(attributes = null) {
        if (! attributes) {
            attributes = this._attributes;
        }

        let models = this._getCache();

        if (models && Array.isArray(models)) {
            let index = models.findIndex((v) => v.id === attributes[this.constructor._configuration.getModelIdName()]);

            if (index !== -1) {
                models.splice(index, 1);
                this._setCache(models);
            }
        }
    }

    /**
     * 
     * @returns {void}
     */
    _getCache() {
        return Cache.get(this.constructor._configuration.getModelCachePrefix() + this.constructor._table);
    }

    /**
     * 
     * @param {any} cache 
     * @returns {void}
     */
    _setCache(cache) {
        Cache.add(this.constructor._configuration.getModelCachePrefix() + this.constructor._table, cache);
    }

    /**
     * 
     * @param {Object} attributes 
     * @returns {Object}
     */
    _parseTimestamps(attributes) {
        if (typeof attributes !== 'object') {
            throw new Error('The "attributes" parameter must be an object.');
        }

        let created_at = this.constructor._configuration.getModelCreatedAt();
        let updated_at = this.constructor._configuration.getModelUpdatedAt();

        if (created_at in attributes) {
            attributes[created_at] = new Date(attributes[created_at]);
        }

        if (updated_at in attributes) {
            attributes[updated_at] = new Date(attributes[updated_at]);
        }

        return attributes;
    }

    static _proxy(model) {
        return new Proxy(model, {
            get(target, property, receiver) {
                if (property in target) {
                    return target[property];
                }

                if (property in target._attributes && target._attributes[property] !== null) {
                    return target._attributes[property];
                }

                if (property in target._defaults && target._defaults[property] !== null) {
                    return target._defaults[property];
                }

                return Reflect.get(target, property, receiver);
            }, 
            set(target, property, value, receiver) {
                if (property in target) {
                    target[property] = value;
                    return true;
                }

                if (property in target._attributes) {
                    target._attributes[property] = value;

                    if (target.isChanged()) {
                        target._isDirty = true;
                        target._cacheAttributes();
                    } else {
                        target._isDirty = false;
                        target._removeCacheAttributes();
                    }
                    
                    return true;
                }

                return Reflect.set(target, property, value, receiver);
            }, 
        });
    }
}

export default Model;
