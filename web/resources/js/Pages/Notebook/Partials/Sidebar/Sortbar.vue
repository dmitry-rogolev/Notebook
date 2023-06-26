<template>
    <SortbarComponent class="px-2 border-gray-300 dark:border-gray-600 border-b">
        <OptionsDropdownPartial />
        <button 
            type="button"
            role="button"
            class="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-300"
            @click="$sort.toggleDirection();"
            :title="direction == 'asc' ? 'in ascending order' : 'in descending order'"
            >
            <i v-if="direction == 'asc'" class="fa-solid fa-arrow-down-short-wide"></i>
            <i v-else class="fa-solid fa-arrow-down-wide-short"></i>
        </button>
    </SortbarComponent>
</template>

<script>
import SortbarComponent from '@/Plugins/Sort/Components/Sortbar.vue';
import OptionsDropdownPartial from './Dropdowns/Options.vue';

export default {
    name: 'SortbarSidebarPartial', 

    components: {
        SortbarComponent, 
        OptionsDropdownPartial, 
    }, 

    computed: {
        direction() {
            return this.$sort.direction;
        }, 
    },
}
</script>

<style scoped>

</style>
