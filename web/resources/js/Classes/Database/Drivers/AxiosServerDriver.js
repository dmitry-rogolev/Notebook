import Configuration from '@/Classes/Configuration';
import axios from 'axios';
import DriverInterface from '@/Interfaces/DriverInterface';

class AxiosServerDriver extends DriverInterface
{
    static _instance = null;
    _configuration = null;

    constructor() {
        super();
        this._configuration = Configuration.getInstance();
    }

    /**
     * 
     * @returns {this}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {String} path 
     * @param {any|null} data default data
     * @returns {any}
     */
    async get(path, data = null) {
        if (this._isPath(path)) {
            let response = await axios.get(this._configuration.getUrl() + '/' + this._parsePath(path));
            let responseData = response?.data?.data;

            if (Array.isArray(responseData) && ! responseData.length) {
                return data;
            } 

            return responseData;
        }

        return data;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    async post(path, data) {
        if (this._isPath(path)) {
            let response = await axios.post(this._configuration.getUrl() + '/' + this._parsePath(path), data);
            let responseData = response?.data?.data;

            if (Array.isArray(responseData) && ! responseData.length) {
                return null;
            } 

            return responseData;
        }

        return null;
    }

    /**
     * 
     * @param {String} path 
     * @param {any} data 
     * @returns {any}
     */
    async patch(path, data) {
        if (this._isPath(path)) {
            let response = await axios.patch(this._configuration.getUrl() + '/' + this._parsePath(path), data);
            let responseData = response?.data?.data;

            if (Array.isArray(responseData) && ! responseData.length) {
                return null;
            } 

            return responseData;
        }

        return null;
    }

    /**
     * 
     * @param {String} path 
     * @returns {void}
     */
    async delete(path) {
        if (this._isPath(path)) {
            await axios.delete(this._configuration.getUrl() + '/' + this._parsePath(path));
        }
    }

    /**
     * 
     * @param {String} path 
     * @returns {any}
     */
    async restore(path) {
        if (this._isPath(path)) {
            let response = await axios.post(this._configuration.getUrl() + '/' + this._parsePath(path));
            let responseData = response?.data?.data;

            if (Array.isArray(responseData) && ! responseData.length) {
                return null;
            } 

            return responseData;
        }

        return null;
    }

    /**
     * 
     * @param {any} path 
     * @returns {Boolean}
     */
    _isPath(path) {
        return path && typeof path === 'string';
    } 

    /**
     * 
     * @param {String} path 
     */
    _parsePath(path) {
        let result = path;

        if (result.startsWith('/')) {
            result = result.slice(1);
        }

        if (result.endsWith('/')) {
            result = result.slice(0, -1);
        }

        return encodeURI(path);
    }
}

export default AxiosServerDriver;