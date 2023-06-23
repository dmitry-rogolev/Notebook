import DriverInterface from "./DriverInterface";
import ServerDriverInterface from "./ServerDriverInterface";

class ClientDriverInterface extends DriverInterface
{
    /**
     * 
     * @param {String} path 
     * @param {any|null} data default data
     * @returns {any}
     */
    get(key, data = null) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} key 
     * @param {any} data 
     * @returns {Boolean}
     */
    set(key, data) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} key 
     * @returns {Boolean}
     */
    has(key) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {String} key 
     * @returns {void}
     */
    remove(key) {
        throw new Error('It\'s abstract method.');
    }

    /**
     * @returns {void}
     */
    clear() {
        throw new Error('It\'s abstract method.');
    }

    /**
     * 
     * @param {ServerDriverInterface} serverDriver 
     * @returns {void}
     */
    setServerDriver(serverDriver) {
        throw new Error('It\'s abstract method.');
    }
}

export default ClientDriverInterface;