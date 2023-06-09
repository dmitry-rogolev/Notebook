<template>
    <div :class="{dark: dark}">
        <Head :title="title" />
        
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <slot></slot>
        </div>

        <NotificationManagerComponent />

    </div>
</template>

<script>
import { Head } from '@inertiajs/vue3';
import NotificationManagerComponent from '@/Plugins/Notification/Components/Manager.vue';

export default {
    name: 'AppLayout', 

    components: {
        Head, 
        NotificationManagerComponent, 
    }, 

    computed: {
        dark() {
            return this.$store.state.dark;
        }, 
    }, 

    props: {
        title: {
            type: String, 
            default: '', 
        }, 
    }, 

    created() {
        this.$store.dispatch('dark');
    }, 
};
</script>