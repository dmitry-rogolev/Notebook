<template>
    <DropdownComponent @show="$emit('show')" @hide="$emit('hide')" ref="dropdown" :triggerClass="[triggerClass]" :options="options" :heightClass="[heightClass]" widthClass="w-80">
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
                [this.$t('Header', [1])]: 'h1', 
                [this.$t('Header', [2])]: 'h2', 
                [this.$t('Header', [3])]: 'h3', 
                [this.$t('Header', [4])]: 'h4', 
                [this.$t('Header', [5])]: 'h5', 
                [this.$t('Header', [6])]: 'h6', 
                [this.$t('Paragraph')]: 'p', 
                [this.$t('Block quote')]: 'blockquote', 
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
