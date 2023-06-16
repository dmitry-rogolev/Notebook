<template>
    <WindowComponent>

        <WindowMenuPartial />

        <WindowToolbarPartial />

        <WindowHeaderPartial />

        <EditableComponent 
            ref="contenteditable"
            class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-wrap overflow-auto" 
            :style="{tabSize: 4}"
            autofocus
            v-model="$notebook.record.text"
            />

        <WindowStatusbarPartial />

    </WindowComponent>
</template>

<script>
import WindowComponent from '@/Plugins/Window/Components/Window.vue';
import WindowMenuButtonComponent from '@/Components/Window/MenuButton.vue';
import WindowMenuPartial from '@/Pages/Notebook/Partials/Window/Menu.vue';
import WindowHeaderPartial from '@/Pages/Notebook/Partials/Window/Header.vue';
import WindowStatusbarPartial from '@/Pages/Notebook/Partials/Window/Statusbar.vue';
import WindowToolbarPartial from '@/Pages/Notebook/Partials/Window/Toolbar.vue';
import EditableComponent from '@/Plugins/Editable/Components/Editable.vue';

export default {
    name: 'WindowPartial', 

    components: {
        WindowComponent, 
        WindowMenuButtonComponent, 
        WindowMenuPartial, 
        WindowHeaderPartial, 
        WindowStatusbarPartial, 
        WindowToolbarPartial, 
        EditableComponent, 
    }, 

    computed: {
        record() {
            return this.$notebook.record;
        }, 
    },
};
</script>

<style scoped>

</style>