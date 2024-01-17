<template>
    <Link :href="route('welcome')" class="flex flex-nowrap items-center px-2 text-indigo-600 hover:text-indigo-500 dark:text-indigo-600 transition duration-300 ease-in-out focus-visible:outline-none focus:ring-2">
        <ApplicationMarkComponent />
        <div class="ml-4">
            Notebook
        </div>
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';
import ApplicationMarkComponent from '@/Components/ApplicationMark.vue';

export default {
    name: 'ApplicationLogoComponent', 

    components: {
        Link, 
        ApplicationMarkComponent, 
    }, 
};
</script>