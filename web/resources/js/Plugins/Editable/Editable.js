class Editable
{
    _app = window.app;

    _selection = window.getSelection();

    _commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'insertUnorderedList', 'insertOrderedList', 'formatBlock', 'insertHorizontalRule', 'insertImage', 'createLink', 'unlink', 'insertText', 'insertHTML', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'fontName', 'fontSize', 'foreColor', 'hiliteColor', 'undo', 'redo', 'selectAll', 'delete', 'removeFormat', 'cut', 'copy'];

    _defaultOptions = {
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

    _cssMode = this._defaultOptions.cssMode;

    _editableElement = null;

    spellcheck = this._defaultOptions.spellcheck;

    get defaultOptions() {
        return this._defaultOptions;
    }

    get editableElement() {
        return this._editableElement;
    }

    get commands() {
        return this._commands;
    }

    constructor(options) {
        this._defaultOptions = this._parseOptions(options);
        this._defineDefaultParagraphSeparator(this._defaultOptions.paragraphSeparator);
        this.spellcheck = this._defaultOptions.spellcheck;
    }

    init(editableElement) {
        if (typeof editableElement == 'string') {
            let element = document.querySelector(editableElement);
            if (element) {
                this._editableElement = element;
            }
        } 
        
        if (typeof editableElement == 'object' && editableElement instanceof HTMLElement && document.contains(editableElement)) {
            this._editableElement = editableElement;
        }

        this._addEventListeners();

        if (this._editableElement) {
            return true;
        }

        return false;
    }

    dispose() {
        this._removeEventListeners();
        this._cssMode = this._defaultOptions.cssMode;
        this._editableElement = null;
        this.spellcheck = this._defaultOptions.spellcheck;
    }

    execCommand(commandId, value = null, options = {}) {
        if (! this._editableElement || ! this.hasFocus() || this._commands.indexOf(commandId) === -1) {
            return false;
        }

        let parsedOptions = this._parseOptions(options);
        let done = null;
    
        if (parsedOptions.cssMode) {
            this._onCssMode();
        }

        if (parsedOptions.checkSupport) {
            done = this._execCommandIfSupported(commandId, parsedOptions.showUI, value);
        } else {
            done = document.execCommand(commandId, parsedOptions.showUI, value);
        }

        if (done && commandId == 'fontSize' && parsedOptions.cssMode) {
            this._fontSizeFix(value);
        }

        if (parsedOptions.cssMode) {
            this._offCssMode();
        }

        if (this._app.config.globalProperties.$notifier) {
            if (done && parsedOptions.notify && parsedOptions.successNotification) {
                this._app.config.globalProperties.$notifier.push(parsedOptions.successNotification);
            } else if (! done && parsedOptions.notify && parsedOptions.errorNotification) {
                this._app.config.globalProperties.$notifier.push(parsedOptions.errorNotification);
            }
        }

        return done;
    }

    hasFocus() {
        if (this._editableElement) {
            return this._editableElement.contains(this._selection.anchorNode);
        }
        return false;
    }

    toggleSpellcheck() {
        if (this._editableElement) {
            this.spellcheck = ! this.spellcheck;

            return true;
        }
        return false;
    }

    _tab() {
        if (this._editableElement && this._selection.rangeCount) {
            let range = this._selection.getRangeAt(0);
            let tabNode = document.createTextNode("\t");
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            this._selection.removeAllRanges();
            this._selection.addRange(range);
        }
    }

    _shiftTab() {
        if (this._editableElement && this._selection.rangeCount) {
            let range = this._selection.getRangeAt(0);
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

    _deleteTagsOnPasteEvent(e) {
        let text = e.clipboardData.getData('text/plain');
        this.execCommand('insertHTML', this._cutTags(text));
    }

    _keydownEventHandler(e) {
        let self = window.app.config.globalProperties.$editable;
    
        if (e.shiftKey && e.code == 'Tab') {
            e.preventDefault();
            self._shiftTab();
        } else if (e.code == 'Tab') {
            e.preventDefault();
            self._tab();
        }
    }

    _paste(e) {
        let self = window.app.config.globalProperties.$editable;
        e.preventDefault();
        self._deleteTagsOnPasteEvent(e);
    }

    _addEventListeners() {
        if (this._editableElement) {
            this._editableElement.addEventListener('keydown', this._keydownEventHandler);
            this._editableElement.addEventListener('paste', this._paste);
        }
    }

    _removeEventListeners() {
        if (this._editableElement) {
            this._editableElement.removeEventListener('keydown', this._keydownEventHandler);
            this._editableElement.removeEventListener('paste', this._paste);
        }
    }

    _defineDefaultParagraphSeparator(separator) {
        document.execCommand('defaultParagraphSeparator', false, separator);
    }

    _onCssMode() {
        this._cssMode = true;
        document.execCommand('styleWithCSS', false, this._cssMode);
    }

    _offCssMode() {
        this._cssMode = false;
        document.execCommand('styleWithCSS', false, this._cssMode);
    }

    _parseOptions(options) {
        let parsedOptions = {};

        if (typeof options == 'object') {
            if ('showUI' in options && typeof options.showUI == 'boolean') {
                parsedOptions.showUI = options.showUI;
            } else {
                parsedOptions.showUI = this.defaultOptions.showUI;
            }
    
            if ('checkSupport' in options && typeof options.checkSupport == 'boolean') {
                parsedOptions.checkSupport = options.checkSupport;
            } else {
                parsedOptions.checkSupport = this.defaultOptions.checkSupport;
            }
            
    
            if ('notify' in options && typeof options.notify == 'boolean') {
                parsedOptions.notify = options.notify;
            } else {
                parsedOptions.notify = this.defaultOptions.notify;
            }
    
            if ('cssMode' in options && typeof options.cssMode == 'boolean') {
                parsedOptions.cssMode = options.cssMode;
            } else {
                parsedOptions.cssMode = this.defaultOptions.cssMode;
            }

            if ('paragraphSeparator' in options && typeof options.paragraphSeparator == 'string') {
                parsedOptions.paragraphSeparator = options.paragraphSeparator;
            } else {
                parsedOptions.paragraphSeparator = this.defaultOptions.paragraphSeparator;
            }

            if ('spellcheck' in options && typeof options.spellcheck == 'boolean') {
                parsedOptions.spellcheck = options.spellcheck;
            } else {
                parsedOptions.spellcheck = this.defaultOptions.spellcheck;
            }

            if ('autofocus' in options && typeof options.autofocus == 'boolean') {
                parsedOptions.autofocus = options.autofocus;
            } else {
                parsedOptions.autofocus = this.defaultOptions.autofocus;
            }
    
            if ('successNotification' in options && typeof options.successNotification == 'object') {
                parsedOptions.successNotification = options.successNotification;
            } else {
                parsedOptions.successNotification = this.defaultOptions.successNotification;
            }
    
            if ('errorNotification' in options && typeof options.errorNotification == 'object') {
                parsedOptions.errorNotification = options.errorNotification;
            } else {
                parsedOptions.errorNotification = this.defaultOptions.errorNotification;
            }
        } else {
            parsedOptions = this.defaultOptions;
        }
    
        return parsedOptions;
    }

    _execCommandIfSupported(commandId, showUI = false, value = null) {
        if (document.queryCommandSupported(commandId)) {
            return document.execCommand(commandId, showUI, value);
        }
    
        return false;
    }

    _fontSizeFix(fontSize) {
        let fontElement = this._selection.anchorNode.parentElement;
        fontElement.removeAttribute("size");
        fontElement.style.fontSize = fontSize;
    }

    _cutTags(str) {
        return str.replace(/<\/?[^>]+>/igm, '');
    }
}

export default Editable;