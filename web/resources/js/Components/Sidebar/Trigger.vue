<template>
    <button 
        type="button"
        class="trigger block py-3 px-4 text-2xl bg-transparent border-0 focus:outline-0 transition duration-200 ease-in-out"
        :class="{'text-indigo-500': active, 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300': !active}"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BarTriggerComponent', 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    }, 
};
</script>