<template>
    <WindowHeaderComponent>

        <input 
            v-model="$notebook.record.title"
            type="text" 
            class="flex-auto px-3 sm:px-4 md:px-5 py-2 bg-gray-50 dark:bg-slate-800 border-0 border-b border-r border-gray-300 dark:border-gray-600 focus:border-gray-300 dark:focus:border-gray-600 text-gray-900 dark:text-gray-100 text-xl focus:ring-0 focus-visible:outline-none" 
            placeholder="Enter the title" 
            />
        
        <button 
            @click="$notebook.delete()" 
            type="button" 
            class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-b border-r border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 text-gray-700 dark:text-gray-300 select-none focus-visible:outline-none transition duration-200 ease-in-out print:hidden"
            >
            <i class="fa-solid fa-trash"></i>
        </button>

    </WindowHeaderComponent>
</template>

<script>
import WindowHeaderComponent from '@/Plugins/Window/Components/WindowHeader.vue';

export default {
    name: 'WindowHeaderPartial', 

    components: {
        WindowHeaderComponent, 
    },  
}
</script>

<style scoped>

</style>
