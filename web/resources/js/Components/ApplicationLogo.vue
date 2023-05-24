<template>
    <Link :href="route('welcome')" class="flex flex-nowrap items-center text-indigo-600 dark:text-gray-100 hover:text-indigo-500 transition duration-300 ease-in-out">
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