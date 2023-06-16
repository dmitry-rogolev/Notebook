<template>
    <DropdownComponent ref="dropdown" triggerClass="px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300">
        <template #trigger>
            Edit
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.execCommand('undo'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-left w-6 text-center mr-2"></i>
                        <span>Undo</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Z</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('redo'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-right w-6 text-center mr-2"></i>
                        <span>Redo</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Y</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('cut'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-scissors w-6 text-center mr-2"></i>
                        <span>Cut</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + X</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('copy'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-copy w-6 text-center mr-2"></i>
                        <span>Copy</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + C</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('delete'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-trash w-6 text-center mr-2"></i>
                        <span>Delete</span>
                    </div>
                    <div class="text-xs font-bold">Delete</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$editable.execCommand('selectAll'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <span>Select all</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + A</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                        <span>Find</span>
                    </div>
                    <div class="text-xs font-bold">Alt + F</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-right-left w-6 text-center mr-2"></i>
                        <span>Replace</span>
                    </div>
                    <div class="text-xs font-bold">Alt + R</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'WindowEditDropdownPartial', 

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
