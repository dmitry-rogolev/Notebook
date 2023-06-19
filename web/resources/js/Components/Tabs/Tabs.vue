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
        activeClasses: {
            type: [ Array, String ], 
            required: true, 
        }, 
        inactiveClasses: {
            type: [ Array, String ], 
            required: true, 
        }, 
    }, 

    methods: {
        initTabs() {
            let items = this.getItems();

            if (items) {
                let options = {};
                options.defaultTabId = items[0].id;
                options.activeClasses = Array.isArray(this.activeClasses) ? this.activeClasses.join(' ') : this.activeClasses;
                options.inactiveClasses = Array.isArray(this.inactiveClasses) ? this.inactiveClasses.join(' ') : this.inactiveClasses;

                this.tabs = new Tabs(items, options);
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
