class Window 
{
    _element = null;
    _height = 0;
    _width = 0;
    _fullscreen = false;
    _statusbar = true;
    _resizeTimer = null;
    _timerInterval = 100;

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

    init(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._element = element;

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
}

export default Window;