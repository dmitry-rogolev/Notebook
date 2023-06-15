<template>
    <DropdownComponent ref="dropdown" triggerClass="px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300">
        <template #trigger>
            View
        </template>
        <template #content>

            <DropdownItemComponent @click="$window.toggleStatusbar(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="statusbar" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Status bar</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$window.toggleFullscreen(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="fullscreen" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">In full screen</div>
                    <div class="text-xs font-bold">Alt + I</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'WindowMenuToolsDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    computed: {
        statusbar() {
            return this.$window.statusbar;
        }, 
        fullscreen() {
            return this.$window.fullscreen;
        }, 
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },
}
</script>

<style scoped>

</style>
