<template>
    <WindowMenu class="px-1 sm:px-2 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-gray-600 border-b">

        <FileDropdownPartial />

        <EditDropdownPartial />

        <InsertDropdownPartial />

        <FormatDropdownPartial />

        <ToolsDropdownPartial />

        <ViewDropdownPartial />

        <div role="menuitem" class="ml-auto">
            <WindowMenuButtonComponent @click="$window.toggleFullscreen()">
                <i v-if="fullscreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
                <i v-else class="fa-solid fa-up-right-and-down-left-from-center fa-rotate-90"></i>
            </WindowMenuButtonComponent>
        </div>

        <div role="menuitem">
            <button role="button" @click="$notebook.closeWindow()" type="button" class="trigger px-2 sm:px-3 md:px-4 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

    </WindowMenu>
</template>

<script>
import WindowMenu from '@/Plugins/Window/Components/WindowMenu.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import FileDropdownPartial from './Dropdowns/File.vue';
import EditDropdownPartial from './Dropdowns/Edit.vue';
import InsertDropdownPartial from './Dropdowns/Insert.vue';
import FormatDropdownPartial from './Dropdowns/Format.vue';
import ToolsDropdownPartial from './Dropdowns/Tools.vue';
import ViewDropdownPartial from './Dropdowns/View.vue';

export default {
    name: 'WindowMenuPartial', 

    components: {
        WindowMenu, 
        WindowMenuButtonComponent, 
        FileDropdownPartial, 
        EditDropdownPartial, 
        InsertDropdownPartial, 
        FormatDropdownPartial, 
        ToolsDropdownPartial, 
        ViewDropdownPartial, 
    },

    computed: {
        fullscreen() {
            return this.$window.fullscreen;
        }, 
    },

    methods: {
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
    }, 
}
</script>

<style scoped>

</style>
