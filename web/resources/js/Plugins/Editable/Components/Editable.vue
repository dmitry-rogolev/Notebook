<template>
    <div 
        ref="editable" 
        @input="$emit('update:modelValue', $event.target.innerHTML)" 
        contenteditable="true" 
        aria-multiline="true"
        role="textbox"
        :spellcheck="spellcheck"
        v-html="value"
        >
    </div>
</template>

<script>
export default {
    name: 'EditableComponent', 

    emits: [
        'update:modelValue', 
    ], 

    data() {
        return {
            value: this.modelValue, 
        };
    },

    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
    },

    props: {
        modelValue: {
            type: String,
            default: '', 
        },
    },

    watch: {
        modelValue() {
            if (this.$refs.editable.innerHTML != this.modelValue) {
                this.value = this.modelValue;
            }
        }, 
    }, 

    mounted() {
        this.$editable.init(this.$refs.editable);
    }, 

    unmounted() {
        this.$editable.dispose();
    }
}
</script>

<style scoped>

</style>
