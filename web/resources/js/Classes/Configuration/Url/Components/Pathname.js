import { isString } from "../../../helpers";
import Component from "../Component";

class Pathname extends Component
{
    /**
     * 
     * @param {String} pathname 
     */
    constructor(pathname = '') {
        super();
        
        let component = '';

        if (pathname && isString(pathname)) {
            component = pathname;

            if (! component.startsWith('/')) {
                component = '/' + component;
            }
        } else {
            component = window.location.pathname;
        }

        this._component = component;
    }
}

export default Pathname;