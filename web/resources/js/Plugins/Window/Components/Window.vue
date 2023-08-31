<template>
    <section ref="window" class="relative w-full print:max-h-none print:h-auto" :style="{maxHeight: height, height: height, maxWidth: width, width: width}">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'WindowComponent', 

    computed: {
        height() {
            return this.$window.height + 'px';
        }, 
        width() {
            return this.$window.width + 'px';
        }, 
    },

    mounted() {
        this.$window.init(this.$refs.window);
    }, 

    unmounted() {
        this.$window.dispose();
    }, 
}
</script>

<style scoped>
@media print {
    .print\:max-h-none {
        max-height: none !important;
    }
    .print\:h-auto {
        height: auto !important;
    }
}
</style>
