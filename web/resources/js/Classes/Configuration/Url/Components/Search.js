import Component from "../Component";

class Search extends Component
{
    constructor(search) {
        super();
        
        let component = '';

        if (search && typeof search === 'string') {
            component = search;

            if (component.startsWith('/')) {
                component = component.slice(1);
            }

            if (! component.startsWith('?')) {
                component = '?' + component;
            }

            if (component.endsWith('/')) {
                component = component.slice(0, -1);
            }
        } else {
            component = window.location.search;
        }

        this._component = component;
    }
}

export default Search;