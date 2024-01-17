import Url from "../../../Classes/Configuration/Url/Url";
import UrlBuilder from "../../../Classes/Configuration/Url/UrlBuilder";

test('Url can get protocol', () => {
    let url = new Url();

    expect(url.protocol.toString()).toBe(window.location.protocol + '//');
});

test('Url can get hostname', () => {
    let url = new Url();

    expect(url.hostname.toString()).toBe(window.location.hostname);
});

test('Url can get port', () => {
    let url = new Url();

    expect(url.port.toString()).toBe(':' + window.location.port);
});

test('Url can get pathname', () => {
    let url = new Url();

    expect(url.pathname.toString()).toBe(window.location.pathname);
});

test('Url can get search', () => {
    let url = new Url();

    expect(url.search.toString()).toBe(window.location.search);
});

test('Url can get hash', () => {
    let url = new Url();

    expect(url.hash.toString()).toBe(window.location.hash);
});

test('Url can be rendered', () => {
    let url = new Url();

    expect(url.render()).toBe(window.location.toString());
});

test('UrlFactory can make Url', () => {
    let url = Url.factory().make();

    expect(url).toBeInstanceOf(Url);
});

test('UrlFactory can make UrlBuilder', () => {
    let urlBuilder = Url.factory().makeBuilder();

    expect(urlBuilder).toBeInstanceOf(UrlBuilder);
});

test('UrlBuilder can add component', () => {
    let urlBuilder = Url.factory().makeBuilder();

    let url = urlBuilder
                .addProtocol('https')
                .addHostname('domain')
                .addPort('8000')
                .addPathname('path/to/dir')
                .addSearch('s=search')
                .addHash('hash')
                .make();

    expect(url.render()).toBe('https://domain:8000/path/to/dir?s=search#hash');

    url = urlBuilder
            .addProtocol('https')
            .addHost('domain:8000')
            .addPathname('path/to/dir')
            .addSearch('s=search')
            .addHash('hash')
            .make();

    expect(url.render()).toBe('https://domain:8000/path/to/dir?s=search#hash');

    url = urlBuilder
            .addOrigin('https://domain:8000')
            .addPathname('path/to/dir')
            .addSearch('s=search')
            .addHash('hash')
            .make();

    expect(url.render()).toBe('https://domain:8000/path/to/dir?s=search#hash');
});