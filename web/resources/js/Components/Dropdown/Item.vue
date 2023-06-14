<template>
    <div
        v-if="this.as == 'div'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm"
        :class="[this.class]"
        >
        <slot></slot>
    </div>
    <button
        v-else-if="this.as == 'button'"
        role="menuitem"
        class="focus-visible:outline-none select-none transition duration-200 ease-in-out w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm"
        :class="[this.class]"
        >
        <slot></slot>
    </button>
    <a
        v-else-if="this.as == 'a'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm"
        :class="[this.class]"
        >
        <slot></slot>
    </a>
    <Link
        v-else-if="this.as == 'Link'"
        role="menuitem"
        class="select-none transition duration-200 ease-in-out w-full px-3 py-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm"
        :class="[this.class]"
        >
        <slot></slot>
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'DropdownItemComponent', 

    components: {
        Link, 
    }, 

    props: {
        as: {
            type: String,
            default: 'button'
        },
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    },
}
</script>

<style scoped>

</style>
