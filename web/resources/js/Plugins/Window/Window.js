class Window 
{
    _element = null;
    _height = 0;
    _width = 0;
    _windowResizeObserver = null;
    _originalNote = null;
    _fullscreen = false;
    _statusbar = true;
    note = null;

    get windowElement() {
        return this._element;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get originalNote() {
        return this._originalNote;
    }

    get fullscreen() {
        return this._fullscreen;
    }

    get statusbar() {
        return this._statusbar;
    }

    constructor(options = {}) {

    }

    init(element, note) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._element = element;
            this._originalNote = note;
            this.note = Object.assign({}, note);

            this._height = this._calcHeight();
            this._width = this._calcWidth();

            this._observe();

            return true;
        }
        return false;
    }

    dispose() {
        this._disconnect();
        this._element = null;
        this._height = 0;
        this._width = 0;
    }

    isInit() {
        return !! this._element;
    }

    toggleFullscreen() {
        this._fullscreen = ! this._fullscreen;
    }

    toggleStatusbar() {
        this._statusbar = ! this._statusbar;
    }

    _calcHeight() {
        return document.documentElement.clientHeight - this._element.getBoundingClientRect().top;
    }

    _calcWidth() {
        return document.documentElement.clientWidth - this._element.getBoundingClientRect().left;
    }

    _windowResizeEventHandler() {
        let self = window.app.config.globalProperties.$window;
        self._height = self._calcHeight();
        self._width = self._calcWidth();
    }

    _addWindowResizeEventListeners() {
        window.addEventListener('resize', this._windowResizeEventHandler);
    }

    _removeWindowResizeEventListeners() {
        window.removeEventListener('resize', this._windowResizeEventHandler);
    }

    _observe() {
        if (this.isInit()) {
            if (! this._windowResizeObserver) {
                this._windowResizeObserver = new ResizeObserver(() => {
                    this._height = this._calcHeight();
                    this._width = this._calcWidth();
                });
            }

            this._windowResizeObserver.observe(this._element);

            this._addWindowResizeEventListeners();

            return true;
        }

        return false;
    }

    _disconnect() {
        if (this.isInit() && this._windowResizeObserver) {
            this._windowResizeObserver.disconnect();
            this._windowResizeObserver = null;
            this._removeWindowResizeEventListeners();

            return true;
        }
        
        return false;
    }
}

export default Window;