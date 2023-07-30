<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="modal.show();" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide();">
                <template #header>
                    <div class="px-4 py-2">
                        {{ $t('Save as') }}
                    </div>
                </template>
                <template #content>
                    <div class="px-4 pb-4 pt-2">
                        <div class="flex flex-nowrap">
                            <InputComponent 
                                ref="input"
                                @keyup.enter="saveAs(); modal.hide();" 
                                v-model="fileName" 
                                type="text" 
                                class="rounded-r-none w-full" 
                                :placeholder="$t('File name')" 
                                autofocus 
                                />

                            <button 
                                @click="toggleAs"
                                type="button"
                                class="px-3 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-y focus-visible:outline-none text-gray-700 dark:text-gray-300 focus:bg-gray-200 dark:focus:bg-gray-700 transition duration-300 ease-in-out"
                                >
                                {{ this.as }}
                            </button>

                            <button 
                                @click="saveAs(); modal.hide();" 
                                type="button" 
                                class="bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-300 border-0 rounded-r-lg px-4 transition duration-300 ease-in-out"
                                >
                                {{ $t('Download') }}
                            </button>
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
import InputComponent from '@/Components/TextInput.vue';
import { Modal } from 'flowbite';
import { cutTags } from '../../../../../Classes/helpers';

export default {
    name: 'SaveAsModalWindowPartial', 

    components: {
        ModalComponent, 
        TriggerComponent, 
        InputComponent, 
    }, 

    data() {
        return {
            modal: null, 
            link: '', 
            range: null, 
            fileName: '', 
            as: 'txt', 
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
                onShow: () => {
                    this.fileName = this.getFileName();

                    this.defineFocus();
                }, 
                onHide: () => {
                    this.fileName = '';
                }, 
            });
        }, 
        saveAs() {
            let a = document.createElement('a');
            if (this.as == 'html') {
                a.href = 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(this.$window.file.text);
            } else {
                a.href = 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(cutTags(this.$window.file.text));
            }
            a.download = this.fileName;
            a.click();
        }, 
        defineFocus() {
            this.$refs.input.$el.focus();
        }, 
        toggleAs() {
            if (this.as == 'txt') {
                this.as = 'html';
            } else {
                this.as = 'txt';
            }

            this.fileName = this.getFileName();
        }, 
        getFileName() {
            let name = '';

            if (this.fileName) {
                if (this.fileName.endsWith('.txt') && this.as == 'html') {
                    name = this.fileName.slice(0, this.fileName.lastIndexOf('.txt')) + '.html';
                } else if (this.fileName.endsWith('.html') && this.as == 'txt') {
                    name = this.fileName.slice(0, this.fileName.lastIndexOf('.html')) + '.txt';
                } else if (this.fileName.endsWith('.txt')) {
                    name = this.fileName;
                    this.as = 'txt';
                } else if (this.fileName.endsWith('.html')) {
                    name = tthis.fileName;
                    this.as = 'html';
                } else {
                    name = this.fileName + '.txt';
                    this.as = 'txt';
                }
            } else {
                if (this.$window.file.title) {
                    if (this.$window.file.title.endsWith('.txt')) {
                        name = this.$window.file.title;
                        this.as = 'txt';
                    } else if (this.$window.file.title.endsWith('.html')) {
                        name = this.$window.file.title;
                        this.as = 'html';
                    } else {
                        name = this.$window.file.title + '.txt';
                        this.as = 'txt';
                    }
                } else {
                    name = 'no-name.txt';
                    this.as = 'txt';
                }
            }

            return name;
        }
    }, 

    mounted() {
        this.initModal();
    }, 
}
</script>

<style scoped>

</style>
