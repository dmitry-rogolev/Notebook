<template>
    <FontPartial heightClass="max-h-screen" :options="options" triggerClass="w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm">
        <i class="fa-solid fa-font mr-3"></i>
        <span>Font</span>
    </FontPartial>
</template>

<script>
import FontPartial from '../Font.vue';

export default {
    name: 'FontMenuSubDropdownWindowPartial', 

    components: {
        FontPartial, 
    }, 

    data() {
        return {
            options: {
                placement: 'right', 
            }, 
        };
    },
}
</script>

<style scoped>

</style>
