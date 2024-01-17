import { isString } from "../../../helpers";
import Component from "../Component";

class Hash extends Component
{
    /**
     * 
     * @param {String} hash 
     */
    constructor(hash = '') {
        super();
        
        let component = '';

        if (hash && isString(hash)) {
            component = hash;

            if (component.startsWith('/')) {
                component = component.slice(1);
            }

            if (! component.startsWith('#')) {
                component = '#' + component;
            }

            if (component.endsWith('/')) {
                component = component.slice(0, -1);
            }
        } else {
            component = window.location.hash;
        }

        this._component = component;
    }
}

export default Hash;
