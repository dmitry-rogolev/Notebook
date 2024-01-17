<template>
    <AppLayout :title="$t('Main')">
        <main class="flex-auto flex flex-col">
            <div class="flex-auto max-h flex flex-col-reverse md:flex-row md:flex-nowrap">

                <transition name="slide">
                    <SidebarPartial />
                </transition>

                <WindowPartial v-show="windowIsOpen" />

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

    methods: {
        resize() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 
    }, 

    created() {
        this.$notebook.init();
    }, 

    mounted() {
        this.$store.dispatch('dark');
        this.$store.dispatch('locale');
        this.resize();
        window.addEventListener('resize', this.resize);
    }, 

    unmounted() {
        this.$notebook.dispose();
        window.removeEventListener('resize', this.resize);
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
.max-h {
    height: 100vh; 
    max-height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    max-height: calc(var(--vh, 1vh) * 100);
}
</style>