<template>
    <DropdownComponent ref="dropdown" triggerClass="px-3 md:px-2 lg:px-3 py-1 text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300 h-full">
        <template #trigger>
            {{ $t('Insert') }}
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.execCommand('insertUnorderedList'); dropdown.hide();">
                <div class="flex flex-nowrap">
                    <div>
                        <i class="fa-solid fa-list-ul w-6 text-center mr-2"></i>
                    </div>
                    <div class="flex-auto">
                        {{ $t('Unordered list') }}
                    </div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('insertOrderedList'); dropdown.hide();">
                <div class="flex flex-nowrap">
                    <div>
                        <i class="fa-solid fa-list-ol w-6 text-center mr-2"></i>
                    </div>
                    <div class="flex-auto">
                        {{ $t('Ordered list') }}
                    </div>
                </div>
            </DropdownItemComponent>

            <UploadImageWindowMenuModalPartial @click="dropdown.hide()" />

            <CreateLinkWindowMenuModalPartial @click="dropdown.hide()" />

            <DropdownItemComponent @click="$editable.execCommand('unlink'); dropdown.hide();">
                <i class="fa-solid fa-unlink w-6 text-center mr-2"></i>
                <span>{{ $t('Unlink') }}</span>
            </DropdownItemComponent>

            <InsertSymbolsWindowMenuModalPartial @click="dropdown.hide()" />

            <InsertEmoticonsWindowMenuModalPartial @click="dropdown.hide()" />

        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import CreateLinkWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/CreateLink.vue';
import UploadImageWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/UploadImage.vue';
import InsertSymbolsWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/InsertSymbols.vue';
import InsertEmoticonsWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/InsertEmoticons.vue';

export default {
    name: 'WindowInsertDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
        CreateLinkWindowMenuModalPartial, 
        UploadImageWindowMenuModalPartial, 
        InsertSymbolsWindowMenuModalPartial, 
        InsertEmoticonsWindowMenuModalPartial,
    }, 

    data() {
        return {
            isOpenInsertSymbolsModal: false, 
            isOpenInsertEmoticonsModal: false, 
            isOpenImageModal: false, 
        }
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
