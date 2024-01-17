<template>
    <WindowComponent>

        <WindowMenuPartial />

        <WindowToolbarPartial />

        <WindowTabsPartial />

        <WindowHeaderPartial ref="header" />

        <EditableComponent 
            ref="contenteditable"
            class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-wrap overflow-auto" 
            :style="{tabSize: 4, height: editableHeight, maxHeight: editableHeight, minHeight: editableHeight}"
            autofocus
            v-model="note.text"
            />

        <WindowStatusbarPartial ref="statusbar" />

        <MarkPartial />

    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Plugins/Window/Components/Window.vue';
import WindowMenuPartial from '@/Pages/Notebook/Partials/Window/Menu.vue';
import WindowHeaderPartial from '@/Pages/Notebook/Partials/Window/Header.vue';
import WindowStatusbarPartial from '@/Pages/Notebook/Partials/Window/Statusbar.vue';
import WindowToolbarPartial from '@/Pages/Notebook/Partials/Window/Toolbar.vue';
import WindowTabsPartial from '@/Pages/Notebook/Partials/Window/Tabs.vue';
import EditableComponent from '@/Plugins/Editable/Components/Editable.vue';
import MarkPartial from './Window/Mark.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuPartial, 
        WindowHeaderPartial, 
        WindowStatusbarPartial, 
        WindowToolbarPartial, 
        WindowTabsPartial, 
        EditableComponent, 
        MarkPartial, 
    }, 

    data() {
        return {
            editableHeight: 0, 
            timer: 0, 
        };
    }, 

    computed: {
        note() {
            return this.$window.file;
        }, 
    },

    methods: {
        getEditableHeight() {
            if (document.documentElement.clientWidth < 768) {
                return (window.innerHeight - this.$refs.header.$el.getBoundingClientRect().bottom - this.$refs.statusbar.$el.getBoundingClientRect().height - this.$sidebar.height) + 'px';
            }

            return (window.innerHeight - this.$refs.header.$el.getBoundingClientRect().bottom - this.$refs.statusbar.$el.getBoundingClientRect().height) + 'px';
        }, 
        observe() {
            this.timer = setInterval(() => {
                this.editableHeight = this.getEditableHeight();
                this.$refs.contenteditable.$el.style.height = this.editableHeight;
            }, 200);
        }, 
        disconnect() {
            clearInterval(this.timer);
            this.timer = 0;
        }, 
    }, 

    mounted() {
        this.editableHeight = this.getEditableHeight();
        this.observe();
    }, 

    unmounted() {
        this.disconnect();
    }, 
};
</script>

<style scoped>

</style>