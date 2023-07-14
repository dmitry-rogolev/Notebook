import NotTypeError from "../../../Errors/NotTypeError";
import Model from "../../../Model/Model";
import { config, isObject, timestamp, uuid } from "../../../helpers";

class Server 
{
    static _instance = null;

    /**
     * 
     * @returns {Server}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    store(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        data[config('model.primary_key', Model.DEFAULT_PRIMARY_KEY)] = uuid();

        let timestampDate = timestamp();

        data[config('model.created_at', Model.DEFAULT_CREATED_AT)] = timestampDate;
        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestampDate;
        data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)] = null;

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    update(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestamp();

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    delete(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        let timestampDate = timestamp();

        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestampDate;
        data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)] = timestampDate;

        return data;
    }

    /**
     * 
     * @param {Object} data 
     * @returns {Object}
     */
    restore(data) {
        if (! isObject(data)) {
            throw new NotTypeError('data', 'object');
        }

        let timestampDate = timestamp();

        data[config('model.updated_at', Model.DEFAULT_UPDATED_AT)] = timestampDate;
        data[config('model.deleted_at', Model.DEFAULT_DELETED_AT)] = null;

        return data;
    }
}

export default Server;
