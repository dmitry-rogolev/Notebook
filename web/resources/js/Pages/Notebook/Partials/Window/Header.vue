<template>
    <WindowHeaderComponent>

        <input 
            v-model="$window.file.title"
            type="text" 
            class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" 
            placeholder="Enter the title" 
            />

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
}
</script>

<style scoped>

</style>
