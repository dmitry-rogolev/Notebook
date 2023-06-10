<template>
    <ItemComponent
        class="px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm"
        :class="[this.class]"
        :as="as"
        >
        <slot></slot>
    </ItemComponent>
</template>

<script>
import ItemComponent from '../../Base/Dropdown/Item.vue';

export default {
    name: 'DropdownItemComponent', 

    components: {
        ItemComponent, 
    }, 

    props: {
        as: {
            type: String,
            default: 'button'
        },
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    },
}
</script>

<style scoped>

</style>
