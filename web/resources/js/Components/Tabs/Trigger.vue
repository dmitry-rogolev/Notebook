<template>
    <button 
        role="button" 
        type="submit" 
        class="trigger block focus:border-indigo-500 dark:focus:border-indigo-600 focus-visible:outline-none focus:text-indigo-500 dark:focus:text-indigo-600 transition duration-300 ease-in-out"
        :class="[borderClass]"
        aria-haspopup="menu"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TriggerTabsComponent', 

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
        align: {
            type: String, 
            default: 'bottom', 
        }, 
    }, 
};
</script>
