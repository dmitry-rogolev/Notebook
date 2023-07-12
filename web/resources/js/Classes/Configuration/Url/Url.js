import RenderableInterface from '../../../Interfaces/RenderableInterface';
import Protocol from "./Components/Protocol";
import Hostname from "./Components/Hostname";
import Port from "./Components/Port";
import Pathname from "./Components/Pathname";
import Search from "./Components/Search";
import Hash from "./Components/Hash";
import UrlFactory from "./UrlFactory";

class Url extends RenderableInterface
{
    _protocol = null;
    _hostname = null;
    _port = null;
    _pathname = null;
    _search = null;
    _hash = null;

    /**
     * @property {Protocol}
     */
    get protocol() {
        if (! this._protocol) {
            this._protocol = new Protocol();
        }

        return this._protocol;
    }

    set protocol(protocol) {
        if (protocol instanceof Protocol) {
            this._protocol = protocol;
        }
    }

    /**
     * @property {Hostname}
     */
    get hostname() {
        if (! this._hostname) {
            this._hostname = new Hostname();
        }

        return this._hostname;
    }

    set hostname(hostname) {
        if (hostname instanceof Hostname) {
            this._hostname = hostname;
        }
    }

    /**
     * @property {Port}
     */
    get port() {
        if (! this._port) {
            this._port = new Port();
        }

        return this._port;
    }

    set port(port) {
        if (port instanceof Port) {
            this._port = port;
        }
    }

    /**
     * @property {Pathname}
     */
    get pathname() {
        if (! this._pathname) {
            this._pathname = new Pathname();
        }

        return this._pathname;
    }

    set pathname(pathname) {
        if (pathname instanceof Pathname) {
            this._pathname = pathname;
        }
    }

    /**
     * @property {Search}
     */
    get search() {
        if (! this._search) {
            this._search = new Search();
        }

        return this._search;
    }

    set search(search) {
        if (search instanceof Search) {
            this._search = search;
        }
    }

    /**
     * @property {Hash}
     */
    get hash() {
        if (! this._hash) {
            this._hash = new Hash();
        }

        return this._hash;
    }

    set hash(hash) {
        if (hash instanceof Hash) {
            this._hash = hash;
        }
    }

    /**
     * @returns {String}
     */
    render() {
        return ''.concat(
            this.protocol.toString(), 
            this.hostname.toString(), 
            this.port.toString(),      
            this.pathname.toString(),
            this.search.toString(),
            this.hash.toString(), 
        );
    }

    /**
     * 
     * @returns {String}
     */
    toString() {
        return this.render();
    }

    /**
     * 
     * @returns {UrlFactory}
     */
    static factory() {
        return new UrlFactory();
    }
}

export default Url;
