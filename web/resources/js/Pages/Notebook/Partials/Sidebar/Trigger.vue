<template>
    <TriggerSidebarComponent 
        :class="{'text-indigo-500 dark:text-indigo-600': active, 'text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300': !active}"
        class="py-3 px-4 text-2xl border-0 block transition duration-300 ease-in-out focus-visible:outline-none focus:text-indigo-600 dark:focus:text-indigo-500"
        >
        <slot></slot>
    </TriggerSidebarComponent>
</template>

<script>
import TriggerSidebarComponent from '@/Plugins/Sidebar/Components/Trigger.vue';

export default {
    name: 'TriggerSidebarPartial', 

    components: {
        TriggerSidebarComponent, 
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
}
</script>

<style scoped>

</style>
