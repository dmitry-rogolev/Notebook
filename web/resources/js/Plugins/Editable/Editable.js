import NotTypeError from "../../Classes/Errors/NotTypeError";
import { config, cutTags, isBoolean, isString, plugin } from "../../Classes/helpers";

class Editable
{
    static DEFAULT_COMMANDS = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'insertUnorderedList', 'insertOrderedList', 'formatBlock', 'insertHorizontalRule', 'insertImage', 'createLink', 'unlink', 'insertText', 'insertHTML', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'fontName', 'fontSize', 'foreColor', 'hiliteColor', 'undo', 'redo', 'selectAll', 'delete', 'removeFormat', 'cut', 'copy'];
    static DEFAULT_OPTIONS = {
        showUI: false, 
        checkSupport: true, 
        notify: true, 
        cssMode: false, 
        paragraphSeparator: 'p', 
        spellcheck: true, 
        autofocus: false,
        successNotification: null,
        errorNotification: null,
    };

    _isInit = false
    _element = null;
    _spellcheck = false
    _cssMode = false;

    /**
     * @property {Boolean}
     */
    get isInit() {
        return this._isInit;
    }

    /**
     * @property {Boolean}
     */
    get spellcheck() {
        return this._spellcheck;
    }

    set spellcheck(v) {
        if (isBoolean(v)) {
            this._spellcheck = v;
        }
    }

    /**
     * @property {Boolean}
     */
    get cssMode() {
        return this._cssMode;
    }

    set cssMode(v) {
        if (isBoolean(v)) {
            this._cssMode = v;
        }
    }

    /**
     * @returns {HTMLElement}
     */
    get element() {
        return this._element;
    }

    /**
     * 
     * @returns {Boolean}
     */
    getSpellcheck() {
        return config('editable.options.spellcheck', Editable.DEFAULT_OPTIONS.spellcheck);
    }

    /**
     * 
     * @returns {Boolean}
     */
    getCssMode() {
        return config('editable.options.cssMode', Editable.DEFAULT_OPTIONS.cssMode);
    }

    constructor() {
        this._defineDefaultParagraphSeparator(config('editable.options.paragraphSeparator', Editable.DEFAULT_OPTIONS.paragraphSeparator));
    }

    /**
     * 
     * @param {String} separator 
     * @returns {void}
     */
    _defineDefaultParagraphSeparator(separator) {
        if (! isString(separator)) {
            throw new NotTypeError('separator', 'string');
        }

        document.execCommand('defaultParagraphSeparator', false, separator);
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
            this._spellcheck = this.getSpellcheck();
            this._cssMode = this.getCssMode();  
            this._addEventListeners();
            this._isInit = true;
        }
    }

    /**
     * 
     * @returns {void}
     */
    dispose() {
        if (this.isInit) {
            this._removeEventListeners();
            this._element = null;
            this._spellcheck = false;
            this._cssMode = false;  
            this._isInit = false;
        }
    }

    /**
     * 
     * @returns {void}
     */
    execCommand(commandId, value = null, options = {}) {
        if (! this.isInit || ! this.hasFocus() || config('editable.commands', Editable.DEFAULT_COMMANDS).indexOf(commandId) === -1) {
            return false;
        }

        let options = config('editable.options', Editable.DEFAULT_OPTIONS);
        let done = null;
    
        if (this.cssMode) {
            this.onCssMode();
        }

        if (config('editable.options.checkSupport', Editable.DEFAULT_OPTIONS.checkSupport)) {
            done = this.execCommandIfSupported(commandId, config('editable.options.showUI', Editable.DEFAULT_OPTIONS.showUI), value);
        } else {
            done = document.execCommand(commandId, config('editable.options.showUI', Editable.DEFAULT_OPTIONS.showUI), value);
        }

        if (done && commandId == 'fontSize' && this.cssMode) {
            this._fontSizeFix(value);
        }

        if (this.cssMode) {
            this.offCssMode();
        }

        return done;
    }

    /**
     * 
     * @returns {Boolean}
     */
    hasFocus() {
        if (this.isInit) {
            return this._element.contains(window.getSelection().anchorNode);
        }
        return false;
    }

    /**
     * @returns {void}
     */
    onCssMode() {
        document.execCommand('styleWithCSS', false, true);
    }

    /**
     * @returns {void}
     */
    offCssMode() {
        document.execCommand('styleWithCSS', false, false);
    }

    /**
     * 
     * @param {String} commandId 
     * @param {Boolean} showUI 
     * @param {any} value 
     * @returns {Boolean}
     */
    execCommandIfSupported(commandId, showUI = false, value = null) {
        if (document.queryCommandSupported(commandId)) {
            return document.execCommand(commandId, showUI, value);
        }
    
        return false;
    }

    /**
     * 
     * @param {String} fontSize 
     * @returns {void}
     */
    _fontSizeFix(fontSize) {
        let fontElement = window.getSelection().anchorNode.parentElement;
        fontElement.removeAttribute("size");
        fontElement.style.fontSize = fontSize;
    }

    /**
     * @returns {void}
     */
    toggleSpellcheck() {
        this.spellcheck = ! this.spellcheck;
    }

    /**
     * @returns {void}
     */
    _tab() {
        if (this.isInit && window.getSelection().rangeCount) {
            let range = window.getSelection().getRangeAt(0);
            let tabNode = document.createTextNode("\t");
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }

    /**
     * @returns {void}
     */
    _shiftTab() {
        if (this.isInit && window.getSelection().rangeCount) {
            let range = window.getSelection().getRangeAt(0);
            let anchor = document.createTextNode('');
            range.insertNode(anchor);

            let node = anchor;
            
            while (node = node.previousSibling) {
                if (node.textContent && node.textContent != '\t') {
                    break;
                } else if (node.textContent == '\t') {
                    node.remove();
                    break;
                }
            }

            anchor.remove();
        }
    }

    /**
     * @returns {void}
     */
    _deleteTagsOnPasteEvent(e) {
        this.execCommand('insertHTML', cutTags(e.clipboardData.getData('text/plain')));
    }

    /**
     * @returns {void}
     */
    _keydownEventHandler(e) {
        if (e.shiftKey && e.code == 'Tab') {
            e.preventDefault();
            plugin('editable')._shiftTab();
        } else if (e.code == 'Tab') {
            e.preventDefault();
            plugin('editable')._tab();
        }
    }

    /**
     * @returns {void}
     */
    _paste(e) {
        e.preventDefault();
        plugin('editable')._deleteTagsOnPasteEvent(e);
    }

    /**
     * @returns {void}
     */
    _keyup(e) {
        e.preventDefault();
        e.stopPropagation();

        if (plugin('window').file.id && ! plugin('window').file.isTrashed) {
            // Find
            if (e.altKey && e.code == 'KeyF') {
                plugin('mark').show();
            } 

            // Replace
            else if (e.altKey && e.code == 'KeyR') {
                plugin('mark').showReplace();
            } 
        }
    }

    /**
     * @returns {void}
     */
    _addEventListeners() {
        if (this.element instanceof HTMLElement) {
            this._editableElement.addEventListener('keydown', this._keydownEventHandler);
            this._editableElement.addEventListener('paste', this._paste);
            document.addEventListener('keyup', this._keyup);
        }
    }

    /**
     * @returns {void}
     */
    _removeEventListeners() {
        if (this.element instanceof HTMLElement) {
            this._editableElement.removeEventListener('keydown', this._keydownEventHandler);
            this._editableElement.removeEventListener('paste', this._paste);
            document.removeEventListener('keyup', this._keyup);
        }
    }
}

export default Editable;