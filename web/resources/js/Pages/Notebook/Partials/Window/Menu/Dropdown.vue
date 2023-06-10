<template>
    <DropdownComponent
        :triggerClass="[triggerClass, defaultTriggerClass]"
        :targetClass="[targetClass]"
        :widthClass="[widthClass]"
        :options="options"
        >
        <template #trigger>
            <slot name="trigger"></slot>
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
    </DropdownComponent>
</template>

<script>
import DropdownComponent from '@/Components/Custom/Dropdown.vue';

export default {
    name: 'WindowMenuDropdownPartial', 

    components: {
        DropdownComponent, 
    }, 

    computed: {
        defaultTriggerClass() {
            return 'px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 text-gray-700 dark:text-gray-300';
        }, 
    },

    props: {
        triggerClass: {
            type: [ Array, String ],
            default: '', 
        },
        targetClass: {
            type: [ Array, String ],
            default: '', 
        },
        widthClass: {
            type: [ Array, String ],
            default: 'w-48', 
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
