<template>
    <Link v-if="active" :href="href" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus-visible:outline-none focus:text-indigo-500 dark:focus:text-indigo-600 transition duration-300 ease-in-out border-indigo-400 dark:border-indigo-600 text-gray-900 dark:text-gray-100" >
        <slot></slot>
    </Link>
    <Link v-else :href="href" class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus-visible:outline-none focus:text-indigo-500 dark:focus:text-indigo-600 transition duration-300 ease-in-out border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:border-gray-300 dark:focus:border-gray-700">
        <slot></slot>
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'NavLinkComponent', 

    components: {
        Link, 
    }, 

    props: {
        href: {
            type: String, 
            default: '', 
        }, 
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
};
</script>
