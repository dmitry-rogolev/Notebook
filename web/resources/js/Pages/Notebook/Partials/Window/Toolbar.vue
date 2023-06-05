<template>
    <ul
        role="menubar"
        tabindex="-1"
        class="flex flex-nowrap px-2 sm:px-4 bg-gray-50 dark:bg-slate-800 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300"
        >

        <li role="menuitem" class="flex flex-nowrap items-center">

            <DropdownComponent role="menuitem" width="" height="72" @open="isOpenFont = true" @close="isOpenFont = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent :active="isOpenFont" class="px-2 py-2 border-l text-xs">
                        {{ font }}
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>

                    <DropdownLinkComponent v-for="item in fonts.serif" @click="font = item; $emit('update:font', {family: 'serif', name: item});" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="text-xs text-gray-700 dark:text-gray-300 mr-2">
                                {{ item }}
                            </div>
                            <div class="flex-auto text-right w-32 truncate text-base text-gray-600 dark:text-gray-400" :style="{fontFamily: `'${item}', serif`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts['sans-serif']" @click="font = item; $emit('update:font', {family: 'sans-serif', name: item});" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="text-xs text-gray-700 dark:text-gray-300 mr-2">
                                {{ item }}
                            </div>
                            <div class="flex-auto text-right w-32 truncate text-base text-gray-600 dark:text-gray-400" :style="{fontFamily: `'${item}', sans-serif`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.cursive" @click="font = item; $emit('update:font', {family: 'cursive', name: item});" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="text-xs text-gray-700 dark:text-gray-300 mr-2">
                                {{ item }}
                            </div>
                            <div class="flex-auto text-right w-32 truncate text-base text-gray-600 dark:text-gray-400" :style="{fontFamily: `'${item}', cursive`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.fantasy" @click="font = item; $emit('update:font', {family: 'fantasy', name: item});" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="text-xs text-gray-700 dark:text-gray-300 mr-2">
                                {{ item }}
                            </div>
                            <div class="flex-auto text-right w-32 truncate text-base text-gray-600 dark:text-gray-400" :style="{fontFamily: `'${item}', fantasy`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                    <DropdownLinkComponent v-for="item in fonts.monospace" @click="font = item; $emit('update:font', {family: 'monospace', name: item});" as="button">
                        <div class="flex flex-nowrap items-center">
                            <div class="text-xs text-gray-700 dark:text-gray-300 mr-2">
                                {{ item }}
                            </div>
                            <div class="flex-auto text-right w-32 truncate text-base text-gray-600 dark:text-gray-400" :style="{fontFamily: `'${item}', monospace`}">
                                {{ exampleText }}
                            </div>
                        </div>
                    </DropdownLinkComponent>

                </template>
            </DropdownComponent>

        </li>

        <li role="menuitem" class="flex flex-nowrap items-center">

            <DropdownComponent role="menuitem" width="20" height="52" @open="isOpenFontSize = true" @close="isOpenFontSize = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent :active="isOpenFontSize" class="pl-2 pr-1 py-1 border-l">
                        {{ size }}
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
                    <DropdownLinkComponent v-for="item in sizes" @click="size = item; $emit('update:size', {size: item, unit: unit})" as="button">
                        {{ item }}{{ unit }}
                    </DropdownLinkComponent>
                </template>
            </DropdownComponent>
            
            <DropdownComponent role="menuitem" width="12" @open="isOpenFontSizeUnit = true" @close="isOpenFontSizeUnit = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent :active="isOpenFontSizeUnit" class="pl-1 pr-2 py-1 border-r">
                        {{ unit }}
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
                    <DropdownLinkComponent v-for="item in units" @click="unit = item" as="button">
                        {{ item }}
                    </DropdownLinkComponent>
                </template>
            </DropdownComponent>

        </li>

        <li role="menuitem" class="flex flex-nowrap items-center">

            <DropdownComponent role="menuitem" width="20" height="52" @open="isOpenLineHeight = true" @close="isOpenLineHeight = false" contentClass="-mt-1">
                <template #trigger>
                    <ToolbarButtonComponent :active="isOpenLineHeight" class="px-2 py-1 border-r">
                        <i class="fa-solid fa-arrows-up-down"></i>
                        <i class="fa-solid fa-align-justify"></i>
                    </ToolbarButtonComponent>
                </template>
                
                <template #content>
                    <DropdownLinkComponent v-for="item in lineHeights" @click="lineHeight = item; $emit('update:line-height', item)" as="button">
                        {{ item }}
                    </DropdownLinkComponent>
                </template>
            </DropdownComponent>

        </li>

        <li role="menuitem" class="">
            <ToolbarButtonComponent @click="$emit('update:italic')" class="px-3 py-1 border-r">
                <i class="fa-solid fa-italic"></i>
            </ToolbarButtonComponent>
        </li>

        <li role="menuitem" class="">
            <ToolbarButtonComponent @click="$emit('update:bold')" class="px-3 py-1 border-r">
                <i class="fa-solid fa-bold"></i>
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
        'update:font', 
        'update:size', 
        'update:italic', 
        'update:bold', 
        'update:line-height', 
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
