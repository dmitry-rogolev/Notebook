import Base from "@/Classes/Configuration/Configuration";
import config from '../config.json';
import Url from "@/Classes/Configuration/Url/Url";

class Configuration extends Base
{
    static _instance = null;

    constructor() {
        super(config);
    }

    /**
     * 
     * @returns {this}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * @returns {Url}
     */
    getUrl() {
        return new URL(Url.factory().makeBuilder().addPathname(this.configurations.url.prefix).make().render());
    }

    /**
     * 
     * @param {String} table 
     * @param {Number|String} model 
     * @returns {Url}
     */
    getUrlTrash(table, model = null) {
        if (typeof table !== 'string') {
            throw new Error('The "table" parameter must be a string.');
        }

        let path = table + '/' + this.configurations.url.trash;

        if (typeof model === 'number' || typeof model === 'string') {
            path += '/' + model;
        }
        
        return path;
    }

    /**
     * 
     * @param {String} table 
     * @param {Number|String} model 
     * @returns {Url}
     */
    getUrlRestore(table, model = null) {
        if (typeof table !== 'string') {
            throw new Error('The "table" parameter must be a string.');
        }

        let path = table + '/' + this.configurations.url.trash + '/';

        if (typeof model === 'number' || typeof model === 'string') {
            path += model + '/';
        }
        
        return path += this.configurations.url.restore;
    }

    /**
     * 
     * @returns {String}
     */
    getPathTrash() {
        return this.configurations.url.trash;
    }

    /**
     * 
     * @returns {String}
     */
    getPathRestore() {
        return this.configurations.url.restore;
    }

    /**
     * 
     * @returns {String}
     */
    getPathExport() {
        return this.configurations.url.export;
    }

    /**
     * 
     * @returns {Boolean}
     */
    getIsOpenWindowAfterInit() {
        return Boolean(this.configurations.window.open);
    }

    /**
     * 
     * @returns {String}
     */
    getOpenItemAfterInit() {
        return String(this.configurations.window.item);
    }

    /**
     * 
     * @returns {String}
     */
    getNotebookCachePrefix() {
        return String(this.configurations.notebook.cache.prefix);
    }

    /**
     * 
     * @returns {String}
     */
    getWindowCachePrefix() {
        return String(this.configurations.window.cache.prefix);
    }

    /**
     * 
     * @returns {String}
     */
    getSidebarCachePrefix() {
        return String(this.configurations.sidebar.cache.prefix);
    }

    /**
     * 
     * @returns {String}
     */
    getDatabaseCachePrefix() {
        return String(this.configurations.database.cache.prefix);
    }

    /**
     * 
     * @returns {Number}
     */
    getAutosaveInterval() {
        return Number(this.configurations.autosave.interval);
    }

    /**
     * 
     * @returns {String}
     */
    getModelIdName() {
        return String(this.configurations.model.id);
    }

    /**
     * 
     * @returns {String}
     */
    getModelCreatedAt() {
        return String(this.configurations.model.created_at);
    }

    /**
     * 
     * @returns {String}
     */
    getModelUpdatedAt() {
        return String(this.configurations.model.updated_at);
    }

    /**
     * 
     * @returns {String}
     */
    getModelDeletedAt() {
        return String(this.configurations.model.deleted_at);
    }

    /**
     * 
     * @returns {String}
     */
    getModelCachePrefix() {
        return String(this.configurations.model.cache.prefix);
    }
}

export default Configuration;