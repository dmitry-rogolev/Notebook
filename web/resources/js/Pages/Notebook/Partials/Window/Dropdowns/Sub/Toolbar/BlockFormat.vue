<template>
    <BlockFormatPartial @show="active = true" @hide="active = false" ref="dropdown" triggerClass="flex flex-nowrap items-center z-[1] hover:z-10 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 focus:text-indigo-500 dark:focus:text-indigo-500 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 border-transparent border focus-visible:outline-none hover:shadow-sm transition duration-200 ease-in-out">
        <div class="mr-2 truncate">Block format</div>
        <div>
            <i v-if="active" class="fa-solid fa-caret-up"></i>
            <i v-else class="fa-solid fa-caret-down"></i>
        </div>
    </BlockFormatPartial>
</template>

<script>
import BlockFormatPartial from '../BlockFormat.vue';

export default {
    name: 'BlockFormatToolbarSubDropdownWindowPartial', 

    components: {
        BlockFormatPartial, 
    }, 

    data() {
        return {
            active: false, 
        };
    },
}
</script>

<style scoped>

</style>
