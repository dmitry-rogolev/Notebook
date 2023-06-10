<template>
    <DropdownPartial
        triggerClass=""
        targetClass="max-h-screen overflow-y-auto"
        widthClass="w-60"
        >
        <template #trigger>
            <i class="fa-solid fa-font mr-3"></i>
            <span>Font</span>
        </template>
        <template #content>
            <DropdownItemComponent v-for="item in fonts.serif" @click="$execCommand('fontName', `'${item}', serif`, {cssMode: true})">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, serif`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts['sans-serif']" @click="$execCommand('fontName', `'${item}', sans-serif`, {cssMode: true})">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, sans-serif`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.cursive" @click="$execCommand('fontName', `'${item}', cursive`, {cssMode: true})">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, cursive`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.fantasy" @click="$execCommand('fontName', `'${item}', fantasy`, {cssMode: true})">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, fantasy`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.monospace" @click="$execCommand('fontName', `'${item}', monospace`, {cssMode: true})">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, monospace`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../../SubDropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';

export default {
    name: 'WindowMenuFormatFontSubDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    data () {
        return {
            fonts: fonts, 
        };
    },

    computed: {
        exampleText() {
            return faker.lorem.lines(1);
        },
    },
}
</script>

<style scoped>

</style>
