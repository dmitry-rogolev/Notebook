<template>
    <section>
        <div ref="triggers" class="flex flex-nowrap" :class="[triggersContainerClass]">
            <slot name="triggers"></slot>
        </div>
        <div ref="targets" :class="[targetsContainerClass]">
            <slot name="targets"></slot>
        </div>
    </section>
</template>

<script>
import { Tabs } from 'flowbite';
import { token } from '@/helpers';

export default {
    name: 'TabsComponent', 

    data() {
        return {
            tabs: null, 
            defaultOptions: {
                activeClasses: 'border-indigo-500 dark:border-indigo-600 text-indigo-500 dark:text-indigo-600 cursor-default pointer-events-none', 
                inactiveClasses: 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-gray-200', 
            }, 
        };
    },

    props: {
        triggersContainerClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        targetsContainerClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
    }, 

    methods: {
        initTabs() {
            let items = this.getItems();

            if (items) {
                this.defaultOptions.defaultTabId = items[0].id;

                this.tabs = new Tabs(items, this.defaultOptions);
            }

        }, 
        getItems() {
            let triggers = this.$refs.triggers.querySelectorAll('.trigger');
            let targets = this.$refs.targets.querySelectorAll('.target');

            if (triggers.length && targets.length && triggers.length === targets.length){
                let items = [];

                triggers.forEach((trigger) => {
                    items.push({
                        id: token(), 
                        triggerEl: trigger, 
                    });
                });

                items.forEach((item, index) => {
                    item.targetEl = targets[index];
                });

                return items;
            }

            return false;
        }, 
    }, 

    mounted() {
        this.initTabs();
    }, 
}
</script>

<style scoped>

</style>
