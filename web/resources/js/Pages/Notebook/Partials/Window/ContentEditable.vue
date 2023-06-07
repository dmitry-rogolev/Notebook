<template>
    <div 
        ref="contenteditable" 
        @input="$emit('update', $event.target.innerHTML)" 
        autofocus 
        class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-line overflow-y-auto overflow-x-hidden " 
        role="textbox" 
        contenteditable="true" 
        aria-multiline="true"
        :spellcheck="spellcheck"
        >

    </div>
</template>

<script>
export default {
    name: 'WindowContentEditablePartial', 

    emits: [
        'update', 
        'create:notification', 
    ], 

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
        insertList($event) {
            let tag, mark;

            switch($event) {
                case 'decimal': tag = 'ol'; mark = 'decimal'; break;
                case 'decimal-leading-zero': tag = 'ol'; mark = 'decimal-leading-zero'; break;
                case 'upper-roman': tag = 'ol'; mark = 'upper-roman'; break;
                case 'lower-roman': tag = 'ol'; mark = 'lower-roman'; break;
                case 'upper-alpha': tag = 'ol'; mark = 'upper-alpha'; break;
                case 'lower-alpha': tag = 'ol'; mark = 'lower-alpha'; break;
                case 'lower-greek': tag = 'ol'; mark = 'lower-greek'; break;
                case 'armenian': tag = 'ol'; mark = 'armenian'; break;
                case 'georgian': tag = 'ol'; mark = 'georgian'; break;
                case 'disc': tag = 'ul'; mark = 'disc'; break;
                case 'circle': tag = 'ul'; mark = 'circle'; break;
                case 'square': tag = 'ul'; mark = 'square'; break;
                default: tag = 'ul'; mark = 'disc'; break;
            };

            let selection = window.getSelection(), 
                range = selection.getRangeAt(0), 
                div = document.createElement('div'), 
                list = document.createElement(tag), 
                li = document.createElement('li');

            list.classList.add('list-inside');
            list.style.listStyleType = mark;
            
            list.append(li);
            div.append(list);
            range.insertNode(div);

            this.setCursor(li);

            this.$emit('update', this.$refs.contenteditable.innerHTML);
        }, 
        setCursor(el, offset = 0) {
            let range = new Range(), 
                selection = window.getSelection();

            range.setStart(el, offset);
            range.collapse(true);

            selection.removeAllRanges();
            selection.addRange(range);
        }, 
        insertSymbol($event) {
            let range = document.getSelection().getRangeAt(0), 
                span = document.createElement('span');

            span.innerHTML = $event;

            range.insertNode(span);
            this.setCursor(span, 1);

            this.$emit('update', this.$refs.contenteditable.innerHTML);
        }, 
        bold() {
            if (document.queryCommandSupported('bold')) {
                document.execCommand('bold', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        italic() {
            if (document.queryCommandSupported('italic')) {
                document.execCommand('italic', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        underline() {
            if (document.queryCommandSupported('underline')) {
                document.execCommand('underline', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        strikethrough() {
            if (document.queryCommandSupported('strikethrough')) {
                document.execCommand('strikethrough', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        superscript() {
            if (document.queryCommandSupported('superscript')) {
                document.execCommand('superscript', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        subscript() {
            if (document.queryCommandSupported('subscript')) {
                document.execCommand('subscript', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        insertUnorderedList() {
            if (document.queryCommandSupported('insertUnorderedList')) {
                document.execCommand('insertUnorderedList', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        insertOrderedList() {
            if (document.queryCommandSupported('insertOrderedList')) {
                document.execCommand('insertOrderedList', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        insertOrderedList() {
            if (document.queryCommandSupported('insertOrderedList')) {
                document.execCommand('insertOrderedList', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        format($tag) {
            if (document.queryCommandSupported('formatBlock')) {
                document.execCommand('formatBlock', false, $tag);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        insertHorizontalRule() {
            if (document.queryCommandSupported('insertHorizontalRule')) {
                document.execCommand('insertHorizontalRule', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        insertImage($url) {
            if (document.queryCommandSupported('insertImage')) {
                document.execCommand('insertImage', false, $url);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        createLink($link) {
            if (document.queryCommandSupported('createLink')) {
                document.execCommand('createLink', false, $link);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        unlink() {
            if (document.queryCommandSupported('unlink')) {
                document.execCommand('unlink', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        justifyLeft() {
            if (document.queryCommandSupported('justifyLeft')) {
                document.execCommand('justifyLeft', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        justifyCenter() {
            if (document.queryCommandSupported('justifyCenter')) {
                document.execCommand('justifyCenter', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        justifyRight() {
            if (document.queryCommandSupported('justifyRight')) {
                document.execCommand('justifyRight', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        justifyFull() {
            if (document.queryCommandSupported('justifyFull')) {
                document.execCommand('justifyFull', false, null);
            } else {
                this.$emit('create:notification', {
                    message: 'This command is not supported in your browser.', 
                    error: true, 
                });
            }
        }, 
        font($font) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('fontName', false, `'${$font.name}', ${$font.family}`);
            document.execCommand('styleWithCSS', false, false);
        }, 
        fontSize($fontSize) {
            console.log($fontSize);
            document.execCommand('fontSize', false, '1');
            var fontElement = window.getSelection().anchorNode.parentElement;
            fontElement.removeAttribute("size");
            fontElement.style.fontSize = $fontSize;
        }, 
        foreColor($color) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('foreColor', false, $color);
            document.execCommand('styleWithCSS', false, false);
        }, 
        hiliteColor($color) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('hiliteColor', false, $color);
            document.execCommand('styleWithCSS', false, false);
        }, 
    }, 

    mounted () {
        this.$store.dispatch('font');
    }, 
}
</script>

<style scoped>

</style>
