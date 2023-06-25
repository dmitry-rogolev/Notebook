import Cache from "../../Classes/Cache";
import Note from "../../Classes/Models/Note";

class Window 
{
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

    get statusbar() {
        return this._statusbar;
    }

    get toolbar() {
        return this._toolbar;
    }

    get tabs() {
        return this._tabs;
    }

    get standard() {
        return this._standard;
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

    constructor(options = {}) {

    }

    init(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._element = element;

            this._height = this._calcHeight();
            this._width = this._calcWidth();

            this._observe();

            this._addKeyUpEventListener();

            return true;
        }
        return false;
    }

    dispose() {
        this._disconnect();
        this._element = null;
        this._height = 0;
        this._width = 0;
        this._removeKeyUpEventListener();
    }

    isInit() {
        return !! this._element;
    }

    toggleStatusbar() {
        this._statusbar = ! this._statusbar;
    }

    toggleToolbar() {
        this._toolbar = ! this._toolbar;
    }

    showStandard() {
        this._standard = true;
        this._toolbar = true;
        this._tabs = false;
    }

    showTabs() {
        this._tabs = true;
        this._standard = false;
        this._toolbar = false;
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
        if (! this._isOpen) {
            this.setFile(file);
            this._isOpen = true;
        }
    }

    /**
     * @returns {void}
     */
    close() {
        if (this._isOpen) {
            this._isOpen = false;
            this._file = null;
        }
    }

    /**
     * @returns {void}
     */
    toggleFullscreen() {
        this._fullscreen = ! this._fullscreen;
        this._setFullscreen(this._fullscreen);
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
        return Cache.get('fullscreen', false) === 'true' ? true : false;
    }

    /**
     * 
     * @param {Boolean} fullscreen 
     * @returns {void}
     */
    _setFullscreen(fullscreen) {
        Cache.add('fullscreen', fullscreen);
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