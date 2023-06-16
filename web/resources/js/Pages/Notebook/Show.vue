<template>
    <AppLayout title="Notebook">

        <transition name="header" mode="out-in">
            <ApplicationHeaderPartial v-show="! fullscreen || showHeader" @mouseleave="showHeader = false" />
        </transition>

        <teleport to="body">
            <div 
                v-show="fullscreen && ! showHeader"
                class="absolute top-0 left-0 right-0 h-2"
                @mouseenter="showHeader = true"
                ></div>
        </teleport>

        <main class="flex-auto flex flex-col">
            <div class="flex-auto flex">

                <SidebarPartial 
                    @open:note="$notebook.openWindow($event)" 
                    @open:notes="isShowSidebarNotes = ! isShowSidebarNotes; isShowSidebarSearch = false"
                    @open:search="isShowSidebarSearch = ! isShowSidebarSearch; isShowSidebarNotes = false"
                    @create:note="$notebook.create($event)"
                    @search="$notebook.find($event);"
                    :note="note"
                    :notes="notes" 
                    :found="found" 
                    :activeNotes="isShowSidebarNotes"
                    :activeSearch="isShowSidebarSearch"
                    />

                <WindowPartial 
                    v-show="$notebook.isOpenWindow" 
                    @create:note="$notebook.create($event)"
                    @update:note="$notebook.update($event)"
                    @delete:note="$notebook.delete()" 
                    @exit="$notebook.closeWindow()"
                    :note="note"
                    />

            </div>
        </main>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import ApplicationHeaderPartial from '@/Layouts/Partials/Header.vue';
import SidebarPartial from '@/Pages/Notebook/Partials/Sidebar.vue';
import WindowPartial from '@/Pages/Notebook/Partials/Window.vue';

export default {
    name: 'NotebookPage', 

    components: {
        ApplicationHeaderPartial, 
        AppLayout, 
        SidebarPartial, 
        WindowPartial, 
    }, 

    data() {
        return {
            showHeader: false, 
            isShowSidebarNotes: false, 
            isShowSidebarSearch: false, 
        };
    }, 

    computed: {
        note: {
            get() {
                return this.$notebook.note;
            }, 
            set(v) {
                this.$notebook.note = v;
            }, 
        }, 
        notes() {
            return this.$notebook.notes;
        }, 
        found() {
            return this.$notebook.found;
        }, 
        dark() {
            return this.$store.state.dark;
        }, 
        fullscreen() {
            return this.$window.fullscreen;
        }, 
    }, 

    created() {
        this.$notebook.init();
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
</style>