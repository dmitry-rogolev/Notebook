<template>
    <BlockFormatPartial heightClass="max-h-screen" :options="options" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <i class="fa-solid fa-heading mr-3"></i>
        <span>Block format</span>
    </BlockFormatPartial>
</template>

<script>
import BlockFormatPartial from '../BlockFormat.vue';

export default {
    name: 'BlockFormatMenuSubDropdownWindowPartial', 

    components: {
        BlockFormatPartial, 
    }, 

    data() {
        return {
            options: {
                placement: 'right-end', 
            }, 
        };
    },
}
</script>

<style scoped>

</style>
