<template>
    <div 
        class="relative" 
        @keyup.down.exact="focusFirstItem = true; this.default = true; open();" 
        @keyup.up.exact="focusLastItem = true; this.default = true; open();"
        >
        <div 
            ref="trigger" 
            @click="toggle"
            @keyup.enter.exact="this.default = true; open(); down();" 
            @keyup.space.exact.prevent="focusFirstItem = true; this.default = true; open();"
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
                style="display: none;"
                @click="close"
                @keyup.left.exact="defineTriggerFocus(); close();" 
                @keyup.right.exact="defineTriggerFocus(); close();" 
                @keyup.down.exact.stop="down" 
                @keyup.up.exact.stop="up"
            >
                <div ref="menu" role="menu" :id="menuToken" class="overflow-y-auto rounded-md ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 py-1" :class="[contentClass, heightClass, widthClass, alignmentClass]">
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
        'open',
        'close',  
    ], 

    data() {
        return {
            active: false, 
            default: false, 
            menu: null, 
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
        heightClass() {
            return ! this.height || this.height == 'auto' ? '' : 'h-' + this.height;
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
        height: {
            type: String, 
            default: 'auto', 
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
            this.$emit('open');
        }, 
        close() {
            this.active = false;
            this.focused = null;
            this.index = 0;
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
            this.menu = $(this.$refs.menu);
            this.items = this.menu.find('[role=menuitem]:not([tabindex=-1]) > *');
            this.trigger = $(this.$refs.trigger).find('.trigger').first();
        }, 
        defineFocused() {
            this.focused = null;
            this.index = 0;

            if (this.default) {
                this.default = false;
                return;
            }

            if (this.isFocus()) {
                this.focused = $(document.activeElement);
                this.index = this.items.index(this.focused);
            }
        }, 
        defineTriggerAriaControls() {
            this.trigger.attr('aria-controls', this.menuToken);
        }, 
        defineTriggerFocus() {
            this.trigger.focus();
        }, 
        defineTabListener() {
            $(document).on('keyup', this.tab);
        }, 
        removeTabListener() {
            $(document).off('keyup', this.tab);
        }, 
        isFocus() {
            return !! this.menu.has(document.activeElement).length;
        }, 
        tab(e) {
            if (e.code === 'Tab') {
                if (! this.isFocus()) {
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
        down() {
            this.defineFocused();

            if (!this.focused) {
                this.defineFocusToFirstItem();
            } else {
                this.defineFocusToNextItem();
            }
        }, 
        up() {
            this.defineFocused();

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
