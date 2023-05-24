<template>
    <div role="menuitem">
        <button role="button" v-if="this.as == 'button'" type="submit" class="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
            <slot></slot>
        </button>

        <a v-else-if="this.as =='a'" :href="href" class="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
            <slot></slot>
        </a>

        <Link v-else :href="href" class="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
            <slot></slot>
        </Link>
    </div>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'DropdownLinkComponent', 

    components: {
        Link, 
    }, 

    props: {
        href: {
            type: String, 
            default: '#', 
        }, 
        as: {
            type: String, 
            default: '', 
        }, 
    }, 
};
</script>
