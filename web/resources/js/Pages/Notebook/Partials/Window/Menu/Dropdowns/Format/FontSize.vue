<template>
    <DropdownPartial
        triggerClass=""
        targetClass="max-h-screen overflow-y-auto"
        widthClass="w-20"
        >
        <template #trigger>
            <i class="fa-solid fa-text-height mr-3"></i>
            <span>Font size</span>
        </template>
        <template #content>
            <DropdownItemComponent v-for="item in sizes" @click="$execCommand('fontSize', `${item}pt`, { cssMode: true })">
                {{ `${item}pt` }}
            </DropdownItemComponent>
        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../../SubDropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';

export default {
    name: 'WindowMenuFormatFontSubDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    data () {
        return {
            sizes: [ 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 62, 72 ], 
        };
    },
}
</script>

<style scoped>

</style>
