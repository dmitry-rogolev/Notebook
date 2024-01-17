import Base from 'mark.js';
import NotTypeError from '../../Classes/Errors/NotTypeError';
import { config, isString, notEmpty } from '../../Classes/helpers';

class Mark 
{
    static DEFAULT_OPTIONS = {
        element: 'span', 
        className: 'bg-indigo-200 dark:bg-indigo-900', 
        acrossElements: true, 
        caseSensitive: false, 
        separateWordSearch: false, 
    };

    _isInit = false;
    _base = null;
    _element = null;
    _show = false;
    _showReplace = false;
    _replacedNodes = [];
    _case = false;

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
     * @property {Boolean}
     */
    get isShow() {
        return this._show;
    }

    /**
     * @property {Boolean}
     */
    get isShowReplace() {
        return this._showReplace;
    }

    /**
     * @property {Boolean}
     */
    get case() {
        return this._case;
    }

    /**
     * 
     * @returns {Boolean}
     */
    getCase() {
        return config('mark.options.caseSensitive', Mark.DEFAULT_OPTIONS.caseSensitive);
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
            this._base = new Base(element);
            this._element = element;
            this._case = this.getCase();
        }
    }

    /**
     * 
     * @returns {void}
     */
    dispose() {
        if (this.isInit) {
            this._base = null;
            this._element = null;
            this._case = false;
        }
    }

    /**
     * @returns {void}
     */
    show() {
        this._show = true;
    }

    /**
     * @returns {void}
     */
    hide() {
        this._show = false;
        this._showReplace = false;
        this._base.unmark();
    }

    /**
     * @returns {void}
     */
    showReplace() {
        this._show = true;
        this._showReplace = true;
    }

    /**
     * @returns {void}
     */
    hideReplace() {
        this._showReplace = false;
    }

    /**
     * 
     * @param {String} keyword 
     * @returns {void}
     */
    find(keyword) {
        this._base.unmark();
        this._replacedNodes = [];
        if (isString(keyword)) {
            let options = config('mark.options', Mark.DEFAULT_OPTIONS);
            options.caseSensitive = this.case;
            this._base.mark(keyword, options);
        }
    }

    /**
     * 
     * @param {String} keyword 
     * @param {String} replace 
     * @returns {void}
     */
    replace(keyword, replace) {
        this._base.unmark();
        this._replacedNodes = [];

        if (isString(keyword) && isString(replace)) {
            let options = Object.assign({}, config('mark.options', Mark.DEFAULT_OPTIONS));
            options.each = (node) => {
                this._replacedNodes.push(node);
                node.textContent = replace;
            };
            options.caseSensitive = this.case;
            this._base.mark(keyword, options);
        }
    }

    /**
     * 
     * @param {String} replace 
     * @returns {void}
     */
    undo(replace) {
        if (isString(replace)) {
            this._replacedNodes.forEach((node) => {
                node.textContent = replace;
            });
            this._replacedNodes = [];
        }
    }

    /**
     * 
     * @returns {void}
     */
    unmark() {
        this._base.unmark();
    }

    /**
     * 
     * @param {HTMLElement} element 
     * @returns {String}
     */
    getUnmarkHTML(element) {
        if (! (element instanceof HTMLElement)) {
            throw new NotTypeError('element', 'HTMLElement');
        }

        let clone = element.cloneNode(true);
        let mark = new Base(clone);
        mark.unmark();
        return clone.innerHTML;
    } 

    /**
     * 
     * @returns {void}
     */
    toggleCase() {
        this._case = ! this._case;
    }
}

export default Mark;