<template>
    <button 
        type="button"
        role="menuitem"
        class="transition duration-200 ease-in-out select-none w-full text-left focus-visible:outline-none"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ItemSidebarComponent', 
}
</script>

<style scoped>

</style>
