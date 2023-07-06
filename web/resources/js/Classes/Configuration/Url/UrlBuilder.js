import BuilderInterface from "@/Interfaces/BuilderInterface";
import Url from './Url';
import Protocol from "./Components/Protocol";
import Hostname from "./Components/Hostname";
import Port from "./Components/Port";
import Pathname from "./Components/Pathname";
import Search from "./Components/Search";
import { isString } from "../../helpers";

class UrlBuilder extends BuilderInterface
{
    _url;

    constructor() {
        super();
        this._url = new Url();
    }

    /**
     * 
     * @param {String} protocol 
     * @returns {this}
     */
    addProtocol(protocol) {
        this._url.protocol = new Protocol(protocol);

        return this;
    }

    /**
     * 
     * @param {String} hostname 
     * @returns {this}
     */
    addHostname(hostname) {
        this._url.hostname = new Hostname(hostname);

        return this;
    }

    /**
     * 
     * @param {String} port 
     * @returns {this}
     */
    addPort(port) {
        this._url.port = new Port(port);

        return this;
    }

    /**
     * 
     * @param {String} pathname 
     * @returns {this}
     */
    addPathname(pathname) {
        this._url.pathname = new Pathname(pathname);

        return this;
    }

    /**
     * 
     * @param {String} host 
     * @returns {this}
     */
    addHost(host) {
        if (host && isString(host)) {
            let parts = host.split(':');

            if (parts.length === 2) {
                this.addHostname(parts[0]);
                this.addHost(parts[1]);
            }
        }

        return this;
    }

    /**
     * 
     * @param {String} origin 
     * @returns {this}
     */
    addOrigin(origin) {
        if (origin && isString(origin)) {
            let parts = origin.split('//');

            if (parts.length === 2) {
                this.addProtocol(parts[0]);
                this.addHost(parts[1]);
            }
        }

        return this;
    }

    /**
     * 
     * @param {String} search 
     * @returns {this}
     */
    addSearch(search) {
        this._url.search = new Search(search);

        return this;
    }

    /**
     * 
     * @returns {Url}
     */
    make() {
        return this._url;
    }
}

export default UrlBuilder;