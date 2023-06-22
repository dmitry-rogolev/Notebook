import Configuration from "./Configuration";
import FactoryInterface from "@/Interfaces/FactoryInterface";

class ConfigurationFactory extends FactoryInterface
{
    _default = {};

    /**
     * 
     * @returns {Configuration}
     */
    make() {
        return new Configuration(this._default);
    }

    /**
     * 
     * @param {Object} configuration 
     * @returns {this}
     */
    default(configuration) {
        if (typeof configuration === 'object') {
            this._default = configuration;
        }

        return this;
    }
}

export default ConfigurationFactory;