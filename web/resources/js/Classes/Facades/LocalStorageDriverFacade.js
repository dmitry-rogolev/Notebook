import FactoryInterface from "../../Interfaces/FactoryInterface";
import LocalStorageDriver from "../Database/Drivers/LocalStorageDriver";

class LocalStorageDriverFacade extends FactoryInterface
{
    /**
     * 
     * @param {String} url 
     * @param {Boolean} identifiable
     * @returns {any}
     */
    static get(url, identifiable = true) {
        return LocalStorageDriver.getInstance().get(url, identifiable);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Boolean} creatable
     * @param {Boolean} serverable
     * @param {Boolean} identifiable
     * @returns {any}
     */
    static post(url, data, creatable = true, serverable = true, identifiable = true) {
        return LocalStorageDriver.getInstance().post(url, data, creatable, serverable, identifiable);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Boolean} serverable
     * @param {Boolean} identifiable
     * @returns {any}
     */
    static patch(url, data, serverable = true, identifiable = true) {
        return LocalStorageDriver.getInstance().patch(url, data, serverable, identifiable);
    }

    /**
     * 
     * @param {String} url 
     * @param {Boolean} identifiable
     * @returns {void}
     */
    static delete(url, identifiable = true) {
        LocalStorageDriver.getInstance().delete(url, identifiable);
    }
}

export default LocalStorageDriverFacade;
