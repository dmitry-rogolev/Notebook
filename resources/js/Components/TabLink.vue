<template>
    <button 
        role="button" 
        type="submit" 
        class="trigger block bg-white dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-600 focus-visible:outline-none focus:text-indigo-500 dark:focus:text-indigo-600 transition duration-300 ease-in-out"
        :class="{'border-indigo-500 dark:border-indigo-600 text-indigo-500 dark:text-indigo-600': active, 'hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300': ! active, [borderClass]: true}"
        :aria-expanded="active"
        aria-haspopup="menu"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TabLinkComponent', 

    computed: {
        borderClass() {
            if (this.align == 'top') {
                return 'border-t-2';
            } else if (this.align == 'right') {
                return 'border-r-2';
            } else if (this.align == 'bottom') {
                return 'border-b-2';
            } else if (this.align == 'left') {
                return 'border-l-2';
            }
        }, 
    }, 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
        align: {
            type: String, 
            default: 'bottom', 
        }, 
    }, 
};
</script>
