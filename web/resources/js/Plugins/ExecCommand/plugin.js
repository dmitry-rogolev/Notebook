'use strict';

let vue = null;
let commands = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'insertUnorderedList', 'insertOrderedList', 'formatBlock', 'insertHorizontalRule', 'insertImage', 'createLink', 'unlink', 'insertText', 'insertHTML', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'fontName', 'fontSize', 'foreColor', 'hiliteColor', 'undo', 'redo', 'selectAll', 'delete', 'removeFormat', 'cut', 'copy'];

function parseOptions(options) {
    let showUI = false;
    let checkSupport = true;
    let notify = true;
    let cssMode = false;
    let successNotification = null;
    let errorNotification = {
        message: 'This command is not supported in your browser.', 
        error: true, 
    };

    if (typeof options == 'object') {
        if ('showUI' in options && typeof options.showUI == 'boolean') {
            showUI = options.showUI;
        }

        if ('checkSupport' in options && typeof options.checkSupport == 'boolean') {
            checkSupport = options.checkSupport;
        }

        if ('notify' in options && typeof options.notify == 'boolean') {
            notify = options.notify;
        }

        if ('cssMode' in options && typeof options.cssMode == 'boolean') {
            cssMode = options.cssMode;
        }

        if ('successNotification' in options && typeof options.successNotification == 'object') {
            successNotification = options.successNotification;
        }

        if ('errorNotification' in options && typeof options.errorNotification == 'object') {
            errorNotification = options.errorNotification;
        }
    }

    return {
        showUI: showUI, 
        checkSupport: checkSupport, 
        notify: notify, 
        cssMode: cssMode, 
        successNotification: successNotification, 
        errorNotification: errorNotification, 
    };
}
function execCommand(commandId, value = null, options = {}) {
    if (commands.indexOf(commandId) === -1) {
        return false;
    } 

    let parsedOptions = parseOptions(options);
    let done = null;

    if (parsedOptions.cssMode) {
        document.execCommand('styleWithCSS', false, true);
    }

    if (parsedOptions.checkSupport) {
        done = execCommandIfSupported(commandId, parsedOptions.showUI, commandId == 'fontSize' ? '1' : value);
    } else {
        done = document.execCommand(commandId, parsedOptions.showUI, value);
    }

    if (done && commandId == 'fontSize' && parsedOptions.cssMode) {
        fontSizeFix(value);
    }

    if (parsedOptions.cssMode) {
        document.execCommand('styleWithCSS', false, false);
    }

    if (done === null) {
        return false;
    }

    if (done && parsedOptions.notify && parsedOptions.successNotification) {
        vue.config.globalProperties.$notifier.push(parsedOptions.successNotification);
    } else if (! done && parsedOptions.notify && parsedOptions.errorNotification) {
        vue.config.globalProperties.$notifier.push(parsedOptions.errorNotification);
    }

    return done;
}
function execCommandIfSupported(commandId, showUI = false, value = null) {
    if (document.queryCommandSupported(commandId)) {
        return document.execCommand(commandId, showUI, value);
    }

    return false;
}
function fontSizeFix(fontSize) {
    var fontElement = window.getSelection().anchorNode.parentElement;
    fontElement.removeAttribute("size");
    fontElement.style.fontSize = fontSize;
}

export default {
    install: (app) => {
        vue = app;
        app.config.globalProperties.$execCommand = execCommand;
    }, 
};
