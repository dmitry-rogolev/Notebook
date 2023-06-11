<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            File
        </template>
        <template #content>

            <DropdownItemComponent @click="$emit('create:note')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-file block mr-2 w-6 text-center"></i>
                        <span>New</span>
                    </div>
                    <div class="text-xs font-bold">Alt + N</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="openFile">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-folder-open w-6 text-center mr-2"></i>
                        <span>Open</span>
                    </div>
                    <div class="text-xs font-bold">Alt + O</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$emit('update:note')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                        <span>Save</span>
                    </div>
                    <div class="text-xs font-bold">Alt + S</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="isOpenFileModal = true">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                        <span>Save as</span>
                    </div>
                    <div class="text-xs font-bold">Alt + A</div>
                </div>
            </DropdownItemComponent>

            <ModalComponent :active="isOpenFileModal" @close="isOpenFileModal = false">
                <template #header>
                    <div class="px-4 py-2">
                        <h5 class="text-base">Save as</h5>
                    </div>
                </template>
                <template #content>
                    <div class="px-4 pb-4 pt-2">
                        <div class="flex flex-nowrap">
                            <InputComponent 
                                @keyup.enter="saveAs(); isOpenFileModal = false;" 
                                v-model="fileName" 
                                type="text" 
                                class="rounded-r-none" 
                                placeholder="File name" 
                                autofocus />

                            <button 
                                @click="saveAs(); isOpenFileModal = false;" 
                                type="button" 
                                class="bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-300 border-0 rounded-r-lg px-4 transition duration-300 ease-in-out"
                                >
                                Download
                            </button>
                        </div>
                    </div>
                </template>
            </ModalComponent>

            <DropdownItemComponent @click="toggleAutosave">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="autosave" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Auto Save</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="print">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-print w-6 text-center mr-2"></i>
                        <span>Print</span>
                    </div>
                    <div class="text-xs font-bold">Alt + P</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$emit('exit')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-door-open w-6 text-center mr-2"></i>
                        <span>Exit</span>
                    </div>
                    <div class="text-xs font-bold">Alt + Q</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import ModalComponent from '@/Components/Modal.vue';
import InputComponent from '@/Components/TextInput.vue';
import { cutForbiddenTags } from '@/helpers';

export default {
    name: 'WindowMenuToolsDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
        ModalComponent, 
        InputComponent, 
    }, 
    
    emits: [
        'create:note', 
        'update:note', 
        'exit', 
    ], 

    data() {
        return {
            isOpenFileModal: false, 
            fileName: '', 
            timerAutosave: null, 
            autosaveInterval: 60000, 
        }
    },

    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
        autosave() {
            return this.$store.state.autosave;
        },
    },

    props: {
        record: {
            type: Object,
            required: true,  
        },
    },

    methods: {
        reset() {
            this.fileName = '';
        },
        openFile() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'text/*';
            input.onchange = () => {
                if (input.files[0]) {
                    input.files[0].arrayBuffer().then((arrayBuffer) => {
                        this.$emit('create:note', {
                            title: input.files[0].name, 
                            text: cutForbiddenTags(new TextDecoder().decode(arrayBuffer)), 
                        });
                    });
                }
            }
            input.click();
        }, 
        openFileModal() {
            this.fileName = (this.record.title ? this.record.title : 'No name') + '.txt';
            this.isOpenFileModal = true;
        }, 
        closeFileModal() {
            this.isOpenFileModal = false;
        }, 
        saveAs() {
            let a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(this.record.text);
            a.download = this.fileName;
            a.click();
        }, 
        onAutosave() {
            this.timerAutosave = setInterval(() => this.$emit('update:note'), this.autosaveInterval);
        }, 
        offAutosave() {
            if (this.timerAutosave) {
                clearInterval(this.timerAutosave);
                this.timerAutosave = null;
            }
        }, 
        toggleAutosave() {
            if (this.autosave) {
                this.$store.dispatch('autosave', false);
                this.offAutosave();
                this.$notifier.push({
                    message: 'Auto save mod off',
                    success: true, 
                });
            } else {
                this.$store.dispatch('autosave', true);
                this.onAutosave();
                this.$notifier.push({
                    message: 'Auto save mod on',
                    success: true, 
                });
            }
        }, 
        print() {
            window.print();
        },
    }, 
    
    mounted() {
        this.$store.dispatch('autosave');

        if (this.autosave) {
            this.onAutosave();
        }
    }, 

    updated() {
        this.reset();
    }, 

    unmounted() {
        this.offAutosave();
    }, 
}
</script>

<style scoped>

</style>
