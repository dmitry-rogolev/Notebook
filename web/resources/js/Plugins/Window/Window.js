import Cache from "../../Classes/Cache";
import Configuration from "../../Classes/Configuration";

class Window 
{
    _configuration = null;
    _element = null;
    _height = 0;
    _width = 0;
    _statusbar = true;
    _toolbar = false;
    _tabs = true;
    _standard = false;
    _resizeTimer = null;
    _timerInterval = 100;

    _file = null;
    _defaultFile = null;
    _isOpen = false;
    _fullscreen = false;

    get windowElement() {
        return this._element;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
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
    get tabs() {
        return this._tabs;
    }

    /**
     * @property {Boolean}
     */
    get standard() {
        return this._standard;
    }

    constructor(options = {}) {
        this._configuration = Configuration.getInstance();
    }

    init(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._element = element;
            this._initVariables();
            this._observe();
            this._addKeyUpEventListener();

            return true;
        }
        return false;
    }

    dispose() {
        this._disconnect();
        this._element = null;
        this._disposeVariables();
        this._removeKeyUpEventListener();
    }

    _initVariables() {
        this._height = this._calcHeight();
        this._width = this._calcWidth();
        this._fullscreen = this._getFullscreen();
        this._statusbar = this._getStatusbar();
        this._toolbar = this._getToolbar();
        this._standard = this._getStandard();
        this._tabs = this._getTabs();
    }

    _disposeVariables() {
        this._height = 0;
        this._width = 0;
        this._fullscreen = false;
        this._statusbar = false;
        this._tabs = true;
        this._standard = false;
        this._toolbar = false;
    }

    isInit() {
        return !! this._element;
    }

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
        this._isOpen = false;
        this._file = null;
    }

    /**
     * @returns {void}
     */
    toggleFullscreen() {
        this._fullscreen = ! this._fullscreen;
        this._setFullscreen(this._fullscreen);
    }

    /**
     * @returns {void}
     */
    toggleStatusbar() {
        this._statusbar = ! this._statusbar;
        this._setStatusbar(this._statusbar);
    }

    /**
     * @returns {void}
     */
    toggleToolbar() {
        this._toolbar = ! this._toolbar;
        this._setToolbar(this._toolbar);
    }

    /**
     * @returns {void}
     */
    showStandard() {
        this._standard = true;
        this._setStandard(true);
        this._toolbar = true;
        this._setToolbar(true);
        this._tabs = false;
        this._setTabs(false);
    }

    /**
     * @returns {void}
     */
    showTabs() {
        this._tabs = true;
        this._setTabs(true);
        this._standard = false;
        this._setStandard(false);
        this._toolbar = false;
        this._setToolbar(false);
    }

    /**
     * 
     * @param {Object} file 
     * @returns {void}
     */
    setFile(file) {
        if (typeof file !== 'object') {
            throw new Error('The "file" parameter must be of type "object".');
        }

        this._file = file;
    }

    /**
     * 
     * @param {Object} file 
     * @returns {void}
     */
    setDefaultFile(file) {
        if (typeof file !== 'object') {
            throw new Error('The "file" parameter must be of type "object".');
        }

        this._defaultFile = file;
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getFullscreen() {
        return Cache.get(this._configuration.getWindowCachePrefix() + 'fullscreen', false);
    }

    /**
     * 
     * @param {Boolean} fullscreen 
     * @returns {void}
     */
    _setFullscreen(fullscreen) {
        Cache.set(this._configuration.getWindowCachePrefix() + 'fullscreen', fullscreen);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getStatusbar() {
        return Cache.get(this._configuration.getWindowCachePrefix() + 'statusbar', true);
    }

    /**
     * 
     * @param {Boolean} statusbar 
     * @returns {void}
     */
    _setStatusbar(statusbar) {
        Cache.set(this._configuration.getWindowCachePrefix() + 'statusbar', statusbar);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getToolbar() {
        return Cache.get(this._configuration.getWindowCachePrefix() + 'toolbar', false);
    }

    /**
     * 
     * @param {Boolean} toolbar 
     * @returns {void}
     */
    _setToolbar(toolbar) {
        Cache.set(this._configuration.getWindowCachePrefix() + 'toolbar', toolbar);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getStandard() {
        return Cache.get(this._configuration.getWindowCachePrefix() + 'standard', false);
    }

    /**
     * 
     * @param {Boolean} standard 
     * @returns {void}
     */
    _setStandard(standard) {
        Cache.set(this._configuration.getWindowCachePrefix() + 'standard', standard);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getTabs() {
        return Cache.get(this._configuration.getWindowCachePrefix() + 'tabs', true);
    }

    /**
     * 
     * @param {Boolean} tabs 
     * @returns {void}
     */
    _setTabs(tabs) {
        Cache.set(this._configuration.getWindowCachePrefix() + 'tabs', tabs);
    }

    _calcHeight() {
        return document.documentElement.clientHeight - this._element.getBoundingClientRect().top;
    }

    _calcWidth() {
        return document.documentElement.clientWidth - this._element.getBoundingClientRect().left;
    }

    _observe() {
        if (this.isInit()) {
            this._resizeTimer = setInterval(() => {
                this._height = this._calcHeight();
                this._width = this._calcWidth();
            }, this._timerInterval);

            return true;
        }

        return false;
    }

    _disconnect() {
        if (this.isInit() && this._resizeTimer) {
            clearInterval(this._resizeTimer);

            return true;
        }
        
        return false;
    }

    _addKeyUpEventListener() {
        document.addEventListener('keyup', this._keyup);
    }

    _removeKeyUpEventListener() {
        document.removeEventListener('keyup', this._keyup);
    }

    _keyup(e) {
        e.preventDefault();
        e.stopPropagation();

        let $window = window.app.config.globalProperties.$window;

        // In full screen
        if (e.altKey && e.code == 'KeyZ') {
            $window.toggleFullscreen();
        } 
    }
}

export default Window;