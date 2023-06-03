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
        updateFont($event) {
            let selection = document.getSelection(), 
                range = selection.getRangeAt(0);

            if (this.$refs.contenteditable.contains(range.startContainer)) {
                let startAnchor = document.createTextNode('');
                let endAnchor = document.createTextNode('');

                range.insertNode(startAnchor);
                range.collapse();
                range.insertNode(endAnchor);

                let nodes = this.getTextNodes(this.$refs.contenteditable);

                nodes = nodes.slice(nodes.findIndex((v) => v.isSameNode(startAnchor)) + 1);
                nodes = nodes.slice(0, nodes.findIndex((v) => v.isSameNode(endAnchor)));

                nodes.forEach((v) => {
                    this.wrap(this.$refs.contenteditable, v, (container) => {
                        container.classList.add('font');
                        container.style.fontFamily = `'${$event.name}', ${$event.family}`;
                    });
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        wrap(base, wrap, callback) {
            if (this.isContainer(wrap.parentElement, base)) {
                callback(wrap.parentElement);
            } else if (wrap.textContent) {
                let container = this.getContainer(wrap);
                wrap.before(container);
                wrap.remove();
                callback(container);
            }
        }, 
        isContainer(element, base) {
            return (! element.isSameNode(base)) && element.tagName == "SPAN" && element.childNodes.length === 1;
        }, 
        getContainer(node) {
            let container = document.createElement('span');
            container.textContent = node.textContent;
            return container;
        }, 
        getTextNodes(node) {
            let nodes = [];

            node.childNodes.forEach((v) => {
                if (v.nodeType == 3) {
                    nodes.push(v);
                } else {
                    nodes = nodes.concat(this.getTextNodes(v));
                }
            })

            return nodes;
        }, 
    }, 

    mounted () {
        this.$store.dispatch('font');
    }, 
}
</script>

<style scoped>

</style>
