<template>
    <WindowMenu class="px-1 sm:px-2 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-gray-600 border-b overflow-x-auto h-[84.8px] md:h-[51.2px] lg:h-[57.6px]">

        <FileDropdownPartial />

        <EditDropdownPartial />

        <InsertDropdownPartial />

        <FormatDropdownPartial />

        <ToolsDropdownPartial />

        <ViewDropdownPartial />

        <div role="menuitem" class="ml-auto hidden md:block">
            <button role="button" type="button" :title="fullscreen ? $t('Fullscreen on') : $t('Fullscreen off')" @click="$window.toggleFullscreen()" class="px-3 md:px-3 lg:px-4 py-1 h-full text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                <i v-if="fullscreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
                <i v-else class="fa-solid fa-up-right-and-down-left-from-center fa-rotate-90"></i>
            </button>
        </div>

        <div role="menuitem" class="ml-auto md:ml-0">
            <button role="button" :title="$t('Close')" @click="$window.close()" @mouseenter="showXmark = true" @mouseleave="showXmark = false" type="button" class="h-full px-3 md:px-3 lg:px-4 py-1 text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none">
                <div v-if="changed && ! showXmark" class="bg-gray-600 dark:bg-gray-300 rounded-full w-3 h-3 min-w-[0.75rem] min-h-[0.75rem]"></div>
                <i v-else class="fa-solid fa-xmark"></i>
            </button>
        </div>

    </WindowMenu>
</template>

<script>
import WindowMenu from '@/Plugins/Window/Components/WindowMenu.vue';
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
        FileDropdownPartial, 
        EditDropdownPartial, 
        InsertDropdownPartial, 
        FormatDropdownPartial, 
        ToolsDropdownPartial, 
        ViewDropdownPartial, 
    },

    data() {
        return {
            showXmark: false, 
        };
    },

    computed: {
        fullscreen() {
            return this.$window.fullscreen;
        }, 
        changed() {
            return this.$window.file.isDirty;
        }, 
    },
}
</script>

<style scoped>

</style>
