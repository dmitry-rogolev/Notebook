<template>
    <section
        role="menubar"
        tabindex="-1"
        class="flex flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300"
        >

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
            <ToolbarButtonComponent @click="$editable.execCommand('bold')" title="Bold">
                <i class="fa-solid fa-bold"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('italic')" title="Italic">
                <i class="fa-solid fa-italic"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('underline')" title="Underline">
                <i class="fa-solid fa-underline"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('strikethrough')" title="Strikethrough">
                <i class="fa-solid fa-strikethrough"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('superscript')" title="Superscript">
                <i class="fa-solid fa-superscript"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('subscript')" title="Subscript">
                <i class="fa-solid fa-subscript"></i>
            </ToolbarButtonComponent>
        </div>

        <div class="flex flex-nowrap">
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('insertUnorderedList')" title="Unordered list">
                    <i class="fa-solid fa-list-ul"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('insertOrderedList')" title="Ordered list">
                    <i class="fa-solid fa-list-ol"></i>
                </ToolbarButtonComponent>
            </div>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$editable.execCommand('insertHorizontalRule')" title="Horizontal rule">
                <i class="fa-solid fa-window-minimize"></i>
            </ToolbarButtonComponent>
        </div>

        <div class="flex flex-nowrap">
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('justifyLeft')" title="Align left">
                    <i class="fa-solid fa-align-left"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('justifyCenter')" title="Align center">
                    <i class="fa-solid fa-align-center"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('justifyRight')" title="Align right">
                    <i class="fa-solid fa-align-right"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('justifyFull')" title="Align justify">
                    <i class="fa-solid fa-align-justify"></i>
                </ToolbarButtonComponent>
            </div>
            
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent class="relative" title="Color">
                <div class="-mt-2 -mx-2">
                    <i class="block fa-solid fa-font text-xs"></i>
                    <label class="absolute top-0 bottom-0 left-0 right-0 cursor-pointer" :for="foreColorToken"></label>
                    <input v-model="foreColor" :id="foreColorToken" class="block w-8 h-2" type="color" />
                </div>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent class="relative" title="Background">
                <div class="-mt-2 -mx-2">
                    <i class="block fa-solid fa-font text-xs bg-yellow-400 dark:bg-yellow-600 px-1 py-1 text-gray-700 dark:text-gray-300"></i>
                    <label class="absolute top-0 bottom-0 left-0 right-0 cursor-pointer" :for="hiliteColorToken"></label>
                    <input v-model="hiliteColor" :id="hiliteColorToken" class="block w-8 h-2" type="color" />
                </div>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <UploadImageWindowToolbarModalPartial :note="note" />
        </div>

        <div class="flex flex-nowrap">
            <CreateLinkWindowToolbarModalPartial />

            <div role="menuitem">
                <ToolbarButtonComponent @click="$editable.execCommand('unlink')" title="Unlink">
                    <i class="fa-solid fa-unlink"></i>
                </ToolbarButtonComponent>
            </div>
        </div>

        <div role="menuitem">
            <InsertSymbolsWindowToolbarModalPartial />
        </div>

        <div role="menuitem">
            <InsertEmoticonsWindowToolbarModalPartial />
        </div>
        
    </section>
</template>

<script>
import ToolbarButtonComponent from '@/Components/ToolbarButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import CreateLinkWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/CreateLink.vue';
import UploadImageWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/UploadImage.vue';
import InsertSymbolsWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/InsertSymbols.vue';
import InsertEmoticonsWindowToolbarModalPartial from '@/Pages/Notebook/Partials/Window/Modals/Toolbar/InsertEmoticons.vue';
import BlockFormatPartial from './Dropdowns/Sub/Toolbar/BlockFormat.vue';
import FontPartial from './Dropdowns/Sub/Toolbar/Font.vue';
import FontSizePartial from './Dropdowns/Sub/Toolbar/FontSize.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';
import { token } from '@/helpers';

export default {
    name: 'WindowToolbarPartial', 

    components: {
        ToolbarButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        CreateLinkWindowToolbarModalPartial, 
        UploadImageWindowToolbarModalPartial, 
        InsertSymbolsWindowToolbarModalPartial, 
        InsertEmoticonsWindowToolbarModalPartial, 
        BlockFormatPartial, 
        FontPartial, 
        FontSizePartial, 
    }, 

    data () {
        return {
            isOpenFont: false, 
            isOpenFormatBlocks: false, 
            isOpenFontSize: false, 
            isOpenImageModal: false, 
            isOpenLinkModal: false, 
            font: 'Figtree', 
            fonts: fonts, 
            formatBlock: 'Paragraph', 
            formats: {
                'Header 1': 'h1', 
                'Header 2': 'h2', 
                'Header 3': 'h3', 
                'Header 4': 'h4', 
                'Header 5': 'h5', 
                'Header 6': 'h6', 
                Paragraph: 'p', 
                'Block quote': 'blockquote', 
            }, 
            size: 12, 
            sizes: [ 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 62, 72 ], 
            unit: 'pt', 
            foreColorToken: token(), 
            hiliteColorToken: token(), 
            color: '', 
            background: '', 
            lineHeight: 1.15, 
            lineHeights: [ 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 1.875, 2 ], 
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
        range() {
            return this.$store.state.range;
        }, 
        exampleText() {
            return faker.lorem.lines(1);
        }, 
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
