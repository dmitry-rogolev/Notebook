class NotObjectError extends Error
{
    /**
     * 
     * @param {String} parameter 
     */
    constructor(parameter) {
        super(`The "${parameter}" parameter must be an object.`)
    }
}

export default NotObjectError;
