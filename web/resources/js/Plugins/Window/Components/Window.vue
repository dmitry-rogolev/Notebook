<template>
    <section ref="window" class="flex flex-col w-full h-full" :style="{maxHeight: height, height: height}">
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

    props: {
        note: {
            type: Object, 
            required: true, 
        }, 
    }, 

    mounted() {
        this.$window.init(this.$refs.window, this.note);
    }, 

    unmounted() {
        this.$window.dispose();
    }, 
}
</script>

<style scoped>

</style>
