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
        mark(isContainerCallback, containerCallback, updateContainerCallback = null) {
            let range = document.getSelection().getRangeAt(0);

            console.log(range);

            if (this.$refs.contenteditable.contains(range.startContainer)) {
                let nodes = this.getTextNodesFromRange(this.$refs.contenteditable);
                console.log(nodes);

                nodes.forEach((textNode) => {
                    this.wrapTextNode(textNode, isContainerCallback, containerCallback, updateContainerCallback);
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        wrapTextNode(node, isContainerCallback, createContainerCallback, updateContainerCallback = null) {
            if (node && node.nodeType == 3) {
                let container = null;
                let parent = node.parentElement;
                let isContainer = isContainerCallback(parent);

                if (! isContainer) {
                    container = createContainerCallback(node);
                    console.log('! isContainer')
                    node.before(container);
                    node.remove();
                } else if(isContainer && parent.childNodes.length == 1) {
                    let text = '';

                    console.log('isContainer && parent.childNodes.length == 1')

                    if (updateContainerCallback) {
                        updateContainerCallback(parent);
                    } else {
                        if (parent.previousSibling && parent.previousSibling.nodeType == 3) {
                            text += parent.previousSibling.textContent;
                            parent.previousSibling.remove();
                        }

                        text += node.textContent;

                        if (parent.nextSibling && parent.nextSibling.nodeType == 3) {
                            text += parent.nextSibling.textContent;
                            parent.nextSibling.remove();
                        }

                        parent.before(document.createTextNode(text));
                        parent.remove();
                    }
                } else if (isContainer && parent.childNodes.length > 1) {
                    console.log('isContainer && parent.childNodes.length > 1')

                    let childNodes = Array.from(parent.childNodes);
                    let index = childNodes.findIndex((v) => v.isSameNode(node));

                    console.log(childNodes);
                    console.log(index);

                    if (index === 0) {
                        let text = '';

                        if (parent.previousSibling && parent.previousSibling.nodeType == 3) {
                            text += parent.previousSibling.textContent;
                            text += node.textContent;
                            parent.previousSibling.textContent = text;
                        } else {
                            text += node.textContent;
                            parent.before(document.createTextNode(text))
                        }
                        
                        node.remove();
                    } else if (index == childNodes.length - 1) {
                        let text = '';

                        text += node.textContent;

                        if (parent.nextSibling && parent.nextSibling.nodeType == 3) {
                            text += parent.nextSibling.textContent;
                            parent.nextSibling.textContent = text;
                        } else {
                            parent.after(document.createTextNode(text));
                        }

                        node.remove();
                    } else {
                        let before = parent.cloneNode();
                        let after = parent.cloneNode();
                        childNodes.slice(0, index).forEach((v) => before.append(v));
                        childNodes.slice(index + 1).forEach((v) => after.append(v));
                        parent.before(before);
                        parent.before(node);
                        parent.after(after);
                        parent.remove();
                    }
                } 
            }
        }, 
        getTextNodesFromRange(element) {
            let from = document.createTextNode(''),
                to = document.createTextNode(''), 
                range = document.getSelection().getRangeAt(0);
                
            range.insertNode(from);
            range.collapse();
            range.insertNode(to);

            let nodes = this.getTextNodes(element);

            nodes = nodes.filter((v) => {
                if (! v.textContent && ! v.isSameNode(from) && ! v.isSameNode(to)) {
                    v.remove();
                    return false;
                }
                return true;
            });

            nodes = nodes.slice(nodes.findIndex((v) => v.isSameNode(from)) + 1, nodes.findIndex((v) => v.isSameNode(to)));

            from.remove();
            to.remove();

            return nodes;
        }, 
        getTextNodes(element) {
            let nodes = [];

            element.childNodes.forEach((v) => {
                if (v.nodeType == 3) {
                    nodes.push(v);
                } else {
                    nodes = nodes.concat(this.getTextNodes(v));
                }
            });

            return nodes;
        }, 
        font($font) {
            let isContainer = (parent) => {
                return parent && 
                        parent.nodeType == 1 && 
                        ! parent.isSameNode(this.$refs.contenteditable) && 
                        parent.tagName == 'SPAN' && 
                        parent.classList.contains('font');
            };

            let createContainer = (textNode) => {
                let container = document.createElement('span');
                container.textContent = textNode.textContent;
                container.classList.add('font');
                container.style.fontFamily = `'${$font.name}', ${$font.family}`;
                return container;
            };

            let updateContainer = (container) => {
                container.style.fontFamily = `'${$font.name}', ${$font.family}`;
            };

            this.mark(isContainer, createContainer, updateContainer);
        }, 
        fontSize($fontSize) {
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
                        container.classList.add('font-size');
                        container.style.fontSize = `${$fontSize.size}${$fontSize.unit}`;
                    });
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        italic() {
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

                let style = '';

                nodes.forEach((v) => {
                    this.wrap(this.$refs.contenteditable, v, (container) => {
                        console.log(style)
                        if (! style) {
                            if (container.classList.contains('italic')) {
                                style = 'not-italic';
                            } else {
                                style = 'italic';
                            }
                        } 

                        container.classList.remove('italic');
                        container.classList.remove('not-italic');
                        container.classList.add(style);

                        if (style == 'italic') {
                            container.style.fontStyle = 'italic';
                        } else {
                            container.style.fontStyle = 'normal';
                        }
                    });
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        bold() {
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
                        if (container.classList.contains('font-bold')) {
                            container.classList.remove('font-bold');
                        } else if(container.closest('.font-bold')) {
                            container.classList.add('font-normal');
                        } else {
                            if (container.classList.contains('font-normal')) {
                                container.classList.remove('font-normal');
                            }

                            container.classList.add('font-bold');
                        }
                    });
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        lineHeight($lineHeight) {
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
                        container.classList.add('line-height');
                        container.style.lineHeight = $lineHeight;
                    });
                });

                this.$emit('update', this.$refs.contenteditable.innerHTML);
            }
        }, 
        selectionChange() {
            this.$store.commit('range', window.getSelection().getRangeAt(0));
        }, 
        addSelectionChangeListener() {
            document.addEventListener('selectionchange', this.selectionChange);
        }, 
        removeSelectionChangeListener() {
            document.removeEventListener('selectionchange', this.selectionChange);
        }, 
    }, 

    mounted () {
        this.$store.dispatch('font');
        // this.addSelectionChangeListener();
    }, 

    unmounted() {
        // this.removeSelectionChangeListener();
    }, 
}
</script>

<style scoped>

</style>
