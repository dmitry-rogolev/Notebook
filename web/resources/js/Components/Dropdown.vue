<template>
    <div 
        class="relative" 
        @keyup.down.exact="focusFirstItem = true; open();" 
        @keyup.up.exact="focusLastItem = true; open();"
        >
        <div 
            ref="trigger" 
            @click="toggle"
            @keyup.enter.exact="open(); down();" 
            @keyup.space.exact.prevent="open(); down();"
            >
            <slot name="trigger"></slot>
        </div>

        <div v-show="active" class="fixed inset-0 z-40" @click="close"></div>

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
            @after-enter="afterEnter"
        >
            <div
                v-show="active"
                class="absolute z-50 mt-2 rounded-md shadow-lg"
                :class="[widthClass, alignmentClass]"
                style="display: none;"
                @click="close"
                @keyup.left.exact="close" 
                @keyup.right.exact="close" 
                @keyup.down.exact="down" 
                @keyup.up.exact="up"
                @keyup.tab.exact.stop="down"
                @keyup.shift.tab.exact.stop="up"
            >
                <div ref="menu" role="menu" :id="menuToken" class="rounded-md ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800" :class="contentClass">
                    <slot name="content"></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { token } from '@/helpers';

export default {
    name: 'DropdownComponent', 

    emits: [
        'show',
        'close',  
    ], 

    data() {
        return {
            active: false, 
            items: null, 
            index: 0, 
            focused: null, 
            menuToken: token(), 
            trigger: null, 
            focusFirstItem: false, 
            focusLastItem: false, 
        };
    }, 

    computed: {
        widthClass() {
            return 'w-' + this.width;
        }, 
        alignmentClass() {
            if (this.align == 'left') {
                return 'origin-top-left left-0';
            }

            if (this.align == 'right') {
                return 'origin-top-right right-0';
            }

            return 'origin-top';
        }, 
    }, 

    props: {
        contentClass: {
            type: [ Array, String ],
            default: () => ['py-1', 'bg-white', 'dark:bg-gray-700'],
        },
        width: {
            type: String, 
            default: '48', 
        }, 
        align: {
            type: String, 
            default: '', 
        }, 
    }, 

    methods: {
        open() {
            this.active = true;
            this.defineTabListener();
            this.$emit('show');
        }, 
        close() {
            this.active = false;
            this.focused = null;
            this.removeTabListener();
            this.$emit('close');
        }, 
        toggle() {
            if (this.active) {
                this.close();
            } else {
                this.open();
            }
        }, 
        defineValues() {
            this.items = $(this.$refs.menu).children('[role=menuitem]:not([tabindex=-1])');
            this.trigger = $(this.$refs.trigger).find('.trigger').first();
        }, 
        defineTriggerAriaControls() {
            this.trigger.attr('aria-controls', this.menuToken);
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
                    this.close();
                }
            }
        }, 
        afterEnter() {
            if (this.focusFirstItem) {
                this.focusFirstItem = false;
                this.down();
            } else if (this.focusLastItem) {
                this.focusLastItem = false;
                this.up();
            }
        }, 
        defineFocusToFirstItem() {
            this.index = 0;
            this.focused = this.items.eq(this.index);
            this.focused.children().first().focus();
        }, 
        defineFocusToLastItem() {
            this.index = this.items.length - 1;
            this.focused = this.items.eq(this.index);
            this.focused.children().first().focus();
        }, 
        defineFocusToNextItem() {
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.eq(this.index);
            this.focused.children().first().focus();
        }, 
        defineFocusToPrevItem() {
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.eq(this.index);
            this.focused.children().first().focus();
        }, 
        down() {
            if (!this.focused) {
                this.defineFocusToFirstItem();
            } else {
                this.defineFocusToNextItem();
            }
        }, 
        up() {
            if (!this.focused) {
                this.defineFocusToLastItem();
            } else {
                this.defineFocusToPrevItem();
            }
        }, 
    }, 

    mounted() {
        this.defineValues();

        if (this.trigger) {
            this.defineTriggerAriaControls();
        }
    }, 
};
</script>
