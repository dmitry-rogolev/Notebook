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
     * @returns {Promise}
     */
    async get(url) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let response = await axios.get(url);
        return response?.data?.data;
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {Promise}
     */
    async post(url, data) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let response = await axios.post(url, data);
        return response?.data?.data;
    }

    /**
     * 
     * @param {String} url 
     * @param {any} data 
     * @returns {Promise}
     */
    async patch(url, data) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        let response = await axios.patch(url, data);
        return response?.data?.data;
    }

    /**
     * 
     * @param {String} url 
     * @returns {Promise}
     */
    async delete(url) {
        if (! isString(url)) {
            throw new NotTypeError('url', 'string');
        }

        await axios.delete(url);
    }
}

export default AxiosServerDriver;
