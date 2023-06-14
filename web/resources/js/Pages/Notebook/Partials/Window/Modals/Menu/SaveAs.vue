<template>
    <SaveAsModalComponent triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <div class="flex flex-nowrap items-center">
            <div class="flex-auto">
                <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                <span>Save as</span>
            </div>
            <div class="text-xs font-bold">Alt + A</div>
        </div>
    </SaveAsModalComponent>
</template>

<script>
import SaveAsModalComponent from '../SaveAs.vue';

export default {
    name: 'SaveAsMenuModalWindowPartial', 

    components: {
        SaveAsModalComponent, 
    }, 
}
</script>

<style scoped>

</style>
