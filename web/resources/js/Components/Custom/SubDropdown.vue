<template>
    <BaseSubDropdownComponent
        :triggerClass="[triggerClass]"
        :targetClass="[targetClass, defaultTargetClass]"
        :widthClass="[widthClass]"
        :options="options"
        >
        <template #trigger>
            <slot name="trigger"></slot>
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
    </BaseSubDropdownComponent>
</template>

<script>
import BaseSubDropdownComponent from '@/Components/Base/SubDropdown.vue';

export default {
    name: 'SubDropdownComponent', 

    components: {
        BaseSubDropdownComponent, 
    }, 

    computed: {
        defaultTargetClass() {
            return 'py-1.5 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border rounded-lg';
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
