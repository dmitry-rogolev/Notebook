import Database from "../Database/Database";
import LocalStorageDriver from "../Database/Drivers/LocalStorageDriver";

class Model extends Database
{
    _table = '';

    get table() {
        return this._table;
    }

    set table(table) {
        this._table = table;
    }

    constructor() {
        super(LocalStorageDriver.getInstance());
    }
}

export default Model;
