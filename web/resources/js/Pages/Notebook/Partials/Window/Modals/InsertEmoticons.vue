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
                        <TabLinkComponent @click="isOpenEmoticons = true" :active="isOpenEmoticons" :aria-controls="emoticonsToken" title="Emoticons">
                            <i class="fa-solid fa-face-grin-wink text-center px-3 text-xl mb-3"></i>
                        </TabLinkComponent>
                    </li>

                </ul>

                <div 
                    ref="menu"
                    @keyup.left="left" 
                    @keyup.right="right" 
                    >
                    <transition name="emoticons" mode="out-in" @after-enter="afterEnter">

                        <ul v-if="isOpenEmoticons" :id="emoticonsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
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
import emoticons from '@/assets/emoticons.json';

export default {
    name: 'ModalInsertEmoticonsPartial', 

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
            emoticonsToken: token(), 
            isOpenEmoticons: false, 
            emoticons: null, 
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
            if (this.active) {
                this.isOpenEmoticons = true;
            }
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

    created() {
        this.emoticons = emoticons;
    }
};
</script>

<style scoped>
.emoticons-enter-active,
.emoticons-leave-active {
    transition: all 0.3s ease;
}
.emoticons-enter-from,
.emoticons-leave-to {
    opacity: 0;
}
</style>