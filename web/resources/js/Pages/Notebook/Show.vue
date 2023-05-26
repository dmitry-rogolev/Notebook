<template>
    <AppLayout title="Notebook">
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Notebook
            </h2>
        </template>

        <div class="flex-auto flex">

            <SidebarPartial 
                @open:note="open" 
                @create:note="create"
                @search="search = $event; findNotes();"
                :note="note"
                :notes="notes" 
                :found="found"  
                />

            <WindowPartial 
                v-if="note" 
                @create="create"
                @update="update"
                @delete="this.delete()" 
                @create:notification="newNotification"
                :note="note" 
                />

            <NotificationManagerComponent :notifications="notifications" />

        </div>
    </AppLayout>
</template>

<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import SidebarPartial from '@/Pages/Notebook/Partials/Sidebar.vue';
import WindowPartial from '@/Pages/Notebook/Partials/Window.vue';
import NotificationManagerComponent from '@/Components/NotificationManager.vue';

export default {
    name: 'NotebookPage', 

    components: {
        AppLayout, 
        SidebarPartial, 
        WindowPartial, 
        NotificationManagerComponent, 
    }, 

    data() {
        return {
            record: null, 
            notes: null, 
            found: null, 
            notifications: [], 
        };
    }, 

    computed: {
        note: {
            get() {
                return this.record;
            }, 
            set(note) {
                this.record = note;

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
            }, 
        }, 
    }, 

    methods: {
        open(note) {
            this.note = note;
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
            axios.post('/api/notes', note).then((response) => {
                this.note = response.data.data;

                this.newNotification({
                    message: 'Created', 
                    success: true, 
                });
            });
        }, 
        update(note) {
            axios.patch('/api/notes/' + this.note.id, note).then((response) => {
                this.note = response.data.data;
                this.newNotification({
                    message: 'Saved', 
                    success: true, 
                });
            });
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

            this.newNotification({
                message: 'Deleted', 
                success: true, 
            });
        }, 
        newNotification(notification) {
            this.notifications.push(notification);
            setTimeout(() => this.notifications.shift(), 2000);
        }, 
    }, 

    mounted() {
        this.fetchNotes();
    }, 
}
</script>
