<template>
    <transition name="statusbar" mode="out-in">
        <WindowStatusbarComponent v-show="statusbar" class="flex flex-nowrap items-center justify-end px-3 py-2 bg-gray-100 dark:bg-slate-700 h-8 border-gray-300 dark:border-gray-600 border-t text-gray-600 dark:text-gray-400 text-sm">
            <div class="mr-2">
                <span>Сharacters: </span>
                <span class="text-gray-700 dark:text-gray-300">{{ countСharacters }}</span>
            </div>
            <div>
                <span>Words: </span>
                <span class="text-gray-700 dark:text-gray-300">{{ countWords }}</span>
            </div>
        </WindowStatusbarComponent>
    </transition>
</template>

<script>
import WindowStatusbarComponent from '@/Plugins/Window/Components/WindowStatusbar.vue';
import { cutTags } from '@/helpers';

export default {
    name: 'WindowStatusbarPartial', 

    components: {
        WindowStatusbarComponent, 
    }, 

    computed: {
        countWords() {
            return cutTags(this.$notebook.record.text).split(/\s/).filter((v) => v).length;
        }, 
        countСharacters() {
            return cutTags(this.$notebook.record.text).split(/\s|\&nbsp;/).filter((v) => v).join('').length;
        }, 
        statusbar() {
            return this.$window.statusbar;
        }, 
    },
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
