import Base from 'mark.js';

class Mark 
{
    _base = null;
    _element = null;
    _show = false;
    _showReplace = false;
    _replacedNodes = [];
    _defaultOptions = {
        element: 'span', 
        className: 'bg-indigo-200 dark:bg-indigo-900', 
        acrossElements: true, 
        caseSensitive: false, 
        separateWordSearch: false, 
    };

    get element() {
        return this._element;
    }

    get isShow() {
        return this._show;
    }

    get isShowReplace() {
        return this._showReplace;
    }

    constructor(options = {}) {
        
    }

    init(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            this._base = new Base(element);
            this._element = element;

            return true;
        }

        return false;
    }

    dispose() {
        if (this.isInit()) {
            this._base = null;
            this._element = null;
        }
    }

    isInit() {
        return !! this._element;
    }

    show() {
        this._show = true;
    }

    hide() {
        this._show = false;
        this._showReplace = false;
        this._base.unmark();
    }

    showReplace() {
        this._show = true;
        this._showReplace = true;
    }

    hideReplace() {
        this._showReplace = false;
    }

    find(keyword) {
        this._base.unmark();
        this._replacedNodes = [];
        if (keyword) {
            this._base.mark(keyword, this._defaultOptions);
        }
    }

    replace(keyword, replace) {
        this._base.unmark();
        this._replacedNodes = [];
        if (keyword && replace) {
            let options = Object.assign({}, this._defaultOptions);
            options.each = (node) => {
                this._replacedNodes.push(node);
                node.textContent = replace;
            };
            this._base.mark(keyword, options);
        }
    }

    undo(replace) {
        if (this._replacedNodes) {
            this._replacedNodes.forEach((node) => {
                node.textContent = replace;
            });
            this._replacedNodes = [];
        }
    }

    unmark() {
        this._base.unmark();
    }

    getUnmarkHTML(element) {
        if (element && typeof element == 'object' && element instanceof HTMLElement) {
            let clone = element.cloneNode(true);
            let mark = new Base(clone);
            mark.unmark();
            return clone.innerHTML;
        }

        return false;
    } 

    toggleCase() {
        this._defaultOptions.caseSensitive = ! this._defaultOptions.caseSensitive;
    }
}

export default Mark;