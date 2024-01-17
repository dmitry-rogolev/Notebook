<template>
    <transition name="tabs">
        <section v-show="tabs && ! note.isTrashed" role="menubar" tabindex="-1" class="z-[1] print:hidden">
            <slot></slot>
        </section>
    </transition>
</template>

<script>
export default {
    name: 'WindowTabsComponent', 

    computed: {
        tabs() {
            return this.$window.tabs;
        },
        note() {
            return this.$window.file;
        }, 
    },
}
</script>

<style scoped>
.tabs-enter-active,
.tabs-leave-active {
  transition: all 0.2s ease;
}
.tabs-enter-from,
.tabs-leave-to {
  opacity: 0;
}
</style>
