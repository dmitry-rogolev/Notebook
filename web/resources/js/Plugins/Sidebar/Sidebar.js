import NotTypeError from "../../Classes/Errors/NotTypeError";
import { config, isBoolean, isNull } from "../../Classes/helpers";

class Sidebar 
{
    static DEFAULT_SHOW_NOTES = true;
    static DEFAULT_SHOW_SEARCH = false;
    static DEFAULT_SHOW_TRASH = false;
    static DEFAULT_SHOW_DETAILED = true;

    _isInit = false;
    _element = null;
    _height = 0;
    _width = 0;
    _resizeObserver = null;
    _showNotes = false;
    _showSearch = false;
    _showTrash = false;
    _detailed = true;

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
     * @returns {Number}
     */
    get height() {
        return this._height;
    }

    /**
     * @returns {Number}
     */
    get width() {
        return this._width;
    }

    /**
     * @property {Boolean}
     */
    get isShowNotes() {
        return this._showNotes;
    }

    /**
     * @property {Boolean}
     */
    get isShowSearch() {
        return this._showSearch;
    }

    /**
     * @property {Boolean}
     */
    get isShowTrash() {
        return this._showTrash;
    }

    /**
     * @property {Boolean}
     */
    get isDetailed() {
        return this._detailed;
    }

    set isDetailed(v) {
        if (isBoolean(v)) {
            this._detailed = v;
        }
    }

    /**
     * 
     * @returns {Number}
     */
    getHeight() {
        return document.documentElement.clientHeight - this._element.getBoundingClientRect().top;
    }

    /**
     * 
     * @returns {Number}
     */
    getWidth() {
        return this._element.getBoundingClientRect().width;
    }

    /**
     * 
     * @returns {Boolean}
     */
    getShowNotes() {
        return config('sidebar.show.notes', Sidebar.DEFAULT_SHOW_NOTES);
    }

    /**
     * 
     * @returns {Boolean}
     */
    getShowSearch() {
        return config('sidebar.show.search', Sidebar.DEFAULT_SHOW_SEARCH);
    }

    /**
     * 
     * @returns {Boolean}
     */
    getShowTrash() {
        return config('sidebar.show.trash', Sidebar.DEFAULT_SHOW_TRASH);
    }

    /**
     * 
     * @returns {Boolean}
     */
    getDetailed() {
        return config('sidebar.show.detailed', Sidebar.DEFAULT_SHOW_DETAILED);
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @returns {void}
     */
    init(element) {
        if (! (element instanceof HTMLElement)) {
            throw new NotTypeError('element', 'HTMLElement');
        }

        if (! this.isInit) {
            this._element = element;
            this.initVariables();
            this._observe();
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
            this._isInit = false;
        }
    }

    /**
     * @returns {void}
     */
    initVariables() {
        this._height = this.getHeight();
        this._width = this.getWidth();
        this._showNotes = this.getShowNotes();
        this._showSearch = this.getShowSearch();
        this._showTrash = this.getShowTrash();
        this._detailed = this.getDetailed();
    }

    /**
     * @returns {void}
     */
    disposeVariables() {
        this._height = 0;
        this._width = 0;
        this._showNotes = true;
        this._showSearch = false;
        this._showTrash = false;
        this._detailed = false;
    }

    /**
     * @returns {void}
     */
    showNotes() {
        this._showNotes = ! this._showNotes;
        this._showSearch = false;
        this._showTrash = false;
    }

    /**
     * @returns {void}
     */
    showSearch() {
        this._showSearch = ! this._showSearch;
        this._showNotes = false;
        this._showTrash = false;
    }

    /**
     * @returns {void}
     */
    showTrash() {
        this._showTrash = ! this._showTrash;
        this._showNotes = false;
        this._showSearch = false;
    }

    /**
     * @returns {void}
     */
    _windowResizeEventHandler() {
        plugin('sidebar')._height = plugin('sidebar').getHeight();
        plugin('sidebar')._width = plugin('sidebar').getWidth();
    }

    /**
     * @returns {void}
     */
    _addWindowResizeEventListeners() {
        window.addEventListener('resize', this._windowResizeEventHandler);
    }

    /**
     * @returns {void}
     */
    _removeWindowResizeEventListeners() {
        window.removeEventListener('resize', this._windowResizeEventHandler);
    }

    /**
     * @returns {void}
     */
    _observe() {
        if (isNull(this._resizeObserver)) {
            this._resizeObserver = new ResizeObserver(() => {
                this._height = this.getHeight();
                this._width = this.getWidth();
            });
        }

        this._resizeObserver.observe(this._element);
        this._addWindowResizeEventListeners();
    }

    /**
     * @returns {void}
     */
    _disconnect() {
        if (this._resizeObserver instanceof ResizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = null;
            this._removeWindowResizeEventListeners();
        }
    }
}

export default Sidebar;
