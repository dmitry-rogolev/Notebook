<template>
    <button 
        role="button" 
        type="submit" 
        class="trigger block py-2 bg-white dark:bg-gray-800 border-transparent focus:border-indigo-500 dark:focus:border-indigo-600 border-b-2 focus-visible:outline-none text-gray-700 dark:text-gray-300 focus:text-indigo-500 dark:focus:text-indigo-600 rounded-t-lg transition duration-300 ease-in-out"
        :class="{'border-indigo-500 dark:border-indigo-600': active, 'hover:border-gray-300 dark:hover:border-gray-600': ! active}"
        :aria-expanded="active"
        aria-haspopup="menu"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TabLinkComponent', 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
};
</script>
