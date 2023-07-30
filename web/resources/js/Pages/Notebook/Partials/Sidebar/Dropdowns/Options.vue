<template>
    <DropdownComponent ref="dropdown" :title="$t('Options')" triggerClass="hover:bg-gray-200 dark:hover:bg-gray-700 px-2 text-gray-700 dark:text-gray-300">
        <template #trigger>
            <i class="fa-solid fa-ellipsis"></i>
        </template>
        <template #content>
            <div class="block px-4 py-2 text-xs text-gray-500 select-none">
                {{ $t('Sort') }}
            </div>
            <DropdownItemComponent @click="$sort.column = 'title'; dropdown.hide();" :active="$sort.column == 'title'">
                {{ $t('By title') }}
            </DropdownItemComponent>
            <DropdownItemComponent @click="$sort.column = 'updated_at'; dropdown.hide();" :active="$sort.column == 'updated_at'">
                {{ $t('By date') }}
            </DropdownItemComponent>
            <div class="block px-4 py-2 text-xs text-gray-500 select-none">
                {{ $t('View') }}
            </div>
            <DropdownItemComponent @click="$sidebar.isDetailed = false; dropdown.hide();" :active="! detailed">
                {{ $t('Brief') }}
            </DropdownItemComponent>
            <DropdownItemComponent @click="$sidebar.isDetailed = true; dropdown.hide();" :active="detailed">
                {{ $t('Detailed') }}
            </DropdownItemComponent>
            <div class="block px-4 py-2 text-xs text-gray-500 select-none">
                {{ $t('Notes') }}
            </div>
            <ConfirmClearModalSidebarPartial @click="dropdown.hide()" />
            <DropdownItemComponent v-if="showTrash" @click="$notebook.revert(); dropdown.hide();">
                {{ $t('Restore all') }}
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import ConfirmClearModalSidebarPartial from '../Modals/ConfirmClear.vue';

export default {
    name: 'OptionsDropdownSidebarPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
        ConfirmClearModalSidebarPartial, 
    }, 

    computed: {
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
        detailed() {
            return this.$sidebar.isDetailed;
        }, 
        showTrash() {
            return this.$sidebar.isShowTrash;
        }, 
    },
}
</script>

<style scoped>

</style>
