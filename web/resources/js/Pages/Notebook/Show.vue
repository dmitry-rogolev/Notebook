<template>
    <AppLayout title="Notebook">

        <transition name="fullscreen" mode="out-in">
            <ApplicationHeaderPartial v-show="isFullScreen ? isShowHeader : true" @mouseleave="isShowHeader = false" />
        </transition>

        <main class="flex-auto flex flex-col">
            <div class="flex-auto flex">

                <SidebarPartial 
                    v-show="isFullScreen ? isShowSidebar : true"
                    @open:note="open" 
                    @open:notes="isShowSidebarNotes = ! isShowSidebarNotes; isShowSidebarSearch = false"
                    @open:search="isShowSidebarSearch = ! isShowSidebarSearch; isShowSidebarNotes = false"
                    @create:note="create"
                    @search="search = $event; findNotes();"
                    :note="note"
                    :notes="notes" 
                    :found="found" 
                    :activeFullScreen="isFullScreen"
                    :activeNotes="isShowSidebarNotes"
                    :activeSearch="isShowSidebarSearch"
                    @mouseleave="isShowSidebar = false"
                    />

                <WindowPartial 
                    v-if="note" 
                    @create:note="create"
                    @update:note="update"
                    @delete:note="this.delete()" 
                    @exit="close"
                    @toggle:fullscreen="isFullScreen = ! isFullScreen"
                    :note="note"
                    :activeFullScreen="isFullScreen"
                    />

                <teleport to="body">
                    <div 
                        v-show="isFullScreen ? ! isShowSidebar : false"
                        class="absolute top-0 left-0 bottom-0 w-2"
                        :class="{dark: dark}"
                        @mouseenter="isShowSidebar = true"
                        ></div>
                </teleport>

                <teleport to="body">
                    <div 
                        v-show="isFullScreen ? ! isShowHeader : false"
                        class="absolute top-0 left-0 right-0 h-2"
                        :class="{dark: dark}"
                        @mouseenter="isShowHeader = true"
                        ></div>
                </teleport>
            </div>
        </main>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import ApplicationHeaderPartial from '@/Layouts/Partials/Header.vue';
import SidebarPartial from '@/Pages/Notebook/Partials/Sidebar.vue';
import WindowPartial from '@/Pages/Notebook/Partials/Window.vue';
import { escapeHtml, cutForbiddenTags } from '@/helpers';

export default {
    name: 'NotebookPage', 

    components: {
        ApplicationHeaderPartial, 
        AppLayout, 
        SidebarPartial, 
        WindowPartial, 
    }, 

    data() {
        return {
            record: null, 
            notes: null, 
            found: null, 
            isFullScreen: false, 
            isShowSidebar: false, 
            isShowHeader: false, 
            isShowSidebarNotes: false, 
            isShowSidebarSearch: false, 
        };
    }, 

    computed: {
        note: {
            get() {
                return this.record;
            }, 
            set(note) {
                this.record = note;

                if (note) {
                    if (! note.title) {
                        this.record.title = '';
                    }

                    if (! note.text) {
                        this.record.text = '';
                    }

                    if (this.notes && this.notes.length) {
                        let i = this.notes.findIndex((item) => {
                            return item.id == note.id;
                        });
                        if (i !== -1) {
                            this.notes[i] = note;
                        } else {
                            this.notes.push(note);
                        }
                    }

                    if (this.found && this.found.length) {
                        let i = this.found.findIndex((item) => {
                            return item.id == note.id;
                        });
                        if (i !== -1) {
                            this.found[i] = note;
                        } else {
                            this.findNotes();
                        }
                    } 
                }
            }, 
        }, 
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    methods: {
        open(note) {
            this.note = note;
        }, 
        close() {
            this.note = null;
        }, 
        fetchNotes() {
            axios.get('/api/notes').then((response) => {
                this.notes = response.data.data;
                this.note = this.notes[this.notes.length - 1];
            });
        }, 
        findNotes() {
            if (this.search) {
                axios.get('/api/notes?search=' + this.search).then((response) => {
                    this.found = response.data.data;
                });
            } else {
                this.found = null;
            }
        }, 
        create(note = {}) {
            if (note && note.text) {
                note.text = cutForbiddenTags(note.text);
            }
            axios.post('/api/notes', note).then((response) => {
                this.note = response.data.data;

                this.$notifier.push({
                    message: 'Created', 
                    success: true, 
                });
            });
        }, 
        update(note) {
            if (! note) {
                note = {
                    title: '', 
                    text: '', 
                };
            }

            if (this.note.title != note.title || this.note.text != note.text) {
                if (note && note.text) {
                    note.text = cutForbiddenTags(note.text);
                }
                axios.patch('/api/notes/' + this.note.id, note).then((response) => {
                    this.note = response.data.data;
                    this.$notifier.push({
                        message: 'Saved', 
                        success: true, 
                    });
                });
            }
        }, 
        delete() {
            axios.delete('/api/notes/' + this.note.id);

            this.notes = this.notes.filter((item) => {
                return item.id != this.note.id;
            });

            if (this.found && this.found.length) {
                this.found = this.found.filter((item) => {
                    return item.id != this.note.id;
                });
            }

            this.note = this.notes[this.notes.length - 1];

            this.$notifier.push({
                message: 'Deleted', 
                success: true, 
            });
        }, 
        keyupListener(e) {
            e.preventDefault();
            e.stopPropagation();

            // Show sidebar
            if (e.altKey && e.code == 'KeyB') {
                this.isShowSidebarNotes = ! this.isShowSidebarNotes;
            } 
        }, 
        defineListeners() {
            $(document).on('keyup', this.keyupListener);
        }, 
        removeListeners() {
            $(document).off('keyup', this.keyupListener);
        }, 
    }, 

    mounted() {
        this.fetchNotes();

        this.defineListeners();
    }, 

    unmounted() {
        this.removeListeners();
    }, 
}
</script>

<style scoped>
.fullscreen-enter-active,
.fullscreen-leave-active {
  transition: all 0.3s ease;
}
.fullscreen-enter-from,
.fullscreen-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>