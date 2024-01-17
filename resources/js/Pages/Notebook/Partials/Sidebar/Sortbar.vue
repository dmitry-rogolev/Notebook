<template>
    <SortbarComponent class="md:px-2 border-gray-300 dark:border-gray-600 border-r md:border-r-0 bg-white dark:bg-gray-800">
        <OptionsDropdownPartial />
        <button 
            type="button"
            role="button"
            class="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 py-1 md:py-0 text-gray-700 dark:text-gray-300 text-2xl md:text-lg"
            @click="$sort.toggleDirection();"
            :title="direction == 'asc' ? $t('in ascending order') : $t('in descending order')"
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
