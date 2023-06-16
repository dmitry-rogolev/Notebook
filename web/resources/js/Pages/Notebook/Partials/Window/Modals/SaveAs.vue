<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="modal.show();" :class="[triggerClass]">
            <slot></slot>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide();">
                <template #header>
                    <div class="px-4 py-2">
                        Save as
                    </div>
                </template>
                <template #content>
                    <div class="px-4 pb-4 pt-2">
                        <div class="flex flex-nowrap">
                            <InputComponent 
                                @keyup.enter="saveAs(); modal.hide();" 
                                v-model="fileName" 
                                type="text" 
                                class="rounded-r-none w-full" 
                                placeholder="File name" 
                                autofocus 
                                />

                            <button 
                                @click="saveAs(); modal.hide();" 
                                type="button" 
                                class="bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-300 border-0 rounded-r-lg px-4 transition duration-300 ease-in-out"
                                >
                                Download
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
                    let name = 'no-name.txt';
                    
                    if (this.$notebook.record.title && ! this.$notebook.record.title.endsWith('.txt')) {
                        name = this.$notebook.record.title + '.txt';
                    } else if (this.$notebook.record.title) {
                        name = this.$notebook.record.title;
                    }

                    this.fileName = name;
                }, 
            });
        }, 
        saveAs() {
            let a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(this.$notebook.record.text);
            a.download = this.fileName;
            a.click();
        }, 
    }, 

    mounted() {
        this.initModal();
    }, 
}
</script>

<style scoped>

</style>
