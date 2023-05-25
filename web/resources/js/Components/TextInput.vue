<template>
    <input
        ref="input"
        class="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
export default {
    name: 'InputComponent', 

    emits: [
        'update:modelValue', 
    ], 

    props: {
        modelValue: {
            type: String, 
            default: '', 
        }, 
    },
    
    methods: {
        defineFocus() {
            this.$refs.input.focus();
        }, 
    }, 

    mounted() {
        if ('autofocus' in this.$attrs) {
            this.defineFocus();
        }
    }, 
};
</script>
