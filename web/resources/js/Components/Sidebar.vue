<template>
    <section ref="sidebar" class="flex print:hidden" role="menubar" :style="{height: windowHeight + 'px'}">
        <div class="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full overflow-y-auto z-10">
            <slot name="triggers"></slot>
        </div>
        <transition name="sidebar" mode="out-in">
            <div 
                v-if="active" 
                class="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full min-w-[8rem] w-32 md:w-40 lg:w-52 xl:w-64 overflow-y-auto resize-x focus-visible:outline-none" 
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

    data() {
        return {
            observer: null, 
        };
    },

    computed: {
        windowHeight() {
            return this.$store.state.windowHeight;
        }, 
        sidebarWidth() {
            return this.$store.state.sidebarWidth;
        }, 
        rem() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }, 
        fullscreen() {
            this.resize();
            return this.$store.state.fullscreen;
        }, 
    },

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    methods: {
        defineWindowResizeListener() {
            $(window).on('resize', this.resize);
        }, 
        removeWindowResizeListener() {
            $(window).off('resize', this.resize);
        }, 
        resize() {
            let windowHeight = 0;

            if (this.$store.state.fullscreen) {
                windowHeight = document.documentElement.clientHeight;
            } else {
                windowHeight = document.documentElement.clientHeight - 4 * this.rem - 1;
            }

            this.$store.commit('windowHeight', windowHeight);
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

<style scoped>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.2s ease;
}
.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>