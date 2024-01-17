import Hash from "../../../../Classes/Configuration/Url/Components/Hash";
import Hostname from "../../../../Classes/Configuration/Url/Components/Hostname";
import Pathname from "../../../../Classes/Configuration/Url/Components/Pathname";
import Port from "../../../../Classes/Configuration/Url/Components/Port";
import Protocol from "../../../../Classes/Configuration/Url/Components/Protocol";
import Search from "../../../../Classes/Configuration/Url/Components/Search";

test('Search can be created', () => {
    let search = new Search('name=Bob');
    expect(search.toString()).toBe('?name=Bob');

    search = new Search('/name=Bob');
    expect(search.toString()).toBe('?name=Bob');

    search = new Search('/name=Bob/');
    expect(search.toString()).toBe('?name=Bob');

    search = new Search();
    expect(search.toString()).toBe(window.location.search);
});

test('Protocol can be created', () => {
    let protocol = new Protocol('http');
    expect(protocol.toString()).toBe('http://');

    protocol = new Protocol('http:');
    expect(protocol.toString()).toBe('http://');

    protocol = new Protocol('http://');
    expect(protocol.toString()).toBe('http://');

    protocol = new Protocol();
    expect(protocol.toString()).toBe(window.location.protocol + '//');
});

test('Port can be created', () => {
    let port = new Port('8000');
    expect(port.toString()).toBe(':8000');

    port = new Port(':8000');
    expect(port.toString()).toBe(':8000');

    port = new Port(':8000/');
    expect(port.toString()).toBe(':8000');

    port = new Port();
    expect(port.toString()).toBe(':' + window.location.port);
});

test('Pathname can be created', () => {
    let pathname = new Pathname('path/to/dir');
    expect(pathname.toString()).toBe('/path/to/dir');

    pathname = new Pathname('/path/to/dir');
    expect(pathname.toString()).toBe('/path/to/dir');

    pathname = new Pathname();
    expect(pathname.toString()).toBe(window.location.pathname);
});

test('Hostname can be created', () => {
    let hostname = new Hostname('domain');
    expect(hostname.toString()).toBe('domain');

    hostname = new Hostname('//domain');
    expect(hostname.toString()).toBe('domain');

    hostname = new Hostname('domain/');
    expect(hostname.toString()).toBe('domain');

    hostname = new Hostname('domain:');
    expect(hostname.toString()).toBe('domain');
});

test('Hostname can be created', () => {
    let hash = new Hash('hash');
    expect(hash.toString()).toBe('#hash');

    hash = new Hash('/hash');
    expect(hash.toString()).toBe('#hash');

    hash = new Hash('#hash');
    expect(hash.toString()).toBe('#hash');

    hash = new Hash('/#hash');
    expect(hash.toString()).toBe('#hash');

    hash = new Hash('hash/');
    expect(hash.toString()).toBe('#hash');

    hash = new Hash('/#hash/');
    expect(hash.toString()).toBe('#hash');
});