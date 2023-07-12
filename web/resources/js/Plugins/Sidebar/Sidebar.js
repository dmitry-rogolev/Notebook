import Cache from "../../Classes/Cache";
import Configuration from "../../Classes/Configuration";

class Sidebar 
{
    _configuration = null;

    _element = null;
    _height = 0;
    _width = 0;
    _resizeObserver = null;

    _showNotes = false;
    _showSearch = false;
    _showTrash = false;

    _detailed = true;

    get element() {
        return this._element;
    }

    get height() {
        return this._height;
    }

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
        if (typeof v !== 'boolean') {
            throw new Error('The "isDetailed" property must be an boolean.');
        }

        this._detailed = v;
        this._setDeteiled(v);
    }

    constructor(options = {}) {
        this._configuration = Configuration.getInstance();
    }

    init(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._element = element;

            this._initVariables();
            this._observe();

            return true;
        }
        return false;
    }

    dispose() {
        this._disconnect();
        this._element = null;
        this._disposeVariables();
    }

    isInit() {
        return !! this._element;
    }

    _initVariables() {
        this._height = this._calcHeight();
        this._width = this._calcWidth();
        this._showNotes = this._getShowNotes();
        this._showSearch = this._getShowSearch();
        this._showTrash = this._getShowTrash();
        this._detailed = this._getDeteiled();
    }

    _disposeVariables() {
        this._height = 0;
        this._width = 0;
        this._showNotes = false;
        this._showSearch = false;
        this._showTrash = false;
        this._detailed = false;
    }

    showNotes() {
        this._showNotes = ! this._showNotes;
        this._setShowNotes(this._showNotes);
        this._showSearch = false;
        this._setShowSearch(false);
        this._showTrash = false;
        this._setShowTrash(false);
    }

    showSearch() {
        this._showSearch = ! this._showSearch;
        this._setShowSearch(this._showSearch);
        this._showNotes = false;
        this._setShowNotes(false);
        this._showTrash = false;
        this._setShowTrash(false);
    }

    showTrash() {
        this._showTrash = ! this._showTrash;
        this._setShowTrash(this._showTrash);
        this._showNotes = false;
        this._setShowNotes(false);
        this._showSearch = false;
        this._setShowSearch(false);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getShowNotes() {
        return Cache.get(this._configuration.getSidebarCachePrefix() + 'show_notes', false);
    }

    /**
     * 
     * @param {Boolean} show 
     * @returns {void}
     */
    _setShowNotes(show) {
        Cache.set(this._configuration.getSidebarCachePrefix() + 'show_notes', show);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getShowSearch() {
        return Cache.get(this._configuration.getSidebarCachePrefix() + 'show_search', false);
    }

    /**
     * 
     * @param {Boolean} show 
     * @returns {void}
     */
    _setShowSearch(show) {
        Cache.set(this._configuration.getSidebarCachePrefix() + 'show_search', show);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getShowTrash() {
        return Cache.get(this._configuration.getSidebarCachePrefix() + 'show_trash', false);
    }

    /**
     * 
     * @param {Boolean} show 
     * @returns {void}
     */
    _setShowTrash(show) {
        Cache.set(this._configuration.getSidebarCachePrefix() + 'show_trash', show);
    }

    /**
     * 
     * @returns {Boolean}
     */
    _getDeteiled() {
        return Cache.get(this._configuration.getSidebarCachePrefix() + 'detailed', true);
    }

    /**
     * 
     * @param {Boolean} detailed 
     * @returns {void}
     */
    _setDeteiled(detailed) {
        Cache.set(this._configuration.getSidebarCachePrefix() + 'detailed', detailed);
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