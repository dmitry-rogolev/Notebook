import { isString } from "../../../helpers";
import Component from "../Component";

class Protocol extends Component
{
    /**
     * 
     * @param {String} protocol 
     */
    constructor(protocol = '') {
        super();
        
        let component = '';

        if (protocol && isString(protocol)) {
            component = protocol;

            if (! component.endsWith('//')) {
                component = component + '//';
            }

            if (! component.endsWith(':')) {
                component += ':';
            }
        } else {
            component = window.location.protocol + '//';
        }

        this._component = component;
    }
}

export default Protocol;