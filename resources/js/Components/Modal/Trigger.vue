<template>
    <button
        type="button"
        role="button"
        class="focus-visible:outline-none select-none transition duration-200 ease-in-out block"
        :class="[this.class]"
        @click="$emit('show')"
        >
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'ModalTriggerComponent', 

    emits: [
        'show', 
    ], 

    props: {
        class: {
            type: [ Array, String ],
            default: '', 
        },
    },
}
</script>

<style scoped>

</style>
