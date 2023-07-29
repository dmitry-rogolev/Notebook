import NotTypeError from "../../Classes/Errors/NotTypeError";
import { cache, config, isBoolean, isNull, isObject, plugin } from "../../Classes/helpers";

class Window 
{
    static DEFAULT_OPEN = true;
    static DEFAULT_CACHE_PREFIX = '__cache_window_';
    static DEFAULT_FULLSCREEN = false;
    static DEFAULT_STATUSBAR = true;
    static DEFAULT_TOOLBAR = false;
    static DEFAULT_STANDARD = false;
    static DEFAULT_TABS = true;
    static DEFAULT_RESIZE_INTERVAL = 200;

    _isInit = false;
    _element = null;
    _height = 0;
    _width = 0;
    _fullscreen = false;
    _statusbar = true;
    _toolbar = false;
    _standard = false;
    _tabs = true;
    _resizeTimer = null;
    _file = null;
    _defaultFile = null;
    _isOpen = false;

    /**
     * @property {Boolean}
     */
    get isInit() {
        return this._isInit;
    }

    /**
     * @property {HTMLElement}
     */
    get element() {
        return this._element;
    }

    /**
     * @property {Number}
     */
    get height() {
        return this._height;
    }

    /**
     * @property {Number}
     */
    get width() {
        return this._width;
    }

    /**
     * @property {Boolean}
     */
    get fullscreen() {
        return this._fullscreen;
    }

    /**
     * @property {Boolean}
     */
    get statusbar() {
        return this._statusbar;
    }

    /**
     * @property {Boolean}
     */
    get toolbar() {
        return this._toolbar;
    }

    /**
     * @property {Boolean}
     */
    get standard() {
        return this._standard;
    }

    /**
     * @property {Boolean}
     */
    get tabs() {
        return this._tabs;
    }

    /**
     * @property {Object}
     */
    get file() {
        return this._file ?? this._defaultFile;
    }

    /**
     * @property {Boolean}
     */
    get isOpen() {
        return this._isOpen;
    }

    /**
     * 
     * @returns {Number}
     */
    getHeight() {
        return document.documentElement.clientHeight - this.element.getBoundingClientRect().top;
    }

    /**
     * 
     * @returns {Number}
     */
    getWidth() {
        return document.documentElement.clientWidth - this.element.getBoundingClientRect().left;
    }

    /**
     * 
     * @returns {Boolean}
     */
    getFullscreen() {
        let fullscreen = cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}fullscreen`);

        if (isNull(fullscreen)) {
            return config('window.fullscreen', Window.DEFAULT_FULLSCREEN);
        }

        return fullscreen;
    }

    /**
     * 
     * @param {Boolean} fullscreen 
     * @returns {void}
     */
    setFullscreen(fullscreen) {
        if (isBoolean(fullscreen)) {
            cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}fullscreen`, fullscreen);
            this._fullscreen = fullscreen;
        }
    }

    /**
     * 
     * @returns {Boolean}
     */
    getStatusbar() {
        let statusbar = cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}statusbar`);

        if (isNull(statusbar)) {
            return config('window.statusbar', Window.DEFAULT_STATUSBAR);
        }

        return statusbar;
    }

    /**
     * 
     * @param {Boolean} statusbar 
     * @returns {void}
     */
    setStatusbar(statusbar) {
        if (isBoolean(statusbar)) {
            cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}statusbar`, statusbar);
            this._statusbar = statusbar;
        }
    }

    /**
     * 
     * @returns {Boolean}
     */
    getToolbar() {
        let toolbar = cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}toolbar`);

        if (isNull(toolbar)) {
            return config('window.toolbar', Window.DEFAULT_TOOLBAR);
        }

        return toolbar;
    }

    /**
     * 
     * @param {Boolean} toolbar 
     * @returns {void}
     */
    setToolbar(toolbar) {
        if (isBoolean(toolbar)) {
            cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}toolbar`, toolbar);
            this._toolbar = toolbar;
        }
    }

    /**
     * 
     * @returns {Boolean}
     */
    getStandard() {
        let standard = cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}standard`);

        if (isNull(standard)) {
            return config('window.standard', Window.DEFAULT_STANDARD);
        }

        return standard;
    }

    /**
     * 
     * @param {Boolean} standard 
     * @returns {void}
     */
    setStandard(standard) {
        if (isBoolean(standard)) {
            cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}standard`, standard);
            this._standard = standard;
        }
    }

    /**
     * 
     * @returns {Boolean}
     */
    getTabs() {
        let tabs = cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}tabs`);

        if (isNull(tabs)) {
            return config('window.tabs', Window.DEFAULT_TABS);
        }

        return tabs;
    }

    /**
     * 
     * @param {Boolean} tabs 
     * @returns {void}
     */
    setTabs(tabs) {
        if (isBoolean(tabs)) {
            cache(`${config('window.cache.prefix', Window.DEFAULT_CACHE_PREFIX)}tabs`, tabs);
            this._tabs = tabs;
        }
    }

    /**
     * 
     * @param {Object} file 
     * @returns {void}
     */
    setFile(file) {
        if (! isObject(file)) {
            throw new NotTypeError('file', 'object');
        }

        this._file = file;
    }

    /**
     * 
     * @param {Object} file 
     * @returns {void}
     */
    setDefaultFile(file) {
        if (! isObject(file)) {
            throw new NotTypeError('file', 'object');
        }

        this._defaultFile = file;
    }

    /**
     * 
     * @param {HTMLElement} element 
     */
    init(element) {
        if (! (element instanceof HTMLElement)) {
            throw new NotTypeError('element', 'HTMLElement');
        }

        if (! this.isInit) {
            this._element = element;
            this.initVariables();
            this._observe();
            this._addKeyUpEventListener();
            this._isInit = true;
        }
    }

    /**
     * @returns {void}
     */
    dispose() {
        if (this.isInit) {
            this._element = null;
            this.disposeVariables();
            this._disconnect();
            this._removeKeyUpEventListener();
            this._isInit = false;
        }
    }

    /**
     * @returns {void}
     */
    initVariables() {
        this._height = this.getHeight();
        this._width = this.getWidth();
        this._fullscreen = this.getFullscreen();
        this._statusbar = this.getStatusbar();
        this._toolbar = this.getToolbar();
        this._standard = this.getStandard();
        this._tabs = this.getTabs();
    }

    /**
     * @returns {void}
     */
    disposeVariables() {
        this._height = 0;
        this._width = 0;
        this._fullscreen = false;
        this._statusbar = false;
        this._toolbar = false;
        this._standard = false;
        this._tabs = true;
    }

    /**
     * @returns {void}
     */
    _observe() {
        if (this.isInit) {
            this._resizeTimer = setInterval(() => {
                this._height = this.getHeight();
                this._width = this.getWidth();
            }, config('window.resize.interval', Window.DEFAULT_RESIZE_INTERVAL));
        }
    }

    /**
     * @returns {void}
     */
    _disconnect() {
        if (this._resizeTimer !== 0) {
            clearInterval(this._resizeTimer);
            this._resizeTimer = 0;
        }
    }

    /**
     * @returns {void}
     */
    print() {
        window.print();
    }

    /**
     * 
     * @param {Object} file 
     * @returns {void}
     */
    open(file) {
        this.setFile(file);
        this._isOpen = true;
    }

    /**
     * @returns {void}
     */
    close() {
        this._file = null;
        this._isOpen = false;
    }

    /**
     * @returns {void}
     */
    toggleFullscreen() {
        this.setFullscreen(! this.fullscreen);
    }

    /**
     * @returns {void}
     */
    toggleStatusbar() {
        this.setStatusbar(! this.statusbar);
    }

    /**
     * @returns {void}
     */
    toggleToolbar() {
        this.setToolbar(! this.toolbar);
    }

    /**
     * @returns {void}
     */
    showStandard() {
        this.setStandard(true);
        this.setToolbar(true);
        this.setTabs(false);
    }

    /**
     * @returns {void}
     */
    showTabs() {
        this.setTabs(true);
        this.setStandard(false);
        this.setToolbar(false);
    }

    /**
     * @returns {void}
     */
    _addKeyUpEventListener() {
        document.addEventListener('keyup', this._keyup);
    }

    /**
     * @returns {void}
     */
    _removeKeyUpEventListener() {
        document.removeEventListener('keyup', this._keyup);
    }

    /**
     * @returns {void}
     */
    _keyup(e) {
        e.preventDefault();
        e.stopPropagation();

        // toggle fullscreen
        if (e.altKey && e.code == 'KeyZ') {
            plugin('window').toggleFullscreen();
        } 
    }
}

export default Window;
