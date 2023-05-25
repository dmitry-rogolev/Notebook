<template>
    <WindowComponent>
        <template #menu>
            <DropdownComponent role="menuitem" @open="isOpenFile = true" @close="isOpenFile = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenFile">File</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent @click="$emit('create')" as="button"><i class="fa-solid fa-file block mr-2 w-6 text-center"></i>New</DropdownLinkComponent>
                    <DropdownLinkComponent @click="openDialogFile" as="button"><i class="fa-solid fa-folder-open w-6 text-center mr-2"></i>Open</DropdownLinkComponent>
                    <input @change="createNoteFromFile" :id="openFileToken" type="file" accept="text/plain" class="hidden" tabindex="-1" />
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent @click="$emit('update', record)" as="button"><i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>Save</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Save as</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Auto Save</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Return</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Print</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Share</DropdownLinkComponent>
                </template>
            </DropdownComponent>
            <DropdownComponent role="menuitem" @open="isOpenEdit = true" @close="isOpenEdit = false" contentClass="-mt-1">
                <template #trigger>
                    <WindowMenuButtonComponent :active="isOpenEdit">Edit</WindowMenuButtonComponent>
                </template>
                <template #content>
                    <DropdownLinkComponent as="button">Undo</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Redo</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Cut</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Copy</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Paste</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Delete</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Select all</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
                    <DropdownLinkComponent as="button">Find</DropdownLinkComponent>
                    <DropdownLinkComponent as="button">Replace</DropdownLinkComponent>
                    <div class="border-t border-gray-200 dark:border-gray-600" tabindex="-1"></div>
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
        </template>
        <template #header>
            <div class="flex">
                <input v-model="record.title" type="text" class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-200 dark:border-gray-600 focus:border-gray-200 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" placeholder="Enter the title" />
                <button @click="$emit('delete')" type="button" class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-gray-200 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </template>
        <template #body>
            <textarea v-model="record.text" autofocus class="h-full w-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base border-0 focus:ring-0 resize-none"></textarea>
        </template>
        <template #footer>
            <div class="bg-gray-100 dark:bg-slate-700 h-8 border-gray-200 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300 text-sm">

            </div>
        </template>
    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import { token } from '@/helpers';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
    }, 

    emits: [
        'create', 
        'update', 
        'delete', 
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
            openFileToken: token(), 
            record: {
                title: this.note.title, 
                text: this.note.text, 
            }, 
        };
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
        }, 
        openDialogFile() {
            $('#' + this.openFileToken).trigger('click');
        }, 
        createNoteFromFile(e) {
            if (e.target.files[0] && e.target.files[0].type == 'text/plain') {
                let reader = new FileReader();
                reader.onload = () => {
                    this.$emit('create', {
                        title: e.target.files[0].name, 
                        text: reader.result, 
                    });
                };
                reader.readAsText(e.target.files[0]);
            }
        }, 
    }, 

    updated() {
        this.reset();
    }, 
};
</script>