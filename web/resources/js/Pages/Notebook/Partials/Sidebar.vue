<template>
    <SidebarComponent :active="isNote || isSearch" :id="sidebarToken" :resize="resize">
        <template #triggers>
            <BarTriggerComponent :aria-controls="notesMenuToken" @click="isSearch = false; isNote = !isNote;" :active="isNote"><i class="fa-solid fa-note-sticky"></i></BarTriggerComponent>
            <BarTriggerComponent :aria-controls="searchMenuToken" @click="isNote = false; isSearch = !isSearch;" :active="isSearch"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></BarTriggerComponent>
            <BarTriggerComponent @click="$emit('create:note')"><i class="fa-solid fa-plus"></i></BarTriggerComponent>
            <BarTriggerComponent v-if="!dark" @click="toggleDark"><i class="fa-solid fa-sun"></i></BarTriggerComponent>
            <BarTriggerComponent v-else @click="toggleDark"><i class="fa-solid fa-moon"></i></BarTriggerComponent>
        </template>
        <template #contents>
            <BarContentComponent :id="notesMenuToken" v-if="isNote">
                <BarNoteComponent v-for="note in notes" :key="note.id" :note="note" @click="$emit('open:note', note)" :active="note.id == this.note?.id" />
            </BarContentComponent>
            <BarContentComponent :id="searchMenuToken" v-else-if="isSearch">
                <div class="p-1">
                    <InputComponent @input="$emit('search', $event.target.value)" @keyup.enter="$emit('search', $event.target.value)" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                </div>
                <BarNoteComponent v-for="note in found" :key="note.id" :note="note" @click="$emit('open:note', note)" :active="note.id == this.note?.id" />
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

    emits: [
        'open:note', 
        'create:note', 
        'search', 
    ], 

    data() {
        return {
            isNote: false, 
            isSearch: false, 
            sidebarToken: token(), 
            notesMenuToken: token(), 
            searchMenuToken: token(), 
        };
    }, 

    computed: {
        rem() {
            return parseFloat(getComputedStyle(document.documentElement).fontSize);
        }, 
        dark() {
            return this.$store.state.dark;
        }, 
        windowHeight() {
            return this.$store.state.windowHeight;
        }, 
    }, 

    props: {
        note: {
            type: Object, 
            default: null, 
        }, 
        notes: {
            type: Array, 
            default: [], 
        }, 
        found: {
            type: Array, 
            default: [], 
        }, 
    }, 

    methods: {
        resize() {
            let windowHeight = $(window).height() - 4 * this.rem - 1;
            this.$store.commit('windowHeight', windowHeight);
            $('#' + this.sidebarToken).height(windowHeight);
        }, 
        toggleDark() {
            this.$store.dispatch('dark', !this.dark);
        }, 
    }, 
};
</script>