class NotTypeError extends Error
{
    /**
     * 
     * @param {String} parameter 
     * @param {String} type 
     */
    constructor(parameter, type) {
        super(`The "${parameter}" parameter must be of type "${type}".`);
    }
}

export default NotTypeError;
