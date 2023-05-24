<template>
    <button
        type="button" 
        role="button"
        class="trigger px-3 py-1 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus-visible:outline-none transition duration-200 ease-in-out select-none"
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