<template>
    <transition name="fullscreen" mode="out-in" @after-enter="afterEnter" @after-leave="afterEnter">
        <SidebarComponent v-show="! activeFullScreen" :active="activeNotes || activeSearch" :id="sidebarToken" :resize="resize">
            <template #triggers>
                <BarTriggerComponent ref="notes" :aria-controls="notesMenuToken" @click="$emit('open:notes')" :active="activeNotes"><i class="fa-solid fa-note-sticky"></i></BarTriggerComponent>
                <BarTriggerComponent ref="search" :aria-controls="searchMenuToken" @click="$emit('open:search')" :active="activeSearch"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></BarTriggerComponent>
                <BarTriggerComponent @click="$emit('create:note')"><i class="fa-solid fa-plus"></i></BarTriggerComponent>
                <BarTriggerComponent v-if="!dark" @click="toggleDark"><i class="fa-solid fa-sun"></i></BarTriggerComponent>
                <BarTriggerComponent v-else @click="toggleDark"><i class="fa-solid fa-moon"></i></BarTriggerComponent>
            </template>
            <template #contents>
                <BarContentComponent :id="notesMenuToken" v-if="activeNotes">
                    <BarNoteComponent v-for="note in notes" :key="note.id" :note="note" @click="$emit('open:note', note)" :active="note.id == this.note?.id" />
                </BarContentComponent>
                <BarContentComponent :id="searchMenuToken" v-else-if="activeSearch">
                    <div class="p-1">
                        <InputComponent @input="$emit('search', $event.target.value)" @keyup.enter="$emit('search', $event.target.value)" type="text" autofocus class="w-full px-2 py-1 text-sm" placeholder="Search" />
                    </div>
                    <BarNoteComponent v-for="note in found" :key="note.id" :note="note" @click="$emit('open:note', note)" :active="note.id == this.note?.id" />
                </BarContentComponent>
            </template>
        </SidebarComponent>
    </transition>
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
        'open:notes', 
        'open:search', 
        'create:note', 
        'search', 
    ], 

    data() {
        return {
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
        activeFullScreen: {
            type: Boolean, 
            default: false, 
        }, 
        activeNotes: {
            type: Boolean, 
            default: false, 
        }, 
        activeSearch: {
            type: Boolean, 
            default: false, 
        }, 
    }, 

    watch: {
        activeNotes() {
            if (this.activeNotes || this.activeSearch) {
                this.defineFocus();
            }
        }, 
    }, 

    methods: {
        resize() {
            let windowHeight = 0;

            if (this.activeFullScreen) {
                windowHeight = $(window).height();
            } else {
                windowHeight = $(window).height() - 4 * this.rem - 1;
            }

            this.$store.commit('windowHeight', windowHeight);
            $('#' + this.sidebarToken).height(windowHeight);
        }, 
        toggleDark() {
            this.$store.dispatch('dark', !this.dark);
        }, 
        afterEnter() {
            this.resize();
        }, 
        defineFocus() {
            if (this.activeNotes) {
                this.$refs.notes.$el.focus();
            } else if(this.activeSearch) {
                this.$refs.search.$el.focus();
            }
        }, 
    }, 
};
</script>

<style scoped>
.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: all 0.3s ease;
}
.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>