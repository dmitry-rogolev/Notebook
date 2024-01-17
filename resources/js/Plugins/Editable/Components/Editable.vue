<template>
    <div 
        ref="editable" 
        :contenteditable="note && ! note.isTrashed" 
        aria-multiline="true"
        role="textbox"
        :spellcheck="spellcheck"
        v-html="value"
        class="overflow-y-auto print:z-[1000] editable"
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
            mutationObserver: new MutationObserver(() => {
                let content = '';
                if (this.$refs.editable.querySelector('[data-markjs=true]')) {
                    content = this.$mark.getUnmarkHTML(this.$refs.editable);
                } else {
                    content = this.$refs.editable.innerHTML;
                }

                this.emited = content; 
                this.$emit('update:modelValue', content);
            }), 
        };
    },

    computed: {
        spellcheck() {
            return this.$editable.spellcheck;
        }, 
        note() {
            return this.$window.file;
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
            if (! this.modelValue) {
                this.$refs.editable.innerHTML = '';
            }

            if (this.emited != this.modelValue) {
                this.emited = this.modelValue;
                this.value = this.modelValue;
            }
        }, 
    }, 

    mounted() {
        this.$editable.init(this.$refs.editable);
        this.$mark.init(this.$refs.editable);
        this.mutationObserver.observe(this.$refs.editable, {
            childList: true, 
            subtree: true, 
            attributes: true, 
            characterData: true, 
        });
    }, 

    unmounted() {
        this.$editable.dispose();
        this.$mark.dispose();
        this.mutationObserver.disconnect();
    }
}
</script>

<style scoped>

</style>
