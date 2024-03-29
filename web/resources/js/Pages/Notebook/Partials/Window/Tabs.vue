<template>
    <WindowTabsComponent>
        <TabsComponent 
            class="h-full"
            activeClasses="border-indigo-500 dark:border-indigo-600 text-indigo-500 dark:text-indigo-600 cursor-default pointer-events-none"
            inactiveClasses="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200 focus:border-indigo-500 dark:focus:border-indigo-600 focus:text-indigo-500 dark:focus:text-indigo-600"
            triggersContainerClass="border-gray-300 dark:border-gray-600 border-b px-4 bg-gray-100 dark:bg-slate-800 text-lg md:text-sm lg:text-base overflow-x-auto"
            >
            <template #triggers>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('File') }}
                </TabComponent>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('Edit') }}
                </TabComponent>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('Insert') }}
                </TabComponent>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('Format') }}
                </TabComponent>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('Tools') }}
                </TabComponent>
                <TabComponent class="px-1 md:px-2 lg:px-3 py-1 mr-2 md:mr-1 lg:mr-2 border-b-2">
                    {{ $t('View') }}
                </TabComponent>
                <button 
                    type="button"
                    role="button"
                    :title="fullscreen ? $t('Fullscreen on') : $t('Fullscreen off')"
                    class="ml-auto px-2 md:px-3 lg:px-4 py-1 text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none hidden md:block"
                    @click="$window.toggleFullscreen()"
                    >
                    <i v-if="fullscreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
                    <i v-else class="fa-solid fa-up-right-and-down-left-from-center fa-rotate-90"></i>
                </button>
                <button :title="$t('Close')" role="button" @click="$window.close()" @mouseenter="showXmark = true" @mouseleave="showXmark = false" type="button" class="px-3 md:px-3 lg:px-4 py-1 text-base md:text-sm lg:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none ml-auto md:ml-0">
                    <div v-if="changed && ! showXmark" class="bg-gray-600 dark:bg-gray-300 rounded-full w-3 h-3 min-w-[0.75rem] min-h-[0.75rem]"></div>
                    <i v-else class="fa-solid fa-xmark"></i>
                </button>
            </template>
            <template #targets>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$notebook.create();" :title="$t('New note')">
                            <i class="fa-solid fa-file"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$notebook.openFile();" :title="$t('Open the file')">
                            <i class="fa-solid fa-folder-open"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$notebook.update();" :title="$t('Save')">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <SaveAsPartial />
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$notebook.toggleAutosave();" :title="autosave ? $t('Autosave on') : $t('Autosave off')">
                            <i class="fa-solid fa-clock-rotate-left" :class="{'text-indigo-500 dark:text-indigo-600': autosave}"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$window.print();" :title="$t('Print')">
                            <i class="fa-solid fa-print"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$window.close();" :title="$t('Close')">
                            <i class="fa-solid fa-door-open"></i>
                        </ToolbarButtonComponent>
                    </div>
                </TargetComponent>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('undo');" :title="$t('Undo')">
                            <i class="fa-solid fa-rotate-left"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('redo');" :title="$t('Redo')">
                            <i class="fa-solid fa-rotate-right"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('cut');" :title="$t('Cut')">
                            <i class="fa-solid fa-scissors"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('copy');" :title="$t('Copy')">
                            <i class="fa-solid fa-copy"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('delete');" :title="$t('Delete')">
                            <i class="fa-solid fa-trash"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('selectAll');" :title="$t('Select all')">
                            <i class="fa-solid fa-object-group"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$mark.show();" :title="$t('Find')">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </ToolbarButtonComponent>
                    </div>
            
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$mark.showReplace();" :title="$t('Replace')">
                            <i class="fa-solid fa-right-left"></i>
                        </ToolbarButtonComponent>
                    </div>
                </TargetComponent>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('insertUnorderedList')" :title="$t('Unordered list')">
                            <i class="fa-solid fa-list-ul"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('insertOrderedList')" :title="$t('Ordered list')">
                            <i class="fa-solid fa-list-ol"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <UploadImageWindowToolbarModalPartial />
                    </div>
                    <div role="menuitem">
                        <CreateLinkWindowToolbarModalPartial />
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('unlink')" :title="$t('Unlink')">
                            <i class="fa-solid fa-unlink"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <InsertSymbolsWindowToolbarModalPartial />
                    </div>
                    <div role="menuitem">
                        <InsertEmoticonsWindowToolbarModalPartial />
                    </div>
                </TargetComponent>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <BlockFormatPartial />
                    </div>
                    <div role="menuitem">
                        <FontPartial />
                    </div>
                    <div role="menuitem">
                        <FontSizePartial />
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent class="relative" :title="$t('Color')">
                            <div class="-mt-2 -mx-2">
                                <i class="block fa-solid fa-font text-xs"></i>
                                <label class="absolute top-0 bottom-0 left-0 right-0 cursor-pointer" :for="foreColorToken"></label>
                                <input v-model="foreColor" :id="foreColorToken" class="block w-8 h-2" type="color" />
                            </div>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent class="relative" :title="$t('Background')">
                            <div class="-mt-2 -mx-2">
                                <i class="block fa-solid fa-font text-xs bg-yellow-400 dark:bg-yellow-600 px-1 py-1 text-gray-700 dark:text-gray-300"></i>
                                <label class="absolute top-0 bottom-0 left-0 right-0 cursor-pointer" :for="hiliteColorToken"></label>
                                <input v-model="hiliteColor" :id="hiliteColorToken" class="block w-8 h-2" type="color" />
                            </div>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('bold')" :title="$t('Bold')">
                            <i class="fa-solid fa-bold"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('italic')" :title="$t('Italic')">
                            <i class="fa-solid fa-italic"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('underline')" :title="$t('Underline')">
                            <i class="fa-solid fa-underline"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('strikethrough')" :title="$t('Strikethrough')">
                            <i class="fa-solid fa-strikethrough"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('superscript')" :title="$t('Superscript')">
                            <i class="fa-solid fa-superscript"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('subscript')" :title="$t('Subscript')">
                            <i class="fa-solid fa-subscript"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('insertHorizontalRule')" :title="$t('Horizontal rule')">
                            <i class="fa-solid fa-window-minimize"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('justifyLeft')" :title="$t('Align left')">
                            <i class="fa-solid fa-align-left"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('justifyCenter')" :title="$t('Align center')">
                            <i class="fa-solid fa-align-center"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('justifyRight')" :title="$t('Align right')">
                            <i class="fa-solid fa-align-right"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('justifyFull')" :title="$t('Align justify')">
                            <i class="fa-solid fa-align-justify"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.execCommand('removeFormat')" :title="$t('Remove format')">
                            <i class="fa-solid fa-eraser"></i>
                        </ToolbarButtonComponent>
                    </div>
                </TargetComponent>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$editable.toggleSpellcheck();" :title="spellcheck ? $t('Spell check on') : $t('Spell check off')">
                            <i class="fa-solid fa-spell-check" :class="{'text-indigo-500 dark:text-indigo-600': spellcheck}"></i>
                        </ToolbarButtonComponent>
                    </div>
                </TargetComponent>
                <TargetComponent class="flex flex-nowrap md:flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-b text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$window.showStandard();" :title="$t('Standard menu')">
                            <i class="fa-solid fa-table-list"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem">
                        <ToolbarButtonComponent @click="$window.toggleStatusbar();" :title="statusbar ? $t('Statusbar on') : $t('Statusbar off')">
                            <i class="fa-solid fa-heart-pulse" :class="{'text-indigo-500 dark:text-indigo-600': statusbar}"></i>
                        </ToolbarButtonComponent>
                    </div>
                    <div role="menuitem" class="hidden md:block">
                        <ToolbarButtonComponent @click="$window.toggleFullscreen();" :title="fullscreen ? $t('Fullscreen on') : $t('Fullscreen off')">
                            <i v-if="fullscreen" class="fa-solid fa-down-left-and-up-right-to-center fa-rotate-90"></i>
                            <i v-else class="fa-solid fa-up-right-and-down-left-from-center fa-rotate-90"></i>
                        </ToolbarButtonComponent>
                    </div>
                </TargetComponent>
            </template>
        </TabsComponent>
    </WindowTabsComponent>
</template>

<script>
import WindowTabsComponent from '@/Plugins/Window/Components/WindowTabs.vue';
import ToolbarButtonComponent from '@/Components/ToolbarButton.vue';
import CreateLinkWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/CreateLink.vue';
import UploadImageWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/UploadImage.vue';
import InsertSymbolsWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/InsertSymbols.vue';
import InsertEmoticonsWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/InsertEmoticons.vue';
import BlockFormatPartial from './Dropdowns/Sub/Toolbar/BlockFormat.vue';
import FontPartial from './Dropdowns/Sub/Toolbar/Font.vue';
import FontSizePartial from './Dropdowns/Sub/Toolbar/FontSize.vue';
import SaveAsPartial from './Modals/Toolbar/SaveAs.vue';
import TabsComponent from '@/Components/Tabs/Tabs.vue';
import TabComponent from '@/Components/Tabs/Trigger.vue';
import TargetComponent from '@/Components/Tabs/Target.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';
import { token } from '../../../../Classes/helpers';

export default {
    name: 'WindowTabsPartial', 

    components: {
        WindowTabsComponent, 
        ToolbarButtonComponent, 
        CreateLinkWindowToolbarModalPartial, 
        UploadImageWindowToolbarModalPartial, 
        InsertSymbolsWindowToolbarModalPartial, 
        InsertEmoticonsWindowToolbarModalPartial, 
        BlockFormatPartial, 
        FontPartial, 
        FontSizePartial, 
        SaveAsPartial, 
        TabsComponent, 
        TabComponent, 
        TargetComponent, 
    }, 

    data () {
        return {
            fonts: fonts, 
            formats: {
                [this.$t('Header', [1])]: 'h1', 
                [this.$t('Header', [2])]: 'h2', 
                [this.$t('Header', [3])]: 'h3', 
                [this.$t('Header', [4])]: 'h4', 
                [this.$t('Header', [5])]: 'h5', 
                [this.$t('Header', [6])]: 'h6', 
                [this.$t('Paragraph')]: 'p', 
                [this.$t('Block quote')]: 'blockquote', 
            }, 
            sizes: [ 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 62, 72 ], 
            foreColorToken: token(), 
            hiliteColorToken: token(), 
            color: '', 
            background: '', 
            showXmark: false, 
        };
    },

    computed: {
        foreColor: {
            get() {
                return this.color;
            }, 
            set(v) {
                this.color = v;
                this.$editable.execCommand('foreColor', v, { cssMode: true });
            }, 
        }, 
        hiliteColor: {
            get() {
                return this.background;
            }, 
            set(v) {
                this.background = v;
                this.$editable.execCommand('hiliteColor', v, { cssMode: true });
            }, 
        }, 
        exampleText() {
            return faker.lorem.lines(1);
        }, 
        autosave() {
            return this.$notebook.autosave;
        },
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
        statusbar() {
            return this.$window.statusbar;
        }, 
        fullscreen() {
            return this.$window.fullscreen;
        }, 
        changed() {
            return this.$window.file.isDirty;
        }, 
    },
}
</script>

<style scoped>

</style>
