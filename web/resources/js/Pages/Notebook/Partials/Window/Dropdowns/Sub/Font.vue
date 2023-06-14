<template>
    <DropdownComponent
        @show="$emit('show')" 
        @hide="$emit('hide')"
        ref="dropdown"
        :triggerClass="[triggerClass, 'overflow-y-auto']" 
        :options="options"
        widthClass="w-60"
        :heightClass="heightClass"
        >
        <template #trigger>
            <slot></slot>
        </template>
        <template #content>
            <DropdownItemComponent v-for="item in fonts.serif" @click="$editable.execCommand('fontName', `'${item}', serif`, {cssMode: true}); dropdown.hide();">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, serif`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts['sans-serif']" @click="$editable.execCommand('fontName', `'${item}', sans-serif`, {cssMode: true}); dropdown.hide();">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, sans-serif`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.cursive" @click="$editable.execCommand('fontName', `'${item}', cursive`, {cssMode: true}); dropdown.hide();">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, cursive`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.fantasy" @click="$editable.execCommand('fontName', `'${item}', fantasy`, {cssMode: true}); dropdown.hide();">
                <div class="flex flex-nowrap items-center justify-between">
                    <div class="text-gray-700 dark:text-gray-300 text-xs">
                        {{ item }}
                    </div>
                    <div class="pl-3 flex-auto text-right truncate text-gray-600 dark:text-gray-400 text-lg" :style="{fontFamily: `${item}, fantasy`}">
                        {{ exampleText }}
                    </div>
                </div>
            </DropdownItemComponent>
            <DropdownItemComponent v-for="item in fonts.monospace" @click="$editable.execCommand('fontName', `'${item}', monospace`, {cssMode: true}); dropdown.hide();">
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
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import fonts from '@/assets/fonts.json';
import { faker } from '@faker-js/faker';

export default {
    name: 'FontSubDropdownWindowPartial', 

    components: {
        DropdownComponent, 
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
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        },
    },

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
        heightClass: {
            type: [ Array, String ],
            default: '', 
        },
        options: {
            type: Object, 
            default: {}, 
        }, 
    }, 
}
</script>

<style scoped>

</style>
