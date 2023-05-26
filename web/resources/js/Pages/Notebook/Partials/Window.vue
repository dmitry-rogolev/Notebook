<template>
    <WindowComponent>
        <template #menu>
            <DropdownComponent role="menuitem" @open="isOpenFile = true" @close="isOpenFile = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFile">File</WindowMenuButtonComponent>
                </template>
                <template #content>

                    <DropdownLinkComponent @click="$emit('create')" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-file block mr-2 w-6 text-center"></i>
                                <span>New</span>
                            </div>
                            <div class="text-xs font-bold">Alt + N</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="openFile" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-folder-open w-6 text-center mr-2"></i>
                                <span>Open</span>
                            </div>
                            <div class="text-xs font-bold">Alt + O</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="$emit('update', record)" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                                <span>Save</span>
                            </div>
                            <div class="text-xs font-bold">Alt + S</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="openFileModal" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                                <span>Save as</span>
                            </div>
                            <div class="text-xs font-bold">Alt + A</div>
                        </div>
                    </DropdownLinkComponent>

                    <ModalComponent :active="isOpenFileModal" @close="closeFileModal">
                        <template #header>
                            <div class="px-4 py-2">
                                <h5 class="text-base">Save as</h5>
                            </div>
                        </template>
                        <template #content>
                            <div class="px-4 pb-4 pt-2">
                                <div class="flex flex-nowrap">
                                    <InputComponent @keyup.enter="saveAs(); closeFileModal();" v-model="fileName" type="text" class="rounded-r-none" placeholder="File name" autofocus />
                                    <button @click="saveAs(); closeFileModal();" type="button" class="bg-indigo-600 hover:bg-indigo-600 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-gray-100 dark:text-gray-300 border-0 rounded-r-lg px-4 transition duration-300 ease-in-out">Download</button>
                                </div>
                            </div>
                        </template>
                    </ModalComponent>

                    <DropdownLinkComponent @click="toggleAutosave" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex items-center">
                                <i v-if="autosave" class="fa-solid fa-check w-6 text-center mr-2"></i>
                                <div v-else class="w-6 mr-2"></div>
                            </div>
                            <div class="flex-auto">Auto Save</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="print" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-print w-6 text-center mr-2"></i>
                                <span>Print</span>
                            </div>
                            <div class="text-xs font-bold">Alt + P</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="$emit('exit')" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-xmark w-6 text-center mr-2"></i>
                                <span>Exit</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + Q</div>
                        </div>
                    </DropdownLinkComponent>

                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenEdit = true" @close="isOpenEdit = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenEdit">Edit</WindowMenuButtonComponent>
                </template>
                <template #content>

                    <DropdownLinkComponent @click="undo" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-rotate-left w-6 text-center mr-2"></i>
                                <span>Undo</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + Z</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="redo" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-rotate-right w-6 text-center mr-2"></i>
                                <span>Redo</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + Y</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent @click="cut" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-scissors w-6 text-center mr-2"></i>
                                <span>Cut</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + X</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="copy" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-copy w-6 text-center mr-2"></i>
                                <span>Copy</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + C</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="paste" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-paste w-6 text-center mr-2"></i>
                                <span>Paste</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + V</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent @click="$emit('delete')" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-trash w-6 text-center mr-2"></i>
                                <span>Delete</span>
                            </div>
                            <div class="text-xs font-bold">Delete</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="selectAll" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <span>Select all</span>
                            </div>
                            <div class="text-xs font-bold">Ctrl + A</div>
                        </div>
                    </DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent @click="openSelector" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="flex-auto">
                                <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                                <span>Find</span>
                            </div>
                            <div class="text-xs font-bold">Alt + F</div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent as="button">Replace</DropdownLinkComponent>

                    <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

                    <DropdownLinkComponent as="button">Find in files</DropdownLinkComponent>

                    <DropdownLinkComponent as="button">Replace in files</DropdownLinkComponent>

                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenInsert = true" @close="isOpenInsert = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenInsert">Insert</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">List</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Link</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Date/Time</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Symbols</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Smilies</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenFormat = true" @close="isOpenFormat = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFormat">Format</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenTools = true" @close="isOpenTools = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenTools">Tools</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Word wrap</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Font</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenView = true" @close="isOpenView = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenView">View</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Status bar</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">In full screen</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenHelp = true" @close="isOpenHelp = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenHelp">Help</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Status bar</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">In full screen</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <div role="menuitem" class="ml-auto">
                <WindowMenuButtonComponent><i class="fa-solid fa-up-right-and-down-left-from-center"></i></WindowMenuButtonComponent>
            </div>
            <div role="menuitem">
                <button role="button" @click="$emit('exit')" type="button" class="trigger px-2 sm:px-3 md:px-4 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </template>
        <template #header>
            <div class="flex">
                <input v-model="record.title" type="text" class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" placeholder="Enter the title" />
                <button @click="$emit('delete')" type="button" class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <SelectorComponent :active="isOpenSelector" @close="closeSelector" />
            </div>
        </template>
        <template #body>
            <textarea ref="text" v-model="record.text" autofocus class="h-full w-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base border-0 focus:ring-0 resize-none"></textarea>
        </template>
        <template #footer>
            <div class="bg-gray-100 dark:bg-slate-700 h-8 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300 text-sm">

            </div>
        </template>
    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import ModalComponent from '@/Components/Modal.vue';
import InputComponent from '@/Components/TextInput.vue';
import SelectorComponent from '@/Components/Selector.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        ModalComponent, 
        InputComponent, 
        SelectorComponent, 
    }, 

    emits: [
        'create', 
        'update', 
        'delete', 
        'create:notification', 
        'exit', 
    ], 

    data() {
        return {
            isOpenFile: false, 
            isOpenEdit: false, 
            isOpenInsert: false, 
            isOpenView: false, 
            isOpenTools: false, 
            isOpenFormat: false, 
            isOpenHelp: false, 
            isOpenFileModal: false, 
            isOpenSelector: false, 
            record: {
                title: this.note.title, 
                text: this.note.text, 
            }, 
            fileName: '', 
            timerAutosave: null, 
            autosaveInterval: 60000, 
            text: null, 
        };
    }, 

    computed: {
        autosave() {
            return this.$store.state.autosave;
        }, 
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
    }, 

    methods: {
        reset() {
            this.record = {
                title: this.note.title, 
                text: this.note.text, 
            };
            this.fileName = '';
        },
        defineValues() {
            this.text = $(this.$refs.text);
        }, 
        openFile() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'text/*';
            input.onchange = () => {
                if (input.files[0]) {
                    input.files[0].arrayBuffer().then((arrayBuffer) => {
                        this.$emit('create', {
                            title: input.files[0].name, 
                            text: new TextDecoder().decode(arrayBuffer), 
                        });
                    });
                }
            }
            input.click();
        }, 
        openFileModal() {
            this.fileName = (this.record.title ?? 'No name') + '.txt';
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
            this.timerAutosave = setInterval(() => this.$emit('update', this.record), this.autosaveInterval);
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
                this.$emit('create:notification', {
                    message: 'Auto save mod off',
                    success: true, 
                });
            } else {
                this.$store.dispatch('autosave', true);
                this.onAutosave();
                this.$emit('create:notification', {
                    message: 'Auto save mod on', 
                    success: true, 
                });
            }
        }, 
        print() {
            window.print();
        }, 
        undo() {
            this.text.focus();
            document.execCommand('undo');
        }, 
        redo() {
            this.text.focus();
            document.execCommand('redo');
        }, 
        cut() {
            this.text.focus();
            document.execCommand('cut');
        }, 
        copy() {
            this.text.focus();
            document.execCommand('copy');
        }, 
        paste() {
            this.text.focus();
            document.execCommand('paste');
        }, 
        selectAll() {
            this.text.focus();
            document.execCommand('selectAll');
        }, 
        openSelector() {
            this.isOpenSelector = true;
        }, 
        closeSelector() {
            this.isOpenSelector = false;
        }, 
        find() {
            this.text
        }, 
        keyupListener(e) {
            e.preventDefault();
            e.stopPropagation();

            // New
            if (e.altKey && e.code == 'KeyN') {
                this.$emit('create');
            } 

            // Open
            else if (e.altKey && e.code == 'KeyO') {
                this.openFile();
            } 
            
            // Save
            else if (e.altKey && e.code == 'KeyS') {
                this.$emit('update', this.record);
            } 
            
            // Save as
            else if (e.altKey && e.code == 'KeyA') {
                this.openFileModal();
            }

            // Print
            else if (e.altKey && e.code == 'KeyP') {
                this.print();
            }

            // Exit
            else if (e.altKey && e.code == 'KeyQ') {
                this.$emit('exit');
            }

            // Delete
            else if (e.code == 'Delete') {
                this.$emit('delete');
            }

            // Select all
            else if (e.ctrlKey && e.code == 'KeyA') {
                this.selectAll();
            }

            // Find
            else if (e.altKey && e.code == 'KeyF') {
                this.openSelector();
            }
        }, 
        defineListeners() {
            $(document).on('keyup', this.keyupListener);
        }, 
        removeListeners() {
            $(document).off('keyup', this.keyupListener);
        }, 
    }, 

    mounted() {
        this.$store.dispatch('autosave');

        this.defineValues();

        this.defineListeners();

        if (this.autosave) {
            this.onAutosave();
        }
    }, 

    updated() {
        this.reset();
    }, 

    unmounted() {
        this.removeListeners();
        this.offAutosave();
        this.closeSelector();
    }
};
</script>