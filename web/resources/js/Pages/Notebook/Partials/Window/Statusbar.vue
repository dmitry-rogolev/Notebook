<template>
    <transition name="statusbar" mode="out-in">
        <div class="bg-gray-100 dark:bg-slate-700 h-8 border-gray-300 dark:border-gray-600 border-t text-gray-700 dark:text-gray-300 text-sm">
            
        </div>
    </transition>
</template>

<script>
export default {
    name: 'WindowStatusbarPartial', 
}
</script>

<style scoped>
.statusbar-enter-active,
.statusbar-leave-active {
  transition: all 0.3s ease;
}
.statusbar-enter-from,
.statusbar-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
