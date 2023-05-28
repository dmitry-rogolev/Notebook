<template>
    <button 
        type="button"
        role="button"
        class="card block bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600 border text-gray-700 dark:text-gray-300 rounded-lg shadow-md focus-visible:outline-none focus:ring-2 transition duration-300 ease-in-out"
        >
        <slot></slot>    
    </button>
</template>

<script>
export default {
    name: 'CardButtonComponent', 


};
</script>
