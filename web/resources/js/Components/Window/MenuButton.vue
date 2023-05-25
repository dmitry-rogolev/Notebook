<template>
    <button
        type="button" 
        role="button"
        class="trigger px-1 sm:px-2 md:px-3 py-1 text-base lg:text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 focus:bg-gray-200 dark:focus:bg-slate-600 focus-visible:outline-none transition duration-200 ease-in-out select-none"
        aria-haspopup="menu"
        :aria-expanded="active"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'MenuButtonComponent', 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
};
</script>