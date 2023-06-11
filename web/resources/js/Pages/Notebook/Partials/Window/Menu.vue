<template>
    <div class="flex">

        <FileDropdownPartial
            @create:note="$emit('create:note', $event)"
            @update:note="$emit('update:note')"
            @exit="$emit('exit')"
            :record="record"
            />

        <EditDropdownPartial 
            @open:selector="$emit('open:selector')"
            @open:replacer="$emit('open:replacer')"
            />

        <InsertDropdownPartial :note="note" />

        <FormatDropdownPartial />

        <ToolsDropdownPartial />

        <ViewDropdownPartial />

        <div role="menuitem" class="ml-auto">
            <WindowMenuButtonComponent @click="$store.commit('fullscreen', ! fullscreen)">
                <i v-if="fullscreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
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
import FileDropdownPartial from './Menu/Dropdowns/File.vue';
import EditDropdownPartial from './Menu/Dropdowns/Edit.vue';
import InsertDropdownPartial from './Menu/Dropdowns/Insert.vue';
import FormatDropdownPartial from './Menu/Dropdowns/Format.vue';
import ToolsDropdownPartial from './Menu/Dropdowns/Tools.vue';
import ViewDropdownPartial from './Menu/Dropdowns/View.vue';

export default {
    name: 'WindowMenuPartial', 

    components: {
        WindowMenuButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        FileDropdownPartial, 
        EditDropdownPartial, 
        InsertDropdownPartial, 
        FormatDropdownPartial, 
        ToolsDropdownPartial, 
        ViewDropdownPartial, 
    },

    emits: [
        'create:note', 
        'create:list', 
        'update:note', 
        'exit', 
        'open:selector', 
        'open:replacer', 
    ], 

    computed: {
        fullscreen() {
            return this.$store.state.fullscreen;
        }, 
    },

    props: {
        record: {
            type: Object,
            required: true,  
        },
        note: {
            type: Object,
            required: true,  
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
        defineListeners() {
            document.addEventListener('keyup', this.keyupListener);
        }, 
        removeListeners() {
            document.removeEventListener('keyup', this.keyupListener);
        }, 
    }, 

    mounted() {
        this.defineListeners();
    }, 

    unmounted() {
        this.removeListeners();
    }
}
</script>

<style scoped>

</style>
