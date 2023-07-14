import Cache from "../Cache/Cache";
import Facade from "./Facade";

class CacheFacade extends Facade
{
    /**
     * 
     * @param {String} key 
     * @param {any} value 
     * @returns {void}
     */
    static set(key, value) {
        Cache.getInstance().set(key, value);
    }

    /**
     * 
     * @param {String} key 
     * @param {any} defaultValue 
     * @returns {any}
     */
    static get(key, defaultValue = null) {
        return Cache.getInstance().get(key, defaultValue);
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    static has(key) {
        return Cache.getInstance().has(key);
    }

    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    static remove(key) {
        Cache.getInstance().remove(key);
    }

    /**
     * @returns {void}
     */
    static clear() {
        Cache.getInstance().clear();
    }

    /**
     * @returns {Object}
     */
    static all() {
        return Cache.getInstance().all();
    }
}

export default CacheFacade;
