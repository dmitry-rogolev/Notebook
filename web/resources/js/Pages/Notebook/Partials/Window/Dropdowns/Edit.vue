<template>
    <DropdownComponent ref="dropdown" triggerClass="px-3 md:px-2 lg:px-3 py-1 text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300 h-full">
        <template #trigger>
            {{ $t('Edit') }}
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.execCommand('undo'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-left w-6 text-center mr-2"></i>
                        <span>{{ $t('Undo') }}</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Z</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('redo'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-rotate-right w-6 text-center mr-2"></i>
                        <span>{{ $t('Redo') }}</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + Y</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('cut'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-scissors w-6 text-center mr-2"></i>
                        <span>{{ $t('Cut') }}</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + X</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('copy'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-copy w-6 text-center mr-2"></i>
                        <span>{{ $t('Copy') }}</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + C</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('delete'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-trash w-6 text-center mr-2"></i>
                        <span>{{ $t('Delete') }}</span>
                    </div>
                    <div class="text-xs font-bold">Delete</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$editable.execCommand('selectAll'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-object-group w-6 text-center mr-2"></i>
                        <span>{{ $t('Select all') }}</span>
                    </div>
                    <div class="text-xs font-bold">Ctrl + A</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$mark.show(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-magnifying-glass w-6 text-center mr-2"></i>
                        <span>{{ $t('Find') }}</span>
                    </div>
                    <div class="text-xs font-bold">Alt + F</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$mark.showReplace(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-right-left w-6 text-center mr-2"></i>
                        <span>{{ $t('Replace') }}</span>
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
