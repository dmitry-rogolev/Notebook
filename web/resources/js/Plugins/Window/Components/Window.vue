<template>
    <section ref="window" class="flex flex-col w-full h-full" :style="{maxHeight: height}">
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

</style>
