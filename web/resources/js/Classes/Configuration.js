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
        return Boolean(this.configurations.init.window.open);
    }

    /**
     * 
     * @returns {String}
     */
    getOpenItemAfterInit() {
        return String(this.configurations.init.window.item);
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
    getDataIdName() {
        return String(this.configurations.data.id);
    }
}

export default Configuration;