<template>
    <button
        type="button"
        role="button"
        aria-haspopup="menu"
        :aria-expanded="active"
        class="z-[1] hover:z-10 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 focus:text-indigo-500 dark:focus:text-indigo-500 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 border-transparent border focus-visible:outline-none hover:shadow-sm transition duration-200 ease-in-out"
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
