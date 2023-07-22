import Database from "../Database/Database";
import Facade from "./Facade";

class DatabaseFacade extends Facade 
{
    /**
     * 
     * @param {String} url 
     * @returns {any}
     */
    static async get(url, ...params) {
        return Database.getInstance().get(url, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    static async store(url, data, ...params) {
        return Database.getInstance().store(url, data, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {any}
     */
    static async update(url, data, ...params) {
        return Database.getInstance().update(url, data, ...params);
    }

    /**
     * 
     * @param {String} url 
     * @returns {void}
     */
    static async delete(url, ...params) {
        return Database.getInstance().delete(url, ...params);
    }
}

export default DatabaseFacade;
