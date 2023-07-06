import { isObject } from "../helpers";
import Configuration from "./Configuration";
import FactoryInterface from "@/Interfaces/FactoryInterface";

class ConfigurationFactory extends FactoryInterface
{
    _default = {};

    /**
     * 
     * @param {Object|null} configuration 
     */
    constructor(configuration = null) {
        super();
        this.default(configuration);
    }

    /**
     * 
     * @param {Object|null} configuration 
     * @returns {Configuration}
     */
    make(configuration = null) {
        this.default(configuration);

        return new Configuration(this._default);
    }

    /**
     * 
     * @param {Object} configuration 
     * @returns {this}
     */
    default(configuration) {
        if (isObject(configuration)) {
            this._default = configuration;
        }

        return this;
    }
}

export default ConfigurationFactory;