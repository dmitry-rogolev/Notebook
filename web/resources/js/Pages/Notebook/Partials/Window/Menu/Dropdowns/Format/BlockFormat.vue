<template>
    <DropdownPartial
        triggerClass=""
        targetClass=""
        >
        <template #trigger>
            <i class="fa-solid fa-heading mr-3"></i>
            <span>Block format</span>
        </template>
        <template #content>
            <DropdownItemComponent v-for="(item, key) in formats" @click="$editable.execCommand('formatBlock', item)">
                <div class="editable" v-html="`<${item} style='margin: 0;'>${key}</${item}>`"></div>
            </DropdownItemComponent>
        </template>
    </DropdownPartial>
</template>

<script>
import DropdownPartial from '../../SubDropdown.vue';
import DropdownItemComponent from '@/Components/Custom/Dropdown/Item.vue';

export default {
    name: 'WindowMenuFormatBlockFormatSubDropdownPartial', 

    components: {
        DropdownPartial, 
        DropdownItemComponent, 
    }, 

    data () {
        return {
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
        };
    },
}
</script>

<style scoped>

</style>
