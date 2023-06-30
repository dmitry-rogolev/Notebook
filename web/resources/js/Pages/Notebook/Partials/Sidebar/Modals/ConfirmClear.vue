<template>
    <div>
        <TriggerComponent v-bind="$attrs" @click="show" class="w-full px-3 py-2 text-gray-700 dark:text-gray-300 text-left text-sm select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden" :class="[activeClass]">
            {{ $t('Clear all') }}
        </TriggerComponent>
        <teleport to="body">
            <ModalComponent ref="modal" @close="modal.hide();" widthClass="max-w-md">
                <template #content>
                    <div class="text-gray-700 dark:text-gray-300 text-lg text-center mb-2 select-none">{{ $t('Are you sure you want to clear all notes?') }}</div>
                    <div class="flex justify-center items-center p-4">
                        <button 
                            type="button"
                            role="button"
                            class="block mr-3 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-600 border-2 text-gray-100 focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-lg shadow-md px-3 py-1.5 transition duration-300 ease-in-out"
                            @click="showTrash ? $notebook.forceClear() : $notebook.clear(); modal.hide();" 
                            >
                            {{ $t("Yes, I'm sure") }}
                        </button>
                        <button 
                            type="button"
                            role="button"
                            @click="modal.hide();" 
                            class="block border-gray-300 dark:border-gray-600 border-2 rounded-lg shadow-md px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out focus-visible:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            >
                            {{ $t('No, cancel') }}
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
    name: 'ConfirmClearModalSidebarPartial', 

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
        activeClass() {
            if (this.active) {
                return 'bg-gray-300 dark:bg-gray-700 pointer-events-none cursor-default';
            }

            return 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer';
        }, 
        showTrash() {
            return this.$sidebar.isShowTrash;
        }, 
        showNotes() {
            return this.$sidebar.isShowNotes;
        },
    },

    props: {
        active: {
            type: Boolean, 
            default: false, 
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
            if (this.showTrash && this.$notebook.trash.length) {
                this.modal.show();
            } else if (this.showNotes && this.$notebook.notes.length) {
                this.modal.show();
            }
        }, 
    }, 

    mounted() {
        this.initModal();
    }, 
}
</script>

<style scoped>

</style>
