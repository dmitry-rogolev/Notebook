<template>
    <transition name="slide">
        <section 
            v-show="! fullscreen || show" 
            ref="sidebar" 
            class="flex print:hidden" 
            role="menubar" 
            :style="{height: height, maxHeight: height}"
            @mouseleave="show = false"
            v-bind="$attrs"
            >
            <div :class="[triggerContainerClass]">
                <slot name="triggers"></slot>
            </div>
            <transition name="slide">
                <div 
                    v-if="active" 
                    :class="[contentClass]" 
                    tabindex="-1"
                    role="menu" 
                    >
                    <slot name="contents"></slot>
                </div>
            </transition>
        </section>
    </transition>
    <teleport to="body">
        <div 
            v-show="fullscreen && ! show"
            class="absolute top-0 left-0 bottom-0 w-2 z-10"
            @mouseenter="show = true"
            ></div>
    </teleport>
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
        height() {
            return this.$sidebar.height + 'px';
        }, 
        width() {
            return this.$sidebar.width + 'px';
        }, 
        fullscreen() {
            return this.$window.fullscreen;
        },
    },

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
        triggerContainerClass: {
            type: [ Array, String ], 
            default: '', 
        }, 
        contentClass: {
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>