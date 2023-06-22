import Component from "../Component";

class Hash extends Component
{
    constructor(hash) {
        super();
        
        let component = '';

        if (hash && typeof hash === 'string') {
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
