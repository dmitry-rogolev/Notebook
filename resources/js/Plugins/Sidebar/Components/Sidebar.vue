<template>
    <section 
        v-show="! fullscreen || show" 
        ref="sidebar" 
        class="flex flex-col md:flex-row md:flex-nowrap print:hidden w-screen md:w-auto z-10 h-auto md:h-screen" 
        role="menubar" 
        @mouseleave="show = false"
        >
        <div class="order-2 md:order-1" :class="[triggersContainerClass]">
            <slot name="triggers"></slot>
        </div>
        <transition enter-active-class="transition duration-200 ease-in-out" leave-active-class="transition duration-200 ease-in-out" enter-from-class="opacity-0 translate-y-full md:translate-y-0 md:-translate-x-full" leave-to-class="opacity-0 translate-y-full md:translate-y-0 md:-translate-x-full">
            <div 
                v-if="active" 
                class="order-1 md:order-2"
                :class="[targetsContainerClass]" 
                tabindex="-1"
                role="menu" 
                >
                <slot name="targets"></slot>
            </div>
        </transition>
        <teleport to="body">
            <div 
                v-show="fullscreen && ! show"
                class="absolute top-0 left-0 bottom-0 w-2 z-[100]"
                @mouseenter="show = true"
                ></div>
        </teleport>
    </section>
</template>

<script>

export default {
    name: 'SidebarComponent', 

    data() {
        return {
            show: false, 
        };
    },

    computed: {
        // height() {
        //     return this.$sidebar.height + 'px';
        // }, 
        // width() {
        //     return this.$sidebar.width + 'px';
        // }, 
        fullscreen() {
            return this.$window.fullscreen;
        },
    },

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
        triggersContainerClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        targetsContainerClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
    }, 

    mounted() {
        this.$sidebar.init(this.$refs.sidebar);
    }, 

    unmounted() {
        this.$sidebar.dispose();
    }, 
};
</script>

<style scoped>

</style>