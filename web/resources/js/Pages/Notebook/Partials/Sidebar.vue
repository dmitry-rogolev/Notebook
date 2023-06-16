<template>
    <SidebarComponent 
        triggerContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full overflow-y-auto z-10"
        contentClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full min-w-[8rem] w-32 md:w-40 lg:w-52 xl:w-64 overflow-y-auto resize-x focus-visible:outline-none"
        ref="sidebar" 
        :active="isShowNotes || isShowSearch" 
        >
        <template #triggers>

            <BarTriggerComponent ref="notes" :aria-controls="notesMenuToken" @click="isShowNotes = ! isShowNotes; isShowSearch = false;" :active="isShowNotes"><i class="fa-solid fa-note-sticky"></i></BarTriggerComponent>
            <BarTriggerComponent ref="search" :aria-controls="searchMenuToken" @click="isShowSearch = ! isShowSearch; isShowNotes = false;" :active="isShowSearch"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></BarTriggerComponent>
            <BarTriggerComponent @click="$notebook.create()"><i class="fa-solid fa-plus"></i></BarTriggerComponent>
            <BarTriggerComponent v-if="! dark" @click="toggleDark"><i class="fa-solid fa-sun"></i></BarTriggerComponent>
            <BarTriggerComponent v-else @click="toggleDark"><i class="fa-solid fa-moon"></i></BarTriggerComponent>
        
        </template>
        <template #contents>

            <BarContentComponent :id="notesMenuToken" v-if="isShowNotes">
                <BarNoteComponent v-for="note in notes" :key="note.id" :note="note" @click="$notebook.openWindow(note)" :active="note.id == this.note?.id" />
            </BarContentComponent>

            <BarContentComponent :id="searchMenuToken" v-else-if="isShowSearch">
                <div class="p-1">
                    <InputComponent @input="$notebook.find($event.target.value)" @keyup.enter="$notebook.find($event.target.value)" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                </div>
                <BarNoteComponent v-for="note in found" :key="note.id" :note="note" @click="$notebook.openWindow(note)" :active="note.id == this.note?.id" />
            </BarContentComponent>

        </template>
    </SidebarComponent>
</template>

<script>
import SidebarComponent from '@/Plugins/Sidebar/Components/Sidebar.vue';
import BarTriggerComponent from '@/Components/Sidebar/Trigger.vue';
import BarContentComponent from '@/Components/Sidebar/Content.vue';
import BarNoteComponent from '@/Components/Sidebar/Note.vue';
import InputComponent from '@/Components/TextInput.vue';
import { token } from '@/helpers';

export default {
    name: 'SidebarPartial', 
    
    components: {
        SidebarComponent, 
        BarTriggerComponent, 
        BarContentComponent, 
        BarNoteComponent, 
        InputComponent, 
    }, 

    data() {
        return {
            notesMenuToken: token(), 
            searchMenuToken: token(), 
            isShowNotes: false, 
            isShowSearch: false, 
        };
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
        notes() {
            return this.$notebook.notes;
        }, 
        found() {
            return this.$notebook.found;
        }, 
        note() {
            return this.$notebook.note;
        }, 
    }, 

    methods: {
        toggleDark() {
            this.$store.dispatch('dark', ! this.dark);
        }, 
    }, 
};
</script>

<style scoped>

</style>