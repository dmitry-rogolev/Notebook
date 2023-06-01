<template>
    <div :class="{dark: dark}">
        <Head :title="title" />
        
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
            <slot></slot>
        </div>

    </div>
</template>

<script>
import { Head } from '@inertiajs/vue3';

export default {
    name: 'AppLayout', 

    components: {
        Head, 
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