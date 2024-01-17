<template>
    <button 
        role="button" 
        type="button" 
        class="block transition duration-200 ease-in-out focus-visible:outline-none"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TriggerSidebarComponent', 
}
</script>

<style scoped>

</style>
