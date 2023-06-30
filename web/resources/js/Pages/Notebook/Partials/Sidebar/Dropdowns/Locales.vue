<template>
    <DropdownComponent 
        ref="dropdown" 
        :options="options" 
        @show="show = true"
        @hide="show = false"
        :title="$t('Language')"
        class="w-full" 
        heightClass="h-auto"
        triggerClass="py-3 px-3 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none"
        >
        <template #trigger>
            <div class="mx-auto transition duration-300 ease-in-out focus:text-indigo-500 dark:focus:text-indigo-600" :class="{'text-indigo-500 dark:text-indigo-600': show, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': ! show}">
                <i class="fa-solid fa-globe"></i>
            </div>
        </template>
        <template #content>
            <DropdownItemComponent @click="$i18n.locale = 'en'; dropdown.hide();">
                {{ $t('English') }}
            </DropdownItemComponent>
            <DropdownItemComponent @click="$i18n.locale = 'ru'; dropdown.hide();">
                {{ $t('Russian') }}
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'LocalesDropdownSidebarPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data() {
        return {
            options: {
                placement: 'right-end', 
                offsetSkidding: 0, 
            }, 
            show: false, 
        };
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
