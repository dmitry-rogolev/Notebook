<template>
    <ul
        role="menubar"
        tabindex="-1"
        class="list-none flex flex-nowrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300"
        >

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('bold')" title="Bold">
                <i class="fa-solid fa-bold"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('italic')" title="Italic">
                <i class="fa-solid fa-italic"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('underline')" title="Underline">
                <i class="fa-solid fa-underline"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('strikethrough')" title="Strikethrough">
                <i class="fa-solid fa-strikethrough"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('superscript')" title="Superscript">
                <i class="fa-solid fa-superscript"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('subscript')" title="Subscript">
                <i class="fa-solid fa-subscript"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('insertUnorderedList')" title="Unordered list">
                <i class="fa-solid fa-list-ul"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('insertOrderedList')" title="Ordered list">
                <i class="fa-solid fa-list-ol"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('insertHorizontalRule')" title="Horizontal rule">
                <i class="fa-solid fa-window-minimize"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('justifyLeft')" title="Align left">
                <i class="fa-solid fa-align-left"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('justifyCenter')" title="Align center">
                <i class="fa-solid fa-align-center"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('justifyRight')" title="Align right">
                <i class="fa-solid fa-align-right"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem">
            <ToolbarButtonComponent @click="$emit('justifyFull')" title="Align justify">
                <i class="fa-solid fa-align-justify"></i>
            </ToolbarButtonComponent>
        </li>
        
    </ul>
</template>

<script>
import ToolbarButtonComponent from '@/Components/ToolbarButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';

export default {
    name: 'WindowToolbarPartial', 

    components: {
        ToolbarButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
    }, 

    emits: [
        'bold', 
        'italic', 
        'underline', 
        'strikethrough', 
        'superscript', 
        'subscript', 
        'insertUnorderedList', 
        'insertOrderedList', 
        'insertHorizontalRule', 
        'justifyLeft', 
        'justifyCenter', 
        'justifyRight', 
        'justifyFull', 
    ], 

    data () {
        return {
            isOpenFont: false, 
            isOpenFontSize: false, 
            isOpenFontSizeUnit: false, 
            isOpenLineHeight: false, 
            size: 12, 
            unit: 'pt', 
            units: [
                'px', 
                'pt', 
            ], 
            sizes: [ 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 62, 72 ], 
            font: 'Figtree', 
            fonts: fonts, 
            lineHeight: 1.15, 
            lineHeights: [ 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 1.875, 2 ], 
        };
    },

    computed: {
        fontSize: {
            get() {
                return this.size;
            }, 
            set(v) {
                let s = Number(v);
                if (s && s > 8 && s < 72) {
                    this.size = Math.abs(s);
                    this.$emit('update:size', {
                        size: this.size, 
                        unit: this.unit, 
                    });
                }
            }, 
        }, 
        range() {
            return this.$store.state.range;
        }, 
        exampleText() {
            return faker.lorem.lines(1);
        }, 
    },
}
</script>

<style scoped>

</style>
