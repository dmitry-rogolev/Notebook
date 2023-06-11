<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            Edit
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.execCommand('undo')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-left w-6 text-center mr-2"></i>
                        <span>Undo</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Z</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('redo')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-right w-6 text-center mr-2"></i>
                        <span>Redo</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Y</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('cut')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-scissors w-6 text-center mr-2"></i>
                        <span>Cut</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + X</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('copy')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-copy w-6 text-center mr-2"></i>
                        <span>Copy</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + C</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('paste')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-paste w-6 text-center mr-2"></i>
                        <span>Paste</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + V</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('delete')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-trash w-6 text-center mr-2"></i>
                        <span>Delete</span>
                    </div>
                    <div class="text-xs font-bold">Delete</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$editable.execCommand('selectAll')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <span>Select all</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + A</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$emit('open:selector')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                        <span>Find</span>
                    </div>
                    <div class="text-xs font-bold">Alt + F</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$emit('open:replacer')">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-right-left w-6 text-center mr-2"></i>
                        <span>Replace</span>
                    </div>
                    <div class="text-xs font-bold">Alt + R</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';

export default {
    name: 'WindowMenuEditDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    emits: [
        'open:selector', 
        'open:replacer', 
    ], 
}
</script>

<style scoped>

</style>
