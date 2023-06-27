import DriverInterface from "../../Interfaces/DriverInterface";
import FactoryInterface from "../../Interfaces/FactoryInterface";
import Database from "./Database";

class DatabaseFactory extends FactoryInterface
{
    _clientDriver = null;
    _serverDriver = null;

    constructor(clientDriver = null, serverDriver = null) {
        super();
        this.clientDriver(clientDriver);
        this.serverDriver(serverDriver);
    }

    make(clientDriver = null, serverDriver = null) {
        this.clientDriver(clientDriver);
        this.serverDriver(serverDriver);

        return new Database(this._clientDriver, this._serverDriver);
    }

    clientDriver(clientDriver) {
        if (clientDriver && clientDriver instanceof DriverInterface) {
            this._clientDriver = clientDriver;
        }
        return this;
    }

    serverDriver(serverDriver) {
        if (serverDriver && serverDriver instanceof DriverInterface) {
            this._serverDriver = serverDriver;
        }
        return this;
    }
}

export default DatabaseFactory;
