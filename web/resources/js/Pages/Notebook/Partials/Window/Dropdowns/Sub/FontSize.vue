<template>
    <DropdownComponent
        @show="$emit('show')" 
        @hide="$emit('hide')"
        ref="dropdown"
        :triggerClass="[triggerClass, 'overflow-y-auto']" 
        :heightClass="heightClass"
        :options="options"
        widthClass="w-20"
        >
        <template #trigger>
            <slot></slot>
        </template>
        <template #content>
            <DropdownItemComponent v-for="item in sizes" @click="$editable.execCommand('fontSize', `${item}pt`, { cssMode: true }); dropdown.hide();">
                {{ `${item}pt` }}
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'FontSizeSubDropdownWindowPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data () {
        return {
            sizes: [ 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 30, 36, 48, 62, 72 ], 
        };
    },

    computed: {
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
