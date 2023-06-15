<template>
    <DropdownComponent ref="dropdown" triggerClass="px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300">
        <template #trigger>
            File
        </template>
        <template #content>
            <DropdownItemComponent @click="$emit('create:note'); dropdown.hide();">
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

            <DropdownItemComponent @click="$emit('update:note'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-floppy-disk w-6 text-center mr-2"></i>
                        <span>Save</span>
                    </div>
                    <div class="text-xs font-bold">Alt + S</div>
                </div>
            </DropdownItemComponent>

            <SaveAsPartial @click="dropdown.hide()" :record="record" />

            <DropdownItemComponent @click="toggleAutosave(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex items-center">
                        <i v-if="autosave" class="fa-solid fa-check w-6 text-center mr-2"></i>
                        <div v-else class="w-6 mr-2"></div>
                    </div>
                    <div class="flex-auto">Auto Save</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="print(); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <div class="flex-auto">
                        <i class="fa-solid fa-print w-6 text-center mr-2"></i>
                        <span>Print</span>
                    </div>
                    <div class="text-xs font-bold">Alt + P</div>
                </div>
            </DropdownItemComponent>

            <div class="border-t border-gray-300 dark:border-gray-600" tabindex="-1"></div>

            <DropdownItemComponent @click="$emit('exit'); dropdown.hide();">
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
import { cutForbiddenTags } from '@/helpers';

export default {
    name: 'FileWindowDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
        SaveAsPartial, 
    }, 

    emits: [
        'create:note', 
        'update:note', 
        'exit', 
    ], 

    data() {
        return {
            isOpenFileModal: false, 
            fileName: '', 
            timerAutosave: null, 
            autosaveInterval: 60000, 
        };
    },

    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
        autosave() {
            return this.$store.state.autosave;
        },
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },

    props: {
        record: {
            type: Object,
            required: true,  
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
                        this.$emit('create:note', {
                            title: input.files[0].name, 
                            text: cutForbiddenTags(new TextDecoder().decode(arrayBuffer)), 
                        });
                    });
                }
            }
            input.click();
        }, 
        onAutosave() {
            this.timerAutosave = setInterval(() => this.$emit('update:note'), this.autosaveInterval);
        }, 
        offAutosave() {
            if (this.timerAutosave) {
                clearInterval(this.timerAutosave);
                this.timerAutosave = null;
            }
        }, 
        toggleAutosave() {
            if (this.autosave) {
                this.$store.dispatch('autosave', false);
                this.offAutosave();
                this.$notifier.push({
                    message: 'Auto save mod off',
                    success: true, 
                });
            } else {
                this.$store.dispatch('autosave', true);
                this.onAutosave();
                this.$notifier.push({
                    message: 'Auto save mod on',
                    success: true, 
                });
            }
        }, 
        print() {
            window.print();
        },
    }, 
    
    mounted() {
        this.$store.dispatch('autosave');

        if (this.autosave) {
            this.onAutosave();
        }
    }, 

    unmounted() {
        this.offAutosave();
    }, 
}
</script>

<style scoped>

</style>
