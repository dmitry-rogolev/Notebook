import Server from "../Database/Drivers/LocalStorageDriver/Server";
import Facade from "./Facade";

class ServerFacade extends Facade
{
    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    static store(data) {
        return Server.getInstance().store(data);
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    static update(data) {
        return Server.getInstance().update(data);
    }
}

export default ServerFacade;
