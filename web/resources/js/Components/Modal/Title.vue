<template>
    <div
        :class="[
            !isClear ? defaultClass : '', 
            this.class, 
        ]"
        >
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'TitleComponent', 

    data() {
        return {
            defaultClass: [
                'mb-0', 
                'text-lg', 
            ], 
            isClear: 'clear' in this.$attrs,
        };
    }, 

    props: {
        class: {
            type: [ Array, String ], 
            default: '', 
        }, 
    }, 
}
</script>