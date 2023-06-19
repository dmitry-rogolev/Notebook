<template>
    <DropdownComponent ref="dropdown" triggerClass="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-300">
        <template #trigger>
            <i class="fa-solid fa-ellipsis"></i>
        </template>
        <template #content>
            <div class="block px-4 py-2 text-xs text-gray-400 select-none">
                Sort
            </div>
            <DropdownItemComponent @click="$sort.column = 'title'; dropdown.hide();">
                By title
            </DropdownItemComponent>
            <DropdownItemComponent @click="$sort.column = 'updated_at'; dropdown.hide();">
                By date
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'TypeSortDropdownSidebarPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    computed: {
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },
}
</script>

<style scoped>

</style>
