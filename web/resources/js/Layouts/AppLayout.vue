<template>
    <div>
        <Head :title="title" />
        
        <div class="min-h-screen bg-gray-200 dark:bg-gray-900 flex flex-col">
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

    props: {
        title: {
            type: String, 
            default: '', 
        }, 
    }, 
};
</script>