class Sidebar 
{
    _element = null;
    _height = 0;
    _width = 0;
    _resizeObserver = null;

    get element() {
        return this._element;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
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

    _calcHeight() {
        return document.documentElement.clientHeight - this._element.getBoundingClientRect().top;
    }

    _calcWidth() {
        return this._element.getBoundingClientRect().width;
    }

    _windowResizeEventHandler() {
        let self = window.app.config.globalProperties.$sidebar;
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
            if (! this._resizeObserver) {
                this._resizeObserver = new ResizeObserver(() => {
                    this._height = this._calcHeight();
                    this._width = this._calcWidth();
                });
            }

            this._resizeObserver.observe(this._element);

            this._addWindowResizeEventListeners();

            return true;
        }

        return false;
    }

    _disconnect() {
        if (this.isInit() && this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
            this._removeWindowResizeEventListeners();

            return true;
        }
        
        return false;
    }
}

export default Sidebar;