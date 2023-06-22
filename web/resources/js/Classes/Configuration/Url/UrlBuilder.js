import BuilderInterface from "@/Interfaces/BuilderInterface";
import Url from './Url';
import Protocol from "./Components/Protocol";
import Hostname from "./Components/Hostname";
import Port from "./Components/Port";
import Pathname from "./Components/Pathname";
import Search from "./Components/Search";

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

    addHost(host) {
        if (host && typeof host === 'string') {
            let parts = host.split(':');
            if (parts.length === 2) {
                this.addHostname(parts[0]);
                this.addHost(parts[1]);
            }
        }

        return this;
    }

    addOrigin(origin) {
        if (origin && typeof origin === 'string') {
            let parts = origin.split('//');
            if (parts.length === 2) {
                this.addProtocol(parts[0]);
                this.addHost(parts[1]);
            }
        }

        return this;
    }

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