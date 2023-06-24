import DriverInterface from "../../Interfaces/DriverInterface";
import FactoryInterface from "../../Interfaces/FactoryInterface";
import Database from "./Database";

class DatabaseFactory extends FactoryInterface
{
    _driver = null;

    constructor(driver = null) {
        super();
        this.driver(driver);
    }

    make(driver = null) {
        this.driver(driver);

        return new Database(this._driver);
    }

    driver(driver) {
        if (driver && driver instanceof DriverInterface) {
            this._driver = driver;
        }
        return this;
    }
}

export default DatabaseFactory;
