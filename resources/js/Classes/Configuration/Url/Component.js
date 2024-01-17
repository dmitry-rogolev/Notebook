class Component 
{
    /**
     * @property {String}
     */
    _component = '';

    /**
     * @property {String}
     */
    get component() {
        return this._component;
    }

    /**
     * 
     * @returns {String}
     */
    toString() {
        return this._component;
    }
}

export default Component;
