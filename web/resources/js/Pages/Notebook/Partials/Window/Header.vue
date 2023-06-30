<template>
    <WindowHeaderComponent>

        <input 
            v-if="note && ! note.isTrashed"
            v-model="note.title"
            type="text" 
            class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" 
            />

        <div v-else class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none">
            {{ note.title }}
        </div>

        <button 
            v-if="note && note.isTrashed"
            type="button"
            role="button"
            @click="$notebook.restore();"
            :title="$t('Restore this note')"
            class="px-4 py-2 h-full bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-r border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden"
            >
            <i class="fa-solid fa-rotate-left"></i>
        </button>

        <ConfirmDeleteModalWindowPartial />

    </WindowHeaderComponent>
</template>

<script>
import WindowHeaderComponent from '@/Plugins/Window/Components/WindowHeader.vue';
import ConfirmDeleteModalWindowPartial from './Modals/ConfirmDelete.vue';

export default {
    name: 'WindowHeaderPartial', 

    components: {
        WindowHeaderComponent, 
        ConfirmDeleteModalWindowPartial, 
    },  

    computed: {
        note() {
            return this.$window.file;
        }, 
    },
}
</script>

<style scoped>

</style>
