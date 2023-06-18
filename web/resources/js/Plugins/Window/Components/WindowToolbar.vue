<template>
    <transition name="toolbar">
        <section v-show="toolbar" role="menubar" tabindex="-1" class="z-[1] print:hidden">
            <slot></slot>
        </section>
    </transition>
</template>

<script>
export default {
    name: 'WindowToolbarComponent', 

    computed: {
        toolbar() {
            return this.$window.toolbar;
        },
    },
}
</script>

<style scoped>
.toolbar-enter-active,
.toolbar-leave-active {
  transition: all 0.2s ease;
}
.toolbar-enter-from,
.toolbar-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
