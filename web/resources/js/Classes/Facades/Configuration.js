import Configuration from "../Configuration/Configuration";
import Facade from "./Facade";

class ConfigurationFacade extends Facade
{
    /**
     * 
     * @param {String} key 
     * @param {any} defaultValue
     * @returns {any}
     */
    static get(key, defaultValue = null) {
        return Configuration.getInstance().get(key, defaultValue);
    }
}

export default ConfigurationFacade;
