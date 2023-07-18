import AxiosServerDriver from "../Database/Drivers/AxiosServerDriver";
import Facade from "./Facade";

class AxiosServerDriverFacade extends Facade
{
    /**
     * 
     * @param {String} url 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    static get(url, config = null) {
        return AxiosServerDriver.getInstance().get(url, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    static post(url, data = null, config = null) {
        return AxiosServerDriver.getInstance().post(url, data, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    static patch(url, data = null, config = null) {
        return AxiosServerDriver.getInstance().patch(url, data, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    static delete(url, config = null) {
        return AxiosServerDriver.getInstance().delete(url, config);
    }
}

export default AxiosServerDriverFacade;
