<template>
    <div 
        ref="contenteditable" 
        @input="$emit('update', $event.target.innerHTML)" 
        @keydown.prevent.stop.tab.exact="tab"
        @keydown.prevent.stop.tab.shift.exact="shiftTab"
        @paste="paste"
        autofocus 
        :style="{tabSize: 4}"
        class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-wrap overflow-auto" 
        role="textbox" 
        contenteditable="true" 
        aria-multiline="true"
        :spellcheck="spellcheck"
        >
        
    </div>
</template>

<script>
import { cutTags } from '@/helpers';

export default {
    name: 'WindowContentEditablePartial', 

    emits: [
        'update', 
    ], 

    data () {
        return {
            commands: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'insertUnorderedList', 'insertOrderedList', 'formatBlock', 'insertHorizontalRule', 'insertImage', 'createLink', 'unlink', 'insertText', 'insertHTML', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'fontName', 'fontSize', 'foreColor', 'hiliteColor', 'undo', 'redo', 'selectAll', 'delete', 'removeFormat', 'cut', 'copy'],
        };
    },

    props: {
        text: {
            type: String,
            required: true, 
        },
        spellcheck: {
            type: Boolean, 
            default: false, 
        }, 
    },

    methods: {
        parseOptions(options) {
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
        }, 
        execCommand(commandId, value = null, options = {}) {
            if (this.commands.indexOf(commandId) === -1) {
                return false;
            } 

            let parsedOptions = this.parseOptions(options);
            let done = null;

            if (parsedOptions.cssMode) {
                document.execCommand('styleWithCSS', false, true);
            }

            if (parsedOptions.checkSupport) {
                done = this.execCommandIfSupported(commandId, parsedOptions.showUI, commandId == 'fontSize' ? '1' : value);
            } else {
                done = document.execCommand(commandId, parsedOptions.showUI, value);
            }

            if (done && commandId == 'fontSize' && parsedOptions.cssMode) {
                this.fontSizeFix(value);
            }

            if (parsedOptions.cssMode) {
                document.execCommand('styleWithCSS', false, false);
            }

            if (done === null) {
                return false;
            }

            if (done && parsedOptions.notify && parsedOptions.successNotification) {
                this.$notifier.push(parsedOptions.successNotification);
            } else if (! done && parsedOptions.notify && parsedOptions.errorNotification) {
                this.$notifier.push(parsedOptions.errorNotification);
            }

            return done;
        }, 
        execCommandIfSupported(commandId, showUI = false, value = null) {
            if (document.queryCommandSupported(commandId)) {
                return document.execCommand(commandId, showUI, value);
            }

            return false;
        }, 
        fontSizeFix(fontSize) {
            var fontElement = window.getSelection().anchorNode.parentElement;
            fontElement.removeAttribute("size");
            fontElement.style.fontSize = fontSize;
        },
        tab() {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
            let tabNode = document.createTextNode("\t");
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            selection.removeAllRanges();
            selection.addRange(range);
        }, 
        shiftTab() {
            let selection = window.getSelection();
            let range = selection.getRangeAt(0);
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
        }, 
        paste($event) {
            $event.preventDefault();
            let text = $event.clipboardData.getData('text/plain');
            this.execCommand('insertHTML', cutTags(text));
        }, 
    }, 

    mounted () {
        document.execCommand('defaultParagraphSeparator', false, 'p');
    }, 
}
</script>

<style scoped>

</style>
