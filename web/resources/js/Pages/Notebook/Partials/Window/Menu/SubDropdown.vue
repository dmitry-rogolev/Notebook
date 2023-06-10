<template>
    <SubDropdownComponent
        :triggerClass="[triggerClass, defaultTriggerClass]"
        :targetClass="[targetClass]"
        :widthClass="[widthClass]"
        :options="options"
        >
        <template #trigger>
            <div class="flex flex-nowrap">
                <div class="flex-auto">
                    <slot name="trigger"></slot>
                </div>
                <div>
                    <i class="fa-solid fa-caret-right"></i>
                </div>
            </div>
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
    </SubDropdownComponent>
</template>

<script>
import SubDropdownComponent from '@/Components/Custom/SubDropdown.vue';

export default {
    name: 'WindowMenuSubDropdownPartial', 

    components: {
        SubDropdownComponent, 
    }, 

    computed: {
        defaultTriggerClass() {
            return 'w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm';
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
            default: {
                triggerType: 'hover', 
                placement: 'right-end', 
                offsetDistance: 4, 
            }, 
        }, 
    },
}
</script>

<style scoped>

</style>
