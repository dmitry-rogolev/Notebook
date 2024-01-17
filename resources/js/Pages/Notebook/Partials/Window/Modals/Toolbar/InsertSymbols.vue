<template>
    <InsertSymbolsModalComponent :title="$t('Symbols')" triggerClass="z-[1] hover:z-10 px-4 py-2 md:px-3 md:py-1.5 text-xl md:text-lg rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 focus:text-indigo-500 dark:focus:text-indigo-500 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 border-transparent border focus-visible:outline-none hover:shadow-sm transition duration-200 ease-in-out">
        <i class="fa-solid fa-icons"></i>
    </InsertSymbolsModalComponent>
</template>

<script>
import InsertSymbolsModalComponent from '../InsertSymbols.vue';

export default {
    name: 'InsertSymbolsWindowToolbarModalPartial', 

    components: {
        InsertSymbolsModalComponent, 
    }, 
}
</script>

<style scoped>

</style>
