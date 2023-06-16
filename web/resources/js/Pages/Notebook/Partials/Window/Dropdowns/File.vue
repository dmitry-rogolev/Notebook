<template>
    <DropdownComponent ref="dropdown" triggerClass="px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300">
        <template #trigger>
            File
        </template>
        <template #content>
            <DropdownItemComponent @click="$notebook.create(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-file block mr-2 w-6 text-center"></i>
                        <span>New</span>
                    </div>
                    <div class="text-xs font-bold">Alt + N</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="openFile(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-folder-open w-6 text-center mr-2"></i>
                        <span>Open</span>
                    </div>
                    <div class="text-xs font-bold">Alt + O</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$notebook.update(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                        <span>Save</span>
                    </div>
                    <div class="text-xs font-bold">Alt + S</div>
                </div>
            </DropdownItemComponent>

            <SaveAsPartial @click="dropdown.hide()" />

            <DropdownItemComponent @click="$notebook.toggleAutosave(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="autosave" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Auto Save</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="dropdown.hide(); print();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-print w-6 text-center mr-2"></i>
                        <span>Print</span>
                    </div>
                    <div class="text-xs font-bold">Alt + P</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$notebook.closeWindow(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-door-open w-6 text-center mr-2"></i>
                        <span>Exit</span>
                    </div>
                    <div class="text-xs font-bold">Alt + Q</div>
                </div>
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import SaveAsPartial from '../Modals/Menu/SaveAs.vue';

export default {
    name: 'FileWindowDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
        SaveAsPartial, 
    }, 
    
    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
        autosave() {
            return this.$notebook.autosave;
        },
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },

    methods: {
        openFile() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = 'text/*';
            input.onchange = () => {
                if (input.files[0]) {
                    input.files[0].arrayBuffer().then((arrayBuffer) => {
                        this.$notebook.create({
                            title: input.files[0].name, 
                            text: new TextDecoder().decode(arrayBuffer), 
                        });
                    });
                }
            }
            input.click();
        }, 
        print() {
            window.print();
        },
    }, 
}
</script>

<style scoped>

</style>
