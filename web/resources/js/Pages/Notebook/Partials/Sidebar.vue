<template>
    <SidebarComponent
        :active="showNotes || showSearch || showTrash" 
        triggersContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-t md:border-t-0 md:border-r z-10 flex justify-center"
        targetsContainerClass="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-t md:border-t-0 md:border-r md:h-full md:min-w-[8rem] md:w-40 lg:w-52 xl:w-64 md:resize-x focus-visible:outline-none overflow-auto"
        >
        <template #triggers>
            <div class="flex md:flex-col overflow-auto">
                <TriggerSidebarPartial @click="$sidebar.showNotes();" :active="showNotes" :title="$t('Notes')">
                    <i class="fa-solid fa-note-sticky"></i>
                </TriggerSidebarPartial>
                <TriggerSidebarPartial @click="$sidebar.showSearch();" :active="showSearch" :title="$t('Search')">
                    <i class="fa-sharp fa-solid fa-magnifying-glass"></i>
                </TriggerSidebarPartial>
                <TriggerSidebarPartial @click="$sidebar.showTrash();" :active="showTrash" :title="$t('Archive')">
                    <i class="fa-solid fa-box-archive"></i>
                </TriggerSidebarPartial>
                <TriggerSidebarPartial @click="$notebook.openFile();" :title="$t('Open the file')">
                    <i class="fa-solid fa-folder-open"></i>
                </TriggerSidebarPartial>
                <TriggerSidebarPartial @click="$notebook.create()" :title="$t('Add note')">
                    <i class="fa-solid fa-plus"></i>
                </TriggerSidebarPartial>
                <TriggerSidebarPartial class="md:mt-auto" @click="toggleDark" :title="dark ? $t('Bright theme') : $t('Dark theme')">
                    <i v-if="dark" class="fa-solid fa-sun"></i>
                    <i v-else class="fa-solid fa-moon"></i>
                </TriggerSidebarPartial>
                <LocalesPartial />
                <ProfilePartial />
            </div>
        </template>
        <template #targets>
            <div v-show="showNotes" class="flex md:flex-col h-full">
                <SortbarPartial />
                <TargetPartial>
                    <Sortable
                        class="flex md:flex-col h-full"
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
            <TargetPartial v-show="showSearch" class="flex flex-col">
                <div class="p-1 border-t md:border-t-0 border-gray-300 dark:border-gray-600 order-2 md:order-1">
                    <InputComponent @input="$notebook.find($event.target.value)" @keyup.enter="$notebook.find($event.target.value)" type="text" autofocus class="w-full px-3 md:px-2 py-2 md:py-1 text-base md:text-sm" placeholder="Search" />
                </div>
                <div class="flex md:flex-col h-full overflow-auto order-1 md:order-2">
                    <NotePartial
                    v-for="note in found"
                    :key="note.item.id"
                    :note="note.item"
                    @click="$window.open(this.notes.find((v) => v.id === note.item.id));"
                    />
                </div>
            </TargetPartial>
            <div v-show="showTrash" class="flex md:flex-col h-full">
                <SortbarPartial />
                <TargetPartial>
                    <Sortable
                        class="flex md:flex-col h-full"
                        :list="trashNotes"
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
import ProfilePartial from './Sidebar/Dropdowns/Profile.vue';
import LocalesPartial from './Sidebar/Dropdowns/Locales.vue';
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
        ProfilePartial, 
        LocalesPartial, 
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
        trashNotes() {
            return this.$sort.sort(this.$notebook.trashNotes);
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
        showTrash() {
            return this.$sidebar.isShowTrash;
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