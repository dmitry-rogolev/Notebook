<template>
    <div 
        ref="editable" 
        @input="emited = $event.target.innerHTML; $emit('update:modelValue', $event.target.innerHTML);" 
        contenteditable="true" 
        aria-multiline="true"
        role="textbox"
        :spellcheck="spellcheck"
        v-html="value"
        class="overflow-y-auto max-h-full"
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
            emited: null,
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
            if (this.emited != this.modelValue) {
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
