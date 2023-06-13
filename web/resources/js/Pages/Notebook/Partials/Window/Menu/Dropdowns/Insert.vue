<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            Insert
        </template>
        <template #content>

            <DropdownItemComponent @click="$editable.execCommand('insertUnorderedList')">
                <i class="fa-solid fa-list-ul w-6 text-center mr-2"></i>
                <span>Unordered list</span>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('insertOrderedList')">
                <i class="fa-solid fa-list-ol w-6 text-center mr-2"></i>
                <span>Ordered list</span>
            </DropdownItemComponent>

            <UploadImageWindowMenuModalPartial :note="note" />

            <CreateLinkWindowMenuModalPartial />

            <DropdownItemComponent @click="$editable.execCommand('unlink')">
                <i class="fa-solid fa-unlink w-6 text-center mr-2"></i>
                <span>Unlink</span>
            </DropdownItemComponent>

            <InsertSymbolsWindowMenuModalPartial />

            <InsertEmoticonsWindowMenuModalPartial />

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import CreateLinkWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/CreateLink.vue';
import UploadImageWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/UploadImage.vue';
import InsertSymbolsWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/InsertSymbols.vue';
import InsertEmoticonsWindowMenuModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Menu/InsertEmoticons.vue';

export default {
    name: 'WindowMenuInsertDropdownPartial', 

    components: {
        DropdownPartial, 
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

    props: {
        note: {
            type: Object,
            required: true, 
        },
    },
}
</script>

<style scoped>

</style>
