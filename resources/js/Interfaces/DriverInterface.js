class DriverInterface
{
    /**
     * 
     * @param {String} path 
     * @param {any|null} data default data
     * @returns {any}
     */
    get(path, data = null) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    post(path, data) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    patch(path, data) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} path 
     * @returns {void}
     */
    delete(path) {
        throw new Error('It\'s abstract method.');
    }
}

export default DriverInterface;