import AxiosServerDriver from "../Database/Drivers/AxiosServerDriver";
import Facade from "./Facade";

class AxiosServerDriverFacade extends Facade
{
    /**
     * 
     * @param {String} url 
     * @returns {Promise}
     */
    static get(url) {
        return AxiosServerDriver.getInstance().get(url);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {Promise}
     */
    static post(url, data) {
        return AxiosServerDriver.getInstance().post(url, data);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {Promise}
     */
    static patch(url, data) {
        return AxiosServerDriver.getInstance().patch(url, data);
    }

    /**
     * 
     * @param {String} url 
     * @returns {Promise}
     */
    static delete(url) {
        return AxiosServerDriver.getInstance().delete(url);
    }
}

export default AxiosServerDriverFacade;
