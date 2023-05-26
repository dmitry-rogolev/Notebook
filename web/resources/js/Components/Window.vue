<template>
    <section class="bg-gray-100 dark:bg-slate-800 shadow flex flex-col flex-auto">
        <div 
            @keyup.left="left" 
            @keyup.right="right" 
            ref="menu" 
            role="menubar" 
            class="relative bg-gray-100 dark:bg-slate-700 border-b border-gray-300 dark:border-gray-600 shadow flex px-1 sm:px-2 print:hidden"
            >
            <slot name="menu"></slot>
        </div>
        <div class="relative">
            <slot name="header"></slot>
        </div>
        <div class="flex-auto relative">
            <slot name="body"></slot>
        </div>
        <div class="relative">
            <slot name="footer"></slot>
        </div>
    </section>
</template>

<script>
export default {
    name: 'WindowComponent', 

    data() {
        return {
            items: null, 
            index: 0, 
            focused: null, 
            menu: null, 
        };
    }, 

    methods: {
        defineValues() {
            this.menu = $(this.$refs.menu);
            this.items = $(this.$refs.menu).children(':not([tabindex=-1])').find('.trigger');
        }, 
        defineFocused() {
            this.focused = null;
            this.index = 0;

            if (this.isFocus()) {
                this.focused = $(document.activeElement);
                this.index = this.items.index(this.focused);
            }
        }, 
        isFocus() {
            return !! this.menu.has(document.activeElement).length;
        },  
        left() {
            this.defineFocused();

            if (this.focused) {
                this.defineFocusToPrevItem();
            } else {
                this.defineFocusToLastItem();
            }
        }, 
        right() {
            this.defineFocused();

            if (this.focused) {
                this.defineFocusToNextItem();
            } else {
                this.defineFocusToFirstItem();
            }
        }, 
        defineFocusToFirstItem() {
            this.index = 0;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToLastItem() {
            this.index = this.items.length - 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToNextItem() {
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
        defineFocusToPrevItem() {
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.eq(this.index);
            this.focused.focus();
        }, 
    }, 

    mounted() {
        this.defineValues();
    }, 
};
</script>