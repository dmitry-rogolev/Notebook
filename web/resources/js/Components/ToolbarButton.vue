<template>
    <button
        type="button"
        role="button"
        aria-haspopup="menu"
        :aria-expanded="active"
        class="trigger bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 focus:bg-gray-100 dark:focus:bg-slate-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 focus-visible:outline-none transition duration-200 ease-in-out"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ToolbarButtonComponent', 

    props: {
        active: {
            type: Boolean, 
            default: false, 
        }, 
    },
}
</script>

<style scoped>

</style>
