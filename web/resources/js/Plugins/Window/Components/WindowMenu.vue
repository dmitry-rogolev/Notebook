<template>
    <transition name="menu">
        <div v-show="show && ! note.isTrashed" class="flex z-[2] print:hidden">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'WindowMenuComponent', 

    computed: {
        show() {
            return this.$window.standard;
        }, 
        note() {
            return this.$window.file;
        }, 
    },
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
