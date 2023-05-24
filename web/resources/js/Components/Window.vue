<template>
    <section class="bg-white dark:bg-gray-800 shadow flex flex-col flex-auto">
        <div 
            @keyup.left="left" 
            @keyup.right="right" 
            @keyup.tab.exact="right"
            @keyup.shift.tab.exact="left"
            @keyup.down="isBlur = true"
            @keyup.up="isBlur = true"
            @keyup.enter="isBlur = true"
            @keyup.space="isBlur = true"
            ref="menu" 
            role="menubar" 
            class="bg-gray-100 dark:bg-gray-700 border-b border-solid border-gray-100 dark:border-gray-800 h-8 shadow flex"
            >
            <slot name="menu"></slot>
        </div>
        <div>
            <slot name="header"></slot>
        </div>
        <div class="flex-auto">
            <slot name="body"></slot>
        </div>
        <div>
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
            isBlur: false, 
        };
    }, 

    methods: {
        defineValues() {
            this.items = $(this.$refs.menu).children(':not([tabindex=-1])');
        }, 
        defineTabListener() {
            $(document).on('keyup', this.tab);
        }, 
        removeTabListener() {
            $(document).off('keyup', this.tab);
        }, 
        isNoFocus() {
            return ! this.items.has(document.activeElement).length;
        }, 
        tab(e) {
            if (e.code === 'Tab') {
                if (this.isNoFocus()) {
                    this.index = 0;
                    this.focused = null;
                }
            }
        }, 
        defineFocusedClickListener() {
            this.focused.on('click', this.focusedClick);
        }, 
        removeFocusedClickListener() {
            if (this.focused) {
                this.focused.off('click', this.focusedClick);
            }
        }, 
        focusedClick() {
            this.isBlur = true;
        }, 
        left() {
            if (! this.isBlur) {
                if (this.focused) {
                    this.defineFocusToPrevItem();
                } else {
                    this.defineFocusToLastItem();
                }
            } else {
                this.isBlur = false;
            }
        }, 
        right() {
            this.isBlur = false;

            if (this.focused) {
                this.defineFocusToNextItem();
            } else {
                this.defineFocusToFirstItem();
            }
        }, 
        defineFocusToFirstItem() {
            this.removeFocusedClickListener();
            this.index = 0;
            this.focused = this.items.eq(this.index);
            this.focused.find('.trigger').first().focus();
            this.defineFocusedClickListener();
        }, 
        defineFocusToLastItem() {
            this.removeFocusedClickListener();
            this.index = this.items.length - 1;
            this.focused = this.items.eq(this.index);
            this.focused.find('.trigger').first().focus();
            this.defineFocusedClickListener();
        }, 
        defineFocusToNextItem() {
            this.removeFocusedClickListener();
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.eq(this.index);
            this.focused.find('.trigger').first().focus();
            this.defineFocusedClickListener();
        }, 
        defineFocusToPrevItem() {
            this.removeFocusedClickListener();
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.eq(this.index);
            this.focused.find('.trigger').first().focus();
            this.defineFocusedClickListener();
        }, 
    }, 

    mounted() {
        this.defineValues();
        this.defineTabListener();
    }, 

    unmounted() {
        this.removeTabListener();
    }, 
};
</script>