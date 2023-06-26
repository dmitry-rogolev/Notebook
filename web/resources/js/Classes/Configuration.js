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
    getModelCachePrefix() {
        return String(this.configurations.model.cache.prefix);
    }
}

export default Configuration;