<template>
    <section class="flex print:hidden" role="menubar">
        <div class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 border-r h-full overflow-y-auto z-10">
            <slot name="triggers"></slot>
        </div>
        <transition 
            mode="out-in"
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform -translate-x-full"
            enter-to-class="transform translate-x-0"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform translate-x-0"
            leave-to-class="transform -translate-x-full"
            >
            <div 
                v-if="active" 
                class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 border-r h-full min-w-[8rem] w-32 md:w-40 lg:w-52 xl:w-64 overflow-y-auto resize-x focus-visible:outline-none" 
                tabindex="-1"
                role="menu" 
                >
                <slot name="contents"></slot>
            </div>
        </transition>
    </section>
</template>

<script>
import BarTriggerComponent from '@/Components/Sidebar/Trigger.vue';
import BarContentComponent from '@/Components/Sidebar/Content.vue';

export default {
    name: 'SidebarComponent', 

    components: {
        BarTriggerComponent, 
        BarContentComponent, 
    },

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
        resize: {
            type: Function, 
            required: true, 
        }, 
    }, 

    methods: {
        defineWindowResizeListener() {
            $(window).on('resize', this.resize);
        }, 
        removeWindowResizeListener() {
            $(window).off('resize', this.resize);
        }, 
    }, 

    mounted() {
        this.resize();
        this.defineWindowResizeListener();
    }, 

    unmounted() {
        this.removeWindowResizeListener();
    }, 
};
</script>