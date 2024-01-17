<template>
    <button 
        role="button" 
        type="button" 
        class="trigger block transition duration-200 ease-in-out focus-visible:outline-none"
        aria-haspopup="menu"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TriggerTabsComponent', 
};
</script>
