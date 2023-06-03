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
                        <TabLinkComponent class="pb-2" @click="isOpenNumbered = true; isOpenNotNumbered = false;" :active="isOpenNumbered" :aria-controls="numberedToken">
                            <i class="fa-solid fa-list-ol w-6 text-center mr-2"></i>
                            <span>Numbered</span>
                        </TabLinkComponent>
                    </li>

                    <li role="menuitem">
                        <TabLinkComponent class="pb-2" @click="isOpenNotNumbered = true; isOpenNumbered = false;" :active="isOpenNotNumbered" :aria-controls="notNumberedToken">
                            <i class="fa-solid fa-list w-6 text-center mr-2"></i>
                            <span>Not numbered</span>
                        </TabLinkComponent>
                    </li>

                </ul>

                <div 
                    ref="menu"
                    @keyup.left="left" 
                    @keyup.right="right" 
                    >
                    <transition name="list" mode="out-in" @after-enter="afterEnter">

                        <ul v-if="isOpenNumbered" :id="numberedToken" role="menu" class="flex flex-wrap">
                            <li v-for="mark in numbered" role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', mark); $emit('close');">
                                    <ol class="list-inside text-xs px-3 py-3 w-20" :style="{'list-style-type': mark}">
                                        <li>Item 1</li>
                                        <li>Item 2</li>
                                        <li>Item 3</li>
                                    </ol>
                                </CardButtonComponent>
                            </li>
                        </ul>

                        <ul v-else-if="isOpenNotNumbered" :id="notNumberedToken" role="menu" class="flex flex-wrap">
                            <li v-for="mark in notNumbered" role="menuitem" class="m-1">
                                <CardButtonComponent @click="$emit('create:list', mark); $emit('close');">
                                    <ul class="list-inside text-xs px-3 py-3 w-20" :style="{'list-style-type': mark}">
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
            isOpenNumbered: false, 
            isOpenNotNumbered: false, 
            numberedToken: token(), 
            notNumberedToken: token(), 
            numbered: [
                'decimal', 
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
                'disc', 
                'circle', 
                'square', 
            ], 
            items: null, 
            index: 0, 
            focused: null, 
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
            this.isOpenNotNumbered = false;
            this.isOpenNumbered = true;
        }, 
    }, 

    methods: {
        defineValues() {
            this.items = this.$refs.menu.querySelectorAll('.card:not([tabindex="-1"])');
        }, 
        defineFocus() {
            this.items.item(0).focus();
        },
        afterEnter() {
            this.defineValues();
            this.defineFocus();
        }, 
        defineFocused() {
            this.focused = null;
            this.index = 0;

            if (this.isFocus()) {
                this.focused = document.activeElement;
                this.items.forEach((item, index) => {
                    if (item.isSameNode(this.focused)) {
                        this.index = index;
                        return false;
                    }
                });
            }
        }, 
        isFocus() {
            return this.$refs.menu.contains(document.activeElement);
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
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToLastItem() {
            this.index = this.items.length - 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToNextItem() {
            this.index = this.index == this.items.length - 1 ? 0 : this.index + 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
        defineFocusToPrevItem() {
            this.index = this.index == 0 ? this.items.length - 1 : this.index - 1;
            this.focused = this.items.item(this.index);
            this.focused.focus();
        }, 
    }, 
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
}
</style>