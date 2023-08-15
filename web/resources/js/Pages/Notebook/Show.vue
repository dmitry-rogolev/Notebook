<template>
    <AppLayout :title="$t('Main')">
        <main class="flex-auto flex flex-col">
            <div class="flex-auto flex flex-col-reverse md:flex-row md:flex-nowrap">

                <transition name="slide">
                    <SidebarPartial />
                </transition>

                <WindowPartial v-show="windowIsOpen" class="flex-auto" />

            </div>
        </main>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import SidebarPartial from '@/Pages/Notebook/Partials/Sidebar.vue';
import WindowPartial from '@/Pages/Notebook/Partials/Window.vue';

export default {
    name: 'NotebookPage', 

    components: {
        AppLayout, 
        SidebarPartial, 
        WindowPartial, 
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
        windowIsOpen() {
            return this.$window.isOpen;
        },
    }, 

    created() {
        this.$notebook.init();
    }, 

    mounted() {
        this.$store.dispatch('dark');
        this.$store.dispatch('locale');
    }, 

    unmounted() {
        this.$notebook.dispose();
    }, 
}
</script>

<style scoped>
.header-enter-active,
.header-leave-active {
  transition: all 0.3s ease;
}
.header-enter-from,
.header-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
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