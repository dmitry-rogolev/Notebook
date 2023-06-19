<template>
    <SidebarComponent
        :active="isShowNotes || isShowSearch" 
        triggersContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full overflow-y-auto z-10"
        targetsContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-r h-full min-w-[8rem] w-32 md:w-40 lg:w-52 xl:w-64 overflow-y-auto resize-x focus-visible:outline-none"
        >
        <template #triggers>
            <TriggerSidebarPartial @click="isShowNotes = ! isShowNotes; isShowSearch = false;" :active="isShowNotes">
                <i class="fa-solid fa-note-sticky"></i>
            </TriggerSidebarPartial>
            <TriggerSidebarPartial @click="isShowSearch = ! isShowSearch; isShowNotes = false;" :active="isShowSearch">
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
            <div v-show="isShowNotes">
                <SortbarPartial />
                <TargetPartial>
                    <NotePartial
                        v-for="note in notes"
                        :key="note.id"
                        :note="note"
                        @click="$notebook.openWindow(note)"
                        />
                </TargetPartial>
            </div>
            <TargetPartial v-show="isShowSearch">
                <div class="p-1">
                    <InputComponent @input="$notebook.find($event.target.value)" @keyup.enter="$notebook.find($event.target.value)" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                </div>
                <NotePartial
                    v-for="note in found"
                    :key="note.id"
                    :note="note"
                    @click="$notebook.openWindow(note)"
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

export default {
    name: 'SidebarPartial', 
    
    components: {
        SidebarComponent, 
        InputComponent, 
        TargetPartial, 
        TriggerSidebarPartial, 
        NotePartial, 
        SortbarPartial, 
    }, 

    data() {
        return {
            isShowNotes: false, 
            isShowSearch: false, 
        };
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
            return this.$notebook.note;
        }, 
    }, 

    methods: {
        toggleDark() {
            this.$store.dispatch('dark', ! this.dark);
        }, 
        keyup(e) {
            e.preventDefault();

            if (e.altKey && e.code == 'KeyB') {
                this.isShowNotes = ! this.isShowNotes; this.isShowSearch = false;
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