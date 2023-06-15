<template>
    <WindowComponent :note="note">

        <WindowMenuPartial 
            class="px-1 sm:px-2"
            @create:note="$emit('create:note', $event)"
            @update:note="$emit('update:note', this.record)"
            @exit="$emit('exit')"
            @open:selector="openSelector"
            @open:replacer="openReplacer"
            :record="record"
            :note="note"
            />

        <WindowToolbarPartial :note="note" />

        <WindowHeaderPartial
            ref="header"
            v-model="record.title"
            @delete:note="$emit('delete:note')"
            @close:selector="closeSelector"
            @clear:found="clearFound"
            @update:recordText="record.text = $event"
            :activeSelector="isOpenSelector"
            :activeReplacer="isOpenReplacer"
            :record="record"
            />

        <EditableComponent 
            ref="contenteditable"
            class="h-full px-3 sm:px-4 md:px-5 py-3 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-base focus-visible:outline-none whitespace-pre-wrap overflow-auto" 
            :style="{tabSize: 4}"
            autofocus
            v-model="record.text"
            />

        <WindowStatusbarPartial :text="record.text" />

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

    emits: [
        'create:note', 
        'update:note', 
        'delete:note', 
        'exit', 
    ], 

    data() {
        return {
            isOpenSelector: false, 
            isOpenReplacer: false, 
            isOpenFontModal: false, 
            record: {
                title: this.note.title, 
                text: this.note.text, 
            }, 
        };
    }, 

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
    }, 

    methods: {
        reset() {
            this.record = {
                title: this.note.title, 
                text: this.note.text, 
            };
        },
        openSelector() {
            this.isOpenSelector = true;
        }, 
        closeSelector() {
            this.isOpenSelector = false;
            this.$refs.header.closeSelector();
            this.closeReplacer();
        }, 
        openReplacer() {
            this.isOpenSelector = true;
            this.isOpenReplacer = true;
        }, 
        closeReplacer() {
            this.isOpenReplacer = false;
            this.$refs.header.closeReplacer();
        }, 
        clearFound() {
            this.$refs.contenteditable.innerHTML = this.record.text;
        },   
    }, 

    mounted() {
        this.reset();
    }, 

    updated() {
        this.reset();
    }, 
};
</script>

<style scoped>

</style>