import { isString } from "../../../helpers";
import Component from "../Component";

class Hostname extends Component
{
    /**
     * 
     * @param {String} hostname 
     */
    constructor(hostname = '') {
        super();
        
        let component = '';

        if (hostname && isString(hostname)) {
            component = hostname;

            if (component.endsWith('/')) {
                component = component.slice(0, -1);
            }
            
            if (component.endsWith(':')) {
                component = component.slice(0, -1);
            }

            if (component.startsWith('//')) {
                component = component.slice(2);
            }
        } else {
            component = window.location.hostname;
        }

        this._component = component;
    }
}
        
export default Hostname;
