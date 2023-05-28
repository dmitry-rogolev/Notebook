<template>
    <ModalComponent :active="active" @close="$emit('close')" @after-enter="afterEnter">
        <template #header>
            <div class="px-4 py-2">
                <h5 class="text-base">Insert list</h5>
            </div>
        </template>
        <template #content>
            <div class="px-4 pb-4 pt-2">
                <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                    <li role="menuitem" class="mr-4">
                        <TabLinkComponent @click="openNumbered" :active="isNumbered" :aria-controls="numberedToken">
                            <i class="fa-solid fa-list-ol w-6 text-center mr-2"></i>
                            <span>Numbered</span>
                        </TabLinkComponent>
                    </li>
                    <li role="menuitem">
                        <TabLinkComponent @click="openNotNumbered" :active="isNotNumbered" :aria-controls="notNumberedToken">
                            <i class="fa-solid fa-list w-6 text-center mr-2"></i>
                            <span>Not numbered</span>
                        </TabLinkComponent>
                    </li>
                </ul>
                <div 
                    ref="cards"
                    @keyup.left="left" 
                    @keyup.right="right" 
                    >
                    <transition 
                        mode="out-in"
                        enter-active-class="transition ease-out duration-300"
                        enter-from-class="opacity-0"
                        leave-active-class="transition ease-in duration-200"
                        leave-to-class="opacity-0"
                        @after-enter="afterEnter"
                        >
                        <ul v-if="isNumbered" :id="numberedToken" role="menu" class="flex flex-wrap">
                            <li role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', 'decimal'); $emit('close');">
                                    <ol class="list-decimal list-inside text-xs px-3 py-3 w-20">
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ol>
                                </CardButtonComponent>
                            </li>
                            <li v-for="mark in numbered" role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', mark); $emit('close');">
                                    <ol class="list-inside text-xs px-3 py-3 w-20" :class="['list-[' + mark + ']']">
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ol>
                                </CardButtonComponent>
                            </li>
                        </ul>
                        <ul v-else-if="isNotNumbered" :id="notNumberedToken" role="menu" class="flex flex-wrap">
                            <li role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', 'disc'); $emit('close');">
                                    <ul class="list-disc list-inside text-xs px-3 py-3 w-20">
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ul>
                                </CardButtonComponent>
                            </li>
                            <li v-for="mark in notNumbered" role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', mark); $emit('close');">
                                    <ul class="list-inside text-xs px-3 py-3 w-20" :class="['list-[' + mark + ']']">
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ul>
                                </CardButtonComponent>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
        </template>
    </ModalComponent>
</template>

<script>
import ModalComponent from '@/Components/Modal.vue';
import TabLinkComponent from '@/Components/TabLink.vue';
import CardButtonComponent from '@/Components/CardButton.vue';
import { token } from '@/helpers';

export default {
    name: 'ModalInsertListPartial', 

    components: {
        ModalComponent, 
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    emits: [
        'close', 
        'create:list', 
    ], 

    data() {
        return {
            cards: null, 
            isNumbered: true, 
            isNotNumbered: false, 
            numberedToken: token(), 
            notNumberedToken: token(), 
            isDefineFocus: false, 
            numbered: [
                'decimal-leading-zero', 
                'upper-roman', 
                'lower-roman', 
                'upper-alpha', 
                'lower-alpha', 
                'lower-greek', 
                'armenian', 
                'georgian', 
            ], 
            notNumbered: [
                'circle', 
                'square', 
            ], 
            items: null, 
            index: 0, 
            focused: null, 
            isToggle: false, 
        };
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    watch: {
        active() {
            this.isNumbered = true;
            this.isNotNumbered = false;
        }, 
    }, 

    methods: {
        afterEnter() {
            this.defineValues();
            this.defineFocus();
        }, 
        defineValues() {
            this.cards = $(this.$refs.cards);
            this.items = this.cards.find('.card:not([tabindex=-1])');
        }, 
        defineFocus() {
            this.items.first().focus();
        },
        openNumbered() {
            this.closeNotNumbered();
            this.isNumbered = true;
        }, 
        closeNumbered() {
            this.isNumbered = true;
        }, 
        openNotNumbered() {
            this.closeNumbered();
            this.isNumbered = true;
        }, 
        closeNotNumbered() {
            this.isNumbered = true;
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
            return !! this.cards.has(document.activeElement).length;
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
};
</script>