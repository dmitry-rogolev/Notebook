<template>
    <ModalComponent :active="active" @close="$emit('close')" @after-enter="afterEnter">
        <template #header>
            <div class="px-4 py-2">
                <h5 class="text-base">Insert emoticons</h5>
            </div>
        </template>
        <template #content>
            <div class="px-4 pb-4 pt-2 overflow-hidden">
                <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                    <li role="menuitem" class="mr-2">
                        <TabLinkComponent @click="openEmoticons" :active="isEmoticons" :aria-controls="emoticonsToken" title="Emoticons">
                            <i class="fa-solid fa-face-grin-wink text-center px-3 text-xl"></i>
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
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0"
                        leave-active-class="transition ease-in duration-100"
                        leave-to-class="opacity-0"
                        @after-enter="afterEnter"
                        >
                        <ul v-if="isEmoticons" :id="emoticonsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                            <li v-for="item in emoticons" role="menuitem" class="m-1">
                                <CardButtonComponent class="py-2 px-2 text-sm h-full w-full" @click="$emit('create:emoticon', item.htmlCode); $emit('close');" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
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
import emoticons from '@/assets/emoji.json';

export default {
    name: 'ModalInsertSymbolsPartial', 

    components: {
        ModalComponent, 
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    emits: [
        'close', 
        'create:emoticon', 
    ], 

    data() {
        return {
            cards: null, 
            emoticonsToken: token(), 
            isEmoticons: false, 
            emoticons: null, 
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
            if (this.active) {
                this.openEmoticons();
            }
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
            this.emoticons = emoticons;
        }, 
        defineFocus() {
            this.items.first().focus();
        }, 
        openEmoticons() {
            this.closeAll();
            this.isEmoticons = true;
        }, 
        closeEmoticons() {
            this.isEmoticons = false;
        }, 
        closeAll() {
            this.closeEmoticons();
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