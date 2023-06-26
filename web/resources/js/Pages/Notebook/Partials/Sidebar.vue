<template>
    <SidebarComponent
        :active="showNotes || showSearch" 
        triggersContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full overflow-y-auto z-10"
        targetsContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full min-w-[8rem] w-32 md:w-40 lg:w-52 xl:w-64 overflow-auto resize-x focus-visible:outline-none"
        >
        <template #triggers>
            <TriggerSidebarPartial @click="$sidebar.showNotes();" :active="showNotes">
                <i class="fa-solid fa-note-sticky"></i>
            </TriggerSidebarPartial>
            <TriggerSidebarPartial @click="$sidebar.showSearch();" :active="showSearch">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
            </TriggerSidebarPartial>
            <TriggerSidebarPartial @click="$notebook.create()">
                <i class="fa-solid fa-plus"></i>
            </TriggerSidebarPartial>
            <TriggerSidebarPartial @click="toggleDark">
                <i v-if="dark" class="fa-solid fa-sun"></i>
                <i v-else class="fa-solid fa-moon"></i>
            </TriggerSidebarPartial>
        </template>
        <template #targets>
            <div v-show="showNotes">
                <SortbarPartial />
                <TargetPartial>
                    <Sortable
                        :list="notes"
                        :itemKey="(item) => item.id"
                        >
                        <template #item="{element}">
                            <NotePartial
                                :key="element.id"
                                :note="element"
                                class="draggable"
                                @click="$window.open(element)"
                                />
                        </template>
                    </Sortable>
                </TargetPartial>
            </div>
            <TargetPartial v-show="showSearch">
                <div class="p-1">
                    <InputComponent @input="$notebook.find($event.target.value)" @keyup.enter="$notebook.find($event.target.value)" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                </div>
                <NotePartial
                    v-for="note in found"
                    :key="note.item.id"
                    :note="note.item"
                    @click="$window.open(this.notes.find((v) => v.id === note.item.id));"
                    />
            </TargetPartial>
        </template>
    </SidebarComponent>
</template>

<script>
import SidebarComponent from '@/Plugins/Sidebar/Components/Sidebar.vue';
import InputComponent from '@/Components/TextInput.vue';
import TargetPartial from './Sidebar/Target.vue';
import TriggerSidebarPartial from './Sidebar/Trigger.vue';
import NotePartial from './Sidebar/Note.vue';
import SortbarPartial from './Sidebar/Sortbar.vue';
import { Sortable } from "sortablejs-vue3";

export default {
    name: 'SidebarPartial', 
    
    components: {
        SidebarComponent, 
        InputComponent, 
        TargetPartial, 
        TriggerSidebarPartial, 
        NotePartial, 
        SortbarPartial, 
        Sortable, 
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
        notes() {
            return this.$sort.sort(this.$notebook.notes);
        }, 
        found() {
            return this.$notebook.found;
        }, 
        note() {
            return this.$window.file;
        }, 
        showNotes() {
            return this.$sidebar.isShowNotes;
        }, 
        showSearch() {
            return this.$sidebar.isShowSearch;
        }, 
    }, 

    methods: {
        toggleDark() {
            this.$store.dispatch('dark', ! this.dark);
        }, 
        keyup(e) {
            e.preventDefault();

            if (e.altKey && e.code == 'KeyB') {
                this.$sidebar.showNotes();
            }
        }, 
        addKeyupEventListener() {
            document.addEventListener('keyup', this.keyup);
        }, 
        removeKeyupEventListener() {
            document.removeEventListener('keyup', this.keyup);
        }, 
    }, 

    mounted() {
        this.addKeyupEventListener();
    }, 

    unmounted() {
        this.removeKeyupEventListener();
    }, 
};
</script>

<style scoped>

</style>