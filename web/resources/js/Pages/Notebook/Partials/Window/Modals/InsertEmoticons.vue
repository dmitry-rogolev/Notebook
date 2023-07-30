<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="modal.show()" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide()">
                <template #header>
                    <div class="px-4 py-2">
                        {{ $t('Insert emoticons') }}
                    </div>
                </template>
                <template #content>
                    <div class="px-4 pb-4 pt-2 overflow-hidden">

                        <ul role="menubar" class="flex flex-nowrap border-b border-gray-300 dark:border-gray-600 mb-3">
                            
                            <li role="menuitem" class="mr-2">
                                <TabLinkComponent @click="isOpenEmoticons = true" :active="isOpenEmoticons" :aria-controls="emoticonsToken" :title="$t('Emoticons')">
                                    <i class="fa-solid fa-face-grin-wink text-center px-3 text-xl mb-3"></i>
                                </TabLinkComponent>
                            </li>
        
                        </ul>
        
                        <div>
                            <ul v-if="isOpenEmoticons" :id="emoticonsToken" role="menu" class="overflow-y-auto h-72 grid auto-cols-min grid-cols-7 text-xl" tabindex="-1">
                                <li v-for="item in emoticons" role="menuitem" class="m-1">
                                    <CardButtonComponent class="py-2 px-2 text-sm h-full w-full" @click="$editable.execCommand('insertHTML', item.htmlCode); modal.hide();" :title="item.title" v-html="item.htmlCode"></CardButtonComponent>
                                </li>
                            </ul>
                        </div>
        
                    </div>
                </template>
            </ModalComponent>
        </teleport>
    </div>
</template>

<script>
import ModalComponent from '@/Components/Modal/Modal.vue';
import TriggerComponent from '@/Components/Modal/Trigger.vue';
import { Modal } from 'flowbite';
import TabLinkComponent from '@/Components/TabLink.vue';
import CardButtonComponent from '@/Components/CardButton.vue';
import emoticons from '@/assets/emoticons.json';
import { token } from '../../../../../Classes/helpers';

export default {
    name: 'InsertEmoticonsWindowModalPartial', 

    components: {
        ModalComponent, 
        TriggerComponent, 
        TabLinkComponent, 
        CardButtonComponent, 
    }, 

    data() {
        return {
            modal: null, 
            emoticonsToken: token(), 
            isOpenEmoticons: false, 
            emoticons: null, 
        };
    },  

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
    },

    methods: {
        initModal() {
            this.modal = new Modal(this.$refs.modal.$el, {
                placement: 'center-center', 
                backdrop: 'dynamic', 
                closable: true, 
            });
        }, 
    }, 

    mounted() {
        this.initModal();
    }, 

    created() {
        this.emoticons = emoticons;
        this.isOpenEmoticons = true;
    }, 
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