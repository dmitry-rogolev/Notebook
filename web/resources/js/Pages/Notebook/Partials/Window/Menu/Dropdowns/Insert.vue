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

            <DropdownItemComponent @click="isOpenImageModal = true">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-image w-6 text-center mr-2"></i>
                        <span>Image</span>
                    </div>
                    <div class="text-xs font-bold">Alt + I</div>
                </div>
            </DropdownItemComponent>

            <UploadImageModalPartial 
                :note="note" 
                :active="isOpenImageModal" 
                @added:image="$editable.execCommand('insertImage', $event)"
                @close="isOpenImageModal = false" 
                />

            <DropdownItemComponent @click="isOpenLinkModal = true">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-link w-6 text-center mr-2"></i>
                        <span>Link</span>
                    </div>
                    <div class="text-xs font-bold">Alt + L</div>
                </div>
            </DropdownItemComponent>

            <ModalCreateLinkPartial 
                :active="isOpenLinkModal" 
                @added:link="$editable.execCommand('createLink', $event)"
                @close="isOpenLinkModal = false" 
                />

            <DropdownItemComponent @click="$editable.execCommand('unlink')">
                <i class="fa-solid fa-unlink w-6 text-center mr-2"></i>
                <span>Unlink</span>
            </DropdownItemComponent>

            <DropdownItemComponent @click="isOpenInsertSymbolsModal = true">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-at w-6 text-center mr-2"></i>
                        <span>Symbols</span>
                    </div>
                    <div class="text-xs font-bold">Alt + Y</div>
                </div>
            </DropdownItemComponent>

            <ModalInsertSymbolsPartial 
                :active="isOpenInsertSymbolsModal" 
                @create:symbol="$editable.execCommand('insertHTML', $event)" 
                @close="isOpenInsertSymbolsModal = false" 
                />

            <DropdownItemComponent @click="isOpenInsertEmoticonsModal = true">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-face-grin-wink w-6 text-center mr-2"></i>
                        <span>Emoticons</span>
                    </div>
                    <div class="text-xs font-bold">Alt + E</div>
                </div>
            </DropdownItemComponent>

            <ModalInsertEmoticonsPartial 
                :active="isOpenInsertEmoticonsModal" 
                @create:emoticon="$editable.execCommand('insertHTML', $event)" 
                @close="isOpenInsertEmoticonsModal = false" 
                />

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import UploadImageModalPartial from '@/Pages/Notebook/Partials/Window/Modals/UploadImage.vue';
import ModalInsertSymbolsPartial from '../../Modals/InsertSymbols.vue';
import ModalInsertEmoticonsPartial from '../../Modals/InsertEmoticons.vue';
import ModalCreateLinkPartial from '@/Pages/Notebook/Partials/Window/Modals/CreateLink.vue';

export default {
    name: 'WindowMenuInsertDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
        UploadImageModalPartial, 
        ModalInsertSymbolsPartial, 
        ModalInsertEmoticonsPartial, 
        ModalCreateLinkPartial, 
    }, 

    data() {
        return {
            isOpenInsertSymbolsModal: false, 
            isOpenInsertEmoticonsModal: false, 
            isOpenImageModal: false, 
            isOpenLinkModal: false, 
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
