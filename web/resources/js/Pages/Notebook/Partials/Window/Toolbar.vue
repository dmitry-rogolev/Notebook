<template>
    <section
        role="menubar"
        tabindex="-1"
        class="list-none flex flex-wrap px-2 sm:px-4 py-1 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300"
        >

        <div role="menuitem">
            <DropdownComponent @open="isOpenFormatBlocks = true" @close="isOpenFormatBlocks = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent class="flex flex-nowrap justify-between max-w-[10rem]" :active="isOpenFormatBlocks">
                        <div class="mr-2 truncate">{{ formatBlock }}</div>
                        <div>
                            <i v-if="isOpenFormatBlocks" class="fa-solid fa-caret-up"></i>
                            <i v-else class="fa-solid fa-caret-down"></i>
                        </div>
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
    
                    <DropdownLinkComponent 
                        v-for="(item, key) in formats" 
                        @click="formatBlock = key; $emit('format', item);" 
                        as="button"
                        >
                        <div v-html="`<${item} class='m-0'>${key}</${item}>`"></div>
                    </DropdownLinkComponent>
    
                </template>
            </DropdownComponent>
        </div>

        <div role="menuitem">
            <DropdownComponent widthClass="w-72" heightClass="h-72" @open="isOpenFont = true" @close="isOpenFont = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent class="flex flex-nowrap justify-between max-w-[10rem]" :active="isOpenFont">
                        <div class="mr-2 truncate">{{ font }}</div>
                        <div>
                            <i v-if="isOpenFont" class="fa-solid fa-caret-up"></i>
                            <i v-else class="fa-solid fa-caret-down"></i>
                        </div>
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
    
                    <DropdownLinkComponent v-for="item in fonts.serif" @click="font = item; $emit('font', {name: item, family: 'serif'})" as="button">
                        <div class="flex flex-nowrap items-center justify-between">
                            <div class="text-gray-700 dark:text-gray-300 text-xs">
                                {{ item }}
                            </div>
                            <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, serif`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts['sans-serif']" @click="font = item; $emit('font', {name: item, family: 'sans-serif'})" as="button">
                        <div class="flex flex-nowrap items-center justify-between">
                            <div class="text-gray-700 dark:text-gray-300 text-xs">
                                {{ item }}
                            </div>
                            <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, sans-serif`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.cursive" @click="font = item; $emit('font', {name: item, family: 'cursive'})" as="button">
                        <div class="flex flex-nowrap items-center justify-between">
                            <div class="text-gray-700 dark:text-gray-300 text-xs">
                                {{ item }}
                            </div>
                            <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, cursive`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.fantasy" @click="font = item; $emit('font', {name: item, family: 'fantasy'})" as="button">
                        <div class="flex flex-nowrap items-center justify-between">
                            <div class="text-gray-700 dark:text-gray-300 text-xs">
                                {{ item }}
                            </div>
                            <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, fantasy`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.monospace" @click="font = item; $emit('font', {name: item, family: 'monospace'})" as="button">
                        <div class="flex flex-nowrap items-center justify-between">
                            <div class="text-gray-700 dark:text-gray-300 text-xs">
                                {{ item }}
                            </div>
                            <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, monospace`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>
    
                </template>
            </DropdownComponent>
        </div>

        <div role="menuitem">
            <DropdownComponent widthClass="w-20" heightClass="h-72" @open="isOpenFontSize = true" @close="isOpenFontSize = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent class="flex flex-nowrap justify-between max-w-[10rem]" :active="isOpenFontSize">
                        <div class="mr-2 truncate">{{ `${size}${unit}` }}</div>
                        <div>
                            <i v-if="isOpenFontSize" class="fa-solid fa-caret-up"></i>
                            <i v-else class="fa-solid fa-caret-down"></i>
                        </div>
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
    
                    <DropdownLinkComponent 
                        v-for="item in sizes" 
                        @click="size = item; $emit('fontSize', `${item}${unit}`);" 
                        as="button"
                        >
                        {{ `${item}${unit}` }}
                    </DropdownLinkComponent>
    
                </template>
            </DropdownComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('bold')" title="Bold">
                <i class="fa-solid fa-bold"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('italic')" title="Italic">
                <i class="fa-solid fa-italic"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('underline')" title="Underline">
                <i class="fa-solid fa-underline"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('strikethrough')" title="Strikethrough">
                <i class="fa-solid fa-strikethrough"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('superscript')" title="Superscript">
                <i class="fa-solid fa-superscript"></i>
            </ToolbarButtonComponent>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('subscript')" title="Subscript">
                <i class="fa-solid fa-subscript"></i>
            </ToolbarButtonComponent>
        </div>

        <div class="flex flex-nowrap">
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('insertUnorderedList')" title="Unordered list">
                    <i class="fa-solid fa-list-ul"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('insertOrderedList')" title="Ordered list">
                    <i class="fa-solid fa-list-ol"></i>
                </ToolbarButtonComponent>
            </div>
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('insertHorizontalRsectione')" title="Horizontal rsectione">
                <i class="fa-solid fa-window-minimize"></i>
            </ToolbarButtonComponent>
        </div>

        <div  class="flex flex-nowrap">
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('justifyLeft')" title="Align left">
                    <i class="fa-solid fa-align-left"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('justifyCenter')" title="Align center">
                    <i class="fa-solid fa-align-center"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('justifyRight')" title="Align right">
                    <i class="fa-solid fa-align-right"></i>
                </ToolbarButtonComponent>
            </div>
            <div role="menuitem">
                <ToolbarButtonComponent @click="$emit('justifyFsectionl')" title="Align justify">
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
            <ToolbarButtonComponent @click="isOpenImageModal = true" title="Insert image">
                <i class="fa-solid fa-image"></i>
            </ToolbarButtonComponent>

            <UploadImageModalPartial 
                :note="note" 
                :active="isOpenImageModal" 
                @created:image="$emit('insertImage', $event)"
                @close="isOpenImageModal = false" 
                />
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="isOpenLinkModal = true" title="Insert link">
                <i class="fa-solid fa-link"></i>
            </ToolbarButtonComponent>

            <ModalCreateLinkPartial 
                :active="isOpenLinkModal" 
                @added:link="$emit('createLink', $event)"
                @close="isOpenLinkModal = false" 
                />
        </div>

        <div role="menuitem">
            <ToolbarButtonComponent @click="$emit('unlink')" title="Unlink">
                <i class="fa-solid fa-unlink"></i>
            </ToolbarButtonComponent>
        </div>
        
    </section>
</template>

<script>
import ToolbarButtonComponent from '@/Components/ToolbarButton.vue';
import DropdownComponent from '@/Components/Dropdown.vue';
import DropdownLinkComponent from '@/Components/DropdownLink.vue';
import UploadImageModalPartial from '@/Pages/Notebook/Partials/Window/Modals/UploadImage.vue';
import ModalCreateLinkPartial from '@/Pages/Notebook/Partials/Window/Modals/CreateLink.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';
import { token } from '@/helpers';

export default {
    name: 'WindowToolbarPartial', 

    components: {
        ToolbarButtonComponent, 
        DropdownComponent, 
        DropdownLinkComponent, 
        UploadImageModalPartial, 
        ModalCreateLinkPartial, 
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
        'insertHorizontalRsectione', 
        'justifyLeft', 
        'justifyCenter', 
        'justifyRight', 
        'justifyFsectionl', 
        'font', 
        'format', 
        'fontSize', 
        'foreColor', 
        'hiliteColor', 
        'insertImage', 
        'createLink', 
        'unlink', 
    ], 

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
                this.$emit('foreColor', v);
            }, 
        }, 
        hiliteColor: {
            get() {
                return this.background;
            }, 
            set(v) {
                this.background = v;
                this.$emit('hiliteColor', v);
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
