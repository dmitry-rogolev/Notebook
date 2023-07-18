import axios from 'axios';
import DriverInterface from '../../../Interfaces/DriverInterface';
import { isString } from '../../helpers';
import NotTypeError from '../../Errors/NotTypeError';

class AxiosServerDriver extends DriverInterface
{
    static _instance = null;

    /**
     * 
     * @returns {AxiosServerDriver}
     */
    static getInstance() {
        if (this._instance === null) {
            this._instance = new this;
        }

        return this._instance;
    }

    /**
     * 
     * @param {String} url 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    async get(url, config = null) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        return axios.get(url, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    async post(url, data = null, config = null) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        return axios.post(url, data, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    async patch(url, data = null, config = null) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        return axios.patch(url, data, config);
    }

    /**
     * 
     * @param {String} url 
     * @param {Object|null} config 
     * @returns {Promise}
     */
    async delete(url, config = null) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        return axios.delete(url, config);
    }
}

export default AxiosServerDriver;
