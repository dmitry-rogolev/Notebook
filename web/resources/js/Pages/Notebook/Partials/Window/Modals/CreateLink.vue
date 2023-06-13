<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="show" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="close">
                <template #header>
                    <div class="px-4 py-2">
                        Create link
                    </div>
                </template>
                <template #content>
                    <div class="px-4 py-4 flex flex-nowrap">
                        <InputComponent 
                            ref="input"
                            v-model="link" 
                            type="text" 
                            class="rounded-r-none border-r-0 block flex-auto w-full" 
                            placeholder="https://" 
                            />
                        <button 
                            @click="add"
                            type="button" 
                            class="block px-6 py-2 bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-500 border-indigo-500 dark:border-indigo-600 border text-gray-100 transition duration-200 ease-in-out rounded-r-md focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            >
                            Add
                        </button>
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

export default {
    name: 'CreateLinkWindowModalPartial', 

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
        show() {
            let selection = window.getSelection();

            if (selection.rangeCount) {
                this.range = window.getSelection().getRangeAt(0);
            }

            this.defineFocus();
            this.modal.show();
        }, 
        close() {
            this.modal.hide();

            if (this.range) {
                let selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(this.range);
            }
        }, 
        add() {
            this.close();
            this.$editable.execCommand('createLink', this.link);
            this.link = '';
        }, 
        defineFocus() {
            this.$refs.input.$el.focus();
        }, 
    }, 

    mounted() {
        this.initModal();
    }, 
}
</script>

<style scoped>

</style>
