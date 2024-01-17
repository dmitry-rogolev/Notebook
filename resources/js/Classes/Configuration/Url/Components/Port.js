import { isString } from "../../../helpers";
import Component from "../Component";

class Port extends Component
{
    /**
     * 
     * @param {String} port 
     */
    constructor(port = '') {
        super();
        
        let component = '';

        if (port && isString(port)) {
            component = port;

            if (! component.startsWith(':')) {
                component = ':' + component;
            }

            if (component.endsWith('/')) {
                component = component.slice(0, -1);
            }
        } else {
            component = ':' + window.location.port;
        }

        this._component = component;
    }
}

export default Port;