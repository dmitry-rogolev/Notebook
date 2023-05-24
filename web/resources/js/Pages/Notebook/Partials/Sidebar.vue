<template>
    <SidebarComponent :active="isNote || isSearch" :id="sidebarToken" :resize="resize">
        <template #triggers>
            <BarTriggerComponent @click="isSearch = false; isNote = !isNote;" :active="isNote"><i class="fa-solid fa-note-sticky"></i></BarTriggerComponent>
            <BarTriggerComponent @click="isNote = false; isSearch = !isSearch;" :active="isSearch"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></BarTriggerComponent>
            <BarTriggerComponent><i class="fa-solid fa-plus"></i></BarTriggerComponent>
            <BarTriggerComponent v-if="!dark" @click="toggleDark"><i class="fa-solid fa-sun"></i></BarTriggerComponent>
            <BarTriggerComponent v-else @click="toggleDark"><i class="fa-solid fa-moon"></i></BarTriggerComponent>
        </template>
        <template #contents>
            <BarContentComponent v-if="isNote">
                <BarNoteComponent v-for="note in notes" :key="note.id" :note="note" />
            </BarContentComponent>
            <BarContentComponent v-else-if="isSearch">
                <form @submit.prevent="findNotes" class="p-1">
                    <InputComponent @input="findNotes" @keyup.enter="findNotes" v-model="search" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                </form>
                <BarNoteComponent v-for="note in foundNotes" :key="note.id" :note="note" />
            </BarContentComponent>
        </template>
    </SidebarComponent>
</template>

<script>
import SidebarComponent from '@/Components/Sidebar.vue';
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
            notes: null, 
            isNote: false, 
            isSearch: false, 
            sidebarToken: token(), 
            search: '', 
            foundNotes: null, 
        };
    }, 

    computed: {
        rem() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }, 
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    methods: {
        fetchNotes() {
            axios.get('/api/notes').then((response) => {
                this.notes = response.data.data;
            });
        }, 
        resize() {
            $('#' + this.sidebarToken).height($(window).height() - 4 * this.rem - 1);
        }, 
        toggleDark() {
            this.$store.dispatch('dark', !this.dark);
        }, 
        findNotes() {
            if (this.search) {
                axios.get('/api/notes?search=' + this.search).then((response) => {
                    this.foundNotes = response.data.data;
                });
            } else {
                this.foundNotes = null;
            }
        }, 
    }, 

    mounted() {
        this.fetchNotes();
    }, 
};
</script>