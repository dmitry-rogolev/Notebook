<template>
    <div class="flex">
        <DropdownComponent role="menuitem" @open="isOpenFile = true" @close="isOpenFile = false" contentClass="-mt-1">
            <template #trigger>
                <WindowMenuButtonComponent :active="isOpenFile">File</WindowMenuButtonComponent>
            </template>
            <template #content>

                <DropdownLinkComponent @click="$emit('create:note')" as="button">
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

                <DropdownLinkComponent @click="$emit('update:note')" as="button">
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
                            <i class="fa-solid fa-door-open w-6 text-center mr-2"></i>
                            <span>Exit</span>
                        </div>
                        <div class="text-xs font-bold">Alt + Q</div>
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

                <DropdownLinkComponent @click="this.delete" as="button">
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

                <DropdownLinkComponent @click="$emit('open:selector')" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                            <span>Find</span>
                        </div>
                        <div class="text-xs font-bold">Alt + F</div>
                    </div>
                </DropdownLinkComponent>

                <DropdownLinkComponent @click="$emit('open:replacer')" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-right-left w-6 text-center mr-2"></i>
                            <span>Replace</span>
                        </div>
                        <div class="text-xs font-bold">Alt + R</div>
                    </div>
                </DropdownLinkComponent>

            </template>
        </DropdownComponent>

        <DropdownComponent role="menuitem" @open="isOpenInsert = true" @close="isOpenInsert = false" contentClass="-mt-1">
            <template #trigger>
                <WindowMenuButtonComponent :active="isOpenInsert">Insert</WindowMenuButtonComponent>
            </template>
            <template #content>

                <DropdownLinkComponent @click="isOpenInsertListModal = true" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-list w-6 text-center mr-2"></i>
                            <span>List</span>
                        </div>
                        <div class="text-xs font-bold">Alt + L</div>
                    </div>
                </DropdownLinkComponent>

                <ModalInsertListPartial 
                    :active="isOpenInsertListModal" 
                    @create:list="$emit('create:list', $event)" 
                    @close="isOpenInsertListModal = false" 
                    />

                <DropdownLinkComponent @click="isOpenInsertSymbolsModal = true" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-at w-6 text-center mr-2"></i>
                            <span>Symbols</span>
                        </div>
                        <div class="text-xs font-bold">Alt + Y</div>
                    </div>
                </DropdownLinkComponent>

                <ModalInsertSymbolsPartial 
                    :active="isOpenInsertSymbolsModal" 
                    @create:symbol="$emit('create:symbol', $event)" 
                    @close="isOpenInsertSymbolsModal = false" 
                    />

                <DropdownLinkComponent @click="isOpenInsertEmoticonsModal = true" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-face-grin-wink w-6 text-center mr-2"></i>
                            <span>Emoticons</span>
                        </div>
                        <div class="text-xs font-bold">Alt + E</div>
                    </div>
                </DropdownLinkComponent>

                <ModalInsertEmoticonsPartial 
                    :active="isOpenInsertEmoticonsModal" 
                    @create:emoticon="$emit('create:emoticon', $event)" 
                    @close="isOpenInsertEmoticonsModal = false" 
                    />

            </template>
        </DropdownComponent>

        <DropdownComponent role="menuitem" @open="isOpenFormat = true" @close="isOpenFormat = false" contentClass="-mt-1">
            <template #trigger>
                <WindowMenuButtonComponent :active="isOpenFormat">Format</WindowMenuButtonComponent>
            </template>
            <template #content>

                <DropdownLinkComponent @click="isOpenFontModal = true" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex-auto">
                            <i class="fa-solid fa-font w-6 text-center mr-2"></i>
                            <span>Font</span>
                        </div>
                        <div class="text-xs font-bold">Alt + T</div>
                    </div>
                </DropdownLinkComponent>

                <ModalFontPartial 
                    :active="isOpenFontModal" 
                    @update:font="$emit('update:font', $event)"
                    @close="isOpenFontModal = false"
                    />

            </template>
        </DropdownComponent>

        <DropdownComponent role="menuitem" @open="isOpenTools = true" @close="isOpenTools = false" contentClass="-mt-1">
            <template #trigger>
                <WindowMenuButtonComponent :active="isOpenTools">Tools</WindowMenuButtonComponent>
            </template>
            
            <template #content>

                <DropdownLinkComponent @click="$emit('toggle:spellchecking')" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex items-center">
                            <i v-if="spellchecking" class="fa-solid fa-check w-6 text-center mr-2"></i>
                            <div v-else class="w-6 mr-2"></div>
                        </div>
                        <div class="flex-auto">Spellchecking</div>
                    </div>
                </DropdownLinkComponent>

            </template>
        </DropdownComponent>

        <DropdownComponent role="menuitem" @open="isOpenView = true" @close="isOpenView = false" contentClass="-mt-1">
            <template #trigger>
                <WindowMenuButtonComponent :active="isOpenView">View</WindowMenuButtonComponent>
            </template>
            <template #content>

                <DropdownLinkComponent @click="$emit('toggle:statusbar')" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex items-center">
                            <i v-if="showStatusBar" class="fa-solid fa-check w-6 text-center mr-2"></i>
                            <div v-else class="w-6 mr-2"></div>
                        </div>
                        <div class="flex-auto">Status bar</div>
                    </div>
                </DropdownLinkComponent>

                <DropdownLinkComponent @click="$emit('toggle:fullscreen')" as="button">
                    <div class="flex flex-nowrap items-center">
                        <div class="flex items-center">
                            <i v-if="activeFullScreen" class="fa-solid fa-check w-6 text-center mr-2"></i>
                            <div v-else class="w-6 mr-2"></div>
                        </div>
                        <div class="flex-auto">In full screen</div>
                        <div class="text-xs font-bold">Alt + I</div>
                    </div>
                </DropdownLinkComponent>

            </template>
        </DropdownComponent>

        <div role="menuitem" class="ml-auto">
            <WindowMenuButtonComponent @click="$emit('toggle:fullscreen')">
                <i v-if="activeFullScreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
                <i v-else class="fa-solid fa-up-right-and-down-left-from-center fa-rotate-90"></i>
            </WindowMenuButtonComponent>
        </div>

        <div role="menuitem">
            <button role="button" @click="$emit('exit')" type="button" class="trigger px-2 sm:px-3 md:px-4 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

    </div>
</template>

<script>
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import ModalComponent from '@/Components/Modal.vue';
import InputComponent from '@/Components/TextInput.vue';
import SelectorComponent from '@/Components/Selector.vue';
import ModalInsertListPartial from '@/Pages/Notebook/Partials/Window/Modals/InsertList.vue';
import ModalInsertSymbolsPartial from '@/Pages/Notebook/Partials/Window/Modals/InsertSymbols.vue';
import ModalInsertEmoticonsPartial from '@/Pages/Notebook/Partials/Window/Modals/InsertEmoticons.vue';
import ModalFontPartial from '@/Pages/Notebook/Partials/Window/Modals/Font.vue';
import { cutTags } from '@/helpers';

export default {
    name: 'WindowMenuPartial', 

    components: {
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        ModalComponent, 
        InputComponent, 
        SelectorComponent, 
        ModalInsertListPartial, 
        ModalInsertSymbolsPartial, 
        ModalInsertEmoticonsPartial, 
        ModalFontPartial, 
    },

    emits: [
        'create:note', 
        'create:list', 
        'update:note', 
        'exit', 
        'open:selector', 
        'open:replacer', 
        'create:list', 
        'create:symbol',
        'create:emoticon', 
        'update:font', 
        'toggle:spellchecking', 
        'toggle:statusbar', 
        'toggle:fullscreen', 
    ], 

    data () {
        return {
            isOpenFile: false, 
            isOpenEdit: false, 
            isOpenInsert: false, 
            isOpenFormat: false, 
            isOpenTools: false, 
            isOpenView: false, 
            isOpenFileModal: false, 
            isOpenInsertListModal: false, 
            isOpenInsertSymbolsModal: false, 
            isOpenInsertEmoticonsModal: false, 
            isOpenFontModal: false, 
            fileName: '', 
            timerAutosave: null, 
            autosaveInterval: 60000, 
        }
    },

    computed: {
        autosave() {
            return this.$store.state.autosave;
        },
    },

    props: {
        record: {
            type: Object,
            required: true,  
        },
        spellchecking: {
            type: Boolean, 
            default: true, 
        }, 
        showStatusBar: {
            type: Boolean, 
            default: true, 
        }, 
        activeFullScreen: {
            type: Boolean, 
            default: false, 
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
                            text: cutTags(new TextDecoder().decode(arrayBuffer)), 
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
        undo() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('undo');
        }, 
        redo() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('redo');
        }, 
        cut() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('cut');
        }, 
        copy() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('copy');
        }, 
        paste() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('paste');
        }, 
        delete() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('delete');
        }, 
        selectAll() {
            this.$parent.$parent.$refs.contenteditable.$el.focus();
            document.execCommand('selectAll');
        }, 
        keyupListener(e) {
            e.preventDefault();
            e.stopPropagation();

            // New
            if (e.altKey && e.code == 'KeyN') {
                this.$emit('create:note');
            } 

            // Open
            else if (e.altKey && e.code == 'KeyO') {
                this.openFile();
            } 
            
            // Save
            else if (e.altKey && e.code == 'KeyS') {
                this.$emit('update:note');
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

            // Find
            else if (e.altKey && e.code == 'KeyF') {
                this.$emit('open:selector')
            }

            // Replace
            else if (e.altKey && e.code == 'KeyR') {
                this.$emit('open:replacer')
            }

            // Insert list
            else if (e.altKey && e.code == 'KeyL') {
                this.isOpenInsertListModal = true;
            }

            // Insert symbols
            else if (e.altKey && e.code == 'KeyY') {
                this.isOpenInsertSymbolsModal = true;
            }

            // Insert emoticons
            else if (e.altKey && e.code == 'KeyE') {
                this.isOpenInsertEmoticonsModal = true;
            }

            // Font
            else if (e.altKey && e.code == 'KeyT') {
                this.isOpenFontModal = true;
            }

            // In full screen
            else if (e.altKey && e.code == 'KeyI') {
                this.$emit('toggle:fullscreen');
            }
        }, 
        defineListeners() {
            document.addEventListener('keyup', this.keyupListener);
        }, 
        removeListeners() {
            document.removeEventListener('keyup', this.keyupListener);
        }, 
    }, 

    mounted() {
        this.$store.dispatch('autosave');

        this.defineListeners();

        if (this.autosave) {
            this.onAutosave();
        }

        this.reset();
    }, 

    updated() {
        this.reset();
    }, 

    unmounted() {
        this.removeListeners();
        this.offAutosave();
    }
}
</script>

<style scoped>

</style>
