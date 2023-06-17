<template>
    <DropdownComponent @show="$emit('show')" @hide="$emit('hide')" ref="dropdown" :triggerClass="[triggerClass]" :options="options" :heightClass="[heightClass]" widthClass="w-60">
        <template #trigger>
            <slot></slot>
        </template>
        <template #content>
            <DropdownItemComponent v-for="(item, key) in formats" @click="$editable.execCommand('formatBlock', item); dropdown.hide();">
                <div class="editable" v-html="`<${item} style='margin: 0;'>${key}</${item}>`"></div>
            </DropdownItemComponent>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Dropdown/Dropdown.vue';
import DropdownItemComponent from '@/Components/Dropdown/Item.vue';

export default {
    name: 'FormatBlockFormatSubDropdownWindowPartial', 

    components: {
        DropdownComponent, 
        DropdownItemComponent, 
    }, 

    data() {
        return {
            formats: {
                'Header 1': 'h1', 
                'Header 2': 'h2', 
                'Header 3': 'h3', 
                'Header 4': 'h4', 
                'Header 5': 'h5', 
                'Header 6': 'h6', 
                'Paragraph': 'p', 
                'Blockquote': 'blockquote', 
            }, 
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
