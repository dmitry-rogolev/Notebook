<template>
    <DropdownComponent ref="dropdown" triggerClass="px-1 md:px-2 lg:px-3 py-1 text-xs md:text-sm lg:text-base text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300">
        <template #trigger>
            {{ $t('Format') }}
        </template>
        <template #content>

            <BlockFormatDropdownPartial />

            <FontDropdownPartial />

            <FontSizeDropdownPartial />

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-palette mr-3"></i>
                    <label class="block flex-auto cursor-pointer" :for="foreColorToken">{{ $t('Color') }}</label>
                    <input v-model="foreColor" :id="foreColorToken" class="hidden" type="color" />
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-fill-drip mr-3"></i>
                    <label class="block flex-auto cursor-pointer" :for="hiliteColorToken">{{ $t('Background') }}</label>
                    <input v-model="hiliteColor" :id="hiliteColorToken" class="hidden" type="color" />
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('bold'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-bold mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Bold') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('italic'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-italic mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Italic') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('underline'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-underline mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Underline') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('strikethrough'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-strikethrough mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Strikethrough') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('superscript'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-superscript mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Superscript') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('subscript'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-subscript mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Subscript') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('justifyLeft'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-left mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Align left') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('justifyCenter'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-center mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Align center') }}</div>
                </div>
            </DropdownItemComponent>
            
            <DropdownItemComponent @click="$editable.execCommand('justifyRight'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-right mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Align right') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('justifyFull'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-justify mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Align justify') }}</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent @click="$editable.execCommand('removeFormat'); dropdown.hide();">
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-eraser mr-2 w-4"></i>
                    <div class="flex-auto">{{ $t('Remove format') }}</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';
import BlockFormatDropdownPartial from './Sub/Menu/BlockFormat.vue';
import FontDropdownPartial from './Sub/Menu/Font.vue';
import FontSizeDropdownPartial from './Sub/Menu/FontSize.vue';
import { token } from '../../../../../Classes/helpers';

export default {
    name: 'WindowFormatDropdownPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
        BlockFormatDropdownPartial, 
        FontDropdownPartial, 
        FontSizeDropdownPartial, 
    }, 

    data () {
        return {
            foreColorToken: token(), 
            hiliteColorToken: token(),
            color: '', 
            background: '', 
        }
    },

    computed: {
        foreColor: {
            get() {
                return this.color;
            }, 
            set(v) {
                this.color = v;
                this.$editable.execCommand('foreColor', v, { cssMode: true });
                this.dropdown.hide();
            }, 
        }, 
        hiliteColor: {
            get() {
                return this.background;
            }, 
            set(v) {
                this.background = v;
                this.$editable.execCommand('hiliteColor', v, { cssMode: true });
                this.dropdown.hide();
            }, 
        },
        dropdown() {
            return this.$refs.dropdown?.dropdown;
        }, 
    },
}
</script>

<style scoped>

</style>
