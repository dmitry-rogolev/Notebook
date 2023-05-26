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
    name: 'FooterComponent', 

    data() {
        return {
            defaultClass: [
                'flex', 
                'flex-shrink-0', 
                'flex-wrap', 
                'items-center', 
                'justify-end', 
                'p-3', 
                'border-t', 
                'border-solid', 
                'border-gray-300', 
                'dark:border-gray-700', 
                'rounded-b-md', 
                'empty:hidden', 
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