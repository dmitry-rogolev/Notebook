<template>
    <div>
        <TriggerComponent title="Delete this note" v-bind="$attrs" @click="modal.show();" class="px-4 py-2 h-full bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-r border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden">
            <i class="fa-solid fa-trash"></i>
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide();" widthClass="max-w-md">
                <template #content>
                    <div class="text-gray-700 dark:text-gray-300 text-lg text-center mb-2 select-none">Are you sure you want to delete this note?</div>
                    <div class="flex justify-center items-center p-4">
                        <button 
                            type="button"
                            role="button"
                            class="block mr-3 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-600 border-2 text-gray-100 focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-lg shadow-md px-3 py-1.5 transition duration-300 ease-in-out"
                            @click="note.isTrashed ? $notebook.forceDelete() : $notebook.delete(); modal.hide();" 
                            >
                            Yes, I'm sure
                        </button>
                        <button 
                            type="button"
                            role="button"
                            @click="modal.hide();" 
                            class="block border-gray-300 dark:border-gray-600 border-2 rounded-lg shadow-md px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            >
                            No, cancel
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
import { Modal } from 'flowbite';

export default {
    name: 'ConfirmDeleteModalWindowPartial', 

    components: {
        ModalComponent, 
        TriggerComponent, 
    }, 

    data() {
        return {
            modal: null, 
        };
    },

    computed: {
        note() {
            return this.$window.file;
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
}
</script>

<style scoped>

</style>
