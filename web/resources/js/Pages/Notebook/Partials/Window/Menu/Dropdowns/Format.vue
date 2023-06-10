<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            Format
        </template>
        <template #content>

            <BlockFormatDropdownPartial />

            <FontDropdownPartial />

            <FontSizeDropdownPartial />

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-palette mr-3"></i>
                    <label class="block flex-auto cursor-pointer" :for="foreColorToken">Color</label>
                    <input v-model="foreColor" :id="foreColorToken" class="hidden" type="color" />
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-fill-drip mr-3"></i>
                    <label class="block flex-auto cursor-pointer" :for="hiliteColorToken">Background</label>
                    <input v-model="hiliteColor" :id="hiliteColorToken" class="hidden" type="color" />
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-bold mr-2 w-4"></i>
                    <div class="flex-auto">Bold</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-italic mr-2 w-4"></i>
                    <div class="flex-auto">Italic</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-underline mr-2 w-4"></i>
                    <div class="flex-auto">Underline</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-strikethrough mr-2 w-4"></i>
                    <div class="flex-auto">Strikethrough</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-superscript mr-2 w-4"></i>
                    <div class="flex-auto">Superscript</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-subscript mr-2 w-4"></i>
                    <div class="flex-auto">Subscript</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-left mr-2 w-4"></i>
                    <div class="flex-auto">Align left</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-center mr-2 w-4"></i>
                    <div class="flex-auto">Align center</div>
                </div>
            </DropdownItemComponent>
            
            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-right mr-2 w-4"></i>
                    <div class="flex-auto">Align right</div>
                </div>
            </DropdownItemComponent>

            <DropdownItemComponent>
                <div class="flex flex-nowrap items-center">
                    <i class="block fa-solid fa-align-justify mr-2 w-4"></i>
                    <div class="flex-auto">Align justify</div>
                </div>
            </DropdownItemComponent>

        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../Dropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';
import BlockFormatDropdownPartial from './Format/BlockFormat.vue';
import FontDropdownPartial from './Format/Font.vue';
import FontSizeDropdownPartial from './Format/FontSize.vue';
import { token } from '@/helpers';

export default {
    name: 'WindowMenuFormatDropdownPartial', 

    components: {
        DropdownPartial, 
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
            }, 
        }, 
        hiliteColor: {
            get() {
                return this.background;
            }, 
            set(v) {
                this.background = v;
            }, 
        },
    },
}
</script>

<style scoped>

</style>
